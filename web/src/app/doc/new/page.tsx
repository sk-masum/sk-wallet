import { redirect } from 'next/navigation';

import { BottomTabBar } from '@/components/ui/bottom-tab-bar';
import { DocumentCreateForm } from '@/components/doc/document-create-form';
import { EntityFormPageLayout } from '@/components/shared/entity-form-page-layout';
import { getAuthenticatedUser } from '@/lib/auth/server';

export default async function NewDocumentPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/auth?next=/doc/new');
  }

  return (
    <>
      <EntityFormPageLayout
        pageTitle='Add Document'
        sectionTitle='Document Details'
        sectionDescription='Fill the form below to save a new document.'
        backHref='/doc'
        backButtonLabel='Back to documents'
        maxWidthClassName='max-w-4xl'
      >
        <DocumentCreateForm />
      </EntityFormPageLayout>
    </>
  );
}
