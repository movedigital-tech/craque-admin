"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Badge, Button, Card, Icon } from '../ds';
import { InfoNote } from './InfoNote';

const th: CSSProperties = {
  padding: '24px',
  textAlign: 'left',
  fontSize: 'var(--fs-xs)',
  fontWeight: 'var(--fw-semibold)',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  borderBottom: '1px solid var(--border-subtle)',
  whiteSpace: 'nowrap',
};

const td: CSSProperties = {
  padding: '14px 24px',
  fontSize: 'var(--fs-body)',
  borderBottom: '1px solid var(--gray-100)',
};

export interface ProfessorRow {
  id: string;
  name: string;
  email: string;
  fn: string;
  turmas: string;
  active: boolean;
}

export function ProfessoresTable({ professores }: { professores: ProfessorRow[] }) {
  const router = useRouter();
  const [tab, setTab] = useState('active');

  const activeCount = professores.filter((p) => p.active).length;
  const inviteCount = professores.length - activeCount;
  const list = professores.filter((p) => (tab === 'active' ? p.active : !p.active));

  const tabs: [string, string][] = [
    ['active', `Ativos · ${activeCount}`],
    ['invite', `Convites · ${inviteCount}`],
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '24px 24px 0', gap: 16 }}>
          <div style={{ display: 'inline-flex', gap: 4, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', padding: 4, marginBottom: 14 }}>
            {tabs.map(([v, l]) => (
              <button
                key={v}
                onClick={() => setTab(v)}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'var(--fs-sm)',
                  fontWeight: 'var(--fw-semibold)',
                  background: tab === v ? 'var(--surface-card)' : 'transparent',
                  color: tab === v ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: tab === v ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <div style={{ paddingBottom: 14 }}>
            <Button variant="primary" size="sm" leadingIcon="user-plus" onClick={() => router.push('/escolinha/professores/novo')}>
              Adicionar membro
            </Button>
          </div>
        </div>
        {list.length === 0 ? (
          <p style={{ padding: '20px 24px', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhum membro nesta lista ainda.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Membro', 'Função', 'Turmas', 'Status', ''].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id}>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={r.name} size={34} />
                      <div>
                        <div style={{ fontWeight: 'var(--fw-semibold)' }}>{r.name}</div>
                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={td}>
                    <Badge tone="neutral">{r.fn}</Badge>
                  </td>
                  <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.turmas || '—'}</td>
                  <td style={td}>
                    {r.active ? <Badge tone="success" dot>Ativo</Badge> : <Badge tone="warning" dot>Convite pendente</Badge>}
                  </td>
                  <td style={{ ...td, width: 40, textAlign: 'right' }}>
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <Icon name="more-horizontal" size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ height: 8 }} />
      </Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <InfoNote>
          Cada membro vê apenas as <strong>turmas atribuídas</strong> a ele no painel do professor.
        </InfoNote>
      </div>
    </div>
  );
}
