import { CardNetwork, type WalletCard } from '@/models/card';
import {
  CARD_NETWORK_FILTER_OPTIONS,
  CARD_NETWORK_FORM_OPTIONS,
  CARD_NETWORKS_BY_CODE,
} from '@/constants/card/networks';

export { CARD_NETWORK_FILTER_OPTIONS, CARD_NETWORK_FORM_OPTIONS };

export function resolveNetworkLabel(network: WalletCard['network']) {
  const code = typeof network === 'number' ? network : Number(network);

  if (CARD_NETWORKS_BY_CODE.has(code)) {
    return CARD_NETWORKS_BY_CODE.get(code)?.label ?? 'VISA';
  }

  if (typeof network === 'string' && network.trim()) {
    return network.trim().toUpperCase();
  }

  return 'VISA';
}

export function resolveNetworkCode(network: WalletCard['network']) {
  const code = typeof network === 'number' ? network : Number(network);

  if (CARD_NETWORKS_BY_CODE.has(code)) {
    return code;
  }

  return CardNetwork.VISA;
}
