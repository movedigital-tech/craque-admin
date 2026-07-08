"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Badge, Button, Card } from '@/components/ds';
import { responsaveis } from '@/data/escolinha';

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

const chips: [string, string][] = [
  ['all', 'Todos · 124'],
  ['completo', 'Cadastro completo'],
  ['pendente', 'Convite pendente'],
];

export default function EscolinhaResponsaveisPage() {
  const router = useRouter();
  const [chip, setChip] = useState('all');
  const [hov, setHov] = useState<number | null>(null);

  const list = responsaveis.filter((r) => chip === 'all' || r.st === chip);

  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 24px 0', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {chips.map(([v, l]) => (
            <button
              key={v}
              onClick={() => setChip(v)}
              style={{
                border: `1px solid ${chip === v ? 'var(--navy-900)' : 'var(--border-default)'}`,
                background: chip === v ? 'var(--navy-900)' : 'var(--surface-card)',
                color: chip === v ? 'var(--white)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-pill)',
                padding: '7px 15px',
                fontSize: 'var(--fs-sm)',
                fontWeight: 'var(--fw-medium)',
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <Button variant="primary" size="sm" leadingIcon="user-plus" onClick={() => router.push('/escolinha/alunos/novo')}>
          Convidar responsável
        </Button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 14 }}>
        <thead>
          <tr>
            {['Responsável', 'Alunos vinculados', 'Contato', 'Cadastro', ''].map((h) => (
              <th key={h} style={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((r, i) => (
            <tr key={i} style={{ background: hov === i ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s' }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
              <td style={td}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={r.name} size={34} />
                  <div>
                    <div style={{ fontWeight: 'var(--fw-semibold)' }}>{r.name}</div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{r.email}</div>
                  </div>
                </div>
              </td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.alunos}</td>
              <td style={{ ...td, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>{r.tel}</td>
              <td style={td}>
                {r.st === 'completo' ? (
                  <Badge tone="success" dot>
                    Completo
                  </Badge>
                ) : (
                  <Badge tone="warning" dot>
                    Convite pendente
                  </Badge>
                )}
              </td>
              <td style={{ ...td, textAlign: 'right' }}>
                <Button variant="ghost" size="sm">
                  {r.act}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: 8 }} />
    </Card>
  );
}
