-- Add card color name column only.
alter table public.card
  add column if not exists color_name text;
