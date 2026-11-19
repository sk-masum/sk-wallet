import { NextRequest } from 'next/server';
import { encode } from 'next-auth/jwt';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { middleware } from '../../../middleware';

const secret = 'test-only-session-secret-not-used-in-production';

afterEach(() => vi.unstubAllEnvs());

describe('protected page middleware', () => {
  it.each(['/card', '/doc'])('accepts a valid HTTPS session for %s', async (path) => {
    vi.stubEnv('AUTH_URL', undefined);
    vi.stubEnv('AUTH_SECRET', undefined);
    vi.stubEnv('NEXTAUTH_URL', 'https://wallet.example');
    vi.stubEnv('NEXTAUTH_SECRET', secret);
    const cookieName = '__Secure-authjs.session-token';
    const token = await encode({ token: { sub: 'user-id' }, secret, salt: cookieName });
    const request = new NextRequest(`http://wallet.example${path}`, {
      headers: { cookie: `${cookieName}=${token}` },
    });

    expect((await middleware(request)).headers.get('location')).toBeNull();
  });

  it('accepts a valid local HTTP session without a configured URL', async () => {
    vi.stubEnv('AUTH_URL', undefined);
    vi.stubEnv('NEXTAUTH_URL', undefined);
    vi.stubEnv('AUTH_SECRET', secret);
    const cookieName = 'authjs.session-token';
    const token = await encode({ token: { sub: 'user-id' }, secret, salt: cookieName });
    const request = new NextRequest('http://localhost:3000/card', {
      headers: { cookie: `${cookieName}=${token}` },
    });

    expect((await middleware(request)).headers.get('location')).toBeNull();
  });

  it('redirects an invalid HTTPS session back to sign-in', async () => {
    vi.stubEnv('AUTH_URL', 'https://wallet.example');
    vi.stubEnv('AUTH_SECRET', secret);
    const request = new NextRequest('https://wallet.example/doc', {
      headers: { cookie: '__Secure-authjs.session-token=invalid' },
    });

    const response = await middleware(request);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://wallet.example/auth?next=%2Fdoc');
  });
});
