import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const updateSession = async (request: NextRequest) => {
  const token = await getToken({ req: request });
  const user = token ? { id: token.sub, email: token.email } : null;

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  return { response, user };
};
