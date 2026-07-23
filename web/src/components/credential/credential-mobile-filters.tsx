'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowUpDown, CreditCard } from 'lucide-react'

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
import { CREDENTIAL_TYPE_OPTIONS } from '@/constants/credential/types'
import { DEFAULT_CREDENTIAL_SORT, useCredentialVaultStore, type CredentialSort } from '@/lib/stores/credential-vault-store'

const CREDENTIAL_SORT_OPTIONS: ReadonlyArray<{ value: CredentialSort; label: string }> = [
    { value: DEFAULT_CREDENTIAL_SORT, label: 'Last updated (newest)' },
    { value: 'updated_asc', label: 'Last updated (oldest)' },
    { value: 'service_asc', label: 'Service name (A-Z)' },
    { value: 'service_desc', label: 'Service name (Z-A)' },
]

export function CredentialMobileFilters() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [desktopOpen, setDesktopOpen] = useState(false)
    const pathname = usePathname()
    const query = useCredentialVaultStore((state) => state.query)
    const selectedType = useCredentialVaultStore((state) => state.typeFilter)
    const selectedSort = useCredentialVaultStore((state) => state.sortBy)
    const setFilters = useCredentialVaultStore((state) => state.setFilters)
    const setSortBy = useCredentialVaultStore((state) => state.setSortBy)

    const hasTextQuery = query.length > 0
    const hasTypeFilter = selectedType !== 'ALL'
    const hasSortOverride = selectedSort !== DEFAULT_CREDENTIAL_SORT
    const hasActiveControls = hasTextQuery || hasTypeFilter || hasSortOverride

    const clearAll = () => {
        setFilters({ query: '', typeFilter: 'ALL' })
        setSortBy(DEFAULT_CREDENTIAL_SORT)
    }

    const handleTypeChange = (value: string) => {
        setFilters({ typeFilter: value })
    }

    return (
        <>
            <ListingFilterTopBar
                formAction={pathname}
                searchValue={query}
                searchMode="controlled"
                onSearchChange={(value) => setFilters({ query: value })}
                onClearSearch={() => setFilters({ query: '' })}
                mobileSearchPlaceholder="Search credentials"
                desktopSearchPlaceholder="Search credentials by service, identifier, or type"
                mobileSearchAriaLabel="Search credentials"
                desktopSearchAriaLabel="Search credentials"
                mobileFilterCount={hasTypeFilter ? 1 : 0}
                onOpenMobileFilters={() => setMobileOpen(true)}
                hasTextQuery={hasTextQuery}
                hasActiveControls={hasActiveControls}
                onResetAll={clearAll}
                desktopFilterOpen={desktopOpen}
                onToggleDesktopFilters={() => setDesktopOpen((prev) => !prev)}
                desktopExpandedClassName=""
                desktopPanel={
                    <ListingFilterDesktopPanel>
                        <ListingFilterDesktopSection label="Credential type">
                            <Select value={selectedType} onValueChange={handleTypeChange}>
                                <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by credential type">
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All types</SelectItem>
                                    {CREDENTIAL_TYPE_OPTIONS.map((item) => (
                                        <SelectItem key={item.code} value={item.code}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </ListingFilterDesktopSection>

                        <ListingFilterDesktopSection label="Sort">
                            <Select value={selectedSort} onValueChange={(value) => setSortBy(value as CredentialSort)}>
                                <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Sort credentials">
                                    <SelectValue placeholder="Sort credentials" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CREDENTIAL_SORT_OPTIONS.map((option) => (
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
                title="Refine credentials"
                description="Apply credential filters in one place."
            >
                <ListingFilterMobileSection label="Type" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedType} onValueChange={handleTypeChange}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by credential type">
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All types</SelectItem>
                            {CREDENTIAL_TYPE_OPTIONS.map((item) => (
                                <SelectItem key={item.code} value={item.code}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Sort" icon={<ArrowUpDown className="h-3.5 w-3.5" />}>
                    <Select value={selectedSort} onValueChange={(value) => setSortBy(value as CredentialSort)}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Sort credentials">
                            <SelectValue placeholder="Sort credentials" />
                        </SelectTrigger>
                        <SelectContent>
                            {CREDENTIAL_SORT_OPTIONS.map((option) => (
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
