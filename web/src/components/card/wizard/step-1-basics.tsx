'use client';

import { useMemo } from 'react';
import { CardNetwork } from '@/models/card';
import { CardNumberInput } from '@/components/card/card-number-input';
import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group';
import { FormField } from '@/components/ui/form-field';
import { AppSelectField, type AppSelectOption } from '@/components/shared/app-select-field';
import { CARD_NETWORK_FORM_OPTIONS } from '@/utils/card/network';
import type { CardFormData } from '@/hooks/use-card-wizard';
import type { CardFormFieldErrors } from '@/utils/card/validation';

export type Step1BasicProps = {
  formData: CardFormData;
  errors: CardFormFieldErrors;
  onFieldChange: (field: keyof CardFormData, value: string | number) => void;
};

function getNetworkCardLengthHint(network: number): string {
  switch (network) {
    case CardNetwork.VISA:
      return 'VISA: 13-19 digits';
    case CardNetwork.MASTERCARD:
      return 'Mastercard: 13-19 digits';
    case CardNetwork.AMEX:
      return 'Amex: 15 digits';
    case CardNetwork.RUPAY:
      return 'RuPay: 16 or 19 digits';
    default:
      return '13-19 digits';
  }
}

function getCardNumberValidationFeedback(number: string, network: number): string | null {
  const digitsOnly = number.replace(/\D/g, '');
  const maxDigits = network === CardNetwork.AMEX ? 15 : 19;
  const minDigits = network === CardNetwork.AMEX ? 15 : 13;

  if (digitsOnly.length === 0) {
    return null;
  }

  if (digitsOnly.length < minDigits) {
    return `${digitsOnly.length}/${minDigits} digits - more needed`;
  }

  if (digitsOnly.length > maxDigits) {
    return `Too many digits (${digitsOnly.length} > ${maxDigits})`;
  }

  return `${digitsOnly.length}/${maxDigits} digits - valid length`;
}

export function Step1Basics({ formData, errors, onFieldChange }: Step1BasicProps) {
  const networkOptions: AppSelectOption[] = useMemo(
    () =>
      CARD_NETWORK_FORM_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    []
  );

  const cardLengthHint = useMemo(
    () => getNetworkCardLengthHint(formData.network),
    [formData.network]
  );

  const cardNumberFeedback = useMemo(
    () => getCardNumberValidationFeedback(formData.number, formData.network),
    [formData.number, formData.network]
  );

  const cardTypeValue = (formData.cardType || 'credit') as 'credit' | 'debit';

  return (
    <div className='w-full space-y-6'>
      {/* Card Type Selection */}
      <FormField
        id='card-type'
        label='Card Type'
        hint='Choose between credit and debit card'
        error={errors.card_type}
        className='space-y-3'
      >
        <CardTypeButtonGroup
          selectedType={cardTypeValue}
          showAllOption={false}
          onSelect={(type) => {
            if (type === 'credit' || type === 'debit') {
              onFieldChange('cardType', type);
            }
          }}
        />
      </FormField>

      {/* Network Selection */}
      <FormField
        id='network'
        label='Card Network'
        hint='Select the card network/issuer'
        error={errors.network}
        className='space-y-3'
      >
        <AppSelectField
          id='network'
          value={String(formData.network)}
          onValueChange={(value) => {
            onFieldChange('network', Number(value));
          }}
          placeholder='Select network...'
          options={networkOptions}
          ariaLabel='Card Network'
          ariaInvalid={!!errors.network}
        />
      </FormField>

      {/* Card Number Input */}
      <FormField
        id='card-number'
        label='Card Number'
        hint={
          <>
            <div className='text-text-subtle text-sm'>{cardLengthHint}</div>
            {cardNumberFeedback && (
              <div
                className={
                  'text-sm mt-1 ' +
                  (cardNumberFeedback.includes('valid')
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-amber-600 dark:text-amber-400')
                }
              >
                {cardNumberFeedback}
              </div>
            )}
          </>
        }
        error={errors.number}
        className='space-y-3'
        labelClassName='uppercase tracking-wider'
      >
        <CardNumberInput
          id='card-number'
          network={formData.network}
          defaultValue={formData.number}
          onChange={(value) => {
            onFieldChange('number', value);
          }}
          className='font-mono tracking-widest'
        />
      </FormField>

      {/* Help Text */}
      <div className='rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50'>
        <p className='text-xs text-slate-600 dark:text-slate-400 leading-relaxed'>
          <strong>Tip:</strong> Enter your card number carefully. We only need the numbers printed
          on your card. The CVV and expiry details will be collected in the next step.
        </p>
      </div>
    </div>
  );
}
