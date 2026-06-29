import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SidebarNav } from '../ds';
import { navFootItems, navItems } from '../../data';
import { pageMeta } from '../../data/pageMeta';
import { AdminTopBar } from './AdminTopBar';

const SUB_ROUTE_PARENT: Record<string, string> = {
  '/escolinhas/novo': 'escolinhas',
  '/planos/novo': 'planos',
  '/usuarios/convidar': 'usuarios',
};

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeNav = SUB_ROUTE_PARENT[location.pathname] ?? location.pathname.split('/')[1] ?? '';
  const meta = pageMeta[location.pathname];

  const handleSelect = (key: string) => navigate(`/${key}`);

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--surface-canvas)', overflow: 'hidden' }}>
      <SidebarNav brand="Craque" items={navItems} footerItems={navFootItems} activeKey={activeNav} onSelect={handleSelect} />
      <main style={{ flex: 1, overflowY: 'auto', padding: '34px 36px', display: 'flex', flexDirection: 'column' }}>
        <AdminTopBar title={meta?.title ?? ''} subtitle={meta?.subtitle ?? ''} />
        <Outlet />
      </main>
    </div>
  );
}
