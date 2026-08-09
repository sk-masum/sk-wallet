import type { EntityFormFieldMetadataMap } from '@/constants/form/field-metadata-types';

export const DOCUMENT_FORM_FIELD_METADATA: EntityFormFieldMetadataMap['document'] = {
  type: {
    type: 'select',
    label: 'Document type',
    placeholder: 'Select document type',
    required: true,
  },
  customLabel: {
    type: 'input',
    label: 'Custom label',
    hint: 'This label will be shown instead of Others in your vault.',
    placeholder: 'e.g. Employee ID',
    required: true,
    maxLength: 60,
  },
  category: {
    type: 'select',
    label: 'Category',
    placeholder: 'Select category',
    required: true,
  },
  number: {
    type: 'input',
    label: 'Document number',
    placeholder: 'Enter document number',
    required: true,
  },
  nameOnDocument: {
    type: 'input',
    label: 'Name on document (optional)',
    placeholder: 'As printed on document',
    maxLength: 120,
  },
  issuedDate: {
    type: 'date',
    label: 'Issued date (optional)',
    placeholder: 'Select issued date',
  },
  expiryDate: {
    type: 'date',
    label: 'Expiry date (optional)',
    placeholder: 'Select expiry date',
  },
  guardianName: {
    type: 'input',
    label: 'Guardian name (optional)',
    placeholder: 'Father / Mother / Guardian',
    maxLength: 120,
  },
  address: {
    type: 'input',
    label: 'Address (optional)',
    placeholder: 'Current address',
    maxLength: 240,
  },
  otherDetails: {
    type: 'textarea',
    label: 'Other details (optional)',
    placeholder: 'Any additional notes',
    maxLength: 500,
  },
  customFields: {
    type: 'custom-fields',
    label: 'Custom fields (optional)',
    hint: 'Add your own key/value metadata entries for this document.',
  },
};
