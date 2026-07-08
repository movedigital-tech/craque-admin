import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { scheduleLabel } from '@/lib/schedule';
import { TurmasGrid } from '@/components/escolinha/TurmasGrid';

export default async function EscolinhaTurmasPage() {
  const { organization } = await requireOrgContext();

  const classGroups = await db.classGroup.findMany({
    where: { organizationId: organization.id },
    include: {
      schoolUnit: true,
      teacher: { include: { user: true } },
      _count: { select: { enrollments: { where: { status: 'ACTIVE' } } } },
    },
    orderBy: { name: 'asc' },
  });

  const turmas = classGroups.map((t) => ({
    id: t.id,
    nome: t.name,
    cat: t.ageRange ?? '—',
    agenda: scheduleLabel(t.weekday, t.startTime, t.endTime),
    local: t.schoolUnit.name,
    prof: t.teacher?.user.name ?? 'Sem professor',
    alunos: t._count.enrollments,
    vagas: t.capacity,
  }));

  return <TurmasGrid turmas={turmas} />;
}
