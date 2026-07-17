'use client'

import Link from 'next/link'
import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

import { CardTypeButtonGroup } from '@/components/ui/card-type-button-group'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { NetworkFilterDropdown } from '@/components/ui/network-filter-dropdown'
import { cn } from '@/lib/utils'

type CardMobileFiltersProps = {
    query: string
    selectedType: 'all' | 'credit' | 'debit'
    selectedNetwork: string
    networkOptions: string[]
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
    networkOptions,
    activeFilterCount,
    formAction = '/card',
    clearSearchHref,
    clearAllHref,
    typeHrefs,
}: CardMobileFiltersProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="mb-4 space-y-2 sm:hidden">
            <div className="sticky top-2 z-20 rounded-2xl border border-border/70 bg-background/80 p-2 backdrop-blur">
                <div className="flex items-center gap-2">
                    <form action={formAction} method="get" className="relative flex-1">
                        <Input
                            name="q"
                            defaultValue={query}
                            placeholder="Search cards"
                            aria-label="Search cards"
                            className="h-9 pr-10"
                        />
                        {query ? (
                            <Link
                                href={clearSearchHref}
                                className={cn(
                                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                                    'absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-foreground'
                                )}
                                aria-label="Clear search"
                                title="Clear search"
                            >
                                <X className="h-4 w-4" />
                            </Link>
                        ) : null}
                        {selectedNetwork ? <input type="hidden" name="network" value={selectedNetwork} /> : null}
                        {selectedType !== 'all' ? <input type="hidden" name="type" value={selectedType} /> : null}
                    </form>

                    <Button
                        type="button"
                        variant="outline"
                        className="h-9 gap-2 rounded-full px-3"
                        onClick={() => setOpen(true)}
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {activeFilterCount > 0 ? (
                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                                {activeFilterCount}
                            </span>
                        ) : null}
                    </Button>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="top-auto bottom-0 left-0 right-0 w-full max-w-none translate-x-0 translate-y-0 rounded-b-none border-x-0 pb-6">
                    <DialogHeader>
                        <DialogTitle>Filter cards</DialogTitle>
                        <DialogDescription>Refine by card type and network.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <CardTypeButtonGroup selectedType={selectedType} hrefs={typeHrefs} className="max-w-none" />

                        <NetworkFilterDropdown
                            options={networkOptions}
                            selectedNetwork={selectedNetwork}
                            query={query}
                            selectedType={selectedType}
                            className="w-full"
                        />

                        {activeFilterCount > 0 ? (
                            <Link
                                href={clearAllHref}
                                className={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-center')}
                                onClick={() => setOpen(false)}
                            >
                                Clear all filters
                            </Link>
                        ) : null}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
