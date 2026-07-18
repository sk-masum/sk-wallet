'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type ListingFilterDesktopPanelProps = {
    children: ReactNode
    className?: string
}

export function ListingFilterDesktopPanel({ children, className }: ListingFilterDesktopPanelProps) {
    return (
        <div className={cn('mt-3 space-y-4 rounded-2xl bg-background/94 p-4 shadow-inner shadow-black/5 ring-1 ring-border/30', className)}>
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
        <div className={cn('space-y-1.5 rounded-2xl bg-card/72 p-4 ring-1 ring-border/30', className)}>
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
            <DialogContent
                className={cn(
                    'top-auto bottom-0 left-0 right-0 flex max-h-[88dvh] w-full max-w-none translate-x-0 translate-y-0 flex-col overflow-hidden rounded-t-3xl rounded-b-none border-x-0 border-t border-border/55 bg-linear-to-b from-background via-background to-card/55 pb-6 shadow-[0_-30px_70px_-26px_hsl(var(--foreground)/0.55)] sm:hidden',
                    className
                )}
            >
                <div className="sticky top-0 z-10 border-b border-border/45 bg-background/92 pb-3 backdrop-blur-xl">
                    <div className="mx-auto h-1.5 w-14 rounded-full bg-muted/90" />
                    <DialogHeader>
                        <DialogTitle className="text-left text-base">{title}</DialogTitle>
                        <DialogDescription className="text-left">{description}</DialogDescription>
                    </DialogHeader>
                </div>

                <div className="mt-3 space-y-4 overflow-y-auto pr-1">{children}</div>
            </DialogContent>
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
        <div className={cn('space-y-2 rounded-2xl border border-border/50 bg-card/68 p-3.5 shadow-[0_14px_24px_-16px_hsl(var(--foreground)/0.45)]', className)}>
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
        <div className="flex items-center gap-2 pt-1">
            {hasActiveControls ? (
                resetHref ? (
                    <Link
                        href={resetHref}
                        className={cn(buttonVariants({ variant: 'ghost' }), 'h-10 flex-1 justify-center rounded-xl border border-border/60 bg-background/80')}
                        onClick={onDone}
                    >
                        Reset all
                    </Link>
                ) : (
                    <Button
                        type="button"
                        variant="ghost"
                        className="h-10 flex-1 justify-center rounded-xl border border-border/60 bg-background/80"
                        onClick={() => {
                            onReset?.()
                            onDone()
                        }}
                    >
                        Reset all
                    </Button>
                )
            ) : null}
            <Button type="button" className="h-10 flex-1 rounded-xl" onClick={onDone}>
                {doneLabel}
            </Button>
        </div>
    )
}
