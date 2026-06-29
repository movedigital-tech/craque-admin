import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Card, Icon } from '../../components/ds';
import { alunos, mensalidadeStatusMap } from '../../data/escolinha';
import { Presenca } from '../../components/escolinha/Presenca';

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
  ['all', 'Todos · 142'],
  ['Sub-7', 'Sub-7'],
  ['Sub-9', 'Sub-9'],
  ['Sub-11', 'Sub-11'],
  ['Sub-13', 'Sub-13'],
];

export function EscolinhaAlunos() {
  const navigate = useNavigate();
  const [chip, setChip] = useState('all');
  const [hov, setHov] = useState<number | null>(null);

  const list = alunos.filter((r) => chip === 'all' || r.turma === chip);

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
          <Button variant="secondary" size="sm" leadingIcon="sliders-horizontal">
            Filtros
          </Button>
          <Button variant="primary" size="sm" leadingIcon="user-plus" onClick={() => navigate('/escolinha/alunos/novo')}>
            Nova matrícula
          </Button>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 14 }}>
        <thead>
          <tr>
            {['Aluno', 'Turma', 'Responsável', 'Presença', 'Mensalidade', ''].map((h) => (
              <th key={h} style={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((r, i) => {
            const s = mensalidadeStatusMap[r.st];
            return (
              <tr key={i} style={{ background: hov === i ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s', cursor: 'pointer' }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
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
                <td style={td}>
                  <Badge tone={s.tone} dot>
                    {s.label}
                  </Badge>
                </td>
                <td style={{ ...td, width: 40, textAlign: 'right' }}>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                    <Icon name="more-horizontal" size={17} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px 20px', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
        <span>Mostrando {list.length} de 142</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3, '…', 29].map((p, i) => (
            <button
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${p === 1 ? 'var(--navy-900)' : 'var(--border-subtle)'}`,
                background: p === 1 ? 'var(--navy-900)' : 'var(--surface-card)',
                color: p === 1 ? 'var(--white)' : 'var(--text-secondary)',
                fontSize: 'var(--fs-sm)',
                fontWeight: 'var(--fw-medium)',
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
