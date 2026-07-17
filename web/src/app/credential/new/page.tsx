import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { PageHeader } from '@/components/ui/page-header'
import { CredentialCreateForm } from '@/components/credential/credential-create-form'
import { createClient } from '@/lib/supabase/server'

export default async function NewCredentialPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth?next=/credential/new')
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-28 pt-12">
            <PageHeader
                title="Add Credential"
                showBackButton
                backHref="/credential"
                backButtonLabel="Back to credentials"
            />

            <section className="space-y-4">
                <CredentialCreateForm />
            </section>

            <BottomTabBar />
        </main>
    )
}
