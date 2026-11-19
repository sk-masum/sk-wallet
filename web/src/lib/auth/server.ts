import { auth } from '@/lib/auth';
import { getRequiredDb } from '@/db/client';
import { User } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getSession() {
  return await auth();
}

export async function getAuthenticatedUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function getAuthenticatedUserWithDb() {
  const session = await getSession();
  if (!session?.user?.email) {
    return null;
  }

  const db = getRequiredDb();
  const user = await db.select().from(User).where(eq(User.email, session.user.email)).get();

  return user;
}

export async function requireAuthenticatedUser() {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireAuthenticatedUserWithDb() {
  const user = await getAuthenticatedUserWithDb();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
