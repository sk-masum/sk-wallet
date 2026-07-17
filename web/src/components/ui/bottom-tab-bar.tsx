'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import { BOTTOM_TABS } from '@/constants/ui/bottom-tabs'
import { cn } from '@/lib/utils'

export function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <div className="pointer-events-auto relative flex items-center gap-1 rounded-full border border-white/30 bg-white/10 p-1 shadow-[0_18px_38px_-24px_rgba(0,0,0,0.65)] backdrop-blur-2xl supports-backdrop-filter:bg-white/12 dark:border-white/15 dark:bg-slate-900/30">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/35 via-white/8 to-transparent dark:from-slate-200/8 dark:via-slate-200/3 dark:to-transparent" />

        {BOTTOM_TABS.map((tab) => {
          const active = tab.match(pathname)
          const Icon = tab.icon

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                buttonVariants({ variant: active ? 'secondary' : 'ghost', size: 'sm' }),
                'relative h-10 rounded-full px-4 text-sm',
                active
                  ? 'bg-white/55 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] hover:bg-white/65 dark:bg-white/18 dark:text-white'
                  : 'text-slate-700 hover:bg-white/20 dark:text-slate-100 dark:hover:bg-white/10'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="mr-1 h-4 w-4" />
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
