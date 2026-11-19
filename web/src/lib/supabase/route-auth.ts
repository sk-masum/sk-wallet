import { NextResponse } from 'next/server';

import { getAuthenticatedUser } from '@/lib/auth/server';

export async function getRouteAuthContext() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return {
      user: null,
      unauthorizedResponse: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return {
    user: {
      id: user.id || '',
      email: user.email || '',
      name: user.name || undefined,
      image: user.image || undefined,
    },
    unauthorizedResponse: null,
  };
}

// Legacy alias for backward compatibility
export const getRouteSupabaseContext = getRouteAuthContext;
