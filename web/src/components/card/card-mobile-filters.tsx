'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpDown, CreditCard, Layers3, Network } from 'lucide-react'

import {
    ListingFilterDesktopActions,
    ListingFilterDesktopPanel,
    ListingFilterDesktopSection,
    ListingFilterMobileActions,
    ListingFilterMobileSection,
    ListingFilterMobileSheet,
} from '@/components/shared/listing-filter-panels'
import { ListingFilterTopBar } from '@/components/shared/listing-filter-topbar'
import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group'
import { NetworkFilterDropdown } from '@/components/ui/network-filter-dropdown'
import { ProviderFilterDropdown } from '@/components/ui/provider-filter-dropdown'
import { TagFilterDropdown } from '@/components/ui/tag-filter-dropdown'
import { CardSortDropdown } from '@/components/ui/card-sort-dropdown'
import { CardGroupDropdown } from '@/components/ui/card-group-dropdown'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type CardExpiryFilter = 'all' | 'soon'

type CardMobileFiltersProps = {
    query: string
    selectedType: 'all' | 'credit' | 'debit'
    selectedNetwork: string
    selectedProvider: string
    selectedTag: string
    selectedExpiry: CardExpiryFilter
    selectedSort: 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'expiry-asc' | 'expiry-desc'
    selectedGroup: 'none' | 'provider' | 'network' | 'tags'
    networkOptions: string[]
    providerOptions: string[]
    tagOptions: string[]
    activeFilterCount: number
    formAction?: string
    clearSearchHref: string
    clearAllHref: string
    typeHrefs: {
        all: string
        credit: string
        debit: string
    }
}

export function CardMobileFilters({
    query,
    selectedType,
    selectedNetwork,
    selectedProvider,
    selectedTag,
    selectedExpiry,
    selectedSort,
    selectedGroup,
    networkOptions,
    providerOptions,
    tagOptions,
    activeFilterCount,
    formAction = '/card',
    clearSearchHref,
    clearAllHref,
    typeHrefs,
}: CardMobileFiltersProps) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [desktopOpen, setDesktopOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const hasActiveControls =
        query.length > 0 ||
        selectedType !== 'all' ||
        selectedNetwork.length > 0 ||
        selectedProvider.length > 0 ||
        selectedTag.length > 0 ||
        selectedExpiry !== 'all' ||
        selectedSort !== 'newest' ||
        selectedGroup !== 'none'

    const hiddenSearchFields = (
        <>
            {selectedNetwork ? <input type="hidden" name="network" value={selectedNetwork} /> : null}
            {selectedProvider ? <input type="hidden" name="provider" value={selectedProvider} /> : null}
            {selectedTag ? <input type="hidden" name="tag" value={selectedTag} /> : null}
            {selectedExpiry !== 'all' ? <input type="hidden" name="expiry" value={selectedExpiry} /> : null}
            {selectedType !== 'all' ? <input type="hidden" name="type" value={selectedType} /> : null}
            {selectedSort !== 'newest' ? <input type="hidden" name="sort" value={selectedSort} /> : null}
            {selectedGroup !== 'none' ? <input type="hidden" name="group" value={selectedGroup} /> : null}
        </>
    )

    const handleExpiryChange = (value: string) => {
        if (value !== 'all' && value !== 'soon') return

        const params = new URLSearchParams(searchParams.toString())
        if (value === 'all') {
            params.delete('expiry')
        } else {
            params.set('expiry', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    return (
        <>
            <ListingFilterTopBar
                formAction={formAction}
                searchValue={query}
                searchMode="form"
                clearSearchHref={clearSearchHref}
                searchInputName="q"
                searchHiddenFields={hiddenSearchFields}
                mobileSearchPlaceholder="Search cards"
                desktopSearchPlaceholder="Search cards by name, provider, or number"
                mobileSearchAriaLabel="Search cards"
                desktopSearchAriaLabel="Search cards by name, provider, or number"
                mobileFilterCount={activeFilterCount}
                onOpenMobileFilters={() => setMobileOpen(true)}
                hasTextQuery={query.length > 0}
                hasActiveControls={hasActiveControls}
                resetHref={clearAllHref}
                desktopFilterOpen={desktopOpen}
                onToggleDesktopFilters={() => setDesktopOpen((prev) => !prev)}
                desktopExpandedClassName="max-h-[700px]"
                desktopPanel={
                    <ListingFilterDesktopPanel>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-12">
                            <ListingFilterDesktopSection label="Card type" className="space-y-2 md:col-span-2 2xl:col-span-4">
                                <CardTypeButtonGroup
                                    selectedType={selectedType}
                                    className="h-10 w-full max-w-none rounded-xl border-border/60 bg-background/90"
                                    hrefs={typeHrefs}
                                />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Network" className="2xl:col-span-2">
                                <NetworkFilterDropdown
                                    options={networkOptions}
                                    selectedNetwork={selectedNetwork}
                                    query={query}
                                    selectedType={selectedType}
                                    className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                                />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Provider" className="2xl:col-span-2">
                                <ProviderFilterDropdown
                                    options={providerOptions}
                                    selectedProvider={selectedProvider}
                                    className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                                />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Tag" className="2xl:col-span-2">
                                <TagFilterDropdown
                                    options={tagOptions}
                                    selectedTag={selectedTag}
                                    className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                                />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Expiry" className="2xl:col-span-2">
                                <Select value={selectedExpiry} onValueChange={handleExpiryChange}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by expiry">
                                        <SelectValue placeholder="All cards" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All cards</SelectItem>
                                        <SelectItem value="soon">Expiring soon</SelectItem>
                                    </SelectContent>
                                </Select>
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Sort" className="2xl:col-span-3">
                                <CardSortDropdown selectedSort={selectedSort} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Group" className="2xl:col-span-3">
                                <CardGroupDropdown selectedGroup={selectedGroup} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
                            </ListingFilterDesktopSection>
                        </div>

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
                title="Refine cards"
                description="Apply filters, sorting, and grouping in one place."
            >
                <ListingFilterMobileSection label="Type" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <CardTypeButtonGroup selectedType={selectedType} hrefs={typeHrefs} className="h-10 max-w-none rounded-xl border-border/60 bg-background/90" />
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Network" icon={<Network className="h-3.5 w-3.5" />}>
                    <NetworkFilterDropdown
                        options={networkOptions}
                        selectedNetwork={selectedNetwork}
                        query={query}
                        selectedType={selectedType}
                        className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                    />
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Provider" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <ProviderFilterDropdown
                        options={providerOptions}
                        selectedProvider={selectedProvider}
                        className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                    />
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Tag" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <TagFilterDropdown
                        options={tagOptions}
                        selectedTag={selectedTag}
                        className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                    />
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Expiry" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedExpiry} onValueChange={handleExpiryChange}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by expiry">
                            <SelectValue placeholder="All cards" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All cards</SelectItem>
                            <SelectItem value="soon">Expiring soon</SelectItem>
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Sort" icon={<ArrowUpDown className="h-3.5 w-3.5" />}>
                    <CardSortDropdown selectedSort={selectedSort} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Group" icon={<Layers3 className="h-3.5 w-3.5" />}>
                    <CardGroupDropdown selectedGroup={selectedGroup} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
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
