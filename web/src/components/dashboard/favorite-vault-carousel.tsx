import { FileText, KeyRound } from 'lucide-react'

import { MiniVerticalCarouselCard } from '@/components/dashboard/mini-vertical-carousel-card'
import { SharedCarouselSection } from '@/components/dashboard/shared-carousel-section'
import type { DashboardFavoriteVaultItem } from '@/models/dashboard'

type FavoriteVaultCarouselProps = {
    title: string
    actionHref: string
    actionLabel: string
    itemTypeLabel: string
    emptyMessage: string
    items: DashboardFavoriteVaultItem[]
}

export function FavoriteVaultCarousel({
    title,
    actionHref,
    actionLabel,
    itemTypeLabel,
    emptyMessage,
    items,
}: FavoriteVaultCarouselProps) {
    return (
        <SharedCarouselSection
            title={title}
            actionHref={actionHref}
            actionLabel={actionLabel}
            emptyMessage={emptyMessage}
            items={items}
            getItemKey={(item) => `${item.type}-${item.id}`}
            renderItem={(item) => (
                <MiniVerticalCarouselCard
                    href={item.href}
                    title={item.title}
                    subtitle={item.subtitle}
                    className="min-w-44"
                    media={
                        item.type === 'document' ? (
                            <FileText className="h-6 w-6 text-foreground/80" />
                        ) : (
                            <KeyRound className="h-6 w-6 text-foreground/80" />
                        )
                    }
                />
            )}
        />
    )
}
