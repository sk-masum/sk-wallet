'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, KeyRound, LoaderCircle } from 'lucide-react';

import { CredentialDetailsCard } from '@/components/credential/credential-details-card';
import { MiniVerticalCarouselCard } from '@/components/dashboard/mini-vertical-carousel-card';
import { DocumentDetailsCard } from '@/components/doc/document-details-card';
import { SharedCarouselSection } from '@/components/dashboard/shared-carousel-section';
import { DetailDialogContent } from '@/components/shared/detail-dialog-content';
import {
  DetailDialogBody,
  DetailDialogErrorState,
  DetailDialogLoadingNotice,
} from '@/components/shared/detail-dialog-states';
import { useEntityDetailsDialog } from '@/hooks/use-entity-details-dialog';
import { Dialog } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { SURFACE_REVEAL_CLASS } from '@/constants/ui/animation';
import { clientApiGet } from '@/lib/api/client';
import type { UserCredential } from '@/models/credential';
import type { DashboardFavoriteVaultItem } from '@/models/dashboard';
import type { UserDocument } from '@/models/document';
import { getDocumentDisplayTypeLabel } from '@/utils/document/label';

type CredentialDetailsResponse = {
  data?: UserCredential;
  error?: string;
};

type DocumentDetails = UserDocument & {
  document_number?: string;
};

type DocumentDetailsResponse = {
  data?: DocumentDetails;
  error?: string;
};

type SelectedVaultItem = {
  id: string;
  type: DashboardFavoriteVaultItem['type'];
  href: string;
};

type FavoriteDetailData =
  | { kind: 'credential'; credential: UserCredential }
  | { kind: 'document'; document: DocumentDetails };

type FavoriteVaultCarouselProps = {
  title: string;
  actionHref: string;
  actionLabel: string;
  itemTypeLabel: string;
  emptyMessage: string;
  items: DashboardFavoriteVaultItem[];
};

export function FavoriteVaultCarousel({
  title,
  actionHref,
  actionLabel,
  itemTypeLabel,
  emptyMessage,
  items,
}: FavoriteVaultCarouselProps) {
  const router = useRouter();
  const fetchDetails = useCallback(async (item: SelectedVaultItem): Promise<FavoriteDetailData> => {
    if (item.type === 'credential') {
      const { response, data } = await clientApiGet<CredentialDetailsResponse>(
        `/api/credential/${item.id}`,
      );

      if (!response.ok || !data?.data) {
        throw new Error(data?.error || 'Unable to load credential details.');
      }

      return { kind: 'credential', credential: data.data };
    }

    const { response, data } = await clientApiGet<DocumentDetailsResponse>(
      `/api/document/${item.id}`,
    );

    if (!response.ok || !data?.data) {
      throw new Error(data?.error || 'Unable to load document details.');
    }

    return { kind: 'document', document: data.data };
  }, []);

  const {
    selectedItem,
    setSelectedItem,
    detailData,
    loadingDetails,
    detailsError,
    dialogOpen,
    closeDialog,
  } = useEntityDetailsDialog<DashboardFavoriteVaultItem['type'], FavoriteDetailData>({
    fetchDetails,
    getErrorMessage: (item) =>
      item.type === 'credential'
        ? 'Unable to load credential details.'
        : 'Unable to load document details.',
  });

  return (
    <>
      <SharedCarouselSection
        title={title}
        actionHref={actionHref}
        actionLabel={actionLabel}
        emptyMessage={emptyMessage}
        items={items}
        getItemKey={(item) => `${item.type}-${item.id}`}
        renderItem={(item) => (
          <MiniVerticalCarouselCard
            href={item.href}
            onClick={() => setSelectedItem({ id: item.id, type: item.type, href: item.href })}
            title={item.title}
            subtitle={item.subtitle}
            className='min-w-44'
            leadingMedia={
              item.type === 'document' && (
                <div className='uppercase text-xs'>
                  {getDocumentDisplayTypeLabel(item.document_type, item.metadata)}
                </div>
              )
            }
            media={
              item.type === 'document' ? (
                <FileText className='h-6 w-6 text-foreground/80' />
              ) : (
                <KeyRound className='h-6 w-6 text-foreground/80' />
              )
            }
          />
        )}
      />

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        <DetailDialogContent>
          {loadingDetails ? (
            <DetailDialogBody>
              <div className='rounded-2xl border border-border/65 bg-background/95 px-4 pb-5 pt-4 shadow-xl sm:px-5'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <Skeleton className='h-3 w-28' />
                    <Skeleton className='h-3 w-18' />
                  </div>
                  <div className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-muted/40'>
                    {selectedItem?.type === 'credential' ? (
                      <KeyRound className='h-4 w-4 text-text-subtle' />
                    ) : (
                      <FileText className='h-4 w-4 text-text-subtle' />
                    )}
                  </div>
                </div>

                <div className='mt-6 space-y-3'>
                  <Skeleton className='h-5 w-46 rounded' />
                  <Skeleton className='h-4 w-34 rounded' />
                </div>

                <div className='mt-7 grid grid-cols-2 gap-3'>
                  <div className='space-y-1.5'>
                    <Skeleton className='h-2.5 w-16' />
                    <Skeleton className='h-3.5 w-24' />
                  </div>
                  <div className='space-y-1.5 text-right'>
                    <Skeleton className='ml-auto h-2.5 w-14' />
                    <Skeleton className='ml-auto h-3.5 w-20' />
                  </div>
                </div>
              </div>

              <DetailDialogLoadingNotice
                message={
                  selectedItem?.type === 'credential'
                    ? 'Preparing secure credential details...'
                    : 'Preparing secure document details...'
                }
              />
            </DetailDialogBody>
          ) : detailsError ? (
            <DetailDialogErrorState
              message={detailsError}
              actionLabel='Open full page'
              onAction={() => selectedItem && router.push(selectedItem.href)}
            />
          ) : detailData?.kind === 'credential' ? (
            <CredentialDetailsCard
              credential={detailData.credential}
              title='Credential details'
              className={SURFACE_REVEAL_CLASS}
            />
          ) : detailData?.kind === 'document' ? (
            <DocumentDetailsCard
              document={detailData.document}
              className={`mx-auto w-full max-w-120 ${SURFACE_REVEAL_CLASS}`}
              showActions
            />
          ) : null}
        </DetailDialogContent>
      </Dialog>
    </>
  );
}
