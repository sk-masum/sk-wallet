'use client'

import { useRouter } from 'next/navigation'

import { DocumentForm } from '@/components/doc/document-form'
import { clientApiPut } from '@/lib/api/client'
import { showToast } from '@/lib/toast'
import type { DocumentFormPayload, UserDocument } from '@/models/document'

type DocumentEditFormProps = {
  document: UserDocument
}

function getMetadataText(metadata: Record<string, unknown> | null | undefined, key: string) {
  if (!metadata) return ''
  const value = metadata[key]
  if (typeof value !== 'string') return ''
  return value.trim()
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
      }}
      onSubmit={handleSave}
    />
  )
}
