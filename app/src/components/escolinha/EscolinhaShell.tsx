"use client";

import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarNav } from '../ds';
import { navFootItems, navItems } from '../../data/escolinha';
import { escolinhaPageMeta } from '../../data/escolinha/pageMeta';
import { EscolinhaTopBar, type EscolinhaAccount } from './EscolinhaTopBar';

function resolveMeta(pathname: string, firstName: string) {
  if (pathname === '/escolinha/home') {
    return { title: 'Resumo da escolinha', subtitle: `Olá, ${firstName} 👋 — aqui está a visão geral.` };
  }
  if (escolinhaPageMeta[pathname]) return escolinhaPageMeta[pathname];
  if (/^\/escolinha\/turmas\/[^/]+$/.test(pathname)) return { title: 'Detalhe da turma', subtitle: '' };
  if (pathname.includes('/chamada')) return { title: 'Chamada', subtitle: '' };
  return undefined;
}

export function EscolinhaShell({ children, account }: { children: ReactNode; account: EscolinhaAccount }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeNav = pathname.split('/')[2] ?? '';
  const meta = resolveMeta(pathname, account.name.split(' ')[0]);

  const handleSelect = (key: string) => router.push(`/escolinha/${key}`);

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--surface-canvas)', overflow: 'hidden' }}>
      <SidebarNav brand="Craque" items={navItems} footerItems={navFootItems} activeKey={activeNav} onSelect={handleSelect} />
      <main style={{ flex: 1, overflowY: 'auto', padding: '34px 36px', display: 'flex', flexDirection: 'column' }}>
        <EscolinhaTopBar title={meta?.title ?? ''} subtitle={meta?.subtitle ?? ''} account={account} />
        {children}
      </main>
    </div>
  );
}
