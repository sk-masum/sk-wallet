'use client'

import Link from 'next/link'
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type ListingFilterTopBarProps = {
    formAction: string
    searchValue: string
    searchMode?: 'controlled' | 'form'
    onSearchChange?: (value: string) => void
    onClearSearch?: () => void
    clearSearchHref?: string
    searchInputName?: string
    searchHiddenFields?: ReactNode
    mobileSearchPlaceholder: string
    desktopSearchPlaceholder: string
    mobileSearchAriaLabel: string
    desktopSearchAriaLabel: string
    mobileFilterCount: number
    onOpenMobileFilters: () => void
    hasTextQuery: boolean
    hasActiveControls: boolean
    onResetAll?: () => void
    resetHref?: string
    desktopFilterOpen: boolean
    onToggleDesktopFilters: () => void
    desktopExpandedClassName: string
    desktopPanel: ReactNode
    mobileContainerClassName?: string
    mobileInnerClassName?: string
    desktopContainerClassName?: string
}

const defaultDesktopContainerClassName =
    'relative mb-4 hidden flex-wrap items-center gap-3 rounded-2xl bg-background/88 p-3.5 shadow-[0_16px_36px_-24px_rgba(0,0,0,0.5)] ring-1 ring-border/35 backdrop-blur-xl sm:flex'

export function ListingFilterTopBar({
    formAction,
    searchValue,
    searchMode = 'controlled',
    onSearchChange,
    onClearSearch,
    clearSearchHref,
    searchInputName = 'q',
    searchHiddenFields,
    mobileSearchPlaceholder,
    desktopSearchPlaceholder,
    mobileSearchAriaLabel,
    desktopSearchAriaLabel,
    mobileFilterCount,
    onOpenMobileFilters,
    hasTextQuery,
    hasActiveControls,
    onResetAll,
    resetHref,
    desktopFilterOpen,
    onToggleDesktopFilters,
    desktopExpandedClassName,
    desktopPanel,
    mobileContainerClassName,
    mobileInnerClassName,
    desktopContainerClassName,
}: ListingFilterTopBarProps) {
    const renderClearSearchAction = (desktop: boolean) => {
        const className = desktop
            ? 'absolute right-1 top-1 h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground'
            : 'absolute right-1 top-1.5 h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground'

        if (searchMode === 'form' && clearSearchHref) {
            return (
                <Link
                    href={clearSearchHref}
                    className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), className)}
                    aria-label="Clear search"
                    title="Clear search"
                >
                    <X className="h-4 w-4" />
                </Link>
            )
        }

        return (
            <button
                type="button"
                onClick={onClearSearch}
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), className)}
                aria-label="Clear search"
                title="Clear search"
            >
                <X className="h-4 w-4" />
            </button>
        )
    }

    return (
        <>
            <div className={cn(mobileContainerClassName ?? 'sm:hidden')}>
                <div className={cn('pb-2', mobileInnerClassName)}>
                    <div className="relative overflow-hidden rounded-2xl border border-border/45 bg-linear-to-r from-background/90 via-card/82 to-background/88 p-2.5 shadow-[0_18px_36px_-22px_rgba(0,0,0,0.62)] ring-1 ring-border/30 backdrop-blur-xl dark:border-white/10 dark:from-black/55 dark:via-zinc-900/70 dark:to-black/55 dark:shadow-[0_18px_36px_-22px_rgba(0,0,0,0.9)] dark:ring-white/10">
                        <div className="pointer-events-none absolute -top-8 left-1/4 h-16 w-32 rounded-full bg-primary/7 blur-2xl dark:hidden" />
                        <div className="pointer-events-none absolute -bottom-10 right-2 h-20 w-24 rounded-full bg-primary/3 blur-2xl dark:hidden" />
                        <div className="relative flex items-center gap-2">
                            <form action={formAction} method="get" className="relative flex-1">
                                <Input
                                    name={searchMode === 'form' ? searchInputName : undefined}
                                    value={searchMode === 'controlled' ? searchValue : undefined}
                                    defaultValue={searchMode === 'form' ? searchValue : undefined}
                                    onChange={
                                        searchMode === 'controlled' && onSearchChange
                                            ? (event) => onSearchChange(event.target.value)
                                            : undefined
                                    }
                                    placeholder={mobileSearchPlaceholder}
                                    aria-label={mobileSearchAriaLabel}
                                    className="h-10 rounded-xl border-border/65 bg-background/90 pr-10 shadow-inner shadow-black/5 dark:border-white/10 dark:bg-black/35 dark:shadow-black/30"
                                />
                                {hasTextQuery ? renderClearSearchAction(false) : null}
                                {searchHiddenFields}
                            </form>

                            <Button
                                type="button"
                                variant="outline"
                                className="h-10 gap-2 rounded-xl border-border/65 bg-background/88 px-3.5 shadow-sm dark:border-white/10 dark:bg-black/35 dark:shadow-black/30"
                                onClick={onOpenMobileFilters}
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Refine
                                {mobileFilterCount > 0 ? (
                                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                                        {mobileFilterCount}
                                    </span>
                                ) : null}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cn(defaultDesktopContainerClassName, desktopContainerClassName)}>
                {searchMode === 'form' ? (
                    <form action={formAction} method="get" className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            name={searchInputName}
                            defaultValue={searchValue}
                            placeholder={desktopSearchPlaceholder}
                            aria-label={desktopSearchAriaLabel}
                            className="h-10 rounded-xl border-border/45 bg-background/97 pl-9 pr-10 shadow-inner shadow-black/5"
                        />
                        {hasTextQuery ? renderClearSearchAction(true) : null}
                        {searchHiddenFields}
                    </form>
                ) : (
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={searchValue}
                            onChange={onSearchChange ? (event) => onSearchChange(event.target.value) : undefined}
                            placeholder={desktopSearchPlaceholder}
                            aria-label={desktopSearchAriaLabel}
                            className="h-10 rounded-xl border-border/45 bg-background/97 pl-9 pr-10 shadow-inner shadow-black/5"
                        />
                        {hasTextQuery ? renderClearSearchAction(true) : null}
                    </div>
                )}

                <Button
                    type="button"
                    variant="outline"
                    className="h-10 gap-2 rounded-xl border-transparent bg-card/75 px-3.5 shadow-sm ring-1 ring-border/35"
                    onClick={onToggleDesktopFilters}
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {mobileFilterCount > 0 ? (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                            {mobileFilterCount}
                        </span>
                    ) : null}
                    <ChevronDown className={cn('h-4 w-4 transition-transform', desktopFilterOpen && 'rotate-180')} />
                </Button>

                {hasActiveControls ? (
                    resetHref ? (
                        <Link
                            href={resetHref}
                            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-10 rounded-xl bg-muted/55 px-3')}
                        >
                            Reset
                        </Link>
                    ) : (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-10 rounded-xl bg-muted/55 px-3"
                            onClick={onResetAll}
                        >
                            Reset
                        </Button>
                    )
                ) : null}

                <div
                    className={cn(
                        'w-full overflow-hidden transition-all duration-300 ease-out',
                        desktopFilterOpen ? `${desktopExpandedClassName} opacity-100` : 'max-h-0 opacity-0'
                    )}
                >
                    {desktopPanel}
                </div>
            </div>
        </>
    )
}
