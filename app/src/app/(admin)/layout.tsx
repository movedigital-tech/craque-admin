import { AdminShell } from '@/components/admin/AdminShell';
import { requireStaffContext } from '@/lib/tenant';

export default async function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireStaffContext();
  return <AdminShell account={{ name: user.name, role: user.platformRole ?? 'Staff' }}>{children}</AdminShell>;
}
