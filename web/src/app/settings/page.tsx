'use client'

import { Settings2, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { PageHeader } from '@/components/ui/page-header'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

const BIOMETRIC_STORAGE_KEY = 'sk-wallet:biometric-enabled'

export default function SettingsPage() {
  const router = useRouter()
  const [biometricEnabled, setBiometricEnabled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(BIOMETRIC_STORAGE_KEY)
    setBiometricEnabled(stored === 'true')
  }, [])

  const onBiometricToggle = (checked: boolean) => {
    setBiometricEnabled(checked)
    localStorage.setItem(BIOMETRIC_STORAGE_KEY, checked ? 'true' : 'false')
  }

  const onSignOut = async () => {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Settings"
        description="Manage your account preferences."
        showBackButton
        backHref="/card"
        backButtonLabel="Back to cards"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>Update your display information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Full name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Phone number" />
            <Input placeholder="Default provider" />
            <div className="sm:col-span-2">
              <Button type="button">Save details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              Appearance
            </CardTitle>
            <CardDescription>Choose your preferred theme mode.</CardDescription>
          </CardHeader>
          <CardContent>
            <ModeToggle />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Security
            </CardTitle>
            <CardDescription>Control biometric sign-in for this device.</CardDescription>
          </CardHeader>
          <CardContent>
            <label className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">Enable biometric unlock</p>
                <p className="text-xs text-muted-foreground">Use Face ID / Touch ID when available.</p>
              </div>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={biometricEnabled}
                onChange={(event) => onBiometricToggle(event.target.checked)}
              />
            </label>
            <div className="mt-4">
              <Button type="button" variant="outline" onClick={onSignOut}>
                Sign out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomTabBar />
    </main>
  )
}
