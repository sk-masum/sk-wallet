import { CardNetwork, type WalletCard } from '@/models/card'

export function resolveNetworkLabel(network: WalletCard['network']) {
  const code = typeof network === 'number' ? network : Number(network)

  switch (code) {
    case CardNetwork.VISA:
      return 'VISA'
    case CardNetwork.RUPAY:
      return 'RUPAY'
    case CardNetwork.MASTERCARD:
      return 'MASTERCARD'
    case CardNetwork.AMEX:
      return 'AMEX'
    default:
      if (typeof network === 'string' && network.trim()) {
        return network.trim().toUpperCase()
      }
      return 'VISA'
  }
}

export function resolveNetworkCode(network: WalletCard['network']) {
  const code = typeof network === 'number' ? network : Number(network)

  switch (code) {
    case CardNetwork.VISA:
    case CardNetwork.RUPAY:
    case CardNetwork.MASTERCARD:
    case CardNetwork.AMEX:
      return code
    default:
      return CardNetwork.VISA
  }
}
