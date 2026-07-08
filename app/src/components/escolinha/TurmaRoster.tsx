"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Avatar, Icon } from '../ds';
import { Presenca } from './Presenca';
import { unenrollStudent } from '@/server/actions/matriculas';

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

export interface RosterRow {
  enrollmentId: string;
  studentId: string;
  name: string;
  idade: string;
  resp: string;
  pre: string;
  ok: boolean;
}

export function TurmaRoster({ rows, classGroupId }: { rows: RosterRow[]; classGroupId: string }) {
  const [hov, setHov] = useState<string | null>(null);

  if (rows.length === 0) {
    return <p style={{ padding: '0 24px 20px', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhum aluno matriculado ainda.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {['Aluno', 'Responsável', 'Presença', ''].map((h) => (
            <th key={h} style={th}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.enrollmentId} style={{ background: hov === r.enrollmentId ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s' }} onMouseEnter={() => setHov(r.enrollmentId)} onMouseLeave={() => setHov(null)}>
            <td style={td}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={r.name} size={32} />
                <div>
                  <div style={{ fontWeight: 'var(--fw-semibold)' }}>{r.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{r.idade}</div>
                </div>
              </div>
            </td>
            <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.resp}</td>
            <td style={td}>
              <Presenca pct={r.pre} ok={r.ok} />
            </td>
            <td style={{ ...td, width: 40, textAlign: 'right' }}>
              <form action={unenrollStudent.bind(null, r.enrollmentId, classGroupId)}>
                <button type="submit" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }} title="Remover da turma">
                  <Icon name="x" size={16} />
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
