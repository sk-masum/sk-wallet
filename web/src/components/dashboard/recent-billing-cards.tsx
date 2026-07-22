import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import type { DashboardRecentBillingCard } from '@/models/dashboard'

type RecentBillingCardsProps = {
    cards: DashboardRecentBillingCard[]
}

function formatShortDate(value: string) {
    return new Date(value).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
    })
}

export function RecentBillingCards({ cards }: RecentBillingCardsProps) {
    return (
        <section className="relative overflow-hidden rounded-2xl border border-border/70 bg-[radial-gradient(circle_at_24%_14%,hsl(var(--primary)/0.13),transparent_44%),radial-gradient(circle_at_82%_82%,hsl(var(--accent)/0.1),transparent_44%),hsl(var(--background))] p-4 shadow-[0_16px_38px_-34px_rgba(0,0,0,0.8)] sm:p-5">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent" />
            <div className="relative mb-4 flex items-end justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Recent Bills</h3>
                </div>
                <Link href="/card" className="rounded-full border border-border/70 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground inline-flex items-center">
                    <ArrowRightIcon className="mr-1 h-4 w-4" /> All Cards
                </Link>
            </div>
            <div className="relative">
                {cards.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No cards with billing dates configured yet.</p>
                ) : (
                    <div className="space-y-2">
                        {cards.map((card) => (
                            <Link
                                key={card.id}
                                href={card.href}
                                className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-muted/15 px-3 py-2 transition-colors hover:bg-muted/35"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{card.name}</p>
                                    <p className="text-xs text-muted-foreground">Billing day: {card.billingDay}</p>
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground">{formatShortDate(card.nextBillingDate)}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
