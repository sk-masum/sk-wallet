import type {
  CardExpiryFilter,
  CardGroup,
  CardSort,
} from '@/lib/stores/card-vault-store';
import type { FilterOptions } from '@/models/filter';

export const CARD_GROUP_OPTIONS: FilterOptions<CardGroup> = [
  { value: 'none', label: 'No grouping' },
  { value: 'provider', label: 'Group by provider' },
  { value: 'network', label: 'Group by network' },
  { value: 'tags', label: 'Group by tags' },
];

export const CARD_SORT_OPTIONS: FilterOptions<CardSort> = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'expiry-asc', label: 'Expiry (Soonest)' },
  { value: 'expiry-desc', label: 'Expiry (Latest)' },
  { value: 'credit-limit-asc', label: 'Credit limit (Low-High)' },
  { value: 'credit-limit-desc', label: 'Credit limit (High-Low)' },
  { value: 'billing-date-asc', label: 'Billing date (Earliest)' },
  { value: 'billing-date-desc', label: 'Billing date (Latest)' },
  { value: 'payment-date-asc', label: 'Payment date (Earliest)' },
  { value: 'payment-date-desc', label: 'Payment date (Latest)' },
];

export const CARD_EXPIRY_OPTIONS: FilterOptions<CardExpiryFilter> = [
  { value: 'all', label: 'All cards' },
  { value: 'soon', label: 'Expiring soon' },
];
