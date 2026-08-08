export const credentialPublicSelect = {
  id: true,
  user_id: true,
  credential_type: true,
  service_name: true,
  identifier: true,
  masked_secret: true,
  secret_last4: true,
  url: true,
  notes: true,
  metadata: true,
  created_at: true,
  updated_at: true,
} as const;

export const credentialSecretTokenSelect = {
  id: true,
  secret_token: true,
} as const;
