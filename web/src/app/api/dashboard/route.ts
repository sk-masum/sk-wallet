import { NextResponse } from 'next/server';
import { desc, eq } from 'drizzle-orm';
import { card, credential_record, document_record, dashboard_favorite } from '@/db/schema';

import {
  buildRecentBillingCards,
  createFavoriteKeySet,
  type FavoriteRow,
} from '@/app/api/dashboard/shared';
import { withUserRouteContext } from '@/app/api/shared/owned-route';
import { toMetadataRecordOrNull } from '@/app/api/shared/payload-utils';
import { detokenizeCardNumber } from '@/lib/security/card-token';
import type { DashboardData } from '@/models/dashboard';
import { resolveNetworkLabel } from '@/utils/card/network';

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

export async function GET() {
  return withUserRouteContext(async ({ userId, db }) => {
    const now = new Date();
    const soonCutoff = new Date(now);
    soonCutoff.setDate(soonCutoff.getDate() + 45);

    const [cards, credentials, documents, favoriteRows] = await Promise.all([
      db
        .select({
          id: card.id,
          card_name: card.card_name,
          number: card.number,
          color_name: card.color_name,
          network: card.network,
          credit_limit: card.credit_limit,
          billing_date: card.billing_date,
          expiry_month: card.expiry_month,
          expiry_year: card.expiry_year,
        })
        .from(card)
        .where(eq(card.owner_id, userId))
        .orderBy(desc(card.id)),
      db
        .select({
          id: credential_record.id,
          identifier: credential_record.identifier,
          service_name: credential_record.service_name,
        })
        .from(credential_record)
        .where(eq(credential_record.user_id, userId))
        .orderBy(desc(credential_record.id)),
      db
        .select({
          id: document_record.id,
          expires_at: document_record.expires_at,
          masked_number: document_record.masked_number,
          name_on_document: document_record.name_on_document,
          document_type: document_record.document_type,
          metadata: document_record.metadata,
        })
        .from(document_record)
        .where(eq(document_record.user_id, userId))
        .orderBy(desc(document_record.id)),
      db
        .select({ feature_key: dashboard_favorite.feature_key })
        .from(dashboard_favorite)
        .where(eq(dashboard_favorite.user_id, userId)),
    ]);

    const expiringDocumentsSoon = documents.filter(
      (doc) => doc.expires_at && doc.expires_at >= now && doc.expires_at <= soonCutoff,
    );

    const favoriteKeys = createFavoriteKeySet(favoriteRows);

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
  });
}
