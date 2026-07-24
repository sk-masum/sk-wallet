'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { CardFace } from '@/components/card/card-face'
import { DeleteConfirmDialog } from '@/components/shared/delete-confirm-dialog'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Dialog } from '@/components/ui/dialog'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { isCardStatus } from '@/constants/card/status'
import type { WalletCard } from '@/models/card'
import { clientApiDelete, clientApiPatch } from '@/lib/api/client'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import { resolveNetworkLabel } from '@/utils/card/network'
import { useDashboardFavorites } from '@/hooks/use-dashboard-favorites'
import { CardDetail } from './card-detail'

type CardGridProps = {
  cards: WalletCard[]
  groupBy?: 'none' | 'provider' | 'network' | 'tags'
}

export function CardGrid({ cards, groupBy = 'none' }: CardGridProps) {
  const router = useRouter()
  const { hydrated, isFavorite, toggleFavorite } = useDashboardFavorites()
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
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
    setShowCardNumber(false)
    setConfirmDeleteOpen(false)
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

  const toggleNumberVisibility = () => {
    setShowCardNumber((prev) => !prev);
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
            <CardDetail
              selectedCard={selectedCard}
              showCardNumber={showCardNumber}
              toggleNumberVisibility={toggleNumberVisibility}
              isUpdatingStatus={isUpdatingStatus}
              isDeleting={isDeleting}
              setConfirmDeleteOpen={setConfirmDeleteOpen}
              hydrated={hydrated}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
              router={router}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              handleStatusUpdate={handleStatusUpdate}
            />
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
