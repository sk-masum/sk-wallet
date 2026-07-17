'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { THEME_MODE_OPTIONS } from '@/constants/ui/theme-options'
import { cn } from '@/lib/utils'

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = mounted ? (theme ?? 'system') : 'system'

  return (
    <div
      className={cn(
        'relative flex h-10 items-center gap-1 rounded-full border border-white/35 bg-white/20 p-1 dark:border-white/20 dark:bg-slate-900/40',
        className
      )}
      role="group"
      aria-label="Theme mode"
    >
      {THEME_MODE_OPTIONS.map((option) => {
        const Icon = option.icon
        const isActive = activeTheme === option.value

        return (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setTheme(option.value)}
            className={cn(
              'h-8 rounded-full px-2.5 text-[11px] font-medium',
              isActive
                ? 'bg-white/90 text-slate-900 shadow-sm hover:bg-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-700 hover:bg-white/30 dark:text-slate-100 dark:hover:bg-white/15'
            )}
            aria-pressed={isActive}
            title={`Use ${option.label.toLowerCase()} mode`}
          >
            <Icon className="mr-1.5 h-3.5 w-3.5" />
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
