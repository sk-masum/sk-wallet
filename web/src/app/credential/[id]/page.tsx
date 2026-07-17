import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { PageHeader } from '@/components/ui/page-header'
import { CredentialEditForm } from '@/components/credential/credential-edit-form'
import { serverApiGet } from '@/lib/api/server'
import type { UserCredential } from '@/models/credential'

type EditCredentialPageProps = {
    params: Promise<{
        id: string
    }>
}

export default async function EditCredentialPage({ params }: EditCredentialPageProps) {
    const { id } = await params

    const { response, data: result } = await serverApiGet<{ data?: UserCredential; error?: string }>(
        `/api/credential/${id}`
    )

    if (response.status === 401) {
        redirect(`/auth?next=/credential/${id}`)
    }

    if (!response.ok || !result?.data) {
        redirect('/credential?error=' + encodeURIComponent(result?.error || 'Credential not found'))
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-28 pt-12">
            <PageHeader
                title="Edit Credential"
                showBackButton
                backHref="/credential"
                backButtonLabel="Back to credentials"
            />

            <section className="space-y-4">
                <CredentialEditForm credential={result.data} />
            </section>

            <BottomTabBar />
        </main>
    )
}
