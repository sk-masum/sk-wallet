import { NextResponse } from 'next/server';

import {
  ownedEntityNotFoundResponse,
  serverErrorResponse,
  withOwnedRouteContext,
} from '@/app/api/shared/owned-route';
import { credentialSecretTokenSelect } from '@/app/api/credential/shared';
import { detokenizeCredentialSecret } from '@/lib/security/credential-token';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, prisma }) => {
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
      return serverErrorResponse('Failed to decode credential secret');
    }
  });
}
