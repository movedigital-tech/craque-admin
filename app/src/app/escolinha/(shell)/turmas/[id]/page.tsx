import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Avatar, Badge, Button, Card, Icon } from '@/components/ds';
import { InfoNote } from '@/components/escolinha/InfoNote';
import { TurmaRoster } from '@/components/escolinha/TurmaRoster';
import { MatricularAlunoForm } from '@/components/escolinha/MatricularAlunoForm';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { scheduleLabel } from '@/lib/schedule';
import { ageFromBirthDate } from '@/lib/schedule';
import { presencaPercent } from '@/lib/attendance';

export default async function EscolinhaTurmaDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { organization, membership } = await requireOrgContext();

  const classGroup = await db.classGroup.findFirst({
    where: { id, organizationId: organization.id },
    include: { schoolUnit: true, teacher: { include: { user: true } } },
  });
  if (!classGroup) notFound();

  const enrollments = await db.enrollment.findMany({
    where: { classGroupId: id, status: 'ACTIVE' },
    include: {
      student: {
        include: {
          guardians: { include: { membership: { include: { user: true } } }, take: 1 },
          attendances: { include: { session: true } },
        },
      },
    },
    orderBy: { enrolledAt: 'asc' },
  });

  const rows = enrollments.map((e) => {
    const relevant = e.student.attendances.filter((a) => a.session.classGroupId === id);
    const present = relevant.filter((a) => a.status === 'PRESENT').length;
    const { pct, ok } = presencaPercent(present, relevant.length);
    return {
      enrollmentId: e.id,
      studentId: e.studentId,
      name: e.student.name,
      idade: ageFromBirthDate(e.student.birthDate),
      resp: e.student.guardians[0]?.membership.user.name ?? '—',
      pre: pct,
      ok,
    };
  });

  const allAttendances = enrollments.flatMap((e) => e.student.attendances.filter((a) => a.session.classGroupId === id));
  const presentTotal = allAttendances.filter((a) => a.status === 'PRESENT').length;
  const media = presencaPercent(presentTotal, allAttendances.length);

  const cheia = enrollments.length >= classGroup.capacity;

  const canEdit = ['OWNER', 'MANAGER'].includes(membership.role);

  // Alunos da org que ainda NÃO estão ativos nesta turma
  const enrolledStudentIds = new Set(enrollments.map((e) => e.studentId));
  const alunosDisponiveis = canEdit
    ? (await db.student.findMany({
        where: { organizationId: organization.id, status: 'ACTIVE' },
        orderBy: { name: 'asc' },
      })).filter((s) => !enrolledStudentIds.has(s.id))
    : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Link
        href="/escolinha/turmas"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}
      >
        <Icon name="arrow-left" size={15} />
        Turmas <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span> <strong style={{ color: 'var(--text-primary)' }}>{classGroup.name}</strong>
      </Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {cheia ? <Badge tone="warning" dot>Lotada</Badge> : <Badge tone="success" dot>Aberta</Badge>}
          <Badge tone="neutral">{classGroup.ageRange ?? '—'}</Badge>
        </div>
        {canEdit && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Link href={`/escolinha/turmas/${id}/editar`}>
              <Button variant="secondary" size="sm" leadingIcon="pencil">Editar turma</Button>
            </Link>
            <MatricularAlunoForm classGroupId={id} alunosDisponiveis={alunosDisponiveis} />
          </div>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 14px' }}>
            <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', fontFamily: 'var(--font-ui)' }}>Alunos inscritos · {enrollments.length}</h3>
          </div>
          <TurmaRoster rows={rows} classGroupId={classGroup.id} />
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Informações" padding={24}>
            {([
              ['Categoria', classGroup.ageRange ?? '—'],
              ['Agenda', scheduleLabel(classGroup.weekdays, classGroup.startTime, classGroup.endTime)],
              ['Local', classGroup.schoolUnit.name],
            ] as [string, string][]).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Professor</span>
              <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Avatar name={classGroup.teacher?.user.name ?? '—'} size={24} />
                <strong>{classGroup.teacher?.user.name ?? 'Sem professor'}</strong>
              </span>
            </div>
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '10px 0 14px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Capacidade</span>
              <span style={{ fontWeight: 'var(--fw-bold)' }}>{enrollments.length} / {classGroup.capacity}</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: 'var(--surface-muted)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, (enrollments.length / (classGroup.capacity || 1)) * 100)}%`, background: cheia ? 'var(--warning)' : 'var(--accent)', borderRadius: 99 }} />
            </div>
            {cheia && <div style={{ marginTop: 10 }}><Badge tone="warning" dot>Turma lotada</Badge></div>}
          </Card>
          <Card padding={24}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Presença média</span>
              <span style={{ fontWeight: 'var(--fw-bold)' }}>{media.pct}</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: 'var(--surface-muted)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: media.pct === '—' ? '0%' : media.pct, background: 'var(--accent)', borderRadius: 99 }} />
            </div>
          </Card>
          <InfoNote>
            Alunos podem estar em <strong>mais de uma turma</strong>. Remover daqui não exclui o cadastro do aluno.
          </InfoNote>
        </div>
      </div>
    </div>
  );
}
