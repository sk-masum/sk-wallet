'use client'

import { useRouter } from 'next/navigation'

import { DocumentForm } from '@/components/doc/document-form'
import { clientApiPost } from '@/lib/api/client'
import { showToast } from '@/lib/toast'
import type { DocumentFormPayload, UserDocument } from '@/models/document'

type SaveDocumentResponse = {
  success?: boolean
  error?: string
  data?: Partial<UserDocument>
}

export function DocumentCreateForm() {
  const router = useRouter()

  const handleSave = async (payload: DocumentFormPayload) => {
    const { response, data } = await clientApiPost<SaveDocumentResponse>('/api/document', payload)

    if (!response.ok) {
      showToast({
        message: data?.error || 'Failed to save document. Please try again.',
        variant: 'error',
      })
      return
    }

    router.push(`/doc?success=${encodeURIComponent('Document saved successfully.')}`)
  }

  return <DocumentForm submitLabel="Save document" onSubmit={handleSave} />
}
