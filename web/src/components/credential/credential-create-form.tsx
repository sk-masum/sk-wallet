'use client';

import { useRouter } from 'next/navigation';

import { CredentialForm } from '@/components/credential/credential-form';
import { clientApiPost } from '@/lib/api/client';
import { showToast } from '@/lib/toast';
import type { CredentialFormPayload, UserCredential } from '@/models/credential';

type SaveCredentialResponse = {
  success?: boolean;
  error?: string;
  data?: Partial<UserCredential>;
};

export function CredentialCreateForm() {
  const router = useRouter();

  const handleSave = async (payload: CredentialFormPayload) => {
    const { response, data } = await clientApiPost<SaveCredentialResponse>(
      '/api/credential',
      payload,
    );

    if (!response.ok) {
      showToast({
        message: data?.error || 'Failed to save credential. Please try again.',
        variant: 'error',
      });
      return;
    }

    router.push(`/credential?success=${encodeURIComponent('Credential saved successfully.')}`);
  };

  return <CredentialForm submitLabel='Save credential' onSubmit={handleSave} />;
}
