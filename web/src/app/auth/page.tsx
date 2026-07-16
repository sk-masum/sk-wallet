'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const [nextPath, setNextPath] = useState('/card')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setNextPath(params.get('next') || '/card')
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      const supabase = createSupabaseBrowserClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
        return
      }

      window.location.assign(nextPath)
      return
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    setError('')
    setLoading(true)

    try {
      const supabase = createSupabaseBrowserClient()
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data.session) {
        window.location.assign(nextPath)
        return
      }

      setError('Sign-up successful. Please verify your email, then sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Use your email and password to access SK Wallet.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <div className="grid gap-2 sm:grid-cols-2">
            <Button type="button" onClick={handleSignIn} disabled={loading || !email || !password}>
              {loading ? 'Please wait...' : 'Sign in'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleSignUp}
              disabled={loading || !email || !password}
            >
              {loading ? 'Please wait...' : 'Sign up'}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            After authentication, you will be redirected to your requested page.
          </p>
          <Link href="/" className="text-xs underline text-muted-foreground">
            Back to home
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
