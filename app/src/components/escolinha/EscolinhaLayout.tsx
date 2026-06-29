import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SidebarNav } from '../ds';
import { navFootItems, navItems } from '../../data/escolinha';
import { escolinhaPageMeta } from '../../data/escolinha/pageMeta';
import { EscolinhaTopBar } from './EscolinhaTopBar';

const SUB_ROUTE_PARENT: Record<string, string> = {
  '/escolinha/turmas/novo': 'turmas',
  '/escolinha/turmas/sub-9': 'turmas',
  '/escolinha/alunos/novo': 'alunos',
  '/escolinha/cobrancas/nova': 'cobrancas',
  '/escolinha/professores/novo': 'professores',
};

export function EscolinhaLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeNav = SUB_ROUTE_PARENT[location.pathname] ?? location.pathname.split('/')[2] ?? '';
  const meta = escolinhaPageMeta[location.pathname];

  const handleSelect = (key: string) => navigate(`/escolinha/${key}`);

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--surface-canvas)', overflow: 'hidden' }}>
      <SidebarNav brand="Craque" items={navItems} footerItems={navFootItems} activeKey={activeNav} onSelect={handleSelect} />
      <main style={{ flex: 1, overflowY: 'auto', padding: '34px 36px', display: 'flex', flexDirection: 'column' }}>
        <EscolinhaTopBar title={meta?.title ?? ''} subtitle={meta?.subtitle ?? ''} />
        <Outlet />
      </main>
    </div>
  );
}
