import { redirect } from 'next/navigation';

import { BottomTabBar } from '@/components/ui/bottom-tab-bar';
import { CredentialEditForm } from '@/components/credential/credential-edit-form';
import { EntityFormPageLayout } from '@/components/shared/entity-form-page-layout';
import { serverApiGet } from '@/lib/api/server';
import type { UserCredential } from '@/models/credential';

type CredentialSecretResponse = {
  data?: {
    id: string;
    secret: string;
  };
  error?: string;
};

type EditCredentialPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCredentialPage({ params }: EditCredentialPageProps) {
  const { id } = await params;

  const { response, data: result } = await serverApiGet<{ data?: UserCredential; error?: string }>(
    `/api/credential/${id}`,
  );

  if (response.status === 401) {
    redirect(`/auth?next=/credential/${id}`);
  }

  if (!response.ok || !result?.data) {
    redirect('/credential?error=' + encodeURIComponent(result?.error || 'Credential not found'));
  }

  const { response: secretResponse, data: secretResult } = await serverApiGet<CredentialSecretResponse>(
    `/api/credential/${id}/secret`,
  );

  if (secretResponse.status === 401) {
    redirect(`/auth?next=/credential/${id}`);
  }

  const initialSecret = secretResponse.ok ? (secretResult?.data?.secret ?? '') : '';

  return (
    <>
      <EntityFormPageLayout
        pageTitle='Edit Credential'
        sectionTitle='Update Credential'
        sectionDescription='Edit your credential details.'
        backHref='/credential'
        backButtonLabel='Back to credentials'
        maxWidthClassName='max-w-4xl'
      >
        <CredentialEditForm credential={result.data} initialSecret={initialSecret} />
      </EntityFormPageLayout>
    </>
  );
}
