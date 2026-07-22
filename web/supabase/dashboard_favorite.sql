-- Dashboard favorites persistence
-- Run this SQL in Supabase before using DB-backed dashboard favorites.

create table if not exists public.dashboard_favorite (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  feature_key text not null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  unique (user_id, feature_key)
);

create index if not exists dashboard_favorite_user_id_idx
  on public.dashboard_favorite (user_id);

create index if not exists dashboard_favorite_updated_at_desc_idx
  on public.dashboard_favorite (updated_at desc);

alter table public.dashboard_favorite
  enable row level security;

drop policy if exists "Users can read own dashboard favorites" on public.dashboard_favorite;
create policy "Users can read own dashboard favorites"
on public.dashboard_favorite
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own dashboard favorites" on public.dashboard_favorite;
create policy "Users can insert own dashboard favorites"
on public.dashboard_favorite
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own dashboard favorites" on public.dashboard_favorite;
create policy "Users can update own dashboard favorites"
on public.dashboard_favorite
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own dashboard favorites" on public.dashboard_favorite;
create policy "Users can delete own dashboard favorites"
on public.dashboard_favorite
for delete
using (auth.uid() = user_id);
