'use client'

import { useState } from 'react'
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
import { CardSortDropdown } from '@/components/ui/card-sort-dropdown'
import { CardGroupDropdown } from '@/components/ui/card-group-dropdown'

type CardMobileFiltersProps = {
    query: string
    selectedType: 'all' | 'credit' | 'debit'
    selectedNetwork: string
    selectedProvider: string
    selectedSort: 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'expiry-asc' | 'expiry-desc'
    selectedGroup: 'none' | 'provider' | 'network'
    networkOptions: string[]
    providerOptions: string[]
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
    selectedSort,
    selectedGroup,
    networkOptions,
    providerOptions,
    activeFilterCount,
    formAction = '/card',
    clearSearchHref,
    clearAllHref,
    typeHrefs,
}: CardMobileFiltersProps) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [desktopOpen, setDesktopOpen] = useState(false)
    const hasActiveControls =
        query.length > 0 ||
        selectedType !== 'all' ||
        selectedNetwork.length > 0 ||
        selectedProvider.length > 0 ||
        selectedSort !== 'newest' ||
        selectedGroup !== 'none'

    const hiddenSearchFields = (
        <>
            {selectedNetwork ? <input type="hidden" name="network" value={selectedNetwork} /> : null}
            {selectedProvider ? <input type="hidden" name="provider" value={selectedProvider} /> : null}
            {selectedType !== 'all' ? <input type="hidden" name="type" value={selectedType} /> : null}
            {selectedSort !== 'newest' ? <input type="hidden" name="sort" value={selectedSort} /> : null}
            {selectedGroup !== 'none' ? <input type="hidden" name="group" value={selectedGroup} /> : null}
        </>
    )

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
                desktopExpandedClassName="max-h-[520px]"
                desktopPanel={
                    <ListingFilterDesktopPanel>
                        <ListingFilterDesktopSection label="Card type" className="space-y-2">
                            <CardTypeButtonGroup
                                selectedType={selectedType}
                                className="h-10 w-full max-w-none rounded-xl border-border/60 bg-background/90"
                                hrefs={typeHrefs}
                            />
                        </ListingFilterDesktopSection>

                        <div className="grid grid-cols-4 gap-4">
                            <ListingFilterDesktopSection label="Network">
                                <NetworkFilterDropdown
                                    options={networkOptions}
                                    selectedNetwork={selectedNetwork}
                                    query={query}
                                    selectedType={selectedType}
                                    className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                                />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Provider">
                                <ProviderFilterDropdown
                                    options={providerOptions}
                                    selectedProvider={selectedProvider}
                                    className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                                />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Sort">
                                <CardSortDropdown selectedSort={selectedSort} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Group">
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
                className="border-x-0 bg-linear-to-b from-background via-background to-background"
            >
                <ListingFilterMobileSection label="Type" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <CardTypeButtonGroup selectedType={selectedType} hrefs={typeHrefs} className="h-10 max-w-none rounded-xl border-border/60 bg-background/90" />
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Network" icon={<Network className="h-3.5 w-3.5" />} className="space-y-1.5">
                    <NetworkFilterDropdown
                        options={networkOptions}
                        selectedNetwork={selectedNetwork}
                        query={query}
                        selectedType={selectedType}
                        className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                    />
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Provider" icon={<CreditCard className="h-3.5 w-3.5" />} className="space-y-1.5">
                    <ProviderFilterDropdown
                        options={providerOptions}
                        selectedProvider={selectedProvider}
                        className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                    />
                </ListingFilterMobileSection>

                <div className="grid grid-cols-2 gap-3">
                    <ListingFilterMobileSection label="Sort" icon={<ArrowUpDown className="h-3.5 w-3.5" />} className="space-y-1.5">
                        <CardSortDropdown selectedSort={selectedSort} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
                    </ListingFilterMobileSection>

                    <ListingFilterMobileSection label="Group" icon={<Layers3 className="h-3.5 w-3.5" />} className="space-y-1.5">
                        <CardGroupDropdown selectedGroup={selectedGroup} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
                    </ListingFilterMobileSection>
                </div>

                <ListingFilterMobileActions
                    hasActiveControls={hasActiveControls}
                    resetHref={clearAllHref}
                    onDone={() => setMobileOpen(false)}
                />
            </ListingFilterMobileSheet>
        </>
    )
}
