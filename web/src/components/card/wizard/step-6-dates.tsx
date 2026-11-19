'use client';

import { useMemo } from 'react';
import { FormField } from '@/components/ui/form-field';
import { AppSelectField, type AppSelectOption } from '@/components/shared/app-select-field';
import { Button } from '@/components/ui/button';
import type { CardFormData } from '@/hooks/use-card-wizard';
import type { CardFormFieldErrors } from '@/utils/card/validation';

export type Step6DatesProps = {
  formData: CardFormData;
  errors: CardFormFieldErrors;
  onFieldChange: (field: keyof CardFormData, value: string) => void;
  onSkip?: () => void;
};

function getDayLabel(day: number): string {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function generateDayOptions(): AppSelectOption[] {
  const options: AppSelectOption[] = [
    {
      value: '',
      label: 'Select a day...',
    },
  ];

  for (let day = 1; day <= 31; day++) {
    options.push({
      value: String(day),
      label: getDayLabel(day),
    });
  }

  return options;
}

export function Step6Dates({
  formData,
  errors,
  onFieldChange,
  onSkip,
}: Step6DatesProps) {
  const dayOptions = useMemo(() => generateDayOptions(), []);

  const billingDateError = errors.billing_date;
  const paymentDateError = errors.payment_date;

  return (
    <div className='w-full space-y-6'>
      {/* Help Text */}
      <div className='rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20'>
        <p className='text-sm text-blue-900 dark:text-blue-100'>
          Set up optional billing and payment dates for your card. You can configure these later
          if you prefer.
        </p>
      </div>

      {/* Billing Date Field */}
      <FormField
        id='billing-date'
        label='Billing Date'
        hint='The day your billing cycle starts each month (1-31)'
        error={billingDateError}
        className='space-y-3'
      >
        <AppSelectField
          id='billing-date'
          value={formData.billingDate}
          onValueChange={(value) => {
            onFieldChange('billingDate', value);
          }}
          placeholder='Select a day...'
          options={dayOptions}
          ariaLabel='Billing Date'
          ariaInvalid={!!billingDateError}
        />
      </FormField>

      {/* Payment Date Field */}
      <FormField
        id='payment-date'
        label='Payment Date'
        hint='The day your payment is due each month (1-31)'
        error={paymentDateError}
        className='space-y-3'
      >
        <AppSelectField
          id='payment-date'
          value={formData.paymentDate}
          onValueChange={(value) => {
            onFieldChange('paymentDate', value);
          }}
          placeholder='Select a day...'
          options={dayOptions}
          ariaLabel='Payment Date'
          ariaInvalid={!!paymentDateError}
        />
      </FormField>

      {/* Info Section */}
      <div className='rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50 space-y-3'>
        <div>
          <p className='text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2'>
            What are these dates?
          </p>
          <ul className='space-y-2 text-xs text-slate-600 dark:text-slate-400'>
            <li>
              <strong className='text-slate-700 dark:text-slate-300'>Billing Date:</strong> The day
              your credit card company starts your monthly billing cycle. All transactions within
              that month will appear on that statement.
            </li>
            <li>
              <strong className='text-slate-700 dark:text-slate-300'>Payment Date:</strong> The
              deadline for paying your monthly bill. Missing this date may result in interest
              charges or late fees.
            </li>
          </ul>
        </div>
      </div>

      {/* Skip Button */}
      {onSkip && (
        <div className='flex gap-2 justify-center'>
          <Button
            type='button'
            variant='ghost'
            onClick={onSkip}
            className='text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          >
            Skip & Configure Later
          </Button>
        </div>
      )}
    </div>
  );
}
