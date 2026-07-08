import type { CSSProperties } from 'react';
import { Badge, Card } from '@/components/ds';
import { subscriptions } from '@/data/admin';
import type { StatusMapEntry, SubscriptionStatus } from '@/data/admin/types';

const th: CSSProperties = {
  padding: '14px 24px',
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

const statusMap: Record<SubscriptionStatus, StatusMapEntry> = {
  trialing: { label: 'Em trial', tone: 'info' },
  active: { label: 'Ativa', tone: 'success' },
  past_due: { label: 'Inadimplente', tone: 'warning' },
  canceled: { label: 'Cancelada', tone: 'neutral' },
  incomplete: { label: 'Incompleta', tone: 'danger' },
};

export default function SubscriptionsPage() {
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Organização', 'Status', 'Customer ID', 'Fim do período', 'Último pagamento'].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((s) => (
            <tr key={s.organizationId}>
              <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{s.organizationName}</td>
              <td style={td}>
                <Badge tone={statusMap[s.status].tone} dot>{statusMap[s.status].label}</Badge>
              </td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.gatewayCustomerId ?? '—'}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.currentPeriodEnd ?? '—'}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.lastPaymentStatus ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: 8 }} />
    </Card>
  );
}
