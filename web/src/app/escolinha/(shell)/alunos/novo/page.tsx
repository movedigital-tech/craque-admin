import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { AlunoForm } from '@/components/escolinha/AlunoForm';

export default async function EscolinhaAlunoCadastroPage({ searchParams }: { searchParams: Promise<{ turma?: string }> }) {
  const { organization } = await requireOrgContext(['OWNER', 'MANAGER']);
  const { turma } = await searchParams;

  const classGroups = await db.classGroup.findMany({ where: { organizationId: organization.id }, orderBy: { name: 'asc' } });

  return <AlunoForm turmas={classGroups.map((c) => ({ id: c.id, name: c.name }))} defaultTurmaId={turma} />;
}
