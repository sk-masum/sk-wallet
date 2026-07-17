import { CreditCard, Lock, Settings2, UserRound } from 'lucide-react'

export const DOC_FEATURE_ITEMS = [
  {
    title: 'Card Management',
    description: 'Create, edit, delete, search, and filter saved cards.',
    href: '/card',
    icon: CreditCard,
  },
  {
    title: 'Biometric Security',
    description: 'Session-based biometric lock with Face ID / Touch ID support.',
    href: '/settings',
    icon: Lock,
  },
  {
    title: 'Profile Settings',
    description: 'View profile details and update name, email, and avatar.',
    href: '/settings/profile-update',
    icon: UserRound,
  },
  {
    title: 'Appearance Controls',
    description: 'Switch between light and dark themes from settings.',
    href: '/settings',
    icon: Settings2,
  },
]

export const DOC_API_ITEMS = [
  {
    title: 'List cards',
    method: 'GET',
    endpoint: '/api/card',
    curl: 'curl http://localhost:4200/api/card',
  },
  {
    title: 'Filter by ids',
    method: 'GET',
    endpoint: '/api/card?ids=1,2,3',
    curl: 'curl "http://localhost:4200/api/card?ids=1,2,3"',
  },
  {
    title: 'Single card by id',
    method: 'GET',
    endpoint: '/api/card/:id',
    curl: 'curl http://localhost:4200/api/card/1',
  },
]
