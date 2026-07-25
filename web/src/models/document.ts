export enum DocumentTypeCode {
  AADHAAR = 'AADHAAR',
  PAN = 'PAN',
  VOTER = 'VOTER',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  RATION = 'RATION',
  PASSPORT = 'PASSPORT',
  BIRTH_CERTIFICATE = 'BIRTH_CERTIFICATE',
  VEHICLE_RC = 'VEHICLE_RC',
  PASSBOOK = 'PASSBOOK',
  OTHERS = 'OTHERS',
}

export enum DocumentCategory {
  PERSONAL = 'personal',
  FAMILY = 'family',
  HEALTH = 'health',
  EDUCATION = 'education',
  PROFESSIONAL = 'professional',
  FINANCIAL = 'financial',
  LEGAL = 'legal',
  TRAVEL = 'travel',
  PROPERTY = 'property',
  INSURANCE = 'insurance',
  VEHICLE = 'vehicle',
  GOVERNMENT = 'government',
  OTHER = 'other',
}

export type UserDocument = {
  id: string;
  user_id: string;
  document_type: string;
  masked_number: string;
  document_number_last4: string;
  name_on_document: string | null;
  category: DocumentCategory;
  metadata: Record<string, unknown> | null;
  verified_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DocumentTypeFieldConfig = {
  code: DocumentTypeCode;
  label: string;
  placeholder: string;
  hint: string;
  minLength: number;
  maxLength: number;
};

export type DocumentFormPayload = {
  type: string;
  category: string;
  number: string;
  nameOnDocument?: string;
  issuedDate?: string;
  expiryDate?: string;
  address?: string;
  guardianName?: string;
  otherDetails?: string;
  customFields?: Array<{
    key: string;
    value: string;
  }>;
  metadata?: Record<string, unknown>;
};

export type DocumentFormFieldErrors = Partial<{
  type: string;
  category: string;
  number: string;
  nameOnDocument: string;
  issuedDate: string;
  expiryDate: string;
  address: string;
  guardianName: string;
  otherDetails: string;
  customFields: string;
}>;
