-- Document ID storage schema for sensitive identity documents.
-- Run this migration before enabling document APIs.

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'document_record'
      and column_name = 'category'
  ) then
    alter table if exists public.document_record
      add column if not exists category text;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'document_record'
      and column_name = 'status'
  ) then
    update public.document_record
    set category = coalesce(nullif(category, ''), 'other')
    where category is null or category = '';
  end if;

  update public.document_record
  set category = 'other'
  where category is null or category = '';
end
$$;

create table if not exists public.document_record (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_type text not null,
  document_number_token text not null,
  document_number_last4 text not null,
  document_number_hash text not null,
  masked_number text not null,
  name_on_document text,
  category text not null default 'other',
  metadata jsonb,
  verified_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint document_record_document_type_check check (
    document_type in ('AADHAAR', 'PAN', 'VOTER', 'DRIVING_LICENSE', 'RATION')
  ),
  constraint document_record_last4_check check (
    char_length(document_number_last4) between 1 and 4
  ),
  constraint document_record_category_check check (
    category in ('personal', 'health', 'education', 'professional', 'financial', 'legal', 'other')
  ),
  constraint document_record_user_type_unique unique (user_id, document_type),
  constraint document_record_type_hash_unique unique (document_type, document_number_hash)
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'document_record_category_check'
      and conrelid = 'public.document_record'::regclass
  ) then
    alter table public.document_record
      add constraint document_record_category_check check (
        category in ('personal', 'health', 'education', 'professional', 'financial', 'legal', 'other')
      );
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'document_record'
      and column_name = 'status'
  ) then
    alter table public.document_record
      drop column if exists status;
  end if;
end
$$;

drop type if exists public.document_status;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'document_record'
      and column_name = 'address'
  ) then
    update public.document_record
    set metadata = jsonb_strip_nulls(
      coalesce(metadata, '{}'::jsonb) || jsonb_build_object('address', nullif(address, ''))
    )
    where nullif(address, '') is not null;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'document_record'
      and column_name = 'guardian_name'
  ) then
    update public.document_record
    set metadata = jsonb_strip_nulls(
      coalesce(metadata, '{}'::jsonb) || jsonb_build_object('guardian_name', nullif(guardian_name, ''))
    )
    where nullif(guardian_name, '') is not null;
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'document_record'
      and column_name = 'other_details'
  ) then
    update public.document_record
    set metadata = jsonb_strip_nulls(
      coalesce(metadata, '{}'::jsonb) || jsonb_build_object('other_details', nullif(other_details, ''))
    )
    where nullif(other_details, '') is not null;
  end if;
end
$$;

alter table public.document_record
  drop constraint if exists document_record_address_length_check,
  drop constraint if exists document_record_guardian_name_length_check,
  drop constraint if exists document_record_other_details_length_check;

alter table public.document_record
  drop column if exists address,
  drop column if exists guardian_name,
  drop column if exists other_details;

create index if not exists document_record_user_id_idx on public.document_record(user_id);
drop index if exists document_record_status_idx;
create index if not exists document_record_category_idx on public.document_record(category);
create index if not exists document_record_updated_at_idx on public.document_record(updated_at desc);

create table if not exists public.document_file (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.document_record(id) on delete cascade,
  file_path text not null,
  file_side text not null default 'front',
  mime_type text,
  size_bytes bigint,
  created_at timestamptz not null default timezone('utc', now()),
  constraint document_file_side_check check (file_side in ('front', 'back', 'selfie', 'other'))
);

create index if not exists document_file_document_id_idx on public.document_file(document_id);

create table if not exists public.document_access_audit (
  id bigint generated always as identity primary key,
  document_id uuid references public.document_record(id) on delete set null,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  context jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists document_access_audit_document_id_idx on public.document_access_audit(document_id);
create index if not exists document_access_audit_actor_user_id_idx on public.document_access_audit(actor_user_id);

alter table public.document_record enable row level security;
alter table public.document_file enable row level security;
alter table public.document_access_audit enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'document_record'
      and policyname = 'document_record_select_own'
  ) then
    create policy "document_record_select_own"
    on public.document_record
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
      and tablename = 'document_record'
      and policyname = 'document_record_insert_own'
  ) then
    create policy "document_record_insert_own"
    on public.document_record
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
      and tablename = 'document_record'
      and policyname = 'document_record_update_own'
  ) then
    create policy "document_record_update_own"
    on public.document_record
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
      and tablename = 'document_record'
      and policyname = 'document_record_delete_own'
  ) then
    create policy "document_record_delete_own"
    on public.document_record
    for delete
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
      and tablename = 'document_file'
      and policyname = 'document_file_select_own'
  ) then
    create policy "document_file_select_own"
    on public.document_file
    for select
    using (
      exists (
        select 1
        from public.document_record d
        where d.id = document_file.document_id
          and d.user_id = auth.uid()
      )
    );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'document_file'
      and policyname = 'document_file_mutate_own'
  ) then
    create policy "document_file_mutate_own"
    on public.document_file
    for all
    using (
      exists (
        select 1
        from public.document_record d
        where d.id = document_file.document_id
          and d.user_id = auth.uid()
      )
    )
    with check (
      exists (
        select 1
        from public.document_record d
        where d.id = document_file.document_id
          and d.user_id = auth.uid()
      )
    );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'document_access_audit'
      and policyname = 'document_access_audit_select_own'
  ) then
    create policy "document_access_audit_select_own"
    on public.document_access_audit
    for select
    using (
      exists (
        select 1
        from public.document_record d
        where d.id = document_access_audit.document_id
          and d.user_id = auth.uid()
      )
    );
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'document_access_audit'
      and policyname = 'document_access_audit_insert_own'
  ) then
    create policy "document_access_audit_insert_own"
    on public.document_access_audit
    for insert
    with check (
      actor_user_id = auth.uid()
    );
  end if;
end
$$;
