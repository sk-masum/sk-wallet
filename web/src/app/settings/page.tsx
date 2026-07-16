'use client'

import { PencilLine, Settings2, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { PageHeader } from '@/components/ui/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import {
  BIOMETRIC_CREDENTIAL_STORAGE_KEY,
  BIOMETRIC_SESSION_UNLOCK_KEY,
  BIOMETRIC_STORAGE_KEY,
  isPlatformAuthenticatorAvailable,
  registerBiometricCredential,
  verifyBiometricCredential,
} from '@/lib/biometric'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<User | null>(null)
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [biometricSupported, setBiometricSupported] = useState(false)
  const [isBiometricBusy, setIsBiometricBusy] = useState(false)
  const [biometricMessage, setBiometricMessage] = useState<string>('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const supabase = createSupabaseBrowserClient()
        const { data } = await supabase.auth.getUser()
        setProfile(data.user ?? null)
      } finally {
        setIsProfileLoading(false)
      }
    }

    void fetchProfile()

    const stored = localStorage.getItem(BIOMETRIC_STORAGE_KEY)
    setBiometricEnabled(stored === 'true')

    const checkSupport = async () => {
      try {
        const available = await isPlatformAuthenticatorAvailable()
        setBiometricSupported(available)
      } catch {
        setBiometricSupported(false)
      }
    }

    void checkSupport()
  }, [])

  const fullName =
    typeof profile?.user_metadata?.full_name === 'string' && profile.user_metadata.full_name.trim().length > 0
      ? profile.user_metadata.full_name
      : null
  const email = profile?.email ?? null
  const avatarUrl =
    typeof profile?.user_metadata?.avatar_url === 'string' && profile.user_metadata.avatar_url.trim().length > 0
      ? profile.user_metadata.avatar_url
      : null
  const initials = (fullName ?? email ?? 'U')
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const registerBiometric = async () => {
    if (!biometricSupported) {
      setBiometricMessage('Biometric authentication is not supported on this device.')
      return false
    }

    try {
      const credentialId = await registerBiometricCredential()
      if (!credentialId) {
        setBiometricMessage('Biometric setup was cancelled.')
        return false
      }
      return true
    } catch {
      setBiometricMessage('Unable to set up biometrics on this device.')
      return false
    }
  }

  const verifyBiometric = async () => {
    if (!biometricSupported) {
      setBiometricMessage('Biometric authentication is not supported on this device.')
      return false
    }

    const credentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY)
    if (!credentialId) {
      setBiometricMessage('No biometric credential is registered yet.')
      return false
    }

    try {
      const verified = await verifyBiometricCredential()
      if (!verified) {
        setBiometricMessage('Biometric verification was cancelled.')
        return false
      }

      setBiometricMessage('Biometric verification successful.')
      return true
    } catch {
      setBiometricMessage('Biometric verification failed.')
      return false
    }
  }

  const onBiometricToggle = async (checked: boolean) => {
    setIsBiometricBusy(true)
    setBiometricMessage('')

    if (checked) {
      const credentialId = localStorage.getItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY)
      const registered = credentialId ? true : await registerBiometric()

      if (registered) {
        setBiometricEnabled(true)
        localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'true')
        setBiometricMessage('Biometric unlock enabled for this device.')
      } else {
        setBiometricEnabled(false)
        localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'false')
      }
    } else {
      setBiometricEnabled(false)
      localStorage.setItem(BIOMETRIC_STORAGE_KEY, 'false')
      localStorage.removeItem(BIOMETRIC_CREDENTIAL_STORAGE_KEY)
      sessionStorage.removeItem(BIOMETRIC_SESSION_UNLOCK_KEY)
      setBiometricMessage('Biometric unlock disabled for this device.')
    }

    setIsBiometricBusy(false)
  }
  const onSignOut = async () => {
    sessionStorage.removeItem(BIOMETRIC_SESSION_UNLOCK_KEY)
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
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Profile</CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Update profile details"
                onClick={() => {
                  router.push('/settings/profile-update')
                }}
              >
                <PencilLine className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Your account profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isProfileLoading ? (
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-56" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 rounded-lg border p-3">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt="Profile avatar"
                    className="h-14 w-14 rounded-full border object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-muted text-sm font-semibold text-muted-foreground">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{fullName ?? 'No name set'}</p>
                  <p className="truncate text-sm text-muted-foreground">{email ?? 'No email available'}</p>
                </div>
              </div>
            )}
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
              <Switch
                checked={biometricEnabled}
                disabled={isBiometricBusy || !biometricSupported}
                onCheckedChange={(checked) => {
                  void onBiometricToggle(checked)
                }}
              />
            </label>
            {!biometricSupported ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Biometrics are not available on this device/browser.
              </p>
            ) : null}
            {biometricEnabled ? (
              <div className="mt-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isBiometricBusy}
                  onClick={() => {
                    void verifyBiometric()
                  }}
                >
                  Verify biometrics
                </Button>
              </div>
            ) : null}
            {biometricMessage ? <p className="mt-2 text-xs text-muted-foreground">{biometricMessage}</p> : null}
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
