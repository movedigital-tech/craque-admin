"use client";

import { Fragment, useState, useTransition } from 'react';
import type { CSSProperties } from 'react';
import { Avatar, ConfirmDialog, Icon, useToast } from '../ds';
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
  const [pending, setPending] = useState<RosterRow | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const confirmRemove = () => {
    if (!pending) return;
    const row = pending;
    startTransition(async () => {
      try {
        await unenrollStudent(row.enrollmentId, classGroupId);
        showToast(`${row.name} removido(a) da turma.`, 'success');
      } catch {
        showToast('Não foi possível remover o aluno. Tente novamente.', 'error');
      } finally {
        setPending(null);
      }
    });
  };

  if (rows.length === 0) {
    return <p style={{ padding: '0 24px 20px', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhum aluno matriculado ainda.</p>;
  }

  return (
    <Fragment>
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
              <button
                type="button"
                onClick={() => setPending(r)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}
                title="Remover da turma"
              >
                <Icon name="x" size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ConfirmDialog
      open={pending !== null}
      title="Remover aluno da turma?"
      description={pending ? `${pending.name} deixará de fazer parte desta turma. O cadastro do aluno não será excluído — você pode matriculá-lo novamente depois.` : undefined}
      confirmLabel="Remover"
      loading={isPending}
      onConfirm={confirmRemove}
      onCancel={() => setPending(null)}
    />
    </Fragment>
  );
}
