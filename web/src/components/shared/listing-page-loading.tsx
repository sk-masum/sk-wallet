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

                    <div className="mb-4 hidden items-center gap-3 rounded-2xl border border-border/70 bg-background/85 p-3 shadow-lg backdrop-blur sm:flex">
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

            <Skeleton className="fixed bottom-22 right-4 h-13 w-13 rounded-full sm:hidden" />
        </ListingPageLayout>
    )
}
