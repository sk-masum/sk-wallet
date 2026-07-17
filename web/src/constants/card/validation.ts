import type { CardFormFieldErrors } from '@/utils/card/validation'

export const CARD_VALIDATION_ORDERED_FIELDS: Array<keyof CardFormFieldErrors> = [
  'card_type',
  'card_name',
  'provider',
  'network',
  'number',
  'holder_name',
  'expiry_month',
  'expiry_year',
  'cvv',
]
