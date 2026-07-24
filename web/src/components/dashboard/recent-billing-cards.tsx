import Link from 'next/link'
import { ArrowUpRight, CalendarClock, CircleDot } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { DashboardRecentBillingCard } from '@/models/dashboard'
import { responsiveIconSizes } from '../ui/icon-sizes'

type RecentBillingCardsProps = {
    cards: DashboardRecentBillingCard[]
}

function formatShortDate(value: string) {
    return new Date(value).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
    })
}

function getDaysLeft(nextBillingDate: string) {
    const now = new Date()
    const dueDate = new Date(nextBillingDate)
    const msInDay = 1000 * 60 * 60 * 24

    return Math.max(0, Math.ceil((dueDate.getTime() - now.getTime()) / msInDay))
}

function getDueClass(nextBillingDate: string) {
    const daysLeft = getDaysLeft(nextBillingDate)

    if (daysLeft <= 3) {
        return 'border-rose-300/65 bg-rose-500/20 text-rose-100 dark:border-rose-300/40 dark:bg-rose-500/10 dark:text-rose-100'
    }

    if (daysLeft <= 7) {
        return 'border-amber-300/60 bg-amber-500/20 text-amber-100'
    }

    return 'border-sky-300/55 bg-sky-500/20 text-sky-100'
}

export function RecentBillingCards({ cards }: RecentBillingCardsProps) {
    return (
        <Card className="relative overflow-hidden border-white/45 bg-[radial-gradient(circle_at_24%_14%,hsl(var(--primary)/0.13),transparent_44%),radial-gradient(circle_at_82%_82%,hsl(var(--accent)/0.1),transparent_44%),var(--glass-surface)] shadow-(--neu-shadow-raised-sm) backdrop-blur-md dark:border-white/16">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent" />
            <CardHeader className="relative flex-row items-end justify-between gap-3 space-y-0">
                <div className="space-y-1.5">
                    <p className="inline-flex items-center gap-1 rounded-full border border-white/40 bg-(--glass-surface) px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase shadow-(--neu-shadow-raised-sm) dark:border-white/16 dark:text-foreground/82">
                        <CalendarClock className="h-3 w-3" />
                        Billing Timeline
                    </p>
                    <CardTitle>Latest Bills</CardTitle>
                </div>
                <Link href="/card" className="inline-flex items-center rounded-full border border-white/40 bg-[var(--glass-surface)] px-3 py-1 text-xs font-semibold text-muted-foreground shadow-(--neu-shadow-raised-sm) transition-colors hover:bg-[var(--glass-surface-strong)] hover:text-foreground dark:border-white/16 dark:text-foreground/86">
                    <ArrowUpRight className={responsiveIconSizes.action} /> All Cards
                </Link>
            </CardHeader>
            <CardContent className="relative">
                {cards.length === 0 ? (
                    <p className="text-sm text-muted-foreground dark:text-foreground/78">No cards with billing dates configured yet.</p>
                ) : (
                    <div className="space-y-2.5">
                        {cards.map((card) => {
                            const dueClass = getDueClass(card.nextBillingDate)
                            const daysLeft = getDaysLeft(card.nextBillingDate)

                            return (
                                <Link
                                    key={card.id}
                                    href={card.href}
                                    className="group flex items-center justify-between gap-3 rounded-xl border border-white/40 bg-(--glass-surface) px-3.5 py-3 shadow-(--neu-shadow-raised-sm) backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-(--glass-surface-strong) dark:border-white/16"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-foreground">{card.name}</p>
                                        <p className="text-xs text-muted-foreground dark:text-foreground/78">
                                            {daysLeft === 0 ? 'Due today' : `${daysLeft} day${daysLeft === 1 ? '' : 's'} left`}
                                        </p>
                                    </div>
                                    <div className={cn('inline-flex shrink-0 items-center rounded-full border px-2 py-1 text-[10px] font-semibold tracking-wide', dueClass)}>
                                        <CircleDot className="mr-1 h-2.5 w-2.5" />
                                        {formatShortDate(card.nextBillingDate)}
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
