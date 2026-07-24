import { Eye, EyeOff } from 'lucide-react'

import ChipIcon from '@/components/icons/chip-icon'
import { NetworkLogo } from '@/components/icons/network-logo'
import { CopyButton } from '@/components/ui/copy-button'
import { cn } from '@/lib/utils'
import type { WalletCard } from '@/models/card'
import { formatExpiry, maskCardNumber } from '@/utils/card/format'
import { resolveNetworkCode } from '@/utils/card/network'
import { getCardTheme, getCardThemeByColorName, parseCardAppearance } from '@/utils/card/theme'
import { getCardPatternByKey } from '@/constants/card/patterns'

export type CardFaceProps = {
  card: WalletCard
  allowCopyNumber?: boolean
  allowCopyExpiry?: boolean
  allowCopyCvv?: boolean
  showCreditLimit?: boolean
  showCardNumber?: boolean
  expiryAlignStart?: boolean
  className?: string
}

export function CardFace({
  card,
  allowCopyNumber = false,
  allowCopyExpiry = false,
  allowCopyCvv = false,
  showCreditLimit = false,
  showCardNumber = false,
  expiryAlignStart = false,
  className,
}: CardFaceProps) {
  const id = String(card.id ?? 'N/A')
  const name = card.card_name?.trim() || `Card #${id}`
  const holder = card.holder_name?.trim().toUpperCase() || 'CARD HOLDER'
  const numberDigits = String(card.number ?? '').replace(/\D/g, '')
  const maskedNumber = maskCardNumber(card.number ?? '')
  const fullNumber = numberDigits.replace(/(.{4})/g, '$1 ').trim()
  const number = showCardNumber ? fullNumber : maskedNumber
  const expiry = formatExpiry(card.expiry_month, card.expiry_year)
  const cvv = String(card.cvv ?? '').trim() || 'N/A'
  const creditLimitValue = Number(card.credit_limit)
  const creditLimit = Number.isFinite(creditLimitValue) && creditLimitValue > 0
    ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(creditLimitValue)
    : 'No limit'
  const networkCode = resolveNetworkCode(card.network)
  const colorName = card.color_name?.trim() ?? ''
  const theme = colorName ? getCardThemeByColorName(colorName) : getCardTheme(id)
  const patternKey = parseCardAppearance(colorName).patternKey
  const pattern = getCardPatternByKey(patternKey)
  const status = String(card.status ?? '').trim().toLowerCase()
  const statusLabel =
    status === 'blocked' ? 'Blocked' : status === 'replaced' ? 'Replaced' : null

  return (
    <div
      className={cn(
        'relative flex min-h-56 flex-col justify-between rounded-3xl border-4 px-3 pt-3 pb-5 text-slate-100 shadow-lg sm:px-5 sm:pt-2 w-full border-muted',
        theme.surface,
        className
      )}
    >
      {pattern.overlayClassName ? (
        <div className={cn('pointer-events-none absolute inset-0 rounded-3xl opacity-75', pattern.overlayClassName)} />
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <div className={cn('truncate text-md font-medium tracking-wide', theme.mutedText)}>{name}</div>
          {statusLabel ? (
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase backdrop-blur-sm',
                status === 'blocked'
                  ? 'border-amber-200/65 bg-amber-400/20 text-amber-100'
                  : 'border-rose-200/65 bg-rose-500/20 text-rose-100'
              )}
            >
              {statusLabel}
            </span>
          ) : null}
        </div>
        <NetworkLogo brand={networkCode} className="h-12 w-auto shrink-0" />
      </div>

      <ChipIcon className="-ml-1.75 mb-4 mt-2 h-10 w-16 self-start" />

      {showCreditLimit && card.isCredit ? (
        <p className={cn('mb-2 text-[11px] tracking-[0.08em] uppercase', theme.mutedText)}>
          Limit: {creditLimit}
        </p>
      ) : null}

      {allowCopyNumber ? (
        <div className="inline-flex justify-between w-full sm:w-fit items-center gap-0 sm:gap-2">
          <CopyButton
            value={numberDigits}
            label="Card number"
            className="group inline-flex items-center gap-0 sm:gap-2 rounded px-1 py-0.5 text-left"
            showStatusIcon
            copyIconClassName="text-slate-200/90 opacity-0 transition-opacity group-hover:opacity-100"
            checkIconClassName="text-green-300"
          >
            <span className="font-mono text-lg tracking-[0.18em]">{number}</span>
          </CopyButton>
        </div>
      ) : (
        <p className="font-mono text-lg tracking-[0.18em]">{number}</p>
      )}

      <div className="mt-6 flex items-end gap-3">
        <div className={cn('min-w-0', expiryAlignStart ? 'flex-1 text-left' : '')}>
          <p className={cn('text-[10px] uppercase tracking-[0.2em]', theme.mutedText)}>Card Holder</p>
          <p className="mt-1 flex h-5 items-center truncate text-sm leading-4 font-medium tracking-wide">{holder}</p>
        </div>

        {showCardNumber ? (
          <div
            className={cn(
              'flex flex-1 flex-col justify-end',
              expiryAlignStart ? 'items-start text-left' : 'items-center text-center'
            )}
          >
            <p className={cn('text-[10px] uppercase tracking-[0.2em]', theme.mutedText)}>CVV</p>
            {allowCopyCvv ? (
              <CopyButton
                value={cvv}
                label="CVV"
                className={cn(
                  'group mt-1 inline-flex items-center gap-2 rounded py-0.5',
                  expiryAlignStart ? 'justify-start self-start' : 'justify-center'
                )}
                showStatusIcon
                copyIconClassName="text-slate-200/90 opacity-0 transition-opacity group-hover:opacity-100"
                checkIconClassName="text-green-300"
              >
                <span className="font-mono text-sm leading-4">{cvv}</span>
              </CopyButton>
            ) : (
              <p className="mt-1 font-mono text-sm leading-4">{cvv}</p>
            )}
          </div>
        ) : null}

        <div
          className={cn(
            'flex flex-col justify-end',
            expiryAlignStart ? 'items-start text-left' : 'ml-auto items-end text-right'
          )}
        >
          <p className={cn('text-[10px] uppercase tracking-[0.2em]', theme.mutedText)}>Expires</p>
          {allowCopyExpiry ? (
            <CopyButton
              value={expiry}
              label="Expiry date"
              className={cn(
                'group mt-1 inline-flex items-center gap-2 rounded py-0.5',
                expiryAlignStart ? 'justify-start self-start' : 'justify-end self-end'
              )}
              showStatusIcon
              copyIconClassName="text-slate-200/90 opacity-0 transition-opacity group-hover:opacity-100"
              checkIconClassName="text-green-300"
            >
              <span className="font-mono text-sm leading-4">{expiry}</span>
            </CopyButton>
          ) : (
            <p className="mt-1 font-mono text-sm leading-4">{expiry}</p>
          )}
        </div>
      </div>
    </div>
  )
}
