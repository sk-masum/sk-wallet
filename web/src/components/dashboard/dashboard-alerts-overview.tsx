import Link from 'next/link'
import { Bell } from 'lucide-react'

import { ExpiringCardsList } from '@/components/dashboard/expiring-cards-list'
import { RecentBillingCards } from '@/components/dashboard/recent-billing-cards'
import { formatInteger } from '@/components/dashboard/format'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { DashboardAlertsData } from '@/models/dashboard'

type DashboardAlertsOverviewProps = {
    data: DashboardAlertsData
}

export function DashboardAlertsOverview({ data }: DashboardAlertsOverviewProps) {
    return (
        <main className="mx-auto w-full max-w-7xl space-y-7 px-4 pb-10 pt-6 sm:space-y-8 sm:px-6 lg:px-8">
            <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-linear-to-br from-background via-muted/30 to-background p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.6)] sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,hsl(var(--primary)/0.12)_0%,transparent_40%),radial-gradient(circle_at_85%_74%,rgba(245,158,11,0.14)_0%,transparent_40%)]" />
                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <p className="inline-flex w-fit items-center gap-1 rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
                            <Bell className="h-3.5 w-3.5" />
                            Alerts Center
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cards Alerts</h1>
                        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
                            Dedicated view for expiring cards and upcoming billing dates.
                        </p>
                    </div>
                    <Link href="/" className={buttonVariants({ variant: 'outline' })}>
                        Back to Dashboard
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="border-border/70 bg-card/95">
                    <CardHeader className="pb-2">
                        <CardDescription>Expiring Soon</CardDescription>
                        <CardTitle className="text-3xl">{formatInteger(data.summary.expiringCardsSoon)}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="border-border/70 bg-card/95">
                    <CardHeader className="pb-2">
                        <CardDescription>Blocked or Replaced</CardDescription>
                        <CardTitle className="text-3xl">{formatInteger(data.summary.blockedOrReplacedCards)}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="border-border/70 bg-card/95">
                    <CardHeader className="pb-2">
                        <CardDescription>Billing Configured</CardDescription>
                        <CardTitle className="text-3xl">{formatInteger(data.summary.cardsWithBillingConfigured)}</CardTitle>
                    </CardHeader>
                </Card>
            </section>

            <section className="space-y-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Section 1</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight">Expiring Cards</h2>
                </div>
                <ExpiringCardsList cards={data.expiringCards} />
            </section>

            <section className="space-y-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Section 2</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight">Latest Billing Date for Cards</h2>
                </div>
                <RecentBillingCards cards={data.recentBillingCards} />
            </section>
        </main>
    )
}
