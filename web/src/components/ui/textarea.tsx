import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex min-h-20 w-full rounded-md border border-transparent bg-background px-3 py-2 text-base text-foreground shadow-[inset_4px_4px_9px_hsl(220_16%_84%),inset_-4px_-4px_9px_hsl(220_40%_98%)] transition-[color,box-shadow,transform] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[inset_3px_3px_8px_hsl(224_24%_12%),inset_-3px_-3px_8px_hsl(224_16%_24%)]',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
