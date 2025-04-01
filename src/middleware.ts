import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt-BR'],

  // Used when no locale matches
  defaultLocale: 'en'
});

const isProtectedRoute = createRouteMatcher([
  '/:locale/dashboard(.*)',
  '/:locale/api/certificates/download/(.*)',
  '/:locale/admin(.*)',
  '/:locale/api/admin/(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/.*|react-py.*|api/.*).*)',
    '/:locale/api/certificates/download/:id*'
  ]
};