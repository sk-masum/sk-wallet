import { redirect } from 'next/navigation';

import { DashboardAlertsOverview } from '@/components/dashboard/dashboard-alerts-overview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { serverApiGet } from '@/lib/api/server';
import { getAuthenticatedUser } from '@/lib/auth/server';
import type { DashboardAlertsData } from '@/models/dashboard';

export default async function AlertsPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/auth');
  }

  const { response, data } = await serverApiGet<{ data?: DashboardAlertsData; error?: string }>(
    '/api/dashboard/alerts',
  );

  if (response.status === 401) {
    redirect('/auth?next=/alerts');
  }

  if (!response.ok || !data?.data) {
    return (
      <main className='mx-auto w-full max-w-3xl px-4 py-12'>
        <Card>
          <CardHeader>
            <CardTitle>Alerts unavailable</CardTitle>
            <CardDescription>We could not load your alerts data right now.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-sm text-muted-foreground'>
              {data?.error ?? 'Please refresh and try again.'}
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return <DashboardAlertsOverview data={data.data} />;
}
