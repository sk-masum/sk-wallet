import { createSupabaseBrowserClient } from '../lib/supabase/client';

export default function Index() {
  const isSupabaseReady =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isSupabaseReady) {
    // Ensures the helper is imported and wired correctly at runtime.
    createSupabaseBrowserClient();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-24">
        <p className="w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
          Nx Workspace Ready
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Next.js app with Tailwind and Supabase client setup
        </h1>
        <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
          This project uses Nx for monorepo orchestration, Tailwind CSS for
          styling, and a preconfigured Supabase browser client.
        </p>

        <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Application
            </p>
            <p className="mt-2 text-lg font-medium">web</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Supabase Env
            </p>
            <p className="mt-2 text-lg font-medium">
              {isSupabaseReady ? 'Configured' : 'Not configured yet'}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
