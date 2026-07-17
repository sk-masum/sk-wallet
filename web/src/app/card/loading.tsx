import { Skeleton } from '@/components/ui/skeleton'
import { ListingPageLoading } from '@/components/shared/listing-page-loading'

export default function Loading() {
  return (
    <ListingPageLoading
      title="Cards"
      description="Loading your cards..."
      contentClassName="max-w-212.5"
      showCardFilters
    >
      <section className="mx-auto w-full max-w-5xl lg:grid lg:grid-cols-2 lg:gap-6" aria-live="polite" aria-busy>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={index > 0 ? '-mt-42 lg:mt-0' : ''}>
            <div className="relative overflow-hidden rounded-xl border border-slate-500/80 bg-linear-to-br from-slate-900 via-slate-800 to-slate-700 p-5 shadow-lg dark:border-white/20">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/15 to-transparent" />
              <div className="relative flex min-h-56 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-3 w-24 bg-white/20" />
                  <Skeleton className="h-6 w-14 rounded-full bg-white/20" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-9 w-14 bg-white/20" />
                  <Skeleton className="h-6 w-52 bg-white/20" />
                </div>
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20 bg-white/20" />
                    <Skeleton className="h-4 w-28 bg-white/20" />
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="ml-auto h-3 w-16 bg-white/20" />
                    <Skeleton className="ml-auto h-4 w-14 bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <style>{`@keyframes shimmer{100%{transform:translateX(100%)}}`}</style>
    </ListingPageLoading>
  )
}
