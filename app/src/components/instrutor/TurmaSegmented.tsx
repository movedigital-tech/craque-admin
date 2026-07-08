"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Avatar, Badge, Icon } from '../ds';

type BadgeToneStr = 'success' | 'warning' | 'danger' | 'neutral';

interface AlunoRow {
  studentId: string;
  name: string;
  idade: string;
}

interface ChamadaRow {
  id: string;
  date: string;
  presentes: number;
  total: number;
  tone: BadgeToneStr;
}

interface HorarioData {
  dias: string;
  startTime: string | null;
  endTime: string | null;
  ageRange?: string | null;
  capacity: number;
}

interface Props {
  alunos: AlunoRow[];
  chamadas: ChamadaRow[];
  horario: HorarioData;
  turmaId: string;
  generateSession: (classGroupId: string) => Promise<void>;
}

const SEG_STYLE = {
  container: {
    display: 'flex',
    background: 'var(--surface-muted)',
    borderRadius: 13,
    padding: 4,
    gap: 4,
    marginBottom: 16,
  } as React.CSSProperties,
  btn: (active: boolean): React.CSSProperties => ({
    flex: 1,
    textAlign: 'center',
    padding: '9px 6px',
    borderRadius: 9,
    fontSize: 13.5,
    fontWeight: 'var(--fw-bold)',
    fontFamily: 'var(--font-ui)',
    border: 'none',
    cursor: 'pointer',
    background: active ? 'var(--surface-card)' : 'transparent',
    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
    boxShadow: active ? 'var(--shadow-sm)' : 'none',
  }),
};

const KV = ({ k, v, last }: { k: string; v: string; last?: boolean }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: last ? 'none' : '1px solid var(--border-subtle)', fontSize: 14 }}>
    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
    <strong style={{ textAlign: 'right', color: 'var(--text-primary)' }}>{v}</strong>
  </div>
);

export function TurmaSegmented({ alunos, chamadas, horario, turmaId, generateSession }: Props) {
  const [seg, setSeg] = useState<'alunos' | 'chamadas' | 'horario'>('alunos');

  return (
    <div>
      {/* Segmented control */}
      <div style={SEG_STYLE.container}>
        {(['alunos', 'chamadas', 'horario'] as const).map((tab) => (
          <button key={tab} onClick={() => setSeg(tab)} style={SEG_STYLE.btn(seg === tab)}>
            {tab === 'alunos' ? 'Alunos' : tab === 'chamadas' ? 'Chamadas' : 'Horário'}
          </button>
        ))}
      </div>

      {/* Alunos tab */}
      {seg === 'alunos' && (
        <div>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: '4px 16px', marginBottom: 14, boxShadow: 'var(--shadow-card)' }}>
            {alunos.length === 0 ? (
              <p style={{ padding: '16px 0', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Nenhum aluno matriculado.</p>
            ) : (
              alunos.map((a, i) => (
                <div
                  key={a.studentId}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '11px 0',
                    borderBottom: i < alunos.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}
                >
                  <Avatar name={a.name} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 14 }}>{a.name}</div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{a.idade}</div>
                  </div>
                  <Icon name="chevron-right" size={16} style={{ color: 'var(--gray-500)' }} />
                </div>
              ))
            )}
          </div>

          {/* Start attendance CTA */}
          <form action={generateSession.bind(null, turmaId)}>
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
              <Icon name="clipboard-check" size={18} style={{ color: 'var(--navy-900)' }} />
              Fazer chamada agora
            </button>
          </form>
        </div>
      )}

      {/* Chamadas tab */}
      {seg === 'chamadas' && (
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: '4px 16px', boxShadow: 'var(--shadow-card)' }}>
          {chamadas.length === 0 ? (
            <p style={{ padding: '16px 0', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Nenhuma chamada registrada.</p>
          ) : (
            chamadas.map((c, i) => (
              <Link
                key={c.id}
                href={`/instrutor/chamada/${c.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '13px 0',
                  borderBottom: i < chamadas.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <span style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--surface-muted)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <Icon name="calendar" size={18} style={{ color: 'var(--text-secondary)' }} />
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 14 }}>{c.date}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>Treino</div>
                </div>
                <Badge tone={c.tone} dot>{c.presentes}/{c.total} presentes</Badge>
              </Link>
            ))
          )}
        </div>
      )}

      {/* Horário tab */}
      {seg === 'horario' && (
        <div>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: '4px 16px', boxShadow: 'var(--shadow-card)' }}>
            <KV k="Dias" v={horario.dias} />
            <KV k="Horário" v={[horario.startTime, horario.endTime].filter(Boolean).join(' – ') || '—'} />
            <KV k="Faixa etária" v={horario.ageRange ?? '—'} />
            <KV k="Vagas" v={String(horario.capacity)} last />
          </div>
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
              Para alterar horário ou local, contate a administração da escolinha.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
