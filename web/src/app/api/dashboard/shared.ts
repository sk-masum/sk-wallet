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
