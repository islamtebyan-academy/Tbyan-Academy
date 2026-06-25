import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Prepend the locale to all paths
  localePrefix: 'as-needed'
});

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    
    // 1. Run next-intl middleware first to handle localization redirects
    let response = intlMiddleware(request);

    // Verify Supabase env vars are present before initializing
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error(`Missing Supabase environment variables. URL: ${!!process.env.NEXT_PUBLIC_SUPABASE_URL}, Key: ${!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`);
    }

    // 2. Setup Supabase client to inspect authentication state
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This refreshes the session if expired
    const { data: { user } } = await supabase.auth.getUser();

    // 3. Route Protection logic for Admin Dashboard
    const isAdminRoute = /^\/(?:ar|en|fr)?\/?admin(?:\/|$)/.test(pathname);
    const isLoginRoute = /^\/(?:ar|en|fr)?\/?admin\/login(?:\/|$)/.test(pathname);
    const isApiRoute = pathname.startsWith('/api/');

    if (isAdminRoute && !isLoginRoute && !isApiRoute) {
      if (!user) {
        const match = pathname.match(/^\/(ar|en|fr)/);
        const locale = match ? match[1] : 'en';
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = `/${locale}/portal/login`;
        return NextResponse.redirect(redirectUrl);
      }
    }

    return response;
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        error: error.message || error,
        stack: error.stack,
        diagnostics: {
          url_exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          anon_key_exists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          vercel_env: process.env.VERCEL_ENV || 'unknown',
        }
      }),
      {
        status: 500,
        headers: { 'content-type': 'application/json' }
      }
    );
  }
}

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
