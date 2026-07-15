import Link from 'next/link'

export default function Page() {

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold">SK Wallet</h1>
      <p className="text-muted-foreground">
        Use the pages below to view cards and API documentation.
      </p>

      <div className="flex gap-3">
        <Link
          href="/card"
          className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Card Page
        </Link>
        <Link
          href="/doc"
          className="inline-flex rounded-md border border-input bg-background px-4 py-2 text-sm font-medium"
        >
          Doc Page
        </Link>
      </div>
    </main>
  )
}