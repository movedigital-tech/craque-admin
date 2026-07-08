import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { ResponsaveisTable } from '@/components/escolinha/ResponsaveisTable';

export default async function EscolinhaResponsaveisPage() {
  const { organization } = await requireOrgContext();

  const memberships = await db.membership.findMany({
    where: { organizationId: organization.id, role: 'GUARDIAN' },
    include: { user: true, guardianStudents: { include: { student: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const responsaveis = memberships.map((m) => {
    const students = m.guardianStudents.map((g) => g.student.name);
    const alunos = students.length > 1 ? `${students[0]} · +${students.length - 1}` : students[0] ?? '—';
    return {
      id: m.id,
      name: m.user.name,
      email: m.user.email,
      alunos,
      tel: m.user.phone ?? '—',
      completo: m.status === 'ACTIVE',
    };
  });

  return <ResponsaveisTable responsaveis={responsaveis} />;
}
