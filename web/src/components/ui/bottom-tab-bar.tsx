'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { BOTTOM_TABS } from '@/constants/ui/bottom-tabs'
import { cn } from '@/lib/utils'

export function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <div className="pointer-events-auto relative flex w-fit max-w-full items-center justify-center gap-1.5 rounded-4xl bg-white/70 p-1.5 shadow-[0_22px_40px_-28px_rgba(0,0,0,0.85)] backdrop-blur-xl dark:bg-neutral-900/72">
        <div className="pointer-events-none absolute inset-0 rounded-4xl bg-linear-to-b from-white/46 via-transparent to-transparent dark:from-white/12" />

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
                  ? 'gap-2 px-4 text-neutral-900 dark:text-neutral-50'
                  : 'w-12 bg-white/88 text-neutral-700 shadow-[0_8px_16px_-12px_rgba(0,0,0,0.6)] dark:bg-neutral-800/90 dark:text-neutral-100',
                active
                  ? 'hover:bg-black/5 dark:hover:bg-white/10'
                  : 'hover:bg-white dark:hover:bg-neutral-700/90'
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
    </nav>
  )
}
