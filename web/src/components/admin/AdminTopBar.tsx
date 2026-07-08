"use client";

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Avatar, Icon, IconButton } from '../ds';
import { account, topBarNotifications } from '../../data/admin';

export interface AdminTopBarProps {
  title: string;
  subtitle?: string;
}

const dropStyle = (right: number, width: number): CSSProperties => ({
  position: 'absolute',
  top: 'calc(100% + 10px)',
  right,
  width,
  background: 'var(--surface-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-lg)',
  zIndex: 1000,
  overflow: 'hidden',
});

const userMenuItems: [string, string, string | null][] = [
  ['user', 'Meu perfil', null],
  ['settings', 'Configurações', '/config'],
  ['life-buoy', 'Suporte', null],
];

export function AdminTopBar({ title, subtitle }: AdminTopBarProps) {
  const router = useRouter();
  const [showN, setShowN] = useState(false);
  const [showU, setShowU] = useState(false);
  const nRef = useRef<HTMLDivElement>(null);
  const uRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (nRef.current && !nRef.current.contains(e.target as Node)) setShowN(false);
      if (uRef.current && !uRef.current.contains(e.target as Node)) setShowU(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const unreadCount = topBarNotifications.filter((n) => n.unread).length;

  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, paddingBottom: 28 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            height: 44,
            padding: '0 16px',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            width: 230,
          }}
        >
          <Icon name="search" size={17} style={{ color: 'var(--gray-500)', flexShrink: 0 }} />
          <input
            placeholder="Buscar organização…"
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              flex: 1,
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--fs-sm)',
              color: 'var(--text-primary)',
              minWidth: 0,
            }}
          />
        </div>

        <div ref={nRef} style={{ position: 'relative' }}>
          <div
            onClick={() => {
              setShowN(!showN);
              setShowU(false);
            }}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <IconButton icon="bell" variant="outline" ariaLabel="Notificações" />
            <span
              style={{
                position: 'absolute',
                top: 7,
                right: 7,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--danger)',
                border: '2px solid var(--surface-canvas)',
              }}
            />
          </div>
          {showN && (
            <div style={dropStyle(0, 360)}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px 12px',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-body)' }}>Notificações</span>
                  <span style={{ background: 'var(--danger)', color: '#fff', borderRadius: 99, fontSize: 11, fontWeight: 700, padding: '1px 7px' }}>
                    {unreadCount}
                  </span>
                </div>
                <button
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 'var(--fs-xs)',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  Marcar como lidas
                </button>
              </div>
              {topBarNotifications.map((n, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 12,
                    padding: '13px 20px',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: n.unread ? 'var(--surface-subtle)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'var(--surface-muted)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={n.icon} size={15} style={{ color: n.color }} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--fs-sm)', fontWeight: n.unread ? 'var(--fw-semibold)' : 'var(--fw-medium)', lineHeight: 1.3 }}>
                      {n.title}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--fs-xs)',
                        color: 'var(--text-secondary)',
                        marginTop: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {n.sub}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 3 }}>{n.time}</div>
                  </div>
                  {n.unread && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 5 }} />}
                </div>
              ))}
              <div style={{ padding: '10px 20px', textAlign: 'center' }}>
                <button
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 'var(--fs-sm)',
                    color: 'var(--text-link)',
                    fontWeight: 'var(--fw-semibold)',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  Ver todas as notificações
                </button>
              </div>
            </div>
          )}
        </div>

        <div ref={uRef} style={{ position: 'relative' }}>
          <div
            onClick={() => {
              setShowU(!showU);
              setShowN(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              height: 44,
              padding: '0 12px 0 6px',
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
            }}
          >
            <Avatar name={account.name} size={32} />
            <div>
              <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', lineHeight: 1.2 }}>{account.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.1 }}>{account.role}</div>
            </div>
            <Icon name="chevron-down" size={14} style={{ color: 'var(--gray-500)', marginLeft: 2 }} />
          </div>
          {showU && (
            <div style={dropStyle(0, 230)}>
              <div style={{ padding: '14px 18px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-body)' }}>{account.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{account.role} · Craque</div>
              </div>
              {userMenuItems.map(([ico, lbl, go]) => (
                <button
                  key={lbl}
                  onClick={() => {
                    setShowU(false);
                    if (go) router.push(go);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    width: '100%',
                    padding: '11px 18px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 'var(--fs-body)',
                    color: 'var(--text-primary)',
                    textAlign: 'left',
                  }}
                >
                  <Icon name={ico} size={16} style={{ color: 'var(--gray-500)' }} />
                  {lbl}
                </button>
              ))}
              <div style={{ height: 1, background: 'var(--border-subtle)', margin: '3px 0' }} />
              <button
                onClick={() => {
                  setShowU(false);
                  signOut({ callbackUrl: '/login' });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 11,
                  width: '100%',
                  padding: '11px 18px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'var(--fs-body)',
                  color: 'var(--danger)',
                  textAlign: 'left',
                }}
              >
                <Icon name="log-out" size={16} style={{ color: 'var(--danger)' }} />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
