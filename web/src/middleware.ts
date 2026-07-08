import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

const { auth } = NextAuth(authConfig);

const ADMIN_PROTECTED_PREFIXES = ['/dashboard', '/organizations', '/subscriptions', '/webhook-logs', '/usuarios', '/config'];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isEscolinhaProtected = pathname.startsWith('/escolinha') && pathname !== '/escolinha/login';
  const isAdminProtected = ADMIN_PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (!isLoggedIn) {
    if (isEscolinhaProtected) return Response.redirect(new URL('/escolinha/login', req.url));
    if (isAdminProtected) return Response.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: ['/dashboard/:path*', '/organizations/:path*', '/subscriptions/:path*', '/webhook-logs/:path*', '/usuarios/:path*', '/config/:path*', '/escolinha/:path*'],
};
