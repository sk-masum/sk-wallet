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
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card) => {
          const id = String(card.id ?? 'N/A')
          return (
            <button
              key={id}
              type="button"
              className="w-full text-left"
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
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCvv((prev) => !prev)}
                  >
                    {showCvv ? <EyeOff className="mr-1 h-4 w-4" /> : <Eye className="mr-1 h-4 w-4" />}
                    {showCvv ? 'Hide CVV' : 'Show CVV'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/card/${selectedCard.id}`)}
                  >
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmDeleteOpen(true)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>

      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-sm p-5">
          <div className="space-y-3">
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
