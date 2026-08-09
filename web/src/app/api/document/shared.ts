import {
  normalizeCustomFields,
  normalizeTrimmedText,
  toMutableMetadataRecord,
  type NormalizedCustomField,
} from '@/app/api/shared/payload-utils';
import type { DocumentFormPayload } from '@/models/document';

export const documentListSelect = {
  id: true,
  user_id: true,
  document_type: true,
  masked_number: true,
  document_number_last4: true,
  name_on_document: true,
  category: true,
  metadata: true,
  verified_at: true,
  expires_at: true,
  created_at: true,
  updated_at: true,
} as const;

export const documentDetailSelectWithToken = {
  ...documentListSelect,
  document_number_token: true,
} as const;

export const RESERVED_DOCUMENT_METADATA_KEYS = new Set([
  'issued_date',
  'expiry_date',
  'address',
  'guardian_name',
  'other_details',
  'other_type_label',
  'custom_fields',
]);

export type DocumentWritePayload = Partial<
  Pick<
    DocumentFormPayload,
    | 'type'
    | 'category'
    | 'nameOnDocument'
    | 'issuedDate'
    | 'expiryDate'
    | 'address'
    | 'guardianName'
    | 'otherDetails'
    | 'customFields'
    | 'metadata'
  >
>;

export type NormalizedDocumentMutableFields = {
  selectedType: string;
  rawCategory: string;
  normalizedCategory: string;
  nameOnDocument: string;
  issuedDate: string;
  expiryDate: string;
  address: string;
  guardianName: string;
  otherDetails: string;
  customFields: NormalizedCustomField[];
  hasCustomFields: boolean;
};

export function normalizeDocumentMutableFields(
  payload: DocumentWritePayload,
  options: {
    categoryMaxLength?: number;
  } = {},
): NormalizedDocumentMutableFields {
  const rawCategorySource = String(payload.category ?? '').trim();
  const rawCategory = options.categoryMaxLength
    ? rawCategorySource.slice(0, options.categoryMaxLength)
    : rawCategorySource;

  return {
    selectedType: String(payload.type ?? '')
      .trim()
      .toUpperCase(),
    rawCategory,
    normalizedCategory: rawCategory.toLowerCase(),
    nameOnDocument: normalizeTrimmedText(payload.nameOnDocument, 120),
    issuedDate: normalizeTrimmedText(payload.issuedDate, 10),
    expiryDate: normalizeTrimmedText(payload.expiryDate, 10),
    address: normalizeTrimmedText(payload.address, 240),
    guardianName: normalizeTrimmedText(payload.guardianName, 120),
    otherDetails: normalizeTrimmedText(payload.otherDetails, 500),
    customFields: normalizeCustomFields(payload.customFields),
    hasCustomFields: Object.prototype.hasOwnProperty.call(payload, 'customFields'),
  };
}

export function isValidDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime());
}

export function getInvalidDocumentDateMessage(issuedDate: string, expiryDate: string) {
  if (issuedDate && !isValidDateString(issuedDate)) {
    return 'Issued date must be a valid date.';
  }

  if (expiryDate && !isValidDateString(expiryDate)) {
    return 'Expiry date must be a valid date.';
  }

  if (issuedDate && expiryDate) {
    const issuedTime = new Date(`${issuedDate}T00:00:00Z`).getTime();
    const expiryTime = new Date(`${expiryDate}T00:00:00Z`).getTime();
    if (expiryTime < issuedTime) {
      return 'Expiry date cannot be earlier than issued date.';
    }
  }

  return null;
}

function withMetadataField(metadata: Record<string, unknown>, key: string, value: string) {
  const next = { ...metadata };

  if (value) {
    next[key] = value;
  } else {
    delete next[key];
  }

  return next;
}

export function buildDocumentMetadataForCreate(
  payloadMetadata: unknown,
  input: Pick<
    NormalizedDocumentMutableFields,
    'issuedDate' | 'expiryDate' | 'address' | 'guardianName' | 'otherDetails' | 'customFields'
  >,
) {
  const baseMetadata = toMutableMetadataRecord(payloadMetadata);
  delete baseMetadata.custom_fields;

  const customFieldMetadata = Object.fromEntries(
    input.customFields.map((item) => [item.key, item.value]),
  );

  return {
    ...baseMetadata,
    ...(input.issuedDate ? { issued_date: input.issuedDate } : {}),
    ...(input.expiryDate ? { expiry_date: input.expiryDate } : {}),
    ...(input.address ? { address: input.address } : {}),
    ...(input.guardianName ? { guardian_name: input.guardianName } : {}),
    ...(input.otherDetails ? { other_details: input.otherDetails } : {}),
    ...customFieldMetadata,
  };
}

export function buildDocumentMetadataForUpdate(
  existingMetadata: unknown,
  input: Pick<
    NormalizedDocumentMutableFields,
    | 'issuedDate'
    | 'expiryDate'
    | 'address'
    | 'guardianName'
    | 'otherDetails'
    | 'customFields'
    | 'hasCustomFields'
  >,
) {
  const baseMetadata = toMutableMetadataRecord(existingMetadata);
  delete baseMetadata.custom_fields;

  const mergedMetadata = withMetadataField(
    withMetadataField(
      withMetadataField(baseMetadata, 'address', input.address),
      'guardian_name',
      input.guardianName,
    ),
    'other_details',
    input.otherDetails,
  );

  const metadataWithTypeLabel = withMetadataField(mergedMetadata, 'other_type_label', '');

  const metadataWithDates = withMetadataField(
    withMetadataField(metadataWithTypeLabel, 'issued_date', input.issuedDate),
    'expiry_date',
    input.expiryDate,
  );

  const metadataFromCustomField = { ...metadataWithDates };
  if (input.hasCustomFields) {
    for (const key of Object.keys(metadataFromCustomField)) {
      if (!RESERVED_DOCUMENT_METADATA_KEYS.has(key)) {
        delete metadataFromCustomField[key];
      }
    }

    for (const item of input.customFields) {
      metadataFromCustomField[item.key] = item.value;
    }
  }

  return Object.keys(metadataFromCustomField).length > 0 ? metadataFromCustomField : null;
}
