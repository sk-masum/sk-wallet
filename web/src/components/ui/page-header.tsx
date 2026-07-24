import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import type { ReactNode } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode
  className?: string
  addButtonClassName?: string
  showBackButton?: boolean
  backHref?: string
  backButtonLabel?: string
  showAddButton?: boolean
  addButtonLabel?: string
}

export function PageHeader({
  title,
  description,
  className,
  showBackButton = false,
  backHref = '/',
  backButtonLabel = 'Go back',
}: PageHeaderProps) {
  return (
    <header className={cn('mb-8 flex items-start justify-between gap-3', className)}>
      <div className="flex items-center gap-3">
        {showBackButton ? (
          <Link
            href={backHref}
            className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'h-10 w-10 rounded-full')}
            aria-label={backButtonLabel}
            title={backButtonLabel}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : null}

        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          {description ? <p className="mt-1 text-sm text-muted-foreground dark:text-foreground/82">{description}</p> : null}
        </div>
      </div>
    </header>
  )
}
