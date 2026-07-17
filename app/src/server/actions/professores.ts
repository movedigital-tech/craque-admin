"use server";

import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { sendMemberInviteEmail } from '@/lib/email';
import type { MembershipRole } from '@/generated/prisma/client';

function tempPassword() {
  return `Craque@${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function inviteMember(formData: FormData) {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const phone = String(formData.get('phone') ?? '').trim() || null;
  const role = String(formData.get('role') ?? 'TEACHER') as MembershipRole;

  if (!name || !email) throw new Error('Nome e e-mail são obrigatórios');

  let user = await db.user.findUnique({ where: { email } });
  const isNewUser = !user;
  const pwd = tempPassword();

  if (!user) {
    const passwordHash = await bcrypt.hash(pwd, 10);
    user = await db.user.create({ data: { name, email, phone, passwordHash } });
  }

  const existing = await db.membership.findUnique({
    where: { userId_organizationId: { userId: user.id, organizationId: organization.id } },
  });
  if (!existing) {
    await db.membership.create({ data: { userId: user.id, organizationId: organization.id, role, status: 'INVITED' } });
  }

  if (isNewUser && (role === 'TEACHER' || role === 'MANAGER')) {
    await sendMemberInviteEmail(email, name, organization.name, pwd, role).catch(console.error);
  }

  revalidatePath('/escolinha/professores');
  redirect('/escolinha/professores');
}
