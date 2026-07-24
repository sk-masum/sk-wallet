import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md border border-glass-border-soft bg-glass shadow-neu-inset-sm ',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
