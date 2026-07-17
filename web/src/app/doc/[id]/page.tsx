import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { DocumentEditForm } from '@/components/doc/document-edit-form'
import { EntityFormPageLayout } from '@/components/shared/entity-form-page-layout'
import { serverApiGet } from '@/lib/api/server'
import type { UserDocument } from '@/models/document'

type EditDocumentPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditDocumentPage({ params }: EditDocumentPageProps) {
  const { id } = await params

  const { response, data: result } = await serverApiGet<{ data?: UserDocument; error?: string }>(
    `/api/document/${id}`
  )

  if (response.status === 401) {
    redirect(`/auth?next=/doc/${id}`)
  }

  if (!response.ok || !result?.data) {
    redirect('/doc?error=' + encodeURIComponent(result?.error || 'Document not found'))
  }

  return (
    <>
      <EntityFormPageLayout
        pageTitle="Edit Document"
        sectionTitle="Update Document"
        sectionDescription="Edit your document details."
        backHref="/doc"
        backButtonLabel="Back to documents"
        maxWidthClassName="max-w-4xl"
      >
        <DocumentEditForm document={result.data} />
      </EntityFormPageLayout>

      <BottomTabBar />
    </>
  )
}
