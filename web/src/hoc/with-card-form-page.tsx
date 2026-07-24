import type { ReactNode } from 'react'

import { EntityFormPageLayout } from '@/components/shared/entity-form-page-layout'

type CardFormPageLayoutProps = {
  pageTitle: string
  cardTitle: string
  cardDescription: string
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
  backHref = '/card',
  backButtonLabel = 'Back to cards',
  children,
}: CardFormPageLayoutProps) {
  return (
    <EntityFormPageLayout
      pageTitle={pageTitle}
      sectionTitle={cardTitle}
      sectionDescription={cardDescription}
      backHref={backHref}
      backButtonLabel={backButtonLabel}
      maxWidthClassName="max-w-4xl"
    >
      {children}
    </EntityFormPageLayout>
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
