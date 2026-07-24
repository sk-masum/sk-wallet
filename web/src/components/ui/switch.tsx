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
          'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-background shadow-[inset_3px_3px_7px_hsl(220_16%_84%),inset_-3px_-3px_7px_hsl(220_40%_98%)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[inset_3px_3px_7px_hsl(224_24%_12%),inset_-3px_-3px_7px_hsl(224_16%_24%)]',
          checked && 'bg-primary/30',
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
            'pointer-events-none block h-4 w-4 rounded-full border border-transparent bg-background shadow-[4px_4px_8px_hsl(220_18%_82%),-4px_-4px_8px_hsl(220_40%_98%)] transition-transform dark:shadow-[4px_4px_8px_hsl(224_24%_12%),-4px_-4px_8px_hsl(224_16%_24%)]',
            checked ? 'translate-x-4' : 'translate-x-0'
          )}
        />
      </button>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch }
