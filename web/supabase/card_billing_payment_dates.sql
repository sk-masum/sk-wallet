-- Add billing and payment day-of-month fields for cards.

alter table if exists public.card
  add column if not exists billing_date integer,
  add column if not exists payment_date integer;

alter table if exists public.card
  drop constraint if exists card_billing_date_range_check,
  drop constraint if exists card_payment_date_range_check;

alter table if exists public.card
  add constraint card_billing_date_range_check check (
    billing_date is null or (billing_date between 1 and 31)
  ),
  add constraint card_payment_date_range_check check (
    payment_date is null or (payment_date between 1 and 31)
  );
