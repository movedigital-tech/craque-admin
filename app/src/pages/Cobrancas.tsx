import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Avatar, Badge, Button, Card, StatCard, Tabs } from '../components/ds';
import type { TabItem } from '../components/ds';
import { saasInvoiceStatusMap, saasInvoices } from '../data';

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
  { value: 'paid', label: 'Pagas' },
  { value: 'pending', label: 'A vencer' },
  { value: 'late', label: 'Vencidas' },
];

const actionLabel: Record<string, string> = { late: '2ª via', pending: 'Cobrar', paid: 'Recibo' };

export function Cobrancas() {
  const [tab, setTab] = useState('all');

  const rows = saasInvoices.filter((r) => tab === 'all' || r.status === tab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        <StatCard icon="check-circle-2" label="Recebido em abril" value="R$ 22.100" variant="dark" />
        <StatCard icon="clock" label="A vencer" value="R$ 2.800" />
        <StatCard icon="alert-circle" label="Vencido" value="R$ 940" trend="4 faturas" trendDirection="down" />
      </div>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '24px 24px 0', gap: 16 }}>
          <Tabs tabs={tabs} value={tab} onChange={setTab} />
          <div style={{ paddingBottom: 14 }}>
            <Button variant="ghost" size="sm" leadingIcon="send">
              Reenviar lembretes
            </Button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Escolinha', 'Referência', 'Valor', 'Vencimento', 'Método', 'Status', ''].map((h) => (
                <th key={h} style={th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const s = saasInvoiceStatusMap[r.status];
              return (
                <tr key={i}>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={r.schoolName} size={32} />
                      <span style={{ fontWeight: 'var(--fw-semibold)' }}>{r.schoolName}</span>
                    </div>
                  </td>
                  <td style={{ ...td, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{r.reference}</td>
                  <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{r.amountLabel}</td>
                  <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.dueDateLabel}</td>
                  <td style={td}>
                    <Badge tone="neutral">{r.method}</Badge>
                  </td>
                  <td style={td}>
                    <Badge tone={s.tone} dot>
                      {s.label}
                    </Badge>
                  </td>
                  <td style={td}>
                    <Button variant="ghost" size="sm">
                      {actionLabel[r.status]}
                    </Button>
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
