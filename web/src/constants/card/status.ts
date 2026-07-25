import type { CardStatus } from '@/models/card';

export const CARD_STATUS_OPTIONS: Array<{ value: CardStatus; label: string }> = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'replaced', label: 'Replaced (Archived)' },
];

export const CARD_STATUS_VALUES: CardStatus[] = CARD_STATUS_OPTIONS.map((option) => option.value);

export function isCardStatus(value: string): value is CardStatus {
  return CARD_STATUS_VALUES.includes(value as CardStatus);
}
