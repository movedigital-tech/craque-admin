"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Badge, Button, Card, Icon } from '@/components/ds';
import { turmaDetalheAlunos } from '@/data/escolinha';
import { InfoNote } from '@/components/escolinha/InfoNote';
import { Presenca } from '@/components/escolinha/Presenca';

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

const infoRows: [string, string][] = [
  ['Categoria', '8 a 9 anos'],
  ['Agenda', 'Qua · 18h'],
  ['Local', 'Campo 2 · Centro'],
];

export default function EscolinhaTurmaDetalhePage() {
  const router = useRouter();
  const [hov, setHov] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => router.push('/escolinha/turmas')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', padding: 0 }}
      >
        <Icon name="arrow-left" size={15} />
        Turmas <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span> <strong style={{ color: 'var(--text-primary)' }}>Sub-9</strong>
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge tone="success" dot>Aberta</Badge>
          <Badge tone="neutral">8 a 9 anos</Badge>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" size="sm" leadingIcon="pencil" onClick={() => router.push('/escolinha/turmas/novo')}>
            Editar turma
          </Button>
          <Button variant="primary" size="sm" leadingIcon="user-plus" onClick={() => router.push('/escolinha/alunos/novo')}>
            Adicionar aluno
          </Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 14px' }}>
            <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', fontFamily: 'var(--font-ui)' }}>Alunos inscritos · 24</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Aluno', 'Responsável', 'Presença', ''].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {turmaDetalheAlunos.map((r, i) => (
                <tr key={i} style={{ background: hov === i ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s' }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
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
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <Icon name="x" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px 20px', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
            <span>Mostrando 6 de 24</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" size="sm">Anterior</Button>
              <Button variant="ghost" size="sm">Próxima</Button>
            </div>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Informações" padding={24}>
            {infoRows.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Professor</span>
              <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Avatar name="Lucas Martins" size={24} />
                <strong>Lucas M.</strong>
              </span>
            </div>
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '10px 0 14px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Capacidade</span>
              <span style={{ fontWeight: 'var(--fw-bold)' }}>24 / 24</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: 'var(--surface-muted)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '100%', background: 'var(--warning)', borderRadius: 99 }} />
            </div>
            <div style={{ marginTop: 10 }}>
              <Badge tone="warning" dot>Turma lotada</Badge>
            </div>
          </Card>
          <Card padding={24}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 'var(--fs-sm)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Presença média</span>
              <span style={{ fontWeight: 'var(--fw-bold)' }}>88%</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: 'var(--surface-muted)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '88%', background: 'var(--accent)', borderRadius: 99 }} />
            </div>
          </Card>
          <InfoNote>
            Alunos podem estar em <strong>mais de uma turma</strong>. Remover daqui não exclui o cadastro do aluno.
          </InfoNote>
        </div>
      </div>
    </div>
  );
}
