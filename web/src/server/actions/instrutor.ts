"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { requireInstrutorContext } from '@/lib/tenant';
import type { AttendanceStatus } from '@/generated/prisma/client';

export async function generateInstrutorSession(classGroupId: string) {
  const { organization } = await requireInstrutorContext();

  const classGroup = await db.classGroup.findFirst({ where: { id: classGroupId, organizationId: organization.id } });
  if (!classGroup) throw new Error('Turma não encontrada');

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  let session = await db.classSession.findFirst({ where: { classGroupId, date: { gte: startOfToday, lt: startOfTomorrow } } });
  if (!session) {
    session = await db.classSession.create({
      data: { classGroupId, date: startOfToday, startTime: classGroup.startTime, endTime: classGroup.endTime },
    });
  }

  redirect(`/instrutor/chamada/${session.id}`);
}

export async function markInstrutorAttendance(sessionId: string, classGroupId: string, formData: FormData) {
  const { organization, membership } = await requireInstrutorContext();

  const session = await db.classSession.findFirst({
    where: { id: sessionId, classGroup: { organizationId: organization.id } },
  });
  if (!session) throw new Error('Sessão não encontrada');

  const enrollments = await db.enrollment.findMany({ where: { classGroupId: session.classGroupId, status: 'ACTIVE' } });

  for (const enrollment of enrollments) {
    const status = formData.get(`status-${enrollment.studentId}`) as AttendanceStatus | null;
    if (!status) continue;

    await db.attendance.upsert({
      where: { classSessionId_studentId: { classSessionId: sessionId, studentId: enrollment.studentId } },
      update: { status, markedByMembershipId: membership.id, markedAt: new Date() },
      create: { classSessionId: sessionId, studentId: enrollment.studentId, status, markedByMembershipId: membership.id },
    });
  }

  revalidatePath(`/instrutor/turmas/${classGroupId}`);
  redirect(`/instrutor/turmas/${classGroupId}`);
}
