import { NextResponse } from 'next/server';

import { withUserRouteContext } from '@/app/api/shared/owned-route';
import type { DashboardAlertsData } from '@/models/dashboard';
import { buildExpiringCards, buildRecentBillingCards } from '@/app/api/dashboard/shared';

export async function GET() {
  return withUserRouteContext(async ({ userId, prisma }) => {
    const now = new Date();
    const soonCutoff = new Date(now);
    soonCutoff.setDate(soonCutoff.getDate() + 45);

    const cards = await prisma.card.findMany({
      where: { owner_id: userId },
      select: {
        id: true,
        card_name: true,
        status: true,
        billing_date: true,
        expiry_month: true,
        expiry_year: true,
      },
      orderBy: { created_at: 'desc' },
    });

    const expiringCards = buildExpiringCards(cards, now, soonCutoff);

    const recentBillingCards = buildRecentBillingCards(cards, now, 20);

    const blockedOrReplacedCards = cards.filter(
      (card) => card.status === 'replaced' || card.status === 'blocked',
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
