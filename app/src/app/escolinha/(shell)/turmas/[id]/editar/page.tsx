import { notFound } from 'next/navigation';
import { TurmaForm } from '@/components/escolinha/TurmaForm';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';

export default async function EditarTurmaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const [classGroup, professores] = await Promise.all([
    db.classGroup.findFirst({ where: { id, organizationId: organization.id } }),
    db.membership.findMany({
      where: { organizationId: organization.id, role: { in: ['TEACHER', 'MANAGER', 'OWNER'] }, status: 'ACTIVE' },
      include: { user: true },
    }),
  ]);

  if (!classGroup) notFound();

  const profOptions = professores.map((m) => ({ id: m.id, name: m.user.name ?? m.user.email }));

  return (
    <TurmaForm
      professores={profOptions}
      initial={{
        id: classGroup.id,
        name: classGroup.name,
        ageRange: classGroup.ageRange,
        weekdays: classGroup.weekdays,
        startTime: classGroup.startTime,
        endTime: classGroup.endTime,
        capacity: classGroup.capacity,
        teacherMembershipId: classGroup.teacherMembershipId,
      }}
    />
  );
}
