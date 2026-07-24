'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Landmark, Layers3, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

type CardType = 'all' | 'credit' | 'debit'

interface CardTypeButtonGroupProps {
  selectedType: CardType
  hrefs?: {
    all: string
    credit: string
    debit: string
  }
  onSelect?: (type: CardType) => void
  className?: string
}

export function CardTypeButtonGroup({
  selectedType,
  hrefs,
  onSelect,
  className,
}: CardTypeButtonGroupProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [pendingType, setPendingType] = useState<CardType | null>(null)

  useEffect(() => {
    setPendingType(null)
  }, [selectedType])

  const handleSelect = (type: CardType) => {
    if (isPending || selectedType === type) return

    if (onSelect) {
      onSelect(type)
      return
    }

    if (!hrefs) return

    setPendingType(type)

    startTransition(() => {
      router.push(hrefs[type])
    })
  }

  const options: Array<{ key: CardType; label: string; icon: typeof Layers3 }> = [
    { key: 'all', label: 'All', icon: Layers3 },
    { key: 'credit', label: 'Credit', icon: CreditCard },
    { key: 'debit', label: 'Debit', icon: Landmark },
  ]

  return (
    <div
      className={cn(
        'relative isolate grid h-10 w-full max-w-sm grid-cols-3 rounded-xl border border-glass-border bg-glass p-1 shadow-neu-inset backdrop-blur-md ',
        className
      )}
      aria-busy={isPending}
    >
      {options.map((option) => {
        const isActive = selectedType === option.key
        const isLoading = isPending && pendingType === option.key
        const Icon = option.icon

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => handleSelect(option.key)}
            disabled={isPending}
            className={cn(
              'z-10 h-full w-full rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ease-out disabled:pointer-events-none',
              'inline-flex items-center justify-center gap-1.5 px-2',
              'focus-visible:z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45',
              isActive
                ? 'border border-glass-border bg-glass-strong text-foreground shadow-neu-inset-sm ring-1 ring-glass-overlay-strong  dark:ring-glass-overlay-soft'
                : 'text-text-subtle hover:border hover:border-glass-border-soft hover:bg-glass-strong hover:text-foreground hover:shadow-neu-raised-sm '
            )}
            aria-pressed={isActive}
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            {!isLoading ? <Icon className="h-3.5 w-3.5" /> : null}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
