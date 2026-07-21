import Link from 'next/link'
import { redirect } from 'next/navigation'
import { AlertTriangle, WalletCards } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { CardMobileFilters } from '@/components/card/card-mobile-filters'
import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group'
import { CardGroupDropdown } from '@/components/ui/card-group-dropdown'
import { CardSortDropdown } from '@/components/ui/card-sort-dropdown'
import { Input } from '@/components/ui/input'
import {
  NetworkFilterDropdown,
} from '@/components/ui/network-filter-dropdown'
import { CardGrid } from '@/components/card/card-grid'
import { CardLoadErrorToast } from '@/components/card/card-load-error-toast'
import { ListingPageLayout } from '@/components/shared/listing-page-layout'
import {
  ListingActiveFiltersRow,
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

const SORT_LABELS: Record<string, string> = {
  oldest: 'Oldest first',
  'name-asc': 'Name (A-Z)',
  'name-desc': 'Name (Z-A)',
  'expiry-asc': 'Expiry (Soonest)',
  'expiry-desc': 'Expiry (Latest)',
}

const EXPIRING_SOON_WINDOW_DAYS = 60

const parseCardExpiryValue = (card: WalletCard) => {
  const month = Number.parseInt(String(card.expiry_month ?? ''), 10)
  const yearRaw = Number.parseInt(String(card.expiry_year ?? ''), 10)

  if (Number.isNaN(month) || month < 1 || month > 12 || Number.isNaN(yearRaw)) {
    return null
  }

  const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw
  return year * 100 + month
}

const isCardExpiringSoon = (card: WalletCard, withinDays: number) => {
  const month = Number.parseInt(String(card.expiry_month ?? ''), 10)
  const yearRaw = Number.parseInt(String(card.expiry_year ?? ''), 10)

  if (Number.isNaN(month) || month < 1 || month > 12 || Number.isNaN(yearRaw)) {
    return false
  }

  const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw
  const expiryDate = new Date(year, month, 0, 23, 59, 59, 999)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endBoundary = new Date(startOfToday)
  endBoundary.setDate(endBoundary.getDate() + withinDays)

  return expiryDate >= startOfToday && expiryDate <= endBoundary
}

export default async function CardPage({ searchParams }: CardPageProps) {
  const params = searchParams ? await searchParams : {}
  const query = params.q?.trim() ?? ''
  const networkParam = params.network?.trim().toUpperCase() ?? ''
  const providerParam = params.provider?.trim() ?? ''
  const tagParam = params.tag?.trim() ?? ''
  const expiryParam = params.expiry?.trim().toLowerCase() ?? 'all'
  const typeParam = params.type?.trim().toLowerCase() ?? 'all'
  const sortParam = params.sort?.trim().toLowerCase() ?? 'newest'
  const groupParam = params.group?.trim().toLowerCase() ?? 'none'
  const selectedType = typeParam === 'credit' || typeParam === 'debit' ? typeParam : 'all'
  const selectedSort =
    sortParam === 'oldest' ||
      sortParam === 'name-asc' ||
      sortParam === 'name-desc' ||
      sortParam === 'expiry-asc' ||
      sortParam === 'expiry-desc'
      ? sortParam
      : 'newest'
  const selectedGroup =
    groupParam === 'provider' || groupParam === 'network' || groupParam === 'tags'
      ? groupParam
      : 'none'
  const selectedNetwork = networkParam === 'ALL' ? '' : networkParam
  const selectedProvider = providerParam === 'ALL' ? '' : providerParam
  const selectedTag = tagParam === 'ALL' ? '' : tagParam
  const selectedExpiry = expiryParam === 'soon' ? 'soon' : 'all'
  const queryLower = query.toLowerCase()
  const queryDigits = query.replace(/\D/g, '')

  const [cardResult, providerResult] = await Promise.all([
    serverApiGet<{ data?: WalletCard[]; error?: string }>('/api/card'),
    serverApiGet<{ data?: string[]; error?: string }>('/api/card-provider'),
  ])

  const { response, data: result } = cardResult
  const { response: providerResponse, data: providerResponseData } = providerResult

  if (response.status === 401) {
    redirect('/auth?next=/card')
  }

  if (providerResponse.status === 401) {
    redirect('/auth?next=/card')
  }

  const allCards = result?.data ?? []
  const error = response.ok ? null : { message: result?.error || 'Failed to load cards' }
  const networkOptions = CARD_NETWORK_FILTER_OPTIONS
  const providerOptions = Array.from(
    new Set(
      [
        ...((providerResponse.ok ? providerResponseData?.data : []) ?? []),
        ...allCards
          .map((card) => card.provider?.trim() ?? '')
          .filter((provider) => provider.length > 0),
      ]
    )
  ).sort((a, b) => a.localeCompare(b))
  const tagOptions = Array.from(
    new Set(
      allCards
        .flatMap((card) => (Array.isArray(card.tags) ? card.tags : []))
        .map((tag) => String(tag).trim())
        .filter((tag) => tag.length > 0)
    )
  ).sort((a, b) => a.localeCompare(b))
  const hasTextQuery = query.length > 0
  const hasNetworkFilter = selectedNetwork.length > 0
  const hasProviderFilter = selectedProvider.length > 0
  const hasTagFilter = selectedTag.length > 0
  const hasExpiryFilter = selectedExpiry === 'soon'
  const hasTypeFilter = selectedType !== 'all'
  const hasSortSelection = selectedSort !== 'newest'
  const hasGrouping = selectedGroup !== 'none'
  const hasFilters = hasTextQuery || hasNetworkFilter || hasProviderFilter || hasTagFilter || hasExpiryFilter || hasTypeFilter
  const hasActiveControls = hasFilters || hasSortSelection || hasGrouping
  const activeFilterCount = Number(hasTypeFilter) + Number(hasNetworkFilter) + Number(hasProviderFilter) + Number(hasTagFilter) + Number(hasExpiryFilter) + Number(hasGrouping)

  const buildFilterHref = (next: { network?: string; provider?: string; tag?: string; expiry?: string; type?: string; sort?: string; group?: string; q?: string }) =>
    buildCardFilterHref(
      {
        selectedNetwork,
        selectedProvider,
        selectedTag,
        selectedExpiry,
        selectedType,
        selectedSort,
        selectedGroup,
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
    const matchesProvider = !hasProviderFilter || provider === selectedProvider.toLowerCase()
    const matchesTag = !hasTagFilter || (Array.isArray(card.tags) && card.tags.some((tag) => String(tag).trim().toLowerCase() === selectedTag.toLowerCase()))
    const matchesExpiry = !hasExpiryFilter || isCardExpiringSoon(card, EXPIRING_SOON_WINDOW_DAYS)

    return matchesText && matchesNetwork && matchesProvider && matchesTag && matchesExpiry && matchesType
  })

  const sortedCards = [...filteredCards].sort((a, b) => {
    if (selectedSort === 'name-asc' || selectedSort === 'name-desc') {
      const aName = (a.card_name ?? '').toString().toLowerCase()
      const bName = (b.card_name ?? '').toString().toLowerCase()
      return selectedSort === 'name-asc' ? aName.localeCompare(bName) : bName.localeCompare(aName)
    }

    if (selectedSort === 'expiry-asc' || selectedSort === 'expiry-desc') {
      const aExpiry = parseCardExpiryValue(a)
      const bExpiry = parseCardExpiryValue(b)

      if (aExpiry === null && bExpiry === null) return 0
      if (aExpiry === null) return 1
      if (bExpiry === null) return -1

      return selectedSort === 'expiry-asc' ? aExpiry - bExpiry : bExpiry - aExpiry
    }

    const aDateRaw = a.updated_at ?? a.created_at ?? ''
    const bDateRaw = b.updated_at ?? b.created_at ?? ''
    const aTime = Number.isNaN(Date.parse(aDateRaw)) ? 0 : Date.parse(aDateRaw)
    const bTime = Number.isNaN(Date.parse(bDateRaw)) ? 0 : Date.parse(bDateRaw)
    return selectedSort === 'oldest' ? aTime - bTime : bTime - aTime
  })

  return (
    <ListingPageLayout contentClassName="max-w-212.5">
      <ListingPageHeader
        title="Cards"
        className="pt-6"
        description={`${sortedCards.length} ${sortedCards.length === 1 ? 'card' : 'cards'}${activeFilterCount > 0 ? ` • ${activeFilterCount} filter${activeFilterCount === 1 ? '' : 's'}` : ''
          }`}
        addHref="/card/new"
        addLabel="Add card"
        mobileStickyHeader
        mobileFilters={
          <CardMobileFilters
            query={query}
            selectedType={selectedType}
            selectedNetwork={selectedNetwork}
            selectedProvider={selectedProvider}
            selectedTag={selectedTag}
            selectedExpiry={selectedExpiry}
            selectedSort={selectedSort}
            selectedGroup={selectedGroup}
            networkOptions={networkOptions}
            providerOptions={providerOptions}
            tagOptions={tagOptions}
            activeFilterCount={activeFilterCount}
            clearSearchHref={buildFilterHref({ q: '' })}
            clearAllHref={buildFilterHref({ q: '', network: '', provider: '', tag: '', expiry: 'all', type: 'all', sort: 'newest', group: 'none' })}
            typeHrefs={{
              all: buildFilterHref({ type: 'all' }),
              credit: buildFilterHref({ type: 'credit' }),
              debit: buildFilterHref({ type: 'debit' }),
            }}
          />
        }
        activeFilters={
          hasActiveControls ? (
            <ListingActiveFiltersRow className="items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {hasTextQuery ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Query: {query}
                  </span>
                ) : null}
                {hasTypeFilter ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80 capitalize">
                    Type: {selectedType}
                  </span>
                ) : null}
                {hasNetworkFilter ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Network: {selectedNetwork}
                  </span>
                ) : null}
                {hasProviderFilter ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Provider: {selectedProvider}
                  </span>
                ) : null}
                {hasTagFilter ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Tag: {selectedTag}
                  </span>
                ) : null}
                {hasExpiryFilter ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Expiry: Next {EXPIRING_SOON_WINDOW_DAYS} days
                  </span>
                ) : null}
                {hasSortSelection ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Sort: {SORT_LABELS[selectedSort]}
                  </span>
                ) : null}
                {hasGrouping ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Group: {selectedGroup === 'provider' ? 'Provider' : selectedGroup === 'network' ? 'Network' : 'Tags'}
                  </span>
                ) : null}
              </div>

              <Link
                href={buildFilterHref({ q: '', network: '', provider: '', tag: '', expiry: 'all', type: 'all', sort: 'newest', group: 'none' })}
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-8 rounded-full border border-border/60 bg-background/80 px-3 text-xs')}
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
          <CardHeader className="pb-2 text-center">
            <CardTitle className="justify-center">No cards found</CardTitle>
            <CardDescription>
              Add rows in Supabase and ensure your SELECT policy allows access.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border/70 bg-muted/15 p-5">
              <div className="relative h-24 w-40">
                <div className="absolute left-1 top-3 h-20 w-32 rounded-xl border border-border/60 bg-background/80" />
                <div className="absolute right-1 top-0 h-20 w-32 rounded-xl border border-primary/35 bg-linear-to-br from-primary/25 via-primary/10 to-background/70 shadow-md" />
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/90">
                  <WalletCards className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Your wallet is empty. Tap Add card to create your first card.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : hasFilters && !sortedCards.length ? (
        <Card className="border-border/70 bg-card/90 shadow-lg">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="justify-center">No matching cards</CardTitle>
            <CardDescription>
              Try a different card name, provider, number, network, tag, or card type filter.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-border/70 bg-muted/15 p-5">
              <div className="relative h-24 w-40">
                <div className="absolute left-1 top-3 h-20 w-32 rounded-xl border border-border/60 bg-background/80" />
                <div className="absolute right-1 top-0 h-20 w-32 rounded-xl border border-primary/35 bg-linear-to-br from-primary/25 via-primary/10 to-background/70 shadow-md" />
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/90">
                  <WalletCards className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <Link
                href={buildFilterHref({ q: '', network: '', provider: '', tag: '', expiry: 'all', type: 'all', sort: 'newest', group: 'none' })}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-full px-4')}
              >
                Clear filters
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <CardGrid cards={sortedCards} groupBy={selectedGroup} />
      )}

      <BottomTabBar />
    </ListingPageLayout>
  )
}
