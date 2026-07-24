import { getDocumentTypeConfig } from '@/constants/document/types'
import { DocumentTypeCode } from '@/models/document'

function getMetadataText(metadata: Record<string, unknown> | null | undefined, key: string) {
  if (!metadata) return ''
  const value = metadata[key]
  if (typeof value !== 'string') return ''
  return value.trim()
}

export function getDocumentDisplayTypeLabel(
  documentType: string,
  metadata: Record<string, unknown> | null | undefined
) {
  const defaultLabel = getDocumentTypeConfig(documentType)?.label ?? documentType

  if (documentType !== DocumentTypeCode.OTHERS) {
    return defaultLabel
  }

  const customLabel = getMetadataText(metadata, 'other_type_label')
  return customLabel || defaultLabel
}
