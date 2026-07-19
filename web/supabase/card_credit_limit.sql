-- Add credit limit support for cards.
alter table public.card
  add column if not exists credit_limit numeric(12, 2);
