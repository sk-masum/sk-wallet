# Prisma + Supabase Setup

This project uses Prisma v6 with a Supabase Postgres database.

## 1) Configure environment variables

Create `web/.env.local` for Next.js runtime and set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
CARD_TOKEN_SECRET=replace-with-a-long-random-secret
DATABASE_URL=postgresql://postgres.your-project-ref:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:[password]@db.your-project-ref.supabase.co:5432/postgres
```

Create `prisma/.env` for Prisma CLI and set:

```env
DATABASE_URL=postgresql://postgres.your-project-ref:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres:[password]@db.your-project-ref.supabase.co:5432/postgres
```

Notes:
- `DATABASE_URL`: pooled Supabase connection (runtime queries). Use:
	`postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`
	so serverless functions do not exhaust direct Postgres connections.
- `DIRECT_URL`: direct Supabase connection (schema/introspection/migration operations).
- `CARD_TOKEN_SECRET`: server-only secret for card token encryption.

## 2) Apply Supabase SQL migrations

Run these scripts in Supabase SQL Editor (order matters):

1. `web/supabase/rls_card_owner.sql`
2. `web/supabase/card_number_token_text.sql`
3. `web/supabase/card_provider_schema.sql`
4. `web/supabase/add_card_color_name.sql`
5. `web/supabase/card_status.sql`
6. `web/supabase/card_credit_limit.sql`
7. `web/supabase/card_billing_payment_dates.sql`
8. `web/supabase/card_tags.sql`
9. `web/supabase/credential_schema.sql`
10. `web/supabase/credential_type_options_expand.sql`
11. `web/supabase/document_schema.sql`
12. `web/supabase/document_type_options_expand.sql`
13. `web/supabase/document_category_options_expand.sql`
14. `web/supabase/document_type_allow_custom_when_other.sql`
15. `web/supabase/document_allow_multiple_same_type.sql`

## 3) Introspect and generate Prisma client

From repository root:

```bash
npm run prisma:sync
```

This runs:
- `prisma db pull` to introspect your Supabase schema into `prisma/schema.prisma`
- `prisma generate` to regenerate `web/src/generated/prisma`

## 4) Validate Prisma setup

```bash
npm run prisma:validate
npm run prisma:studio
```

Studio should open and show your Supabase tables/models.

## 5) Ongoing workflow

- After any schema change made in Supabase SQL Editor, run `npm run prisma:sync`.
- If you edit `prisma/schema.prisma` manually, run `npm run prisma:generate`.
- Avoid `prisma migrate dev` against production Supabase unless you have a dedicated migration workflow.
