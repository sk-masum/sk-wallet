import './global.css';
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata, Viewport } from 'next'
import { ServiceWorkerRegister } from '@/components/pwa/sw-register'

export const metadata: Metadata = {
  title: 'SK Wallet',
  description: 'A digital wallet for managing cards.',
  manifest: '/manifest.webmanifest',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
