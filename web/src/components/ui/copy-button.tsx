'use client'

import { useEffect, useRef, useState, type ButtonHTMLAttributes } from 'react'
import { Check, Copy } from 'lucide-react'

import { copyWithToast } from '@/utils/copy'
import { cn } from '@/lib/utils'

type CopyButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    value: string
    label: string
    showStatusIcon?: boolean
    copyIconClassName?: string
    checkIconClassName?: string
    copiedDurationMs?: number
}

export function CopyButton({
    value,
    label,
    showStatusIcon = false,
    copyIconClassName,
    checkIconClassName,
    copiedDurationMs = 1200,
    className,
    children,
    type,
    ...props
}: CopyButtonProps) {
    const [copied, setCopied] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleCopy = async () => {
        const ok = await copyWithToast(value, label)
        if (!ok) return

        setCopied(true)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            setCopied(false)
        }, copiedDurationMs)
    }

    return (
        <button
            type={type ?? 'button'}
            className={className}
            onClick={() => {
                void handleCopy()
            }}
            aria-label={`Copy ${label.toLowerCase()}`}
            {...props}
        >
            {children}
            {showStatusIcon ? (
                copied ? (
                    <Check className={cn('h-4 w-4 text-green-300', checkIconClassName)} />
                ) : (
                    <Copy className={cn('h-4 w-4', copyIconClassName)} />
                )
            ) : null}
        </button>
    )
}
