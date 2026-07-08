"use client";

import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarNav } from '../ds';
import { navFootItems, navItems } from '../../data/escolinha';
import { escolinhaPageMeta } from '../../data/escolinha/pageMeta';
import { EscolinhaTopBar } from './EscolinhaTopBar';

const SUB_ROUTE_PARENT: Record<string, string> = {
  '/escolinha/turmas/novo': 'turmas',
  '/escolinha/turmas/sub-9': 'turmas',
  '/escolinha/alunos/novo': 'alunos',
  '/escolinha/professores/novo': 'professores',
};

export function EscolinhaShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeNav = SUB_ROUTE_PARENT[pathname] ?? pathname.split('/')[2] ?? '';
  const meta = escolinhaPageMeta[pathname];

  const handleSelect = (key: string) => router.push(`/escolinha/${key}`);

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--surface-canvas)', overflow: 'hidden' }}>
      <SidebarNav brand="Craque" items={navItems} footerItems={navFootItems} activeKey={activeNav} onSelect={handleSelect} />
      <main style={{ flex: 1, overflowY: 'auto', padding: '34px 36px', display: 'flex', flexDirection: 'column' }}>
        <EscolinhaTopBar title={meta?.title ?? ''} subtitle={meta?.subtitle ?? ''} />
        {children}
      </main>
    </div>
  );
}
