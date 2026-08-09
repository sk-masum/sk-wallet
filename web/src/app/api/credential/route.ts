import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

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

function getCredentialWriteErrorMessage(error: { code?: string; message: string }) {
  if (error.code === 'P2002') {
    return 'A credential with the same type, service, and identifier already exists.';
  }

  return error.message;
}

export async function GET() {
  return withUserRouteContext(async ({ userId, prisma }) => {
    const data = await prisma.credential_record.findMany({
      where: {
        user_id: userId,
      },
      select: credentialPublicSelect,
    });

    return NextResponse.json({ data: data ?? [] });
  });
}

export async function POST(request: Request) {
  return withUserRouteContext(async ({ userId, prisma }) => {
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
      const data = await prisma.credential_record.create({
        data: {
          user_id: userId,
          ...buildCredentialCommonWriteData(normalizedInput),
          secret_token: secretPreparation.data.secretToken,
          secret_hash: secretPreparation.data.secretHash,
          secret_last4: secretPreparation.data.secretLast4,
          masked_secret: secretPreparation.data.maskedSecret,
          metadata: metadata ? (metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
        },
        select: credentialPublicSelect,
      });

      return NextResponse.json({ success: true, data });
    } catch (error) {
      const message = getCredentialWriteErrorMessage(error as { code?: string; message: string });
      return apiErrorResponse(message, 500);
    }
  });
}
