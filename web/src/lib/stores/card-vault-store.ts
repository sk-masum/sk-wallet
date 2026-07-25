import { useSyncExternalStore } from 'react';

import type { WalletCard } from '@/models/card';
import { CARD_NETWORK_FILTER_OPTIONS, resolveNetworkLabel } from '@/utils/card/network';

export type CardTypeFilter = 'all' | 'credit' | 'debit';
export type CardExpiryFilter = 'all' | 'soon';
export type CardSort =
  | 'newest'
  | 'oldest'
  | 'name-asc'
  | 'name-desc'
  | 'expiry-asc'
  | 'expiry-desc'
  | 'credit-limit-asc'
  | 'credit-limit-desc'
  | 'billing-date-asc'
  | 'billing-date-desc'
  | 'payment-date-asc'
  | 'payment-date-desc';

export type CardGroup = 'none' | 'provider' | 'network' | 'tags';

type CardVaultFilters = {
  query?: string;
  typeFilter?: CardTypeFilter;
  networkFilter?: string;
  providerFilter?: string;
  tagFilter?: string;
  expiryFilter?: CardExpiryFilter;
  billingDate?: string;
  paymentDate?: string;
};

type CardVaultState = {
  cards: WalletCard[];
  query: string;
  typeFilter: CardTypeFilter;
  networkFilter: string;
  providerFilter: string;
  tagFilter: string;
  expiryFilter: CardExpiryFilter;
  billingDate: string;
  paymentDate: string;
  creditLimitMin: number | null;
  creditLimitMax: number | null;
  sortBy: CardSort;
  groupBy: CardGroup;
  setCards: (cards: WalletCard[]) => void;
  setFilters: (filters: CardVaultFilters) => void;
  setCreditLimitRange: (min: number | null, max: number | null) => void;
  setSortBy: (sortBy: CardSort) => void;
  setGroupBy: (groupBy: CardGroup) => void;
  resetFilters: () => void;
};

type CardFilterMeta = {
  networkOptions: string[];
  providerOptions: string[];
  tagOptions: string[];
  creditLimitBounds: {
    min: number;
    max: number;
    hasData: boolean;
  };
  selectedCreditLimitMin: number;
  selectedCreditLimitMax: number;
  hasTextQuery: boolean;
  hasNetworkFilter: boolean;
  hasProviderFilter: boolean;
  hasTagFilter: boolean;
  hasExpiryFilter: boolean;
  hasTypeFilter: boolean;
  creditLimitFilterActive: boolean;
  hasBillingDateFilter: boolean;
  hasPaymentDateFilter: boolean;
  hasSortSelection: boolean;
  hasGrouping: boolean;
  hasFilters: boolean;
  hasActiveControls: boolean;
  activeFilterCount: number;
};

const DEFAULT_SORT: CardSort = 'newest';
const DEFAULT_GROUP: CardGroup = 'none';

const EXPIRING_SOON_WINDOW_DAYS = 60;

const listeners = new Set<() => void>();

let store: CardVaultState;

function notify() {
  listeners.forEach((listener) => listener());
}

function setStore(patch: Partial<CardVaultState>) {
  store = {
    ...store,
    ...patch,
  };
  notify();
}

store = {
  cards: [],
  query: '',
  typeFilter: 'all',
  networkFilter: '',
  providerFilter: '',
  tagFilter: '',
  expiryFilter: 'all',
  billingDate: '',
  paymentDate: '',
  creditLimitMin: null,
  creditLimitMax: null,
  sortBy: DEFAULT_SORT,
  groupBy: DEFAULT_GROUP,
  setCards(cards) {
    setStore({ cards });
  },
  setFilters(filters) {
    setStore({
      query: filters.query ?? store.query,
      typeFilter: filters.typeFilter ?? store.typeFilter,
      networkFilter: filters.networkFilter ?? store.networkFilter,
      providerFilter: filters.providerFilter ?? store.providerFilter,
      tagFilter: filters.tagFilter ?? store.tagFilter,
      expiryFilter: filters.expiryFilter ?? store.expiryFilter,
      billingDate: filters.billingDate ?? store.billingDate,
      paymentDate: filters.paymentDate ?? store.paymentDate,
    });
  },
  setCreditLimitRange(min, max) {
    setStore({
      creditLimitMin: min,
      creditLimitMax: max,
    });
  },
  setSortBy(sortBy) {
    setStore({ sortBy });
  },
  setGroupBy(groupBy) {
    setStore({ groupBy });
  },
  resetFilters() {
    setStore({
      query: '',
      typeFilter: 'all',
      networkFilter: '',
      providerFilter: '',
      tagFilter: '',
      expiryFilter: 'all',
      billingDate: '',
      paymentDate: '',
      creditLimitMin: null,
      creditLimitMax: null,
      sortBy: DEFAULT_SORT,
      groupBy: DEFAULT_GROUP,
    });
  },
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return store;
}

