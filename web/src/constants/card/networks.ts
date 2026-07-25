import { CardNetwork } from '@/models/card';

export type NetworkMeta = {
  code: CardNetwork;
  label: string;
  formLabel: string;
};

export const CARD_NETWORKS: NetworkMeta[] = [
  { code: CardNetwork.VISA, label: 'VISA', formLabel: 'Visa' },
  { code: CardNetwork.RUPAY, label: 'RUPAY', formLabel: 'RuPay' },
  { code: CardNetwork.MASTERCARD, label: 'MASTERCARD', formLabel: 'Mastercard' },
  { code: CardNetwork.AMEX, label: 'AMEX', formLabel: 'Amex' },
];

export const CARD_NETWORKS_BY_CODE = new Map(
  CARD_NETWORKS.map((network) => [network.code, network]),
);

export const CARD_NETWORK_FORM_OPTIONS = CARD_NETWORKS.map((network) => ({
  label: network.formLabel,
  value: String(network.code),
}));

export const CARD_NETWORK_FILTER_OPTIONS = CARD_NETWORKS.map((network) => network.label);
