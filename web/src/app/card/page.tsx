import Link from 'next/link'
import { cookies } from 'next/headers'
import { X } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/ui/mode-toggle'
import {
  NetworkFilterDropdown,
} from '@/components/ui/network-filter-dropdown'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'

interface WalletCard {
  id: string | number
  created_at: string | null
  card_name: string | null
  number: string | number | null
  cvv: string | null
  holder_name: string | null
  network: string | number | null
  isCredit: boolean | null;
}

type CardTheme = {
  surface: string
  chip: string
  mutedText: string
}

const CARD_THEMES: CardTheme[] = [
  {
    surface: 'bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700',
    chip: 'bg-linear-to-br from-amber-300 to-yellow-500',
    mutedText: 'text-blue-100/80',
  },
  {
    surface: 'bg-linear-to-br from-emerald-700 via-teal-700 to-cyan-700',
    chip: 'bg-linear-to-br from-lime-300 to-emerald-400',
    mutedText: 'text-emerald-100/80',
  },
  {
    surface: 'bg-linear-to-br from-rose-700 via-pink-700 to-fuchsia-700',
    chip: 'bg-linear-to-br from-orange-300 to-rose-400',
    mutedText: 'text-rose-100/80',
  },
  {
    surface: 'bg-linear-to-br from-orange-700 via-amber-700 to-yellow-700',
    chip: 'bg-linear-to-br from-zinc-200 to-zinc-400',
    mutedText: 'text-amber-100/80',
  },
  {
    surface: 'bg-linear-to-br from-slate-700 via-slate-800 to-zinc-900',
    chip: 'bg-linear-to-br from-sky-200 to-blue-400',
    mutedText: 'text-slate-200/80',
  },
  {
    surface: 'bg-linear-to-br from-red-700 via-orange-700 to-amber-700',
    chip: 'bg-linear-to-br from-yellow-200 to-amber-400',
    mutedText: 'text-red-100/80',
  },
  {
    surface: 'bg-linear-to-br from-violet-700 via-purple-700 to-indigo-800',
    chip: 'bg-linear-to-br from-fuchsia-200 to-violet-400',
    mutedText: 'text-violet-100/80',
  },
  {
    surface: 'bg-linear-to-br from-cyan-700 via-blue-700 to-indigo-800',
    chip: 'bg-linear-to-br from-cyan-200 to-sky-400',
    mutedText: 'text-cyan-100/80',
  },
]

enum CardNetwork {
  VISA = 1,
  RUPAY = 2,
  MASTERCARD = 3,
  AMEX = 4,
}

function resolveNetworkLabel(network: WalletCard['network']) {
  const code = typeof network === 'number' ? network : Number(network)

  switch (code) {
    case CardNetwork.VISA:
      return 'VISA'
    case CardNetwork.RUPAY:
      return 'RUPAY'
    case CardNetwork.MASTERCARD:
      return 'MASTERCARD'
    case CardNetwork.AMEX:
      return 'AMEX'
    default:
      if (typeof network === 'string' && network.trim()) {
        return network.trim().toUpperCase()
      }
      return 'VISA'
  }
}

function maskCardNumber(raw: unknown) {
  const value = typeof raw === 'string' || typeof raw === 'number' ? String(raw) : ''
  const digits = value.replace(/\D/g, '')
  if (digits.length < 8) return '•••• •••• •••• ••••'
  const last4 = digits.slice(-4)
  return `•••• •••• •••• ${last4}`
}

function formatExpiry(createdAt: string | null) {
  if (!createdAt) return 'MM/YY'
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return 'MM/YY'

  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yy = String(date.getFullYear()).slice(-2)
  return `${mm}/${yy}`
}

function getCardTheme(seed: string) {
  let hash = 0

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }

  return CARD_THEMES[Math.abs(hash) % CARD_THEMES.length]
}

interface CardPageProps {
  searchParams?: Promise<{
    q?: string
    network?: string
    type?: string
  }>
}

