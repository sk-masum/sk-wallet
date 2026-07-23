import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { CredentialVault } from '@/components/credential/credential-vault'
import { CredentialMobileFilters } from '@/components/credential/credential-mobile-filters'
import { ListingPageHeader } from '@/components/shared/listing-page-header'
import { ListingPageLayout } from '@/components/shared/listing-page-layout'
import { serverApiGet } from '@/lib/api/server'
import type { UserCredential } from '@/models/credential'

export default async function CredentialPage() {

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
                showBackButton
                backHref="/"
                backButtonLabel="Back to dashboard"
                description={`${credentials.length} ${credentials.length === 1 ? 'credential' : 'credentials'}`}
                addLabel="Add credential"
                mobileStickyHeader
                mobileFilters={<CredentialMobileFilters />}
            />

            <section>
                <CredentialVault initialCredentials={credentials} initialError={credentialFetchError} />
            </section>

            <BottomTabBar addHref="/credential/new" addLabel="Add credential" />
        </ListingPageLayout>
    )
}
