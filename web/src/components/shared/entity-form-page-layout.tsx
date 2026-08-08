import type { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';

type EntityFormPageLayoutProps = {
  pageTitle: string;
  sectionTitle: string;
  sectionDescription: string;
  backHref: string;
  backButtonLabel: string;
  children: ReactNode;
  maxWidthClassName?: string;
  showBottomSpacing?: boolean;
};

export function EntityFormPageLayout({
  pageTitle,
  sectionTitle,
  sectionDescription,
  backHref,
  backButtonLabel,
  children,
  maxWidthClassName = 'max-w-4xl',
  showBottomSpacing = true,
}: EntityFormPageLayoutProps) {
  return (
    <main className='min-h-screen'>
      <div
        className={`mx-auto w-full ${maxWidthClassName} px-4 pt-12 sm:px-6 lg:px-8 ${showBottomSpacing ? 'pb-28' : 'pb-8'}`}
      >
        <PageHeader
          title={pageTitle}
          showBackButton
          backHref={backHref}
          backButtonLabel={backButtonLabel}
          className='mb-6'
        />
        <div>{children}</div>
      </div>
    </main>
  );
}
