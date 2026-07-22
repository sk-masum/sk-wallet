'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pencil, Star, Trash2 } from 'lucide-react'

import { useDashboardFavorites } from '@/components/dashboard/use-dashboard-favorites'
import NoDocIcon from '@/components/icons/nodoc-icon'
import { DeleteConfirmDialog } from '@/components/shared/delete-confirm-dialog'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyButton } from '@/components/ui/copy-button'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { getDocumentCategoryLabel } from '@/constants/document/categories'
import { DOCUMENT_TYPE_OPTIONS, getDocumentTypeConfig } from '@/constants/document/types'
import { clientApiGet } from '@/lib/api/client'
import { clientApiDelete } from '@/lib/api/client'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import type { UserDocument } from '@/models/document'

type DocumentVaultProps = {
  initialDocuments: UserDocument[]
  initialError?: string
}

const RESERVED_METADATA_KEYS = new Set([
  'issued_date',
  'expiry_date',
  'address',
  'guardian_name',
  'other_details',
  'custom_fields',
])

function formatDateTime(value: string | null | undefined) {
  if (!value) return 'N/A'

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'N/A'

  return parsed.toLocaleString()
}

function getCategoryBadgeClass(category: string) {
  if (category === 'personal') return 'bg-sky-500/15 text-sky-600 border-sky-500/30'
  if (category === 'professional') return 'bg-blue-500/15 text-blue-600 border-blue-500/30'
  if (category === 'education') return 'bg-violet-500/15 text-violet-600 border-violet-500/30'
  if (category === 'health') return 'bg-rose-500/15 text-rose-600 border-rose-500/30'
  if (category === 'financial') return 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
  if (category === 'legal') return 'bg-amber-500/15 text-amber-600 border-amber-500/30'
  return 'bg-muted text-muted-foreground border-border'
}

function getMetadataText(metadata: Record<string, unknown> | null | undefined, key: string) {
  if (!metadata) return ''
  const value = metadata[key]
  if (typeof value !== 'string') return ''
  return value.trim()
}

function getCustomMetadataEntries(metadata: Record<string, unknown> | null | undefined) {
  if (!metadata) return []

  return Object.entries(metadata)
    .filter(([key, value]) => {
      if (RESERVED_METADATA_KEYS.has(key)) return false
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
    })
    .map(([key, value]) => ({
      key,
      label: key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
      value: String(value).trim(),
    }))
    .filter((item) => item.value.length > 0)
}

