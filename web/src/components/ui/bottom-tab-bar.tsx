'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus } from 'lucide-react'

import { BOTTOM_TABS } from '@/constants/ui/bottom-tabs'
import { cn } from '@/lib/utils'

type BottomTabBarProps = {
  addHref?: string
  addLabel?: string
}

export function BottomTabBar({ addHref, addLabel = 'Add' }: BottomTabBarProps) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <div className="pointer-events-auto flex items-center">
        <div className="relative flex w-fit max-w-full items-center justify-center gap-1.5 rounded-4xl border border-glass-border-strong bg-glass p-1.5 shadow-neu-raised-sm backdrop-blur-lg ">
          <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-b from-glass-overlay-strong via-transparent to-transparent dark:from-glass-overlay-soft" />

          {BOTTOM_TABS.map((tab) => {
            const active = tab.match(pathname)
            const Icon = tab.icon

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'relative inline-flex h-12 items-center justify-center rounded-full text-sm transition-colors',
                  active
                    ? 'gap-2 px-4 border border-primary/45 bg-primary text-primary-foreground font-medium shadow-primary-card dark:border-primary/60 dark:bg-primary dark:text-primary-foreground dark:shadow-primary-card-dark'
                    : 'w-12 border border-glass-border-soft bg-glass text-text-subtle shadow-neu-raised-sm hover:bg-glass-strong '
                )}
                aria-current={active ? 'page' : undefined}
                aria-label={tab.label}
                title={tab.label}
              >
                <Icon className={cn('h-4 w-4', active && '-mr-0.5')} />
                {active ? tab.label : null}
              </Link>
            )
          })}
        </div>

        {addHref ? (
          <Link
            href={addHref}
            className="group relative ml-3 inline-flex h-15 w-15 items-center justify-center overflow-hidden rounded-4xl bg-linear-to-br from-primary via-primary to-primary/85 text-primary-foreground shadow-fab ring-1 ring-primary/35 transition-all duration-200 hover:-translate-y-0.5 hover:from-primary/95 hover:to-primary hover:shadow-fab-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 dark:shadow-fab-dark dark:ring-primary/55 dark:hover:shadow-fab-dark-hover dark:focus-visible:ring-primary/85"
            aria-label={addLabel}
            title={addLabel}
          >
            <span className="pointer-events-none absolute inset-0 bg-linear-to-b from-glass-overlay-strong via-transparent to-transparent opacity-90 dark:from-glass-overlay" />
            <span className="pointer-events-none absolute -top-5 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full bg-glass-overlay-strong blur-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-primary-foreground/22" />
            <Plus className="relative h-7 w-7 drop-shadow-icon-soft dark:drop-shadow-icon-strong" />
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
