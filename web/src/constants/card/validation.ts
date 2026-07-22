import type { CardFormFieldErrors } from '@/utils/card/validation'

export const CARD_VALIDATION_ORDERED_FIELDS: Array<keyof CardFormFieldErrors> = [
  'card_type',
  'credit_limit',
  'status',
  'card_name',
  'tags',
  'provider',
  'network',
  'number',
  'holder_name',
  'expiry_month',
  'expiry_year',
  'billing_date',
  'payment_date',
  'cvv',
]
