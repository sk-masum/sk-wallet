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