export function useCardVaultStore<T>(selector: (state: CardVaultState) => T) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return selector(snapshot);
}

function parseCardExpiryValue(card: WalletCard) {
  const month = Number.parseInt(String(card.expiry_month ?? ''), 10);
  const yearRaw = Number.parseInt(String(card.expiry_year ?? ''), 10);

  if (Number.isNaN(month) || month < 1 || month > 12 || Number.isNaN(yearRaw)) {
    return null;
  }

  const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
  return year * 100 + month;
}

function isCardExpiringSoon(card: WalletCard, withinDays: number) {
  const month = Number.parseInt(String(card.expiry_month ?? ''), 10);
  const yearRaw = Number.parseInt(String(card.expiry_year ?? ''), 10);

  if (Number.isNaN(month) || month < 1 || month > 12 || Number.isNaN(yearRaw)) {
    return false;
  }

  const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
  const expiryDate = new Date(year, month, 0, 23, 59, 59, 999);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endBoundary = new Date(startOfToday);
  endBoundary.setDate(endBoundary.getDate() + withinDays);

  return expiryDate >= startOfToday && expiryDate <= endBoundary;
}

function getCreditLimitBounds(cards: WalletCard[]) {
  const values = cards
    .map((card) => Number(card.credit_limit))
    .filter((limit) => Number.isFinite(limit) && limit > 0);

  if (values.length === 0) {
    return { min: 0, max: 100000, hasData: false };
  }

  return {
    min: Math.floor(Math.min(...values)),
    max: Math.ceil(Math.max(...values)),
    hasData: true,
  };
}

