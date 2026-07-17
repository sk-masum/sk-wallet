import { redirect } from 'next/navigation'

import { CardForm } from '@/components/card/card-form'
import { withCardFormPage } from '@/components/card/with-card-form-page'
import { serverApiGet, serverApiPut } from '@/lib/api/server'
import { parseCardFormDataWithId } from '@/utils/card/form-data'
import { validateCardForm } from '@/utils/card/validation'

type EditCardPageProps = {
  params: Promise<{ id: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

async function updateCard(formData: FormData) {
  'use server'

  const {
    id,
    colorName,
    cardName,
    provider,
    normalizedNumber,
    holderName,
    cardType,
    network,
    expiryMonth,
    expiryYearRaw,
    cvv,
  } = parseCardFormDataWithId(formData)

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
      color_name: colorName,
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

  redirect(`/card?success=${encodeURIComponent('Card updated successfully.')}`)
}

export default withCardFormPage<EditCardPageProps>(async function EditCardPage({ params }) {
  const { id } = await params

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

  return {
    pageTitle: 'Edit Card',
    cardTitle: 'Update Card',
    cardDescription: 'Edit your card details.',
    backHref: '/card',
    backButtonLabel: 'Back to cards',
    children: (
      <CardForm
        action={updateCard}
        submitLabel="Update card"
        cardId={String(card.id)}
        initialValues={{
          cardType: isCredit ? 'credit' : 'debit',
          colorName: String(card.color_name ?? ''),
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
    ),
  }
})
