import * as React from 'react'

import { cn } from '@/lib/utils'

type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, className, disabled, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        data-state={checked ? 'checked' : 'unchecked'}
        className={cn(
          'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-white/35 bg-(--glass-surface) shadow-(--neu-shadow-inset-sm) backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/12',
          checked && 'bg-linear-to-r from-primary/72 via-primary/62 to-primary/78',
          className
        )}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented && !disabled) {
            onCheckedChange?.(!checked)
          }
        }}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none block h-4 w-4 rounded-full border border-white/40 bg-(--glass-surface-strong) shadow-(--neu-shadow-raised-sm) transition-transform dark:border-white/12',
            checked ? 'translate-x-4' : 'translate-x-0'
          )}
        />
      </button>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch }
