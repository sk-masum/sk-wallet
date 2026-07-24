'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

const LIGHT_THEME_COLOR = '#e5eafe'
const DARK_THEME_COLOR = '#0d1333'

function ThemeColorSync() {
  const { theme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    const isDark =
      theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark')
    const color = isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR

    let runtimeMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"][data-runtime-theme="true"]'
    )

    if (!runtimeMeta) {
      runtimeMeta = document.createElement('meta')
      runtimeMeta.setAttribute('name', 'theme-color')
      runtimeMeta.setAttribute('data-runtime-theme', 'true')
      document.head.appendChild(runtimeMeta)
    }

    runtimeMeta.setAttribute('content', color)
  }, [theme, resolvedTheme])

  return null
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  )
}
