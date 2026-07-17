import { describe, expect, it } from 'vitest'

import { CardNetwork } from '@/models/card'
import { validateCardForm } from '@/utils/card/validation'

function buildInput(overrides: Partial<Parameters<typeof validateCardForm>[0]> = {}) {
  return {
    cardName: 'Primary Card',
    provider: 'Bank',
    number: '4111111111111111',
    holderName: 'JOHN DOE',
    cardType: 'credit',
    network: CardNetwork.VISA,
    expiryMonth: 12,
    expiryYearRaw: '2099',
    cvv: '123',
    ...overrides,
  }
}

describe('validateCardForm', () => {
  it('accepts RuPay card numbers starting with 6521', () => {
    const error = validateCardForm(
      buildInput({
        network: CardNetwork.RUPAY,
        number: '6521 1234 5678 9012',
      })
    )

    expect(error).toBeNull()
  })

  it('rejects RuPay card numbers with invalid prefix', () => {
    const error = validateCardForm(
      buildInput({
        network: CardNetwork.RUPAY,
        number: '9911 1234 5678 9012',
      })
    )

    expect(error).toBe('Card number is invalid for the selected network.')
  })

  it('rejects Visa numbers that do not match Visa pattern', () => {
    const error = validateCardForm(
      buildInput({
        network: CardNetwork.VISA,
        number: '5111 1111 1111 1111',
      })
    )

    expect(error).toBe('Card number is invalid for the selected network.')
  })

  it('accepts valid Visa number', () => {
    const error = validateCardForm(
      buildInput({
        network: CardNetwork.VISA,
        number: '4111 1111 1111 1111',
      })
    )

    expect(error).toBeNull()
  })
})