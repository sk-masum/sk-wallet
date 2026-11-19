import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { card } from '@/db/schema';
import type { Db } from '@/db/client';

import {
  apiErrorResponse,
  badRequestResponse,
  ownedEntityNotFoundResponse,
  parseJsonBody,
  serverErrorResponse,
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
  cardId: number;
  userId: string;
  db: Db;
};

function cardNotFoundResponse() {
  return ownedEntityNotFoundResponse('Card');
}

function toCardIdOrNull(value: string) {
  try {
    return Number(value);
  } catch {
    return null;
  }
}

function findOwnedCardById(
  db: Db,
  cardId: number,
  userId: string,
) {
  return db
    .select({ id: card.id })
    .from(card)
    .where(and(eq(card.id, cardId), eq(card.owner_id, userId)))
    .limit(1)
    .then((data) => (data.length > 0 ? data[0] : null));
}

async function withOwnedCardRouteContext(
  paramsPromise: Promise<{ id: string }>,
  handler: (context: OwnedCardRouteContext) => Promise<Response> | Response,
) {
  return withOwnedRouteContext(paramsPromise, async ({ id, userId, db }) => {
    const cardId = toCardIdOrNull(id);
    if (cardId === null) {
      return cardNotFoundResponse();
    }

    return handler({ cardId, userId, db });
  });
}

async function ensureOwnedCardExists({ cardId, userId, db }: OwnedCardRouteContext) {
  const existing = await findOwnedCardById(db, cardId, userId);
  return Boolean(existing);
}

export async function GET(_request: Request, { params }: Params) {
  return withOwnedCardRouteContext(params, async ({ cardId, userId, db }) => {
    const data = await db
      .select()
      .from(card)
      .where(and(eq(card.id, cardId), eq(card.owner_id, userId)))
      .limit(1)
      .then((result) => (result.length > 0 ? result[0] : null));

    if (!data) {
      return cardNotFoundResponse();
    }

    return NextResponse.json({ data: mapCardForResponse(data) });
  });
}

export async function PUT(request: Request, { params }: Params) {
  return withOwnedCardRouteContext(params, async ({ cardId, userId, db }) => {
    if (!(await ensureOwnedCardExists({ cardId, userId, db }))) {
      return cardNotFoundResponse();
    }

    const payloadOrResponse = await parseJsonBody<CardWritePayload>(request);
    if (payloadOrResponse instanceof NextResponse) {
      return payloadOrResponse;
    }
    const payload = payloadOrResponse;

    const writePreparation = await prepareCardWriteData(db, payload, 'update');
    if (!writePreparation.ok) {
      if (writePreparation.errorCode === 'TOKENIZATION') {
        return serverErrorResponse(writePreparation.message);
      }
      return apiErrorResponse(writePreparation.message, 500);
    }

    await db
      .update(card)
      .set(writePreparation.writeData)
      .where(eq(card.id, cardId));

    return NextResponse.json({ success: true });
  });
}

export async function PATCH(request: Request, { params }: Params) {
  return withOwnedCardRouteContext(params, async ({ cardId, userId, db }) => {
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

    if (!(await ensureOwnedCardExists({ cardId, userId, db }))) {
      return cardNotFoundResponse();
    }

    await db
      .update(card)
      .set({ status: normalizedStatus })
      .where(eq(card.id, cardId));

    return NextResponse.json({ success: true });
  });
}

export async function DELETE(_request: Request, { params }: Params) {
  return withOwnedCardRouteContext(params, async ({ cardId, userId, db }) => {
    if (!(await ensureOwnedCardExists({ cardId, userId, db }))) {
      return cardNotFoundResponse();
    }

    await db
      .update(card)
      .set({ status: 'replaced' })
      .where(eq(card.id, cardId));

    return NextResponse.json({ success: true });
  });
}
