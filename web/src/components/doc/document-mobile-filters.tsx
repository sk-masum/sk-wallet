'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CreditCard } from 'lucide-react'

import {
    ListingFilterDesktopActions,
    ListingFilterDesktopPanel,
    ListingFilterDesktopSection,
    ListingFilterMobileActions,
    ListingFilterMobileSection,
    ListingFilterMobileSheet,
} from '@/components/shared/listing-filter-panels'
import { ListingFilterTopBar } from '@/components/shared/listing-filter-topbar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DOCUMENT_CATEGORY_OPTIONS } from '@/constants/document/categories'
import { DOCUMENT_TYPE_OPTIONS } from '@/constants/document/types'
import {
    DEFAULT_DOCUMENT_SORT,
    type DocumentSort,
    useDocumentVaultStore,
} from '@/lib/stores/document-vault-store'

const DOCUMENT_SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
] as const

export function DocumentMobileFilters() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [desktopOpen, setDesktopOpen] = useState(false)
    const pathname = usePathname()
    const query = useDocumentVaultStore((state) => state.query)
    const selectedType = useDocumentVaultStore((state) => state.typeFilter)
    const selectedCategory = useDocumentVaultStore((state) => state.categoryFilter)
    const selectedSort = useDocumentVaultStore((state) => state.sortBy)
    const setFilters = useDocumentVaultStore((state) => state.setFilters)
    const setSortBy = useDocumentVaultStore((state) => state.setSortBy)

    const hasTextQuery = query.length > 0
    const hasTypeFilter = selectedType !== 'ALL'
    const hasCategoryFilter = selectedCategory !== 'all'
    const hasSortSelection = selectedSort !== DEFAULT_DOCUMENT_SORT
    const hasActiveControls = hasTextQuery || hasTypeFilter || hasCategoryFilter || hasSortSelection

    const clearAll = () => {
        setFilters({ query: '', typeFilter: 'ALL', categoryFilter: 'all' })
        setSortBy(DEFAULT_DOCUMENT_SORT)
    }

    const handleTypeChange = (value: string) => {
        setFilters({ typeFilter: value })
    }

    const handleCategoryChange = (value: string) => {
        setFilters({ categoryFilter: value })
    }

    const handleSortChange = (value: string) => {
        setSortBy(value as DocumentSort)
    }

    return (
        <>
            <ListingFilterTopBar
                formAction={pathname}
                searchValue={query}
                searchMode="controlled"
                onSearchChange={(value) => setFilters({ query: value })}
                onClearSearch={() => setFilters({ query: '' })}
                mobileSearchPlaceholder="Search documents"
                desktopSearchPlaceholder="Search by number, type, or name"
                mobileSearchAriaLabel="Search documents"
                desktopSearchAriaLabel="Search documents"
                mobileFilterCount={Number(hasTypeFilter) + Number(hasCategoryFilter) + Number(hasSortSelection)}
                onOpenMobileFilters={() => setMobileOpen(true)}
                hasTextQuery={hasTextQuery}
                hasActiveControls={hasActiveControls}
                onResetAll={clearAll}
                desktopFilterOpen={desktopOpen}
                onToggleDesktopFilters={() => setDesktopOpen((prev) => !prev)}
                desktopExpandedClassName=""
                desktopPanel={
                    <ListingFilterDesktopPanel>
                        <div className="grid grid-cols-2 gap-4">
                            <ListingFilterDesktopSection label="Type">
                                <Select value={selectedType} onValueChange={handleTypeChange}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by document type">
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
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Category">
                                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by document category">
                                        <SelectValue placeholder="Filter by category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All categories</SelectItem>
                                        {DOCUMENT_CATEGORY_OPTIONS.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </ListingFilterDesktopSection>
                        </div>

                        <ListingFilterDesktopSection label="Sort">
                            <Select value={selectedSort} onValueChange={handleSortChange}>
                                <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Sort documents">
                                    <SelectValue placeholder="Newest first" />
                                </SelectTrigger>
                                <SelectContent>
                                    {DOCUMENT_SORT_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </ListingFilterDesktopSection>

                        <ListingFilterDesktopActions
                            hasActiveControls={hasActiveControls}
                            onReset={clearAll}
                            onCollapse={() => setDesktopOpen(false)}
                        />
                    </ListingFilterDesktopPanel>
                }
            />

            <ListingFilterMobileSheet
                open={mobileOpen}
                onOpenChange={setMobileOpen}
                title="Refine documents"
                description="Apply document filters in one place."
            >
                <ListingFilterMobileSection label="Type" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedType} onValueChange={handleTypeChange}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by document type">
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
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Category" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by document category">
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All categories</SelectItem>
                            {DOCUMENT_CATEGORY_OPTIONS.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Sort" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedSort} onValueChange={handleSortChange}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Sort documents">
                            <SelectValue placeholder="Newest first" />
                        </SelectTrigger>
                        <SelectContent>
                            {DOCUMENT_SORT_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileActions
                    hasActiveControls={hasActiveControls}
                    onReset={clearAll}
                    onDone={() => setMobileOpen(false)}
                />
            </ListingFilterMobileSheet>
        </>
    )
}
