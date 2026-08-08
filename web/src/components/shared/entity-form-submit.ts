import type { Dispatch, SetStateAction } from 'react';

type SubmitEntityFormOptions<TPayload, TErrors extends Record<string, unknown>> = {
  payload: TPayload;
  validate: (payload: TPayload) => TErrors;
  setFieldErrors: Dispatch<SetStateAction<TErrors>>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  onSubmit?: (payload: TPayload) => Promise<void> | void;
  mutateErrors?: (errors: TErrors) => void;
};

export async function submitEntityForm<TPayload, TErrors extends Record<string, unknown>>({
  payload,
  validate,
  setFieldErrors,
  setIsSubmitting,
  onSubmit,
  mutateErrors,
}: SubmitEntityFormOptions<TPayload, TErrors>) {
  const errors = validate(payload);
  mutateErrors?.(errors);

  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors);
    return;
  }

  setFieldErrors({} as TErrors);

  if (!onSubmit) {
    return;
  }

  setIsSubmitting(true);
  try {
    await onSubmit(payload);
  } finally {
    setIsSubmitting(false);
  }
}
