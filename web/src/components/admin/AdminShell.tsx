"use client";

import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarNav } from '../ds';
import { navFootItems, navItems } from '../../data/admin';
import { pageMeta } from '../../data/admin/pageMeta';
import { AdminTopBar } from './AdminTopBar';

const SUB_ROUTE_PARENT: Record<string, string> = {
  '/usuarios/convidar': 'usuarios',
};

export interface AdminAccount {
  name: string;
  role: string;
}

export function AdminShell({ children, account }: { children: ReactNode; account: AdminAccount }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeNav = SUB_ROUTE_PARENT[pathname] ?? pathname.split('/')[1] ?? '';
  const meta = pageMeta[pathname];

  const handleSelect = (key: string) => router.push(`/${key}`);

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--surface-canvas)', overflow: 'hidden' }}>
      <SidebarNav brand="Craque" items={navItems} footerItems={navFootItems} activeKey={activeNav} onSelect={handleSelect} />
      <main style={{ flex: 1, overflowY: 'auto', padding: '34px 36px', display: 'flex', flexDirection: 'column' }}>
        <AdminTopBar title={meta?.title ?? ''} subtitle={meta?.subtitle ?? ''} account={account} />
        {children}
      </main>
    </div>
  );
}
