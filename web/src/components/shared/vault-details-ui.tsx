import type { ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CopyButton } from '../ui/copy-button'

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
        <Card className={cn('mx-auto w-full max-w-120 border-border/70 bg-card/95 shadow-lg motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-300', className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {subtitle ? <CardDescription>{subtitle}</CardDescription> : null}
            </CardHeader>
            <CardContent className={cn('space-y-3 text-sm', contentClassName)}>{children}</CardContent>
        </Card>
    )
}

type VaultDetailsBlockProps = {
    label: string
    value?: string
    children?: ReactNode
    trailing?: ReactNode
    hasCopy?: boolean
    className?: string
    preserveWhitespace?: boolean
}

export function VaultDetailsBlock({ label, value, children, hasCopy = true, trailing, className, preserveWhitespace = false }: VaultDetailsBlockProps) {
    return (
        <div className={cn('rounded-xl border border-border/65 bg-background/70 p-3', className)}>
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-text-subtle">{label}</p>
                {(hasCopy && value) ? <CopyButton
                    value={value}
                    label={label}
                    className="inline-flex h-7 w-7 items-center justify-center rounded hover:bg-accent"
                    showStatusIcon
                    copyIconClassName="h-3.5 w-3.5"
                    checkIconClassName="h-3.5 w-3.5 text-green-600"
                /> : <div className="shrink-0">{trailing}</div>}
            </div>
            <div className="mt-1">
                {children ? children : <p className={cn('font-medium text-foreground', preserveWhitespace && 'whitespace-pre-wrap')}>{value}</p>}
            </div>
        </div>
    )
}

export type VaultDetailsFieldDescriptor = {
    key: string
    label: string
    value?: string
    children?: ReactNode
    trailing?: ReactNode
    hasCopy?: boolean
    className?: string
    preserveWhitespace?: boolean
    hidden?: boolean
}

type VaultDetailsFieldListProps = {
    fields: VaultDetailsFieldDescriptor[]
}

export function VaultDetailsFieldList({ fields }: VaultDetailsFieldListProps) {
    return (
        <>
            {fields
                .filter((field) => !field.hidden)
                .map((field) => (
                    <VaultDetailsBlock
                        key={field.key}
                        label={field.label}
                        value={field.value}
                        trailing={field.trailing}
                        hasCopy={field.hasCopy}
                        className={field.className}
                        preserveWhitespace={field.preserveWhitespace}
                    >
                        {field.children}
                    </VaultDetailsBlock>
                ))}
        </>
    )
}