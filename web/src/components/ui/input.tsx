import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-transparent bg-background px-3 py-1 text-base text-foreground shadow-[inset_4px_4px_9px_hsl(220_16%_84%),inset_-4px_-4px_9px_hsl(220_40%_98%)] transition-all file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[inset_3px_3px_8px_hsl(224_24%_12%),inset_-3px_-3px_8px_hsl(224_16%_24%)]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
