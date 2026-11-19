import type { Config } from 'drizzle-kit';

export default {
  schema: './web/src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url:
      (globalThis as typeof globalThis & {
        process?: { env?: { DATABASE_URL?: string } };
      }).process?.env?.DATABASE_URL || 'file:./dev.db',
  },
} satisfies Config;
