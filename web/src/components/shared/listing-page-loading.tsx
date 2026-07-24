import { Skeleton } from '@/components/ui/skeleton'

import { ListingPageLayout } from '@/components/shared/listing-page-layout'

type ListingPageLoadingProps = {
    title: string
    description: string
    contentClassName: string
    showFilters?: boolean
    showCardFilters?: boolean
    children: React.ReactNode
}

export function ListingPageLoading({
    title,
    description,
    contentClassName,
    showFilters = true,
    showCardFilters = false,
    children,
}: ListingPageLoadingProps) {
    return (
        <ListingPageLayout contentClassName={contentClassName}>
            <div className="-mx-4 sticky top-0 z-40 mb-4 border-b border-white/35 bg-[linear-gradient(to_bottom,hsl(var(--background)/0.9),hsl(var(--background)/0.82)),var(--glass-surface)] px-4 pt-[calc(env(safe-area-inset-top)+0.5rem)] shadow-(--neu-shadow-raised) backdrop-blur-xl dark:border-white/14 sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pt-0 sm:shadow-none sm:ring-0 sm:backdrop-blur-none">
                <div className="mb-3 flex items-center justify-between gap-3 pt-6 sm:mb-4 sm:pt-0">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-11 w-11 shrink-0 rounded-full sm:h-12 sm:w-12" />

                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
                            <p className="mt-1 text-sm text-muted-foreground dark:text-foreground/82">{description}</p>
                        </div>
                    </div>
                </div>

                {showFilters ? (
                    <>
                        <div className="mb-4 sm:hidden">
                            <div className="flex items-center gap-2 py-2">
                                <Skeleton className="h-10 flex-1 rounded-xl" />
                                <Skeleton className="h-10 w-28 rounded-xl" />
                            </div>
                        </div>

                        <div className="mb-4 hidden items-center gap-3 sm:flex">
                            <Skeleton className="h-10 flex-1 rounded-xl" />
                            <Skeleton className="h-10 w-26 rounded-xl" />
                            <Skeleton className="h-10 w-20 rounded-xl" />
                        </div>
                    </>
                ) : null}
            </div>

            {showCardFilters ? (
                <>
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
