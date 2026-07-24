import { redirect } from 'next/navigation'

import { CardForm } from '@/components/card/card-form'
import { CardStatusForm } from '@/components/card/card-status-form'
import { withCardFormPage } from '@/components/card/with-card-form-page'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { isCardStatus } from '@/constants/card/status'
import { serverApiGet, serverApiPatch, serverApiPut } from '@/lib/api/server'
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
    tags,
    cardName,
    provider,
    creditLimitRaw,
    creditLimit,
    billingDateRaw,
    billingDate,
    paymentDateRaw,
    paymentDate,
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
    tags,
    provider,
    creditLimitRaw,
    billingDateRaw,
    paymentDateRaw,
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
    tags,
    card_name: cardName,
    provider: provider || null,
    credit_limit: cardType === 'credit' ? creditLimit : null,
    billing_date: Number.isInteger(billingDate) ? billingDate : null,
    payment_date: Number.isInteger(paymentDate) ? paymentDate : null,
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

async function updateCardStatus(formData: FormData) {
  'use server'

  const id = String(formData.get('id') ?? '').trim()
  const rawStatus = String(formData.get('status') ?? '').trim().toLowerCase()

  if (!id || !isCardStatus(rawStatus)) {
    redirect('/card?error=Invalid%20status%20request')
  }

  const { response, data: result } = await serverApiPatch<{ error?: string }>(`/api/card/${id}`, {
    status: rawStatus,
  })

  if (response.status === 401) {
    redirect(`/auth?next=/card/${id}`)
  }

  if (!response.ok) {
    redirect(`/card/${id}?error=${encodeURIComponent(result?.error || 'Failed to update status')}`)
  }

  redirect(`/card/${id}?success=${encodeURIComponent('Card status updated successfully.')}`)
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
  const rawStatus = String(card.status ?? '').trim().toLowerCase()
  const status = isCardStatus(rawStatus) ? rawStatus : 'active'

  return {
    pageTitle: 'Edit Card',
    cardTitle: 'Update Card',
    cardDescription: 'Edit your card details.',
    backHref: '/card',
    backButtonLabel: 'Back to cards',
    children: (
      <div className="space-y-4">
        <Card className="border-border/70 bg-card/90 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Card Status</CardTitle>
            <CardDescription>
              Change status independently. Use Replaced to archive old cards while keeping history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardStatusForm cardId={String(card.id)} initialStatus={status} action={updateCardStatus} />
          </CardContent>
        </Card>

        <CardForm
          action={updateCard}
          submitLabel="Update card"
          cardId={String(card.id)}
          initialValues={{
            cardType: isCredit ? 'credit' : 'debit',
            colorName: String(card.color_name ?? ''),
            tags: Array.isArray(card.tags) ? card.tags.join(', ') : '',
            cardName: String(card.card_name ?? ''),
            provider: String(card.provider ?? ''),
            creditLimit: card.credit_limit == null ? '' : String(card.credit_limit),
            billingDate: card.billing_date == null ? '' : String(card.billing_date),
            paymentDate: card.payment_date == null ? '' : String(card.payment_date),
            network: String(card.network ?? ''),
            number: String(card.number ?? ''),
            holderName: String(card.holder_name ?? ''),
            expiryMonth: String(card.expiry_month ?? ''),
            expiryYear: String(card.expiry_year ?? ''),
            cvv: String(card.cvv ?? ''),
          }}
        />
      </div>
    ),
  }
})
