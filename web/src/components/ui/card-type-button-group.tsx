'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CardType = 'all' | 'credit' | 'debit'

interface CardTypeButtonGroupProps {
  selectedType: CardType
  hrefs: {
    all: string
    credit: string
    debit: string
  }
  className?: string
}

export function CardTypeButtonGroup({
  selectedType,
  hrefs,
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
    setPendingType(type)

    startTransition(() => {
      router.push(hrefs[type])
    })
  }

  return (
    <div
      className={cn('grid h-9 w-full max-w-sm grid-cols-3 rounded-md border border-border', className)}
      aria-busy={isPending}
    >
      <button
        type="button"
        onClick={() => handleSelect('all')}
        disabled={isPending}
        className={cn(
          buttonVariants({ variant: selectedType === 'all' ? 'secondary' : 'ghost' }),
          'h-full w-full justify-center rounded-none border-r border-border first:rounded-l-md disabled:pointer-events-none'
        )}
      >
        {isPending && pendingType === 'all' ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
        All
      </button>
      <button
        type="button"
        onClick={() => handleSelect('credit')}
        disabled={isPending}
        className={cn(
          buttonVariants({ variant: selectedType === 'credit' ? 'secondary' : 'ghost' }),
          'h-full w-full justify-center rounded-none border-r border-border disabled:pointer-events-none'
        )}
      >
        {isPending && pendingType === 'credit' ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
        Credit
      </button>
      <button
        type="button"
        onClick={() => handleSelect('debit')}
        disabled={isPending}
        className={cn(
          buttonVariants({ variant: selectedType === 'debit' ? 'secondary' : 'ghost' }),
          'h-full w-full justify-center rounded-none last:rounded-r-md disabled:pointer-events-none'
        )}
      >
        {isPending && pendingType === 'debit' ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
        Debit
      </button>
    </div>
  )
}
