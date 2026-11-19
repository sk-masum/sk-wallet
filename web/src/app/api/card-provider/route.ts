import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { withUserRouteContext } from '@/app/api/shared/owned-route';
import { card_provider } from '@/db/schema';

export async function GET() {
  return withUserRouteContext(async ({ db }) => {
    const data = await db.select({ name: card_provider.name }).from(card_provider).orderBy(desc(card_provider.name));

    const names = Array.from(
      new Set((data ?? []).map((item) => String(item.name ?? '').trim()).filter(Boolean)),
    );

    return NextResponse.json({ data: names });
  });
}
