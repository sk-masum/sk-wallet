import Link from 'next/link'
import { ArrowUpRight, Clock3, ShieldAlert } from 'lucide-react'

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

function getDaysLeftClass(daysLeft: number) {
    if (daysLeft <= 7) {
        return 'border-rose-300/65 bg-rose-500/20 text-rose-100'
    }

    if (daysLeft <= 15) {
        return 'border-amber-300/60 bg-amber-500/20 text-amber-100'
    }

    return 'border-emerald-300/60 bg-emerald-500/20 text-emerald-100'
}

export function ExpiringCardsList({ cards }: ExpiringCardsListProps) {
    return (
        <Card className="relative overflow-hidden border-border/70 bg-[radial-gradient(circle_at_14%_8%,hsl(var(--primary)/0.11),transparent_44%),radial-gradient(circle_at_88%_86%,hsl(var(--accent)/0.08),transparent_46%),hsl(var(--background))] shadow-[0_18px_42px_-34px_rgba(0,0,0,0.82)]">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/7 via-transparent to-transparent" />
            <CardHeader className="flex-row items-end justify-between gap-3 space-y-0">
                <div className="space-y-1.5">
                    <p className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/75 px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase dark:text-foreground/82">
                        <ShieldAlert className="h-3 w-3" />
                        Expiry Watch
                    </p>
                    <CardTitle>Expiring Cards</CardTitle>
                </div>
                <Link href="/card" className="inline-flex items-center rounded-full border border-border/70 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground dark:text-foreground/86">
                    <ArrowUpRight className="mr-1 h-3.5 w-3.5" /> All Cards
                </Link>
            </CardHeader>
            <CardContent className="relative">
                {cards.length === 0 ? (
                    <p className="text-sm text-muted-foreground dark:text-foreground/78">No cards are expiring in the next 45 days.</p>
                ) : (
                    <div className="space-y-2.5">
                        {cards.map((card) => {
                            const statusClass = statusClassMap[card.status] ?? statusClassMap.active
                            const daysLeftClass = getDaysLeftClass(card.daysLeft)

                            return (
                                <Link
                                    key={card.id}
                                    href={card.href}
                                    className="group flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/55 px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:bg-background/75 hover:shadow-[0_10px_22px_-18px_rgba(0,0,0,0.78)]"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-foreground">{card.name}</p>
                                        <p className="text-xs text-muted-foreground dark:text-foreground/78">Expires on {formatDate(card.expiryDate)}</p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2">
                                        <span className={cn('inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-semibold tracking-wide', daysLeftClass)}>
                                            <Clock3 className="mr-1 h-3 w-3" /> {card.daysLeft}d left
                                        </span>
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
