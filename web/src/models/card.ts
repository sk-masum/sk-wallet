export interface WalletCard {
  id: string | number
  owner_id: string | null
  created_at: string | null
  updated_at?: string | null
  expiry_month: string | number | null
  expiry_year: string | number | null
  card_name: string | null
  color_name: string | null
  tags?: string[] | null
  provider: string | null
  provider_id?: string | number | null
  credit_limit?: string | number | null
  billing_date?: string | number | null
  payment_date?: string | number | null
  number: string | number | null
  cvv: string | null
  holder_name: string | null
  network: CardNetwork | string | number | null
  isCredit: boolean | null
  status?: CardStatus | null
}

export type CardStatus = 'active' | 'inactive' | 'blocked' | 'replaced'

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
    provider?: string
    tag?: string
    expiry?: string
    type?: string
    sort?: string
    group?: string
    credit_limit?: string
    credit_limit_min?: string
    credit_limit_max?: string
    billing_date?: string
    payment_date?: string
  }>
}
