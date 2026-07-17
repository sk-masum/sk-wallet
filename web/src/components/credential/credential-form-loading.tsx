import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CredentialFormLoading() {
    return (
        <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-28 pt-12">
            <div className="mb-6 space-y-2">
                <Skeleton className="h-9 w-46" />
                <Skeleton className="h-4 w-72" />
            </div>

            <Card>
                <CardHeader className="space-y-3">
                    <Skeleton className="h-7 w-44" />
                    <Skeleton className="h-4 w-80 max-w-full" />
                </CardHeader>

                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-40" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-3 w-44" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Skeleton className="h-3 w-38" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <div className="sm:col-span-2">
                            <Skeleton className="h-10 w-40" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
