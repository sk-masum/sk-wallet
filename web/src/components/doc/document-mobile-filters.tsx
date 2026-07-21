'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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

type DocumentMobileFiltersProps = {
    query: string
    selectedType: string
    selectedCategory: string
    selectedSort: 'newest' | 'oldest' | 'name-asc' | 'name-desc'
}

const DOCUMENT_SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
] as const

export function DocumentMobileFilters({ query, selectedType, selectedCategory, selectedSort }: DocumentMobileFiltersProps) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [desktopOpen, setDesktopOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const hasTextQuery = query.length > 0
    const hasTypeFilter = selectedType !== 'ALL'
    const hasCategoryFilter = selectedCategory !== 'all'
    const hasSortSelection = selectedSort !== 'newest'
    const hasActiveControls = hasTextQuery || hasTypeFilter || hasCategoryFilter || hasSortSelection

    const clearSearchHref = useMemo(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('q')
        const serialized = params.toString()
        return serialized ? `${pathname}?${serialized}` : pathname
    }, [pathname, searchParams])

    const clearAllHref = pathname

    const handleTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'ALL') {
            params.delete('type')
        } else {
            params.set('type', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    const handleCategoryChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'all') {
            params.delete('category')
        } else {
            params.set('category', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'newest') {
            params.delete('sort')
        } else {
            params.set('sort', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    return (
        <>
            <ListingFilterTopBar
                formAction={pathname}
                searchValue={query}
                searchMode="form"
                clearSearchHref={clearSearchHref}
                searchInputName="q"
                searchHiddenFields={
                    <>
                        {hasTypeFilter ? <input type="hidden" name="type" value={selectedType} /> : null}
                        {hasCategoryFilter ? <input type="hidden" name="category" value={selectedCategory} /> : null}
                        {hasSortSelection ? <input type="hidden" name="sort" value={selectedSort} /> : null}
                    </>
                }
                mobileSearchPlaceholder="Search documents"
                desktopSearchPlaceholder="Search by number, type, or name"
                mobileSearchAriaLabel="Search documents"
                desktopSearchAriaLabel="Search documents"
                mobileFilterCount={Number(hasTypeFilter) + Number(hasCategoryFilter) + Number(hasSortSelection)}
                onOpenMobileFilters={() => setMobileOpen(true)}
                hasTextQuery={hasTextQuery}
                hasActiveControls={hasActiveControls}
                resetHref={clearAllHref}
                desktopFilterOpen={desktopOpen}
                onToggleDesktopFilters={() => setDesktopOpen((prev) => !prev)}
                desktopExpandedClassName="max-h-[700px]"
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
                            resetHref={clearAllHref}
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
                    resetHref={clearAllHref}
                    onDone={() => setMobileOpen(false)}
                />
            </ListingFilterMobileSheet>
        </>
    )
}
