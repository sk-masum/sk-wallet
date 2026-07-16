'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { CardFace } from '@/components/card/card-face'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Eye, EyeOff, Pencil, Trash2, X } from 'lucide-react'
import type { WalletCard } from '@/models/card'
import { clientApiDelete } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { formatExpiry } from '@/utils/card/format'

type CardGridProps = {
  cards: WalletCard[]
}

export function CardGrid({ cards }: CardGridProps) {
  const router = useRouter()
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [copiedField, setCopiedField] = useState<'number' | 'expiry' | null>(null)
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

  const copyText = async (field: 'number' | 'expiry', value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 1200)
    } catch {
      setCopiedField(null)
    }
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
      router.refresh()
    } catch {
      window.alert('Unable to delete card. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <section className="mx-auto w-full max-w-5xl lg:grid lg:grid-cols-2 lg:gap-6">
        {cards.map((card, index) => {
          const id = String(card.id ?? 'N/A')
          return (
            <button
              key={id}
              type="button"
              className={cn('block w-full text-left', index > 0 && '-mt-42', 'lg:mt-0')}
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
          <DialogContent
            showCloseButton={false}
            className={cn(
              'max-h-[90dvh] w-[calc(100vw-2rem)] max-w-120 overflow-visible border-0 bg-transparent p-0 shadow-none',
              isMobile &&
                'top-auto bottom-0 left-0 right-0 w-full max-w-none translate-x-0 translate-y-0 rounded-none'
            )}
          >
            <DialogClose
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'icon' }),
                'absolute -top-12 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full border border-white/30 bg-background/80 backdrop-blur'
              )}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </DialogClose>
            <div className="max-h-[calc(90dvh-2rem)] overflow-y-auto px-4 pb-4 sm:px-0 sm:pb-0">
              <CardFace
                card={selectedCard}
                copiedField={copiedField}
                showCvv={showCvv}
                showFullNumber={showFullNumber}
                expiryAlignStart
                className="rounded-b-none"
                onCopyNumber={() => copyText('number', String(selectedCard.number ?? '').replace(/\D/g, ''))}
                onToggleNumberVisibility={() => setShowFullNumber((prev) => !prev)}
                onCopyExpiry={() =>
                  copyText('expiry', formatExpiry(selectedCard.expiry_month, selectedCard.expiry_year))
                }
              />

              <div className="-mt-px rounded-b-xl border border-t-0 border-slate-500/80 bg-transparent p-3 backdrop-blur-md dark:border-white/20">
                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCvv((prev) => !prev)}
                  >
                    {showCvv ? <EyeOff className="mr-0.5 sm:mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />}
                    {showCvv ? 'Hide CVV' : 'Show CVV'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/card/${selectedCard.id}`)}
                  >
                    <Pencil className="mr-0.5 sm:mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmDeleteOpen(true)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="mr-0.5 sm:mr-1 h-4 w-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
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
