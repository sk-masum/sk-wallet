import type { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type MiniVerticalCarouselCardProps = {
    href: string
    title: string
    subtitle?: string
    media?: ReactNode
    leadingMedia?: ReactNode
    className?: string
    titleClassName?: string
    subtitleClassName?: string
}

export function MiniVerticalCarouselCard({
    href,
    title,
    subtitle,
    media,
    leadingMedia,
    className,
    titleClassName,
    subtitleClassName,
}: MiniVerticalCarouselCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                'group relative flex min-h-56 min-w-44 flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-linear-to-b from-background to-muted/25 p-3.5 transition-colors hover:bg-muted/35',
                className
            )}
        >
            <div className="space-y-3">
                <div className="flex h-10 items-start justify-between gap-2">
                    <div>{leadingMedia}</div>
                    <div>{media}</div>
                </div>
            </div>

            <div className="space-y-1">
                <p className={cn('line-clamp-2 text-base font-semibold leading-tight text-foreground', titleClassName)}>{title}</p>
                {subtitle ? <p className={cn('line-clamp-1 text-xs text-muted-foreground', subtitleClassName)}>{subtitle}</p> : null}
            </div>
        </Link>
    )
}
