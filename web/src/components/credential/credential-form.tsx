'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { FormActions } from '@/components/ui/form-actions';
import {
  EntityInputField,
  EntityTextareaField,
  EntityTypeSelectField,
} from '@/components/shared/entity-form-kit';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import {
  entityFormActionsDividerClass,
  entityFormControlClass,
  entityFormGridClass,
  entityFormLabelClass,
} from '@/components/shared/entity-form-ui';
import { useEntityFormFieldMetadata } from '@/hooks/use-entity-form-field-metadata';
import { submitEntityForm } from '@/components/shared/entity-form-submit';
import { CREDENTIAL_TYPE_OPTIONS, getCredentialTypeConfig } from '@/constants/credential/types';
import type { CredentialFormFieldErrors, CredentialFormPayload } from '@/models/credential';
import { cn } from '@/lib/utils';
import { validateCredentialFormFields } from '@/utils/credential/validation';

type CredentialFormValues = {
  type: string;
  serviceName: string;
  identifier: string;
  secret: string;
  url: string;
  notes: string;
};

type CredentialFormProps = {
  submitLabel?: string;
  initialValues?: Partial<CredentialFormValues>;
  showReset?: boolean;
  allowEmptySecret?: boolean;
  lockTypeField?: boolean;
  onSubmit?: (payload: CredentialFormPayload) => Promise<void> | void;
};

export function CredentialForm({
  submitLabel = 'Save credential',
  initialValues,
  showReset = true,
  allowEmptySecret = false,
  lockTypeField = false,
  onSubmit,
}: CredentialFormProps) {
  const fieldMeta = useEntityFormFieldMetadata('credential');
  const [values, setValues] = useState<CredentialFormValues>({
    type: initialValues?.type ?? '',
    serviceName: initialValues?.serviceName ?? '',
    identifier: initialValues?.identifier ?? '',
    secret: initialValues?.secret ?? '',
    url: initialValues?.url ?? '',
    notes: initialValues?.notes ?? '',
  });
  const [fieldErrors, setFieldErrors] = useState<CredentialFormFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const typeConfig = useMemo(() => getCredentialTypeConfig(values.type), [values.type]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: CredentialFormPayload = {
      type: values.type,
      serviceName: values.serviceName,
      identifier: values.identifier,
      secret: values.secret,
      url: values.url,
      notes: values.notes,
    };

    await submitEntityForm({
      payload,
      validate: (nextPayload) => validateCredentialFormFields(nextPayload, { allowEmptySecret }),
      setFieldErrors,
      setIsSubmitting,
      onSubmit,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={entityFormGridClass}>
      <EntityTypeSelectField
        id='cred-type'
        label={fieldMeta.type.label}
        error={fieldErrors.type}
        labelClassName={entityFormLabelClass}
        disabled={lockTypeField}
        value={values.type}
        onValueChange={(value) => {
          setValues((prev) => ({ ...prev, type: value }));
          setFieldErrors((prev) => ({ ...prev, type: undefined }));
        }}
        placeholder={fieldMeta.type.placeholder ?? 'Select credential type'}
        options={CREDENTIAL_TYPE_OPTIONS.map((item) => ({ value: item.code, label: item.label }))}
      />

      <EntityInputField
        id='cred-service'
        label={fieldMeta.serviceName.label}
        error={fieldErrors.serviceName}
        labelClassName={entityFormLabelClass}
        inputProps={{
          value: values.serviceName,
          onChange: (event) => {
            setValues((prev) => ({ ...prev, serviceName: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, serviceName: undefined }));
          },
          placeholder: fieldMeta.serviceName.placeholder,
          maxLength: fieldMeta.serviceName.maxLength,
          required: fieldMeta.serviceName.required,
        }}
      />

      <EntityInputField
        id='cred-identifier'
        label={fieldMeta.identifier.label}
        error={fieldErrors.identifier}
        labelClassName={entityFormLabelClass}
        inputProps={{
          value: values.identifier,
          onChange: (event) => {
            setValues((prev) => ({ ...prev, identifier: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, identifier: undefined }));
          },
          placeholder: fieldMeta.identifier.placeholder,
          maxLength: fieldMeta.identifier.maxLength,
        }}
      />

      <FormField
        id='cred-secret'
        label={allowEmptySecret ? 'Secret (leave empty to keep existing)' : fieldMeta.secret.label}
        hint={typeConfig?.hint ?? fieldMeta.secret.hint}
        error={fieldErrors.secret}
        labelClassName={entityFormLabelClass}
      >
        <div className='relative'>
          <Input
            id='cred-secret'
            type={showSecret ? 'text' : 'password'}
            value={values.secret}
            onChange={(event) => {
              setValues((prev) => ({ ...prev, secret: event.target.value }));
              setFieldErrors((prev) => ({ ...prev, secret: undefined }));
            }}
            placeholder={typeConfig?.placeholder ?? fieldMeta.secret.placeholder}
            className={cn(
              entityFormControlClass,
              'pr-10',
              fieldErrors.secret && 'border-destructive focus-visible:ring-destructive',
            )}
            aria-invalid={Boolean(fieldErrors.secret)}
            autoCapitalize='none'
            autoComplete='off'
            required={!allowEmptySecret}
          />
          <button
            type='button'
            aria-label={showSecret ? 'Hide secret' : 'Show secret'}
            className='absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground'
            onClick={() => setShowSecret((value) => !value)}
          >
            {showSecret ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
          </button>
        </div>
      </FormField>

      <EntityInputField
        id='cred-url'
        label={fieldMeta.url.label}
        error={fieldErrors.url}
        className='sm:col-span-2'
        labelClassName={entityFormLabelClass}
        inputProps={{
          value: values.url,
          onChange: (event) => {
            setValues((prev) => ({ ...prev, url: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, url: undefined }));
          },
          placeholder: fieldMeta.url.placeholder,
          maxLength: fieldMeta.url.maxLength,
        }}
      />

      <EntityTextareaField
        id='cred-notes'
        label={fieldMeta.notes.label}
        error={fieldErrors.notes}
        className='sm:col-span-2'
        labelClassName={entityFormLabelClass}
        textareaProps={{
          value: values.notes,
          onChange: (event) => {
            setValues((prev) => ({ ...prev, notes: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, notes: undefined }));
          },
          placeholder: fieldMeta.notes.placeholder,
          maxLength: fieldMeta.notes.maxLength,
        }}
      />

      <div className={entityFormActionsDividerClass}>
        <FormActions submitLabel={submitLabel} isSubmitting={isSubmitting} showReset={showReset} />
      </div>
    </form>
  );
}
