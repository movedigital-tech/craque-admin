import type { CSSProperties } from 'react';
import { Badge, Card } from '@/components/ds';
import { db } from '@/lib/db';
import { subscriptionStatusMap } from '@/lib/statusMaps';
import { formatDate } from '@/lib/format';

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

export default async function SubscriptionsPage() {
  const subscriptions = await db.platformSubscription.findMany({
    include: { organization: true },
    orderBy: { createdAt: 'desc' },
  });

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
            <tr key={s.id}>
              <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{s.organization.name}</td>
              <td style={td}>
                <Badge tone={subscriptionStatusMap[s.status].tone} dot>{subscriptionStatusMap[s.status].label}</Badge>
              </td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.gatewayCustomerId ?? '—'}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{formatDate(s.currentPeriodEnd)}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.lastPaymentStatus ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: 8 }} />
    </Card>
  );
}
