-- Card provider normalization schema.
-- Creates a provider lookup table and links cards to providers by id.

create table if not exists public.card_provider (
  id bigint generated always as identity primary key,
  name text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint card_provider_name_length_check check (char_length(trim(name)) between 2 and 50)
);

create unique index if not exists card_provider_name_normalized_uidx
  on public.card_provider (lower(trim(name)));

alter table if exists public.card
  add column if not exists provider_id bigint references public.card_provider(id) on delete set null;

create index if not exists card_provider_id_idx on public.card(provider_id);

insert into public.card_provider (name)
select distinct trim(provider)
from public.card
where nullif(trim(provider), '') is not null
on conflict ((lower(trim(name)))) do nothing;

update public.card c
set provider_id = p.id
from public.card_provider p
where c.provider_id is null
  and nullif(trim(c.provider), '') is not null
  and lower(trim(c.provider)) = lower(trim(p.name));

alter table public.card_provider enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'card_provider'
      and policyname = 'card_provider_select_authenticated'
  ) then
    create policy "card_provider_select_authenticated"
    on public.card_provider
    for select
    using (auth.role() = 'authenticated');
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'card_provider'
      and policyname = 'card_provider_insert_authenticated'
  ) then
    create policy "card_provider_insert_authenticated"
    on public.card_provider
    for insert
    with check (auth.role() = 'authenticated');
  end if;
end
$$;