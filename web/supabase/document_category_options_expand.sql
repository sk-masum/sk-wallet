-- Expand supported document categories in document_record.

alter table if exists public.document_record
  drop constraint if exists document_record_category_check;

alter table if exists public.document_record
  add constraint document_record_category_check check (
    category in (
      'personal',
      'family',
      'health',
      'education',
      'professional',
      'financial',
      'legal',
      'travel',
      'property',
      'insurance',
      'vehicle',
      'government',
      'other'
    )
  );
