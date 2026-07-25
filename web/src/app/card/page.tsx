import { redirect } from 'next/navigation';

import { CardMobileFilters } from '@/components/card/card-mobile-filters';
import { CardVault } from '@/components/card/card-vault';
import { ListingPageLayout } from '@/components/shared/listing-page-layout';
import { serverApiGet } from '@/lib/api/server';
import type { WalletCard } from '@/models/card';

export default async function CardPage() {
  const { response, data: result } = await serverApiGet<{ data?: WalletCard[]; error?: string }>(
    '/api/card',
  );

  if (response.status === 401) {
    redirect('/auth?next=/card');
  }

  const allCards = response.ok ? (result?.data ?? []) : [];
  const error = response.ok ? null : result?.error || 'Failed to load cards';

  return (
    <ListingPageLayout
      title='Cards'
      addLabel='Add card'
      addHref='/card/new'
      filters={<CardMobileFilters />}
    >
      <CardVault initialCards={allCards} initialError={error} />
    </ListingPageLayout>
  );
}
