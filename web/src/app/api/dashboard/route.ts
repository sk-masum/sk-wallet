import { NextResponse } from 'next/server';

import { getRequiredPrismaClient } from '@/lib/prisma';
import { detokenizeCardNumber } from '@/lib/security/card-token';
import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import type { DashboardData } from '@/models/dashboard';
import { resolveNetworkLabel } from '@/utils/card/network';
import { buildRecentBillingCards } from '@/app/api/dashboard/shared';

function decodeCardNumberOrEmpty(value: string) {
  try {
    return detokenizeCardNumber(value);
  } catch {
    return '';
  }
}

function toMaskedNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '•••• ••••';

  return `•••• ${digits.slice(-4)}`;
}

type FavoriteRow = {
  feature_key: string;
};

function toMetadataRecordOrNull(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export async function GET() {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const prisma = getRequiredPrismaClient();
  const now = new Date();
  const soonCutoff = new Date(now);
  soonCutoff.setDate(soonCutoff.getDate() + 45);

  const [cards, credentials, documents] = await Promise.all([
    prisma.card.findMany({
      where: { owner_id: user.id },
      select: {
        id: true,
        card_name: true,
        number: true,
        color_name: true,
        network: true,
        credit_limit: true,
        billing_date: true,
        expiry_month: true,
        expiry_year: true,
      },
      orderBy: { id: 'desc' },
    }),
    prisma.credential_record.findMany({
      where: { user_id: user.id },
      select: {
        id: true,
        identifier: true,
        service_name: true,
      },
      orderBy: { id: 'desc' },
    }),
    prisma.document_record.findMany({
      where: { user_id: user.id },
      select: {
        id: true,
        expires_at: true,
        masked_number: true,
        name_on_document: true,
        document_type: true,
        metadata: true,
      },
      orderBy: { id: 'desc' },
    }),
  ]);

  const expiringDocumentsSoon = documents.filter(
    (doc) => doc.expires_at && doc.expires_at >= now && doc.expires_at <= soonCutoff,
  );

  const favoriteRows = await prisma.$queryRaw<FavoriteRow[]>`
    select feature_key
    from public.dashboard_favorite
    where user_id = ${user.id}::uuid
  `;
  const favoriteKeys = new Set(favoriteRows.map((row) => String(row.feature_key)));

  const expiringCardsSoon = cards.filter((card) => {
    if (!card.expiry_year || !card.expiry_month) return false;
    const expiryDate = new Date(Number(card.expiry_year), Number(card.expiry_month), 0);
    return expiryDate >= now && expiryDate <= soonCutoff;
  });

  const expiringSoonCount = expiringDocumentsSoon.length + expiringCardsSoon.length;

  const totalCreditLimit = cards.reduce((sum, card) => {
    if (!card.credit_limit) return sum;
    return sum + Number(card.credit_limit);
  }, 0);

  const creditPortfolio = cards
    .filter((card) => card.credit_limit)
    .map((card) => {
      const limit = Number(card.credit_limit);
      const share = totalCreditLimit > 0 ? (limit / totalCreditLimit) * 100 : 0;
      return {
        id: String(card.id),
        label: card.card_name || `Card ${String(card.id)}`,
        limit,
        share,
      };
    })
    .sort((a, b) => b.limit - a.limit)
    .slice(0, 6);

  const cardsCarousel = cards
    .filter((card) => favoriteKeys.has(`card:${String(card.id)}`))
    .slice(0, 12)
    .map((card) => {
      const number = decodeCardNumberOrEmpty(card.number);
      return {
        id: String(card.id),
        name: card.card_name || `Card ${String(card.id)}`,
        maskedNumber: toMaskedNumber(number),
        colorName: card.color_name || 'Blue Indigo',
        network: Number(card.network ?? 1),
        networkLabel: resolveNetworkLabel(Number(card.network ?? 1)),
        href: `/card/${String(card.id)}`,
      };
    });

  const favoriteVaultCarousel = [
    ...credentials
      .filter((credential) => favoriteKeys.has(`credential:${credential.id}`))
      .map((credential) => ({
        id: String(credential.id),
        type: 'credential' as const,
        title: credential.service_name,
        subtitle: String(credential.identifier ?? 'No identifier'),
        href: `/credential/${credential.id}`,
      })),
    ...documents
      .filter((document) => favoriteKeys.has(`document:${document.id}`))
      .map((document) => ({
        id: String(document.id),
        type: 'document' as const,
        title: String(document.masked_number),
        subtitle: String(document.name_on_document),
        href: `/doc/${document.id}`,
        document_type: document.document_type ?? 'Uncategorized',
        metadata: toMetadataRecordOrNull(document.metadata),
      })),
  ].slice(0, 16);

  const recentBillingCards = buildRecentBillingCards(cards, now, 8);

  const payload: DashboardData = {
    summary: {
      totalCards: cards.length,
      activeCredentials: credentials.length,
      storedDocuments: documents.length,
      expiringSoonCount,
    },
    financial: {
      totalCreditLimit,
      creditPortfolio,
    },
    visual: {
      cardsCarousel,
      favoriteVaultCarousel,
      recentBillingCards,
    },
  };

  return NextResponse.json({ data: payload });
}
