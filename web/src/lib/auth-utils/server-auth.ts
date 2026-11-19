import { getSession } from '@/lib/auth/server';

export async function getServerSupabaseUser() {
  const session = await getSession();
  const user = session?.user && session.user.id
    ? { id: session.user.id, email: session.user.email, name: session.user.name }
    : null;

  return {
    user,
  };
}
