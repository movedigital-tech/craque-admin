import { InstrutorShell } from '@/components/instrutor/InstrutorShell';
import { requireInstrutorContext } from '@/lib/tenant';

const ROLE_LABEL: Record<string, string> = {
  OWNER: 'Coordenador(a)',
  MANAGER: 'Coordenador(a)',
  TEACHER: 'Instrutor(a)',
  GUARDIAN: 'Responsável',
};

export default async function InstrutorRouteLayout({ children }: { children: React.ReactNode }) {
  const { user, membership, organization } = await requireInstrutorContext();
  const account = {
    name: user.name,
    email: user.email,
    role: ROLE_LABEL[membership.role] ?? membership.role,
    orgName: organization.name,
  };
  return <InstrutorShell account={account}>{children}</InstrutorShell>;
}
