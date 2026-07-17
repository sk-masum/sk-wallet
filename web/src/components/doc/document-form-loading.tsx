import { EntityFormPageLoading } from '@/components/shared/entity-form-page-loading'

export function DocumentFormLoading() {
  return (
    <EntityFormPageLoading
      pageTitle="Document"
      sectionTitle="Document Details"
      sectionDescription="Preparing form fields..."
      backHref="/doc"
      backButtonLabel="Back to documents"
      fields={[
        { className: 'h-10 rounded-xl sm:col-span-2' },
        { className: 'h-10 rounded-xl sm:col-span-2' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl' },
        { className: 'h-10 rounded-xl sm:col-span-2' },
        { className: 'h-24 rounded-xl sm:col-span-2' },
      ]}
    />
  )
}
