import { EscolinhaShell } from '@/components/escolinha/EscolinhaShell';
import { requireOrgContext } from '@/lib/tenant';

const ROLE_LABEL: Record<string, string> = {
  OWNER: 'Coordenador(a)',
  MANAGER: 'Coordenador(a)',
  TEACHER: 'Professor(a)',
  GUARDIAN: 'Responsável',
};

export default async function EscolinhaRouteLayout({ children }: { children: React.ReactNode }) {
  const { user, membership, organization } = await requireOrgContext();
  const account = { name: user.name, role: ROLE_LABEL[membership.role] ?? membership.role, orgName: organization.name };
  return <EscolinhaShell account={account}>{children}</EscolinhaShell>;
}
