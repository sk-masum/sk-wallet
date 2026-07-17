import { DocumentTypeCode, type DocumentTypeFieldConfig } from '@/models/document'

export const DOCUMENT_TYPE_OPTIONS: DocumentTypeFieldConfig[] = [
  {
    code: DocumentTypeCode.AADHAAR,
    label: 'Aadhaar Card',
    placeholder: '1234 5678 9123',
    hint: '12 digits, spaces allowed',
    minLength: 12,
    maxLength: 12,
  },
  {
    code: DocumentTypeCode.PAN,
    label: 'PAN Card',
    placeholder: 'ABCDE1234F',
    hint: '5 letters + 4 digits + 1 letter',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: DocumentTypeCode.VOTER,
    label: 'Voter ID Card',
    placeholder: 'ABC1234567',
    hint: '3 letters + 7 digits',
    minLength: 10,
    maxLength: 10,
  },
  {
    code: DocumentTypeCode.DRIVING_LICENSE,
    label: 'Driving License',
    placeholder: 'MH1420110012345',
    hint: 'State format varies; 10-20 letters/digits accepted',
    minLength: 10,
    maxLength: 20,
  },
  {
    code: DocumentTypeCode.RATION,
    label: 'Ration Card',
    placeholder: 'RC123456789',
    hint: 'State format varies; 8-20 letters/digits accepted',
    minLength: 8,
    maxLength: 20,
  },
]

const DOCUMENT_TYPE_SET = new Set(DOCUMENT_TYPE_OPTIONS.map((item) => item.code))

export function isDocumentTypeCode(value: string): value is DocumentTypeCode {
  return DOCUMENT_TYPE_SET.has(value as DocumentTypeCode)
}

export function getDocumentTypeConfig(type: string) {
  return DOCUMENT_TYPE_OPTIONS.find((item) => item.code === type) ?? null
}
