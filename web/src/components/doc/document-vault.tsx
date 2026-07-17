'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, SlidersHorizontal, Trash2, X } from 'lucide-react'

import NoDocIcon from '@/components/icons/nodoc-icon'
import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Button, buttonVariants } from '@/components/ui/button'
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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

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
      <div className="sticky top-2 z-20 rounded-2xl border border-border/70 bg-background/80 p-2 backdrop-blur sm:hidden">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search documents"
              aria-label="Search documents"
              className="h-9 pr-10"
            />
            {searchValue ? (
              <button
                type="button"
                onClick={() => setSearchValue('')}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'icon' }),
                  'absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground'
                )}
                aria-label="Clear search"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-9 gap-2 rounded-full px-3"
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {selectedType !== 'ALL' ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                1
              </span>
            ) : null}
          </Button>
        </div>
      </div>

      <Dialog open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <DialogContent className="top-auto bottom-0 left-0 right-0 w-full max-w-none translate-x-0 translate-y-0 rounded-b-none border-x-0 pb-6 sm:hidden">
          <DialogHeader>
            <DialogTitle>Filter documents</DialogTitle>
            <DialogDescription>Refine by document type.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full" aria-label="Filter by document type">
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

            {selectedType !== 'ALL' || searchValue ? (
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setSelectedType('ALL')
                  setSearchValue('')
                  setMobileFilterOpen(false)
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <div className="hidden items-center gap-3 rounded-2xl border border-border/70 bg-background/80 p-3 backdrop-blur sm:flex">
        <div className="relative flex-1">
          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search by number, type, or name"
            className="pr-10"
            aria-label="Search documents"
          />
          {searchValue ? (
            <button
              type="button"
              onClick={() => setSearchValue('')}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground'
              )}
              aria-label="Clear search"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-56" aria-label="Filter by document type">
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

                  <div className="grid grid-cols-2 gap-2 pt-2">
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
                      onClick={handleDelete}
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
    </section>
  )
}
