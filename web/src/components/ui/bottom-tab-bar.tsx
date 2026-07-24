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
        <div className="relative flex w-fit max-w-full items-center justify-center gap-1.5 rounded-4xl border border-white/45 bg-(--glass-surface) p-1.5 shadow-(--neu-shadow-raised-sm) backdrop-blur-lg dark:border-white/12">
          <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-b from-white/50 via-transparent to-transparent dark:from-white/12" />

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
                    ? 'gap-2 px-4 border border-white/40 bg-(--glass-surface-strong) text-primary shadow-(--neu-shadow-inset-sm) dark:border-white/15'
                    : 'w-12 border border-white/35 bg-(--glass-surface) text-muted-foreground shadow-(--neu-shadow-raised-sm) hover:bg-(--glass-surface-strong) dark:border-white/12'
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
            className="group relative ml-3 inline-flex h-15 w-15 items-center justify-center overflow-hidden rounded-4xl bg-linear-to-br from-primary via-primary to-primary/85 text-primary-foreground shadow-[0_18px_34px_-16px_hsl(var(--primary)/0.8)] ring-1 ring-primary/35 transition-all duration-200 hover:-translate-y-0.5 hover:from-primary/95 hover:to-primary hover:shadow-[0_24px_40px_-18px_hsl(var(--primary)/0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 dark:shadow-[0_22px_40px_-16px_rgba(0,0,0,0.85)] dark:ring-primary/55 dark:hover:shadow-[0_28px_44px_-18px_rgba(0,0,0,0.92)] dark:focus-visible:ring-primary/85"
            aria-label={addLabel}
            title={addLabel}
          >
            <span className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/26 via-transparent to-transparent opacity-90 dark:from-white/20" />
            <span className="pointer-events-none absolute -top-5 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full bg-white/30 blur-md transition-opacity duration-200 group-hover:opacity-100 dark:bg-primary-foreground/22" />
            <Plus className="relative h-7 w-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]" />
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
