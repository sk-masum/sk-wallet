import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-glass-border bg-glass px-3 py-1 text-base text-foreground shadow-neu-inset backdrop-blur-md transition-all file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-50 ',
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