export default async function CardPage({ searchParams }: CardPageProps) {
  const params = searchParams ? await searchParams : {}
  const query = params.q?.trim() ?? ''
  const networkParam = params.network?.trim().toUpperCase() ?? ''
  const typeParam = params.type?.trim().toLowerCase() ?? 'all'
  const selectedType = typeParam === 'credit' || typeParam === 'debit' ? typeParam : 'all'
  const selectedNetwork = networkParam === 'ALL' ? '' : networkParam
  const queryLower = query.toLowerCase()
  const queryDigits = query.replace(/\D/g, '')

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: cards, error } = await supabase
    .from('card')
    .select('*')
    .order('id', { ascending: true })

  const allCards = (cards ?? []) as WalletCard[]
  const networkOptions = [...new Set(allCards.map((card) => resolveNetworkLabel(card.network)))].sort()
  const hasTextQuery = query.length > 0
  const hasNetworkFilter = selectedNetwork.length > 0
  const hasTypeFilter = selectedType !== 'all'
  const hasFilters = hasTextQuery || hasNetworkFilter || hasTypeFilter

  const buildFilterHref = (next: { network?: string; type?: string; q?: string }) => {
    const nextNetwork = next.network ?? selectedNetwork
    const nextType = next.type ?? selectedType
    const nextQuery = next.q ?? query
    const nextParams = new URLSearchParams()

    if (nextQuery) {
      nextParams.set('q', nextQuery)
    }

    if (nextNetwork) {
      nextParams.set('network', nextNetwork)
    }

    if (nextType && nextType !== 'all') {
      nextParams.set('type', nextType)
    }

    const serialized = nextParams.toString()
    return serialized ? `/card?${serialized}` : '/card'
  }

  const filteredCards = allCards.filter((card) => {
    const cardName = card.card_name?.toLowerCase() ?? ''
    const numberRaw = String(card.number ?? '')
    const numberDigits = numberRaw.replace(/\D/g, '')
    const cardNetwork = resolveNetworkLabel(card.network)
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'credit' ? card.isCredit === true : card.isCredit === false)

    const matchesText =
      !hasTextQuery ||
      cardName.includes(queryLower) ||
      numberRaw.toLowerCase().includes(queryLower) ||
      (queryDigits.length > 0 && numberDigits.includes(queryDigits))

    const matchesNetwork = !hasNetworkFilter || cardNetwork === selectedNetwork

    return matchesText && matchesNetwork && matchesType
  })

  return (
    <main className="mx-auto min-h-screen w-full max-w-212.5 px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Cards</h1>
          <p className="text-sm text-muted-foreground">
            Supabase records rendered as credit card layouts
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ModeToggle />
          <Link href="/" className="text-sm text-muted-foreground underline">
            Home
          </Link>
        </div>
      </div>

      <Card className="mb-6 max-w-sm">
        <CardHeader className="pb-3">
          <CardDescription>
            {hasFilters
              ? `Showing results${hasTextQuery ? ` for "${query}"` : ''}${
                  hasNetworkFilter ? ` in ${selectedNetwork}` : ''
                }${
                  hasTypeFilter ? ` (${selectedType === 'credit' ? 'Credit' : 'Debit'})` : ''
                }`
              : 'Total records'}
          </CardDescription>
          <CardTitle className="text-4xl">{filteredCards.length}</CardTitle>
          {hasFilters ? (
            <CardDescription>{`Matched ${filteredCards.length} of ${allCards.length}`}</CardDescription>
          ) : null}
        </CardHeader>
      </Card>
      
      <form action="/card" method="get" className="mb-3 w-full">
        <div className="relative w-full sm:max-w-md">
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search by card name or number"
            aria-label="Search cards by card name or number"
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
              Try a different card name, number, network, or card type filter.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCards.map((card) => {
            const id = String(card.id ?? 'N/A')
            const name = card.card_name?.trim() || `Card #${id}`
            const holder = card.holder_name?.trim().toUpperCase() || 'CARD HOLDER'
            const numberRaw = card.number ?? ''
            const number = maskCardNumber(numberRaw)
            const expiry = formatExpiry(card.created_at)
            const brand = resolveNetworkLabel(card.network)
            const theme = getCardTheme(id)

            return (
              <div
                key={id}
                className={cn(
                  'relative flex min-h-56 flex-col justify-between rounded-xl p-5 text-slate-100 shadow-lg',
                  theme.surface
                )}
              >
                <div className={cn('absolute left-4 top-4 text-xs font-medium tracking-wide', theme.mutedText)}>
                  {name}
                </div>
                <div className={cn('absolute right-4 top-4 text-xs font-semibold tracking-[0.2em]', theme.mutedText)}>
                  {brand}
                </div>

                <div className={cn('mb-6 mt-8 h-9 w-14 rounded-md', theme.chip)} />

                <p className="font-mono text-lg tracking-[0.18em]">{number}</p>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className={cn('text-[10px] uppercase tracking-[0.2em]', theme.mutedText)}>
                      Card Holder
                    </p>
                    <p className="mt-1 text-sm font-medium tracking-wide">{holder}</p>
                  </div>

                  <div className="text-right">
                    <p className={cn('text-[10px] uppercase tracking-[0.2em]', theme.mutedText)}>
                      Expires
                    </p>
                    <p className="mt-1 font-mono text-sm">{expiry}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      )}
      <BottomTabBar />
    </main>
  )
}
