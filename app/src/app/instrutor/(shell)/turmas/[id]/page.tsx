import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import { requireInstrutorContext } from '@/lib/tenant';
import { ageFromBirthDate, scheduleLabel } from '@/lib/schedule';
import { Avatar, Badge, Icon } from '@/components/ds';
import { TurmaSegmented } from '@/components/instrutor/TurmaSegmented';
import { generateInstrutorSession } from '@/server/actions/instrutor';

export default async function InstrutorTurmaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { membership, organization } = await requireInstrutorContext();

  const turma = await db.classGroup.findFirst({
    where: { id, organizationId: organization.id },
    include: {
      _count: { select: { enrollments: { where: { status: 'ACTIVE' } } } },
    },
  });
  if (!turma) notFound();

  const enrollments = await db.enrollment.findMany({
    where: { classGroupId: id, status: 'ACTIVE' },
    include: { student: true },
    orderBy: { enrolledAt: 'asc' },
  });

  const sessions = await db.classSession.findMany({
    where: { classGroupId: id },
    include: { attendances: true },
    orderBy: { date: 'desc' },
    take: 10,
  });

  const totalEnrolled = enrollments.length;

  const alunos = enrollments.map((e) => ({
    studentId: e.studentId,
    name: e.student.name,
    idade: ageFromBirthDate(e.student.birthDate),
  }));

  const chamadas = sessions.map((s) => {
    const presentes = s.attendances.filter((a) => a.status === 'PRESENT').length;
    const total = s.attendances.length || totalEnrolled;
    const pct = total > 0 ? Math.round((presentes / total) * 100) : null;
    const tone: 'neutral' | 'success' | 'warning' | 'danger' = pct === null ? 'neutral' : pct >= 80 ? 'success' : pct >= 60 ? 'warning' : 'danger';
    return {
      id: s.id,
      date: s.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      presentes,
      total,
      tone,
    };
  });

  const horario = scheduleLabel(turma.weekdays, turma.startTime, turma.endTime);

  return (
    <div>
      {/* Back */}
      <Link href="/instrutor/turmas" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: 16 }}>
        <Icon name="arrow-left" size={15} />
        Minhas turmas
      </Link>

      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 22 }}>{turma.name}</div>
        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>{turma.ageRange}</div>
      </div>

      {/* Mini stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <div style={{ flex: 1, background: 'var(--surface-muted)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
          <Icon name="users" size={22} style={{ color: 'var(--text-primary)', display: 'block', margin: '0 auto 6px' }} />
          <div style={{ fontSize: 24, fontWeight: 'var(--fw-bold)', color: 'var(--text-primary)', lineHeight: 1 }}>{totalEnrolled}</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>Alunos</div>
        </div>
        <div style={{ flex: 1, background: 'var(--accent-tint)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
          <Icon name="calendar-check" size={22} style={{ color: 'var(--success)', display: 'block', margin: '0 auto 6px' }} />
          <div style={{ fontSize: 24, fontWeight: 'var(--fw-bold)', color: 'var(--success)', lineHeight: 1 }}>{sessions.length}</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>Chamadas</div>
        </div>
        <div style={{ flex: 1, background: 'var(--warning-tint)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
          <Icon name="clock" size={22} style={{ color: 'var(--warning)', display: 'block', margin: '0 auto 6px' }} />
          <div style={{ fontSize: 14, fontWeight: 'var(--fw-bold)', color: 'var(--warning)', lineHeight: 1, marginTop: 4 }}>{turma.startTime ?? '—'}</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>Horário</div>
        </div>
      </div>

      {/* Segmented content */}
      <TurmaSegmented
        alunos={alunos}
        chamadas={chamadas}
        horario={{ dias: horario, startTime: turma.startTime, endTime: turma.endTime, ageRange: turma.ageRange, capacity: turma.capacity }}
        turmaId={id}
        generateSession={generateInstrutorSession}
      />
    </div>
  );
}
