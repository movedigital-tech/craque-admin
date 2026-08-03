"use server";

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { findInvitationToken } from '@/lib/email/tokens';

export async function acceptInvite(formData: FormData) {
  const rawToken = String(formData.get('token') ?? '');
  const password = String(formData.get('password') ?? '');

  if (password.length < 8) throw new Error('A senha precisa ter ao menos 8 caracteres');

  const token = await findInvitationToken(rawToken, ['MEMBER_INVITE', 'GUARDIAN_INVITE']);
  if (!token || !token.membershipId) throw new Error('Convite inválido ou expirado');

  const passwordHash = await bcrypt.hash(password, 10);

  const membership = await db.$transaction(async (tx) => {
    await tx.user.update({ where: { id: token.userId }, data: { passwordHash, emailVerified: new Date() } });
    const updated = await tx.membership.update({ where: { id: token.membershipId! }, data: { status: 'ACTIVE' } });
    await tx.invitationToken.update({ where: { id: token.id }, data: { usedAt: new Date() } });
    return updated;
  });

  redirect(membership.role === 'TEACHER' ? '/instrutor/login?activated=1' : '/escolinha/login?activated=1');
}
