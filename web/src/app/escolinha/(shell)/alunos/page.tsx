import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { ageFromBirthDate } from '@/lib/schedule';
import { presencaPercent } from '@/lib/attendance';
import { AlunosTable } from '@/components/escolinha/AlunosTable';

export default async function EscolinhaAlunosPage() {
  const { organization } = await requireOrgContext();

  const [students, classGroups] = await Promise.all([
    db.student.findMany({
      where: { organizationId: organization.id },
      include: {
        guardians: { include: { membership: { include: { user: true } } }, take: 1 },
        enrollments: { where: { status: { in: ['ACTIVE', 'PENDING'] } }, include: { classGroup: true }, take: 1 },
        attendances: { include: { session: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    db.classGroup.findMany({ where: { organizationId: organization.id }, orderBy: { name: 'asc' } }),
  ]);

  const alunos = students.map((s) => {
    const enrollment = s.enrollments[0];
    const present = s.attendances.filter((a) => a.status === 'PRESENT').length;
    const { pct, ok } = presencaPercent(present, s.attendances.length);
    const guardian = s.guardians[0]?.membership.user;
    return {
      id: s.id,
      name: s.name,
      idade: ageFromBirthDate(s.birthDate),
      turma: enrollment?.classGroup.name ?? 'Sem turma',
      resp: guardian?.name ?? '—',
      tel: guardian?.phone ?? '—',
      pre: pct,
      ok,
    };
  });

  return <AlunosTable alunos={alunos} turmaNames={classGroups.map((c) => c.name)} />;
}
