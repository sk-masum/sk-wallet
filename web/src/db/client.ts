import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof drizzle> | undefined;
}

function createDrizzleClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }

  const client = createClient({
    url: process.env.DATABASE_URL,
  });

  return drizzle(client, { schema });
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalThis.__db) {
    globalThis.__db = createDrizzleClient();
  }

  return globalThis.__db;
}

export function getRequiredDb() {
  const db = getDb();

  if (!db) {
    throw new Error('DATABASE_URL is not configured');
  }

  return db;
}

export type Db = ReturnType<typeof drizzle>;
