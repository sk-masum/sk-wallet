export const documentListSelect = {
  id: true,
  user_id: true,
  document_type: true,
  masked_number: true,
  document_number_last4: true,
  name_on_document: true,
  category: true,
  metadata: true,
  verified_at: true,
  expires_at: true,
  created_at: true,
  updated_at: true,
} as const;

export const documentDetailSelectWithToken = {
  ...documentListSelect,
  document_number_token: true,
} as const;
