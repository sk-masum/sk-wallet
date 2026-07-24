import { EntityFormPageLoading } from '@/components/shared/entity-form-page-loading'

export function CardFormLoading() {
  return (
    <EntityFormPageLoading
      pageTitle="Card"
      sectionTitle="Card Details"
      sectionDescription="Preparing form fields..."
      backHref="/card"
      backButtonLabel="Back to cards"
      fields={[
        { wrapperClassName: 'sm:col-span-2', controlClassName: 'h-20 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { wrapperClassName: 'sm:col-span-2', controlClassName: 'h-20 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
      ]}
    />
  )
}
