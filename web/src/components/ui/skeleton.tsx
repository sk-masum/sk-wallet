import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md border border-white/35 bg-(--glass-surface) shadow-(--neu-shadow-inset-sm) dark:border-white/12',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
