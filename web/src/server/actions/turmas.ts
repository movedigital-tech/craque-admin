"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';

export async function createClassGroup(formData: FormData) {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const name = String(formData.get('name') ?? '').trim();
  const ageRange = String(formData.get('ageRange') ?? '').trim() || null;
  const weekday = formData.get('weekday') ? Number(formData.get('weekday')) : null;
  const startTime = String(formData.get('startTime') ?? '').trim() || null;
  const endTime = String(formData.get('endTime') ?? '').trim() || null;
  const capacity = formData.get('capacity') ? Number(formData.get('capacity')) : 0;
  const teacherMembershipId = String(formData.get('teacherMembershipId') ?? '').trim() || null;

  if (!name) throw new Error('Nome da turma é obrigatório');

  const defaultUnit = await db.schoolUnit.findFirst({ where: { organizationId: organization.id, isDefault: true } });
  if (!defaultUnit) throw new Error('Unidade padrão não encontrada');

  await db.classGroup.create({
    data: {
      organizationId: organization.id,
      schoolUnitId: defaultUnit.id,
      name,
      ageRange,
      weekday,
      startTime,
      endTime,
      capacity,
      teacherMembershipId,
    },
  });

  revalidatePath('/escolinha/turmas');
  redirect('/escolinha/turmas');
}
