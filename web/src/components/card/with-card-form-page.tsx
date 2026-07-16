import type { ReactNode } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'

type CardFormPageLayoutProps = {
  pageTitle: string
  cardTitle: string
  cardDescription: string
  errorMessage?: string
  backHref?: string
  backButtonLabel?: string
  children: ReactNode
}

type CardFormPageResolver<TProps> =
  | CardFormPageLayoutProps
  | Promise<CardFormPageLayoutProps>
  | ((props: TProps) => CardFormPageLayoutProps | Promise<CardFormPageLayoutProps>)

function CardFormPageLayout({
  pageTitle,
  cardTitle,
  cardDescription,
  errorMessage = '',
  backHref = '/card',
  backButtonLabel = 'Back to cards',
  children,
}: CardFormPageLayoutProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <PageHeader title={pageTitle} showBackButton backHref={backHref} backButtonLabel={backButtonLabel} />

      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
          {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  )
}

export function withCardFormPage<TProps>(resolver: CardFormPageResolver<TProps>) {
  return async function WrappedCardFormPage(props: TProps) {
    const layoutProps =
      typeof resolver === 'function'
        ? await (resolver as (props: TProps) => CardFormPageLayoutProps | Promise<CardFormPageLayoutProps>)(props)
        : await resolver

    return <CardFormPageLayout {...layoutProps} />
  }
}
