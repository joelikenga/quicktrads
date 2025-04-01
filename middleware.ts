import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const isLoginPage = request.nextUrl.pathname === '/admin_dashboard/login';

  // Block access to ALL admin routes if not logged in
  if (request.nextUrl.pathname.startsWith('/admin_dashboard') && !accessToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin_dashboard/login', request.url));
  }

  // Redirect logged-in users away from login page
  if (isLoginPage && accessToken) {
    return NextResponse.redirect(new URL('/admin_dashboard', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to ALL admin routes
export const config = {
  matcher: ['/admin_dashboard/:path*'],
};