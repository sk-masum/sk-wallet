import { NextResponse } from 'next/server';

import { isCredentialTypeCode } from '@/constants/credential/types';
import {
  apiErrorResponse,
  badRequestResponse,
  deleteOwnedEntityById,
  ownedEntityNotFoundResponse,
  parseJsonBody,
  resolveOwnedRouteContext,
  serverErrorResponse,
  validationFailedResponse,
} from '@/app/api/shared/owned-route';
import { credentialPublicSelect } from '@/app/api/credential/shared';
import { normalizeTrimmedText } from '@/app/api/shared/payload-utils';
import { hashCredentialSecret } from '@/lib/security/credential-hash';
import { tokenizeCredentialSecret } from '@/lib/security/credential-token';
import type { CredentialFormPayload, CredentialTypeCode } from '@/models/credential';
import {
  maskCredentialSecret,
  normalizeCredentialSecret,
  validateCredentialFormFields,
} from '@/utils/credential/validation';

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
  const routeContext = await resolveOwnedRouteContext(context.params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { id, userId, prisma } = routeContext;

  const data = await prisma.credential_record.findFirst({
    where: { id, user_id: userId },
    select: credentialPublicSelect,
  });

  if (!data) {
    return ownedEntityNotFoundResponse('Credential');
  }

  return NextResponse.json({ data });
}

async function updateCredential(request: Request, context: { params: Promise<{ id: string }> }) {
  const routeContext = await resolveOwnedRouteContext(context.params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { id, userId, prisma } = routeContext;

  const payloadOrResponse = await parseJsonBody<CredentialFormPayload>(request);
  if (payloadOrResponse instanceof NextResponse) {
    return payloadOrResponse;
  }
  const payload = payloadOrResponse;

  const errors = validateCredentialFormFields(payload, { allowEmptySecret: true });
  if (Object.keys(errors).length > 0) {
    return validationFailedResponse(errors);
  }

  const type = String(payload.type ?? '')
    .trim()
    .toUpperCase();
  if (!isCredentialTypeCode(type)) {
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

  const serviceName = normalizeTrimmedText(payload.serviceName, 120);
  const identifier = normalizeTrimmedText(payload.identifier, 120);
  const url = normalizeTrimmedText(payload.url, 400);
  const notes = normalizeTrimmedText(payload.notes, 1000);
  const normalizedSecret = normalizeCredentialSecret(payload.secret ?? '');

  let secretToken = existing.secret_token;
  let secretHash = existing.secret_hash;
  let secretLast4 = existing.secret_last4;
  let maskedSecret = existing.masked_secret;

  if (normalizedSecret) {
    try {
      secretToken = tokenizeCredentialSecret(normalizedSecret);
    } catch {
      return serverErrorResponse('Credential tokenization is not configured correctly');
    }

    secretHash = hashCredentialSecret(
      type as CredentialTypeCode,
      serviceName.toLowerCase(),
      identifier.toLowerCase(),
      normalizedSecret,
    );
    secretLast4 = normalizedSecret.slice(-4);
    maskedSecret = maskCredentialSecret(normalizedSecret);
  }

  try {
    const data = await prisma.credential_record.update({
      where: { id },
      data: {
        credential_type: type,
        service_name: serviceName,
        identifier: identifier || null,
        secret_token: secretToken,
        secret_hash: secretHash,
        secret_last4: secretLast4,
        masked_secret: maskedSecret,
        url: url || null,
        notes: notes || null,
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
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return updateCredential(request, context);
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  return updateCredential(request, context);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const routeContext = await resolveOwnedRouteContext(context.params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { id, userId, prisma } = routeContext;

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
}
