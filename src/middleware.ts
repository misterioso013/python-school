import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
 
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'pt-BR'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});

const isProtectedRoute = createRouteMatcher(['/:locale/dashboard(.*)']);
 
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
 
  return intlMiddleware(req);
});
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt-BR|en)/:path*']
};