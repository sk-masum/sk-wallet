import type { ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'

type EntityFormPageLayoutProps = {
    pageTitle: string
    sectionTitle: string
    sectionDescription: string
    backHref: string
    backButtonLabel: string
    children: ReactNode
    maxWidthClassName?: string
    showBottomSpacing?: boolean
}

export function EntityFormPageLayout({
    pageTitle,
    sectionTitle,
    sectionDescription,
    backHref,
    backButtonLabel,
    children,
    maxWidthClassName = 'max-w-4xl',
    showBottomSpacing = true,
}: EntityFormPageLayoutProps) {
    return (
        <main className="min-h-screen">
            <div
                className={`mx-auto w-full ${maxWidthClassName} px-4 pt-12 sm:px-6 lg:px-8 ${showBottomSpacing ? 'pb-28' : 'pb-8'}`}
            >
                <PageHeader
                    title={pageTitle}
                    showBackButton
                    backHref={backHref}
                    backButtonLabel={backButtonLabel}
                    className="mb-6"
                />

                <Card className="overflow-hidden border-border/70 bg-card/90 shadow-xl backdrop-blur-sm">
                    <CardHeader className="border-b border-border/60 bg-linear-to-r from-muted/55 via-background/80 to-muted/45 pb-5">
                        <CardTitle className="text-xl sm:text-2xl">{sectionTitle}</CardTitle>
                        <CardDescription className="text-sm">{sectionDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">{children}</CardContent>
                </Card>
            </div>
        </main>
    )
}
