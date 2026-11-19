import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

export default {
  schema: './web/src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
} satisfies Config;
