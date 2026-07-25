'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useDashboardFavorites } from '@/hooks/use-dashboard-favorites';
import { DocumentDetailsCard } from '@/components/doc/document-details-card';
import NoDocIcon from '@/components/icons/nodoc-icon';
import { DeleteConfirmDialog } from '@/components/shared/delete-confirm-dialog';
import { DetailDialogContent } from '@/components/shared/detail-dialog-content';
import { withVaultBootstrap } from '@/hoc/with-vault-bootstrap';
import { useDetailsErrorToast } from '@/hooks/use-details-error-toast';
import { useEntityDetailsDialog } from '@/hooks/use-entity-details-dialog';
import { useResetStateOnChange } from '@/hooks/use-reset-state-on-change';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { getDocumentCategoryLabel } from '@/constants/document/categories';
import { clientApiDelete, clientApiGet } from '@/lib/api/client';
import { selectVisibleDocuments, useDocumentVaultStore } from '@/lib/stores/document-vault-store';
import { showToast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import type { UserDocument } from '@/models/document';
import { getDocumentDisplayTypeLabel } from '@/utils/document/label';
import { DialogActions } from '../shared/dialog-actions';

type DocumentVaultProps = {
  initialDocuments: UserDocument[];
  initialError?: string;
};

function getCategoryBadgeClass(category: string) {
  if (category === 'personal') return 'bg-sky-500/15 text-sky-600 border-sky-500/30';
  if (category === 'professional') return 'bg-blue-500/15 text-blue-600 border-blue-500/30';
  if (category === 'education') return 'bg-violet-500/15 text-violet-600 border-violet-500/30';
  if (category === 'health') return 'bg-rose-500/15 text-rose-600 border-rose-500/30';
  if (category === 'financial') return 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30';
  if (category === 'legal') return 'bg-amber-500/15 text-amber-600 border-amber-500/30';
  if (category === 'family') return 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30';
  if (category === 'vehicle') return 'bg-red-500/15 text-red-600 border-red-500/30';
  if (category === 'travel') return 'bg-purple-500/15 text-purple-600 border-purple-500/30';
  return 'bg-muted text-text-subtle border-border';
}

function DocumentVaultContent({ initialDocuments, initialError = '' }: DocumentVaultProps) {
  const router = useRouter();
  const { hydrated, isFavorite, toggleFavorite } = useDashboardFavorites();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const documents = useDocumentVaultStore((state) => state.documents);
  const visibleDocuments = useDocumentVaultStore(selectVisibleDocuments);
  const removeDocument = useDocumentVaultStore((state) => state.removeDocument);

  const {
    selectedItem,
    setSelectedItem,
    detailData: selectedDocumentDetail,
    detailsError,
    dialogOpen,
    closeDialog,
  } = useEntityDetailsDialog<'document', UserDocument & { document_number?: string }>({
    fetchDetails: async (item) => {
      const { response, data } = await clientApiGet<{
        data?: UserDocument & { document_number?: string };
        error?: string;
      }>(`/api/document/${item.id}`);

      if (!response.ok || !data?.data) {
        throw new Error(data?.error || 'Failed to load document details.');
      }

      return data.data;
    },
    getErrorMessage: () => 'Failed to load document details.',
  });

  useResetStateOnChange(selectedItem?.id, setConfirmDeleteOpen, false);

  useDetailsErrorToast(detailsError);

  const selectedDocument = useMemo(() => {
    if (selectedDocumentDetail) return selectedDocumentDetail;
    if (!selectedItem) return null;

    return documents.find((doc) => doc.id === selectedItem.id) ?? null;
  }, [documents, selectedDocumentDetail, selectedItem]);

  const handleDelete = async () => {
    if (!selectedDocument || isDeleting) return;

    setIsDeleting(true);
    try {
      const { response, data } = await clientApiDelete<{ success?: boolean; error?: string }>(
        `/api/document/${selectedDocument.id}`,
      );

      if (!response.ok) {
        showToast({
          message: data?.error || 'Failed to delete document.',
          variant: 'error',
        });
        return;
      }

      showToast({
        message: 'Document deleted successfully.',
        variant: 'success',
      });

      setConfirmDeleteOpen(false);
      closeDialog();
      removeDocument(selectedDocument.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className='vault-listing-shell'>
      {visibleDocuments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>
              {documents.length === 0 ? 'No documents yet' : 'No matching documents'}
            </CardTitle>
            <CardDescription>
              {documents.length === 0
                ? 'Add Aadhaar, PAN, voter ID, driving license, or ration card details from the add document page.'
                : 'Try changing your search or type filter, or add a new document.'}
            </CardDescription>
          </CardHeader>
          {documents.length > 0 ? (
            <CardContent className='flex justify-center pb-6 pt-0'>
              <NoDocIcon className='h-28 w-full max-w-65' />
            </CardContent>
          ) : null}
        </Card>
      ) : (
        <div className='vault-list-grid'>
          {visibleDocuments.map((doc, index) => {
            const label = getDocumentDisplayTypeLabel(doc.document_type, doc.metadata);

            return (
              <button
                key={doc.id}
                type='button'
                className={cn('vault-list-item-trigger')}
                style={{ animationDelay: `${Math.min(index, 9) * 65}ms` }}
                onClick={() =>
                  setSelectedItem({ id: doc.id, type: 'document', href: `/doc/${doc.id}` })
                }
              >
                <Card className='vault-list-card'>
                  <CardHeader className='pb-2'>
                    <CardTitle className='line-clamp-1 text-base'>{label}</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2 pt-0'>
                    <p className='font-mono text-sm'>{doc.masked_number}</p>
                    <div className='flex items-center justify-between gap-2 text-xs text-text-subtle'>
                      <span className='truncate'>{doc.name_on_document || 'No name set'}</span>
                      <span
                        className={cn(
                          'inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize',
                          getCategoryBadgeClass(String(doc.category ?? 'other')),
                        )}
                      >
                        {getDocumentCategoryLabel(doc.category)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
        {selectedDocument ? (
          <DetailDialogContent>
            <DocumentDetailsCard
              document={{
                ...selectedDocument,
                ...(selectedDocumentDetail ? selectedDocumentDetail : {}),
              }}
              showActions
              actions={
                <DialogActions
                  handleDelete={() => setConfirmDeleteOpen(true)}
                  handleEdit={() => {
                    if (!selectedDocument) return;
                    router.push(`/doc/${selectedDocument.id}`);
                  }}
                  handleToggleFavorite={() => {
                    if (!selectedDocument) return;
                    toggleFavorite(`document:${selectedDocument.id}`);
                  }}
                  isSelectedFavorite={
                    hydrated && selectedDocument
                      ? isFavorite(`document:${selectedDocument.id}`)
                      : false
                  }
                  isProcessing={isDeleting}
                />
              }
            />
          </DetailDialogContent>
        ) : null}
      </Dialog>

      <DeleteConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={(open) => !isDeleting && setConfirmDeleteOpen(open)}
        title='Delete document?'
        description='This action cannot be undone.'
        confirmLabel='Delete'
        processingLabel='Deleting...'
        isProcessing={isDeleting}
        onConfirm={handleDelete}
      />
    </section>
  );
}

export const DocumentVault = withVaultBootstrap<DocumentVaultProps, UserDocument>(
  DocumentVaultContent,
  {
    useSetItems: () => useDocumentVaultStore((state) => state.setDocuments),
    getItems: (props) => props.initialDocuments,
    getError: (props) => props.initialError,
  },
);
