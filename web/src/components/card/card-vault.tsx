'use client';

import { useEffect } from 'react';
import { AlertTriangle, WalletCards } from 'lucide-react';

import { CardGrid } from '@/components/card/card-grid';
import { CardLoadErrorToast } from '@/components/card/card-load-error-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CARD_SORT_LABELS,
  selectCardFilterMeta,
  selectVisibleCards,
  useCardVaultStore,
} from '@/lib/stores/card-vault-store';
import type { WalletCard } from '@/models/card';

type CardVaultProps = {
  initialCards: WalletCard[];
  initialError?: string | null;
};

const EXPIRING_SOON_WINDOW_DAYS = 60;

export function CardVault({ initialCards, initialError }: CardVaultProps) {
  const setCards = useCardVaultStore((state) => state.setCards);
  const resetFilters = useCardVaultStore((state) => state.resetFilters);
  const selectedType = useCardVaultStore((state) => state.typeFilter);
  const query = useCardVaultStore((state) => state.query);
  const selectedNetwork = useCardVaultStore((state) => state.networkFilter);
  const selectedProvider = useCardVaultStore((state) => state.providerFilter);
  const selectedTag = useCardVaultStore((state) => state.tagFilter);
  const selectedExpiry = useCardVaultStore((state) => state.expiryFilter);
  const selectedBillingDate = useCardVaultStore((state) => state.billingDate);
  const selectedPaymentDate = useCardVaultStore((state) => state.paymentDate);
  const selectedSort = useCardVaultStore((state) => state.sortBy);
  const selectedGroup = useCardVaultStore((state) => state.groupBy);

  const meta = useCardVaultStore(selectCardFilterMeta);
  const visibleCards = useCardVaultStore(selectVisibleCards);

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards, setCards]);

  if (initialError) {
    return (
      <>
        <CardLoadErrorToast message={initialError} />
        <Card className='border-destructive/30'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-destructive'>
              <AlertTriangle className='h-4 w-4' />
              Failed to load cards
            </CardTitle>
            <CardDescription>{initialError}</CardDescription>
          </CardHeader>
        </Card>
      </>
    );
  }

  if (!initialCards.length) {
    return (
      <Card className='border-border/70'>
        <CardHeader className='pb-2 text-center'>
          <CardTitle className='justify-center'>No cards found</CardTitle>
          <CardDescription>
            Add rows in Supabase and ensure your SELECT policy allows access.
          </CardDescription>
        </CardHeader>
        <CardContent className='pb-6'>
          <div className='mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border/70 bg-muted/15 p-5'>
            <div className='relative h-24 w-40'>
              <div className='absolute left-1 top-3 h-20 w-32 rounded-xl border border-border/60 bg-background/80' />
              <div className='absolute right-1 top-0 h-20 w-32 rounded-xl border border-primary/35 bg-linear-to-br from-primary/25 via-primary/10 to-background/70 shadow-md' />
              <div className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/90'>
                <WalletCards className='h-4 w-4 text-text-subtle' />
              </div>
            </div>
            <p className='text-center text-xs text-text-subtle'>
              Your wallet is empty. Tap Add card to create your first card.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (meta.hasFilters && !visibleCards.length) {
    return (
      <Card className='border-border/70'>
        <CardHeader className='pb-2 text-center'>
          <CardTitle className='justify-center'>No matching cards</CardTitle>
          <CardDescription>
            Try a different card name, provider, number, network, tag, or card type filter.
          </CardDescription>
        </CardHeader>
        <CardContent className='pb-6'>
          <div className='mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border/70 bg-muted/15 p-5'>
            <div className='relative h-24 w-40'>
              <div className='absolute left-1 top-3 h-20 w-32 rounded-xl border border-border/60 bg-background/80' />
              <div className='absolute right-1 top-0 h-20 w-32 rounded-xl border border-primary/35 bg-linear-to-br from-primary/25 via-primary/10 to-background/70 shadow-md' />
              <div className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/90'>
                <WalletCards className='h-4 w-4 text-text-subtle' />
              </div>
            </div>

            <Button variant='outline' size='chipWide' onClick={resetFilters}>
              Clear filters
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      {meta.hasActiveControls ? (
        <div className='hidden flex-wrap items-center gap-2 sm:flex'>
          {meta.hasTextQuery ? <span className='filter-chip-glass'>Query: {query}</span> : null}
          {meta.hasTypeFilter ? (
            <span className='filter-chip-glass capitalize'>Type: {selectedType}</span>
          ) : null}
          {meta.hasNetworkFilter ? (
            <span className='filter-chip-glass'>Network: {selectedNetwork}</span>
          ) : null}
          {meta.hasProviderFilter ? (
            <span className='filter-chip-glass'>Provider: {selectedProvider}</span>
          ) : null}
          {meta.hasTagFilter ? <span className='filter-chip-glass'>Tag: {selectedTag}</span> : null}
          {meta.hasExpiryFilter ? (
            <span className='filter-chip-glass'>Expiry: Next {EXPIRING_SOON_WINDOW_DAYS} days</span>
          ) : null}
          {meta.creditLimitFilterActive ? (
            <span className='filter-chip-glass'>
              Credit limit: {meta.selectedCreditLimitMin} - {meta.selectedCreditLimitMax}
            </span>
          ) : null}
          {meta.hasBillingDateFilter ? (
            <span className='filter-chip-glass'>Billing date: Day {selectedBillingDate}</span>
          ) : null}
          {meta.hasPaymentDateFilter ? (
            <span className='filter-chip-glass'>Payment date: Day {selectedPaymentDate}</span>
          ) : null}
          {meta.hasSortSelection ? (
            <span className='filter-chip-glass'>Sort: {CARD_SORT_LABELS[selectedSort]}</span>
          ) : null}
          {meta.hasGrouping ? (
            <span className='filter-chip-glass'>
              Group:{' '}
              {selectedGroup === 'provider'
                ? 'Provider'
                : selectedGroup === 'network'
                  ? 'Network'
                  : 'Tags'}
            </span>
          ) : null}
          <Button variant='outline' size='chip' onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      ) : null}

      <CardGrid cards={visibleCards} groupBy={selectedGroup} />
    </div>
  );
}
