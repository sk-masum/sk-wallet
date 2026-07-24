import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md border border-transparent bg-background shadow-[inset_3px_3px_8px_hsl(220_16%_84%),inset_-3px_-3px_8px_hsl(220_40%_98%)] dark:shadow-[inset_3px_3px_8px_hsl(224_24%_12%),inset_-3px_-3px_8px_hsl(224_16%_24%)]',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
