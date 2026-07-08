import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { ageFromBirthDate } from '@/lib/schedule';
import { ChamadaForm } from '@/components/escolinha/ChamadaForm';

export default async function ChamadaPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER', 'TEACHER']);

  const session = await db.classSession.findFirst({
    where: { id: sessionId, classGroup: { organizationId: organization.id } },
    include: { classGroup: true, attendances: true },
  });
  if (!session) notFound();

  const enrollments = await db.enrollment.findMany({
    where: { classGroupId: session.classGroupId, status: 'ACTIVE' },
    include: { student: true },
    orderBy: { enrolledAt: 'asc' },
  });

  const rows = enrollments.map((e) => {
    const existing = session.attendances.find((a) => a.studentId === e.studentId);
    return {
      studentId: e.studentId,
      name: e.student.name,
      idade: ageFromBirthDate(e.student.birthDate),
      currentStatus: existing?.status ?? null,
    };
  });

  return <ChamadaForm sessionId={session.id} rows={rows} turmaLabel={session.classGroup.name} />;
}
