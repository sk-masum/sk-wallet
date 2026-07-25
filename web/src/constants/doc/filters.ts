import type { DocumentSort } from '@/lib/stores/document-vault-store'
import type { FilterOptions } from '@/models/filter'

export const DOCUMENT_SORT_OPTIONS: FilterOptions<DocumentSort> = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
]
