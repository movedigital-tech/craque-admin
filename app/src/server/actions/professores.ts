"use server";

import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import type { MembershipRole } from '@/generated/prisma/client';
import { createInvitationToken } from '@/lib/email/tokens';
import { emailProvider } from '@/lib/email/resend-provider';
import { memberInviteEmailTemplate } from '@/lib/email/templates';

const ROLE_LABELS: Record<MembershipRole, string> = {
  OWNER: 'proprietário(a)',
  MANAGER: 'gestor(a)',
  TEACHER: 'instrutor(a)',
  GUARDIAN: 'responsável',
};

export async function inviteMember(formData: FormData) {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const phone = String(formData.get('phone') ?? '').trim() || null;
  const role = String(formData.get('role') ?? 'TEACHER') as MembershipRole;

  if (!name || !email) throw new Error('Nome e e-mail são obrigatórios');

  let user = await db.user.findUnique({ where: { email } });
  if (!user) {
    const passwordHash = await bcrypt.hash(randomUUID(), 10);
    user = await db.user.create({ data: { name, email, phone, passwordHash } });
  }

  let membership = await db.membership.findUnique({
    where: { userId_organizationId: { userId: user.id, organizationId: organization.id } },
  });
  if (!membership) {
    membership = await db.membership.create({ data: { userId: user.id, organizationId: organization.id, role, status: 'INVITED' } });

    try {
      const token = await db.$transaction((tx) =>
        createInvitationToken(tx, { userId: user!.id, type: 'MEMBER_INVITE', membershipId: membership!.id }),
      );
      const acceptUrl = `${process.env.APP_BASE_URL}/aceitar-convite?token=${token}`;
      await emailProvider.send({ to: email, ...memberInviteEmailTemplate({ name, orgName: organization.name, roleLabel: ROLE_LABELS[role], acceptUrl }) });
    } catch (err) {
      console.error('[inviteMember] failed to send invite email', err);
    }
  }

  revalidatePath('/escolinha/professores');
  redirect('/escolinha/professores');
}
