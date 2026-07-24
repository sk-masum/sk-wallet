'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'

import { CardFace } from '@/components/card/card-face'
import { MiniVerticalCarouselCard } from '@/components/dashboard/mini-vertical-carousel-card'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { NetworkLogo } from '@/components/icons/network-logo'
import { SharedCarouselSection } from '@/components/dashboard/shared-carousel-section'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { clientApiGet } from '@/lib/api/client'
import type { CardNetwork } from '@/models/card'
import type { DashboardCardPreview } from '@/models/dashboard'
import { getCardThemeByColorName } from '@/utils/card/theme'
import type { WalletCard } from '@/models/card'
import ChipIcon from '../icons/chip-icon'

type CardsCarouselProps = {
    cards: DashboardCardPreview[]
}

type CardDetailsResponse = {
    data?: WalletCard
    error?: string
}

export function CardsCarousel({ cards }: CardsCarouselProps) {
    const router = useRouter()
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
    const [selectedCard, setSelectedCard] = useState<WalletCard | null>(null)
    const [loadingDetails, setLoadingDetails] = useState(false)
    const [detailsError, setDetailsError] = useState<string | null>(null)

    useEffect(() => {
        if (!selectedCardId) {
            setSelectedCard(null)
            setDetailsError(null)
            setLoadingDetails(false)
            return
        }

        let cancelled = false

        const fetchCardDetails = async () => {
            setLoadingDetails(true)
            setDetailsError(null)

            try {
                const { response, data } = await clientApiGet<CardDetailsResponse>(`/api/card/${selectedCardId}`)

                if (cancelled) return

                if (!response.ok || !data?.data) {
                    setSelectedCard(null)
                    setDetailsError(data?.error || 'Unable to load card details.')
                    return
                }

                setSelectedCard(data.data)
            } catch {
                if (cancelled) return
                setSelectedCard(null)
                setDetailsError('Unable to load card details.')
            } finally {
                if (!cancelled) {
                    setLoadingDetails(false)
                }
            }
        }

        void fetchCardDetails()

        return () => {
            cancelled = true
        }
    }, [selectedCardId])

    return (
        <>
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
                            href={`/card/${card.id}`}
                            onClick={() => setSelectedCardId(card.id)}
                            title={card.maskedNumber}
                            subtitle={card.name}
                            className={`min-w-44 border-white/20 ${theme.surface}`}
                            titleClassName="text-base text-white/95"
                            subtitleClassName="text-sm font-mono font-semibold text-white"
                            leadingMedia={
                                <ChipIcon className="h-8 w-10 text-white -rotate-90" />
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

            <Dialog open={Boolean(selectedCardId)} onOpenChange={(open) => !open && setSelectedCardId(null)}>
                <DetailDialogContent>
                    {loadingDetails ? (
                        <div className="mx-auto w-full max-w-120 space-y-3">
                            <div className="relative overflow-hidden rounded-2xl border border-border/65 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 pb-5 pt-4 text-slate-100 shadow-xl sm:px-5">
                                <div className="pointer-events-none absolute -inset-x-10 -top-18 h-36 rotate-6 bg-linear-to-r from-transparent via-white/12 to-transparent motion-safe:animate-[pulse_2.4s_ease-in-out_infinite]" />

                                <div className="relative flex items-start justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-28 bg-white/20" />
                                        <Skeleton className="h-3 w-20 bg-white/15" />
                                    </div>
                                    <Skeleton className="h-9 w-16 rounded-lg bg-white/15" />
                                </div>

                                <Skeleton className="mt-6 h-9 w-12 rounded-md bg-white/16" />

                                <div className="mt-6 flex items-center justify-between gap-3">
                                    <Skeleton className="h-5 w-49 rounded bg-white/18" />
                                    <button
                                        type="button"
                                        disabled
                                        aria-hidden="true"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/20 bg-white/10"
                                    >
                                        <LoaderCircle className="h-3.5 w-3.5 animate-spin text-white/90" />
                                    </button>
                                </div>

                                <div className="mt-7 grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-2.5 w-16 bg-white/16" />
                                        <Skeleton className="h-3.5 w-26 bg-white/18" />
                                    </div>
                                    <div className="space-y-1.5 text-right">
                                        <Skeleton className="ml-auto h-2.5 w-14 bg-white/16" />
                                        <Skeleton className="ml-auto h-3.5 w-18 bg-white/18" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border/65 bg-background/95 px-4 py-3">
                                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                    Preparing secure card details...
                                </div>
                            </div>
                        </div>
                    ) : detailsError ? (
                        <div className="mx-auto flex min-h-64 w-full max-w-120 flex-col items-center justify-center gap-4 rounded-2xl border border-border/65 bg-background/95 px-6 py-8 text-center">
                            <p className="text-sm text-muted-foreground">{detailsError}</p>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => selectedCardId && router.push(`/card/${selectedCardId}`)}
                            >
                                Open full card page
                            </Button>
                        </div>
                    ) : selectedCard ? (
                        <div className="mx-auto w-full max-w-120 space-y-3">
                            <CardFace
                                card={selectedCard}
                                showCreditLimit
                                showCvv
                                showFullNumber
                                allowCopyNumber
                                className="rounded-2xl"
                            />
                        </div>
                    ) : null}
                </DetailDialogContent>
            </Dialog>
        </>
    )
}
