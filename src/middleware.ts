import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt-BR'],

  // Used when no locale matches
  defaultLocale: 'en'
});

const isProtectedRoute = createRouteMatcher(['/:locale/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth();
    if (userId) {
      try {
        await fetch(`${req.nextUrl.origin}/api/user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clerkId: userId })
        });
      } catch (error) {
        console.error('Failed to sync user:', error);
      }
    }
    auth().protect();
  }

  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/.*|react-py.*).*)'
  ]
};