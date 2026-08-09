import type { EntityFormFieldMetadataMap } from '@/constants/form/field-metadata-types';

export const CREDENTIAL_FORM_FIELD_METADATA: EntityFormFieldMetadataMap['credential'] = {
  type: {
    type: 'select',
    label: 'Credential type',
    placeholder: 'Select credential type',
    required: true,
  },
  serviceName: {
    type: 'input',
    label: 'Service name',
    placeholder: 'e.g. Gmail, GitHub, HBL',
    required: true,
    maxLength: 120,
  },
  identifier: {
    type: 'input',
    label: 'Identifier (optional)',
    placeholder: 'email / username / phone',
    maxLength: 120,
  },
  secret: {
    type: 'input',
    label: 'Secret',
    hint: 'Store only trusted credentials.',
    placeholder: 'Enter secret',
    required: true,
  },
  url: {
    type: 'input',
    label: 'Website URL (optional)',
    placeholder: 'https://example.com',
    maxLength: 400,
    inputMode: 'url',
  },
  notes: {
    type: 'textarea',
    label: 'Notes (optional)',
    placeholder: 'Any extra details',
    maxLength: 1000,
  },
};
