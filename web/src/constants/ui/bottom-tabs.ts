import { BookText, CreditCard, Settings } from 'lucide-react'

export const BOTTOM_TABS = [
  {
    href: '/card',
    label: 'Card',
    icon: CreditCard,
    match: (pathname: string) => pathname.startsWith('/card'),
  },
  {
    href: '/doc',
    label: 'Doc',
    icon: BookText,
    match: (pathname: string) => pathname.startsWith('/doc'),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    match: (pathname: string) => pathname.startsWith('/settings'),
  },
]
