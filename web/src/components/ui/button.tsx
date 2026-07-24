import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-transparent bg-background text-foreground shadow-[7px_7px_14px_hsl(220_18%_82%),-7px_-7px_14px_hsl(220_40%_98%)] hover:bg-secondary active:translate-y-[1px] active:shadow-[inset_4px_4px_10px_hsl(220_18%_82%),inset_-4px_-4px_10px_hsl(220_40%_98%)] dark:shadow-[6px_6px_14px_hsl(224_24%_12%),-6px_-6px_14px_hsl(224_16%_24%)] dark:active:shadow-[inset_3px_3px_8px_hsl(224_24%_12%),inset_-3px_-3px_8px_hsl(224_16%_24%)]',
        primary:
          'border border-transparent bg-primary text-primary-foreground shadow-[7px_7px_14px_hsl(224_24%_76%),-7px_-7px_14px_hsl(226_52%_88%)] hover:brightness-105 active:translate-y-[1px] active:shadow-[inset_4px_4px_10px_hsl(226_38%_44%),inset_-4px_-4px_10px_hsl(226_48%_62%)] dark:shadow-[6px_6px_14px_hsl(224_24%_10%),-6px_-6px_14px_hsl(224_20%_22%)]',
        destructive:
          'border border-transparent bg-destructive text-destructive-foreground shadow-[7px_7px_14px_rgba(153,27,27,0.3),-7px_-7px_14px_rgba(254,202,202,0.4)] hover:brightness-105 active:translate-y-[1px]',
        outline:
          'border border-border/30 bg-background text-foreground shadow-[inset_3px_3px_8px_hsl(220_16%_84%),inset_-3px_-3px_8px_hsl(220_42%_98%)] hover:bg-secondary dark:shadow-[inset_3px_3px_8px_hsl(224_22%_13%),inset_-3px_-3px_8px_hsl(224_16%_24%)]',
        secondary:
          'border border-transparent bg-secondary text-secondary-foreground shadow-[6px_6px_12px_hsl(220_18%_82%),-6px_-6px_12px_hsl(220_40%_98%)] hover:brightness-105 dark:shadow-[5px_5px_12px_hsl(224_24%_12%),-5px_-5px_12px_hsl(224_16%_24%)]',
        ghost:
          'border border-transparent bg-transparent shadow-none hover:bg-secondary/70 hover:shadow-[inset_2px_2px_6px_hsl(220_18%_84%),inset_-2px_-2px_6px_hsl(220_40%_98%)] dark:hover:shadow-[inset_2px_2px_6px_hsl(224_24%_12%),inset_-2px_-2px_6px_hsl(224_16%_24%)]',
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
