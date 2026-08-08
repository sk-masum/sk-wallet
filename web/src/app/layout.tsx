import './global.css';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { ServiceWorkerRegister } from '@/components/pwa/sw-register';
import { BiometricGuard } from '@/components/security/biometric-guard';
import { AppToaster } from '@/components/ui/app-toaster';
import { QueryToastBridge } from '@/components/ui/query-toast-bridge';

type IosSplashAsset = {
  media: string;
  portraitSize: `${number}-${number}`;
};

const IOS_SPLASH_FALLBACK_LIGHT = '/splash-generated-light/apple-splash-1179-2556.png';
const IOS_SPLASH_FALLBACK_DARK = '/splash-generated-dark/apple-splash-1179-2556.png';

const splashPath = (
  mode: 'light' | 'dark',
  portraitSize: `${number}-${number}`,
  orientation: 'portrait' | 'landscape',
) => {
  const [w, h] = portraitSize.split('-');
  const size = orientation === 'portrait' ? `${w}-${h}` : `${h}-${w}`;
  return `/splash-generated-${mode}/apple-splash-${size}.png`;
};

const IOS_SPLASH_ASSETS: IosSplashAsset[] = [
  {
    media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '640-1136',
  },
  {
    media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '750-1334',
  },
  {
    media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1242-2208',
  },
  {
    media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '828-1792',
  },
  {
    media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1242-2688',
  },
  {
    media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1125-2436',
  },
  {
    media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1170-2532',
  },
  {
    media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1179-2556',
  },
  {
    media: '(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1206-2622',
  },
  {
    media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1284-2778',
  },
  {
    media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1290-2796',
  },
  {
    media: '(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1320-2868',
  },
  {
    media: '(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '1488-2266',
  },
  {
    media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '1536-2048',
  },
  {
    media: '(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '1620-2160',
  },
  {
    media: '(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '1640-2360',
  },
  {
    media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '1668-2224',
  },
  {
    media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '1668-2388',
  },
  {
    media: '(device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '1668-2420',
  },
  {
    media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '2048-2732',
  },
  {
    media: '(device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2)',
    portraitSize: '2064-2752',
  },
  {
    media: '(device-width: 360px) and (device-height: 780px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1080-2340',
  },
  {
    media: '(device-width: 420px) and (device-height: 912px) and (-webkit-device-pixel-ratio: 3)',
    portraitSize: '1260-2736',
  },
];

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
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef1f2' },
    { media: '(prefers-color-scheme: dark)', color: '#111417' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='apple-touch-startup-image' href={IOS_SPLASH_FALLBACK_LIGHT} />
        <link
          rel='apple-touch-startup-image'
          media='(prefers-color-scheme: dark)'
          href={IOS_SPLASH_FALLBACK_DARK}
        />
        {IOS_SPLASH_ASSETS.flatMap((asset) => [
          <link
            key={`light-portrait-${asset.media}`}
            rel='apple-touch-startup-image'
            media={`screen and ${asset.media} and (orientation: portrait)`}
            href={splashPath('light', asset.portraitSize, 'portrait')}
          />,
          <link
            key={`dark-portrait-${asset.media}`}
            rel='apple-touch-startup-image'
            media={`screen and ${asset.media} and (orientation: portrait) and (prefers-color-scheme: dark)`}
            href={splashPath('dark', asset.portraitSize, 'portrait')}
          />,
          <link
            key={`light-landscape-${asset.media}`}
            rel='apple-touch-startup-image'
            media={`screen and ${asset.media} and (orientation: landscape)`}
            href={splashPath('light', asset.portraitSize, 'landscape')}
          />,
          <link
            key={`dark-landscape-${asset.media}`}
            rel='apple-touch-startup-image'
            media={`screen and ${asset.media} and (orientation: landscape) and (prefers-color-scheme: dark)`}
            href={splashPath('dark', asset.portraitSize, 'landscape')}
          />,
        ])}
      </head>
      <body className='ios-pwa-body'>
        <div className='ios-pwa-statusbar-bg' aria-hidden='true' />
        <ServiceWorkerRegister />
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Suspense fallback={null}>
            <QueryToastBridge />
          </Suspense>
          <AppToaster />
          <BiometricGuard>
            <div className='min-h-screen app-aurora-shell'>
              {children}
            </div>
          </BiometricGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
