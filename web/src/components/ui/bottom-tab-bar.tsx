'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookText, CreditCard } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const tabs = [
  {
    href: '/card',
    label: 'Card',
    icon: CreditCard,
    match: (pathname: string) => pathname.startsWith('/card'),
  },
  {
    href: '/doc',
    label: 'Doc',
    icon: BookText,
    match: (pathname: string) => pathname.startsWith('/doc'),
  },
]

export function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
    >
      <div className="pointer-events-auto relative flex items-center gap-2 rounded-full border border-white/35 bg-white/15 p-2 shadow-[0_20px_45px_-25px_rgba(0,0,0,0.7)] backdrop-blur-xl supports-backdrop-filter:bg-white/20 dark:border-white/20 dark:bg-slate-900/40">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/35 to-transparent opacity-70" />

        {tabs.map((tab) => {
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
                  ? 'bg-white/80 text-slate-900 shadow-sm hover:bg-white/90 dark:bg-slate-100 dark:text-slate-900'
                  : 'text-slate-700 hover:bg-white/25 dark:text-slate-100 dark:hover:bg-white/15'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
