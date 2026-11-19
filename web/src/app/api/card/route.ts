import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
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
import { User, card } from '@/db/schema';

export async function GET() {
  return withUserRouteContext(async ({ userId, db }) => {
    const data = await db
      .select({
        id: card.id,
        created_at: card.created_at,
        card_name: card.card_name,
        number: card.number,
        cvv: card.cvv,
        holder_name: card.holder_name,
        network: card.network,
        isCredit: card.isCredit,
        expiry_month: card.expiry_month,
        expiry_year: card.expiry_year,
        owner_id: card.owner_id,
        color_name: card.color_name,
        tags: card.tags,
        status: card.status,
        credit_limit: card.credit_limit,
        provider_id: card.provider_id,
        billing_date: card.billing_date,
        payment_date: card.payment_date,
      })
      .from(card)
      .where(eq(card.owner_id, userId));

    const detokenizedData = data.map(mapCardForResponse);

    return NextResponse.json({ data: detokenizedData });
  });
}

export async function POST(request: Request) {
  return withUserRouteContext(async ({ userId, db }) => {
    const payloadOrResponse = await parseJsonBody<CardWritePayload>(request);
    if (payloadOrResponse instanceof NextResponse) {
      return payloadOrResponse;
    }
    const payload = payloadOrResponse;

    console.log('\n=== Card Creation Started ===');
    console.log('User ID:', userId);
    console.log('Payload:', JSON.stringify(payload, null, 2));

    try {
      // Verify user exists
      const userExists = await db.select({ id: User.id, email: User.email }).from(User).where(eq(User.id, userId)).get();

      console.log('User verification:', userExists ? 'EXISTS' : 'NOT FOUND');
      
      if (!userExists) {
        console.error('User not found in database:', userId);
        return serverErrorResponse(`User account not found: ${userId}`);
      }

      const writePreparation = await prepareCardWriteData(db, payload, 'create');
      
      console.log('Card data preparation:', writePreparation.ok ? 'OK' : 'FAILED');
      
      if (!writePreparation.ok) {
        console.error('Preparation error:', writePreparation.message);
        if (writePreparation.errorCode === 'TOKENIZATION') {
          return serverErrorResponse(writePreparation.message);
        }
        return apiErrorResponse(writePreparation.message, 500);
      }

      const createData = {
        owner_id: userId,
        ...writePreparation.writeData,
      };

      console.log('Card data to create:', JSON.stringify(createData, null, 2));

      const result = await db.insert(card).values(createData).returning({ id: card.id }).get();

      console.log('Card created successfully:', result.id);
      console.log('=== Card Creation Complete ===\n');

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('\n=== Card Creation Error ===');
      console.error('Error type:', error?.constructor?.name);
      
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('Error message:', errorMsg);

      if (errorMsg.includes('Foreign key constraint')) {
        return serverErrorResponse(`Foreign key error: User ${userId} not found in database`);
      }

      if (errorMsg.includes('Unique constraint')) {
        return serverErrorResponse('This card number is already registered');
      }

      return serverErrorResponse(`Failed to create card: ${errorMsg}`);
    }
  });
}
