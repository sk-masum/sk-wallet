import Link from 'next/link'
import { Bell, Settings } from 'lucide-react'

import { CardsCarousel } from '@/components/dashboard/cards-carousel'
import { CreditLimitChart } from '@/components/dashboard/credit-limit-chart'
import { FavoriteVaultCarousel } from '@/components/dashboard/favorite-vault-carousel'
import { formatInteger } from '@/components/dashboard/format'
import { SummaryStatCard } from '@/components/dashboard/summary-stat-card'
import { buttonVariants } from '@/components/ui/button'
import { responsiveIconSizes } from '@/components/ui/icon-sizes'
import { PageHeader } from '@/components/ui/page-header'
import type { DashboardData } from '@/models/dashboard'

type DashboardOverviewProps = {
    data: DashboardData
}

export function DashboardOverview({ data }: DashboardOverviewProps) {
    const favoriteDocuments = data.visual.favoriteVaultCarousel.filter((item) => item.type === 'document')
    const favoriteCredentials = data.visual.favoriteVaultCarousel.filter((item) => item.type === 'credential')

    return (
        <main className="relative mx-auto w-full max-w-7xl space-y-7 px-4 pb-24 pt-6 sm:space-y-8 sm:px-6 sm:pb-6 lg:px-8">
            <section className="rounded-2xl py-3 sm:py-7">
                <PageHeader
                    title="Dashboard"
                    className="mb-0"
                    rightSlot={(
                        <div className="flex items-center gap-2">
                            <Link
                                href="/alerts"
                                aria-label="Open alerts"
                                className={buttonVariants({ variant: 'headerIcon', size: 'headerIcon' })}
                            >
                                <Bell className={responsiveIconSizes.header} />
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
