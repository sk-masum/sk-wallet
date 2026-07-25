'use client';

import { useRouter } from 'next/navigation';

import { CredentialForm } from '@/components/credential/credential-form';
import { clientApiPut } from '@/lib/api/client';
import { showToast } from '@/lib/toast';
import type { CredentialFormPayload, UserCredential } from '@/models/credential';

type CredentialEditFormProps = {
  credential: UserCredential;
};

export function CredentialEditForm({ credential }: CredentialEditFormProps) {
  const router = useRouter();

  const handleSave = async (payload: CredentialFormPayload) => {
    const { response, data } = await clientApiPut<{ success?: boolean; error?: string }>(
      `/api/credential/${credential.id}`,
      payload,
    );

    if (!response.ok) {
      showToast({
        message: data?.error || 'Failed to update credential.',
        variant: 'error',
      });
      return;
    }

    showToast({
      message: 'Credential updated successfully.',
      variant: 'success',
    });

    router.push('/credential');
    router.refresh();
  };

  return (
    <CredentialForm
      submitLabel='Save changes'
      showReset={false}
      lockTypeField={false}
      allowEmptySecret
      initialValues={{
        type: credential.credential_type,
        serviceName: credential.service_name,
        identifier: String(credential.identifier ?? ''),
        secret: '',
        url: String(credential.url ?? ''),
        notes: String(credential.notes ?? ''),
      }}
      onSubmit={handleSave}
    />
  );
}
