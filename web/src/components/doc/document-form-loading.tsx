import { EntityFormPageLoading } from '@/components/shared/entity-form-page-loading';

export function DocumentFormLoading() {
  return (
    <EntityFormPageLoading
      pageTitle='Document'
      sectionTitle='Document Details'
      sectionDescription='Preparing form fields...'
      backHref='/doc'
      backButtonLabel='Back to documents'
      fields={[
        { wrapperClassName: 'sm:col-span-2', controlClassName: 'h-11 rounded-2xl' },
        { wrapperClassName: 'sm:col-span-2', controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { controlClassName: 'h-11 rounded-2xl' },
        { wrapperClassName: 'sm:col-span-2', controlClassName: 'h-11 rounded-2xl' },
        { wrapperClassName: 'sm:col-span-2', controlClassName: 'h-26 rounded-2xl' },
      ]}
    />
  );
}
