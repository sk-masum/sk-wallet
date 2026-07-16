import { redirect } from 'next/navigation'

import { CardForm } from '@/components/card/card-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'
import { serverApiPost } from '@/lib/api/server'
import { CardNetwork } from '@/models/card'

type NewCardPageProps = {
  searchParams?: Promise<{
    error?: string
  }>
}

function luhnCheck(rawValue: string) {
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

function validateCardForm(input: {
  cardName: string
  provider: string
  number: string
  holderName: string
  cardType: string
  network: number
  expiryMonth: number
  expiryYearRaw: string
  cvv: string
}) {
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

  if (!/^\d{13,19}$/.test(cardNumberDigits)) {
    return 'Card number must contain 13 to 19 digits.'
  }

  if (!luhnCheck(cardNumberDigits)) {
    return 'Card number is invalid.'
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

async function createCard(formData: FormData) {
  'use server'

  const cardName = String(formData.get('card_name') ?? '').trim()
  const provider = String(formData.get('provider') ?? '').trim()
  const number = String(formData.get('number') ?? '').trim()
  const normalizedNumber = number.replace(/\s+/g, '')
  const holderName = String(formData.get('holder_name') ?? '').trim()
  const cardType = String(formData.get('card_type') ?? '').trim().toLowerCase()
  const network = Number(formData.get('network'))
  const expiryMonth = Number(formData.get('expiry_month'))
  const expiryYearRaw = String(formData.get('expiry_year') ?? '').trim()
  const cvv = String(formData.get('cvv') ?? '').trim()

  const validationError = validateCardForm({
    cardName,
    provider,
    number: normalizedNumber,
    holderName,
    cardType,
    network,
    expiryMonth,
    expiryYearRaw,
    cvv,
  })

  if (validationError) {
    redirect(`/card/new?error=${encodeURIComponent(validationError)}`)
  }

  const normalizedExpiryMonth =
    Number.isInteger(expiryMonth) && expiryMonth >= 1 && expiryMonth <= 12
      ? expiryMonth
      : null

  const normalizedCardNumber = normalizedNumber.replace(/\D/g, '')
  const normalizedCvv = cvv.replace(/\D/g, '')
  const isCredit = cardType === 'credit'

  const { response, data: result } = await serverApiPost<{ error?: string }>('/api/card', {
      card_name: cardName,
      provider: provider || null,
      number: normalizedCardNumber,
      holder_name: holderName,
      expiry_month: normalizedExpiryMonth,
      expiry_year: Number(expiryYearRaw),
      cvv: normalizedCvv,
      network,
      isCredit,
  })

  if (response.status === 401) {
    redirect('/auth?next=/card/new')
  }

  if (!response.ok) {
    redirect(`/card/new?error=${encodeURIComponent(result?.error || 'Failed to create card')}`)
  }

  redirect('/card')
}

export default async function NewCardPage({ searchParams }: NewCardPageProps) {
  const params = searchParams ? await searchParams : {}
  const errorMessage = params.error ? decodeURIComponent(params.error) : ''

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Add Card"
        showBackButton
        backHref="/card"
        backButtonLabel="Back to cards"
      />

      <Card>
        <CardHeader>
          <CardTitle>Card Details</CardTitle>
          <CardDescription>Fill the form below to create a new card.</CardDescription>
          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
        </CardHeader>
        <CardContent>
          <CardForm action={createCard} submitLabel="Submit" showReset />
        </CardContent>
      </Card>
    </main>
  )
}
