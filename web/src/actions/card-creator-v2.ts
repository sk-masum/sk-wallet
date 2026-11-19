'use server';

import { redirect } from 'next/navigation';
import { serverApiPost } from '@/lib/api/server';
import { getAuthenticatedUser } from '@/lib/auth/server';
import type { CardCreatorV2State } from '@/hooks/use-card-creator-v2';

/**
 * Server action to handle card creation from the interactive form
 */
export async function createCardV2(formData: CardCreatorV2State) {
  console.log('\n=== Card Creator V2 Submission ===');

  const user = await getAuthenticatedUser();
  console.log('Authenticated user:', user ? `${user.email} (${user.id})` : 'NOT AUTHENTICATED');

  if (!user) {
    console.log('Redirecting to auth because no user found');
    redirect('/auth?next=/card/new/v2');
  }

  try {
    // Validate required fields
    if (!formData.cardNumber || !formData.cardNumber.trim()) {
      console.log('Validation failed: Missing card number');
      redirect(`/card/new/v2?error=${encodeURIComponent('Card number is required')}`);
    }

    if (!formData.cardName || !formData.cardName.trim()) {
      console.log('Validation failed: Missing card name');
      redirect(`/card/new/v2?error=${encodeURIComponent('Card name is required')}`);
    }

    if (!formData.expiryMonth || formData.expiryMonth < 1 || formData.expiryMonth > 12) {
      console.log('Validation failed: Invalid expiry month');
      redirect(`/card/new/v2?error=${encodeURIComponent('Valid expiry month is required')}`);
    }

    if (!formData.expiryYear || formData.expiryYear < new Date().getFullYear()) {
      console.log('Validation failed: Invalid expiry year');
      redirect(`/card/new/v2?error=${encodeURIComponent('Valid expiry year is required')}`);
    }

    if (!formData.cvv || !formData.cvv.trim()) {
      console.log('Validation failed: Missing CVV');
      redirect(`/card/new/v2?error=${encodeURIComponent('CVV is required')}`);
    }

    console.log('All validations passed, creating card...');

    // Create payload
    const payload = {
      number: formData.cardNumber.replace(/\D/g, ''),
      network: formData.network,
      expiry_month: formData.expiryMonth,
      expiry_year: formData.expiryYear,
      cvv: formData.cvv.replace(/\D/g, ''),
      holder_name: formData.holderName || 'CARDHOLDER',
      card_name: formData.cardName,
      color_name: formData.colorName,
      provider: formData.provider || null,
      credit_limit: formData.creditLimit || null,
      billing_date: formData.billingDate || null,
      payment_date: formData.paymentDate || null,
      isCredit: formData.isCredit || false,
    };

    console.log('Payload:', {
      ...payload,
      cvv: '***',
      number: `****${payload.number.slice(-4)}`,
    });

    // Call API to create card
    const result = await serverApiPost('/api/card', payload);

    console.log('Card created successfully:', result?.data?.id);

    if (result?.data?.id) {
      redirect(`/card?success=Card created successfully`);
    } else {
      throw new Error('No card ID returned from API');
    }
  } catch (error) {
    console.error('Card creation error:', error);

    // Check if it's a 401 (auth) error
    if (error instanceof Error && error.message.includes('401')) {
      redirect('/auth?next=/card/new/v2');
    }

    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Error message:', errorMsg);

    redirect(
      `/card/new/v2?error=${encodeURIComponent('An error occurred while creating the card. Please try again.')}`
    );
  }
}
