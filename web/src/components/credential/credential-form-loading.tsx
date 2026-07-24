import { EntityFormPageLoading } from '@/components/shared/entity-form-page-loading'

export function CredentialFormLoading() {
    return (
        <EntityFormPageLoading
            pageTitle="Credential"
            sectionTitle="Credential Details"
            sectionDescription="Preparing form fields..."
            backHref="/credential"
            backButtonLabel="Back to credentials"
            fields={[
                { controlClassName: 'h-11 rounded-2xl' },
                { controlClassName: 'h-11 rounded-2xl' },
                { controlClassName: 'h-11 rounded-2xl' },
                { controlClassName: 'h-11 rounded-2xl' },
                { wrapperClassName: 'sm:col-span-2', controlClassName: 'h-11 rounded-2xl' },
                { wrapperClassName: 'sm:col-span-2', controlClassName: 'h-26 rounded-2xl' },
            ]}
        />
    )
}
