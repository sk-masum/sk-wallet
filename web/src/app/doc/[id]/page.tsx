import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { PageHeader } from '@/components/ui/page-header'
import { DocumentEditForm } from '@/components/doc/document-edit-form'
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
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-28 pt-12">
      <PageHeader
        title="Edit Document"
        showBackButton
        backHref="/doc"
        backButtonLabel="Back to documents"
      />

      <section className="space-y-4">
        <DocumentEditForm document={result.data} />
      </section>

      <BottomTabBar />
    </main>
  )
}
