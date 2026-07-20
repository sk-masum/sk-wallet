import './global.css';
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { ServiceWorkerRegister } from '@/components/pwa/sw-register'
import { BiometricGuard } from '@/components/security/biometric-guard'
import { AppToaster } from '@/components/ui/app-toaster'
import { QueryToastBridge } from '@/components/ui/query-toast-bridge'

const IOS_SPLASH_SCREENS = [
  {
    href: '/apple-splash/iphone-se-2',
    media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
  },
  {
    href: '/apple-splash/iphone-se-2-landscape',
    media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)',
  },
  {
    href: '/apple-splash/iphone-8-plus',
    media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
  },
  {
    href: '/apple-splash/iphone-8-plus-landscape',
    media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
  },
  {
    href: '/apple-splash/iphone-11-pro-max',
    media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
  },
  {
    href: '/apple-splash/iphone-11-pro-max-landscape',
    media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
  },
  {
    href: '/apple-splash/iphone-12-mini',
    media: '(device-width: 360px) and (device-height: 780px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
  },
  {
    href: '/apple-splash/iphone-12-mini-landscape',
    media: '(device-width: 360px) and (device-height: 780px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
  },
  {
    href: '/apple-splash/iphone-12-13-14',
    media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
  },
  {
    href: '/apple-splash/iphone-12-13-14-landscape',
    media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
  },
  {
    href: '/apple-splash/iphone-14-plus',
    media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
  },
  {
    href: '/apple-splash/iphone-14-plus-landscape',
    media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
  },
  {
    href: '/apple-splash/iphone-14-15-pro',
    media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
  },
  {
    href: '/apple-splash/iphone-14-15-pro-landscape',
    media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
  },
  {
    href: '/apple-splash/iphone-15-pro-max',
    media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
  },
  {
    href: '/apple-splash/iphone-15-pro-max-landscape',
    media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)',
  },
]

export const metadata: Metadata = {
  title: 'SK Wallet',
  description: 'A digital wallet for managing cards.',
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Wallet',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [
      { url: '/icon0.svg', type: 'image/svg+xml' },
      { url: '/icon1.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    title: 'Wallet',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0b5fff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Wallet" />
        {IOS_SPLASH_SCREENS.map((splash) => (
          <link
            key={splash.href}
            rel="apple-touch-startup-image"
            media={splash.media}
            href={splash.href}
          />
        ))}
      </head>
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
