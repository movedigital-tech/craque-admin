import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { TurmaForm } from '@/components/escolinha/TurmaForm';

export default async function EscolinhaTurmaCadastroPage() {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);

  const memberships = await db.membership.findMany({
    where: { organizationId: organization.id, role: { in: ['TEACHER', 'MANAGER', 'OWNER'] }, status: 'ACTIVE' },
    include: { user: true },
    orderBy: { createdAt: 'asc' },
  });

  const professores = memberships.map((m) => ({ id: m.id, name: m.user.name }));

  return <TurmaForm professores={professores} />;
}
