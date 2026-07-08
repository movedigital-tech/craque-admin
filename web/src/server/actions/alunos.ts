"use server";

import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';

export async function createStudentWithGuardian(formData: FormData) {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const name = String(formData.get('name') ?? '').trim();
  const birthDateRaw = String(formData.get('birthDate') ?? '').trim();
  const classGroupId = String(formData.get('classGroupId') ?? '').trim() || null;
  const initialStatus = String(formData.get('initialStatus') ?? 'PENDING');
  const guardianName = String(formData.get('guardianName') ?? '').trim();
  const guardianPhone = String(formData.get('guardianPhone') ?? '').trim() || null;
  const guardianEmail = String(formData.get('guardianEmail') ?? '').trim().toLowerCase() || null;

  if (!name) throw new Error('Nome do aluno é obrigatório');

  const birthDate = birthDateRaw ? new Date(birthDateRaw) : null;

  const student = await db.student.create({
    data: { organizationId: organization.id, name, birthDate, status: 'ACTIVE' },
  });

  if (guardianEmail && guardianName) {
    let guardianUser = await db.user.findUnique({ where: { email: guardianEmail } });
    if (!guardianUser) {
      const passwordHash = await bcrypt.hash(randomUUID(), 10);
      guardianUser = await db.user.create({
        data: { name: guardianName, email: guardianEmail, phone: guardianPhone, passwordHash },
      });
    }

    let membership = await db.membership.findUnique({
      where: { userId_organizationId: { userId: guardianUser.id, organizationId: organization.id } },
    });
    if (!membership) {
      membership = await db.membership.create({
        data: { userId: guardianUser.id, organizationId: organization.id, role: 'GUARDIAN', status: 'INVITED' },
      });
    }

    await db.studentGuardian.create({ data: { studentId: student.id, membershipId: membership.id, isPrimary: true } });
  }

  if (classGroupId) {
    await db.enrollment.create({
      data: { studentId: student.id, classGroupId, status: initialStatus === 'ACTIVE' ? 'ACTIVE' : 'PENDING' },
    });
  }

  revalidatePath('/escolinha/alunos');
  revalidatePath('/escolinha/responsaveis');
  if (classGroupId) revalidatePath(`/escolinha/turmas/${classGroupId}`);
  redirect('/escolinha/alunos');
}
