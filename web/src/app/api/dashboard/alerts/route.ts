import { NextResponse } from 'next/server';
import { eq, desc } from 'drizzle-orm';

import { withUserRouteContext } from '@/app/api/shared/owned-route';
import type { DashboardAlertsData } from '@/models/dashboard';
import { buildExpiringCards, buildRecentBillingCards } from '@/app/api/dashboard/shared';
import { card } from '@/db/schema';

export async function GET() {
  return withUserRouteContext(async ({ userId, db }) => {
    const now = new Date();
    const soonCutoff = new Date(now);
    soonCutoff.setDate(soonCutoff.getDate() + 45);

    const cards = await db
      .select({
        id: card.id,
        card_name: card.card_name,
        status: card.status,
        billing_date: card.billing_date,
        expiry_month: card.expiry_month,
        expiry_year: card.expiry_year,
      })
      .from(card)
      .where(eq(card.owner_id, userId))
      .orderBy(desc(card.created_at));

    const expiringCards = buildExpiringCards(cards, now, soonCutoff);

    const recentBillingCards = buildRecentBillingCards(cards, now, 20);

    const blockedOrReplacedCards = cards.filter(
      (c) => c.status === 'replaced' || c.status === 'blocked',
    ).length;

    const data: DashboardAlertsData = {
      summary: {
        expiringCardsSoon: expiringCards.length,
        blockedOrReplacedCards,
        cardsWithBillingConfigured: recentBillingCards.length,
      },
      expiringCards,
      recentBillingCards,
    };

    return NextResponse.json({ data });
  });
}
