import { Skeleton } from '@/components/ui/skeleton'

import { ListingPageLayout } from '@/components/shared/listing-page-layout'

type ListingPageLoadingProps = {
    title: string
    description: string
    contentClassName: string
    showCardFilters?: boolean
    children: React.ReactNode
}

export function ListingPageLoading({
    title,
    description,
    contentClassName,
    showCardFilters = false,
    children,
}: ListingPageLoadingProps) {
    return (
        <ListingPageLayout contentClassName={contentClassName}>
            <div className="mb-6 flex items-start justify-between gap-3">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold">{title}</h1>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Skeleton className="hidden h-10 w-10 rounded-full sm:block" />
            </div>

            {showCardFilters ? (
                <>
                    <div className="mb-4 sm:hidden">
                        <Skeleton className="h-12 w-full rounded-2xl" />
                    </div>

                    <div className="mb-4 hidden items-center gap-3 rounded-2xl border border-white/35 bg-(--glass-surface) p-3 shadow-(--neu-shadow-raised-sm) backdrop-blur dark:border-white/14 sm:flex">
                        <Skeleton className="h-10 flex-1 rounded-xl" />
                        <Skeleton className="h-10 w-84 rounded-xl" />
                        <Skeleton className="h-10 w-48 rounded-xl" />
                    </div>

                    <div className="mb-5 hidden gap-2 sm:flex">
                        <Skeleton className="h-6 w-28 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                </>
            ) : null}

            {children}

            <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:hidden">
                <div className="flex items-center">
                    <Skeleton className="h-15 w-70 rounded-4xl" />
                    <Skeleton className="ml-3 h-15 w-15 rounded-4xl" />
                </div>
            </div>
        </ListingPageLayout>
    )
}
