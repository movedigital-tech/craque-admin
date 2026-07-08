"use client";

import { signOut } from 'next-auth/react';
import { Icon } from '../ds';

export function InstrutorSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/instrutor/login' })}
      style={{
        width: '100%',
        height: 52,
        borderRadius: 14,
        background: 'var(--surface-card)',
        color: 'var(--danger)',
        border: '1px solid var(--border-default)',
        fontFamily: 'var(--font-ui)',
        fontSize: 16,
        fontWeight: 'var(--fw-bold)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <Icon name="log-out" size={18} style={{ color: 'var(--danger)' }} />
      Sair
    </button>
  );
}
