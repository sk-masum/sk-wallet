import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-212.5 px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* <div className="mb-6 max-w-sm rounded-lg border bg-card p-6">
        <Skeleton className="mb-2 h-4 w-28" />
        <Skeleton className="h-10 w-16" />
      </div> */}

      <div className="mb-3 w-full sm:max-w-md">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <Skeleton className="h-10 w-full sm:max-w-md" />
        <Skeleton className="h-10 w-full sm:w-48" />
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="relative flex min-h-56 flex-col justify-between rounded-xl border bg-card p-5"
          >
            <Skeleton className="h-3 w-24" />
            <Skeleton className="absolute right-4 top-4 h-7 w-20" />
            <Skeleton className="h-9 w-14" />
            <Skeleton className="h-6 w-52" />
            <div className="mt-6 flex items-end justify-between">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="space-y-2 text-right">
                <Skeleton className="ml-auto h-3 w-16" />
                <Skeleton className="ml-auto h-4 w-14" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
