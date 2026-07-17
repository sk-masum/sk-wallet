import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { PageHeader } from '@/components/ui/page-header'
import { DocumentVault } from '@/components/doc/document-vault'
import { serverApiGet } from '@/lib/api/server'
import type { UserDocument } from '@/models/document'

export default async function DocPage() {
  const { response, data: result } = await serverApiGet<{ data?: UserDocument[]; error?: string }>(
    '/api/document'
  )

  if (response.status === 401) {
    redirect('/auth?next=/doc')
  }

  const documents = response.ok ? result?.data ?? [] : []
  const documentFetchError = response.ok ? '' : result?.error || 'Failed to load document records.'

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-28 pt-12">
      <PageHeader
        title="Documents"
        showAddButton
        addHref="/doc/new"
        addButtonLabel="Add document"
      />

      <section className="mt-8">
        <DocumentVault initialDocuments={documents} initialError={documentFetchError} />
      </section>

      <BottomTabBar />
    </main>
  )
}
