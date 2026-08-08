import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import {
  apiErrorResponse,
  parseJsonBody,
  resolveUserRouteContext,
  serverErrorResponse,
} from '@/app/api/shared/owned-route';
import { tokenizeCardCvv, tokenizeCardNumber } from '@/lib/security/card-token';
import {
  buildCardWriteData,
  type CardWritePayload,
  mapCardForResponse,
  resolveOrCreateProvider,
} from '@/app/api/card/shared';

export async function GET() {
  const routeContext = await resolveUserRouteContext();
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { userId, prisma } = routeContext;

  const data = await prisma.card.findMany({
    where: {
      owner_id: userId,
    },
    include: {
      card_provider: {
        select: { name: true },
      },
    },
  });

  const detokenizedData = data.map(mapCardForResponse);

  return NextResponse.json({ data: detokenizedData });
}

export async function POST(request: Request) {
  const routeContext = await resolveUserRouteContext();
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { userId, prisma } = routeContext;

  const payloadOrResponse = await parseJsonBody<CardWritePayload>(request);
  if (payloadOrResponse instanceof NextResponse) {
    return payloadOrResponse;
  }
  const payload = payloadOrResponse;

  let tokenizedNumber = '';
  let tokenizedCvv = '';

  try {
    tokenizedNumber = tokenizeCardNumber(String(payload.number ?? ''));
    tokenizedCvv = tokenizeCardCvv(String(payload.cvv ?? ''));
  } catch {
    return serverErrorResponse('Card tokenization is not configured correctly');
  }

  const { providerId, error: providerError } = await resolveOrCreateProvider(
    prisma,
    payload.provider,
  );

  if (providerError) {
    return apiErrorResponse(providerError, 500);
  }

  const writeData = buildCardWriteData(
    payload,
    providerId,
    tokenizedNumber,
    tokenizedCvv,
    'create',
  );

  const createData: Prisma.cardUncheckedCreateInput = {
    owner_id: userId,
    ...writeData,
  };

  await prisma.card.create({
    data: createData,
  });

  return NextResponse.json({ success: true });
}
