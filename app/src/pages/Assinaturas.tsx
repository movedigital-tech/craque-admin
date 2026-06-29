import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Avatar, Badge, Button, Card, StatCard, Tabs } from '../components/ds';
import type { TabItem } from '../components/ds';
import { subscriptionStatusMap, subscriptions } from '../data';

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
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Ativas' },
  { value: 'late', label: 'Em atraso' },
  { value: 'suspended', label: 'Canceladas' },
];

export function Assinaturas() {
  const [tab, setTab] = useState('all');

  const rows = subscriptions.filter((r) => tab === 'all' || r.status === tab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        <StatCard icon="repeat" label="Assinaturas ativas" value="34" />
        <StatCard icon="wallet" label="MRR" value="R$ 24.900" variant="dark" />
        <StatCard icon="user-minus" label="Churn (mês)" value="2,1%" trend="-0,4pp" trendDirection="down" />
      </div>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '24px 24px 0', gap: 16 }}>
          <Tabs tabs={tabs} value={tab} onChange={setTab} />
          <div style={{ paddingBottom: 14 }}>
            <Button variant="ghost" size="sm" leadingIcon="download">
              Exportar
            </Button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Escolinha', 'Plano', 'Ciclo', 'Próx. cobrança', 'Valor', 'Status'].map((h) => (
                <th key={h} style={th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const s = subscriptionStatusMap[r.status];
              return (
                <tr key={i}>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={r.schoolName} size={32} />
                      <span style={{ fontWeight: 'var(--fw-semibold)' }}>{r.schoolName}</span>
                    </div>
                  </td>
                  <td style={td}>
                    <Badge tone="neutral">{r.plan}</Badge>
                  </td>
                  <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.cycle}</td>
                  <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.nextChargeLabel}</td>
                  <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{r.amountLabel}</td>
                  <td style={td}>
                    <Badge tone={s.tone} dot>
                      {s.label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
