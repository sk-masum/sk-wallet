'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import ChipIcon from '@/components/icons/chip-icon'
import { NetworkLogo } from '@/components/icons/network-logo'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Check, Copy, Eye, EyeOff, Pencil, Trash2, X } from 'lucide-react'
import type { WalletCard } from '@/models/card'
import { clientApiDelete } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { formatExpiry, maskCardNumber } from '@/utils/card/format'
import { resolveNetworkCode } from '@/utils/card/network'
import { getCardTheme } from '@/utils/card/theme'

type CardGridProps = {
  cards: WalletCard[]
}

type CardFaceProps = {
  card: WalletCard
  onCopyNumber?: () => void
  onToggleNumberVisibility?: () => void
  onCopyExpiry?: () => void
  copiedField?: 'number' | 'expiry' | null
  showCvv?: boolean
  showFullNumber?: boolean
  expiryAlignStart?: boolean
  className?: string
}

function CardFace({
  card,
  onCopyNumber,
  onToggleNumberVisibility,
  onCopyExpiry,
  copiedField = null,
  showCvv = false,
  showFullNumber = false,
  expiryAlignStart = false,
  className,
}: CardFaceProps) {
  const id = String(card.id ?? 'N/A')
  const name = card.card_name?.trim() || `Card #${id}`
  const holder = card.holder_name?.trim().toUpperCase() || 'CARD HOLDER'
  const numberDigits = String(card.number ?? '').replace(/\D/g, '')
  const maskedNumber = maskCardNumber(card.number ?? '')
  const fullNumber = numberDigits.replace(/(.{4})/g, '$1 ').trim()
  const number = showFullNumber ? fullNumber : maskedNumber
  const expiry = formatExpiry(card.expiry_month, card.expiry_year)
  const cvv = String(card.cvv ?? '').trim() || 'N/A'
  const networkCode = resolveNetworkCode(card.network)
  const theme = getCardTheme(id)

  return (
    <div
      className={cn(
        'relative flex min-h-56 flex-col justify-between rounded-xl p-5 pt-2 text-slate-100 shadow-lg w-full',
        theme.surface,
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className={cn('truncate text-md font-medium tracking-wide', theme.mutedText)}>{name}</div>
        <NetworkLogo brand={networkCode} className="h-12 w-auto shrink-0" />
      </div>

      <ChipIcon className="-ml-1.75 mb-4 mt-2 h-10 w-16 self-start" />

      {onCopyNumber ? (
        <div className="inline-flex w-fit items-center gap-2">
          <button
            type="button"
            onClick={onCopyNumber}
            className="group inline-flex items-center gap-2 rounded px-1 py-0.5 text-left"
            aria-label="Copy card number"
          >
            <span className="font-mono text-lg tracking-[0.18em]">{number}</span>
            {copiedField === 'number' ? (
              <Check className="h-4 w-4 text-green-300" />
            ) : (
              <Copy className="h-4 w-4 text-slate-200/90 opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </button>

          {onToggleNumberVisibility ? (
            <button
              type="button"
              onClick={onToggleNumberVisibility}
              className="inline-flex items-center justify-center rounded p-1 text-slate-100/90 hover:bg-white/10"
              aria-label={showFullNumber ? 'Hide full card number' : 'Show full card number'}
            >
              {showFullNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          ) : null}
        </div>
      ) : (
        <p className="font-mono text-lg tracking-[0.18em]">{number}</p>
      )}

      <div className="mt-6 flex items-end gap-3">
        <div className="min-w-0">
          <p className={cn('text-[10px] uppercase tracking-[0.2em]', theme.mutedText)}>Card Holder</p>
          <p className="mt-1 truncate text-sm leading-4 font-medium tracking-wide">{holder}</p>
        </div>

        {showCvv ? (
          <div className="flex flex-1 flex-col items-center justify-end text-center">
            <p className={cn('text-[10px] uppercase tracking-[0.2em]', theme.mutedText)}>CVV</p>
            <p className="mt-1 font-mono text-sm">{cvv}</p>
          </div>
        ) : null}

        <div
          className={cn(
            'ml-auto flex flex-col justify-end',
            expiryAlignStart ? 'items-start text-left' : 'items-end text-right'
          )}
        >
          <p className={cn('text-[10px] uppercase tracking-[0.2em]', theme.mutedText)}>Expires</p>
          {onCopyExpiry ? (
            <button
              type="button"
              onClick={onCopyExpiry}
              className={cn(
                'group mt-1 inline-flex items-center gap-2 rounded py-0.5',
                expiryAlignStart ? 'justify-start self-start' : 'justify-end self-end'
              )}
              aria-label="Copy expiry date"
            >
              <span className="font-mono text-sm leading-4">{expiry}</span>
              {copiedField === 'expiry' ? (
                <Check className="h-4 w-4 text-green-300" />
              ) : (
                <Copy className="h-4 w-4 text-slate-200/90 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </button>
          ) : (
            <p className="mt-1 font-mono text-sm leading-4">{expiry}</p>
          )}
        </div>
      </div>
    </div>
  )
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
