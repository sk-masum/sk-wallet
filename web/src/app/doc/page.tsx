import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { DocumentVault } from '@/components/doc/document-vault'
import { ListingPageHeader } from '@/components/shared/listing-page-header'
import { ListingPageLayout } from '@/components/shared/listing-page-layout'
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
    <ListingPageLayout contentClassName="max-w-3xl">
      <ListingPageHeader
        title="Documents"
        description={`${documents.length} ${documents.length === 1 ? 'document' : 'documents'}`}
        addHref="/doc/new"
        addLabel="Add document"
      />

      <section className="mt-8">
        <DocumentVault initialDocuments={documents} initialError={documentFetchError} />
      </section>

      <BottomTabBar />
    </ListingPageLayout>
  )
}
