import { Skeleton } from '@/components/ui/skeleton'
import { ListingPageLoading } from '@/components/shared/listing-page-loading'

export default function Loading() {
    return (
        <ListingPageLoading
            title="Credentials"
            description="Loading your credentials..."
            contentClassName="max-w-212.5"
        >
            <section className="grid gap-3 sm:grid-cols-2" aria-live="polite" aria-busy>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500" style={{ animationDelay: `${Math.min(index, 9) * 65}ms` }}>
                        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/16 to-transparent dark:via-white/10" />
                            <div className="relative space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-5 w-18 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <style>{`@keyframes shimmer{100%{transform:translateX(100%)}}`}</style>
        </ListingPageLoading>
    )
}
