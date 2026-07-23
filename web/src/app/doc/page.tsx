import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { DocumentVault } from '@/components/doc/document-vault'
import { DocumentMobileFilters } from '@/components/doc/document-mobile-filters'
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
    <ListingPageLayout contentClassName="max-w-212.5">
      <ListingPageHeader
        title="Documents"
        className="pt-6"
        showBackButton
        backHref="/"
        backButtonLabel="Back to dashboard"
        description={`${documents.length} ${documents.length === 1 ? 'document' : 'documents'}`}
        addLabel="Add document"
        mobileStickyHeader
        mobileFilters={<DocumentMobileFilters />}
      />

      <section>
        <DocumentVault initialDocuments={documents} initialError={documentFetchError} />
      </section>

      <BottomTabBar addHref="/doc/new" addLabel="Add document" />
    </ListingPageLayout>
  )
}
