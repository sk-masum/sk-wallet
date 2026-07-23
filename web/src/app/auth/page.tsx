'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { requestPersistentStorageOnFirstLogin } from '@/lib/biometric'
import { signInWithEmailPassword } from '@/lib/supabase/browser-auth'

export default function AuthPage() {
  const [nextPath, setNextPath] = useState('/')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setNextPath(params.get('next') || '/')
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      const { error: signInError } = await signInWithEmailPassword(
        email,
        password
      )

      if (signInError) {
        setError(signInError.message)
        return
      }

      await requestPersistentStorageOnFirstLogin()

      window.location.assign(nextPath)
      return
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!loading && email && password) {
      void handleSignIn()
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_8%_12%,hsl(var(--primary)/0.2),transparent_34%),radial-gradient(circle_at_92%_16%,hsl(var(--ring)/0.16),transparent_28%),radial-gradient(circle_at_50%_100%,hsl(var(--accent)/0.12),transparent_42%),linear-gradient(160deg,hsl(var(--background)),hsl(var(--muted)/0.45))] px-4 py-10 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[28px_28px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center">
        <Card className="w-full border-border/70 bg-card/92 shadow-[0_30px_90px_-52px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <CardHeader className="space-y-3 pb-4">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-muted/55 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              SK Wallet
            </p>
            <CardTitle className="text-2xl tracking-tight">Sign in</CardTitle>
            <CardDescription>Enter your email and password to continue securely.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error ? (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              <Button type="submit" disabled={loading || !email || !password} className="h-11 w-full gap-2">
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading ? <ArrowRight className="h-4 w-4" /> : null}
              </Button>
            </form>

            <div className="rounded-lg border border-border/70 bg-muted/35 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Lock className="h-3.5 w-3.5" />
                Secure access
              </p>
              <p className="mt-1 leading-relaxed">
                After authentication, you will be redirected to your requested page.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Back to home
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
