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
        'relative isolate grid h-10 w-full max-w-sm grid-cols-3 rounded-xl border border-white/40 bg-(--glass-surface) p-1 shadow-(--neu-shadow-inset) backdrop-blur-md dark:border-white/12',
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
                ? 'border border-white/40 bg-(--glass-surface-strong) text-foreground shadow-(--neu-shadow-inset-sm) ring-1 ring-white/30 dark:border-white/12 dark:ring-white/8'
                : 'text-muted-foreground hover:border hover:border-white/35 hover:bg-(--glass-surface-strong) hover:text-foreground hover:shadow-(--neu-shadow-raised-sm) dark:hover:border-white/12'
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
