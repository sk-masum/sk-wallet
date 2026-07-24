import { useSyncExternalStore } from 'react'

import { isDocumentTypeCode } from '@/constants/document/types'
import { DocumentTypeCode } from '@/models/document'
import type { UserDocument } from '@/models/document'
import { getDocumentDisplayTypeLabel } from '@/utils/document/label'

export type DocumentSort = 'newest' | 'oldest' | 'name-asc' | 'name-desc'

type DocumentVaultFilters = {
  query?: string
  typeFilter?: string
  categoryFilter?: string
}

type DocumentVaultState = {
  documents: UserDocument[]
  query: string
  typeFilter: string
  categoryFilter: string
  sortBy: DocumentSort
  setDocuments: (documents: UserDocument[]) => void
  setFilters: (filters: DocumentVaultFilters) => void
  setSortBy: (sortBy: DocumentSort) => void
  removeDocument: (id: string) => void
}

export const DEFAULT_DOCUMENT_SORT: DocumentSort = 'newest'

const listeners = new Set<() => void>()

let store: DocumentVaultState

function notify() {
  listeners.forEach((listener) => listener())
}

function setStore(patch: Partial<DocumentVaultState>) {
  store = {
    ...store,
    ...patch,
  }
  notify()
}

store = {
  documents: [],
  query: '',
  typeFilter: 'ALL',
  categoryFilter: 'all',
  sortBy: DEFAULT_DOCUMENT_SORT,
  setDocuments(documents) {
    setStore({ documents })
  },
  setFilters(filters) {
    setStore({
      query: filters.query ?? store.query,
      typeFilter: filters.typeFilter ?? store.typeFilter,
      categoryFilter: filters.categoryFilter ?? store.categoryFilter,
    })
  },
  setSortBy(sortBy) {
    setStore({ sortBy })
  },
  removeDocument(id) {
    setStore({
      documents: store.documents.filter((doc) => doc.id !== id),
    })
  },
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return store
}

export function useDocumentVaultStore<T>(selector: (state: DocumentVaultState) => T) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  return selector(snapshot)
}

function sortDocuments(items: UserDocument[], sortBy: DocumentSort) {
  const sorted = [...items]

  if (sortBy === 'name-asc' || sortBy === 'name-desc') {
    sorted.sort((a, b) => {
      const aLabel = getDocumentDisplayTypeLabel(a.document_type, a.metadata).toLowerCase()
      const bLabel = getDocumentDisplayTypeLabel(b.document_type, b.metadata).toLowerCase()
      return sortBy === 'name-asc' ? aLabel.localeCompare(bLabel) : bLabel.localeCompare(aLabel)
    })
    return sorted
  }

  sorted.sort((a, b) => {
    const aTime = new Date(a.updated_at).getTime()
    const bTime = new Date(b.updated_at).getTime()
    return sortBy === 'oldest' ? aTime - bTime : bTime - aTime
  })

  return sorted
}

export function selectVisibleDocuments(state: DocumentVaultState) {
  const normalizedQuery = state.query.trim().toLowerCase()

  const filtered = state.documents.filter((doc) => {
    const filterableType = isDocumentTypeCode(doc.document_type) ? doc.document_type : DocumentTypeCode.OTHERS
    if (state.typeFilter !== 'ALL' && filterableType !== state.typeFilter) {
      return false
    }

    if (state.categoryFilter !== 'all' && String(doc.category ?? 'other').toLowerCase() !== state.categoryFilter) {
      return false
    }

    if (!normalizedQuery) return true

    const typeLabel = getDocumentDisplayTypeLabel(doc.document_type, doc.metadata)
    const searchable = [
      typeLabel,
      doc.document_type,
      doc.masked_number,
      doc.name_on_document ?? '',
    ]
      .join(' ')
      .toLowerCase()

    return searchable.includes(normalizedQuery)
  })

  return sortDocuments(filtered, state.sortBy)
}
