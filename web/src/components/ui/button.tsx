import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-glass-border-strong bg-glass text-foreground shadow-neu-raised-sm backdrop-blur-md hover:bg-glass-strong active:translate-y-[1px] active:shadow-neu-inset ',
        primary:
          'border border-glass-border-subtle bg-linear-to-r from-primary/95 via-primary/88 to-primary/78 text-primary-foreground shadow-brand-raised hover:brightness-110 active:translate-y-[1px] active:shadow-brand-inset',
        primaryCta:
          'border border-glass-border-subtle bg-linear-to-r from-primary/95 via-primary/88 to-primary/78 text-primary-foreground shadow-brand-raised-sm hover:brightness-110 active:translate-y-[1px] active:shadow-brand-inset',
        destructive:
          'border border-red-900/35 bg-linear-to-b from-red-500 to-red-700 text-destructive-foreground shadow-danger-raised hover:brightness-105 active:translate-y-[1px]',
        outline:
          'border border-glass-border-strong bg-glass text-foreground shadow-neu-inset-sm backdrop-blur-md hover:bg-glass-strong ',
        toolbar:
          'border border-glass-border-soft bg-glass text-foreground shadow-neu-raised-sm backdrop-blur-md hover:bg-glass-strong ',
        headerIcon:
          'border border-glass-border-strong bg-glass text-foreground shadow-neu-raised-sm backdrop-blur-md hover:bg-glass-strong  dark:text-foreground',
        action:
          'items-center border border-border/70 bg-background/85 text-foreground shadow-sm hover:-translate-y-0.5 hover:bg-background hover:shadow-md active:scale-[0.98]',
        neutral:
          'border border-border/70 bg-background/90 text-foreground shadow-sm hover:bg-background',
        secondary:
          'border border-glass-border-soft bg-linear-to-b from-primary/74 to-primary/62 text-primary-foreground shadow-neu-raised-sm hover:brightness-110 ',
        ghost:
          'border border-transparent bg-transparent shadow-none hover:border-glass-border-soft hover:bg-glass hover:shadow-neu-inset-sm ',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-10 rounded-xl px-4 text-sm',
        mdWide: 'h-10 rounded-xl px-5 text-sm',
        action: 'rounded-xl px-3 py-3 text-sm',
        actionWide: 'h-11 rounded-xl px-5 text-sm',
        form: 'h-11 rounded-xl px-6 text-sm font-semibold uppercase tracking-[0.08em]',
        chip: 'h-8 rounded-full px-3 text-xs',
        chipWide: 'h-8 rounded-full px-4 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        iconLg: 'h-11 w-11 rounded-full',
        headerIcon: 'rounded-full p-3 sm:p-5',
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
