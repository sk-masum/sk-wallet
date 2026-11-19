'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRegister } from '@/lib/auth/useRegister';
import { signInWithEmailPassword } from '@/lib/auth-utils/browser-auth';

/**
 * Sign Up Page Component
 * 
 * Features:
 * - Email & password registration
 * - Input validation
 * - Password hashing on backend
 * - Auto sign-in after registration
 * - Error handling
 */
export default function SignUpPage() {
  const router = useRouter();
  const { register, loading: registering, error: registerError } = useRegister();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!fullName.trim()) {
      setError('Full name is required');
      return false;
    }

    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!email.includes('@')) {
      setError('Invalid email address');
      return false;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 1. Register user
      const registerResult = await register(email, password, fullName);

      if (!registerResult.success) {
        setError(registerResult.error || 'Registration failed');
        return;
      }

      // 2. Auto sign-in after successful registration
      const signInResult = await signInWithEmailPassword(email, password);

      if (signInResult?.error) {
        // Account created but sign-in failed
        setError('Account created successfully! Please sign in manually.');
        setTimeout(() => {
          router.push('/auth?tab=signin');
        }, 2000);
        return;
      }

      // 3. Redirect to dashboard
      router.push('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const displayError = error || registerError;
  const isLoading = loading || registering;

  return (
    <main className='relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-10'>
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[28px_28px]' />

      <div className='relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md items-center'>
        <Card className='w-full border-border/70 bg-card/92 shadow-[0_30px_90px_-52px_rgba(0,0,0,0.9)] backdrop-blur-xl'>
          <CardHeader className='space-y-3 pb-4'>
            <CardTitle className='text-2xl tracking-tight'>Create Account</CardTitle>
            <CardDescription>
              Sign up to get started with SK Wallet securely.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4'>
            <form className='space-y-4' onSubmit={handleSignUp}>
              {/* Full Name */}
              <div className='space-y-1.5'>
                <label htmlFor='name' className='text-sm font-medium'>
                  Full Name
                </label>
                <Input
                  id='name'
                  type='text'
                  placeholder='John Doe'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  className='h-11'
                />
              </div>

              {/* Email */}
              <div className='space-y-1.5'>
                <label htmlFor='email' className='text-sm font-medium'>
                  Email
                </label>
                <Input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className='h-11'
                />
              </div>

              {/* Password */}
              <div className='space-y-1.5'>
                <label htmlFor='password' className='text-sm font-medium'>
                  Password
                </label>
                <Input
                  id='password'
                  type='password'
                  placeholder='Enter a strong password (min 8 characters)'
                  autoComplete='new-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className='h-11'
                />
                <p className='text-xs text-muted-foreground'>
                  Minimum 8 characters for security
                </p>
              </div>

              {/* Confirm Password */}
              <div className='space-y-1.5'>
                <label htmlFor='confirm-password' className='text-sm font-medium'>
                  Confirm Password
                </label>
                <Input
                  id='confirm-password'
                  type='password'
                  placeholder='Re-enter your password'
                  autoComplete='new-password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className='h-11'
                />
              </div>

              {/* Error Message */}
              {displayError && (
                <div className='rounded-md border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive'>
                  {displayError}
                </div>
              )}

              {/* Sign Up Button */}
              <Button
                type='submit'
                disabled={isLoading}
                className='h-11 w-full'
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>

              {/* Sign In Link */}
              <p className='text-center text-sm text-muted-foreground'>
                Already have an account?{' '}
                <Link
                  href='/auth'
                  className='font-medium text-primary hover:underline'
                >
                  Sign In
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
