'use client'

import { MiniVerticalCarouselCard } from '@/components/dashboard/mini-vertical-carousel-card'
import { NetworkLogo } from '@/components/icons/network-logo'
import { SharedCarouselSection } from '@/components/dashboard/shared-carousel-section'
import type { CardNetwork } from '@/models/card'
import type { DashboardCardPreview } from '@/models/dashboard'
import { getCardThemeByColorName } from '@/utils/card/theme'
import ChipIcon from '../icons/chip-icon'

type CardsCarouselProps = {
    cards: DashboardCardPreview[]
}

export function CardsCarousel({ cards }: CardsCarouselProps) {
    return (
        <SharedCarouselSection
            title="Cards"
            actionHref="/card"
            actionLabel="All Cards"
            emptyMessage="No favourite cards yet. Mark cards as favourite from the cards list."
            items={cards}
            getItemKey={(card) => card.id}
            className="xl:col-span-3"
            renderItem={(card) => {
                const theme = getCardThemeByColorName(card.colorName)

                return (
                    <MiniVerticalCarouselCard
                        href={card.href}
                        title={card.maskedNumber}
                        subtitle={card.name}
                        className={`min-w-44 border-white/20 ${theme.surface}`}
                        titleClassName="text-base text-white/95"
                        subtitleClassName="text-sm font-mono font-semibold text-white"
                        leadingMedia={
                            <ChipIcon className="h-8 w-10 text-white" />
                        }
                        media={
                            <div className="flex items-start gap-2 text-foreground">
                                <NetworkLogo brand={card.network as CardNetwork} className="h-10 w-auto text-white" />
                            </div>
                        }
                    />
                )
            }}
        />
    )
}
