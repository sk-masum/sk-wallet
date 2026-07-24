import Link from 'next/link'
import { ArrowLeft, LayoutDashboard } from 'lucide-react'
import type { ReactNode } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { responsiveIconSizes } from '@/components/ui/icon-sizes'
import { cn } from '@/lib/utils'

type PageHeaderProps = {
  title: ReactNode
  description?: ReactNode
  className?: string
  addButtonClassName?: string
  showBackButton?: boolean
  backHref?: string
  backButtonLabel?: string
  backButtonIcon?: 'arrow' | 'dashboard'
  backButtonAlign?: 'left' | 'right'
  rightSlot?: ReactNode
  showAddButton?: boolean
  addButtonLabel?: string
}

export function PageHeader({
  title,
  className,
  showBackButton = false,
  backHref = '/',
  backButtonLabel = 'Go back',
  backButtonIcon = 'arrow',
  backButtonAlign = 'left',
  rightSlot,
}: PageHeaderProps) {
  const backButton = showBackButton ? (
    <Link
      href={backHref}
      className={cn(
        buttonVariants({ variant: 'toolbar', size: 'iconLg' }),
        ' sm:h-12 sm:w-12'
      )}
      aria-label={backButtonLabel}
      title={backButtonLabel}
    >
      {backButtonIcon === 'dashboard' ? (
        <LayoutDashboard className={responsiveIconSizes.header} />
      ) : (
        <ArrowLeft className={responsiveIconSizes.header} />
      )}
    </Link>
  ) : null

  return (
    <header className={cn('mb-12 flex items-center justify-between gap-3', className)}>
      <div className="flex items-center gap-3">
        {backButtonAlign === 'left' ? backButton : null}

        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        </div>

      </div>

      {rightSlot ?? (backButtonAlign === 'right' ? backButton : null)}
    </header>
  )
}
