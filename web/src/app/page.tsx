import { redirect } from 'next/navigation'

import { DashboardOverview } from '@/components/dashboard/dashboard-overview'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { serverApiGet } from '@/lib/api/server'
import { getServerSupabaseUser } from '@/lib/supabase/server-auth'
import type { DashboardData } from '@/models/dashboard'

export default async function Page() {
  const { user } = await getServerSupabaseUser()

  if (!user) {
    redirect('/auth')
  }

  const { response, data } = await serverApiGet<{ data?: DashboardData; error?: string }>('/api/dashboard')

  if (response.status === 401) {
    redirect('/auth?next=/')
  }

  if (!response.ok || !data?.data) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard unavailable</CardTitle>
            <CardDescription>
              We could not load your dashboard data right now.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {data?.error ?? 'Please refresh and try again.'}
            </p>
          </CardContent>
        </Card>
      </main>
    )
  }

  return <DashboardOverview data={data.data} />
}