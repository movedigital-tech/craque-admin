"use client";

import { useState } from 'react';
import { Avatar, Icon } from '../ds';
import { markInstrutorAttendance } from '@/server/actions/instrutor';

export interface ChamadaRow {
  studentId: string;
  name: string;
  idade: string;
  currentStatus: string | null;
}

type StatusVal = 'PRESENT' | 'ABSENT' | null;

export function InstrutorChamadaForm({
  sessionId,
  classGroupId,
  rows,
}: {
  sessionId: string;
  classGroupId: string;
  rows: ChamadaRow[];
}) {
  const [marks, setMarks] = useState<Record<string, StatusVal>>(() =>
    Object.fromEntries(rows.map((r) => [r.studentId, (r.currentStatus as StatusVal) ?? null])),
  );

  const presentes = Object.values(marks).filter((m) => m === 'PRESENT').length;
  const faltas = Object.values(marks).filter((m) => m === 'ABSENT').length;
  const pendentes = rows.length - presentes - faltas;

  function setMark(studentId: string, status: StatusVal) {
    setMarks((prev) => ({ ...prev, [studentId]: prev[studentId] === status ? null : status }));
  }

  const action = markInstrutorAttendance.bind(null, sessionId, classGroupId);

  const counter = (val: number, label: string, bg: string, col: string) => (
    <div style={{ flex: 1, textAlign: 'center', padding: '10px', background: bg, borderRadius: 12 }}>
      <div style={{ fontSize: 20, fontWeight: 'var(--fw-bold)', color: col }}>{val}</div>
      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{label}</div>
    </div>
  );

  const btnStyle = (active: boolean, tone: 'ok' | 'bad'): React.CSSProperties => {
    const map = {
      ok: { bg: 'var(--accent-tint)', bd: 'var(--success)', c: 'var(--success)' },
      bad: { bg: 'var(--danger-tint)', bd: 'var(--danger)', c: 'var(--danger)' },
    };
    const a = map[tone];
    return {
      height: 34,
      padding: '0 11px',
      borderRadius: 9,
      border: `1px solid ${active ? a.bd : 'var(--border-default)'}`,
      background: active ? a.bg : 'var(--surface-card)',
      color: active ? a.c : 'var(--gray-500)',
      fontSize: 12,
      fontWeight: 'var(--fw-bold)',
      cursor: 'pointer',
      fontFamily: 'var(--font-ui)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    };
  };

  return (
    <form action={action}>
      {/* Hidden inputs for all marks */}
      {rows.map((r) =>
        marks[r.studentId] ? (
          <input key={r.studentId} type="hidden" name={`status-${r.studentId}`} value={marks[r.studentId]!} />
        ) : null,
      )}

      {/* Summary counters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        {counter(presentes, 'Presentes', 'var(--accent-tint)', 'var(--success)')}
        {counter(faltas, 'Faltas', 'var(--danger-tint)', 'var(--danger)')}
        {counter(pendentes, 'Pendentes', 'var(--surface-muted)', 'var(--text-secondary)')}
      </div>

      {/* Roster */}
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: '0 16px', marginBottom: 16, boxShadow: 'var(--shadow-card)' }}>
        {rows.length === 0 ? (
          <p style={{ padding: '16px 0', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Nenhum aluno matriculado.</p>
        ) : (
          rows.map((r, i) => (
            <div
              key={r.studentId}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 0',
                borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <Avatar name={r.name} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{r.idade}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  onClick={() => setMark(r.studentId, 'PRESENT')}
                  style={btnStyle(marks[r.studentId] === 'PRESENT', 'ok')}
                >
                  <Icon name="check" size={13} />
                  Presente
                </button>
                <button
                  type="button"
                  onClick={() => setMark(r.studentId, 'ABSENT')}
                  style={btnStyle(marks[r.studentId] === 'ABSENT', 'bad')}
                >
                  <Icon name="x" size={13} />
                  Falta
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        style={{
          width: '100%',
          height: 52,
          borderRadius: 14,
          background: 'var(--accent)',
          color: 'var(--navy-900)',
          fontFamily: 'var(--font-ui)',
          fontSize: 16,
          fontWeight: 'var(--fw-bold)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Icon name="check-circle" size={18} style={{ color: 'var(--navy-900)' }} />
        Confirmar chamada
      </button>

      <div
        style={{
          marginTop: 14,
          padding: '13px 14px',
          background: 'var(--info-tint)',
          borderRadius: 12,
          borderLeft: '3px solid var(--info)',
          display: 'flex',
          gap: 9,
          alignItems: 'flex-start',
        }}
      >
        <Icon name="info" size={15} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          A chamada fica registrada no histórico da turma.
        </p>
      </div>
    </form>
  );
}
