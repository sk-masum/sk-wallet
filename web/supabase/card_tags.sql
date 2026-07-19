-- Add tags support for cards.
alter table public.card
  add column if not exists tags text[] not null default '{}'::text[];
