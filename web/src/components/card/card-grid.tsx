'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { CardFace } from '@/components/card/card-face'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react'
import type { WalletCard } from '@/models/card'
import { clientApiDelete } from '@/lib/api/client'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'

type CardGridProps = {
  cards: WalletCard[]
}

const getNetworkLabel = (network: WalletCard['network']) =>
  network === 1
    ? 'Visa'
    : network === 2
      ? 'Mastercard'
      : network === 3
        ? 'AmEx'
        : network === 4
          ? 'RuPay'
          : network === 5
            ? 'Discover'
            : 'Other'

export function CardGrid({ cards }: CardGridProps) {
  const router = useRouter()
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showCvv, setShowCvv] = useState(false)
  const [showFullNumber, setShowFullNumber] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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
  }, [selectedCardId])

  const selectedCard = useMemo(
    () => cards.find((card) => String(card.id) === selectedCardId) ?? null,
    [cards, selectedCardId]
  )

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
      showToast({ message: 'Card deleted successfully.', variant: 'success' })
      router.refresh()
    } catch {
      showToast({ message: 'Unable to delete card. Please try again.', variant: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <section className="mx-auto w-full max-w-5xl lg:grid lg:grid-cols-2 lg:gap-6">
        {cards.map((card, index) => {
          const id = String(card.id ?? 'N/A')
          const networkLabel = getNetworkLabel(card.network)
          return (
            <button
              key={id}
              type="button"
              className={cn(
                'block w-full text-left transition-transform duration-300 ease-out hover:-translate-y-1',
                'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-500',
                index > 0 && '-mt-26 sm:-mt-42',
                'lg:mt-0'
              )}
              style={{ animationDelay: `${Math.min(index, 7) * 70}ms` }}
              onClick={() => setSelectedCardId(id)}
              aria-label={`Open card ${id}`}
            >
              <CardFace card={card} />
            </button>
          )
        })}
      </section>

      <Dialog open={Boolean(selectedCard)} onOpenChange={(open) => !open && setSelectedCardId(null)}>
        {selectedCard ? (
          <DetailDialogContent
            className={cn(
              'max-h-[90dvh] w-[calc(100vw-2rem)] max-w-120 overflow-visible border-0 bg-transparent p-0 shadow-none',
              isMobile &&
              'top-auto bottom-0 left-0 right-0 w-full max-w-none translate-x-0 translate-y-0 rounded-none'
            )}
          >
            <div>
              <CardFace
                card={selectedCard}
                showCvv={showCvv}
                showFullNumber={showFullNumber}
                expiryAlignStart
                className="rounded-b-none"
                onToggleNumberVisibility={() => setShowFullNumber((prev) => !prev)}
                allowCopyNumber
                allowCopyExpiry
              />

              <div className="-mt-px rounded-b-2xl border border-t-0 border-border/65 bg-linear-to-b from-background/94 to-muted/35 px-3 pb-3 pt-2.5 backdrop-blur-md sm:px-4 sm:pb-4 sm:pt-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-11 justify-start rounded-xl border-border/70 bg-background/85 px-3 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md"
                    onClick={() => setShowCvv((prev) => !prev)}
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
                    className="h-11 justify-start rounded-xl border-border/70 bg-background/85 px-3 text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-md"
                    onClick={() => router.push(`/card/${selectedCard.id}`)}
                  >
                    <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Pencil className="h-3.5 w-3.5" />
                    </span>
                    Edit card
                  </Button>
                </div>

                <div className="mt-2.5 border-t border-border/55 pt-2.5 sm:mt-3 sm:pt-3">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-11 w-full justify-start rounded-xl border border-destructive/45 bg-linear-to-r from-rose-600 to-red-600 px-3 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:from-rose-500 hover:to-red-500 hover:shadow-md"
                    onClick={() => setConfirmDeleteOpen(true)}
                    disabled={isDeleting}
                  >
                    <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/15">
                      <Trash2 className="h-3.5 w-3.5" />
                    </span>
                    {isDeleting ? 'Deleting...' : 'Delete card'}
                  </Button>
                </div>
              </div>
            </div>
          </DetailDialogContent>
        ) : null}
      </Dialog>

      <Dialog open={confirmDeleteOpen} onOpenChange={(open) => !isDeleting && setConfirmDeleteOpen(open)}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-sm p-5">
          <div className="relative space-y-3">
            {isDeleting ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/75 backdrop-blur-[1px]">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative h-20 w-32">
                    <div className="absolute left-2 top-3 h-16 w-24 rounded-lg border border-border/50 bg-muted/50" />
                    <div className="absolute left-4 top-1 h-16 w-24 rounded-lg border border-red-300/70 bg-linear-to-br from-rose-700 via-red-700 to-orange-800 shadow-lg animate-pulse" />
                    <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-40 animate-ping" />
                      <span className="relative text-sm font-bold">-</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium">Deleting card...</p>
                </div>
              </div>
            ) : null}
            <h3 className="text-lg font-semibold">Delete card?</h3>
            <p className="text-sm text-muted-foreground">
              This will permanently remove the card from Supabase. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmDeleteOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
