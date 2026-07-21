'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { DetailDialogContent } from '@/components/shared/detail-dialog-content'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type ListingFilterDesktopPanelProps = {
    children: ReactNode
    className?: string
}

export function ListingFilterDesktopPanel({ children, className }: ListingFilterDesktopPanelProps) {
    return (
        <div
            className={cn(
                'mt-3 space-y-4 rounded-2xl bg-background/95 p-3 sm:p-4 shadow-[0_18px_36px_-28px_rgba(0,0,0,0.55)] ring-1 ring-border/20 dark:bg-background/90 dark:ring-border/45',
                className,
            )}
        >
            {children}
        </div>
    )
}

type ListingFilterDesktopSectionProps = {
    label: string
    children: ReactNode
    className?: string
    labelClassName?: string
}

export function ListingFilterDesktopSection({
    label,
    children,
    className,
    labelClassName,
}: ListingFilterDesktopSectionProps) {
    return (
        <div
            className={cn(
                'space-y-1.5 rounded-2xl border border-border/40 bg-card/75 p-4 shadow-[0_10px_22px_-18px_rgba(0,0,0,0.45)] dark:border-border/60 dark:bg-card/65',
                className,
            )}
        >
            <p className={cn('text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase', labelClassName)}>
                {label}
            </p>
            {children}
        </div>
    )
}

type ListingFilterDesktopActionsProps = {
    hasActiveControls: boolean
    collapseLabel?: string
    className?: string
    resetHref?: string
    onReset?: () => void
    onCollapse: () => void
}

export function ListingFilterDesktopActions({
    hasActiveControls,
    collapseLabel = 'Collapse',
    className,
    resetHref,
    onReset,
    onCollapse,
}: ListingFilterDesktopActionsProps) {
    return (
        <div className={cn('mt-1 flex items-center justify-end gap-2 pt-1', className)}>
            {hasActiveControls ? (
                resetHref ? (
                    <Link
                        href={resetHref}
                        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-10 rounded-xl bg-muted/55 px-4')}
                        onClick={onCollapse}
                    >
                        Reset all
                    </Link>
                ) : (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-10 rounded-xl bg-muted/55 px-4"
                        onClick={() => {
                            onReset?.()
                            onCollapse()
                        }}
                    >
                        Reset all
                    </Button>
                )
            ) : null}
            <Button type="button" className="h-10 rounded-xl px-5" onClick={onCollapse}>
                {collapseLabel}
            </Button>
        </div>
    )
}

type ListingFilterMobileSheetProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    children: ReactNode
    className?: string
}

export function ListingFilterMobileSheet({
    open,
    onOpenChange,
    title,
    description,
    children,
    className,
}: ListingFilterMobileSheetProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DetailDialogContent className={cn('sm:hidden', className)} scrollClassName="max-h-[calc(88dvh-2rem)] px-0 pb-0">
                <div className="space-y-3 rounded-t-2xl bg-linear-to-b from-background via-background to-card/50 px-3 pb-4 pt-4 shadow-[0_-32px_80px_-30px_rgba(0,0,0,0.58)] dark:from-background dark:via-background/95 dark:to-card/70">
                    <div className="sticky top-0 z-20 -mx-1 rounded-t-2xl border-b border-border/45 bg-linear-to-b from-background/98 via-background/95 to-background/88 px-1 pb-3 pt-1 shadow-[0_14px_24px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl dark:border-border/60 dark:from-background/95 dark:via-background/92 dark:to-background/80">
                        <DialogHeader>
                            <DialogTitle className="text-left text-2xl">{title}</DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="space-y-4 overflow-y-auto pr-1">{children}</div>
                </div>
            </DetailDialogContent>
        </Dialog>
    )
}

type ListingFilterMobileSectionProps = {
    label: string
    icon?: ReactNode
    children: ReactNode
    className?: string
}

export function ListingFilterMobileSection({ label, icon, children, className }: ListingFilterMobileSectionProps) {
    return (
        <div
            className={cn(
                'space-y-2 rounded-2xl border border-border/45 bg-card/76 p-3.5 shadow-[0_16px_28px_-20px_rgba(0,0,0,0.5)] dark:border-border/60 dark:bg-card/66',
                className,
            )}
        >
            <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                {icon}
                {label}
            </p>
            {children}
        </div>
    )
}

type ListingFilterMobileActionsProps = {
    hasActiveControls: boolean
    doneLabel?: string
    resetHref?: string
    onReset?: () => void
    onDone: () => void
}

export function ListingFilterMobileActions({
    hasActiveControls,
    doneLabel = 'Done',
    resetHref,
    onReset,
    onDone,
}: ListingFilterMobileActionsProps) {
    return (
        <div className="sticky bottom-0 z-10 -mx-1 mt-1 flex items-center gap-2 rounded-xl border border-border/45 bg-background/92 p-2 backdrop-blur-sm dark:border-border/60 dark:bg-background/86">
            {hasActiveControls ? (
                resetHref ? (
                    <Link
                        href={resetHref}
                        className={cn(buttonVariants({ variant: 'ghost' }), 'h-10 flex-1 justify-center rounded-xl border border-border/60 bg-background/80 hover:bg-background')}
                        onClick={onDone}
                    >
                        Reset all
                    </Link>
                ) : (
                    <Button
                        type="button"
                        variant="ghost"
                        className="h-10 flex-1 justify-center rounded-xl border border-border/60 bg-background/80 hover:bg-background"
                        onClick={() => {
                            onReset?.()
                            onDone()
                        }}
                    >
                        Reset all
                    </Button>
                )
            ) : null}
            <Button type="button" className="h-10 flex-1 rounded-xl shadow-[0_10px_20px_-14px_hsl(var(--primary))]" onClick={onDone}>
                {doneLabel}
            </Button>
        </div>
    )
}
