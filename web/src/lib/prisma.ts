import { PrismaClient } from '@/generated/prisma';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL ?? '';
  const isSupabaseDirect =
    databaseUrl.includes('.supabase.co:5432') && !databaseUrl.includes('.pooler.supabase.com:6543');

  if (isSupabaseDirect) {
    console.warn(
      '[prisma] DATABASE_URL appears to be a direct Supabase host (:5432). In serverless, use Supavisor pooler (:6543) with ?pgbouncer=true&connection_limit=1 to avoid connection exhaustion.',
    );
  }

  return new PrismaClient();
}

export function getPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalThis.__prisma) {
    globalThis.__prisma = createPrismaClient();
  }

  return globalThis.__prisma;
}

export function getRequiredPrismaClient() {
  const prisma = getPrismaClient();

  if (!prisma) {
    throw new Error('DATABASE_URL is not configured');
  }

  return prisma;
}
