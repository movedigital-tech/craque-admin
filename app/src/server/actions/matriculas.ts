"use server";

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';

export async function enrollStudent(studentId: string, classGroupId: string) {
  await requireOrgContext(['OWNER', 'MANAGER']);

  const existing = await db.enrollment.findFirst({ where: { studentId, classGroupId, status: 'ACTIVE' } });
  if (existing) return;

  await db.enrollment.create({ data: { studentId, classGroupId, status: 'ACTIVE' } });
  revalidatePath(`/escolinha/turmas/${classGroupId}`);
  revalidatePath('/escolinha/alunos');
}

export async function unenrollStudent(enrollmentId: string, classGroupId: string) {
  await requireOrgContext(['OWNER', 'MANAGER']);

  await db.enrollment.update({ where: { id: enrollmentId }, data: { status: 'CANCELED', canceledAt: new Date() } });
  revalidatePath(`/escolinha/turmas/${classGroupId}`);
  revalidatePath('/escolinha/alunos');
}
