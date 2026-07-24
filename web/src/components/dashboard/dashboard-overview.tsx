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
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_0%,hsl(var(--primary)/0.12),transparent_34%),radial-gradient(circle_at_100%_14%,hsl(var(--ring)/0.12),transparent_32%),radial-gradient(circle_at_50%_100%,hsl(var(--accent)/0.14),transparent_50%)] dark:bg-[radial-gradient(circle_at_8%_0%,hsl(var(--primary)/0.2),transparent_38%),radial-gradient(circle_at_100%_14%,hsl(var(--ring)/0.17),transparent_36%),radial-gradient(circle_at_50%_100%,hsl(var(--accent)/0.14),transparent_54%)]" />

            <section className="rounded-2xl py-3 sm:py-7">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Dashboard</h1>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/alerts"
                            aria-label="Open alerts"
                            className="rounded-full border border-white/45 bg-(--glass-surface) p-3 text-foreground shadow-(--neu-shadow-raised-sm) backdrop-blur-md dark:border-white/18 dark:text-foreground sm:p-5"
                        >
                            <Bell className="sm:h-6 sm:w-6 h-5 w-5" />
                        </Link>
                        <Link
                            href="/settings"
                            aria-label="Open settings"
                            className="rounded-full border border-white/45 bg-(--glass-surface) p-3 text-foreground shadow-(--neu-shadow-raised-sm) backdrop-blur-md dark:border-white/18 dark:text-foreground sm:p-5"
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
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.22),transparent_46%),radial-gradient(circle_at_88%_86%,hsl(var(--primary)/0.16),transparent_46%),hsl(var(--background))] dark:bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.34),transparent_48%),radial-gradient(circle_at_88%_86%,hsl(var(--primary)/0.24),transparent_50%),hsl(var(--card)/0.95)]"
                />
                <SummaryStatCard
                    label="Active Credentials"
                    value={formatInteger(data.summary.activeCredentials)}
                    icon="credentials"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.2),transparent_46%),radial-gradient(circle_at_88%_86%,hsl(var(--primary)/0.14),transparent_46%),hsl(var(--background))] dark:bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.32),transparent_48%),radial-gradient(circle_at_88%_86%,hsl(var(--primary)/0.22),transparent_50%),hsl(var(--card)/0.95)]"
                />
                <SummaryStatCard
                    label="Stored Documents"
                    value={formatInteger(data.summary.storedDocuments)}
                    icon="documents"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.18),transparent_46%),radial-gradient(circle_at_88%_86%,hsl(var(--primary)/0.14),transparent_46%),hsl(var(--background))] dark:bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.3),transparent_48%),radial-gradient(circle_at_88%_86%,hsl(var(--primary)/0.2),transparent_50%),hsl(var(--card)/0.95)]"
                />
                <SummaryStatCard
                    label="Expiring Soon (45 days)"
                    value={formatInteger(data.summary.expiringSoonCount)}
                    icon="expiring"
                    toneClassName="bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.2),transparent_46%),radial-gradient(circle_at_88%_86%,hsl(var(--primary)/0.14),transparent_46%),hsl(var(--background))] dark:bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.32),transparent_48%),radial-gradient(circle_at_88%_86%,hsl(var(--primary)/0.22),transparent_50%),hsl(var(--card)/0.95)]"
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
