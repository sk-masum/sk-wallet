'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { DialogClose, ResponsiveDialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type DetailDialogContentProps = Omit<React.ComponentProps<typeof ResponsiveDialogContent>, 'showCloseButton'> & {
    scrollClassName?: string
}

export function DetailDialogContent({
    className,
    scrollClassName,
    children,
    ...props
}: DetailDialogContentProps) {
    return (
        <ResponsiveDialogContent
            showCloseButton={false}
            className={cn(
                'max-h-[90dvh] max-w-120 overflow-visible border-0 bg-transparent p-0 shadow-none max-sm:rounded-none',
                className
            )}
            {...props}
        >
            <DialogClose
                className={cn(
                    buttonVariants({ variant: 'secondary', size: 'icon' }),
                    'absolute -top-12 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full border border-glass-border-subtle bg-background/80 backdrop-blur max-sm:hidden'
                )}
                aria-label="Close"
            >
                <X className="h-4 w-4" />
            </DialogClose>

            <DialogClose
                aria-label="Close"
                className="mx-auto my-2 h-1.5 w-10 rounded-full bg-foreground/25 transition-opacity hover:opacity-80 sm:hidden"
            />

            <div className={cn('max-h-[calc(90dvh-2rem)] overflow-y-auto px-0 sm:px-0', scrollClassName)}>
                {children}
            </div>
        </ResponsiveDialogContent>
    )
}
