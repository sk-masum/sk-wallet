import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import {
  apiErrorResponse,
  badRequestResponse,
  parseJsonBody,
  resolveUserRouteContext,
  serverErrorResponse,
  validationFailedResponse,
} from '@/app/api/shared/owned-route';
import { normalizeTrimmedText, toMetadataRecordOrNull } from '@/app/api/shared/payload-utils';
import { credentialPublicSelect } from '@/app/api/credential/shared';
import { hashCredentialSecret } from '@/lib/security/credential-hash';
import { tokenizeCredentialSecret } from '@/lib/security/credential-token';
import { isCredentialTypeCode } from '@/constants/credential/types';
import { type CredentialFormPayload, type CredentialTypeCode } from '@/models/credential';
import {
  maskCredentialSecret,
  normalizeCredentialSecret,
  validateCredentialFormFields,
} from '@/utils/credential/validation';

function getCredentialWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2002') {
    return 'A credential with the same type, service, and identifier already exists.';
  }

  return error.message;
}

export async function GET() {
  const routeContext = await resolveUserRouteContext();
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { userId, prisma } = routeContext;

  const data = await prisma.credential_record.findMany({
    where: {
      user_id: userId,
    },
    select: credentialPublicSelect,
  });

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const routeContext = await resolveUserRouteContext();
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { userId, prisma } = routeContext;

  const payloadOrResponse = await parseJsonBody<CredentialFormPayload>(request);
  if (payloadOrResponse instanceof NextResponse) {
    return payloadOrResponse;
  }
  const payload = payloadOrResponse;

  const errors = validateCredentialFormFields(payload);
  if (Object.keys(errors).length > 0) {
    return validationFailedResponse(errors);
  }

  const type = String(payload.type ?? '')
    .trim()
    .toUpperCase();
  if (!isCredentialTypeCode(type)) {
    return badRequestResponse('Unsupported credential type');
  }

  const serviceName = normalizeTrimmedText(payload.serviceName, 120);
  const identifier = normalizeTrimmedText(payload.identifier, 120);
  const url = normalizeTrimmedText(payload.url, 400);
  const notes = normalizeTrimmedText(payload.notes, 1000);
  const normalizedSecret = normalizeCredentialSecret(payload.secret ?? '');

  let tokenizedSecret = '';
  try {
    tokenizedSecret = tokenizeCredentialSecret(normalizedSecret);
  } catch {
    return serverErrorResponse('Credential tokenization is not configured correctly');
  }

  const maskedSecret = maskCredentialSecret(normalizedSecret);
  const secretLast4 = normalizedSecret.slice(-4);
  const secretHash = hashCredentialSecret(
    type as CredentialTypeCode,
    serviceName.toLowerCase(),
    identifier.toLowerCase(),
    normalizedSecret,
  );

  const metadata = toMetadataRecordOrNull(payload.metadata);

  try {
    const data = await prisma.credential_record.create({
      data: {
        user_id: userId,
        credential_type: type,
        service_name: serviceName,
        identifier: identifier || null,
        secret_token: tokenizedSecret,
        secret_hash: secretHash,
        secret_last4: secretLast4,
        masked_secret: maskedSecret,
        url: url || null,
        notes: notes || null,
        metadata: metadata ? (metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
      select: credentialPublicSelect,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = getCredentialWriteErrorMessage(error as { code?: string; message: string });
    return apiErrorResponse(message, 500);
  }
}
