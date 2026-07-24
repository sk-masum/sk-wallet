'use client'

import { useEffect, useState } from 'react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    selectCardFilterMeta,
    useCardVaultStore,
    type CardGroup,
    type CardSort,
} from '@/lib/stores/card-vault-store'

const CARD_GROUP_OPTIONS = [
    { value: 'none', label: 'No grouping' },
    { value: 'provider', label: 'Group by provider' },
    { value: 'network', label: 'Group by network' },
    { value: 'tags', label: 'Group by tags' },
] as const

const CARD_SORT_OPTIONS = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'expiry-asc', label: 'Expiry (Soonest)' },
    { value: 'expiry-desc', label: 'Expiry (Latest)' },
    { value: 'credit-limit-asc', label: 'Credit limit (Low-High)' },
    { value: 'credit-limit-desc', label: 'Credit limit (High-Low)' },
    { value: 'billing-date-asc', label: 'Billing date (Earliest)' },
    { value: 'billing-date-desc', label: 'Billing date (Latest)' },
    { value: 'payment-date-asc', label: 'Payment date (Earliest)' },
    { value: 'payment-date-desc', label: 'Payment date (Latest)' },
] as const

export function CardMobileFilters() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [desktopOpen, setDesktopOpen] = useState(false)
    const [creditLimitRange, setCreditLimitRange] = useState<[number, number]>([0, 0])

    const query = useCardVaultStore((state) => state.query)
    const selectedType = useCardVaultStore((state) => state.typeFilter)
    const selectedNetwork = useCardVaultStore((state) => state.networkFilter)
    const selectedProvider = useCardVaultStore((state) => state.providerFilter)
    const selectedTag = useCardVaultStore((state) => state.tagFilter)
    const selectedExpiry = useCardVaultStore((state) => state.expiryFilter)
    const selectedBillingDate = useCardVaultStore((state) => state.billingDate)
    const selectedPaymentDate = useCardVaultStore((state) => state.paymentDate)
    const selectedSort = useCardVaultStore((state) => state.sortBy)
    const selectedGroup = useCardVaultStore((state) => state.groupBy)

    const setFilters = useCardVaultStore((state) => state.setFilters)
    const setSortBy = useCardVaultStore((state) => state.setSortBy)
    const setGroupBy = useCardVaultStore((state) => state.setGroupBy)
    const setCreditLimitRangeInStore = useCardVaultStore((state) => state.setCreditLimitRange)
    const resetFilters = useCardVaultStore((state) => state.resetFilters)

    const meta = useCardVaultStore(selectCardFilterMeta)

    useEffect(() => {
        setCreditLimitRange([meta.selectedCreditLimitMin, meta.selectedCreditLimitMax])
    }, [meta.selectedCreditLimitMin, meta.selectedCreditLimitMax])

    const commitCreditLimitRange = (minLimit: number, maxLimit: number) => {
        if (meta.creditLimitBounds.min >= meta.creditLimitBounds.max) {
            setCreditLimitRangeInStore(null, null)
            return
        }

        const normalizedMin = Math.max(meta.creditLimitBounds.min, Math.min(minLimit, maxLimit))
        const normalizedMax = Math.min(meta.creditLimitBounds.max, Math.max(minLimit, maxLimit))

        setCreditLimitRangeInStore(
            normalizedMin <= meta.creditLimitBounds.min ? null : normalizedMin,
            normalizedMax >= meta.creditLimitBounds.max ? null : normalizedMax
        )
    }

    return (
        <>
            <ListingFilterTopBar
                formAction="/card"
                searchValue={query}
                searchMode="controlled"
                onSearchChange={(value) => setFilters({ query: value })}
                onClearSearch={() => setFilters({ query: '' })}
                mobileSearchPlaceholder="Search cards"
                desktopSearchPlaceholder="Search cards by name, provider, or number"
                mobileSearchAriaLabel="Search cards"
                desktopSearchAriaLabel="Search cards by name, provider, or number"
                mobileFilterCount={meta.activeFilterCount}
                onOpenMobileFilters={() => setMobileOpen(true)}
                hasTextQuery={meta.hasTextQuery}
                hasActiveControls={meta.hasActiveControls}
                onResetAll={resetFilters}
                desktopFilterOpen={desktopOpen}
                onToggleDesktopFilters={() => setDesktopOpen((prev) => !prev)}
                desktopExpandedClassName=""
                desktopPanel={
                    <ListingFilterDesktopPanel>
                        <div className="grid grid-cols-1 gap-4">
                            <ListingFilterDesktopSection label="Card type" className="space-y-2">
                                <CardTypeButtonGroup
                                    selectedType={selectedType}
                                    onSelect={(type) => setFilters({ typeFilter: type })}
                                    className="h-10 w-full max-w-none rounded-xl"
                                />
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Network">
                                <Select value={selectedNetwork || 'ALL'} onValueChange={(value) => setFilters({ networkFilter: value === 'ALL' ? '' : value })}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by network">
                                        <SelectValue placeholder="All networks" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All networks</SelectItem>
                                        {meta.networkOptions.map((network) => (
                                            <SelectItem key={network} value={network}>
                                                {network}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Provider">
                                <Select value={selectedProvider || 'ALL'} onValueChange={(value) => setFilters({ providerFilter: value === 'ALL' ? '' : value })}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by provider">
                                        <SelectValue placeholder="All providers" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All providers</SelectItem>
                                        {meta.providerOptions.map((provider) => (
                                            <SelectItem key={provider} value={provider}>
                                                {provider}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Tag">
                                <Select value={selectedTag || 'ALL'} onValueChange={(value) => setFilters({ tagFilter: value === 'ALL' ? '' : value })}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by tag">
                                        <SelectValue placeholder="All tags" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ALL">All tags</SelectItem>
                                        {meta.tagOptions.map((tag) => (
                                            <SelectItem key={tag} value={tag}>
                                                {tag}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Expiry">
                                <Select value={selectedExpiry} onValueChange={(value) => setFilters({ expiryFilter: value as 'all' | 'soon' })}>
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
                                    <div className="flex items-center justify-between text-xs text-text-subtle">
                                        <span>Min: {creditLimitRange[0]}</span>
                                        <span>Max: {creditLimitRange[1]}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={meta.creditLimitBounds.min}
                                        max={meta.creditLimitBounds.max}
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
                                        disabled={meta.creditLimitBounds.min >= meta.creditLimitBounds.max}
                                    />
                                    <input
                                        type="range"
                                        min={meta.creditLimitBounds.min}
                                        max={meta.creditLimitBounds.max}
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
                                        disabled={meta.creditLimitBounds.min >= meta.creditLimitBounds.max}
                                    />
                                </div>
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Billing date">
                                <Select value={selectedBillingDate || 'ALL'} onValueChange={(value) => setFilters({ billingDate: value === 'ALL' ? '' : value })}>
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
                                <Select value={selectedPaymentDate || 'ALL'} onValueChange={(value) => setFilters({ paymentDate: value === 'ALL' ? '' : value })}>
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
                                <Select value={selectedSort} onValueChange={(value) => setSortBy(value as CardSort)}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Sort cards">
                                        <SelectValue placeholder="Newest first" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CARD_SORT_OPTIONS.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </ListingFilterDesktopSection>

                            <ListingFilterDesktopSection label="Group">
                                <Select value={selectedGroup} onValueChange={(value) => setGroupBy(value as CardGroup)}>
                                    <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Group cards">
                                        <SelectValue placeholder="No grouping" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CARD_GROUP_OPTIONS.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </ListingFilterDesktopSection>
                        </div>

                        <ListingFilterDesktopActions
                            hasActiveControls={meta.hasActiveControls}
                            onReset={resetFilters}
                            collapseLabel="Save"
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
                    <CardTypeButtonGroup selectedType={selectedType} onSelect={(type) => setFilters({ typeFilter: type })} className="h-10 max-w-none rounded-xl" />
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Network" icon={<Network className="h-3.5 w-3.5" />}>
                    <Select value={selectedNetwork || 'ALL'} onValueChange={(value) => setFilters({ networkFilter: value === 'ALL' ? '' : value })}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by network">
                            <SelectValue placeholder="All networks" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All networks</SelectItem>
                            {meta.networkOptions.map((network) => (
                                <SelectItem key={network} value={network}>
                                    {network}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Provider" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedProvider || 'ALL'} onValueChange={(value) => setFilters({ providerFilter: value === 'ALL' ? '' : value })}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by provider">
                            <SelectValue placeholder="All providers" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All providers</SelectItem>
                            {meta.providerOptions.map((provider) => (
                                <SelectItem key={provider} value={provider}>
                                    {provider}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Tag" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedTag || 'ALL'} onValueChange={(value) => setFilters({ tagFilter: value === 'ALL' ? '' : value })}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Filter by tag">
                            <SelectValue placeholder="All tags" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All tags</SelectItem>
                            {meta.tagOptions.map((tag) => (
                                <SelectItem key={tag} value={tag}>
                                    {tag}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Expiry" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedExpiry} onValueChange={(value) => setFilters({ expiryFilter: value as 'all' | 'soon' })}>
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
                        <div className="flex items-center justify-between text-xs text-text-subtle">
                            <span>Min: {creditLimitRange[0]}</span>
                            <span>Max: {creditLimitRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min={meta.creditLimitBounds.min}
                            max={meta.creditLimitBounds.max}
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
                            disabled={meta.creditLimitBounds.min >= meta.creditLimitBounds.max}
                        />
                        <input
                            type="range"
                            min={meta.creditLimitBounds.min}
                            max={meta.creditLimitBounds.max}
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
                            disabled={meta.creditLimitBounds.min >= meta.creditLimitBounds.max}
                        />
                    </div>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Billing date" icon={<CreditCard className="h-3.5 w-3.5" />}>
                    <Select value={selectedBillingDate || 'ALL'} onValueChange={(value) => setFilters({ billingDate: value === 'ALL' ? '' : value })}>
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
                    <Select value={selectedPaymentDate || 'ALL'} onValueChange={(value) => setFilters({ paymentDate: value === 'ALL' ? '' : value })}>
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
                    <Select value={selectedSort} onValueChange={(value) => setSortBy(value as CardSort)}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Sort cards">
                            <SelectValue placeholder="Newest first" />
                        </SelectTrigger>
                        <SelectContent>
                            {CARD_SORT_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileSection label="Group" icon={<Layers3 className="h-3.5 w-3.5" />}>
                    <Select value={selectedGroup} onValueChange={(value) => setGroupBy(value as CardGroup)}>
                        <SelectTrigger className="h-10 w-full rounded-xl border-border/60 bg-background/95" aria-label="Group cards">
                            <SelectValue placeholder="No grouping" />
                        </SelectTrigger>
                        <SelectContent>
                            {CARD_GROUP_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ListingFilterMobileSection>

                <ListingFilterMobileActions
                    hasActiveControls={meta.hasActiveControls}
                    onReset={resetFilters}
                    doneLabel="Save"
                    onDone={() => setMobileOpen(false)}
                />
            </ListingFilterMobileSheet>
        </>
    )
}
