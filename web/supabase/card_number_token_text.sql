-- Allow encrypted token strings to be stored in card.number and card.cvv.
-- Run this once in Supabase SQL editor.

alter table if exists public.card
  alter column number type text
  using number::text;

alter table if exists public.card
  alter column cvv type text
  using cvv::text;
