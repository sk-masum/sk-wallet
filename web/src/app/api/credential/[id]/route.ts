import { NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { credential_record } from '@/db/schema';

import {
  apiErrorResponse,
  badRequestResponse,
  deleteOwnedEntityById,
  ownedEntityNotFoundResponse,
  parseJsonBody,
  serverErrorResponse,
  validationFailedResponse,
  withOwnedRouteContext,
} from '@/app/api/shared/owned-route';
import {
  buildCredentialCommonWriteData,
  credentialPublicSelect,
  normalizeCredentialWriteInput,
  prepareCredentialSecretForUpdate,
} from '@/app/api/credential/shared';
import type { CredentialFormPayload, CredentialTypeCode } from '@/models/credential';
import { validateCredentialFormFields } from '@/utils/credential/validation';
import { isCredentialTypeCode } from '@/constants/credential/types';

function getCredentialWriteErrorMessage(error: Error | { message: string }) {
  const message = error.message || String(error);
  if (message.includes('no rows') || message.includes('not found')) {
    return 'Credential not found';
  }

  if (message.includes('UNIQUE constraint failed')) {
    return 'A credential with the same type, service, and identifier already exists.';
  }

  return message;
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, db }) => {
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
      .where(and(eq(credential_record.id, id), eq(credential_record.user_id, userId)))
      .limit(1);

    if (!data || data.length === 0) {
      return ownedEntityNotFoundResponse('Credential');
    }

    return NextResponse.json({ data: data[0] });
  });
}

async function updateCredential(request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, db }) => {
    const payloadOrResponse = await parseJsonBody<CredentialFormPayload>(request);
    if (payloadOrResponse instanceof NextResponse) {
      return payloadOrResponse;
    }
    const payload = payloadOrResponse;

    const errors = validateCredentialFormFields(payload, { allowEmptySecret: true });
    if (Object.keys(errors).length > 0) {
      return validationFailedResponse(errors);
    }

    const normalizedInput = normalizeCredentialWriteInput(payload);

    if (!isCredentialTypeCode(normalizedInput.type)) {
      return badRequestResponse('Unsupported credential type');
    }

    const existing = await db
      .select({
        id: credential_record.id,
        secret_token: credential_record.secret_token,
        secret_hash: credential_record.secret_hash,
        secret_last4: credential_record.secret_last4,
        masked_secret: credential_record.masked_secret,
        user_id: credential_record.user_id,
      })
      .from(credential_record)
      .where(and(eq(credential_record.id, id), eq(credential_record.user_id, userId)))
      .limit(1);

    if (!existing || existing.length === 0) {
      return ownedEntityNotFoundResponse('Credential');
    }

    const secretPreparation = prepareCredentialSecretForUpdate(
      normalizedInput,
      normalizedInput.type as CredentialTypeCode,
      {
        secretToken: existing[0].secret_token,
        secretHash: existing[0].secret_hash,
        secretLast4: existing[0].secret_last4,
        maskedSecret: existing[0].masked_secret,
      },
    );
    if (!secretPreparation.ok) {
      return serverErrorResponse(secretPreparation.message);
    }

    try {
      const data = await db
        .update(credential_record)
        .set({
          ...buildCredentialCommonWriteData(normalizedInput),
          secret_token: secretPreparation.data.secretToken,
          secret_hash: secretPreparation.data.secretHash,
          secret_last4: secretPreparation.data.secretLast4,
          masked_secret: secretPreparation.data.maskedSecret,
        })
        .where(eq(credential_record.id, id))
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

      if (!data || data.length === 0) {
        return ownedEntityNotFoundResponse('Credential');
      }

      if (data[0].user_id !== userId) {
        return ownedEntityNotFoundResponse('Credential');
      }

      return NextResponse.json({ success: true, data: data[0] });
    } catch (error) {
      const message = getCredentialWriteErrorMessage(error as Error);
      const status = message.includes('not found') ? 404 : 500;
      return apiErrorResponse(message, status);
    }
  });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return updateCredential(request, context);
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  return updateCredential(request, context);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, db }) => {
    return deleteOwnedEntityById({
      id,
      userId,
      entityLabel: 'Credential',
      findOwnedById: (recordId, ownerId) =>
        db
          .select({ id: credential_record.id })
          .from(credential_record)
          .where(and(eq(credential_record.id, recordId), eq(credential_record.user_id, ownerId)))
          .limit(1)
          .then((data) => (data.length > 0 ? data[0] : null)),
      deleteById: (recordId) =>
        db
          .delete(credential_record)
          .where(eq(credential_record.id, recordId))
          .then(() => undefined),
    });
  });
}
