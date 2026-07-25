import type { ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'

import { SURFACE_REVEAL_CLASS } from '@/constants/ui/animation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DetailDialogBodyProps = {
    children: ReactNode
    className?: string
}

export function DetailDialogBody({ children, className }: DetailDialogBodyProps) {
    return <div className={cn('mx-auto w-full max-w-120 space-y-3', className)}>{children}</div>
}

type DetailDialogLoadingNoticeProps = {
    message: string
    className?: string
}

export function DetailDialogLoadingNotice({ message, className }: DetailDialogLoadingNoticeProps) {
    return (
        <div className={cn('rounded-2xl border border-border/65 bg-background/95 px-4 py-3', className)}>
            <div className="inline-flex items-center gap-2 text-sm text-text-subtle">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                {message}
            </div>
        </div>
    )
}

type DetailDialogErrorStateProps = {
    message: string
    actionLabel: string
    onAction: () => void
    minHeightClassName?: string
    className?: string
}

export function DetailDialogErrorState({
    message,
    actionLabel,
    onAction,
    minHeightClassName = 'min-h-56',
    className,
}: DetailDialogErrorStateProps) {
    return (
        <div
            className={cn(
                'mx-auto flex w-full max-w-120 flex-col items-center justify-center gap-4 rounded-2xl border border-border/65 bg-background/95 px-6 py-8 text-center',
                minHeightClassName,
                SURFACE_REVEAL_CLASS,
                className
            )}
        >
            <p className="text-sm text-text-subtle">{message}</p>
            <Button type="button" variant="outline" onClick={onAction}>
                {actionLabel}
            </Button>
        </div>
    )
}