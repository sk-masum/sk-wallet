import { NextResponse } from 'next/server';

import { getRouteSupabaseContext } from '@/lib/supabase/route-auth';
import { getRequiredPrismaClient } from '@/lib/prisma';

export async function GET() {
  const { user, unauthorizedResponse } = await getRouteSupabaseContext();

  if (unauthorizedResponse || !user) {
    return unauthorizedResponse;
  }

  const prisma = getRequiredPrismaClient();
  const data = await prisma.card_provider.findMany({
    select: { name: true },
    orderBy: { name: 'asc' },
  });

  const names = Array.from(
    new Set(
      (data ?? [])
        .map((item) => String(item.name ?? '').trim())
        .filter(Boolean)
    )
  );

  return NextResponse.json({ data: names });
}