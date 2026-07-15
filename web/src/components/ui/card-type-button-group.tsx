import Link from 'next/link'

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
  return (
    <div className={cn('grid h-9 w-full max-w-sm grid-cols-3 rounded-md border border-border', className)}>
      <Link
        href={hrefs.all}
        className={cn(
          buttonVariants({ variant: selectedType === 'all' ? 'secondary' : 'ghost' }),
          'h-full w-full justify-center rounded-none border-r border-border first:rounded-l-md'
        )}
      >
        All
      </Link>
      <Link
        href={hrefs.credit}
        className={cn(
          buttonVariants({ variant: selectedType === 'credit' ? 'secondary' : 'ghost' }),
          'h-full w-full justify-center rounded-none border-r border-border'
        )}
      >
        Credit
      </Link>
      <Link
        href={hrefs.debit}
        className={cn(
          buttonVariants({ variant: selectedType === 'debit' ? 'secondary' : 'ghost' }),
          'h-full w-full justify-center rounded-none last:rounded-r-md'
        )}
      >
        Debit
      </Link>
    </div>
  )
}
