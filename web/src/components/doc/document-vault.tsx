'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { HeartIcon, Pencil, Trash2 } from 'lucide-react'

import { useDashboardFavorites } from '@/components/dashboard/use-dashboard-favorites'
import { DocumentDetailsCard } from '@/components/doc/document-details-card'
import NoDocIcon from '@/components/icons/nodoc-icon'
import { DeleteConfirmDialog } from '@/components/shared/delete-confirm-dialog'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyButton } from '@/components/ui/copy-button'
import { Dialog } from '@/components/ui/dialog'
import { getDocumentCategoryLabel } from '@/constants/document/categories'
import { clientApiGet } from '@/lib/api/client'
import { clientApiDelete } from '@/lib/api/client'
import {
  selectVisibleDocuments,
  useDocumentVaultStore,
} from '@/lib/stores/document-vault-store'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { UserDocument } from '@/models/document'
import { getDocumentDisplayTypeLabel } from '@/utils/document/label'
import { responsiveIconSizes } from '../ui/icon-sizes'
import { DialogActions } from '../shared/dialog-actions'

type DocumentVaultProps = {
  initialDocuments: UserDocument[]
  initialError?: string
}

function getCategoryBadgeClass(category: string) {
  if (category === 'personal') return 'bg-sky-500/15 text-sky-600 border-sky-500/30'
  if (category === 'professional') return 'bg-blue-500/15 text-blue-600 border-blue-500/30'
  if (category === 'education') return 'bg-violet-500/15 text-violet-600 border-violet-500/30'
  if (category === 'health') return 'bg-rose-500/15 text-rose-600 border-rose-500/30'
  if (category === 'financial') return 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
  if (category === 'legal') return 'bg-amber-500/15 text-amber-600 border-amber-500/30'

  if (category === 'family') return 'bg-cyan-500/15 text-cyan-600 border-cyan-500/30'

  if (category === 'vehicle') return 'bg-red-500/15 text-red-600 border-red-500/30'

  if (category === 'travel') return 'bg-purple-500/15 text-purple-600 border-purple-500/30'
  return 'bg-muted text-muted-foreground border-border'
}


export function DocumentVault({ initialDocuments, initialError = '' }: DocumentVaultProps) {
  const router = useRouter()
  const { hydrated, isFavorite, toggleFavorite } = useDashboardFavorites()
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [selectedDocumentDetail, setSelectedDocumentDetail] = useState<
    (UserDocument & { document_number?: string }) | null
  >(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const documents = useDocumentVaultStore((state) => state.documents)
  const visibleDocuments = useDocumentVaultStore(selectVisibleDocuments)
  const setDocuments = useDocumentVaultStore((state) => state.setDocuments)
  const removeDocument = useDocumentVaultStore((state) => state.removeDocument)

  useEffect(() => {
    setDocuments(initialDocuments)
  }, [initialDocuments, setDocuments])

  useEffect(() => {
    if (!initialError) return

    showToast({
      message: initialError,
      variant: 'error',
    })
  }, [initialError])

  useEffect(() => {
    if (!selectedDocumentId) {
      setSelectedDocumentDetail(null)
      return
    }

    let cancelled = false

    const loadSelectedDocumentDetail = async () => {
      const { response, data } = await clientApiGet<{
        data?: UserDocument & { document_number?: string }
        error?: string
      }>(`/api/document/${selectedDocumentId}`)

      if (cancelled) return

      if (!response.ok || !data?.data) {
        showToast({
          message: data?.error || 'Failed to load document details.',
          variant: 'error',
        })
        return
      }

      setSelectedDocumentDetail(data.data)
    }

    void loadSelectedDocumentDetail()

    return () => {
      cancelled = true
    }
  }, [selectedDocumentId])

  useEffect(() => {
    setConfirmDeleteOpen(false)
  }, [selectedDocumentId])

  const selectedDocument = useMemo(
    () => documents.find((doc) => doc.id === selectedDocumentId) ?? null,
    [documents, selectedDocumentId]
  )

  const handleDelete = async () => {
    if (!selectedDocument || isDeleting) return

    setIsDeleting(true)
    try {
      const { response, data } = await clientApiDelete<{ success?: boolean; error?: string }>(
        `/api/document/${selectedDocument.id}`
      )

      if (!response.ok) {
        showToast({
          message: data?.error || 'Failed to delete document.',
          variant: 'error',
        })
        return
      }

      showToast({
        message: 'Document deleted successfully.',
        variant: 'success',
      })

      setConfirmDeleteOpen(false)
      setSelectedDocumentId(null)
      removeDocument(selectedDocument.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      {visibleDocuments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {documents.length === 0 ? 'No documents yet' : 'No matching documents'}
            </CardTitle>
            <CardDescription>
              {documents.length === 0
                ? 'Add Aadhaar, PAN, voter ID, driving license, or ration card details from the add document page.'
                : 'Try changing your search or type filter, or add a new document.'}
            </CardDescription>
          </CardHeader>
          {documents.length > 0 ? (
            <CardContent className="flex justify-center pb-6 pt-0">
              <NoDocIcon className="h-28 w-full max-w-65" />
            </CardContent>
          ) : null}
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDocuments.map((doc, index) => {
            const label = getDocumentDisplayTypeLabel(doc.document_type, doc.metadata)

            return (
              <button
                key={doc.id}
                type="button"
                className={cn(
                  'text-left transition-transform duration-300 ease-out hover:-translate-y-0.5',
                  'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500'
                )}
                style={{ animationDelay: `${Math.min(index, 9) * 65}ms` }}
                onClick={() => setSelectedDocumentId(doc.id)}
              >
                <Card className="group transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-1 text-base">{label}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <p className="font-mono text-sm">{doc.masked_number}</p>
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="truncate">{doc.name_on_document || 'No name set'}</span>
                      <span
                        className={cn(
                          'inline-flex shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize',
                          getCategoryBadgeClass(String(doc.category ?? 'other'))
                        )}
                      >
                        {getDocumentCategoryLabel(doc.category)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </button>
            )
          })}
        </div>
      )}

      <Dialog open={Boolean(selectedDocument)} onOpenChange={(open) => !open && setSelectedDocumentId(null)}>
        {selectedDocument ? (
          <DetailDialogContent>
            <DocumentDetailsCard
              document={{
                ...selectedDocument,
                ...(selectedDocumentDetail ? selectedDocumentDetail : {}),
              }}
              showActions
              actionsClassName="grid gap-2 grid-cols-3"
              actions={(
                <DialogActions
                  handleDelete={() => setConfirmDeleteOpen(true)}
                  handleEdit={() => {
                    if (!selectedDocument) return
                    router.push(`/doc/${selectedDocument.id}`)
                  }}
                  handleToggleFavorite={() => {
                    if (!selectedDocument) return
                    toggleFavorite(`document:${selectedDocument.id}`)
                  }}
                  isSelectedFavorite={hydrated && selectedDocument ? isFavorite(`document:${selectedDocument.id}`) : false}
                  isProcessing={isDeleting}
                />
              )}
            />
          </DetailDialogContent>
        ) : null}
      </Dialog>

      <DeleteConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={(open) => !isDeleting && setConfirmDeleteOpen(open)}
        title="Delete document?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        processingLabel="Deleting..."
        isProcessing={isDeleting}
        onConfirm={handleDelete}
      />
    </section>
  )
}
