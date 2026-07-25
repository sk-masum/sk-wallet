import { redirect } from 'next/navigation';

import { CredentialVault } from '@/components/credential/credential-vault';
import { CredentialMobileFilters } from '@/components/credential/credential-mobile-filters';
import { ListingPageLayout } from '@/components/shared/listing-page-layout';
import { serverApiGet } from '@/lib/api/server';
import type { UserCredential } from '@/models/credential';

export default async function CredentialPage() {
  const { response, data: result } = await serverApiGet<{
    data?: UserCredential[];
    error?: string;
  }>('/api/credential');

  if (response.status === 401) {
    redirect('/auth?next=/credential');
  }

  const credentials = response.ok ? (result?.data ?? []) : [];
  const credentialFetchError = response.ok ? '' : result?.error || 'Failed to load credentials.';

  return (
    <ListingPageLayout
      title='Credentials'
      addLabel='Add credential'
      addHref='/credential/new'
      filters={<CredentialMobileFilters />}
    >
      <CredentialVault initialCredentials={credentials} initialError={credentialFetchError} />
    </ListingPageLayout>
  );
}
