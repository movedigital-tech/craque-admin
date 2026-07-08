"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Badge, Button, Card, Icon } from '../ds';

export interface TurmaCardData {
  id: string;
  nome: string;
  cat: string;
  agenda: string;
  local: string;
  prof: string;
  alunos: number;
  vagas: number;
}

export function TurmasGrid({ turmas }: { turmas: TurmaCardData[] }) {
  const [chip, setChip] = useState('all');

  const chips: [string, string][] = [
    ['all', `Todas · ${turmas.length}`],
    ...turmas.map((t): [string, string] => [t.id, t.nome]),
  ];

  const list = chip === 'all' ? turmas : turmas.filter((t) => t.id === chip);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
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
        <Button variant="primary" size="sm" leadingIcon="plus" onClick={() => router.push('/escolinha/turmas/novo')}>
          Nova turma
        </Button>
      </div>
      {list.length === 0 ? (
        <Card>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhuma turma cadastrada ainda.</p>
        </Card>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {list.map((t) => {
            const cheia = t.alunos >= t.vagas;
            return (
              <Link key={t.id} href={`/escolinha/turmas/${t.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <Card style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)' }}>{t.nome}</h3>
                    <Badge tone="neutral">{t.cat}</Badge>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                      <Icon name="calendar" size={15} style={{ color: 'var(--gray-500)' }} />
                      {t.agenda}
                    </div>
                    <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                      <Icon name="map-pin" size={15} style={{ color: 'var(--gray-500)' }} />
                      {t.local}
                    </div>
                    <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
                      <Icon name="graduation-cap" size={15} style={{ color: 'var(--gray-500)' }} />
                      {t.prof}
                    </div>
                  </div>
                  <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{t.alunos}</strong> / {t.vagas} vagas
                    </span>
                    {cheia ? <Badge tone="warning" dot>Lotada</Badge> : <Badge tone="success" dot>Aberta</Badge>}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
