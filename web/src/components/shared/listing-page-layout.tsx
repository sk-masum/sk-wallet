import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ListingPageLayoutProps = {
    children: ReactNode
    className?: string
    contentClassName?: string
}

export function ListingPageLayout({
    children,
    className,
    contentClassName,
}: ListingPageLayoutProps) {
    return (
        <main className={cn('min-h-screen', className)}>
            <div className={cn('mx-auto w-full px-4 pb-28 pt-12 sm:px-6 lg:px-8', contentClassName)}>
                {children}
            </div>
        </main>
    )
}
