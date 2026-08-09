import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';

import {
  apiErrorResponse,
  parseJsonBody,
  serverErrorResponse,
  withUserRouteContext,
} from '@/app/api/shared/owned-route';
import {
  type CardWritePayload,
  mapCardForResponse,
  prepareCardWriteData,
} from '@/app/api/card/shared';

export async function GET() {
  return withUserRouteContext(async ({ userId, prisma }) => {
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
  });
}

export async function POST(request: Request) {
  return withUserRouteContext(async ({ userId, prisma }) => {
    const payloadOrResponse = await parseJsonBody<CardWritePayload>(request);
    if (payloadOrResponse instanceof NextResponse) {
      return payloadOrResponse;
    }
    const payload = payloadOrResponse;

    const writePreparation = await prepareCardWriteData(prisma, payload, 'create');
    if (!writePreparation.ok) {
      if (writePreparation.errorCode === 'TOKENIZATION') {
        return serverErrorResponse(writePreparation.message);
      }
      return apiErrorResponse(writePreparation.message, 500);
    }

    const createData: Prisma.cardUncheckedCreateInput = {
      owner_id: userId,
      ...writePreparation.writeData,
    };

    await prisma.card.create({
      data: createData,
    });

    return NextResponse.json({ success: true });
  });
}
