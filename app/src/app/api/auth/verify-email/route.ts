import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { findInvitationToken } from '@/lib/email/tokens';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawToken = url.searchParams.get('token') ?? '';

  const token = await findInvitationToken(rawToken, 'EMAIL_VERIFICATION');
  if (!token) {
    return NextResponse.redirect(new URL('/escolinha/login?verified=0', url));
  }

  await db.$transaction([
    db.user.update({ where: { id: token.userId }, data: { emailVerified: new Date() } }),
    db.invitationToken.update({ where: { id: token.id }, data: { usedAt: new Date() } }),
  ]);

  return NextResponse.redirect(new URL('/escolinha/login?verified=1', url));
}
