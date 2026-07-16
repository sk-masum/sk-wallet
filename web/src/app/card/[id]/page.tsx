import { redirect } from 'next/navigation'

import { CardForm } from '@/components/card/card-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'
import { serverApiGet, serverApiPut } from '@/lib/api/server'
import { CardNetwork } from '@/models/card'

type EditCardPageProps = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ error?: string }>
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
  skipCardNumberValidation?: boolean
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

async function updateCard(formData: FormData) {
  'use server'

  const id = String(formData.get('id') ?? '').trim()
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

  if (!id) {
    redirect('/card?error=Invalid%20request')
  }

  const { response: existingCardResponse, data: existingCardJson } = await serverApiGet<{
    data?: { number?: string | number | null }
  }>(`/api/card/${id}`)

  if (existingCardResponse.status === 401) {
    redirect(`/auth?next=/card/${id}`)
  }

  if (!existingCardResponse.ok) {
    redirect(`/card/${id}?error=${encodeURIComponent('Card not found.')}`)
  }

  const existingCard = existingCardJson?.data

  if (!existingCard) {
    redirect(`/card/${id}?error=${encodeURIComponent('Card not found.')}`)
  }

  const submittedDigits = normalizedNumber.replace(/\D/g, '')
  const existingDigits = String(existingCard.number ?? '').replace(/\D/g, '')
  const skipCardNumberValidation = submittedDigits === existingDigits

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
    skipCardNumberValidation,
  })

  if (validationError) {
    redirect(`/card/${id}?error=${encodeURIComponent(validationError)}`)
  }

  const { response, data: result } = await serverApiPut<{ error?: string }>(`/api/card/${id}`, {
      card_name: cardName,
      provider: provider || null,
      number: normalizedNumber.replace(/\D/g, ''),
      holder_name: holderName,
      expiry_month: expiryMonth,
      expiry_year: Number(expiryYearRaw),
      cvv: cvv.replace(/\D/g, ''),
      network,
      isCredit: cardType === 'credit',
  })

  if (response.status === 401) {
    redirect(`/auth?next=/card/${id}`)
  }

  if (!response.ok) {
    redirect(`/card/${id}?error=${encodeURIComponent(result?.error || 'Failed to update card')}`)
  }

  redirect('/card')
}

export default async function EditCardPage({ params, searchParams }: EditCardPageProps) {
  const { id } = await params
  const sp = searchParams ? await searchParams : {}
  const errorMessage = sp.error ? decodeURIComponent(sp.error) : ''

  const { response, data: result } = await serverApiGet<{ data?: any }>(`/api/card/${id}`)

  if (response.status === 401) {
    redirect(`/auth?next=/card/${id}`)
  }

  if (!response.ok) {
    redirect('/card')
  }

  const card = result?.data

  if (!card) {
    redirect('/card')
  }

  const isCredit = Boolean(card.isCredit)

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Edit Card"
        showBackButton
        backHref="/card"
        backButtonLabel="Back to cards"
      />

      <Card>
        <CardHeader>
          <CardTitle>Update Card</CardTitle>
          <CardDescription>Edit your card details.</CardDescription>
          {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        </CardHeader>
        <CardContent>
          <CardForm
            action={updateCard}
            submitLabel="Update card"
            cardId={String(card.id)}
            initialValues={{
              cardType: isCredit ? 'credit' : 'debit',
              cardName: String(card.card_name ?? ''),
              provider: String(card.provider ?? ''),
              network: String(card.network ?? ''),
              number: String(card.number ?? ''),
              holderName: String(card.holder_name ?? ''),
              expiryMonth: String(card.expiry_month ?? ''),
              expiryYear: String(card.expiry_year ?? ''),
              cvv: String(card.cvv ?? ''),
            }}
          />
        </CardContent>
      </Card>
    </main>
  )
}
