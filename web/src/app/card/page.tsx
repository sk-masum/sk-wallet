import { redirect } from 'next/navigation'

import { CardMobileFilters } from '@/components/card/card-mobile-filters'
import { CardVault } from '@/components/card/card-vault'
import { ListingPageHeader } from '@/components/shared/listing-page-header'
import { ListingPageLayout } from '@/components/shared/listing-page-layout'
import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { serverApiGet } from '@/lib/api/server'
import type { WalletCard } from '@/models/card'

export default async function CardPage() {
    const { response, data: result } = await serverApiGet<{ data?: WalletCard[]; error?: string }>('/api/card')

    if (response.status === 401) {
        redirect('/auth?next=/card')
    }

    const allCards = response.ok ? result?.data ?? [] : []
    const error = response.ok ? null : result?.error || 'Failed to load cards'

    return (
        <ListingPageLayout contentClassName="max-w-212.5">
            <ListingPageHeader
                title="Cards"
                className="pt-6"
                showBackButton
                backHref="/"
                backButtonLabel="Back to dashboard"
                description={`${allCards.length} ${allCards.length === 1 ? 'card' : 'cards'}`}
                addLabel="Add card"
                mobileStickyHeader
                mobileFilters={<CardMobileFilters />}
            />

            <CardVault initialCards={allCards} initialError={error} />

            <BottomTabBar addHref="/card/new" addLabel="Add card" />
        </ListingPageLayout>
    )
}
