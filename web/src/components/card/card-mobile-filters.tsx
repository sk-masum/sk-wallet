'use client'

import { useEffect, useState } from 'react'
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
    selectedCreditLimitMin: number
    selectedCreditLimitMax: number
    minCreditLimitBound: number
    maxCreditLimitBound: number
    selectedBillingDate: string
    selectedPaymentDate: string
    selectedSort:
    | 'newest'
    | 'oldest'
    | 'name-asc'
    | 'name-desc'
    | 'expiry-asc'
    | 'expiry-desc'
    | 'credit-limit-asc'
    | 'credit-limit-desc'
    | 'billing-date-asc'
    | 'billing-date-desc'
    | 'payment-date-asc'
    | 'payment-date-desc'
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
    selectedCreditLimitMin,
    selectedCreditLimitMax,
    minCreditLimitBound,
    maxCreditLimitBound,
    selectedBillingDate,
    selectedPaymentDate,
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
    const billingDate = selectedBillingDate ?? ''
    const paymentDate = selectedPaymentDate ?? ''
    const [mobileOpen, setMobileOpen] = useState(false)
    const [desktopOpen, setDesktopOpen] = useState(false)
    const [creditLimitRange, setCreditLimitRange] = useState<[number, number]>([
        selectedCreditLimitMin,
        selectedCreditLimitMax,
    ])
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        setCreditLimitRange([selectedCreditLimitMin, selectedCreditLimitMax])
    }, [selectedCreditLimitMin, selectedCreditLimitMax])

    const hasCreditLimitFilter =
        minCreditLimitBound < maxCreditLimitBound &&
        (selectedCreditLimitMin > minCreditLimitBound || selectedCreditLimitMax < maxCreditLimitBound)

    const hasActiveControls =
        query.length > 0 ||
        selectedType !== 'all' ||
        selectedNetwork.length > 0 ||
        selectedProvider.length > 0 ||
        selectedTag.length > 0 ||
        selectedExpiry !== 'all' ||
        hasCreditLimitFilter ||
        billingDate.length > 0 ||
        paymentDate.length > 0 ||
        selectedSort !== 'newest' ||
        selectedGroup !== 'none'

    const hiddenSearchFields = (
        <>
            {selectedNetwork ? <input type="hidden" name="network" value={selectedNetwork} /> : null}
            {selectedProvider ? <input type="hidden" name="provider" value={selectedProvider} /> : null}
            {selectedTag ? <input type="hidden" name="tag" value={selectedTag} /> : null}
            {selectedExpiry !== 'all' ? <input type="hidden" name="expiry" value={selectedExpiry} /> : null}
            {hasCreditLimitFilter ? <input type="hidden" name="credit_limit_min" value={String(selectedCreditLimitMin)} /> : null}
            {hasCreditLimitFilter ? <input type="hidden" name="credit_limit_max" value={String(selectedCreditLimitMax)} /> : null}
            {billingDate ? <input type="hidden" name="billing_date" value={billingDate} /> : null}
            {paymentDate ? <input type="hidden" name="payment_date" value={paymentDate} /> : null}
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

    const commitCreditLimitRange = (minLimit: number, maxLimit: number) => {
        const params = new URLSearchParams(searchParams.toString())

        if (minCreditLimitBound >= maxCreditLimitBound) {
            params.delete('credit_limit_min')
            params.delete('credit_limit_max')
        } else {
            const normalizedMin = Math.min(minLimit, maxLimit)
            const normalizedMax = Math.max(minLimit, maxLimit)

            if (normalizedMin <= minCreditLimitBound) {
                params.delete('credit_limit_min')
            } else {
                params.set('credit_limit_min', String(normalizedMin))
            }

            if (normalizedMax >= maxCreditLimitBound) {
                params.delete('credit_limit_max')
            } else {
                params.set('credit_limit_max', String(normalizedMax))
            }
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    const handleBillingDateChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'ALL') {
            params.delete('billing_date')
        } else {
            params.set('billing_date', value)
        }

        const serialized = params.toString()
        router.push(serialized ? `${pathname}?${serialized}` : pathname)
    }

    const handlePaymentDateChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'ALL') {
            params.delete('payment_date')
        } else {
            params.set('payment_date', value)
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
                desktopExpandedClassName=""
                desktopPanel={
                    <ListingFilterDesktopPanel className="mt-0 rounded-none bg-transparent p-0 shadow-none ring-0 sm:p-0">
                        <div className="grid grid-cols-1 gap-4">
                            <ListingFilterDesktopSection label="Card type" className="space-y-2">
                                <CardTypeButtonGroup
                                    selectedType={selectedType}
                                    className="h-10 w-full max-w-none rounded-xl border-border/60 bg-background/90"
                                    hrefs={typeHrefs}
                                />
                            </ListingFilterDesktopSection>

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

                            <ListingFilterDesktopSection label="Tag">
                                <TagFilterDropdown
                                    options={tagOptions}
                                    selectedTag={selectedTag}
                                    className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                                />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Expiry">
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

                            <ListingFilterDesktopSection label="Credit limit">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Min: {creditLimitRange[0]}</span>
                                        <span>Max: {creditLimitRange[1]}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={minCreditLimitBound}
                                        max={maxCreditLimitBound}
                                        step={100}
                                        value={creditLimitRange[0]}
                                        onChange={(event) => {
                                            const nextMin = Number(event.target.value)
                                            setCreditLimitRange(([_, currentMax]) => [Math.min(nextMin, currentMax), currentMax])
                                        }}
                                        onMouseUp={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
                                        onTouchEnd={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
                                        className="w-full accent-primary"
                                        aria-label="Minimum credit limit"
                                        disabled={minCreditLimitBound >= maxCreditLimitBound}
                                    />
                                    <input
                                        type="range"
                                        min={minCreditLimitBound}
                                        max={maxCreditLimitBound}
                                        step={100}
                                        value={creditLimitRange[1]}
                                        onChange={(event) => {
                                            const nextMax = Number(event.target.value)
                                            setCreditLimitRange(([currentMin]) => [currentMin, Math.max(currentMin, nextMax)])
                                        }}
                                        onMouseUp={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
                                        onTouchEnd={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
                                        className="w-full accent-primary"
                                        aria-label="Maximum credit limit"
                                        disabled={minCreditLimitBound >= maxCreditLimitBound}
                                    />
                                </div>
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Billing date">
                                <Select value={billingDate || 'ALL'} onValueChange={handleBillingDateChange}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by billing date">
                                        <SelectValue placeholder="All dates" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All dates</SelectItem>
                                        {Array.from({ length: 31 }, (_, index) => {
                                            const day = String(index + 1)
                                            return (
                                                <SelectItem key={day} value={day}>
                                                    Day {day}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Payment date">
                                <Select value={paymentDate || 'ALL'} onValueChange={handlePaymentDateChange}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by payment date">
                                        <SelectValue placeholder="All dates" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All dates</SelectItem>
                                        {Array.from({ length: 31 }, (_, index) => {
                                            const day = String(index + 1)
                                            return (
                                                <SelectItem key={day} value={day}>
                                                    Day {day}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
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
                            collapseLabel="Save"
                            className="sticky bottom-0 z-10 -mx-1 mt-1 rounded-xl border border-border/45 bg-background/92 p-2 backdrop-blur-sm"
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

                <ListingFilterMobileSection label="Credit limit" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Min: {creditLimitRange[0]}</span>
                            <span>Max: {creditLimitRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min={minCreditLimitBound}
                            max={maxCreditLimitBound}
                            step={100}
                            value={creditLimitRange[0]}
                            onChange={(event) => {
                                const nextMin = Number(event.target.value)
                                setCreditLimitRange(([_, currentMax]) => [Math.min(nextMin, currentMax), currentMax])
                            }}
                            onMouseUp={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
                            onTouchEnd={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
                            className="w-full accent-primary"
                            aria-label="Minimum credit limit"
                            disabled={minCreditLimitBound >= maxCreditLimitBound}
                        />
                        <input
                            type="range"
                            min={minCreditLimitBound}
                            max={maxCreditLimitBound}
                            step={100}
                            value={creditLimitRange[1]}
                            onChange={(event) => {
                                const nextMax = Number(event.target.value)
                                setCreditLimitRange(([currentMin]) => [currentMin, Math.max(currentMin, nextMax)])
                            }}
                            onMouseUp={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
                            onTouchEnd={() => commitCreditLimitRange(creditLimitRange[0], creditLimitRange[1])}
                            className="w-full accent-primary"
                            aria-label="Maximum credit limit"
                            disabled={minCreditLimitBound >= maxCreditLimitBound}
                        />
                    </div>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Billing date" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={billingDate || 'ALL'} onValueChange={handleBillingDateChange}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by billing date">
                            <SelectValue placeholder="All dates" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All dates</SelectItem>
                            {Array.from({ length: 31 }, (_, index) => {
                                const day = String(index + 1)
                                return (
                                    <SelectItem key={day} value={day}>
                                        Day {day}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Payment date" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={paymentDate || 'ALL'} onValueChange={handlePaymentDateChange}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by payment date">
                            <SelectValue placeholder="All dates" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All dates</SelectItem>
                            {Array.from({ length: 31 }, (_, index) => {
                                const day = String(index + 1)
                                return (
                                    <SelectItem key={day} value={day}>
                                        Day {day}
                                    </SelectItem>
                                )
                            })}
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
                    doneLabel="Save"
                    onDone={() => setMobileOpen(false)}
                />
            </ListingFilterMobileSheet>
        </>
    )
}
