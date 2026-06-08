import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Prepend the locale to all paths
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames, excluding api, _next, static assets
  matcher: [
    // Match the home page
    '/',
    // Match all localized paths
    '/(ar|en|fr)/:path*',
    // Match all other paths that aren't static assets or api routes
    '/((?!api|_next/static|_next/image|images|favicon|logo|.*\\..*).*)'
  ]
};
