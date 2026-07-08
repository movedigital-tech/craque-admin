import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { ProfessoresTable } from '@/components/escolinha/ProfessoresTable';

const ROLE_LABEL: Record<string, string> = {
  OWNER: 'Coordenador(a)',
  MANAGER: 'Coordenador(a)',
  TEACHER: 'Professor(a)',
};

export default async function EscolinhaProfessoresPage() {
  const { organization } = await requireOrgContext();

  const memberships = await db.membership.findMany({
    where: { organizationId: organization.id, role: { in: ['OWNER', 'MANAGER', 'TEACHER'] } },
    include: { user: true, teachingClasses: true },
    orderBy: { createdAt: 'asc' },
  });

  const professores = memberships.map((m) => ({
    id: m.id,
    name: m.user.name,
    email: m.user.email,
    fn: ROLE_LABEL[m.role] ?? m.role,
    turmas: m.teachingClasses.map((c) => c.name).join(', '),
    active: m.status === 'ACTIVE',
  }));

  return <ProfessoresTable professores={professores} />;
}
