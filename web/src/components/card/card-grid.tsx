'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { CardFace } from '@/components/card/card-face'
import { DeleteConfirmDialog } from '@/components/shared/delete-confirm-dialog'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Dialog } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react'
import { CARD_STATUS_OPTIONS, isCardStatus } from '@/constants/card/status'
import type { WalletCard } from '@/models/card'
import { clientApiDelete, clientApiPatch } from '@/lib/api/client'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import { resolveNetworkLabel } from '@/utils/card/network'

type CardGridProps = {
  cards: WalletCard[]
  groupBy?: 'none' | 'provider' | 'network' | 'tags'
}

export function CardGrid({ cards, groupBy = 'none' }: CardGridProps) {
  const router = useRouter()
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showCvv, setShowCvv] = useState(false)
  const [showFullNumber, setShowFullNumber] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [statusActionsOpen, setStatusActionsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'inactive' | 'blocked' | 'replaced'>('active')
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    setShowCvv(false)
    setShowFullNumber(false)
    setConfirmDeleteOpen(false)
    setStatusActionsOpen(false)
  }, [selectedCardId])

  const selectedCard = useMemo(
    () => cards.find((card) => String(card.id) === selectedCardId) ?? null,
    [cards, selectedCardId]
  )

  useEffect(() => {
    if (!selectedCard) return

    const rawStatus = String(selectedCard.status ?? '').trim().toLowerCase()
    setSelectedStatus(isCardStatus(rawStatus) ? rawStatus : 'active')
  }, [selectedCard])

  const groupedCards = useMemo(() => {
    if (groupBy === 'none') {
      return [{ title: '', cards }]
    }

    const groupMap = new Map<string, WalletCard[]>()

    for (const card of cards) {
      const tags = Array.isArray(card.tags)
        ? card.tags.map((tag) => String(tag).trim()).filter(Boolean)
        : []
      const key =
        groupBy === 'provider'
          ? (card.provider ?? '').trim() || 'Unknown provider'
          : groupBy === 'network'
            ? resolveNetworkLabel(card.network) || 'Other network'
            : tags[0] || 'Untagged'
      const existing = groupMap.get(key)
      if (existing) {
        existing.push(card)
      } else {
        groupMap.set(key, [card])
      }
    }

    return [...groupMap.entries()].map(([title, groupCards]) => ({ title, cards: groupCards }))
  }, [cards, groupBy])

  useEffect(() => {
    if (groupBy === 'none') {
      setCollapsedGroups({})
      return
    }

    setCollapsedGroups((prev) => {
      const next: Record<string, boolean> = {}
      for (const group of groupedCards) {
        next[group.title] = prev[group.title] ?? false
      }
      return next
    })
  }, [groupBy, groupedCards])

  const toggleGroup = (groupTitle: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupTitle]: !prev[groupTitle],
    }))
  }

  const handleDelete = async () => {
    if (!selectedCardId || isDeleting) return

    setIsDeleting(true)
    try {
      const { response } = await clientApiDelete<{ success?: boolean; error?: string }>(
        `/api/card/${selectedCardId}`
      )
      if (!response.ok) {
        throw new Error('Delete failed')
      }

      setConfirmDeleteOpen(false)
      setSelectedCardId(null)
      setShowCvv(false)
      showToast({ message: 'Card archived successfully.', variant: 'success' })
      router.refresh()
    } catch {
      showToast({ message: 'Unable to archive card. Please try again.', variant: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!selectedCardId || isUpdatingStatus) return

    setIsUpdatingStatus(true)
    try {
      const { response, data } = await clientApiPatch<{ success?: boolean; error?: string }>(
        `/api/card/${selectedCardId}`,
        { status: selectedStatus }
      )

      if (!response.ok) {
        throw new Error(data?.error || 'Status update failed')
      }

      showToast({ message: 'Card status updated successfully.', variant: 'success' })
      router.refresh()
    } catch {
      showToast({ message: 'Unable to update card status. Please try again.', variant: 'error' })
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  return (
    <>
      <section className="mx-auto w-full max-w-5xl space-y-6">
        {groupedCards.map((group) => (
          <div key={group.title || 'all-cards'} className="space-y-3">
            {groupBy !== 'none' ? (
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                aria-expanded={!collapsedGroups[group.title]}
                aria-controls={`card-group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="flex w-full items-center justify-between rounded-xl border border-border/65 bg-card/60 px-3 py-2 text-left transition-colors hover:bg-card"
              >
                <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  {group.title}
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  {group.cards.length}
                  {collapsedGroups[group.title] ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </span>
              </button>
            ) : null}

            <div
              id={`card-group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className={cn(collapsedGroups[group.title] && groupBy !== 'none' ? 'hidden' : 'lg:grid lg:grid-cols-2 lg:gap-6')}
            >
              {group.cards.map((card, index) => {
                const id = String(card.id ?? 'N/A')
                const isSelected = selectedCardId === id
                return (
                  <button
                    key={id}
                    type="button"
                    className={cn(
                      'group relative block w-full text-left transition-all duration-300 ease-out hover:-translate-y-1 active:scale-[0.995] focus-visible:outline-none',
                      'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-500',
                      index > 0 && '-mt-28 sm:-mt-42',
                      'lg:mt-0'
                    )}
                    style={{ animationDelay: `${Math.min(index, 7) * 70}ms` }}
                    onClick={() => setSelectedCardId(id)}
                    aria-label={`Open card ${id}`}
                  >
                    <span
                      className={cn(
                        'pointer-events-none absolute inset-x-4 -bottom-2 h-8 rounded-full bg-primary/20 blur-xl opacity-0 transition-opacity duration-300',
                        'group-hover:opacity-100 group-focus-visible:opacity-100',
                        isSelected && 'opacity-100'
                      )}
                    />
                    <div
                      className={cn(
                        'relative transition-transform duration-300 ease-out group-hover:scale-[1.01] group-focus-visible:scale-[1.01]',
                        isSelected && 'scale-[1.01]'
                      )}
                    >
                      <CardFace card={card} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      <Dialog open={Boolean(selectedCard)} onOpenChange={(open) => !open && setSelectedCardId(null)}>
        {selectedCard ? (
          <DetailDialogContent
            className={cn(
              'motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 motion-safe:duration-300',
              isMobile && 'rounded-none'
            )}
          >
            <div>
              <CardFace
                card={selectedCard}
                showCvv={showCvv}
                showFullNumber={showFullNumber}
                showCreditLimit
                expiryAlignStart
                className="rounded-b-none"
                onToggleNumberVisibility={() => setShowFullNumber((prev) => !prev)}
                allowCopyNumber
                allowCopyExpiry
                allowCopyCvv
              />

              <div className="-mt-px rounded-b-2xl border border-t-0 border-border/65 bg-linear-to-b from-background/94 to-muted/35 px-3 pb-3 pt-2.5 backdrop-blur-md sm:px-4 sm:pb-4 sm:pt-3">
                {(selectedCard.billing_date != null || selectedCard.payment_date != null) ? (
                  <div className="mb-2.5 grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-xs">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Billing date</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {selectedCard.billing_date != null ? `${selectedCard.billing_date}` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Payment date</p>
                      <p className="mt-0.5 text-sm font-medium text-foreground">
                        {selectedCard.payment_date != null ? `${selectedCard.payment_date}` : 'N/A'}
                      </p>
                    </div>
                  </div>
                ) : null}

                <div className="grid grid-cols-2 gap-2.5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 justify-start rounded-xl border-border/70 bg-background/85 px-3 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md active:scale-[0.98]"
                    onClick={() => setShowCvv((prev) => !prev)}
                    disabled={isUpdatingStatus || isDeleting}
                  >
                    <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      {showCvv ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </span>
                    {showCvv ? 'Hide CVV' : 'Show CVV'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 justify-start rounded-xl border-border/70 bg-background/85 px-3 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md active:scale-[0.98]"
                    onClick={() => router.push(`/card/${selectedCard.id}`)}
                  >
                    <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Pencil className="h-3.5 w-3.5" />
                    </span>
                    Edit card
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 justify-start rounded-xl border-border/70 bg-background/85 px-3 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md active:scale-[0.98]"
                    onClick={() => setConfirmDeleteOpen(true)}
                    disabled={isDeleting || isUpdatingStatus}
                  >
                    <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Trash2 className="h-3.5 w-3.5" />
                    </span>
                    {isDeleting ? 'Archiving...' : 'Archive card'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 justify-start rounded-xl border-border/70 bg-background/85 px-3 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md active:scale-[0.98]"
                    onClick={() => setStatusActionsOpen((prev) => !prev)}
                    disabled={isDeleting}
                  >
                    <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      {statusActionsOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                    </span>
                    Change status
                  </Button>
                </div>

                {statusActionsOpen ? (
                  <div className="mt-2.5 border-t border-border/55 pt-2.5 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 sm:mt-3 sm:pt-3">
                    <div className="space-y-2 rounded-xl border border-border/60 bg-background/75 p-2.5">
                      <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Card status</p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <select
                          value={selectedStatus}
                          onChange={(event) => {
                            const value = event.target.value
                            if (isCardStatus(value)) {
                              setSelectedStatus(value)
                            }
                          }}
                          className="h-10 flex-1 rounded-lg border border-border/65 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          disabled={isUpdatingStatus || isDeleting}
                        >
                          {CARD_STATUS_OPTIONS.map((statusOption) => (
                            <option key={statusOption.value} value={statusOption.value}>
                              {statusOption.label}
                            </option>
                          ))}
                        </select>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-10 rounded-lg border-border/70 bg-background/90 px-4"
                          onClick={handleStatusUpdate}
                          disabled={isUpdatingStatus || isDeleting}
                        >
                          {isUpdatingStatus ? 'Updating...' : 'Update status'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </DetailDialogContent>
        ) : null}
      </Dialog>

      <DeleteConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={(open) => !isDeleting && setConfirmDeleteOpen(open)}
        title="Archive card?"
        description="This marks the card as Replaced and keeps it in history."
        confirmLabel="Archive"
        processingLabel="Archiving..."
        isProcessing={isDeleting}
        onConfirm={handleDelete}
      />
    </>
  )
}
