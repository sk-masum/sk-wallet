-- Credential storage schema for secure credentials (passwords, PINs, API keys, etc.)
-- Run this migration in Supabase SQL editor.

create table if not exists public.credential_record (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  credential_type text not null,
  service_name text not null,
  identifier text,
  secret_token text not null,
  secret_hash text not null,
  secret_last4 text not null,
  masked_secret text not null,
  url text,
  notes text,
  metadata jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint credential_record_type_check check (
    credential_type in ('LOGIN', 'BANKING', 'PIN', 'API_KEY', 'WIFI', 'OTHER')
  ),
  constraint credential_record_service_name_length_check check (
    char_length(service_name) between 2 and 120
  ),
  constraint credential_record_identifier_length_check check (
    identifier is null or char_length(identifier) <= 120
  ),
  constraint credential_record_last4_check check (
    char_length(secret_last4) between 1 and 4
  ),
  constraint credential_record_unique_identity unique (user_id, credential_type, service_name, identifier)
);

create index if not exists credential_record_user_id_idx on public.credential_record(user_id);
create index if not exists credential_record_type_idx on public.credential_record(credential_type);
create index if not exists credential_record_updated_at_idx on public.credential_record(updated_at desc);

alter table public.credential_record enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'credential_record'
      and policyname = 'credential_record_select_own'
  ) then
    create policy "credential_record_select_own"
    on public.credential_record
    for select
    using (auth.uid() = user_id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'credential_record'
      and policyname = 'credential_record_insert_own'
  ) then
    create policy "credential_record_insert_own"
    on public.credential_record
    for insert
    with check (auth.uid() = user_id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'credential_record'
      and policyname = 'credential_record_update_own'
  ) then
    create policy "credential_record_update_own"
    on public.credential_record
    for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'credential_record'
      and policyname = 'credential_record_delete_own'
  ) then
    create policy "credential_record_delete_own"
    on public.credential_record
    for delete
    using (auth.uid() = user_id);
  end if;
end
$$;
