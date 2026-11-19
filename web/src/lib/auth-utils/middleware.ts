import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const updateSession = async (request: NextRequest) => {
  // Match the origin Auth.js uses when naming the session cookie.
  const authUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  const protocol = authUrl ? new URL(authUrl).protocol : request.nextUrl.protocol;
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret, secureCookie: protocol === 'https:' });
  const user = token ? { id: token.sub, email: token.email } : null;

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  return { response, user };
};
