import { DocumentCategory } from '@/models/document'

export const DOCUMENT_CATEGORY_OPTIONS: Array<{ value: DocumentCategory; label: string }> = [
  { value: DocumentCategory.PERSONAL, label: 'Personal' },
  { value: DocumentCategory.FAMILY, label: 'Family' },
  { value: DocumentCategory.HEALTH, label: 'Health' },
  { value: DocumentCategory.EDUCATION, label: 'Education' },
  { value: DocumentCategory.PROFESSIONAL, label: 'Professional' },
  { value: DocumentCategory.FINANCIAL, label: 'Financial' },
  { value: DocumentCategory.LEGAL, label: 'Legal' },
  { value: DocumentCategory.TRAVEL, label: 'Travel' },
  { value: DocumentCategory.PROPERTY, label: 'Property' },
  { value: DocumentCategory.INSURANCE, label: 'Insurance' },
  { value: DocumentCategory.VEHICLE, label: 'Vehicle' },
  { value: DocumentCategory.GOVERNMENT, label: 'Government' },
  { value: DocumentCategory.OTHER, label: 'Other' },
]

const DOCUMENT_CATEGORY_SET = new Set(DOCUMENT_CATEGORY_OPTIONS.map((item) => item.value))

export function isDocumentCategory(value: string): value is DocumentCategory {
  return DOCUMENT_CATEGORY_SET.has(value as DocumentCategory)
}

export function getDocumentCategoryLabel(value: string) {
  return DOCUMENT_CATEGORY_OPTIONS.find((item) => item.value === value)?.label ?? 'Other'
}
