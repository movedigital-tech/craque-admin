import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Card, Icon, Toggle } from '../../components/ds';
import { professores } from '../../data/escolinha';
import { InfoNote } from '../../components/escolinha/InfoNote';

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

const tabs: [string, string][] = [
  ['active', 'Ativos · 5'],
  ['invite', 'Convites · 1'],
];

export function EscolinhaProfessores() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('active');
  const [split, setSplit] = useState(true);
  const [hov, setHov] = useState<number | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '24px 24px 0', gap: 16 }}>
          <div style={{ display: 'inline-flex', gap: 4, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', padding: 4, marginBottom: 14 }}>
            {tabs.map(([v, l]) => (
              <button
                key={v}
                onClick={() => setTab(v)}
                style={{
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'var(--fs-sm)',
                  fontWeight: 'var(--fw-semibold)',
                  background: tab === v ? 'var(--surface-card)' : 'transparent',
                  color: tab === v ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: tab === v ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <div style={{ paddingBottom: 14 }}>
            <Button variant="primary" size="sm" leadingIcon="user-plus" onClick={() => navigate('/escolinha/professores/novo')}>
              Adicionar membro
            </Button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Membro', 'Função', 'Turmas', 'Split', 'Status', ''].map((h) => (
                <th key={h} style={th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {professores.map((r, i) => (
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
                <td style={td}>
                  <Badge tone="neutral">{r.fn}</Badge>
                </td>
                <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.turmas}</td>
                <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{r.sp}</td>
                <td style={td}>
                  <Badge tone="success" dot>
                    Ativo
                  </Badge>
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
        <div style={{ height: 8 }} />
      </Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card title="Split para professores" padding={24}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0 12px', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>Habilitar split</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>Disponível no plano Pro</div>
            </div>
            <Toggle checked={split} onChange={() => setSplit((v) => !v)} />
          </div>
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '0 0 12px' }} />
          <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            A cada mensalidade recebida, o percentual definido é repassado automaticamente ao professor da turma.
          </p>
        </Card>
        <InfoNote>
          O split é registrado de forma <strong>auditável</strong> em cada transação.
        </InfoNote>
      </div>
    </div>
  );
}