export function selectCardFilterMeta(state: CardVaultState): CardFilterMeta {
  const networkOptions = CARD_NETWORK_FILTER_OPTIONS;
  const providerOptions = Array.from(
    new Set(
      state.cards
        .map((card) => card.provider?.trim() ?? '')
        .filter((provider) => provider.length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const tagOptions = Array.from(
    new Set(
      state.cards
        .flatMap((card) => (Array.isArray(card.tags) ? card.tags : []))
        .map((tag) => String(tag).trim())
        .filter((tag) => tag.length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const creditLimitBounds = getCreditLimitBounds(state.cards);
  const selectedCreditLimitMin = state.creditLimitMin ?? creditLimitBounds.min;
  const selectedCreditLimitMax = state.creditLimitMax ?? creditLimitBounds.max;
  const normalizedCreditLimitMin = Math.min(selectedCreditLimitMin, selectedCreditLimitMax);
  const normalizedCreditLimitMax = Math.max(selectedCreditLimitMin, selectedCreditLimitMax);

  const hasCreditLimitFilter =
    creditLimitBounds.hasData &&
    (normalizedCreditLimitMin > creditLimitBounds.min ||
      normalizedCreditLimitMax < creditLimitBounds.max);

  const hasTextQuery = state.query.length > 0;
  const hasNetworkFilter = state.networkFilter.length > 0;
  const hasProviderFilter = state.providerFilter.length > 0;
  const hasTagFilter = state.tagFilter.length > 0;
  const hasExpiryFilter = state.expiryFilter === 'soon';
  const hasTypeFilter = state.typeFilter !== 'all';
  const hasBillingDateFilter = state.billingDate.length > 0;
  const hasPaymentDateFilter = state.paymentDate.length > 0;
  const hasSortSelection = state.sortBy !== DEFAULT_SORT;
  const hasGrouping = state.groupBy !== DEFAULT_GROUP;
  const hasFilters =
    hasTextQuery ||
    hasNetworkFilter ||
    hasProviderFilter ||
    hasTagFilter ||
    hasExpiryFilter ||
    hasTypeFilter ||
    hasCreditLimitFilter ||
    hasBillingDateFilter ||
    hasPaymentDateFilter;

  const activeFilterCount =
    Number(hasTypeFilter) +
    Number(hasNetworkFilter) +
    Number(hasProviderFilter) +
    Number(hasTagFilter) +
    Number(hasExpiryFilter) +
    Number(hasCreditLimitFilter) +
    Number(hasBillingDateFilter) +
    Number(hasPaymentDateFilter) +
    Number(hasGrouping);

  return {
    networkOptions,
    providerOptions,
    tagOptions,
    creditLimitBounds,
    selectedCreditLimitMin: normalizedCreditLimitMin,
    selectedCreditLimitMax: normalizedCreditLimitMax,
    hasTextQuery,
    hasNetworkFilter,
    hasProviderFilter,
    hasTagFilter,
    hasExpiryFilter,
    hasTypeFilter,
    creditLimitFilterActive: hasCreditLimitFilter,
    hasBillingDateFilter,
    hasPaymentDateFilter,
    hasSortSelection,
    hasGrouping,
    hasFilters,
    hasActiveControls: hasFilters || hasSortSelection || hasGrouping,
    activeFilterCount,
  };
}

export function selectVisibleCards(state: CardVaultState) {
  const meta = selectCardFilterMeta(state);
  const queryLower = state.query.toLowerCase();
  const queryDigits = state.query.replace(/\D/g, '');
  const hasCreditLimitFilter =
    meta.creditLimitBounds.hasData &&
    (meta.selectedCreditLimitMin > meta.creditLimitBounds.min ||
      meta.selectedCreditLimitMax < meta.creditLimitBounds.max);

  const filteredCards = state.cards.filter((card) => {
    const cardName = card.card_name?.toLowerCase() ?? '';
    const provider = card.provider?.toLowerCase() ?? '';
    const numberRaw = String(card.number ?? '');
    const numberDigits = numberRaw.replace(/\D/g, '');
    const cardNetwork = resolveNetworkLabel(card.network);

    const matchesType =
      state.typeFilter === 'all' ||
      (state.typeFilter === 'credit' ? card.isCredit === true : card.isCredit === false);

    const matchesText =
      !meta.hasTextQuery ||
      cardName.includes(queryLower) ||
      provider.includes(queryLower) ||
      numberRaw.toLowerCase().includes(queryLower) ||
      (queryDigits.length > 0 && numberDigits.includes(queryDigits));

    const matchesNetwork = !meta.hasNetworkFilter || cardNetwork === state.networkFilter;
    const matchesProvider =
      !meta.hasProviderFilter || provider === state.providerFilter.toLowerCase();
    const matchesTag =
      !meta.hasTagFilter ||
      (Array.isArray(card.tags) &&
        card.tags.some(
          (tag) => String(tag).trim().toLowerCase() === state.tagFilter.toLowerCase(),
        ));
    const matchesExpiry =
      !meta.hasExpiryFilter || isCardExpiringSoon(card, EXPIRING_SOON_WINDOW_DAYS);

    const cardCreditLimit = Number(card.credit_limit);
    const hasCreditLimitValue = Number.isFinite(cardCreditLimit) && cardCreditLimit > 0;
    const matchesCreditLimit =
      !hasCreditLimitFilter ||
      (hasCreditLimitValue &&
        cardCreditLimit >= meta.selectedCreditLimitMin &&
        cardCreditLimit <= meta.selectedCreditLimitMax);

    const cardBillingDate = Number.parseInt(String(card.billing_date ?? ''), 10);
    const cardPaymentDate = Number.parseInt(String(card.payment_date ?? ''), 10);
    const matchesBillingDate =
      !meta.hasBillingDateFilter || cardBillingDate === Number(state.billingDate);
    const matchesPaymentDate =
      !meta.hasPaymentDateFilter || cardPaymentDate === Number(state.paymentDate);

    return (
      matchesText &&
      matchesNetwork &&
      matchesProvider &&
      matchesTag &&
      matchesExpiry &&
      matchesType &&
      matchesCreditLimit &&
      matchesBillingDate &&
      matchesPaymentDate
    );
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    if (state.sortBy === 'name-asc' || state.sortBy === 'name-desc') {
      const aName = (a.card_name ?? '').toString().toLowerCase();
      const bName = (b.card_name ?? '').toString().toLowerCase();
      return state.sortBy === 'name-asc' ? aName.localeCompare(bName) : bName.localeCompare(aName);
    }

    if (state.sortBy === 'expiry-asc' || state.sortBy === 'expiry-desc') {
      const aExpiry = parseCardExpiryValue(a);
      const bExpiry = parseCardExpiryValue(b);

      if (aExpiry === null && bExpiry === null) return 0;
      if (aExpiry === null) return 1;
      if (bExpiry === null) return -1;

      return state.sortBy === 'expiry-asc' ? aExpiry - bExpiry : bExpiry - aExpiry;
    }

    if (state.sortBy === 'credit-limit-asc' || state.sortBy === 'credit-limit-desc') {
      const aLimit = Number(a.credit_limit);
      const bLimit = Number(b.credit_limit);
      const aHasLimit = Number.isFinite(aLimit) && aLimit > 0;
      const bHasLimit = Number.isFinite(bLimit) && bLimit > 0;

      if (!aHasLimit && !bHasLimit) return 0;
      if (!aHasLimit) return 1;
      if (!bHasLimit) return -1;

      return state.sortBy === 'credit-limit-asc' ? aLimit - bLimit : bLimit - aLimit;
    }

    if (state.sortBy === 'billing-date-asc' || state.sortBy === 'billing-date-desc') {
      const aBilling = Number.parseInt(String(a.billing_date ?? ''), 10);
      const bBilling = Number.parseInt(String(b.billing_date ?? ''), 10);
      const aValid = Number.isInteger(aBilling) && aBilling >= 1 && aBilling <= 31;
      const bValid = Number.isInteger(bBilling) && bBilling >= 1 && bBilling <= 31;

      if (!aValid && !bValid) return 0;
      if (!aValid) return 1;
      if (!bValid) return -1;

      return state.sortBy === 'billing-date-asc' ? aBilling - bBilling : bBilling - aBilling;
    }

    if (state.sortBy === 'payment-date-asc' || state.sortBy === 'payment-date-desc') {
      const aPayment = Number.parseInt(String(a.payment_date ?? ''), 10);
      const bPayment = Number.parseInt(String(b.payment_date ?? ''), 10);
      const aValid = Number.isInteger(aPayment) && aPayment >= 1 && aPayment <= 31;
      const bValid = Number.isInteger(bPayment) && bPayment >= 1 && bPayment <= 31;

      if (!aValid && !bValid) return 0;
      if (!aValid) return 1;
      if (!bValid) return -1;

      return state.sortBy === 'payment-date-asc' ? aPayment - bPayment : bPayment - aPayment;
    }

    const aDateRaw = a.updated_at ?? a.created_at ?? '';
    const bDateRaw = b.updated_at ?? b.created_at ?? '';
    const aTime = Number.isNaN(Date.parse(aDateRaw)) ? 0 : Date.parse(aDateRaw);
    const bTime = Number.isNaN(Date.parse(bDateRaw)) ? 0 : Date.parse(bDateRaw);
    return state.sortBy === 'oldest' ? aTime - bTime : bTime - aTime;
  });

  return sortedCards;
}

export const CARD_SORT_LABELS: Record<CardSort, string> = {
  newest: 'Newest first',
  oldest: 'Oldest first',
  'name-asc': 'Name (A-Z)',
  'name-desc': 'Name (Z-A)',
  'expiry-asc': 'Expiry (Soonest)',
  'expiry-desc': 'Expiry (Latest)',
  'credit-limit-asc': 'Credit limit (Low-High)',
  'credit-limit-desc': 'Credit limit (High-Low)',
  'billing-date-asc': 'Billing date (Earliest)',
  'billing-date-desc': 'Billing date (Latest)',
  'payment-date-asc': 'Payment date (Earliest)',
  'payment-date-desc': 'Payment date (Latest)',
};
