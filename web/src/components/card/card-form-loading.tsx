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
        { className: 'h-20 rounded-2xl sm:col-span-2' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-20 rounded-2xl sm:col-span-2' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
      ]}
    />
  )
}
