-- Expand supported credential types in credential_record for existing databases.

alter table if exists public.credential_record
  drop constraint if exists credential_record_type_check;

alter table if exists public.credential_record
  add constraint credential_record_type_check check (
    credential_type in (
      'LOGIN',
      'EMAIL',
      'SOCIAL',
      'BANKING',
      'PIN',
      'OTP',
      'WALLET',
      'API_KEY',
      'SERVER',
      'DATABASE',
      'WIFI',
      'OTHER'
    )
  );
