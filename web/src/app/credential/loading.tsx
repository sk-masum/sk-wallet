import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-28 pt-12">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Credentials</h1>
                    <p className="text-sm text-muted-foreground">Loading your credentials...</p>
                </div>
            </div>

            <section className="grid gap-3 sm:grid-cols-2" aria-live="polite" aria-busy>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index}>
                        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-4">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />
                            <div className="relative space-y-3">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <style>{`@keyframes shimmer{100%{transform:translateX(100%)}}`}</style>
        </main>
    )
}
