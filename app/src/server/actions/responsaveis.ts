"use server";

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { createInvitationToken } from '@/lib/email/tokens';
import { emailProvider } from '@/lib/email/resend-provider';
import { guardianInviteEmailTemplate } from '@/lib/email/templates';

export interface UpdateGuardianDetailsInput {
  membershipId: string;
  addressLine: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  internalNote: string;
}

export async function updateGuardianDetails(input: UpdateGuardianDetailsInput): Promise<void> {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const membership = await db.membership.findFirst({
    where: { id: input.membershipId, organizationId: organization.id, role: 'GUARDIAN' },
  });
  if (!membership) throw new Error('Responsável não encontrado');

  await db.$transaction([
    db.user.update({
      where: { id: membership.userId },
      data: {
        addressLine: input.addressLine.trim() || null,
        addressCity: input.addressCity.trim() || null,
        addressState: input.addressState.trim() || null,
        addressZip: input.addressZip.trim() || null,
      },
    }),
    db.membership.update({
      where: { id: membership.id },
      data: { internalNote: input.internalNote.trim() || null },
    }),
  ]);

  revalidatePath('/escolinha/responsaveis');
}

export async function resendGuardianInvite(membershipId: string): Promise<void> {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const membership = await db.membership.findFirst({
    where: { id: membershipId, organizationId: organization.id, role: 'GUARDIAN' },
    include: { user: true, guardianStudents: { include: { student: true } } },
  });
  if (!membership) throw new Error('Responsável não encontrado');
  if (membership.status === 'ACTIVE') throw new Error('Este responsável já concluiu o cadastro');

  const studentName = membership.guardianStudents[0]?.student.name ?? organization.name;

  const token = await db.$transaction((tx) =>
    createInvitationToken(tx, { userId: membership.userId, type: 'GUARDIAN_INVITE', membershipId: membership.id }),
  );
  const acceptUrl = `${process.env.APP_BASE_URL}/aceitar-convite?token=${token}`;
  await emailProvider.send({
    to: membership.user.email,
    ...guardianInviteEmailTemplate({ guardianName: membership.user.name, studentName, orgName: organization.name, acceptUrl }),
  });

  revalidatePath('/escolinha/responsaveis');
}
