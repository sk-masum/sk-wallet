'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { FormActions } from '@/components/ui/form-actions';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import {
  entityFormActionsDividerClass,
  entityFormControlClass,
  entityFormGridClass,
  entityFormLabelClass,
  entityFormSelectClass,
  entityFormTextareaClass,
} from '@/components/shared/entity-form-ui';
import { AppSelectField } from '@/components/shared/app-select-field';
import { submitEntityForm } from '@/components/shared/entity-form-submit';
import { Textarea } from '@/components/ui/textarea';
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
      <FormField
        id='cred-type'
        label='Credential type'
        error={fieldErrors.type}
        labelClassName={entityFormLabelClass}
      >
        <AppSelectField
          id='cred-type'
          disabled={lockTypeField}
          value={values.type}
          onValueChange={(value) => {
            setValues((prev) => ({ ...prev, type: value }));
            setFieldErrors((prev) => ({ ...prev, type: undefined }));
          }}
          placeholder='Select credential type'
          triggerClassName={cn(entityFormSelectClass, fieldErrors.type && 'border-destructive')}
          options={CREDENTIAL_TYPE_OPTIONS.map((item) => ({ value: item.code, label: item.label }))}
        />
      </FormField>

      <FormField
        id='cred-service'
        label='Service name'
        error={fieldErrors.serviceName}

        labelClassName={entityFormLabelClass}
      >
        <Input
          id='cred-service'
          value={values.serviceName}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, serviceName: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, serviceName: undefined }));
          }}
          placeholder='e.g. Gmail, GitHub, HBL'
          className={cn(
            entityFormControlClass,
            fieldErrors.serviceName && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.serviceName)}
          maxLength={120}
          required
        />
      </FormField>

      <FormField
        id='cred-identifier'
        label='Identifier (optional)'
        error={fieldErrors.identifier}

        labelClassName={entityFormLabelClass}
      >
        <Input
          id='cred-identifier'
          value={values.identifier}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, identifier: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, identifier: undefined }));
          }}
          placeholder='email / username / phone'
          className={cn(
            entityFormControlClass,
            fieldErrors.identifier && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.identifier)}
          maxLength={120}
        />
      </FormField>

      <FormField
        id='cred-secret'
        label={allowEmptySecret ? 'Secret (leave empty to keep existing)' : 'Secret'}
        hint={typeConfig?.hint ?? 'Store only trusted credentials.'}
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
            placeholder={typeConfig?.placeholder ?? 'Enter secret'}
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

      <FormField
        id='cred-url'
        label='Website URL (optional)'
        error={fieldErrors.url}
        className='sm:col-span-2'
        labelClassName={entityFormLabelClass}
      >
        <Input
          id='cred-url'
          value={values.url}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, url: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, url: undefined }));
          }}
          placeholder='https://example.com'
          className={cn(
            entityFormControlClass,
            fieldErrors.url && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.url)}
          maxLength={400}
        />
      </FormField>

      <FormField
        id='cred-notes'
        label='Notes (optional)'
        error={fieldErrors.notes}
        className='sm:col-span-2'
        labelClassName={entityFormLabelClass}
      >
        <Textarea
          id='cred-notes'
          value={values.notes}
          onChange={(event) => {
            setValues((prev) => ({ ...prev, notes: event.target.value }));
            setFieldErrors((prev) => ({ ...prev, notes: undefined }));
          }}
          placeholder='Any extra details'
          className={cn(
            entityFormTextareaClass,
            fieldErrors.notes && 'border-destructive focus-visible:ring-destructive',
          )}
          aria-invalid={Boolean(fieldErrors.notes)}
          maxLength={1000}
        />
      </FormField>

      <div className={entityFormActionsDividerClass}>
        <FormActions submitLabel={submitLabel} isSubmitting={isSubmitting} showReset={showReset} />
      </div>
    </form>
  );
}
