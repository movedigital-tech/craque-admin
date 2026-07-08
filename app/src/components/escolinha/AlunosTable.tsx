"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Badge, Button, Card, Icon } from '../ds';
import { Presenca } from './Presenca';

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

export interface AlunoRow {
  id: string;
  name: string;
  idade: string;
  turma: string;
  resp: string;
  tel: string;
  pre: string;
  ok: boolean;
}

export function AlunosTable({ alunos, turmaNames }: { alunos: AlunoRow[]; turmaNames: string[] }) {
  const router = useRouter();
  const [chip, setChip] = useState('all');
  const [hov, setHov] = useState<string | null>(null);

  const chips: [string, string][] = [['all', `Todos · ${alunos.length}`], ...turmaNames.map((t): [string, string] => [t, t])];
  const list = chip === 'all' ? alunos : alunos.filter((r) => r.turma === chip);

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
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <Button variant="primary" size="sm" leadingIcon="user-plus" onClick={() => router.push('/escolinha/alunos/novo')}>
            Nova matrícula
          </Button>
        </div>
      </div>
      {list.length === 0 ? (
        <p style={{ padding: '20px 24px', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhum aluno cadastrado ainda.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 14 }}>
          <thead>
            <tr>
              {['Aluno', 'Turma', 'Responsável', 'Presença', ''].map((h) => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} style={{ background: hov === r.id ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s' }} onMouseEnter={() => setHov(r.id)} onMouseLeave={() => setHov(null)}>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={r.name} size={34} />
                    <div>
                      <div style={{ fontWeight: 'var(--fw-semibold)' }}>{r.name}</div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{r.idade}</div>
                    </div>
                  </div>
                </td>
                <td style={td}>
                  <Badge tone="neutral">{r.turma}</Badge>
                </td>
                <td style={td}>
                  <div style={{ fontSize: 'var(--fs-sm)' }}>{r.resp}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{r.tel}</div>
                </td>
                <td style={td}>
                  <Presenca pct={r.pre} ok={r.ok} />
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
      <div style={{ height: 12 }} />
    </Card>
  );
}
