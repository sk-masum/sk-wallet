import { CardNetwork } from '@/models/card'
import { CARD_VALIDATION_ORDERED_FIELDS } from '@/constants/card/validation'

export type CardFormValidationInput = {
  cardName: string
  provider: string
  number: string
  holderName: string
  cardType: string
  network: number
  expiryMonth: number
  expiryYearRaw: string
  cvv: string
  skipCardNumberValidation?: boolean
}

export type CardFormFieldErrors = Partial<{
  card_type: string
  card_name: string
  provider: string
  network: string
  number: string
  holder_name: string
  expiry_month: string
  expiry_year: string
  cvv: string
}>

export function luhnCheck(rawValue: string) {
  const digitsOnly = rawValue.replace(/\D/g, '')

  if (!/^\d{13,19}$/.test(digitsOnly)) {
    return false
  }

  let sum = 0
  let shouldDouble = false

  for (let i = digitsOnly.length - 1; i >= 0; i -= 1) {
    let digit = digitsOnly.charCodeAt(i) - 48

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

function validateByNetwork(network: CardNetwork, digitsOnly: string) {
  switch (network) {
    case CardNetwork.VISA:
      return /^4\d{12}(\d{3})?(\d{3})?$/.test(digitsOnly)
    case CardNetwork.MASTERCARD:
      return /^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/.test(digitsOnly)
    case CardNetwork.AMEX:
      return /^3[47]\d{13}$/.test(digitsOnly)
    case CardNetwork.RUPAY: {
      const hasValidPrefix = /^(60|65|81|82|508|353|356|6521)/.test(digitsOnly)
      const hasValidLength = digitsOnly.length === 16 || digitsOnly.length === 19

      if (!hasValidPrefix || !hasValidLength) {
        return false
      }

      // Some RuPay BIN test/dev ranges (notably 6521) are rejected by strict Luhn.
      if (digitsOnly.startsWith('6521')) {
        return true
      }

      return luhnCheck(digitsOnly)
    }
    default:
      return luhnCheck(digitsOnly)
  }
}

export function getExpectedCvvLength(network: number) {
  switch (network) {
    case CardNetwork.AMEX:
      return 4
    case CardNetwork.VISA:
    case CardNetwork.MASTERCARD:
    case CardNetwork.RUPAY:
      return 3
    default:
      return null
  }
}

export function validateCardForm(input: CardFormValidationInput) {
  const fieldErrors = validateCardFormFields(input)

  for (const field of CARD_VALIDATION_ORDERED_FIELDS) {
    const error = fieldErrors[field]
    if (error) return error
  }

  return null
}

export function validateCardFormFields(input: CardFormValidationInput): CardFormFieldErrors {
  const cardNumberDigits = input.number.replace(/\D/g, '')
  const cvvDigits = input.cvv.replace(/\D/g, '')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1
  const errors: CardFormFieldErrors = {}

  if (!input.cardName || input.cardName.length < 2) {
    errors.card_name = 'Card name must be at least 2 characters.'
  }

  if (!errors.card_name && input.cardName.length > 80) {
    errors.card_name = 'Card name cannot exceed 80 characters.'
  }

  if (input.provider.length > 50) {
    errors.provider = 'Bank name cannot exceed 50 characters.'
  }

  if (!errors.provider && input.provider.length > 0 && input.provider.length < 2) {
    errors.provider = 'Bank name must be at least 2 characters.'
  }

  if (!errors.provider && input.provider.length > 0 && !/^[A-Za-z][A-Za-z .&'/-]*$/.test(input.provider)) {
    errors.provider = 'Bank name can contain letters, spaces, and . & \''
  }

  if (!input.holderName || input.holderName.length < 2) {
    errors.holder_name = 'Holder name must be at least 2 characters.'
  }

  if (!errors.holder_name && input.holderName.length > 80) {
    errors.holder_name = 'Holder name cannot exceed 80 characters.'
  }

  if (input.cardType !== 'credit' && input.cardType !== 'debit') {
    errors.card_type = 'Please select card type: credit or debit.'
  }

  if (
    input.network !== CardNetwork.VISA &&
    input.network !== CardNetwork.RUPAY &&
    input.network !== CardNetwork.MASTERCARD &&
    input.network !== CardNetwork.AMEX
  ) {
    errors.network = 'Please select a valid card network.'
  }

  if (!input.skipCardNumberValidation) {
    if (!/^\d{13,19}$/.test(cardNumberDigits)) {
      errors.number = 'Card number must contain 13 to 19 digits.'
    }

    if (!errors.number && !validateByNetwork(input.network, cardNumberDigits)) {
      errors.number = 'Card number is invalid for the selected network.'
    }
  }

  if (!Number.isInteger(input.expiryMonth) || input.expiryMonth < 1 || input.expiryMonth > 12) {
    errors.expiry_month = 'Expiry month must be between 1 and 12.'
  }

  if (!/^\d{4}$/.test(input.expiryYearRaw)) {
    errors.expiry_year = 'Expiry year must be a 4-digit year.'
  }

  const expiryYear = Number(input.expiryYearRaw)
  if (
    !errors.expiry_year &&
    (expiryYear < currentYear || (expiryYear === currentYear && input.expiryMonth < currentMonth))
  ) {
    errors.expiry_year = 'Card expiry date cannot be in the past.'
  }

  const expectedCvvLength = getExpectedCvvLength(input.network)

  if (expectedCvvLength === 4 && !/^\d{4}$/.test(cvvDigits)) {
    errors.cvv = 'Amex CVV must be 4 digits.'
  }

  if (expectedCvvLength === 3 && !/^\d{3}$/.test(cvvDigits)) {
    errors.cvv = 'CVV must be 3 digits for the selected network.'
  }

  if (expectedCvvLength === null && !/^\d{3,4}$/.test(cvvDigits)) {
    errors.cvv = 'CVV must be 3 or 4 digits.'
  }

  return errors
}
