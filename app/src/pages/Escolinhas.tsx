import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Card, Icon, Tabs } from '../components/ds';
import type { TabItem } from '../components/ds';
import { schoolStatusMap, schools } from '../data';
import type { School } from '../data/types';

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

const tabs: TabItem[] = [
  { value: 'all', label: 'Todas', count: 38 },
  { value: 'active', label: 'Ativas', count: 31 },
  { value: 'late', label: 'Inadimplentes', count: 4 },
  { value: 'suspended', label: 'Suspensas', count: 2 },
  { value: 'kyc', label: 'Pendente KYC', count: 1 },
];

export function Escolinhas() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');
  const [hov, setHov] = useState<number | null>(null);

  const list = schools.filter(
    (e: School) =>
      (tab === 'all' || e.status === tab) &&
      (!q || e.name.toLowerCase().includes(q.toLowerCase()) || e.owner.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '24px 24px 0', gap: 16 }}>
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
        <div style={{ display: 'flex', gap: 8, paddingBottom: 14, flexShrink: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              height: 36,
              padding: '0 13px',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              width: 190,
            }}
          >
            <Icon name="search" size={15} style={{ color: 'var(--gray-500)', flexShrink: 0 }} />
            <input
              placeholder="Buscar…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                flex: 1,
                fontFamily: 'var(--font-ui)',
                fontSize: 'var(--fs-sm)',
                color: 'var(--text-primary)',
                minWidth: 0,
              }}
            />
          </div>
          <Button variant="secondary" size="sm" leadingIcon="sliders-horizontal">
            Filtros
          </Button>
          <Button variant="primary" size="sm" leadingIcon="plus" onClick={() => navigate('/escolinhas/novo')}>
            Nova escolinha
          </Button>
        </div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Escolinha', 'Responsável', 'Plano', 'Status', 'Alunos', 'MRR', ''].map((h) => (
              <th key={h} style={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((e) => {
            const st = schoolStatusMap[e.status];
            return (
              <tr
                key={e.id}
                style={{ cursor: 'pointer', background: hov === e.id ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s' }}
                onMouseEnter={() => setHov(e.id)}
                onMouseLeave={() => setHov(null)}
                onClick={() => navigate('/escolinhas/novo')}
              >
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar name={e.name} size={36} />
                    <div>
                      <div style={{ fontWeight: 'var(--fw-semibold)' }}>{e.name}</div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{e.city}</div>
                    </div>
                  </div>
                </td>
                <td style={{ ...td, color: 'var(--text-secondary)' }}>{e.owner}</td>
                <td style={td}>
                  <Badge tone="neutral">{e.plan}</Badge>
                </td>
                <td style={td}>
                  <Badge tone={st.tone} dot>
                    {st.label}
                  </Badge>
                </td>
                <td style={{ ...td, fontWeight: 'var(--fw-semibold)', fontVariantNumeric: 'tabular-nums' }}>
                  {e.studentCount > 0 ? e.studentCount : <span style={{ color: 'var(--text-secondary)' }}>—</span>}
                </td>
                <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{e.mrrLabel}</td>
                <td style={{ ...td, width: 40 }}>
                  <button
                    onClick={(ev) => ev.stopPropagation()}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      width: 30,
                      height: 30,
                      borderRadius: 'var(--radius-md)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <Icon name="more-horizontal" size={17} />
                  </button>
                </td>
              </tr>
            );
          })}
          {list.length === 0 && (
            <tr>
              <td colSpan={7} style={{ padding: 48, textAlign: 'center', color: 'var(--text-secondary)' }}>
                Nenhuma escolinha encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 20px', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
        <span>Mostrando {list.length} de 38</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3, '…', 7].map((p, i) => (
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
