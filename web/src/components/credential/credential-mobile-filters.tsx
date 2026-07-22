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
import { CREDENTIAL_TYPE_OPTIONS } from '@/constants/credential/types'

type CredentialMobileFiltersProps = {
    query: string
    selectedType: string
}

export function CredentialMobileFilters({ query, selectedType }: CredentialMobileFiltersProps) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [desktopOpen, setDesktopOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const hasTextQuery = query.length > 0
    const hasTypeFilter = selectedType !== 'ALL'
    const hasActiveControls = hasTextQuery || hasTypeFilter

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

    return (
        <>
            <ListingFilterTopBar
                formAction={pathname}
                searchValue={query}
                searchMode="form"
                clearSearchHref={clearSearchHref}
                searchInputName="q"
                searchHiddenFields={hasTypeFilter ? <input type="hidden" name="type" value={selectedType} /> : null}
                mobileSearchPlaceholder="Search credentials"
                desktopSearchPlaceholder="Search credentials by service, identifier, or type"
                mobileSearchAriaLabel="Search credentials"
                desktopSearchAriaLabel="Search credentials"
                mobileFilterCount={hasTypeFilter ? 1 : 0}
                onOpenMobileFilters={() => setMobileOpen(true)}
                hasTextQuery={hasTextQuery}
                hasActiveControls={hasActiveControls}
                resetHref={clearAllHref}
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

                <ListingFilterMobileActions
                    hasActiveControls={hasActiveControls}
                    resetHref={clearAllHref}
                    onDone={() => setMobileOpen(false)}
                />
            </ListingFilterMobileSheet>
        </>
    )
}
