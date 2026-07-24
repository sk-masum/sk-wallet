'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  ...props
}: CalendarProps) {
  const isDropdownCaption =
    typeof captionLayout === 'string' && captionLayout.startsWith('dropdown')

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      numberOfMonths={1}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2',
        month: 'flex flex-col gap-3',
        month_caption: 'relative flex h-8 w-full items-center justify-center',
        caption_label: cn('text-xs font-medium', isDropdownCaption && 'sr-only'),
        dropdowns: 'mx-4 flex items-center gap-1',
        dropdown_root: 'relative flex h-8 items-center rounded-md border border-input bg-background text-xs shadow-sm',
        dropdown: 'h-8 bg-transparent px-1 pr-3 text-xs focus:outline-none',
        months_dropdown: 'min-w-[4.75rem]',
        years_dropdown: 'min-w-[3rem]',
        nav: 'pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-1',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'pointer-events-auto size-7 bg-transparent p-0 opacity-80 hover:opacity-100'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'pointer-events-auto size-7 bg-transparent p-0 opacity-80 hover:opacity-100'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal aria-selected:opacity-100'
        ),
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...iconProps }) =>
          orientation === 'left' ? (
            <ChevronLeft className={cn('size-4', className)} {...iconProps} />
          ) : (
            <ChevronRight className={cn('size-4', className)} {...iconProps} />
          ),
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
