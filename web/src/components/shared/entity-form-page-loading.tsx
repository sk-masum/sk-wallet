import { Skeleton } from '@/components/ui/skeleton'

import { EntityFormPageLayout } from '@/components/shared/entity-form-page-layout'

type EntityFormPageLoadingProps = {
    pageTitle: string
    sectionTitle: string
    sectionDescription: string
    backHref: string
    backButtonLabel: string
    maxWidthClassName?: string
    fields: Array<{ className: string }>
}

export function EntityFormPageLoading({
    pageTitle,
    sectionTitle,
    sectionDescription,
    backHref,
    backButtonLabel,
    maxWidthClassName = 'max-w-4xl',
    fields,
}: EntityFormPageLoadingProps) {
    return (
        <EntityFormPageLayout
            pageTitle={pageTitle}
            sectionTitle={sectionTitle}
            sectionDescription={sectionDescription}
            backHref={backHref}
            backButtonLabel={backButtonLabel}
            maxWidthClassName={maxWidthClassName}
        >
            <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2" aria-live="polite" aria-busy>
                {fields.map((field, index) => (
                    <Skeleton key={index} className={field.className} />
                ))}

                <div className="sm:col-span-2 border-t border-border/60 pt-4">
                    <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end">
                        <Skeleton className="h-11 w-full rounded-xl sm:w-36" />
                        <Skeleton className="h-11 w-full rounded-xl sm:w-28" />
                    </div>
                </div>
            </div>
        </EntityFormPageLayout>
    )
}
