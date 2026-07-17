import './global.css';
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { ServiceWorkerRegister } from '@/components/pwa/sw-register'
import { BiometricGuard } from '@/components/security/biometric-guard'
import { AppToaster } from '@/components/ui/app-toaster'
import { QueryToastBridge } from '@/components/ui/query-toast-bridge'

export const metadata: Metadata = {
  title: 'SK Wallet',
  description: 'A digital wallet for managing cards.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon-192.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/icons/icon-192.svg'],
    apple: [{ url: '/icons/icon-192.svg', type: 'image/svg+xml' }],
  },
  appleWebApp: {
    capable: true,
    title: 'SK Wallet',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: '#0b5fff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ServiceWorkerRegister />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Suspense fallback={null}>
            <QueryToastBridge />
          </Suspense>
          <AppToaster />
          <BiometricGuard>
            <div className="min-h-screen bg-[radial-gradient(circle_at_15%_8%,hsl(var(--primary)/0.12),transparent_35%),radial-gradient(circle_at_85%_22%,hsl(var(--ring)/0.14),transparent_30%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--muted)/0.5))]">
              {children}
            </div>
          </BiometricGuard>
        </ThemeProvider>
      </body>
    </html>
  )
}
