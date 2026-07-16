import Link from 'next/link'
import { BookOpenText, CreditCard, Lock, Settings2, UserRound } from 'lucide-react'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { ModeToggle } from '@/components/ui/mode-toggle'

const featureItems = [
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

const apiItems = [
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

export default function DocPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-28 pt-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Documentation</h1>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/" className="text-sm text-muted-foreground underline">
            Home
          </Link>
        </div>
      </div>

      <section className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <BookOpenText className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Feature Listing</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featureItems.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className="rounded-md border border-border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-base font-medium">{feature.title}</h3>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">{feature.description}</p>
                <Link href={feature.href} className="text-sm underline text-muted-foreground hover:text-foreground">
                  Open {feature.href}
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">API Docs</h2>
        {apiItems.map((api) => (
          <article key={api.title} className="rounded-md border border-border p-4">
            <h3 className="mb-2 text-lg font-medium">{api.title}</h3>
            <p className="mb-2 text-sm text-muted-foreground">
              {api.method} {api.endpoint}
            </p>
            <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">{api.curl}</pre>
          </article>
        ))}
      </section>

      <BottomTabBar />
    </main>
  )
}
