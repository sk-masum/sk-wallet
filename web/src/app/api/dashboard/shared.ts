import { normalizeTrimmedText } from '@/app/api/shared/payload-utils';

export function getNextOccurrenceFromDay(day: number, now: Date) {
  if (!Number.isInteger(day) || day < 1 || day > 31) return null;

  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const targetDay = Math.min(day, new Date(year, month + 1, 0).getDate());

  if (targetDay >= today) {
    return new Date(year, month, targetDay);
  }

  const nextMonthLastDay = new Date(year, month + 2, 0).getDate();
  return new Date(year, month + 1, Math.min(day, nextMonthLastDay));
}

type BillingCardSource = {
  id: bigint | number | string;
  card_name: string | null;
  billing_date: number | null;
};

type BillingCardItem = {
  id: string;
  name: string;
  billingDay: number;
  nextBillingDate: string;
  href: string;
};

type ExpiringCardSource = {
  id: bigint | number | string;
  card_name: string | null;
  status: string | null;
  expiry_month: number | null;
  expiry_year: number | null;
};

type ExpiringCardItem = {
  id: string;
  name: string;
  status: string;
  expiryDate: string;
  daysLeft: number;
  href: string;
};

export type FavoriteRow = {
  feature_key: string;
};

export function normalizeFavoriteKey(value: unknown) {
  return normalizeTrimmedText(value, 160);
}

export function createFavoriteKeySet(rows: FavoriteRow[]) {
  return new Set(rows.map((row) => String(row.feature_key)));
}

export function getCardExpiryDate(expiryYear: number | null, expiryMonth: number | null) {
  if (!expiryYear || !expiryMonth) return null;
  return new Date(Number(expiryYear), Number(expiryMonth), 0);
}

export function getDaysLeft(targetDate: Date, now: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.ceil((targetDate.getTime() - now.getTime()) / msPerDay));
}

export function buildExpiringCards(cards: ExpiringCardSource[], now: Date, soonCutoff: Date) {
  return cards
    .map((card) => {
      const expiryDate = getCardExpiryDate(card.expiry_year, card.expiry_month);
      if (!expiryDate || expiryDate < now || expiryDate > soonCutoff) return null;

      return {
        id: String(card.id),
        name: card.card_name || `Card ${String(card.id)}`,
        status: String(card.status ?? 'active').toLowerCase(),
        expiryDate: expiryDate.toISOString(),
        daysLeft: getDaysLeft(expiryDate, now),
        href: `/card/${String(card.id)}`,
      };
    })
    .filter((item): item is ExpiringCardItem => Boolean(item))
    .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
}

export function buildRecentBillingCards(cards: BillingCardSource[], now: Date, limit: number) {
  return cards
    .map((card) => {
      const dueDate = getNextOccurrenceFromDay(card.billing_date ?? -1, now);
      if (!dueDate || card.billing_date == null) return null;

      return {
        id: String(card.id),
        name: card.card_name || `Card ${String(card.id)}`,
        billingDay: Number(card.billing_date),
        nextBillingDate: dueDate.toISOString(),
        href: `/card/${String(card.id)}`,
      };
    })
    .filter((item): item is BillingCardItem => Boolean(item))
    .sort((a, b) => new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime())
    .slice(0, limit);
}
