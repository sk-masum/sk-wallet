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
  stackIndex?: number
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
  stackIndex,
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
  const isStackedCard = typeof stackIndex === 'number'
  const stackShadowClass = isStackedCard
    ? [
      'shadow-[0_8px_16px_-12px_rgba(9,18,48,0.42),0_3px_8px_-6px_rgba(6,12,32,0.3)]',
      'shadow-[0_10px_20px_-12px_rgba(9,18,48,0.5),0_5px_10px_-7px_rgba(6,12,32,0.36)]',
      'shadow-[0_12px_24px_-12px_rgba(9,18,48,0.56),0_6px_12px_-8px_rgba(6,12,32,0.4)]',
      'shadow-[0_14px_28px_-12px_rgba(9,18,48,0.62),0_8px_14px_-9px_rgba(6,12,32,0.46)]',
      'shadow-[0_16px_32px_-12px_rgba(9,18,48,0.68),0_10px_16px_-10px_rgba(6,12,32,0.52)]',
      'shadow-[0_18px_36px_-12px_rgba(9,18,48,0.74),0_12px_18px_-11px_rgba(6,12,32,0.58)]',
      'shadow-[0_20px_40px_-12px_rgba(9,18,48,0.8),0_14px_20px_-12px_rgba(6,12,32,0.64)]',
      'shadow-[0_22px_44px_-12px_rgba(9,18,48,0.86),0_16px_22px_-13px_rgba(6,12,32,0.7)]',
    ][Math.abs(stackIndex) % 8]
    : ''
  const stackBorderClass = isStackedCard
    ? [
      'border border-white/18',
      'border border-white/20',
      'border border-white/22',
      'border border-white/24',
      'border border-white/26',
      'border border-white/28',
      'border border-white/30',
      'border border-white/32',
    ][Math.abs(stackIndex) % 8]
    : ''

  return (
    <div
      className={cn(
        'relative flex min-h-56 w-full flex-col justify-between rounded-3xl px-3 pt-3 pb-5 text-slate-100 sm:px-5 sm:pt-2',
        isStackedCard ? 'transition-shadow duration-300 ease-out' : 'border-4 border-muted shadow-lg',
        stackShadowClass,
        stackBorderClass,
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
