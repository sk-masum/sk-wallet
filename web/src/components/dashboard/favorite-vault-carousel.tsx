'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, KeyRound, LoaderCircle } from 'lucide-react'

import { MiniVerticalCarouselCard } from '@/components/dashboard/mini-vertical-carousel-card'
import { SharedCarouselSection } from '@/components/dashboard/shared-carousel-section'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyButton } from '@/components/ui/copy-button'
import { Dialog } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { getCredentialTypeConfig } from '@/constants/credential/types'
import { getDocumentCategoryLabel } from '@/constants/document/categories'
import { clientApiGet } from '@/lib/api/client'
import type { UserCredential } from '@/models/credential'
import type { DashboardFavoriteVaultItem } from '@/models/dashboard'
import type { UserDocument } from '@/models/document'
import { getDocumentDisplayTypeLabel } from '@/utils/document/label'

type CredentialDetailsResponse = {
    data?: UserCredential
    error?: string
}

type DocumentDetails = UserDocument & {
    document_number?: string
}

type DocumentDetailsResponse = {
    data?: DocumentDetails
    error?: string
}

type SelectedVaultItem = {
    id: string
    type: DashboardFavoriteVaultItem['type']
    href: string
}

type FavoriteDetailData =
    | { kind: 'credential'; credential: UserCredential }
    | { kind: 'document'; document: DocumentDetails }

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
    const router = useRouter()
    const [selectedItem, setSelectedItem] = useState<SelectedVaultItem | null>(null)
    const [detailData, setDetailData] = useState<FavoriteDetailData | null>(null)
    const [loadingDetails, setLoadingDetails] = useState(false)
    const [detailsError, setDetailsError] = useState<string | null>(null)

    const detailDialogOpen = Boolean(selectedItem)

    useEffect(() => {
        if (!selectedItem) {
            setDetailData(null)
            setDetailsError(null)
            setLoadingDetails(false)
            return
        }

        let cancelled = false

        const fetchDetails = async () => {
            setLoadingDetails(true)
            setDetailsError(null)
            setDetailData(null)

            try {
                if (selectedItem.type === 'credential') {
                    const { response, data } = await clientApiGet<CredentialDetailsResponse>(`/api/credential/${selectedItem.id}`)

                    if (cancelled) return

                    if (!response.ok || !data?.data) {
                        setDetailsError(data?.error || 'Unable to load credential details.')
                        return
                    }

                    setDetailData({ kind: 'credential', credential: data.data })
                    return
                }

                const { response, data } = await clientApiGet<DocumentDetailsResponse>(`/api/document/${selectedItem.id}`)

                if (cancelled) return

                if (!response.ok || !data?.data) {
                    setDetailsError(data?.error || 'Unable to load document details.')
                    return
                }

                setDetailData({ kind: 'document', document: data.data })
            } catch {
                if (cancelled) return
                setDetailsError(
                    selectedItem.type === 'credential'
                        ? 'Unable to load credential details.'
                        : 'Unable to load document details.'
                )
            } finally {
                if (!cancelled) {
                    setLoadingDetails(false)
                }
            }
        }

        void fetchDetails()

        return () => {
            cancelled = true
        }
    }, [selectedItem])

    const dialogTitle = useMemo(() => {
        if (!selectedItem) return ''
        return selectedItem.type === 'credential' ? 'Credential details' : 'Document details'
    }, [selectedItem])

    const formatDateTime = (value: string | null | undefined) => {
        if (!value) return 'N/A'
        const parsed = new Date(value)
        if (Number.isNaN(parsed.getTime())) return 'N/A'
        return parsed.toLocaleString()
    }

    return (
        <>
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
                        onClick={() => setSelectedItem({ id: item.id, type: item.type, href: item.href })}
                        title={item.title}
                        subtitle={item.subtitle}
                        className="min-w-44"
                        leadingMedia={
                            item.type === 'document' && (
                                <div className='uppercase text-xs'>{item.document_type}</div>
                            )
                        }
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

            <Dialog open={detailDialogOpen} onOpenChange={(open) => !open && setSelectedItem(null)}>
                <DetailDialogContent>
                    {loadingDetails ? (
                        <div className="mx-auto w-full max-w-120 space-y-3">
                            <div
                                className={[
                                    'relative overflow-hidden rounded-2xl border border-border/65 px-4 pb-5 pt-4 shadow-xl sm:px-5',
                                    selectedItem?.type === 'credential'
                                        ? 'bg-linear-to-br from-teal-950 via-emerald-900 to-teal-950 text-emerald-50'
                                        : 'bg-linear-to-br from-amber-950 via-orange-900 to-amber-950 text-amber-50',
                                ].join(' ')}
                            >
                                <div className="pointer-events-none absolute -inset-x-10 -top-18 h-36 rotate-6 bg-linear-to-r from-transparent via-white/12 to-transparent motion-safe:animate-[pulse_2.4s_ease-in-out_infinite]" />

                                <div className="relative flex items-start justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-28 bg-white/20" />
                                        <Skeleton className="h-3 w-18 bg-white/15" />
                                    </div>
                                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                                        {selectedItem?.type === 'credential' ? (
                                            <KeyRound className="h-4 w-4 text-white/85" />
                                        ) : (
                                            <FileText className="h-4 w-4 text-white/85" />
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Skeleton className="h-5 w-46 rounded bg-white/18" />
                                    <Skeleton className="h-4 w-34 rounded bg-white/16" />
                                </div>

                                <div className="mt-7 grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-2.5 w-16 bg-white/16" />
                                        <Skeleton className="h-3.5 w-24 bg-white/18" />
                                    </div>
                                    <div className="space-y-1.5 text-right">
                                        <Skeleton className="ml-auto h-2.5 w-14 bg-white/16" />
                                        <Skeleton className="ml-auto h-3.5 w-20 bg-white/18" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border/65 bg-background/95 px-4 py-3">
                                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                    Preparing secure {selectedItem?.type === 'credential' ? 'credential' : 'document'} details...
                                </div>
                            </div>
                        </div>
                    ) : detailsError ? (
                        <div className="mx-auto flex min-h-56 w-full max-w-120 flex-col items-center justify-center gap-4 rounded-2xl border border-border/65 bg-background/95 px-6 py-8 text-center motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                            <p className="text-sm text-muted-foreground">{detailsError}</p>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => selectedItem && router.push(selectedItem.href)}
                            >
                                Open full page
                            </Button>
                        </div>
                    ) : detailData?.kind === 'credential' ? (
                        <Card className="mx-auto w-full max-w-120 border-border/70 bg-card/95 shadow-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{dialogTitle}</CardTitle>
                                <CardDescription>
                                    {getCredentialTypeConfig(detailData.credential.credential_type)?.label ?? detailData.credential.credential_type}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                    <p className="text-xs text-muted-foreground">Service</p>
                                    <p className="mt-1 font-medium text-foreground">{detailData.credential.service_name}</p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Identifier</p>
                                        <div className="mt-1 flex items-center justify-between gap-2">
                                            <p className="truncate font-medium text-foreground">{detailData.credential.identifier || 'N/A'}</p>
                                            {detailData.credential.identifier ? (
                                                <CopyButton
                                                    value={detailData.credential.identifier}
                                                    label="Identifier"
                                                    className="inline-flex h-7 items-center rounded-md border border-border/65 px-2 text-xs"
                                                    showStatusIcon
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Secret</p>
                                        <p className="mt-1 font-mono text-foreground">{detailData.credential.masked_secret}</p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Website</p>
                                        <p className="mt-1 truncate font-medium text-foreground">{detailData.credential.url || 'N/A'}</p>
                                    </div>
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Updated</p>
                                        <p className="mt-1 font-medium text-foreground">{formatDateTime(detailData.credential.updated_at)}</p>
                                    </div>
                                </div>

                                {detailData.credential.notes ? (
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Notes</p>
                                        <p className="mt-1 whitespace-pre-wrap text-foreground">{detailData.credential.notes}</p>
                                    </div>
                                ) : null}

                                <div className="flex justify-end pt-1">
                                    <Button type="button" variant="outline" onClick={() => selectedItem && router.push(selectedItem.href)}>
                                        Open full page
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : detailData?.kind === 'document' ? (
                        <Card className="mx-auto w-full max-w-120 border-border/70 bg-card/95 shadow-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{dialogTitle}</CardTitle>
                                <CardDescription>
                                    {getDocumentDisplayTypeLabel(detailData.document.document_type, detailData.document.metadata)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                    <p className="text-xs text-muted-foreground">Document number</p>
                                    <div className="mt-1 flex items-center justify-between gap-2">
                                        <p className="truncate font-mono text-foreground">{detailData.document.document_number || detailData.document.masked_number}</p>
                                        <CopyButton
                                            value={detailData.document.document_number || detailData.document.masked_number}
                                            label="Document number"
                                            className="inline-flex h-7 items-center rounded-md border border-border/65 px-2 text-xs"
                                            showStatusIcon
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Name on document</p>
                                        <p className="mt-1 font-medium text-foreground">{detailData.document.name_on_document || 'N/A'}</p>
                                    </div>
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Category</p>
                                        <p className="mt-1 font-medium text-foreground">{getDocumentCategoryLabel(detailData.document.category)}</p>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Verified at</p>
                                        <p className="mt-1 font-medium text-foreground">{formatDateTime(detailData.document.verified_at)}</p>
                                    </div>
                                    <div className="rounded-xl border border-border/65 bg-background/70 p-3">
                                        <p className="text-xs text-muted-foreground">Expires at</p>
                                        <p className="mt-1 font-medium text-foreground">{formatDateTime(detailData.document.expires_at)}</p>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-1">
                                    <Button type="button" variant="outline" onClick={() => selectedItem && router.push(selectedItem.href)}>
                                        Open full page
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : null}
                </DetailDialogContent>
            </Dialog>
        </>
    )
}
