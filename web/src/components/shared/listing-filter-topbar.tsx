'use client'

import Link from 'next/link'
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { responsiveIconSizes } from '@/components/ui/icon-sizes'
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

const defaultDesktopContainerClassName = 'mb-4 hidden flex-wrap items-center gap-3 sm:flex'

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
            ? 'absolute right-1 top-1 h-8 w-8 rounded-lg text-text-subtle hover:text-foreground'
            : 'absolute right-1 top-1.5 h-7 w-7 rounded-lg text-text-subtle hover:text-foreground'

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
                    <div className="flex items-center gap-2 py-2">
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
                                className="h-10 rounded-xl border-glass-border-soft bg-glass pr-10 shadow-neu-inset-sm "
                            />
                            {hasTextQuery ? renderClearSearchAction(false) : null}
                            {searchHiddenFields}
                        </form>

                        <Button
                            type="button"
                            variant="toolbar"
                            size="md"
                            className="gap-2 px-3.5"
                            onClick={onOpenMobileFilters}
                        >
                            <SlidersHorizontal className={responsiveIconSizes.toolbar} />

                            {mobileFilterCount > 0 ? (
                                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                                    {mobileFilterCount}
                                </span>
                            ) : null}
                        </Button>
                    </div>
                </div>
            </div>

            <div className={cn(defaultDesktopContainerClassName, desktopContainerClassName)}>
                {searchMode === 'form' ? (
                    <form action={formAction} method="get" className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                        <Input
                            name={searchInputName}
                            defaultValue={searchValue}
                            placeholder={desktopSearchPlaceholder}
                            aria-label={desktopSearchAriaLabel}
                            className="h-10 rounded-xl border-glass-border-soft bg-glass pl-9 pr-10 shadow-neu-inset-sm "
                        />
                        {hasTextQuery ? renderClearSearchAction(true) : null}
                        {searchHiddenFields}
                    </form>
                ) : (
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />
                        <Input
                            value={searchValue}
                            onChange={onSearchChange ? (event) => onSearchChange(event.target.value) : undefined}
                            placeholder={desktopSearchPlaceholder}
                            aria-label={desktopSearchAriaLabel}
                            className="h-10 rounded-xl border-glass-border-soft bg-glass pl-9 pr-10 shadow-neu-inset-sm "
                        />
                        {hasTextQuery ? renderClearSearchAction(true) : null}
                    </div>
                )}

                <Button
                    type="button"
                    variant="toolbar"
                    size="md"
                    className="gap-2 px-3.5 ring-1 ring-border/30"
                    onClick={onToggleDesktopFilters}
                >
                    <SlidersHorizontal className={responsiveIconSizes.toolbar} />
                    Filters
                    {mobileFilterCount > 0 ? (
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                            {mobileFilterCount}
                        </span>
                    ) : null}
                    <ChevronDown className={cn(responsiveIconSizes.toolbar, 'transition-transform', desktopFilterOpen && 'rotate-180')} />
                </Button>

                {hasActiveControls ? (
                    resetHref ? (
                        <Link
                            href={resetHref}
                            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'h-10 rounded-xl px-3.5')}
                        >
                            Reset
                        </Link>
                    ) : (
                        <Button
                            type="button"
                            variant="toolbar"
                            size="md"
                            className="px-3.5"
                            onClick={onResetAll}
                        >
                            Reset
                        </Button>
                    )
                ) : null}
            </div>

            {desktopFilterOpen ? (
                <div className="fixed inset-0 z-50 hidden sm:block" aria-hidden={false}>
                    <button
                        type="button"
                        aria-label="Close filters"
                        className="absolute inset-0 bg-[hsl(var(--background)/0.32)] backdrop-blur-[1px]"
                        onClick={onToggleDesktopFilters}
                    />

                    <aside className="fixed left-0 top-0 flex h-dvh w-[35vw] flex-col border-r border-glass-border-subtle bg-[linear-gradient(to_bottom,hsl(var(--background)/0.86),hsl(var(--background)/0.76)),var(--color-glass)] shadow-2xl backdrop-blur-xl ">
                        <div className="flex items-start justify-between border-b border-glass-border-subtle px-4 py-3 ">
                            <div>
                                <p className="text-lg font-semibold">Filters</p>
                                <p className="text-sm text-text-subtle">Refine, sort, and group your cards.</p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-lg"
                                onClick={onToggleDesktopFilters}
                                aria-label="Close filters"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className={cn('flex-1 overflow-y-auto p-0', desktopExpandedClassName)}>{desktopPanel}</div>
                    </aside>
                </div>
            ) : null}
        </>
    )
}
