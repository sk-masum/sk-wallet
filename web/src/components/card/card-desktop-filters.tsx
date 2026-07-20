'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'

import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group'
import { CardSortDropdown } from '@/components/ui/card-sort-dropdown'
import { CardGroupDropdown } from '@/components/ui/card-group-dropdown'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NetworkFilterDropdown } from '@/components/ui/network-filter-dropdown'
import { cn } from '@/lib/utils'

type CardDesktopFiltersProps = {
    query: string
    selectedType: 'all' | 'credit' | 'debit'
    selectedNetwork: string
    selectedSort: 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'expiry-asc' | 'expiry-desc'
    selectedGroup: 'none' | 'provider' | 'network'
    networkOptions: string[]
    activeFilterCount: number
    clearSearchHref: string
    clearAllHref: string
    typeHrefs: {
        all: string
        credit: string
        debit: string
    }
    formAction?: string
}

export function CardDesktopFilters({
    query,
    selectedType,
    selectedNetwork,
    selectedSort,
    selectedGroup,
    networkOptions,
    activeFilterCount,
    clearSearchHref,
    clearAllHref,
    typeHrefs,
    formAction = '/card',
}: CardDesktopFiltersProps) {
    const [open, setOpen] = useState(false)
    const hasActiveControls =
        query.length > 0 ||
        selectedType !== 'all' ||
        selectedNetwork.length > 0 ||
        selectedSort !== 'newest' ||
        selectedGroup !== 'none'

    return (
        <div className="mb-4 hidden flex-wrap items-center gap-3 rounded-2xl border border-border/55 bg-linear-to-r from-background/95 via-card/90 to-background/95 p-3 shadow-[0_16px_36px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex">
            <form action={formAction} method="get" className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    name="q"
                    defaultValue={query}
                    placeholder="Search cards by name, provider, or number"
                    aria-label="Search cards by name, provider, or number"
                    className="h-10 rounded-xl border-border/60 bg-background/95 pl-9 pr-10 shadow-inner shadow-black/5"
                />
                {query ? (
                    <Link
                        href={clearSearchHref}
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: 'icon' }),
                            'absolute right-1 top-1 h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground'
                        )}
                        aria-label="Clear search"
                        title="Clear search"
                    >
                        <X className="h-4 w-4" />
                    </Link>
                ) : null}
                {selectedNetwork ? <input type="hidden" name="network" value={selectedNetwork} /> : null}
                {selectedType !== 'all' ? <input type="hidden" name="type" value={selectedType} /> : null}
                {selectedSort !== 'newest' ? <input type="hidden" name="sort" value={selectedSort} /> : null}
                {selectedGroup !== 'none' ? <input type="hidden" name="group" value={selectedGroup} /> : null}
            </form>

            <Button
                type="button"
                variant="outline"
                className="h-10 gap-2 rounded-xl border-border/60 bg-background/90 px-3.5 shadow-sm"
                onClick={() => setOpen((prev) => !prev)}
            >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 ? (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                        {activeFilterCount}
                    </span>
                ) : null}
                <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
            </Button>

            {hasActiveControls ? (
                <Link
                    href={clearAllHref}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-10 rounded-xl border border-border/60 bg-background/80 px-3')}
                >
                    Reset
                </Link>
            ) : null}

            <div className={cn('w-full overflow-hidden transition-all duration-300 ease-out', open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0')}>
                <div className="mt-3 space-y-4 rounded-2xl border border-border/60 bg-linear-to-b from-background via-background to-card/45 p-4">
                    <div className="rounded-2xl border border-border/55 bg-card/55 p-4">
                        <p className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Card type</p>
                        <CardTypeButtonGroup
                            selectedType={selectedType}
                            className="h-10 w-full max-w-none rounded-xl border-border/60 bg-background/90"
                            hrefs={typeHrefs}
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1.5 rounded-2xl border border-border/55 bg-card/55 p-4">
                            <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Network</p>
                            <NetworkFilterDropdown
                                options={networkOptions}
                                selectedNetwork={selectedNetwork}
                                query={query}
                                selectedType={selectedType}
                                className="h-10 w-full rounded-xl border-border/60 bg-background/95"
                            />
                        </div>

                        <div className="space-y-1.5 rounded-2xl border border-border/55 bg-card/55 p-4">
                            <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Sort</p>
                            <CardSortDropdown selectedSort={selectedSort} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
                        </div>

                        <div className="space-y-1.5 rounded-2xl border border-border/55 bg-card/55 p-4">
                            <p className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">Group</p>
                            <CardGroupDropdown selectedGroup={selectedGroup} className="h-10 w-full rounded-xl border-border/60 bg-background/95" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-border/55 pt-3">
                        {hasActiveControls ? (
                            <Link
                                href={clearAllHref}
                                className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-10 rounded-xl border border-border/60 bg-background/80 px-4')}
                                onClick={() => setOpen(false)}
                            >
                                Reset all
                            </Link>
                        ) : null}
                        <Button type="button" className="h-10 rounded-xl px-5" onClick={() => setOpen(false)}>
                            Collapse
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
