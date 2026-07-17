import Link from 'next/link'
import { redirect } from 'next/navigation'
import { X } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group'
import { Input } from '@/components/ui/input'
import {
  NetworkFilterDropdown,
} from '@/components/ui/network-filter-dropdown'
import { PageHeader } from '@/components/ui/page-header'
import { CardGrid } from '@/components/card/card-grid'
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
    <main className="mx-auto min-h-screen w-full max-w-212.5 px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <PageHeader title="Cards" showAddButton addHref="/card/new" addButtonLabel="Add card" />

      <form action="/card" method="get" className="mb-3 w-full">
        <div className="relative w-full sm:max-w-md">
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search by card name, provider, or number"
            aria-label="Search cards by card name, provider, or number"
            className="pr-10"
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
        </div>
        {selectedNetwork ? <input type="hidden" name="network" value={selectedNetwork} /> : null}
        {selectedType !== 'all' ? <input type="hidden" name="type" value={selectedType} /> : null}
      </form>

      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <CardTypeButtonGroup
          selectedType={selectedType}
          className="sm:max-w-md"
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
          className="w-full sm:w-48"
        />
      </div>

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Failed to load cards</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      ) : !allCards.length ? (
        <Card>
          <CardHeader>
            <CardTitle>No cards found</CardTitle>
            <CardDescription>
              Add rows in Supabase and ensure your SELECT policy allows access.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : hasFilters && !filteredCards.length ? (
        <Card>
          <CardHeader>
            <CardTitle>No matching cards</CardTitle>
            <CardDescription>
              Try a different card name, provider, number, network, or card type filter.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <CardGrid cards={filteredCards} />
      )}
      <BottomTabBar />
    </main>
  )
}
