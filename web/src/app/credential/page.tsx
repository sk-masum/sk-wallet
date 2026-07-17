import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { CredentialVault } from '@/components/credential/credential-vault'
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
        <ListingPageLayout contentClassName="max-w-3xl">
            <ListingPageHeader
                title="Credentials"
                description={`${credentials.length} ${credentials.length === 1 ? 'credential' : 'credentials'}`}
                addHref="/credential/new"
                addLabel="Add credential"
            />

            <section className="mt-8">
                <CredentialVault initialCredentials={credentials} initialError={credentialFetchError} />
            </section>

            <BottomTabBar />
        </ListingPageLayout>
    )
}
