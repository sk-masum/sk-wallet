'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signInWithEmailPassword, signUpWithEmailPassword } from '@/lib/supabase/browser-auth'

export default function AuthPage() {
  const [nextPath, setNextPath] = useState('/card')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setNextPath(params.get('next') || '/card')
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loadingAction, setLoadingAction] = useState<'signin' | 'signup' | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const loading = loadingAction !== null

  const handleSignIn = async () => {
    setError('')
    setLoadingAction('signin')

    try {
      const { error: signInError } = await signInWithEmailPassword(
        email,
        password
      )

      if (signInError) {
        setError(signInError.message)
        return
      }

      window.location.assign(nextPath)
      return
    } finally {
      setLoadingAction(null)
    }
  }

  const handleSignUp = async () => {
    setError('')
    setLoadingAction('signup')

    try {
      const { data, error: signUpError } = await signUpWithEmailPassword(
        email,
        password
      )

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (data.session) {
        window.location.assign(nextPath)
        return
      }

      setError('Account created. Please verify your email, then sign in.')
    } finally {
      setLoadingAction(null)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!loading && email && password) {
      void handleSignIn()
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,hsl(var(--primary)/0.12),transparent_34%),radial-gradient(circle_at_90%_20%,hsl(var(--ring)/0.18),transparent_26%),linear-gradient(160deg,hsl(var(--background)),hsl(var(--muted)/0.6))] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:min-h-[calc(100vh-5rem)] lg:flex-row lg:items-stretch">
        <section className="rounded-2xl border border-border/60 bg-card/85 p-4 shadow-lg backdrop-blur-md lg:hidden">
          <div className="space-y-3">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-muted/60 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              SK Wallet
            </p>
            <h1 className="text-lg font-semibold leading-snug">
              Keep cards, credentials, and docs in one secure vault.
            </h1>
            <ul className="grid gap-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-foreground" />
                Fast private access across modules
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-foreground" />
                Redirects to your requested page after login
              </li>
            </ul>
          </div>
        </section>

        <section className="relative hidden overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-foreground to-primary p-7 text-primary-foreground shadow-2xl lg:block lg:flex-1 lg:p-10">
          <div className="pointer-events-none absolute -left-14 top-24 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-background/20 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div className="space-y-5">
              <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                <ShieldCheck className="h-3.5 w-3.5" />
                SK Wallet
              </p>

              <div className="space-y-3">
                <h1 className="max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Keep cards, credentials, and docs in one secure vault.
                </h1>
                <p className="max-w-md text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                  Sign in to instantly access your encrypted records and continue where you left off.
                </p>
              </div>
            </div>

            <ul className="grid gap-3 text-sm text-primary-foreground/90 sm:max-w-sm">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Fast and private access across your wallet modules
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                One account for cards, credentials, and documents
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Redirects back to your requested page after login
              </li>
            </ul>
          </div>
        </section>

        <section className="lg:w-115 lg:shrink-0">
          <Card className="h-full border-border/70 bg-card/95 shadow-2xl backdrop-blur-md">
            <CardHeader className="space-y-2 pb-4">
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Use your email and password to access SK Wallet.</CardDescription>
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
                    className="h-10"
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
                      className="h-10 pr-10"
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

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <Button type="submit" disabled={loading || !email || !password} className="gap-2">
                    {loadingAction === 'signin' ? 'Signing in...' : 'Sign in'}
                    {loadingAction !== 'signin' ? <ArrowRight className="h-4 w-4" /> : null}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSignUp}
                    disabled={loading || !email || !password}
                    className="gap-2"
                  >
                    {loadingAction === 'signup' ? 'Creating account...' : 'Create account'}
                  </Button>
                </div>
              </form>

              <div className="rounded-lg border border-border/70 bg-muted/40 p-3 text-xs text-muted-foreground">
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  Secure access note
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
        </section>
      </div>
    </main>
  )
}
