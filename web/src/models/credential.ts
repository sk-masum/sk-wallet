export enum CredentialTypeCode {
  LOGIN = 'LOGIN',
  BANKING = 'BANKING',
  PIN = 'PIN',
  API_KEY = 'API_KEY',
  WIFI = 'WIFI',
  OTHER = 'OTHER',
}

export type UserCredential = {
  id: string
  user_id: string
  credential_type: CredentialTypeCode
  service_name: string
  identifier: string | null
  masked_secret: string
  secret_last4: string
  url: string | null
  notes: string | null
  metadata: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

export type CredentialTypeFieldConfig = {
  code: CredentialTypeCode
  label: string
  placeholder: string
  hint: string
}

export type CredentialFormPayload = {
  type: string
  serviceName: string
  identifier?: string
  secret?: string
  url?: string
  notes?: string
  metadata?: Record<string, unknown>
}

export type CredentialFormFieldErrors = Partial<{
  type: string
  serviceName: string
  identifier: string
  secret: string
  url: string
  notes: string
}>
