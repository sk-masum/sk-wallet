import type { EntityFormFieldMetadataMap } from '@/constants/form/field-metadata-types';

export const CARD_FORM_FIELD_METADATA: EntityFormFieldMetadataMap['card'] = {
  card_type: {
    type: 'mode-toggle',
    label: 'Card Type',
    hint: 'Choose whether this card charges credit or debits directly from balance.',
    required: true,
    options: [
      {
        value: 'credit',
        title: 'Credit',
        subtitle: 'Pay later billing cycle',
      },
      {
        value: 'debit',
        title: 'Debit',
        subtitle: 'Instant balance deduction',
      },
    ],
  },
  credit_limit: {
    type: 'input',
    label: 'CREDIT LIMIT',
    hint: 'Required for credit cards. Enter total approved limit.',
    placeholder: 'e.g. 250000',
    required: true,
    inputMode: 'decimal',
  },
  card_name: {
    type: 'input',
    label: 'CARD NAME',
    placeholder: 'e.g. Personal Visa',
    required: true,
    maxLength: 80,
  },
  tags: {
    type: 'input',
    label: 'TAGS',
    hint: 'Optional: type comma-separated tags, use autocomplete, or pick from dropdown.',
    placeholder: 'e.g. travel, family, recurring',
    maxLength: 220,
  },
  number: {
    type: 'input',
    label: 'CARD NUMBER',
    required: true,
  },
  color: {
    type: 'select',
    label: 'Color',
    hint: 'Pick a color theme for quick visual identification.',
  },
  pattern: {
    type: 'select',
    label: 'Pattern',
    hint: 'Choose a texture overlay or randomize for variety.',
  },
  provider: {
    type: 'autocomplete',
    label: 'PROVIDER',
    hint: 'Optional: type to search or add a new issuer.',
    placeholder: 'e.g. HBL',
    maxLength: 50,
  },
  holder_name: {
    type: 'input',
    label: 'HOLDER NAME',
    placeholder: 'As printed on card',
    required: true,
    maxLength: 80,
  },
  expiry_month: {
    type: 'select',
    label: 'EXPIRY MONTH',
    placeholder: 'Select month',
    required: true,
  },
  expiry_year: {
    type: 'input',
    label: 'EXPIRY YEAR',
    placeholder: 'YYYY',
    required: true,
    maxLength: 4,
    inputMode: 'numeric',
  },
  billing_date: {
    type: 'input',
    label: 'BILLING DATE',
    hint: 'Optional day of month (1-31) when statement is generated.',
    placeholder: 'e.g. 5',
    inputMode: 'numeric',
  },
  payment_date: {
    type: 'input',
    label: 'PAYMENT DATE',
    hint: 'Optional day of month (1-31) when payment is due.',
    placeholder: 'e.g. 20',
    inputMode: 'numeric',
  },
  network: {
    type: 'select',
    label: 'NETWORK',
    hint: 'Selecting network improves card number and CVV validation accuracy.',
    placeholder: 'Select network',
    required: true,
  },
  cvv: {
    type: 'otp',
    label: 'CVV',
    hint: 'Enter the security code.',
    required: true,
  },
};
