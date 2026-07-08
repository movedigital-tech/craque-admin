"use client";

import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Button, Card, Icon, Select } from '../ds';
import { markAttendance } from '@/server/actions/presenca';

const td: CSSProperties = {
  padding: '14px 24px',
  fontSize: 'var(--fs-body)',
  borderBottom: '1px solid var(--gray-100)',
};

export interface ChamadaRow {
  studentId: string;
  name: string;
  idade: string;
  currentStatus: string | null;
}

const STATUS_OPTIONS = [
  { value: 'PRESENT', label: 'Presente' },
  { value: 'ABSENT', label: 'Ausente' },
  { value: 'JUSTIFIED', label: 'Justificado' },
  { value: 'LATE', label: 'Atrasado' },
];

export function ChamadaForm({ sessionId, rows, turmaLabel }: { sessionId: string; rows: ChamadaRow[]; turmaLabel: string }) {
  const router = useRouter();
  const action = markAttendance.bind(null, sessionId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => router.push('/escolinha/agenda')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', padding: 0 }}
      >
        <Icon name="arrow-left" size={15} />
        Agenda <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span> <strong style={{ color: 'var(--text-primary)' }}>Chamada · {turmaLabel}</strong>
      </button>
      <form action={action}>
        <Card padding={0} style={{ overflow: 'hidden' }}>
          {rows.length === 0 ? (
            <p style={{ padding: '20px 24px', margin: 0, color: 'var(--text-secondary)' }}>Nenhum aluno matriculado nesta turma.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.studentId}>
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={r.name} size={32} />
                        <div>
                          <div style={{ fontWeight: 'var(--fw-semibold)' }}>{r.name}</div>
                          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{r.idade}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...td, width: 220 }}>
                      <Select name={`status-${r.studentId}`} defaultValue={r.currentStatus ?? 'PRESENT'} options={STATUS_OPTIONS} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div style={{ height: 8 }} />
        </Card>
        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          <Button type="submit" variant="primary" size="md" leadingIcon="check">Salvar chamada</Button>
          <Button type="button" variant="secondary" size="md" onClick={() => router.push('/escolinha/agenda')}>Cancelar</Button>
        </div>
      </form>
    </div>
  );
}
