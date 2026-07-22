'use client'

import { useRouter } from 'next/navigation'

import { DocumentForm } from '@/components/doc/document-form'
import { clientApiPut } from '@/lib/api/client'
import { showToast } from '@/lib/toast'
import type { DocumentFormPayload, UserDocument } from '@/models/document'

const RESERVED_METADATA_KEYS = new Set([
  'issued_date',
  'expiry_date',
  'address',
  'guardian_name',
  'other_details',
  'custom_fields',
])

type DocumentEditFormProps = {
  document: UserDocument
}

function getMetadataText(metadata: Record<string, unknown> | null | undefined, key: string) {
  if (!metadata) return ''
  const value = metadata[key]
  if (typeof value !== 'string') return ''
  return value.trim()
}

function getMetadataCustomFields(metadata: Record<string, unknown> | null | undefined) {
  if (!metadata) return []

  const directFields = Object.entries(metadata)
    .filter(([key, value]) => {
      if (RESERVED_METADATA_KEYS.has(key)) return false
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
    })
    .map(([key, value]) => ({ key: key.trim(), value: String(value).trim() }))
    .filter((item) => item.key.length > 0 && item.value.length > 0)

  const seen = new Set(directFields.map((item) => item.key.toLowerCase()))
  const legacyValue = metadata.custom_fields
  if (!Array.isArray(legacyValue)) {
    return directFields
  }

  const legacyFields = legacyValue
    .map((item) => {
      const key = String((item as { key?: unknown })?.key ?? '').trim()
      const value = String((item as { value?: unknown })?.value ?? '').trim()
      if (!key || !value) return null
      const normalizedKey = key.toLowerCase()
      if (seen.has(normalizedKey)) return null
      seen.add(normalizedKey)
      return { key, value }
    })
    .filter((item): item is { key: string; value: string } => Boolean(item))

  return [...directFields, ...legacyFields]
}

function ensureEditableCustomFieldRow(fields: Array<{ key: string; value: string }>) {
  return fields.length > 0 ? fields : [{ key: '', value: '' }]
}

export function DocumentEditForm({ document }: DocumentEditFormProps) {
  const router = useRouter()

  const handleSave = async (payload: DocumentFormPayload) => {
    const { response, data } = await clientApiPut<{ success?: boolean; error?: string }>(
      `/api/document/${document.id}`,
      {
        category: payload.category,
        nameOnDocument: payload.nameOnDocument ?? '',
        issuedDate: payload.issuedDate ?? '',
        expiryDate: payload.expiryDate ?? '',
        address: payload.address ?? '',
        guardianName: payload.guardianName ?? '',
        otherDetails: payload.otherDetails ?? '',
        customFields: payload.customFields ?? [],
      }
    )

    if (!response.ok) {
      showToast({
        message: data?.error || 'Failed to update document.',
        variant: 'error',
      })
      return
    }

    showToast({
      message: 'Document updated successfully.',
      variant: 'success',
    })

    router.push('/doc')
    router.refresh()
  }

  return (
    <DocumentForm
      submitLabel="Save changes"
      showReset={false}
      lockTypeField
      lockNumberField
      validateIdentityFields={false}
      initialValues={{
        type: document.document_type,
        category: String(document.category ?? 'other'),
        number: document.masked_number,
        nameOnDocument: String(document.name_on_document ?? ''),
        issuedDate: getMetadataText(document.metadata, 'issued_date'),
        expiryDate: getMetadataText(document.metadata, 'expiry_date'),
        address: getMetadataText(document.metadata, 'address'),
        guardianName: getMetadataText(document.metadata, 'guardian_name'),
        otherDetails: getMetadataText(document.metadata, 'other_details'),
        customFields: ensureEditableCustomFieldRow(getMetadataCustomFields(document.metadata)),
      }}
      onSubmit={handleSave}
    />
  )
}
