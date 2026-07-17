'use client'

import { ArrowLeft, UserRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PageHeader } from '@/components/ui/page-header'
import { getBrowserUser, updateBrowserUser } from '@/lib/supabase/browser-auth'

export default function ProfileUpdatePage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getBrowserUser()
        setFullName(typeof user?.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : '')
        setEmail(user?.email ?? '')
        setAvatarUrl(typeof user?.user_metadata?.avatar_url === 'string' ? user.user_metadata.avatar_url : '')
      } finally {
        setLoading(false)
      }
    }

    void loadProfile()
  }, [])

  const initials = useMemo(() => {
    return (fullName || email || 'U')
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }, [email, fullName])

  const onSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const { error: profileError } = await updateBrowserUser({
        data: {
          full_name: fullName.trim(),
          avatar_url: avatarUrl.trim(),
        },
      })

      if (profileError) {
        setMessage(profileError.message)
        return
      }

      const existingUser = await getBrowserUser()
      const existingEmail = existingUser?.email ?? ''
      const nextEmail = email.trim()

      if (nextEmail && nextEmail !== existingEmail) {
        const { error: emailError } = await updateBrowserUser({ email: nextEmail })
        if (emailError) {
          setMessage(emailError.message)
          return
        }

        setMessage('Profile updated. Please verify your new email address to complete email change.')
        return
      }

      setMessage('Profile updated successfully.')
      router.push('/settings')
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Update Profile"
        description="Edit your profile details."
        showBackButton
        backHref="/settings"
        backButtonLabel="Back to settings"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            Profile Details
          </CardTitle>
          <CardDescription>Update your display name, email, and avatar URL.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {avatarUrl.trim() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl.trim()}
                alt="Avatar preview"
                className="h-14 w-14 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-muted text-sm font-semibold text-muted-foreground">
                {initials}
              </div>
            )}
            <p className="text-sm text-muted-foreground">Live avatar preview</p>
          </div>

          <Input
            placeholder="Full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            disabled={loading || saving}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading || saving}
          />
          <Input
            placeholder="Avatar URL"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            disabled={loading || saving}
          />

          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}

          <div className="flex items-center gap-2">
            <Button type="button" onClick={onSave} disabled={loading || saving}>
              {saving ? 'Saving...' : 'Save profile'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                router.push('/settings')
              }}
              disabled={saving}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      <BottomTabBar />
    </main>
  )
}
