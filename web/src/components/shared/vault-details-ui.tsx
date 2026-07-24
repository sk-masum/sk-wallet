import type { ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type VaultDetailsCardProps = {
    title: ReactNode
    subtitle?: ReactNode
    className?: string
    contentClassName?: string
    children: ReactNode
}

export function VaultDetailsCard({
    title,
    subtitle,
    className,
    contentClassName,
    children,
}: VaultDetailsCardProps) {
    return (
        <Card className={cn('mx-auto w-full max-w-120 border-border/70 bg-card/95 shadow-lg', className)}>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">{title}</CardTitle>
                {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
            </CardHeader>
            <CardContent className={cn('space-y-3 text-sm', contentClassName)}>{children}</CardContent>
        </Card>
    )
}

type VaultDetailsBlockProps = {
    label: ReactNode
    children: ReactNode
    trailing?: ReactNode
    className?: string
}

export function VaultDetailsBlock({ label, children, trailing, className }: VaultDetailsBlockProps) {
    return (
        <div className={cn('rounded-xl border border-border/65 bg-background/70 p-3', className)}>
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground dark:text-foreground/78">{label}</p>
                {trailing ? <div className="shrink-0">{trailing}</div> : null}
            </div>
            <div className="mt-1">{children}</div>
        </div>
    )
}

type VaultDetailsGridProps = {
    children: ReactNode
    className?: string
}

export function VaultDetailsGrid({ children, className }: VaultDetailsGridProps) {
    return <div className={cn('grid gap-3 sm:grid-cols-2', className)}>{children}</div>
}
