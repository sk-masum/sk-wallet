import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { ReactNode } from 'react'

import { PageHeader } from '@/components/ui/page-header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ListingPageHeaderProps = {
    title: ReactNode
    description?: ReactNode
    addHref: string
    addLabel: string
    className?: string
    addButtonClassName?: string
    mobileFabClassName?: string
    mobileFilters?: ReactNode
    desktopFilters?: ReactNode
    activeFilters?: ReactNode
}

const sharedDesktopAddButtonClass =
    'hidden sm:inline-flex ring-2 ring-primary/25 shadow-[0_10px_25px_-10px_hsl(var(--primary)/0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_hsl(var(--primary)/0.95)]'

const sharedMobileFabButtonClass =
    'fixed bottom-22 right-4 z-40 h-13 w-13 rounded-full ring-2 ring-primary/30 shadow-[0_14px_34px_-14px_hsl(var(--primary)/0.95)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-18px_hsl(var(--primary)/1)] sm:hidden'

export function ListingPageHeader({
    title,
    description,
    addHref,
    addLabel,
    className,
    addButtonClassName,
    mobileFabClassName,
    mobileFilters,
    desktopFilters,
    activeFilters,
}: ListingPageHeaderProps) {
    return (
        <>
            <PageHeader
                title={title}
                description={description}
                showAddButton
                addHref={addHref}
                addButtonLabel={addLabel}
                addButtonClassName={cn(sharedDesktopAddButtonClass, addButtonClassName)}
                className={cn('mb-6', className)}
            />

            {mobileFilters}
            {desktopFilters}
            {activeFilters}

            <Link
                href={addHref}
                className={cn(buttonVariants({ variant: 'default', size: 'icon' }), sharedMobileFabButtonClass, mobileFabClassName)}
                aria-label={addLabel}
                title={addLabel}
            >
                <Plus className="h-5 w-5" />
            </Link>
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
