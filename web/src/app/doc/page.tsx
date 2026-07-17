import Link from 'next/link'
import { BookOpenText } from 'lucide-react'

import { BottomTabBar } from '@/components/ui/bottom-tab-bar'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { DOC_API_ITEMS, DOC_FEATURE_ITEMS } from '@/constants/doc/items'

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
          {DOC_FEATURE_ITEMS.map((feature) => {
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
        {DOC_API_ITEMS.map((api) => (
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
