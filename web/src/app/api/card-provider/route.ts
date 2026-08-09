import { NextResponse } from 'next/server';

import { withUserRouteContext } from '@/app/api/shared/owned-route';

export async function GET() {
  return withUserRouteContext(async ({ prisma }) => {
    const data = await prisma.card_provider.findMany({
      select: { name: true },
      orderBy: { name: 'asc' },
    });

    const names = Array.from(
      new Set((data ?? []).map((item) => String(item.name ?? '').trim()).filter(Boolean)),
    );

    return NextResponse.json({ data: names });
  });
}
