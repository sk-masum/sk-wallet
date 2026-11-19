import { redirect } from 'next/navigation';

import { BottomTabBar } from '@/components/ui/bottom-tab-bar';
import { CredentialCreateForm } from '@/components/credential/credential-create-form';
import { EntityFormPageLayout } from '@/components/shared/entity-form-page-layout';
import { getAuthenticatedUser } from '@/lib/auth/server';

export default async function NewCredentialPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/auth?next=/credential/new');
  }

  return (
    <>
      <EntityFormPageLayout
        pageTitle='Add Credential'
        sectionTitle='Credential Details'
        sectionDescription='Fill the form below to save a new credential.'
        backHref='/credential'
        backButtonLabel='Back to credentials'
        maxWidthClassName='max-w-4xl'
      >
        <CredentialCreateForm />
      </EntityFormPageLayout>
    </>
  );
}
