import Link from 'next/link'
import { Bell, Settings } from 'lucide-react'

import { CardsCarousel } from '@/components/dashboard/cards-carousel'
import { CreditLimitChart } from '@/components/dashboard/credit-limit-chart'
import { FavoriteVaultCarousel } from '@/components/dashboard/favorite-vault-carousel'
import { RecentBillingCards } from '@/components/dashboard/recent-billing-cards'
import { formatInteger } from '@/components/dashboard/format'
import { SummaryStatCard } from '@/components/dashboard/summary-stat-card'
import type { DashboardData } from '@/models/dashboard'

type DashboardOverviewProps = {
    data: DashboardData
}

export function DashboardOverview({ data }: DashboardOverviewProps) {
    const favoriteDocuments = data.visual.favoriteVaultCarousel.filter((item) => item.type === 'document')
    const favoriteCredentials = data.visual.favoriteVaultCarousel.filter((item) => item.type === 'credential')

    return (
        <main className="relative mx-auto w-full max-w-7xl space-y-7 px-4 pb-24 pt-6 sm:space-y-8 sm:px-6 sm:pb-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_0%,hsl(var(--primary)/0.12),transparent_36%),radial-gradient(circle_at_100%_18%,hsl(var(--accent)/0.09),transparent_34%)]" />

            <section className="rounded-2xl py-3 sm:py-7">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/alerts"
                            aria-label="Open alerts"
                            className="bg-background p-3 sm:p-5 rounded-full text-foreground"
                        >
                            <Bell className="sm:h-6 sm:w-6 h-5 w-5" />
                        </Link>
                        <Link
                            href="/settings"
                            aria-label="Open settings"
                            className="bg-background p-3 sm:p-5 rounded-full text-foreground"
                        >
                            <Settings className="sm:h-6 sm:w-6 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                <SummaryStatCard
                    label="Total Cards"
                    value={formatInteger(data.summary.totalCards)}
                    icon="cards"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,rgba(14,165,233,0.2),transparent_46%),radial-gradient(circle_at_88%_86%,rgba(59,130,246,0.16),transparent_46%),hsl(var(--background))]"
                />
                <SummaryStatCard
                    label="Active Credentials"
                    value={formatInteger(data.summary.activeCredentials)}
                    icon="credentials"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,rgba(16,185,129,0.2),transparent_46%),radial-gradient(circle_at_88%_86%,rgba(20,184,166,0.16),transparent_46%),hsl(var(--background))]"
                />
                <SummaryStatCard
                    label="Stored Documents"
                    value={formatInteger(data.summary.storedDocuments)}
                    icon="documents"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,rgba(245,158,11,0.2),transparent_46%),radial-gradient(circle_at_88%_86%,rgba(249,115,22,0.16),transparent_46%),hsl(var(--background))]"
                />
                <SummaryStatCard
                    label="Expiring Soon (45 days)"
                    value={formatInteger(data.summary.expiringSoonCount)}
                    icon="expiring"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,rgba(244,63,94,0.2),transparent_46%),radial-gradient(circle_at_88%_86%,rgba(239,68,68,0.16),transparent_46%),hsl(var(--background))]"
                />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <CardsCarousel cards={data.visual.cardsCarousel} />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <FavoriteVaultCarousel
                    title="Documents"
                    actionHref="/doc"
                    actionLabel="All Docs"
                    itemTypeLabel="Document"
                    emptyMessage="No favourite documents yet. Mark documents from the document list."
                    items={favoriteDocuments}
                />
            </section>

            <section className="grid grid-cols-1 gap-4">
                <FavoriteVaultCarousel
                    title="Credentials"
                    actionHref="/credential"
                    actionLabel="All Creds"
                    itemTypeLabel="Credential"
                    emptyMessage="No favourite credentials yet. Mark credentials from the credentials list."
                    items={favoriteCredentials}
                />
            </section>


            <section className="grid grid-cols-1 gap-4">
                <CreditLimitChart
                    rows={data.financial.creditPortfolio}
                    totalLimit={data.financial.totalCreditLimit}
                />
            </section>
        </main>
    )
}
