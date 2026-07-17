import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AlertTriangle, SearchX, WalletCards, X } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { CardMobileFilters } from '@/components/card/card-mobile-filters'
import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group'
import { Input } from '@/components/ui/input'
import {
  NetworkFilterDropdown,
} from '@/components/ui/network-filter-dropdown'
import { CardGrid } from '@/components/card/card-grid'
import { CardLoadErrorToast } from '@/components/card/card-load-error-toast'
import { ListingPageLayout } from '@/components/shared/listing-page-layout'
import {
  ListingActiveFiltersRow,
  ListingDesktopFilterRow,
  ListingPageHeader,
} from '@/components/shared/listing-page-header'
import {
  type CardPageProps,
  type WalletCard,
} from '@/models/card'
import { cn } from '@/lib/utils'
import { serverApiGet } from '@/lib/api/server'
import { buildCardFilterHref } from '@/utils/card/filter'
import { CARD_NETWORK_FILTER_OPTIONS, resolveNetworkLabel } from '@/utils/card/network'

export default async function CardPage({ searchParams }: CardPageProps) {
  const params = searchParams ? await searchParams : {}
  const query = params.q?.trim() ?? ''
  const networkParam = params.network?.trim().toUpperCase() ?? ''
  const typeParam = params.type?.trim().toLowerCase() ?? 'all'
  const selectedType = typeParam === 'credit' || typeParam === 'debit' ? typeParam : 'all'
  const selectedNetwork = networkParam === 'ALL' ? '' : networkParam
  const queryLower = query.toLowerCase()
  const queryDigits = query.replace(/\D/g, '')

  const { response, data: result } = await serverApiGet<{ data?: WalletCard[]; error?: string }>(
    '/api/card',
  )

  if (response.status === 401) {
    redirect('/auth?next=/card')
  }

  const allCards = result?.data ?? []
  const error = response.ok ? null : { message: result?.error || 'Failed to load cards' }
  const networkOptions = CARD_NETWORK_FILTER_OPTIONS
  const hasTextQuery = query.length > 0
  const hasNetworkFilter = selectedNetwork.length > 0
  const hasTypeFilter = selectedType !== 'all'
  const hasFilters = hasTextQuery || hasNetworkFilter || hasTypeFilter
  const activeFilterCount = Number(hasTypeFilter) + Number(hasNetworkFilter)

  const buildFilterHref = (next: { network?: string; type?: string; q?: string }) =>
    buildCardFilterHref(
      {
        selectedNetwork,
        selectedType,
        query,
      },
      next
    )

  const filteredCards = allCards.filter((card) => {
    const cardName = card.card_name?.toLowerCase() ?? ''
    const provider = card.provider?.toLowerCase() ?? ''
    const numberRaw = String(card.number ?? '')
    const numberDigits = numberRaw.replace(/\D/g, '')
    const cardNetwork = resolveNetworkLabel(card.network)
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'credit' ? card.isCredit === true : card.isCredit === false)

    const matchesText =
      !hasTextQuery ||
      cardName.includes(queryLower) ||
      provider.includes(queryLower) ||
      numberRaw.toLowerCase().includes(queryLower) ||
      (queryDigits.length > 0 && numberDigits.includes(queryDigits))

    const matchesNetwork = !hasNetworkFilter || cardNetwork === selectedNetwork

    return matchesText && matchesNetwork && matchesType
  })

  return (
    <ListingPageLayout contentClassName="max-w-212.5">
      <ListingPageHeader
        title="Cards"
        description={`${filteredCards.length} ${filteredCards.length === 1 ? 'card' : 'cards'}${activeFilterCount > 0 ? ` • ${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'}` : ''
          }`}
        addHref="/card/new"
        addLabel="Add card"
        mobileFilters={
          <CardMobileFilters
            query={query}
            selectedType={selectedType}
            selectedNetwork={selectedNetwork}
            networkOptions={networkOptions}
            activeFilterCount={activeFilterCount}
            clearSearchHref={buildFilterHref({ q: '' })}
            clearAllHref={buildFilterHref({ q: '', network: '', type: 'all' })}
            typeHrefs={{
              all: buildFilterHref({ type: 'all' }),
              credit: buildFilterHref({ type: 'credit' }),
              debit: buildFilterHref({ type: 'debit' }),
            }}
          />
        }
        desktopFilters={
          <ListingDesktopFilterRow className="rounded-3xl border-border/60 bg-card/75 p-3.5 shadow-xl backdrop-blur-xl">
            <form action="/card" method="get" className="relative flex-1">
              <Input
                name="q"
                defaultValue={query}
                placeholder="Search by card name, provider, or number"
                aria-label="Search cards by card name, provider, or number"
                className="h-10 rounded-xl border-border/70 bg-background/90 pr-10"
              />
              {hasTextQuery ? (
                <Link
                  href={buildFilterHref({ q: '' })}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground'
                  )}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <X className="h-4 w-4" />
                </Link>
              ) : null}
              {selectedNetwork ? <input type="hidden" name="network" value={selectedNetwork} /> : null}
              {selectedType !== 'all' ? <input type="hidden" name="type" value={selectedType} /> : null}
            </form>

            <CardTypeButtonGroup
              selectedType={selectedType}
              className="w-84 max-w-none rounded-xl"
              hrefs={{
                all: buildFilterHref({ type: 'all' }),
                credit: buildFilterHref({ type: 'credit' }),
                debit: buildFilterHref({ type: 'debit' }),
              }}
            />

            <NetworkFilterDropdown
              options={networkOptions}
              selectedNetwork={selectedNetwork}
              query={query}
              selectedType={selectedType}
              className="w-52"
            />

            {hasFilters ? (
              <Link
                href={buildFilterHref({ q: '', network: '', type: 'all' })}
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'shrink-0')}
              >
                Clear all
              </Link>
            ) : null}
          </ListingDesktopFilterRow>
        }
        activeFilters={
          hasFilters ? (
            <ListingActiveFiltersRow className="items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {hasTextQuery ? (
                  <span className="inline-flex rounded-full border border-border/70 bg-card/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    Query: {query}
                  </span>
                ) : null}
                {hasTypeFilter ? (
                  <span className="inline-flex rounded-full border border-border/70 bg-card/80 px-2.5 py-1 text-xs font-medium text-muted-foreground capitalize">
                    Type: {selectedType}
                  </span>
                ) : null}
                {hasNetworkFilter ? (
                  <span className="inline-flex rounded-full border border-border/70 bg-card/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    Network: {selectedNetwork}
                  </span>
                ) : null}
              </div>

              <Link
                href={buildFilterHref({ q: '', network: '', type: 'all' })}
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-8 rounded-full px-3 text-xs')}
              >
                Reset filters
              </Link>
            </ListingActiveFiltersRow>
          ) : null
        }
      />

      {error ? (
        <>
          <CardLoadErrorToast message={error.message} />
          <Card className="border-destructive/30 bg-card/90 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Failed to load cards
              </CardTitle>
              <CardDescription>{error.message}</CardDescription>
            </CardHeader>
          </Card>
        </>
      ) : !allCards.length ? (
        <Card className="border-border/70 bg-card/90 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WalletCards className="h-4 w-4 text-muted-foreground" />
              No cards found
            </CardTitle>
            <CardDescription>
              Add rows in Supabase and ensure your SELECT policy allows access.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : hasFilters && !filteredCards.length ? (
        <Card className="border-border/70 bg-card/90 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SearchX className="h-4 w-4 text-muted-foreground" />
              No matching cards
            </CardTitle>
            <CardDescription>
              Try a different card name, provider, number, network, or card type filter.
            </CardDescription>
            <Link
              href={buildFilterHref({ q: '', network: '', type: 'all' })}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-2 w-fit')}
            >
              Clear filters
            </Link>
          </CardHeader>
        </Card>
      ) : (
        <CardGrid cards={filteredCards} />
      )}

      <BottomTabBar />
    </ListingPageLayout>
  )
}
