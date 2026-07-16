-- Run this in Supabase SQL editor to enforce per-user card isolation.

alter table public.card
  add column if not exists owner_id uuid references auth.users(id) on delete cascade;

-- IMPORTANT:
-- auth.uid() is NULL in SQL editor (service role context), so choose an owner deterministically.
-- Set target_email to your real user email for predictable backfill.
do $$
declare
  target_email text := null; -- e.g. 'you@example.com'
  target_owner uuid;
  null_rows bigint;
begin
  if target_email is not null then
    select id into target_owner
    from auth.users
    where lower(email) = lower(target_email)
    limit 1;
  end if;

  if target_owner is null then
    select id into target_owner
    from auth.users
    order by created_at asc
    limit 1;
  end if;

  if target_owner is null then
    raise exception
      'No users found in auth.users. Create at least one auth user first, then rerun this script.';
  end if;

  update public.card
  set owner_id = target_owner
  where owner_id is null;

  select count(*) into null_rows from public.card where owner_id is null;

  if null_rows > 0 then
    raise exception
      'owner_id still contains % NULL row(s). Manually backfill those rows, then rerun.',
      null_rows;
  end if;
end
$$;

-- Only enforce NOT NULL when all rows are backfilled.
do $$
begin
  if exists (select 1 from public.card where owner_id is null) then
    raise exception
      'owner_id still contains NULL values. Backfill them first, then run: ALTER TABLE public.card ALTER COLUMN owner_id SET NOT NULL;';
  end if;
end
$$;

alter table public.card
  alter column owner_id set not null;

alter table public.card
  enable row level security;

drop policy if exists "Users can read own cards" on public.card;
create policy "Users can read own cards"
on public.card
for select
using (auth.uid() = owner_id);

drop policy if exists "Users can insert own cards" on public.card;
create policy "Users can insert own cards"
on public.card
for insert
with check (auth.uid() = owner_id);

drop policy if exists "Users can update own cards" on public.card;
create policy "Users can update own cards"
on public.card
for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

drop policy if exists "Users can delete own cards" on public.card;
create policy "Users can delete own cards"
on public.card
for delete
using (auth.uid() = owner_id);
