import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import * as schema from './schema';

declare global {
  // eslint-disable-next-line no-var
  var __db: ReturnType<typeof drizzle> | undefined;
}

function createDrizzleClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }

  // Parse file:// URLs for SQLite
  const dbPath = process.env.DATABASE_URL.replace('file:', '');
  
  // Resolve relative paths from the workspace root
  const resolvedPath = dbPath.startsWith('/') 
    ? dbPath 
    : path.resolve(process.cwd(), dbPath);

  const sqlite = new Database(resolvedPath);
  return drizzle(sqlite, { schema });
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
