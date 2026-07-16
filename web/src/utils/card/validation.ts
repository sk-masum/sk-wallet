import { CardNetwork } from '@/models/card'

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

export function validateCardForm(input: CardFormValidationInput) {
  const cardNumberDigits = input.number.replace(/\D/g, '')
  const cvvDigits = input.cvv.replace(/\D/g, '')
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  if (!input.cardName || input.cardName.length < 2) {
    return 'Card name must be at least 2 characters.'
  }

  if (input.cardName.length > 80) {
    return 'Card name cannot exceed 80 characters.'
  }

  if (input.provider.length > 50) {
    return 'Provider cannot exceed 50 characters.'
  }

  if (!input.holderName || input.holderName.length < 2) {
    return 'Holder name must be at least 2 characters.'
  }

  if (input.holderName.length > 80) {
    return 'Holder name cannot exceed 80 characters.'
  }

  if (input.cardType !== 'credit' && input.cardType !== 'debit') {
    return 'Please select card type: credit or debit.'
  }

  if (
    input.network !== CardNetwork.VISA &&
    input.network !== CardNetwork.RUPAY &&
    input.network !== CardNetwork.MASTERCARD &&
    input.network !== CardNetwork.AMEX
  ) {
    return 'Please select a valid card network.'
  }

  if (!input.skipCardNumberValidation) {
    if (!/^\d{13,19}$/.test(cardNumberDigits)) {
      return 'Card number must contain 13 to 19 digits.'
    }

    if (!luhnCheck(cardNumberDigits)) {
      return 'Card number is invalid.'
    }
  }

  if (!Number.isInteger(input.expiryMonth) || input.expiryMonth < 1 || input.expiryMonth > 12) {
    return 'Expiry month must be between 1 and 12.'
  }

  if (!/^\d{4}$/.test(input.expiryYearRaw)) {
    return 'Expiry year must be a 4-digit year.'
  }

  const expiryYear = Number(input.expiryYearRaw)
  if (expiryYear < currentYear || (expiryYear === currentYear && input.expiryMonth < currentMonth)) {
    return 'Card expiry date cannot be in the past.'
  }

  if (!/^\d{3,4}$/.test(cvvDigits)) {
    return 'CVV must be 3 or 4 digits.'
  }

  return null
}
