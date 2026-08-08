import { NextResponse } from 'next/server';

import {
  apiErrorResponse,
  badRequestResponse,
  hasOwnedEntity,
  parseJsonBody,
  serverErrorResponse,
} from '@/app/api/shared/owned-route';
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import { getRequiredPrismaClient } from '@/lib/prisma';
import { isCardStatus } from '@/constants/card/status';
import { tokenizeCardCvv, tokenizeCardNumber } from '@/lib/security/card-token';
import {
  buildCardWriteData,
  type CardWritePayload,
  mapCardForResponse,
  resolveOrCreateProvider,
} from '@/app/api/card/shared';

type Params = {
  params: Promise<{ id: string }>;
};

type RouteContext = {
  cardId: bigint;
  userId: string;
  prisma: ReturnType<typeof getRequiredPrismaClient>;
};

function cardNotFoundResponse() {
  return NextResponse.json({ error: 'Card not found' }, { status: 404 });
}

async function resolveRouteContext(
  paramsPromise: Promise<{ id: string }>,
): Promise<RouteContext | NextResponse> {
  const { id } = await paramsPromise;
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  let cardId: bigint;

  try {
    cardId = BigInt(id);
  } catch {
    return cardNotFoundResponse();
  }

  return {
    cardId,
    userId: user.id,
    prisma: getRequiredPrismaClient(),
  };
}

function findOwnedCardById(
  prisma: ReturnType<typeof getRequiredPrismaClient>,
  cardId: bigint,
  userId: string,
) {
  return prisma.card.findFirst({
    where: { id: cardId, owner_id: userId },
    select: { id: true },
  });
}

export async function GET(_request: Request, { params }: Params) {
  const routeContext = await resolveRouteContext(params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { cardId, userId, prisma } = routeContext;

  const data = await prisma.card.findFirst({
    where: { id: cardId, owner_id: userId },
    include: {
      card_provider: {
        select: { name: true },
      },
    },
  });

  if (!data) {
    return cardNotFoundResponse();
  }

  return NextResponse.json({ data: mapCardForResponse(data) });
}

export async function PUT(request: Request, { params }: Params) {
  const routeContext = await resolveRouteContext(params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { cardId, userId, prisma } = routeContext;

  if (
    !(await hasOwnedEntity({
      id: cardId,
      userId,
      findOwnedById: (lookupCardId, ownerId) => findOwnedCardById(prisma, lookupCardId, ownerId),
    }))
  ) {
    return cardNotFoundResponse();
  }

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

  await prisma.card.update({
    where: { id: cardId },
    data: buildCardWriteData(payload, providerId, tokenizedNumber, tokenizedCvv, 'update'),
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request, { params }: Params) {
  const routeContext = await resolveRouteContext(params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { cardId, userId, prisma } = routeContext;

  const payloadOrResponse = await parseJsonBody<{
    status?: string;
  }>(request);
  if (payloadOrResponse instanceof NextResponse) {
    return payloadOrResponse;
  }
  const payload = payloadOrResponse;

  const normalizedStatus = String(payload.status ?? '')
    .trim()
    .toLowerCase();

  if (!isCardStatus(normalizedStatus)) {
    return badRequestResponse('Invalid card status');
  }

  if (
    !(await hasOwnedEntity({
      id: cardId,
      userId,
      findOwnedById: (lookupCardId, ownerId) => findOwnedCardById(prisma, lookupCardId, ownerId),
    }))
  ) {
    return cardNotFoundResponse();
  }

  await prisma.card.update({
    where: { id: cardId },
    data: { status: normalizedStatus },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  const routeContext = await resolveRouteContext(params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { cardId, userId, prisma } = routeContext;

  if (
    !(await hasOwnedEntity({
      id: cardId,
      userId,
      findOwnedById: (lookupCardId, ownerId) => findOwnedCardById(prisma, lookupCardId, ownerId),
    }))
  ) {
    return cardNotFoundResponse();
  }

  await prisma.card.update({ where: { id: cardId }, data: { status: 'replaced' } });

  return NextResponse.json({ success: true });
}
