import Link from 'next/link'
import { cookies } from 'next/headers'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createClient } from '@/lib/supabase/server'

interface WalletCard {
  id: string | number
  created_at: string | null
  card_name: string | null
  number: string | number | null
  cvv: string | null
  holder_name: string | null
  network: string | number | null
}

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

export default async function CardPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: cards, error } = await supabase
    .from('card')
    .select('*')
    .order('id', { ascending: true })

  return (
    <main className="mx-auto min-h-screen w-full max-w-212.5 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Cards</h1>
          <p className="text-sm text-muted-foreground">
            Supabase records rendered as credit card layouts
          </p>
        </div>
        <Link href="/" className="text-sm text-muted-foreground underline">
          Home
        </Link>
      </div>

      <Card className="mb-6 max-w-sm">
        <CardHeader className="pb-3">
          <CardDescription>Total records</CardDescription>
          <CardTitle className="text-4xl">{cards?.length ?? 0}</CardTitle>
        </CardHeader>
      </Card>

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Failed to load cards</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      ) : !cards?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>No cards found</CardTitle>
            <CardDescription>
              Add rows in Supabase and ensure your SELECT policy allows access.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(cards as WalletCard[]).map((card) => {
            const id = String(card.id ?? 'N/A')
            const name = card.card_name?.trim() || `Card #${id}`
            const holder = card.holder_name?.trim().toUpperCase() || 'CARD HOLDER'
            const numberRaw = card.number ?? ''
            const number = maskCardNumber(numberRaw)
            const expiry = formatExpiry(card.created_at)
            const brand = resolveNetworkLabel(card.network)

            return (
              <div
                key={id}
                className="relative flex min-h-56 flex-col justify-between rounded-xl bg-linear-to-br from-slate-950 via-slate-800 to-slate-700 p-5 text-slate-100 shadow-lg"
              >
                <div className="absolute left-4 top-4 text-xs font-medium tracking-wide text-slate-200">
                  {name}
                </div>
                <div className="absolute right-4 top-4 text-xs font-semibold tracking-[0.2em] text-slate-300">
                  {brand}
                </div>

                <div className="mb-6 mt-8 h-9 w-14 rounded-md bg-linear-to-br from-amber-300 to-amber-500" />

                <p className="font-mono text-lg tracking-[0.18em]">{number}</p>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">
                      Card Holder
                    </p>
                    <p className="mt-1 text-sm font-medium tracking-wide">{holder}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">
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
    </main>
  )
}
