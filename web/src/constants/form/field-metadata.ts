import { CARD_FORM_FIELD_METADATA } from '@/constants/form/field-metadata-card';
import { CREDENTIAL_FORM_FIELD_METADATA } from '@/constants/form/field-metadata-credential';
import { DOCUMENT_FORM_FIELD_METADATA } from '@/constants/form/field-metadata-document';

export type {
  CardFieldKey,
  CredentialFieldKey,
  DocumentFieldKey,
  EntityFormFieldMetadataMap,
  FormFieldMetadata,
  ModeToggleOption,
  SupportedFieldType,
  SupportedFormEntity,
} from '@/constants/form/field-metadata-types';

import type {
  EntityFormFieldMetadataMap,
  SupportedFormEntity,
} from '@/constants/form/field-metadata-types';

export const ENTITY_FORM_FIELD_METADATA: EntityFormFieldMetadataMap = {
  card: CARD_FORM_FIELD_METADATA,
  credential: CREDENTIAL_FORM_FIELD_METADATA,
  document: DOCUMENT_FORM_FIELD_METADATA,
};

export function isSupportedFormEntity(value: string): value is SupportedFormEntity {
  return value === 'card' || value === 'credential' || value === 'document';
}
