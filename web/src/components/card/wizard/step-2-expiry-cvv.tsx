'use client';

import { useMemo } from 'react';
import { CardNetwork } from '@/models/card';
import { CvvOtpInput } from '@/components/card/cvv-otp-input';
import { FormField } from '@/components/ui/form-field';
import { AppSelectField, type AppSelectOption } from '@/components/shared/app-select-field';
import { MONTH_OPTIONS } from '@/constants/card/month-options';
import { getExpectedCvvLength, type CardFormFieldErrors } from '@/utils/card/validation';
import type { CardFormData } from '@/hooks/use-card-wizard';

export type Step2ExpiryProps = {
  formData: CardFormData;
  network: number;
  errors: CardFormFieldErrors;
  onFieldChange: (field: keyof CardFormData, value: string | number) => void;
};

function generateYearOptions(): AppSelectOption[] {
  const currentYear = new Date().getFullYear();
  const years: AppSelectOption[] = [];

  for (let i = 0; i <= 15; i++) {
    const year = currentYear + i;
    years.push({
      value: String(year),
      label: String(year),
    });
  }

  return years;
}

function getNetworkCvvHint(network: number): string {
  const expectedLength = getExpectedCvvLength(network);

  if (expectedLength === 4) {
    return 'Amex: 4 digits (front of card)';
  }

  if (expectedLength === 3) {
    return 'CVV: 3 digits (back of card)';
  }

  return 'CVV: 3 or 4 digits (back of card)';
}

function getCvvValidationFeedback(cvv: string, network: number): string | null {
  const digitsOnly = cvv.replace(/\D/g, '');
  const expectedLength = getExpectedCvvLength(network);

  if (digitsOnly.length === 0) {
    return null;
  }

  if (expectedLength === null) {
    if (digitsOnly.length < 3) {
      return `${digitsOnly.length}/3-4 digits - more needed`;
    }

    if (digitsOnly.length > 4) {
      return `Too many digits (${digitsOnly.length} > 4)`;
    }

    return `${digitsOnly.length}/3-4 digits - valid length`;
  }

  if (digitsOnly.length < expectedLength) {
    return `${digitsOnly.length}/${expectedLength} digits - more needed`;
  }

  if (digitsOnly.length > expectedLength) {
    return `Too many digits (${digitsOnly.length} > ${expectedLength})`;
  }

  return `${digitsOnly.length}/${expectedLength} digits - complete`;
}

export function Step2ExpiryAndCvv({
  formData,
  network,
  errors,
  onFieldChange,
}: Step2ExpiryProps) {
  const monthOptions: AppSelectOption[] = useMemo(
    () =>
      MONTH_OPTIONS.map((option) => ({
        value: option.value,
        label: `${option.value.padStart(2, '0')} - ${option.label}`,
      })),
    []
  );

  const yearOptions: AppSelectOption[] = useMemo(() => generateYearOptions(), []);

  const expectedCvvLength = useMemo(
    () => getExpectedCvvLength(network) || 4,
    [network]
  );

  const cvvHint = useMemo(() => getNetworkCvvHint(network), [network]);

  const cvvValidationFeedback = useMemo(
    () => getCvvValidationFeedback(formData.cvv, network),
    [formData.cvv, network]
  );

  return (
    <div className='w-full space-y-6'>
      {/* Expiry Month and Year in a row */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {/* Expiry Month */}
        <FormField
          id='expiry-month'
          label='Expiry Month'
          hint='Select the month your card expires'
          error={errors.expiry_month}
          className='space-y-3'
        >
          <AppSelectField
            id='expiry-month'
            value={String(formData.expiryMonth)}
            onValueChange={(value) => {
              onFieldChange('expiryMonth', Number(value));
            }}
            placeholder='Select month...'
            options={monthOptions}
            ariaLabel='Expiry Month'
            ariaInvalid={!!errors.expiry_month}
          />
        </FormField>

        {/* Expiry Year */}
        <FormField
          id='expiry-year'
          label='Expiry Year'
          hint='Select the year your card expires'
          error={errors.expiry_year}
          className='space-y-3'
        >
          <AppSelectField
            id='expiry-year'
            value={formData.expiryYear}
            onValueChange={(value) => {
              onFieldChange('expiryYear', value);
            }}
            placeholder='Select year...'
            options={yearOptions}
            ariaLabel='Expiry Year'
            ariaInvalid={!!errors.expiry_year}
          />
        </FormField>
      </div>

      {/* CVV Input */}
      <FormField
        id='cvv'
        label='Card Verification Value (CVV)'
        hint={
          <>
            <div className='text-text-subtle text-sm'>{cvvHint}</div>
            {cvvValidationFeedback && (
              <div
                className={
                  'text-sm mt-1 ' +
                  (cvvValidationFeedback.includes('complete') || cvvValidationFeedback.includes('valid')
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-amber-600 dark:text-amber-400')
                }
              >
                {cvvValidationFeedback}
              </div>
            )}
          </>
        }
        error={errors.cvv}
        className='space-y-3'
      >
        <CvvOtpInput
          id='cvv'
          name='cvv'
          defaultValue={formData.cvv}
          length={expectedCvvLength}
          invalid={!!errors.cvv}
          onChange={(value) => {
            onFieldChange('cvv', value);
          }}
        />
      </FormField>

      {/* Help Text */}
      <div className='rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50'>
        <p className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed'>
          <strong>Tip:</strong> The CVV is a 3-digit security code on the back of your card.
          For American Express cards, it's a 4-digit code on the front. Your card expiry date is
          printed on the front of your card in MM/YY format.
        </p>
      </div>
    </div>
  );
}
