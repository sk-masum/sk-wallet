import { redirect } from 'next/navigation';

import { CardForm } from '@/components/card/card-form';
import { withCardFormPage } from '@/hoc/with-card-form-page';
import { serverApiPost } from '@/lib/api/server';
import { getAuthenticatedUser } from '@/lib/auth/server';
import { parseCardFormData } from '@/utils/card/form-data';
import { validateCardForm } from '@/utils/card/validation';

type NewCardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function createCard(formData: FormData) {
  'use server';

  console.log('\n=== Card Form Submission ===');

  const user = await getAuthenticatedUser();
  console.log('Authenticated user:', user ? `${user.email} (${user.id})` : 'NOT AUTHENTICATED');
  
  if (!user) {
    console.log('Redirecting to auth because no user found');
    redirect('/auth?next=/card/new');
  }

  const {
    colorName,
    status,
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
  } = parseCardFormData(formData);

  console.log('Form data parsed successfully');

  const validationError = validateCardForm({
    cardName,
    status,
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
  });

  if (validationError) {
    console.log('Validation failed:', validationError);
    redirect(`/card/new?error=${encodeURIComponent(validationError)}`);
  }

  console.log('Validation passed');

  const normalizedExpiryMonth =
    Number.isInteger(expiryMonth) && expiryMonth >= 1 && expiryMonth <= 12 ? expiryMonth : null;

  const normalizedCardNumber = normalizedNumber.replace(/\D/g, '');
  const normalizedCvv = cvv.replace(/\D/g, '');
  const isCredit = cardType === 'credit';

  const payload = {
    color_name: colorName,
    status,
    tags,
    card_name: cardName,
    provider: provider || null,
    credit_limit: isCredit ? creditLimit : null,
    billing_date: Number.isInteger(billingDate) ? billingDate : null,
    payment_date: Number.isInteger(paymentDate) ? paymentDate : null,
    number: normalizedCardNumber,
    holder_name: holderName,
    expiry_month: normalizedExpiryMonth,
    expiry_year: Number(expiryYearRaw),
    cvv: normalizedCvv,
    network,
    isCredit,
  };

  console.log('Sending to API:', JSON.stringify(payload, null, 2));

  const { response, data: result } = await serverApiPost<{ error?: string }>('/api/card', payload);

  console.log('API Response - Status:', response.status);
  console.log('API Response - Data:', result);

  if (response.status === 401) {
    console.log('Got 401, redirecting to auth');
    redirect('/auth?next=/card/new');
  }

  if (!response.ok) {
    const errorMsg = result?.error || 'Failed to create card';
    console.log('API Error:', errorMsg);
    redirect(`/card/new?error=${encodeURIComponent(errorMsg)}`);
  }

  console.log('Card created successfully, redirecting to /card');
  redirect(`/card?success=${encodeURIComponent('Card created successfully.')}`);
}

export default withCardFormPage<NewCardPageProps>(async function NewCardPage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/auth?next=/card/new');
  }

  return {
    pageTitle: 'Add Card',
    cardTitle: 'Card Details',
    cardDescription: 'Fill the form below to create a new card.',
    backHref: '/card',
    backButtonLabel: 'Back to cards',
    children: <CardForm action={createCard} submitLabel='Submit' showReset />,
  };
});
