import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { responsiveIconSizes } from '../ui/icon-sizes'

import { cn } from '@/lib/utils'

type SharedCarouselSectionProps<T> = {
    title: string
    actionHref: string
    actionLabel: string
    emptyMessage: string
    items: T[]
    getItemKey: (item: T) => string
    renderItem: (item: T) => ReactNode
    className?: string
    trackClassName?: string
}

export function SharedCarouselSection<T>({
    title,
    actionHref,
    actionLabel,
    emptyMessage,
    items,
    getItemKey,
    renderItem,
    className,
    trackClassName,
}: SharedCarouselSectionProps<T>) {
    return (
        <section className={cn('relative overflow-hidden sm:px-4 sm:py-5', className)}>
            <div className="pointer-events-none absolute inset-0 " />
            <div className="relative mb-4 flex items-end justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-foreground sm:text-2xl">{title}</h3>
                </div>
                <Link href={actionHref} className="interactive-lift interactive-ring inline-flex items-center rounded-full border border-glass-border-strong bg-glass px-3 py-1 text-xs font-semibold text-text-subtle shadow-neu-raised-sm backdrop-blur-sm transition-colors hover:bg-glass-strong hover:text-foreground">
                    <ArrowUpRight className={responsiveIconSizes.action} /> {actionLabel}
                </Link>
            </div>

            <div className="relative">
                {items.length === 0 ? (
                    <p className="text-sm text-text-subtle">{emptyMessage}</p>
                ) : (
                    <div
                        className={cn(
                            '-mx-1 flex snap-x snap-mandatory gap-1 sm:gap-3 overflow-x-auto px-1 pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden',
                            trackClassName
                        )}
                    >
                        {items.map((item) => (
                            <div key={getItemKey(item)} className="snap-start">
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
