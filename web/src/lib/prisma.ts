import { PrismaClient } from '@/generated/prisma';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient() {
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
