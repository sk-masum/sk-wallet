-- Expand supported document types in document_record.
-- Run this migration in Supabase SQL editor for existing databases.

alter table if exists public.document_record
  drop constraint if exists document_record_document_type_check;

alter table if exists public.document_record
  add constraint document_record_document_type_check check (
    document_type in (
      'AADHAAR',
      'PAN',
      'VOTER',
      'DRIVING_LICENSE',
      'RATION',
      'PASSPORT',
      'BIRTH_CERTIFICATE',
      'VEHICLE_RC',
      'PASSBOOK',
      'OTHERS'
    )
    or (
      category = 'other'
      and length(btrim(document_type)) between 2 and 60
    )
  );
