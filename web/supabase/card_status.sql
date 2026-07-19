-- Add card status workflow support.
alter table public.card
  add column if not exists status text not null default 'active';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'card_status_check'
      and conrelid = 'public.card'::regclass
  ) then
    alter table public.card
      add constraint card_status_check
      check (status in ('active', 'inactive', 'blocked', 'replaced'));
  end if;
end
$$;

update public.card
set status = 'active'
where status is null;