export function DocumentVault({ initialDocuments, initialError = '' }: DocumentVaultProps) {
  const router = useRouter()
  const { hydrated, isFavorite, toggleFavorite } = useDashboardFavorites()
  const searchParams = useSearchParams()
  const [documents, setDocuments] = useState<UserDocument[]>(initialDocuments)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
  const [selectedDocumentDetail, setSelectedDocumentDetail] = useState<
    (UserDocument & { document_number?: string }) | null
  >(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const searchValue = (searchParams.get('q') ?? '').trim()
  const selectedTypeParam = (searchParams.get('type') ?? 'ALL').trim().toUpperCase()
  const selectedCategory = (searchParams.get('category') ?? 'all').trim().toLowerCase()
  const selectedSortParam = (searchParams.get('sort') ?? 'newest').trim().toLowerCase()
  const selectedType = DOCUMENT_TYPE_OPTIONS.some((item) => item.code === selectedTypeParam)
    ? selectedTypeParam
    : 'ALL'
  const selectedSort =
    selectedSortParam === 'oldest' || selectedSortParam === 'name-asc' || selectedSortParam === 'name-desc'
      ? selectedSortParam
      : 'newest'

  useEffect(() => {
    setDocuments(initialDocuments)
  }, [initialDocuments])

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

  const sortedDocuments = useMemo(
    () => [...documents].sort((a, b) => {
      if (selectedSort === 'name-asc' || selectedSort === 'name-desc') {
        const aLabel = (getDocumentTypeConfig(a.document_type)?.label ?? a.document_type).toLowerCase()
        const bLabel = (getDocumentTypeConfig(b.document_type)?.label ?? b.document_type).toLowerCase()
        return selectedSort === 'name-asc' ? aLabel.localeCompare(bLabel) : bLabel.localeCompare(aLabel)
      }

      const aTime = new Date(a.updated_at).getTime()
      const bTime = new Date(b.updated_at).getTime()
      return selectedSort === 'oldest' ? aTime - bTime : bTime - aTime
    }),
    [documents, selectedSort]
  )

  const filteredDocuments = useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    return sortedDocuments.filter((doc) => {
      if (selectedType !== 'ALL' && doc.document_type !== selectedType) {
        return false
      }

      if (selectedCategory !== 'all' && String(doc.category ?? 'other').toLowerCase() !== selectedCategory) {
        return false
      }

      if (!query) return true

      const typeLabel = getDocumentTypeConfig(doc.document_type)?.label ?? doc.document_type
      const searchable = [
        typeLabel,
        doc.document_type,
        doc.masked_number,
        doc.name_on_document ?? '',
      ]
        .join(' ')
        .toLowerCase()

      return searchable.includes(query)
    })
  }, [searchValue, selectedCategory, selectedType, sortedDocuments])

  const selectedDocument = useMemo(
    () => filteredDocuments.find((doc) => doc.id === selectedDocumentId) ?? null,
    [filteredDocuments, selectedDocumentId]
  )

  const detailCustomMetadata = useMemo(
    () => getCustomMetadataEntries(selectedDocument?.metadata),
    [selectedDocument?.metadata]
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
      router.refresh()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      {filteredDocuments.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {sortedDocuments.length === 0 ? 'No documents yet' : 'No matching documents'}
            </CardTitle>
            <CardDescription>
              {sortedDocuments.length === 0
                ? 'Add Aadhaar, PAN, voter ID, driving license, or ration card details from the add document page.'
                : 'Try changing your search or type filter, or add a new document.'}
            </CardDescription>
          </CardHeader>
          {sortedDocuments.length > 0 ? (
            <CardContent className="flex justify-center pb-6 pt-0">
              <NoDocIcon className="h-28 w-full max-w-65" />
            </CardContent>
          ) : null}
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc, index) => {
            const type = getDocumentTypeConfig(doc.document_type)
            const label = type?.label ?? doc.document_type

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
            <div>
              <div className="space-y-3 rounded-xl border border-border bg-background p-4 text-sm shadow-xl backdrop-blur-md">
                <DialogHeader>
                  <DialogTitle>
                    {getDocumentTypeConfig(selectedDocument.document_type)?.label ?? selectedDocument.document_type}
                  </DialogTitle>
                  <DialogDescription>Updated {formatDateTime(selectedDocument.updated_at)}</DialogDescription>
                </DialogHeader>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">Category</p>
                      <CopyButton
                        value={getDocumentCategoryLabel(String(selectedDocument.category ?? 'other'))}
                        label="Category"
                        className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                        showStatusIcon
                        copyIconClassName="h-3.5 w-3.5"
                        checkIconClassName="h-3.5 w-3.5 text-green-600"
                      />
                    </div>
                    <span
                      className={cn(
                        'mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
                        getCategoryBadgeClass(String(selectedDocument.category ?? 'other'))
                      )}
                    >
                      {getDocumentCategoryLabel(String(selectedDocument.category ?? 'other'))}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">Document number</p>
                      <CopyButton
                        value={selectedDocumentDetail?.document_number || selectedDocument.masked_number}
                        label="Document number"
                        className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                        showStatusIcon
                        copyIconClassName="h-3.5 w-3.5"
                        checkIconClassName="h-3.5 w-3.5 text-green-600"
                      />
                    </div>
                    <p className="font-mono">
                      {selectedDocumentDetail?.document_number || selectedDocument.masked_number}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">Name on document</p>
                      <CopyButton
                        value={selectedDocument.name_on_document || ''}
                        label="Name on document"
                        className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                        showStatusIcon
                        copyIconClassName="h-3.5 w-3.5"
                        checkIconClassName="h-3.5 w-3.5 text-green-600"
                      />
                    </div>
                    <p>{selectedDocument.name_on_document || 'N/A'}</p>
                  </div>

                  {getMetadataText(selectedDocument.metadata, 'issued_date') ? (
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">Issued date</p>
                        <CopyButton
                          value={getMetadataText(selectedDocument.metadata, 'issued_date')}
                          label="Issued date"
                          className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                          showStatusIcon
                          copyIconClassName="h-3.5 w-3.5"
                          checkIconClassName="h-3.5 w-3.5 text-green-600"
                        />
                      </div>
                      <p>{getMetadataText(selectedDocument.metadata, 'issued_date')}</p>
                    </div>
                  ) : null}

                  {getMetadataText(selectedDocument.metadata, 'expiry_date') ? (
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">Expiry date</p>
                        <CopyButton
                          value={getMetadataText(selectedDocument.metadata, 'expiry_date')}
                          label="Expiry date"
                          className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                          showStatusIcon
                          copyIconClassName="h-3.5 w-3.5"
                          checkIconClassName="h-3.5 w-3.5 text-green-600"
                        />
                      </div>
                      <p>{getMetadataText(selectedDocument.metadata, 'expiry_date')}</p>
                    </div>
                  ) : null}

                  {getMetadataText(selectedDocument.metadata, 'guardian_name') ? (
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">Guardian name</p>
                        <CopyButton
                          value={getMetadataText(selectedDocument.metadata, 'guardian_name')}
                          label="Guardian name"
                          className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                          showStatusIcon
                          copyIconClassName="h-3.5 w-3.5"
                          checkIconClassName="h-3.5 w-3.5 text-green-600"
                        />
                      </div>
                      <p>{getMetadataText(selectedDocument.metadata, 'guardian_name')}</p>
                    </div>
                  ) : null}

                  {getMetadataText(selectedDocument.metadata, 'address') ? (
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">Address</p>
                        <CopyButton
                          value={getMetadataText(selectedDocument.metadata, 'address')}
                          label="Address"
                          className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                          showStatusIcon
                          copyIconClassName="h-3.5 w-3.5"
                          checkIconClassName="h-3.5 w-3.5 text-green-600"
                        />
                      </div>
                      <p>{getMetadataText(selectedDocument.metadata, 'address')}</p>
                    </div>
                  ) : null}

                  {getMetadataText(selectedDocument.metadata, 'other_details') ? (
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground">Other details</p>
                        <CopyButton
                          value={getMetadataText(selectedDocument.metadata, 'other_details')}
                          label="Other details"
                          className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                          showStatusIcon
                          copyIconClassName="h-3.5 w-3.5"
                          checkIconClassName="h-3.5 w-3.5 text-green-600"
                        />
                      </div>
                      <p className="whitespace-pre-wrap">{getMetadataText(selectedDocument.metadata, 'other_details')}</p>
                    </div>
                  ) : null}

                  {detailCustomMetadata.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Custom fields</p>
                      <div className="space-y-2">
                        {detailCustomMetadata.map((item) => (
                          <div key={item.key}>
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs text-muted-foreground">{item.label}</p>
                              <CopyButton
                                value={item.value}
                                label={item.label}
                                className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                                showStatusIcon
                                copyIconClassName="h-3.5 w-3.5"
                                checkIconClassName="h-3.5 w-3.5 text-green-600"
                              />
                            </div>
                            <p className="whitespace-pre-wrap">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(`document:${selectedDocument.id}`)}
                    >
                      <Star
                        className={cn(
                          'mr-1 h-4 w-4',
                          hydrated && isFavorite(`document:${selectedDocument.id}`)
                            ? 'fill-amber-500 text-amber-500'
                            : ''
                        )}
                      />
                      {hydrated && isFavorite(`document:${selectedDocument.id}`)
                        ? 'Unfavourite'
                        : 'Favourite'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedDocumentId(null)
                        router.push(`/doc/${selectedDocument.id}`)
                      }}
                    >
                      <Pencil className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setConfirmDeleteOpen(true)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
