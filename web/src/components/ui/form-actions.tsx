import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FormActionsProps = {
  submitLabel: string
  submittingLabel?: string
  isSubmitting?: boolean
  showReset?: boolean
  resetLabel?: string
  className?: string
  submitClassName?: string
  resetClassName?: string
}

function FormActions({
  submitLabel,
  submittingLabel = 'Saving...',
  isSubmitting = false,
  showReset = false,
  resetLabel = 'Reset',
  className,
  submitClassName,
  resetClassName,
}: FormActionsProps) {
  return (
    <div className={cn('sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:justify-end', className)}>
      <Button
        type="submit"
        variant="primary"
        className={cn('h-11 w-full rounded-xl px-6 text-sm font-semibold uppercase tracking-[0.08em] shadow-sm sm:w-auto', submitClassName)}
        disabled={isSubmitting}
      >
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
      {showReset ? (
        <Button
          type="reset"
          variant="outline"
          className={cn('h-11 w-full rounded-xl px-6 text-sm font-semibold uppercase tracking-[0.08em] sm:w-auto', resetClassName)}
          disabled={isSubmitting}
        >
          {resetLabel}
        </Button>
      ) : null}
    </div>
  )
}

export { FormActions }
