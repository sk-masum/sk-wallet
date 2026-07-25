import { redirect } from 'next/navigation'

import { DocumentVault } from '@/components/doc/document-vault'
import { DocumentMobileFilters } from '@/components/doc/document-mobile-filters'
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
    <ListingPageLayout title="Documents" addLabel="Add document" addHref="/doc/new" filters={<DocumentMobileFilters />}>
      <DocumentVault initialDocuments={documents} initialError={documentFetchError} />
    </ListingPageLayout>
  )
}
