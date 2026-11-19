import { normalizeTrimmedText } from '@/app/api/shared/payload-utils';
import { hashCredentialSecret } from '@/lib/security/credential-hash';
import { tokenizeCredentialSecret } from '@/lib/security/credential-token';
import type { CredentialFormPayload, CredentialTypeCode } from '@/models/credential';
import { maskCredentialSecret, normalizeCredentialSecret } from '@/utils/credential/validation';
import { credential_record } from '@/db/schema';

export const credentialPublicSelect = {
  id: credential_record.id,
  user_id: credential_record.user_id,
  credential_type: credential_record.credential_type,
  service_name: credential_record.service_name,
  identifier: credential_record.identifier,
  masked_secret: credential_record.masked_secret,
  secret_last4: credential_record.secret_last4,
  url: credential_record.url,
  notes: credential_record.notes,
  metadata: credential_record.metadata,
  created_at: credential_record.created_at,
  updated_at: credential_record.updated_at,
};

export const credentialSecretTokenSelect = {
  id: credential_record.id,
  secret_token: credential_record.secret_token,
};

export type CredentialNormalizedWriteInput = {
  type: string;
  serviceName: string;
  identifier: string;
  url: string;
  notes: string;
  normalizedSecret: string;
};

export type CredentialSecretFields = {
  secretToken: string;
  secretHash: string;
  secretLast4: string;
  maskedSecret: string;
};

export type CredentialSecretPreparationResult =
  | {
      ok: true;
      data: CredentialSecretFields;
    }
  | {
      ok: false;
      message: string;
    };

export function normalizeCredentialWriteInput(
  payload: CredentialFormPayload,
): CredentialNormalizedWriteInput {
  return {
    type: String(payload.type ?? '')
      .trim()
      .toUpperCase(),
    serviceName: normalizeTrimmedText(payload.serviceName, 120),
    identifier: normalizeTrimmedText(payload.identifier, 120),
    url: normalizeTrimmedText(payload.url, 400),
    notes: normalizeTrimmedText(payload.notes, 1000),
    normalizedSecret: normalizeCredentialSecret(payload.secret ?? ''),
  };
}

export function buildCredentialCommonWriteData(input: CredentialNormalizedWriteInput) {
  return {
    credential_type: input.type,
    service_name: input.serviceName,
    identifier: input.identifier || null,
    url: input.url || null,
    notes: input.notes || null,
  };
}

export function prepareCredentialSecretForCreate(
  input: CredentialNormalizedWriteInput,
  credentialType: CredentialTypeCode,
): CredentialSecretPreparationResult {
  try {
    const secretToken = tokenizeCredentialSecret(input.normalizedSecret);
    const secretHash = hashCredentialSecret(
      credentialType,
      input.serviceName.toLowerCase(),
      input.identifier.toLowerCase(),
      input.normalizedSecret,
    );

    return {
      ok: true,
      data: {
        secretToken,
        secretHash,
        secretLast4: input.normalizedSecret.slice(-4),
        maskedSecret: maskCredentialSecret(input.normalizedSecret),
      },
    };
  } catch {
    return {
      ok: false,
      message: 'Credential tokenization is not configured correctly',
    };
  }
}

export function prepareCredentialSecretForUpdate(
  input: CredentialNormalizedWriteInput,
  credentialType: CredentialTypeCode,
  existing: CredentialSecretFields,
): CredentialSecretPreparationResult {
  if (!input.normalizedSecret) {
    return {
      ok: true,
      data: existing,
    };
  }

  return prepareCredentialSecretForCreate(input, credentialType);
}
