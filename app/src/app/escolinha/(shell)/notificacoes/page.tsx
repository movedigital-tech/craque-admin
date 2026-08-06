"use client";

import { useState } from 'react';
import { Button, Card, Icon } from '@/components/ds';
import { topBarNotifications } from '@/data/escolinha';

export default function EscolinhaNotificacoesPage() {
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const markAllRead = () => {
    setReadIds(new Set(topBarNotifications.map((_, i) => i)));
  };

  const unreadCount = topBarNotifications.filter((_, i) => !readIds.has(i)).length;

  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
          {unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? 's' : ''}` : 'Tudo em dia'}
        </div>
        <Button variant="secondary" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
          Marcar todas como lidas
        </Button>
      </div>
      {topBarNotifications.map((n, i) => {
        const unread = n.unread && !readIds.has(i);
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 14,
              padding: '16px 24px',
              borderTop: '1px solid var(--border-subtle)',
              background: unread ? 'var(--surface-subtle)' : 'transparent',
            }}
          >
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'var(--surface-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon name={n.icon} size={17} style={{ color: n.color }} />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 'var(--fs-body)', fontWeight: unread ? 'var(--fw-semibold)' : 'var(--fw-medium)' }}>{n.title}</div>
              <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>{n.sub}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{n.time}</div>
            </div>
            {unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 6 }} />}
          </div>
        );
      })}
    </Card>
  );
}
