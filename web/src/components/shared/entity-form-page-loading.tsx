import { Skeleton } from '@/components/ui/skeleton';

import { EntityFormPageLayout } from '@/components/shared/entity-form-page-layout';
import {
  entityFormActionsDividerClass,
  entityFormGridClass,
  entityFormLabelClass,
} from '@/components/shared/entity-form-ui';
import { cn } from '@/lib/utils';

type EntityFormPageLoadingProps = {
  pageTitle: string;
  sectionTitle: string;
  sectionDescription: string;
  backHref: string;
  backButtonLabel: string;
  maxWidthClassName?: string;
  fields: Array<{
    wrapperClassName?: string;
    controlClassName: string;
    hideLabel?: boolean;
  }>;
};

export function EntityFormPageLoading({
  pageTitle,
  sectionTitle,
  sectionDescription,
  backHref,
  backButtonLabel,
  maxWidthClassName = 'max-w-4xl',
  fields,
}: EntityFormPageLoadingProps) {
  return (
    <EntityFormPageLayout
      pageTitle={pageTitle}
      sectionTitle={sectionTitle}
      sectionDescription={sectionDescription}
      backHref={backHref}
      backButtonLabel={backButtonLabel}
      maxWidthClassName={maxWidthClassName}
    >
      <div className={entityFormGridClass} aria-live='polite' aria-busy>
        {fields.map((field, index) => (
          <div key={index} className={cn(field.wrapperClassName)}>
            {field.hideLabel ? null : (
              <div className={cn(entityFormLabelClass, 'mb-2')}>
                <Skeleton className='h-3 w-24' />
              </div>
            )}
            <Skeleton className={field.controlClassName} />
          </div>
        ))}

        <div className={entityFormActionsDividerClass}>
          <div className='flex flex-col gap-2.5 sm:flex-row sm:justify-end'>
            <Skeleton className='h-11 w-full rounded-2xl sm:w-36' />
            <Skeleton className='h-11 w-full rounded-2xl sm:w-28' />
          </div>
        </div>
      </div>
    </EntityFormPageLayout>
  );
}
