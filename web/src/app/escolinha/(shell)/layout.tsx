import { EscolinhaShell } from '@/components/escolinha/EscolinhaShell';
import { requireOrgContext } from '@/lib/tenant';

export default async function EscolinhaRouteLayout({ children }: { children: React.ReactNode }) {
  await requireOrgContext();
  return <EscolinhaShell>{children}</EscolinhaShell>;
}
