import { type NextRequest, NextResponse } from 'next/server';

import { JWT_COOKIE_NAME } from '@convex-dev/better-auth/plugins';
import { getSessionCookie } from 'better-auth/cookies';

/**
 * Next.js 16+ network boundary (replaces middleware.ts).
 * Optimistic guard: presence of the Convex JWT cookie only — same signal as
 * getToken()’s fast path. Layout + Convex functions must still enforce auth.
 */
export function proxy(request: NextRequest) {
  const token = getSessionCookie(request, { cookieName: JWT_COOKIE_NAME });
  if (token) {
    return NextResponse.next();
  }

  const signIn = new URL('/sign-in', request.url);
  signIn.searchParams.set(
    'callbackUrl',
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );
  return NextResponse.redirect(signIn);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
