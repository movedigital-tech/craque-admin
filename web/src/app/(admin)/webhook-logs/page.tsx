import type { CSSProperties } from 'react';
import { Badge, Card } from '@/components/ds';
import { webhookEvents } from '@/data/admin';

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
  fontVariantNumeric: 'tabular-nums',
};

export default function WebhookLogsPage() {
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Evento', 'Tipo', 'Organização', 'Recebido em', 'Status'].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {webhookEvents.map((w) => (
            <tr key={w.id}>
              <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{w.eventId}</td>
              <td style={td}>{w.type}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{w.organizationName ?? '—'}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{w.receivedAt}</td>
              <td style={td}>
                <Badge tone={w.processedAt ? 'success' : 'warning'} dot>{w.processedAt ? 'Processado' : 'Pendente'}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: 8 }} />
    </Card>
  );
}
