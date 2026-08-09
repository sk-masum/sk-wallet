'use client';

import { useEffect, type ReactNode } from 'react';
import { AlertTriangle, WalletCards } from 'lucide-react';

import { CardGrid } from '@/components/card/card-grid';
import { CardLoadErrorToast } from '@/components/card/card-load-error-toast';
import { ListingActiveFilterChips } from '@/components/shared/listing-active-filter-chips';
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

type CardVaultEmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
  footerText?: string;
};

function CardVaultEmptyState({ title, description, action, footerText }: CardVaultEmptyStateProps) {
  return (
    <Card className='border-border/70'>
      <CardHeader className='pb-2 text-center'>
        <CardTitle className='justify-center'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
          {action}
          {footerText ? <p className='text-center text-xs text-text-subtle'>{footerText}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

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
      <CardVaultEmptyState
        title='No cards found'
        description='Add rows in Supabase and ensure your SELECT policy allows access.'
        footerText='Your wallet is empty. Tap Add card to create your first card.'
      />
    );
  }

  if (meta.hasFilters && !visibleCards.length) {
    return (
      <CardVaultEmptyState
        title='No matching cards'
        description='Try a different card name, provider, number, network, tag, or card type filter.'
        action={
          <Button variant='outline' size='chipWide' onClick={resetFilters}>
            Clear filters
          </Button>
        }
      />
    );
  }

  const activeFilterChips = [
    meta.hasTextQuery ? { key: 'query', label: 'Query', value: query } : null,
    meta.hasTypeFilter
      ? { key: 'type', label: 'Type', value: selectedType, capitalize: true }
      : null,
    meta.hasNetworkFilter ? { key: 'network', label: 'Network', value: selectedNetwork } : null,
    meta.hasProviderFilter ? { key: 'provider', label: 'Provider', value: selectedProvider } : null,
    meta.hasTagFilter ? { key: 'tag', label: 'Tag', value: selectedTag } : null,
    meta.hasExpiryFilter
      ? { key: 'expiry', label: 'Expiry', value: `Next ${EXPIRING_SOON_WINDOW_DAYS} days` }
      : null,
    meta.creditLimitFilterActive
      ? {
          key: 'credit-limit',
          label: 'Credit limit',
          value: `${meta.selectedCreditLimitMin} - ${meta.selectedCreditLimitMax}`,
        }
      : null,
    meta.hasBillingDateFilter
      ? { key: 'billing-date', label: 'Billing date', value: `Day ${selectedBillingDate}` }
      : null,
    meta.hasPaymentDateFilter
      ? { key: 'payment-date', label: 'Payment date', value: `Day ${selectedPaymentDate}` }
      : null,
    meta.hasSortSelection
      ? { key: 'sort', label: 'Sort', value: CARD_SORT_LABELS[selectedSort] }
      : null,
    meta.hasGrouping
      ? {
          key: 'group',
          label: 'Group',
          value:
            selectedGroup === 'provider'
              ? 'Provider'
              : selectedGroup === 'network'
                ? 'Network'
                : 'Tags',
        }
      : null,
  ].filter((chip): chip is NonNullable<typeof chip> => Boolean(chip));

  return (
    <div className='space-y-4'>
      {meta.hasActiveControls ? (
        <ListingActiveFilterChips chips={activeFilterChips} onReset={resetFilters} />
      ) : null}

      <CardGrid cards={visibleCards} groupBy={selectedGroup} />
    </div>
  );
}
