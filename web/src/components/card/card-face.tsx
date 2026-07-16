import { Check, Copy, Eye, EyeOff } from 'lucide-react'

import ChipIcon from '@/components/icons/chip-icon'
import { NetworkLogo } from '@/components/icons/network-logo'
import { cn } from '@/lib/utils'
import type { WalletCard } from '@/models/card'
import { formatExpiry, maskCardNumber } from '@/utils/card/format'
import { resolveNetworkCode } from '@/utils/card/network'
import { getCardTheme } from '@/utils/card/theme'

export type CardFaceProps = {
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

export function CardFace({
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
        'relative flex min-h-56 flex-col justify-between rounded-xl p-3 sm:p-5 pt-2 text-slate-100 shadow-lg w-full',
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
        <div className="inline-flex justify-between w-full sm:w-fit items-center gap-0 sm:gap-2">
          <button
            type="button"
            onClick={onCopyNumber}
            className="group inline-flex items-center gap-0 sm:gap-2 rounded px-1 py-0.5 text-left"
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
