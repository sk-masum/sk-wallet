'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import NoDocIcon from '@/components/icons/nodoc-icon'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CopyButton } from '@/components/ui/copy-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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

function formatDateTime(value: string | null | undefined) {
  if (!value) return 'N/A'

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'N/A'

  return parsed.toLocaleString()
}

function getCategoryBadgeClass(category: string) {
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

export function DocumentVault({ initialDocuments, initialError = '' }: DocumentVaultProps) {
  const router = useRouter()
  const [documents, setDocuments] = useState<UserDocument[]>(initialDocuments)
  const [searchValue, setSearchValue] = useState('')
  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [selectedDocumentDetail, setSelectedDocumentDetail] = useState<
    (UserDocument & { document_number?: string }) | null
  >(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const sortedDocuments = useMemo(
    () => [...documents].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()),
    [documents]
  )

  const filteredDocuments = useMemo(() => {
    const query = searchValue.trim().toLowerCase()

    return sortedDocuments.filter((doc) => {
      if (selectedType !== 'ALL' && doc.document_type !== selectedType) {
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
  }, [searchValue, selectedType, sortedDocuments])

  const selectedDocument = useMemo(
    () => filteredDocuments.find((doc) => doc.id === selectedDocumentId) ?? null,
    [filteredDocuments, selectedDocumentId]
  )

  const handleDelete = async () => {
    if (!selectedDocument || isDeleting) return

    const shouldDelete = window.confirm('Delete this document record? This action cannot be undone.')
    if (!shouldDelete) return

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

      setSelectedDocumentId(null)
      router.refresh()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search by number, type, or name"
          className="sm:flex-1"
          aria-label="Search documents"
        />

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:ml-auto sm:w-56" aria-label="Filter by document type">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All types</SelectItem>
            {DOCUMENT_TYPE_OPTIONS.map((item) => (
              <SelectItem key={item.code} value={item.code}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
        <div className="grid gap-3 sm:grid-cols-2">
          {filteredDocuments.map((doc) => {
            const type = getDocumentTypeConfig(doc.document_type)
            const label = type?.label ?? doc.document_type

            return (
              <button key={doc.id} type="button" className="text-left" onClick={() => setSelectedDocumentId(doc.id)}>
                <Card className="transition-colors hover:border-primary/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{label}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {/* <p className="text-xs text-muted-foreground">ID</p> */}
                    <p className="font-mono text-sm">{doc.masked_number}</p>
                  </CardContent>
                </Card>
              </button>
            )
          })}
        </div>
      )}

      <Dialog open={Boolean(selectedDocument)} onOpenChange={(open) => !open && setSelectedDocumentId(null)}>
        {selectedDocument ? (
          <DialogContent className="max-sm:top-auto max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:border-x-0 max-sm:pb-6 max-sm:max-h-[85svh] max-sm:overflow-y-auto sm:max-h-[85vh]">
            <div className="mx-auto mb-1 h-1.5 w-10 rounded-full bg-muted sm:hidden" />
            <DialogHeader>
              <DialogTitle>{getDocumentTypeConfig(selectedDocument.document_type)?.label ?? selectedDocument.document_type}</DialogTitle>
              <DialogDescription>Updated {formatDateTime(selectedDocument.updated_at)}</DialogDescription>
            </DialogHeader>

            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-2">
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
                    'inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize',
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

              <div className="flex justify-end gap-2 pt-2">
                <Link
                  href={`/doc/${selectedDocument.id}`}
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  onClick={() => setSelectedDocumentId(null)}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className={cn(buttonVariants({ variant: 'destructive', size: 'sm' }))}
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </section>
  )
}
