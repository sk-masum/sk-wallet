import { NextResponse } from 'next/server';

import { getServerSupabaseUser } from '@/lib/supabase/server-auth';

export async function getRouteSupabaseContext() {
  const { supabase, user } = await getServerSupabaseUser();

  if (!user) {
    return {
      supabase,
      user: null,
      unauthorizedResponse: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return {
    supabase,
    user,
    unauthorizedResponse: null,
  };
}
