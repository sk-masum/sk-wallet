'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  ...props
}: CalendarProps) {
  const isDropdownCaption =
    typeof captionLayout === 'string' && captionLayout.startsWith('dropdown');

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      numberOfMonths={1}
      className={cn(
        'rounded-2xl border border-glass-border bg-glass p-3 shadow-neu-raised backdrop-blur-md ',
        className,
      )}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-3',
        month_caption: 'relative flex h-8 w-full items-center justify-center',
        caption_label: cn(
          'text-xs font-semibold tracking-wide text-foreground',
          isDropdownCaption && 'sr-only',
        ),
        dropdowns: 'mx-4 flex items-center gap-1',
        dropdown_root:
          'relative flex h-8 items-center rounded-md border border-glass-border-soft bg-glass text-xs text-foreground shadow-neu-inset-sm backdrop-blur-sm ',
        dropdown:
          'h-8 bg-transparent px-1 pr-3 text-xs font-medium text-foreground focus:outline-none',
        months_dropdown: 'min-w-[4.75rem]',
        years_dropdown: 'min-w-[3rem]',
        nav: 'pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-1',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'pointer-events-auto size-7 rounded-md p-0 text-foreground opacity-100',
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'pointer-events-auto size-7 rounded-md p-0 text-foreground opacity-100',
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday:
          'w-8 rounded-md text-[0.72rem] font-semibold uppercase tracking-wide text-text-subtle',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 rounded-md border border-glass-border-soft bg-glass p-0 font-medium text-foreground shadow-neu-raised-sm transition hover:bg-glass-strong aria-selected:opacity-100 ',
        ),
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        selected:
          'bg-linear-to-r from-primary/95 via-primary/88 to-primary/78 text-primary-foreground shadow-brand-raised-sm hover:brightness-110 focus:brightness-110',
        today: 'bg-primary/22 text-foreground',
        outside:
          'day-outside text-text-subtle opacity-60 aria-selected:bg-primary/24 aria-selected:text-text-subtle aria-selected:opacity-50',
        disabled: 'text-text-subtle opacity-60',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...iconProps }) =>
          orientation === 'left' ? (
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={cn('size-4', className)}
              aria-hidden='true'
              {...iconProps}
            >
              <path d='m15 18-6-6 6-6' />
            </svg>
          ) : (
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className={cn('size-4', className)}
              aria-hidden='true'
              {...iconProps}
            >
              <path d='m9 18 6-6-6-6' />
            </svg>
          ),
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
