import { NextResponse } from 'next/server';

import {
  ownedEntityNotFoundResponse,
  resolveOwnedRouteContext,
} from '@/app/api/shared/owned-route';
import { credentialSecretTokenSelect } from '@/app/api/credential/shared';
import { detokenizeCredentialSecret } from '@/lib/security/credential-token';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const routeContext = await resolveOwnedRouteContext(context.params);
  if (routeContext instanceof NextResponse) {
    return routeContext;
  }
  const { id, userId, prisma } = routeContext;

  const data = await prisma.credential_record.findFirst({
    where: { id, user_id: userId },
    select: credentialSecretTokenSelect,
  });

  if (!data) {
    return ownedEntityNotFoundResponse('Credential');
  }

  try {
    const secret = detokenizeCredentialSecret(data.secret_token);
    return NextResponse.json({ data: { id: data.id, secret } });
  } catch {
    return NextResponse.json({ error: 'Failed to decode credential secret' }, { status: 500 });
  }
}
