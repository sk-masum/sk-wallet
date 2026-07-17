import { redirect } from 'next/navigation'

import { CardForm } from '@/components/card/card-form'
import { withCardFormPage } from '@/components/card/with-card-form-page'
import { serverApiPost } from '@/lib/api/server'
import { parseCardFormData } from '@/utils/card/form-data'
import { validateCardForm } from '@/utils/card/validation'

type NewCardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

async function createCard(formData: FormData) {
  'use server'

  const { colorName, cardName, provider, normalizedNumber, holderName, cardType, network, expiryMonth, expiryYearRaw, cvv } =
    parseCardFormData(formData)

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
      color_name: colorName,
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

  redirect(`/card?success=${encodeURIComponent('Card created successfully.')}`)
}

export default withCardFormPage<NewCardPageProps>(async function NewCardPage() {
  return {
    pageTitle: 'Add Card',
    cardTitle: 'Card Details',
    cardDescription: 'Fill the form below to create a new card.',
    backHref: '/card',
    backButtonLabel: 'Back to cards',
    children: <CardForm action={createCard} submitLabel="Submit" showReset />,
  }
})
