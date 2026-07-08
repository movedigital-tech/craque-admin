import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe subset of the Auth.js config (no Prisma/bcrypt imports) used by
 * middleware.ts for the cheap "is there a session" check. The full config
 * with the Credentials provider lives in auth.ts and only runs in the Node
 * runtime (API route, Server Components, Server Actions).
 */
export const authConfig = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [],
} satisfies NextAuthConfig;
