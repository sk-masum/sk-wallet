import Link from 'next/link'
import type { ReactNode } from 'react'

import { PageHeader } from '@/components/ui/page-header'
import { cn } from '@/lib/utils'

type ListingPageHeaderProps = {
    title: ReactNode
    description?: ReactNode
    addLabel: string
    className?: string
    showBackButton?: boolean
    backHref?: string
    backButtonLabel?: string
    mobileFilters?: ReactNode
    desktopFilters?: ReactNode
    activeFilters?: ReactNode
    mobileStickyHeader?: boolean
}

const sharedDesktopAddButtonClass =
    'hidden sm:inline-flex ring-2 ring-primary/25 shadow-[0_10px_25px_-10px_rgba(0,0,0,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.7)]'

export function ListingPageHeader({
    title,
    description,
    addLabel,
    className,
    showBackButton = false,
    backHref = '/',
    backButtonLabel,
    mobileFilters,
    desktopFilters,
    activeFilters,
    mobileStickyHeader = false,
}: ListingPageHeaderProps) {
    return (
        <>
            {mobileStickyHeader ? (
                <div
                    className={cn(
                        '-mx-4 sticky top-0 z-40 border-b border-border/45 bg-linear-to-b from-background/97 via-background/93 to-background/84 px-4 pt-[calc(env(safe-area-inset-top)+0.5rem)] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.62)] backdrop-blur-xl sm:static sm:mx-0 sm:mb-4 sm:rounded-2xl sm:bg-linear-to-r sm:from-background/98 sm:via-card/92 sm:to-background/98 sm:px-5 sm:pt-4 sm:shadow-[0_20px_44px_-30px_rgba(0,0,0,0.55)] sm:ring-1 sm:ring-border/35 sm:backdrop-blur-none',
                        mobileFilters ? 'mb-4' : 'mb-0'
                    )}
                >
                    <PageHeader
                        title={title}
                        description={description}
                        showBackButton={showBackButton}
                        backHref={backHref}
                        backButtonLabel={backButtonLabel}
                        showAddButton
                        addButtonLabel={addLabel}
                        addButtonClassName={sharedDesktopAddButtonClass}
                        className={cn('mb-3 sm:mb-4', className)}
                    />
                    {mobileFilters}
                </div>
            ) : (
                <>
                    <PageHeader
                        title={title}
                        description={description}
                        showBackButton={showBackButton}
                        backHref={backHref}
                        backButtonLabel={backButtonLabel}
                        showAddButton
                        addButtonLabel={addLabel}
                        addButtonClassName={sharedDesktopAddButtonClass}
                        className={cn('mb-6', className)}
                    />
                    {mobileFilters}
                </>
            )}

            {desktopFilters}
            {activeFilters}
        </>
    )
}

type ListingFilterRowProps = {
    children: ReactNode
    className?: string
}

export function ListingDesktopFilterRow({ children, className }: ListingFilterRowProps) {
    return (
        <div
            className={cn(
                'mb-4 hidden items-center gap-3 rounded-2xl border border-border/70 bg-background/85 p-3 shadow-lg backdrop-blur sm:flex',
                className
            )}
        >
            {children}
        </div>
    )
}

export function ListingActiveFiltersRow({ children, className }: ListingFilterRowProps) {
    return <div className={cn('mb-5 hidden flex-wrap items-center gap-2 sm:flex', className)}>{children}</div>
}
