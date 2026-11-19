import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { eq, and } from 'drizzle-orm';
import { credential_record } from '@/db/schema';

import {
  apiErrorResponse,
  badRequestResponse,
  parseJsonBody,
  serverErrorResponse,
  validationFailedResponse,
  withUserRouteContext,
} from '@/app/api/shared/owned-route';
import { toMetadataRecordOrNull } from '@/app/api/shared/payload-utils';
import {
  buildCredentialCommonWriteData,
  credentialPublicSelect,
  normalizeCredentialWriteInput,
  prepareCredentialSecretForCreate,
} from '@/app/api/credential/shared';
import { isCredentialTypeCode } from '@/constants/credential/types';
import { type CredentialFormPayload, type CredentialTypeCode } from '@/models/credential';
import { validateCredentialFormFields } from '@/utils/credential/validation';

function getCredentialWriteErrorMessage(error: Error | { message: string }) {
  const message = error.message || String(error);
  if (message.includes('UNIQUE constraint failed')) {
    return 'A credential with the same type, service, and identifier already exists.';
  }

  return message;
}

export async function GET() {
  return withUserRouteContext(async ({ userId, db }) => {
    const data = await db
      .select({
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
      })
      .from(credential_record)
      .where(eq(credential_record.user_id, userId));

    return NextResponse.json({ data: data ?? [] });
  });
}

export async function POST(request: Request) {
  return withUserRouteContext(async ({ userId, db }) => {
    const payloadOrResponse = await parseJsonBody<CredentialFormPayload>(request);
    if (payloadOrResponse instanceof NextResponse) {
      return payloadOrResponse;
    }
    const payload = payloadOrResponse;

    const errors = validateCredentialFormFields(payload);
    if (Object.keys(errors).length > 0) {
      return validationFailedResponse(errors);
    }

    const normalizedInput = normalizeCredentialWriteInput(payload);

    if (!isCredentialTypeCode(normalizedInput.type)) {
      return badRequestResponse('Unsupported credential type');
    }

    const secretPreparation = prepareCredentialSecretForCreate(
      normalizedInput,
      normalizedInput.type as CredentialTypeCode,
    );
    if (!secretPreparation.ok) {
      return serverErrorResponse(secretPreparation.message);
    }

    const metadata = toMetadataRecordOrNull(payload.metadata);

    try {
      const credentialId = randomUUID();
      const data = await db
        .insert(credential_record)
        .values({
          id: credentialId,
          user_id: userId,
          ...buildCredentialCommonWriteData(normalizedInput),
          secret_token: secretPreparation.data.secretToken,
          secret_hash: secretPreparation.data.secretHash,
          secret_last4: secretPreparation.data.secretLast4,
          masked_secret: secretPreparation.data.maskedSecret,
          metadata: metadata ? JSON.stringify(metadata) : null,
        })
        .returning({
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
        });

      return NextResponse.json({ success: true, data: data[0] });
    } catch (error) {
      const message = getCredentialWriteErrorMessage(error as Error);
      return apiErrorResponse(message, 500);
    }
  });
}
