import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { credential_record } from '@/db/schema';

import {
  ownedEntityNotFoundResponse,
  serverErrorResponse,
  withOwnedRouteContext,
} from '@/app/api/shared/owned-route';
import { credentialSecretTokenSelect } from '@/app/api/credential/shared';
import { detokenizeCredentialSecret } from '@/lib/security/credential-token';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  return withOwnedRouteContext(context.params, async ({ id, userId, db }) => {
    const data = await db
      .select(credentialSecretTokenSelect)
      .from(credential_record)
      .where(and(eq(credential_record.id, id), eq(credential_record.user_id, userId)))
      .limit(1);

    if (!data || data.length === 0) {
      return ownedEntityNotFoundResponse('Credential');
    }

    try {
      const secret = detokenizeCredentialSecret(data[0].secret_token);
      return NextResponse.json({ data: { id: data[0].id, secret } });
    } catch {
      return serverErrorResponse('Failed to decode credential secret');
    }
  });
}
