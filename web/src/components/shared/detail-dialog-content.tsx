'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { DialogClose, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type DetailDialogContentProps = Omit<React.ComponentProps<typeof DialogContent>, 'showCloseButton'> & {
    scrollClassName?: string
}

export function DetailDialogContent({
    className,
    scrollClassName,
    children,
    ...props
}: DetailDialogContentProps) {
    return (
        <DialogContent
            showCloseButton={false}
            className={cn(
                'max-h-[90dvh] w-[calc(100vw-2rem)] max-w-120 overflow-visible border-0 bg-transparent p-0 shadow-none max-sm:top-auto max-sm:left-0 max-sm:right-0 max-sm:bottom-0 max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none',
                className
            )}
            {...props}
        >
            <DialogClose
                className={cn(
                    buttonVariants({ variant: 'secondary', size: 'icon' }),
                    'absolute -top-12 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full border border-white/30 bg-background/80 backdrop-blur max-sm:hidden'
                )}
                aria-label="Close"
            >
                <X className="h-4 w-4" />
            </DialogClose>

            <DialogClose
                aria-label="Close"
                className="mx-auto my-2 h-1.5 w-10 rounded-full bg-foreground/25 transition-opacity hover:opacity-80 sm:hidden"
            />

            <div className={cn('max-h-[calc(90dvh-2rem)] overflow-y-auto px-4 pb-4 sm:px-0 sm:pb-0', scrollClassName)}>
                {children}
            </div>
        </DialogContent>
    )
}
