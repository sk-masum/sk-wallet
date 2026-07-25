import type { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type MiniVerticalCarouselCardProps = {
    href: string
    onClick?: () => void
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
    onClick,
    title,
    subtitle,
    media,
    leadingMedia,
    className,
    titleClassName,
    subtitleClassName,
}: MiniVerticalCarouselCardProps) {
    const cardClassName = cn(
        'interactive-lift interactive-ring group relative flex min-h-56 min-w-44 flex-col justify-between overflow-hidden rounded-3xl border border-glass-border-strong bg-glass p-3.5 text-foreground shadow-neu-raised-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-glass-strong first:ml-2',
        className
    )

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={cardClassName}
            >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-glass-overlay via-transparent to-transparent" />
                <div className="space-y-3">
                    <div className="flex h-10 items-start justify-between gap-2">
                        <div>{leadingMedia}</div>
                        <div>{media}</div>
                    </div>
                </div>

                <div className="relative space-y-1 text-left">
                    <p className={cn('line-clamp-2 text-base font-semibold leading-tight text-foreground', titleClassName)}>{title}</p>
                    {subtitle ? <p className={cn('line-clamp-1 text-xs text-text-soft ', subtitleClassName)}>{subtitle}</p> : null}
                </div>
            </button>
        )
    }

    return (
        <Link
            href={href}
            className={cardClassName}
        >
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-glass-overlay via-transparent to-transparent" />
            <div className="space-y-3">
                <div className="flex h-10 items-start justify-between gap-2">
                    <div>{leadingMedia}</div>
                    <div>{media}</div>
                </div>
            </div>

            <div className="relative space-y-1">
                <p className={cn('line-clamp-2 text-base font-semibold leading-tight text-foreground', titleClassName)}>{title}</p>
                {subtitle ? <p className={cn('line-clamp-1 text-xs text-text-soft ', subtitleClassName)}>{subtitle}</p> : null}
            </div>
        </Link>
    )
}
