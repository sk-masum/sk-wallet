import './global.css';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { ServiceWorkerRegister } from '@/components/pwa/sw-register';
import { BiometricGuard } from '@/components/security/biometric-guard';
import { AppToaster } from '@/components/ui/app-toaster';
import { QueryToastBridge } from '@/components/ui/query-toast-bridge';

const IOS_SPLASH_LIGHT = '/splash-screen/splash-screen.png';
const IOS_SPLASH_DARK = '/splash-screen/splash-screen_dark.png';

export const metadata: Metadata = {
  title: 'SK Wallet',
  description: 'A digital wallet for managing cards.',
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'Wallet',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
      { url: '/icons/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/icons/favicon.ico'],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Wallet',
    statusBarStyle: 'default',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030816' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-startup-image"
          media="(prefers-color-scheme: light)"
          href={IOS_SPLASH_LIGHT}
        />
        <link
          rel="apple-touch-startup-image"
          media="(prefers-color-scheme: dark)"
          href={IOS_SPLASH_DARK}
        />
      </head>
      <body className="ios-pwa-body">
        <div className="ios-pwa-statusbar-bg" aria-hidden="true" />
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
  );
}
