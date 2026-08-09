import { NextResponse } from 'next/server';

import {
  apiErrorResponse,
  badRequestResponse,
  ownedEntityNotFoundResponse,
  parseJsonBody,
  serverErrorResponse,
  type UserRouteContext,
  withOwnedRouteContext,
} from '@/app/api/shared/owned-route';
import { isCardStatus } from '@/constants/card/status';
import {
  type CardWritePayload,
  mapCardForResponse,
  prepareCardWriteData,
} from '@/app/api/card/shared';

type Params = {
  params: Promise<{ id: string }>;
};

type OwnedCardRouteContext = {
  cardId: bigint;
  userId: string;
  prisma: UserRouteContext['prisma'];
};

function cardNotFoundResponse() {
  return ownedEntityNotFoundResponse('Card');
}

function toCardIdOrNull(value: string) {
  try {
    return BigInt(value);
  } catch {
    return null;
  }
}

function findOwnedCardById(
  prisma: OwnedCardRouteContext['prisma'],
  cardId: bigint,
  userId: string,
) {
  return prisma.card.findFirst({
    where: { id: cardId, owner_id: userId },
    select: { id: true },
  });
}

async function withOwnedCardRouteContext(
  paramsPromise: Promise<{ id: string }>,
  handler: (context: OwnedCardRouteContext) => Promise<Response> | Response,
) {
  return withOwnedRouteContext(paramsPromise, async ({ id, userId, prisma }) => {
    const cardId = toCardIdOrNull(id);
    if (cardId === null) {
      return cardNotFoundResponse();
    }

    return handler({ cardId, userId, prisma });
  });
}

async function ensureOwnedCardExists({ cardId, userId, prisma }: OwnedCardRouteContext) {
  const existing = await findOwnedCardById(prisma, cardId, userId);
  return Boolean(existing);
}

export async function GET(_request: Request, { params }: Params) {
  return withOwnedCardRouteContext(params, async ({ cardId, userId, prisma }) => {
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
  });
}

export async function PUT(request: Request, { params }: Params) {
  return withOwnedCardRouteContext(params, async ({ cardId, userId, prisma }) => {
    if (!(await ensureOwnedCardExists({ cardId, userId, prisma }))) {
      return cardNotFoundResponse();
    }

    const payloadOrResponse = await parseJsonBody<CardWritePayload>(request);
    if (payloadOrResponse instanceof NextResponse) {
      return payloadOrResponse;
    }
    const payload = payloadOrResponse;

    const writePreparation = await prepareCardWriteData(prisma, payload, 'update');
    if (!writePreparation.ok) {
      if (writePreparation.errorCode === 'TOKENIZATION') {
        return serverErrorResponse(writePreparation.message);
      }
      return apiErrorResponse(writePreparation.message, 500);
    }

    await prisma.card.update({
      where: { id: cardId },
      data: writePreparation.writeData,
    });

    return NextResponse.json({ success: true });
  });
}

export async function PATCH(request: Request, { params }: Params) {
  return withOwnedCardRouteContext(params, async ({ cardId, userId, prisma }) => {
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

    if (!(await ensureOwnedCardExists({ cardId, userId, prisma }))) {
      return cardNotFoundResponse();
    }

    await prisma.card.update({
      where: { id: cardId },
      data: { status: normalizedStatus },
    });

    return NextResponse.json({ success: true });
  });
}

export async function DELETE(_request: Request, { params }: Params) {
  return withOwnedCardRouteContext(params, async ({ cardId, userId, prisma }) => {
    if (!(await ensureOwnedCardExists({ cardId, userId, prisma }))) {
      return cardNotFoundResponse();
    }

    await prisma.card.update({ where: { id: cardId }, data: { status: 'replaced' } });

    return NextResponse.json({ success: true });
  });
}
