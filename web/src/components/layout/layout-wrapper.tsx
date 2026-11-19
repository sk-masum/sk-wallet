'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { AppHeader } from '@/components/layout';

type LayoutWrapperProps = {
  children: ReactNode;
};

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { data: session } = useSession();

  const user = session?.user ? {
    email: session.user.email || '',
    name: session.user.name || undefined,
  } : undefined;

  return (
    <>
      <AppHeader user={user} showMenuButton={true} />
      <main className='min-h-screen'>{children}</main>
    </>
  );
}
