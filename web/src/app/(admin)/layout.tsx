import { AdminShell } from '@/components/admin/AdminShell';
import { requireStaffContext } from '@/lib/tenant';

export default async function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  await requireStaffContext();
  return <AdminShell>{children}</AdminShell>;
}
