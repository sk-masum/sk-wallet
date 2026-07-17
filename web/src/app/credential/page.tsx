import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { PageHeader } from '@/components/ui/page-header'
import { CredentialVault } from '@/components/credential/credential-vault'
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
        <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-28 pt-12">
            <PageHeader
                title="Credentials"
                showAddButton
                addHref="/credential/new"
                addButtonLabel="Add credential"
            />

            <section className="mt-8">
                <CredentialVault initialCredentials={credentials} initialError={credentialFetchError} />
            </section>

            <BottomTabBar />
        </main>
    )
}
