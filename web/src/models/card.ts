export interface WalletCard {
  id: string | number
  owner_id: string | null
  created_at: string | null
  expiry_month: string | number | null
  expiry_year: string | number | null
  card_name: string | null
  color_name: string | null
  provider: string | null
  number: string | number | null
  cvv: string | null
  holder_name: string | null
  network: CardNetwork | string | number | null
  isCredit: boolean | null
}

export type CardTheme = {
  colorName: string
  surface: string
  border: string
  mutedText: string
}

export enum CardNetwork {
  VISA = 1,
  RUPAY = 2,
  MASTERCARD = 3,
  AMEX = 4,
}

export interface CardPageProps {
  searchParams?: Promise<{
    q?: string
    network?: string
    type?: string
  }>
}
