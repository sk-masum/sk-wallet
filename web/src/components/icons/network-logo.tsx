import { cn } from '@/lib/utils'
import type { NetworkLogoProps } from '@/models/icon'
import VisaIcon from './visa-icon';
import MastercardIcon from './mastercard-icon';
import AmexIcon from './amex-icon';
import RupayIcon from './rupay.icon';
import { CardNetwork } from '@/models/card';

export function NetworkLogo({ brand, className }: NetworkLogoProps) {
  const tonedClassName = cn('text-slate-100/95', className)

  switch (brand) {
    case CardNetwork.VISA:
      return <VisaIcon className={tonedClassName} />
    case CardNetwork.RUPAY:
      return <RupayIcon className={tonedClassName} />
    case CardNetwork.MASTERCARD:
      return <MastercardIcon className={tonedClassName} />
    case CardNetwork.AMEX:
      return <AmexIcon className={tonedClassName} />
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-md font-semibold text-slate-100/95',
            tonedClassName
          )}
        >
          {brand}
        </span>
      )
  }
}
