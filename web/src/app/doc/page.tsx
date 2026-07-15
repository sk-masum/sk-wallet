import Link from 'next/link'

export default function DocPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">API Docs</h1>
        <Link href="/" className="text-sm text-muted-foreground underline">
          Home
        </Link>
      </div>

      <section className="space-y-6">
        <article className="rounded-md border border-border p-4">
          <h2 className="mb-2 text-lg font-medium">List cards</h2>
          <p className="mb-2 text-sm text-muted-foreground">GET /api/card</p>
          <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
{`curl http://localhost:4200/api/card`}
          </pre>
        </article>

        <article className="rounded-md border border-border p-4">
          <h2 className="mb-2 text-lg font-medium">Filter by ids</h2>
          <p className="mb-2 text-sm text-muted-foreground">GET /api/card?ids=1,2,3</p>
          <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
{`curl "http://localhost:4200/api/card?ids=1,2,3"`}
          </pre>
        </article>

        <article className="rounded-md border border-border p-4">
          <h2 className="mb-2 text-lg font-medium">Single card by id</h2>
          <p className="mb-2 text-sm text-muted-foreground">GET /api/card/:id</p>
          <pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
{`curl http://localhost:4200/api/card/1`}
          </pre>
        </article>
      </section>
    </main>
  )
}
