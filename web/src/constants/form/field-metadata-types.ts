export type SupportedFormEntity = 'card' | 'credential' | 'document';

export type SupportedFieldType =
  | 'input'
  | 'textarea'
  | 'date'
  | 'select'
  | 'autocomplete'
  | 'mode-toggle'
  | 'custom-fields'
  | 'otp';

export type ModeToggleOption = {
  value: string;
  title: string;
  subtitle: string;
};

export type FormFieldMetadata = {
  type: SupportedFieldType;
  label: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  inputMode?: 'text' | 'decimal' | 'numeric' | 'url';
  options?: ModeToggleOption[];
};

export type CardFieldKey =
  | 'card_type'
  | 'credit_limit'
  | 'card_name'
  | 'tags'
  | 'number'
  | 'color'
  | 'pattern'
  | 'provider'
  | 'holder_name'
  | 'expiry_month'
  | 'expiry_year'
  | 'billing_date'
  | 'payment_date'
  | 'network'
  | 'cvv';

export type CredentialFieldKey = 'type' | 'serviceName' | 'identifier' | 'secret' | 'url' | 'notes';

export type DocumentFieldKey =
  | 'type'
  | 'customLabel'
  | 'category'
  | 'number'
  | 'nameOnDocument'
  | 'issuedDate'
  | 'expiryDate'
  | 'guardianName'
  | 'address'
  | 'otherDetails'
  | 'customFields';

export type EntityFormFieldMetadataMap = {
  card: Record<CardFieldKey, FormFieldMetadata>;
  credential: Record<CredentialFieldKey, FormFieldMetadata>;
  document: Record<DocumentFieldKey, FormFieldMetadata>;
};
