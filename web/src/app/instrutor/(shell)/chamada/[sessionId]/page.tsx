import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { requireInstrutorContext } from '@/lib/tenant';
import { ageFromBirthDate } from '@/lib/schedule';
import { InstrutorChamadaForm } from '@/components/instrutor/InstrutorChamadaForm';

export default async function InstrutorChamadaSessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  const { organization } = await requireInstrutorContext();

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

  return (
    <div>
      <Link
        href={`/instrutor/turmas/${session.classGroupId}`}
        style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 16 }}
      >
        <span style={{ fontSize: 18 }}>←</span>
        {session.classGroup.name}
      </Link>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 20 }}>Chamada</div>
        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>
          {session.classGroup.name} · {session.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      <InstrutorChamadaForm
        sessionId={session.id}
        classGroupId={session.classGroupId}
        rows={rows}
      />
    </div>
  );
}
