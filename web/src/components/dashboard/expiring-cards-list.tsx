import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { DashboardExpiringCard } from '@/models/dashboard'

type ExpiringCardsListProps = {
    cards: DashboardExpiringCard[]
}

const statusClassMap: Record<string, string> = {
    active: 'border-emerald-300/60 bg-emerald-500/15 text-emerald-200',
    inactive: 'border-slate-300/50 bg-slate-400/20 text-slate-100',
    blocked: 'border-amber-300/60 bg-amber-400/20 text-amber-100',
    replaced: 'border-rose-300/60 bg-rose-500/20 text-rose-100',
}

function getStatusLabel(status: string) {
    if (!status) return 'Active'
    return `${status.slice(0, 1).toUpperCase()}${status.slice(1).toLowerCase()}`
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

export function ExpiringCardsList({ cards }: ExpiringCardsListProps) {
    return (
        <Card className="border-border/70 bg-card/95 shadow-[0_16px_38px_-34px_rgba(0,0,0,0.8)]">
            <CardHeader className="flex-row items-end justify-between gap-3 space-y-0">
                <div>
                    <CardTitle>Expiring Cards</CardTitle>
                    <CardDescription>Cards expiring within the next 45 days.</CardDescription>
                </div>
                <Link href="/card" className="rounded-full border border-border/70 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground">
                    All Cards
                </Link>
            </CardHeader>
            <CardContent>
                {cards.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No cards are expiring in the next 45 days.</p>
                ) : (
                    <div className="space-y-2">
                        {cards.map((card) => {
                            const statusClass = statusClassMap[card.status] ?? statusClassMap.active

                            return (
                                <Link
                                    key={card.id}
                                    href={card.href}
                                    className="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-muted/15 px-3 py-2 transition-colors hover:bg-muted/35"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{card.name}</p>
                                        <p className="text-xs text-muted-foreground">Expires on {formatDate(card.expiryDate)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{card.daysLeft}d left</span>
                                        <span className={cn('inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide', statusClass)}>
                                            {getStatusLabel(card.status)}
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
