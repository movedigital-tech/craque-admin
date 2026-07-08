"use client";

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '../ds';

const TABS = [
  { key: 'home', label: 'Início', icon: 'layout-dashboard' as const, href: '/instrutor/home' },
  { key: 'chamada', label: 'Chamada', icon: 'clipboard-check' as const, href: '/instrutor/chamada' },
  { key: 'perfil', label: 'Perfil', icon: 'user' as const, href: '/instrutor/perfil' },
] as const;

export interface InstrutorAccount {
  name: string;
  email: string;
  orgName: string;
  role: string;
}

function activeTab(pathname: string): string {
  if (pathname.startsWith('/instrutor/chamada')) return 'chamada';
  if (pathname.startsWith('/instrutor/perfil')) return 'perfil';
  return 'home';
}

export function InstrutorShell({ children, account }: { children: ReactNode; account: InstrutorAccount }) {
  const pathname = usePathname();
  const active = activeTab(pathname);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        background: 'var(--surface-canvas)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface-canvas)',
          position: 'relative',
        }}
      >
        {/* Content area with bottom padding for tab bar */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 90px' }}>
          {children}
        </main>

        {/* Bottom tab bar */}
        <nav
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 480,
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--surface-card)',
            padding: '8px 10px 24px',
            gap: 4,
            zIndex: 50,
          }}
        >
          {TABS.map(({ key, label, icon, href }) => {
            const on = active === key;
            return (
              <Link
                key={key}
                href={href}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  color: on ? 'var(--success)' : 'var(--gray-500)',
                  textDecoration: 'none',
                  fontSize: 11,
                  fontWeight: 'var(--fw-bold)',
                  fontFamily: 'var(--font-ui)',
                  padding: '4px 0',
                }}
              >
                <Icon name={icon} size={22} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
