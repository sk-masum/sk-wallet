import Link from 'next/link'
import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { CredentialVault } from '@/components/credential/credential-vault'
import { CredentialMobileFilters } from '@/components/credential/credential-mobile-filters'
import { buttonVariants } from '@/components/ui/button'
import { ListingActiveFiltersRow, ListingPageHeader } from '@/components/shared/listing-page-header'
import { ListingPageLayout } from '@/components/shared/listing-page-layout'
import { CREDENTIAL_TYPE_OPTIONS, getCredentialTypeConfig } from '@/constants/credential/types'
import { serverApiGet } from '@/lib/api/server'
import { cn } from '@/lib/utils'
import type { UserCredential } from '@/models/credential'

type CredentialPageProps = {
    searchParams?: Promise<{
        q?: string
        type?: string
    }>
}

export default async function CredentialPage({ searchParams }: CredentialPageProps) {
    const params = searchParams ? await searchParams : {}
    const query = params.q?.trim() ?? ''
    const typeParam = params.type?.trim().toUpperCase() ?? 'ALL'
    const isKnownType = CREDENTIAL_TYPE_OPTIONS.some((item) => item.code === typeParam)
    const selectedType = isKnownType ? typeParam : 'ALL'
    const hasTextQuery = query.length > 0
    const hasTypeFilter = selectedType !== 'ALL'
    const hasActiveControls = hasTextQuery || hasTypeFilter
    const activeControlCount = Number(hasTextQuery) + Number(hasTypeFilter)

    const { response, data: result } = await serverApiGet<{ data?: UserCredential[]; error?: string }>(
        '/api/credential'
    )

    if (response.status === 401) {
        redirect('/auth?next=/credential')
    }

    const credentials = response.ok ? result?.data ?? [] : []
    const credentialFetchError = response.ok ? '' : result?.error || 'Failed to load credentials.'

    return (
        <ListingPageLayout contentClassName="max-w-212.5">
            <ListingPageHeader
                title="Credentials"
                className="pt-6"
                description={`${credentials.length} ${credentials.length === 1 ? 'credential' : 'credentials'}${activeControlCount > 0 ? ` • ${activeControlCount} filter${activeControlCount === 1 ? '' : 's'}` : ''}`}
                addHref="/credential/new"
                addLabel="Add credential"
                mobileStickyHeader
                mobileFilters={<CredentialMobileFilters query={query} selectedType={selectedType} />}
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
                                        Type: {getCredentialTypeConfig(selectedType)?.label ?? selectedType}
                                    </span>
                                ) : null}
                            </div>

                            <Link
                                href="/credential"
                                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-8 rounded-full border border-border/60 bg-background/80 px-3 text-xs')}
                            >
                                Reset filters
                            </Link>
                        </ListingActiveFiltersRow>
                    ) : null
                }
            />

            <section>
                <CredentialVault initialCredentials={credentials} initialError={credentialFetchError} />
            </section>

            <BottomTabBar />
        </ListingPageLayout>
    )
}
