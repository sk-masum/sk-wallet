-- Allow users to store multiple documents with the same document_type.
-- Keep duplicate document-number protection via document_record_type_hash_unique.

alter table if exists public.document_record
  drop constraint if exists document_record_user_type_unique;
