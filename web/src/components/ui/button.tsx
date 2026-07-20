import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:opacity-90',
        primary:
          'border border-white/15 bg-linear-to-r from-zinc-950 via-zinc-900 to-zinc-800 text-white shadow-[0_14px_26px_-18px_rgba(0,0,0,0.75)] hover:-translate-y-0.5 hover:from-black hover:via-zinc-900 hover:to-zinc-700 hover:shadow-[0_16px_28px_-16px_rgba(0,0,0,0.85)] active:translate-y-0 dark:border-white/35 dark:bg-linear-to-r dark:from-zinc-100 dark:via-zinc-50 dark:to-white dark:text-zinc-900 dark:shadow-[0_14px_26px_-18px_rgba(0,0,0,0.35)] dark:hover:from-white dark:hover:via-zinc-100 dark:hover:to-zinc-200 dark:hover:shadow-[0_16px_28px_-16px_rgba(0,0,0,0.45)]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:opacity-90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:opacity-90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
