import Link from 'next/link'
import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { DocumentVault } from '@/components/doc/document-vault'
import { DocumentMobileFilters } from '@/components/doc/document-mobile-filters'
import { buttonVariants } from '@/components/ui/button'
import { ListingActiveFiltersRow, ListingPageHeader } from '@/components/shared/listing-page-header'
import { ListingPageLayout } from '@/components/shared/listing-page-layout'
import { DOCUMENT_TYPE_OPTIONS, getDocumentTypeConfig } from '@/constants/document/types'
import { serverApiGet } from '@/lib/api/server'
import { cn } from '@/lib/utils'
import type { UserDocument } from '@/models/document'

type DocPageProps = {
  searchParams?: Promise<{
    q?: string
    type?: string
  }>
}

export default async function DocPage({ searchParams }: DocPageProps) {
  const params = searchParams ? await searchParams : {}
  const query = params.q?.trim() ?? ''
  const typeParam = params.type?.trim().toUpperCase() ?? 'ALL'
  const isKnownType = DOCUMENT_TYPE_OPTIONS.some((item) => item.code === typeParam)
  const selectedType = isKnownType ? typeParam : 'ALL'
  const hasTextQuery = query.length > 0
  const hasTypeFilter = selectedType !== 'ALL'
  const hasActiveControls = hasTextQuery || hasTypeFilter
  const activeControlCount = Number(hasTextQuery) + Number(hasTypeFilter)

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
        description={`${documents.length} ${documents.length === 1 ? 'document' : 'documents'}${activeControlCount > 0 ? ` • ${activeControlCount} filter${activeControlCount === 1 ? '' : 's'}` : ''}`}
        addHref="/doc/new"
        addLabel="Add document"
        mobileStickyHeader
        mobileFilters={<DocumentMobileFilters query={query} selectedType={selectedType} />}
        activeFilters={
          hasActiveControls ? (
            <ListingActiveFiltersRow className="items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {hasTextQuery ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Query: {query}
                  </span>
                ) : null}
                {hasTypeFilter ? (
                  <span className="inline-flex rounded-full border border-border/60 bg-linear-to-r from-muted/45 to-card/75 px-2.5 py-1 text-xs font-medium text-foreground/80">
                    Type: {getDocumentTypeConfig(selectedType)?.label ?? selectedType}
                  </span>
                ) : null}
              </div>

              <Link
                href="/doc"
                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-8 rounded-full border border-border/60 bg-background/80 px-3 text-xs')}
              >
                Reset filters
              </Link>
            </ListingActiveFiltersRow>
          ) : null
        }
      />

      <section>
        <DocumentVault initialDocuments={documents} initialError={documentFetchError} />
      </section>

      <BottomTabBar />
    </ListingPageLayout>
  )
}
