import { NextResponse } from 'next/server';

import { isCredentialTypeCode } from '@/constants/credential/types';
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

function getCredentialWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2025') {
    return 'Credential not found';
  }

  if (error.code === 'P2002') {
    return 'A credential with the same type, service, and identifier already exists.';
  }

  return error.message;
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, prisma }) => {
    const data = await prisma.credential_record.findFirst({
      where: { id, user_id: userId },
      select: credentialPublicSelect,
    });

    if (!data) {
      return ownedEntityNotFoundResponse('Credential');
    }

    return NextResponse.json({ data });
  });
}

async function updateCredential(request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, prisma }) => {
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

    const existing = await prisma.credential_record.findFirst({
      where: { id, user_id: userId },
      select: {
        id: true,
        secret_token: true,
        secret_hash: true,
        secret_last4: true,
        masked_secret: true,
      },
    });

    if (!existing) {
      return ownedEntityNotFoundResponse('Credential');
    }

    const secretPreparation = prepareCredentialSecretForUpdate(
      normalizedInput,
      normalizedInput.type as CredentialTypeCode,
      {
        secretToken: existing.secret_token,
        secretHash: existing.secret_hash,
        secretLast4: existing.secret_last4,
        maskedSecret: existing.masked_secret,
      },
    );
    if (!secretPreparation.ok) {
      return serverErrorResponse(secretPreparation.message);
    }

    try {
      const data = await prisma.credential_record.update({
        where: { id },
        data: {
          ...buildCredentialCommonWriteData(normalizedInput),
          secret_token: secretPreparation.data.secretToken,
          secret_hash: secretPreparation.data.secretHash,
          secret_last4: secretPreparation.data.secretLast4,
          masked_secret: secretPreparation.data.maskedSecret,
        },
        select: credentialPublicSelect,
      });

      if (data.user_id !== userId) {
        return ownedEntityNotFoundResponse('Credential');
      }

      return NextResponse.json({ success: true, data });
    } catch (error) {
      const message = getCredentialWriteErrorMessage(error as { code?: string; message: string });
      const status = (error as { code?: string }).code === 'P2025' ? 404 : 500;
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
  return withOwnedRouteContext(context.params, async ({ id, userId, prisma }) => {
    return deleteOwnedEntityById({
      id,
      userId,
      entityLabel: 'Credential',
      findOwnedById: (recordId, ownerId) =>
        prisma.credential_record.findFirst({
          where: { id: recordId, user_id: ownerId },
          select: { id: true },
        }),
      deleteById: (recordId) =>
        prisma.credential_record.delete({ where: { id: recordId } }).then(() => undefined),
    });
  });
}
