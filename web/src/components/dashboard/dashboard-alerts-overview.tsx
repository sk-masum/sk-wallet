import Link from 'next/link'
import { LayoutGrid, Settings } from 'lucide-react'

import { ExpiringCardsList } from '@/components/dashboard/expiring-cards-list'
import { RecentBillingCards } from '@/components/dashboard/recent-billing-cards'
import { formatInteger } from '@/components/dashboard/format'
import { SummaryStatCard } from '@/components/dashboard/summary-stat-card'
import { buttonVariants } from '@/components/ui/button'
import { responsiveIconSizes } from '@/components/ui/icon-sizes'
import { PageHeader } from '@/components/ui/page-header'
import type { DashboardAlertsData } from '@/models/dashboard'

type DashboardAlertsOverviewProps = {
    data: DashboardAlertsData
}

export function DashboardAlertsOverview({ data }: DashboardAlertsOverviewProps) {
    return (
        <main className="relative mx-auto w-full max-w-7xl space-y-7 px-4 pb-24 pt-6 sm:space-y-8 sm:px-6 sm:pb-6 lg:px-8">
            <section className="rounded-2xl p-4 sm:p-5">
                <PageHeader
                    title="Alerts"
                    className="mb-0"
                    rightSlot={(
                        <div className="flex items-center gap-2">
                            <Link
                                href="/"
                                aria-label="Open dashboard"
                                className={buttonVariants({ variant: 'headerIcon', size: 'headerIcon' })}
                            >
                                <LayoutGrid className={responsiveIconSizes.header} />
                            </Link>
                            <Link
                                href="/settings"
                                aria-label="Open settings"
                                className={buttonVariants({ variant: 'headerIcon', size: 'headerIcon' })}
                            >
                                <Settings className={responsiveIconSizes.header} />
                            </Link>
                        </div>
                    )}
                />
            </section>

            <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                <SummaryStatCard
                    label="Expiring Soon"
                    value={formatInteger(data.summary.expiringCardsSoon)}
                    icon="expiring"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,rgba(244,63,94,0.2),transparent_46%),radial-gradient(circle_at_88%_86%,rgba(239,68,68,0.16),transparent_46%),hsl(var(--background))]"
                />
                <SummaryStatCard
                    label="Blocked or Replaced"
                    value={formatInteger(data.summary.blockedOrReplacedCards)}
                    icon="blocked"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,rgba(249,115,22,0.2),transparent_46%),radial-gradient(circle_at_88%_86%,rgba(245,158,11,0.16),transparent_46%),hsl(var(--background))]"
                />
                <SummaryStatCard
                    label="Billing Configured"
                    value={formatInteger(data.summary.cardsWithBillingConfigured)}
                    icon="billing"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,rgba(14,165,233,0.2),transparent_46%),radial-gradient(circle_at_88%_86%,rgba(59,130,246,0.16),transparent_46%),hsl(var(--background))]"
                />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <ExpiringCardsList cards={data.expiringCards} />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <RecentBillingCards cards={data.recentBillingCards} />
            </section>
        </main>
    )
}
