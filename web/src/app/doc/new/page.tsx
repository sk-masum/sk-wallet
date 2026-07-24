import { redirect } from 'next/navigation'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { DocumentCreateForm } from '@/components/doc/document-create-form'
import { EntityFormPageLayout } from '@/components/shared/entity-form-page-layout'
import { getServerSupabaseUser } from '@/lib/supabase/server-auth'

export default async function NewDocumentPage() {
  const { user } = await getServerSupabaseUser()

  if (!user) {
    redirect('/auth?next=/doc/new')
  }

  return (
    <>
      <EntityFormPageLayout
        pageTitle="Add Document"
        sectionTitle="Document Details"
        sectionDescription="Fill the form below to save a new document."
        backHref="/doc"
        backButtonLabel="Back to documents"
        maxWidthClassName="max-w-4xl"
      >
        <DocumentCreateForm />
      </EntityFormPageLayout>
    </>
  )
}
