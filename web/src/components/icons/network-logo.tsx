import { cn } from '@/lib/utils'
import type { NetworkLogoProps } from '@/models/icon'
import VisaIcon from './visa-icon';
import MastercardIcon from './mastercard-icon';
import AmexIcon from './amex-icon';
import RupayIcon from './rupay.icon';
import { CardNetwork } from '@/models/card';

export function NetworkLogo({ brand, className }: NetworkLogoProps) {
  switch (brand) {
    case CardNetwork.VISA:
      return <VisaIcon className={className} />
    case CardNetwork.RUPAY:
      return <RupayIcon className={className} />
    case CardNetwork.MASTERCARD:
      return <MastercardIcon className={className} />
    case CardNetwork.AMEX:
      return <AmexIcon className={className} />
    default:
      return (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-md font-semibold text-white',
            className
          )}
        >
          {brand}
        </span>
      )
  }
}
