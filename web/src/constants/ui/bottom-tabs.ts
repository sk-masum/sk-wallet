import { BookText, CreditCard, KeyRound, Settings } from 'lucide-react'

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
    href: '/credential',
    label: 'Cred',
    icon: KeyRound,
    match: (pathname: string) => pathname.startsWith('/credential'),
  },
]
