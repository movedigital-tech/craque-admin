import { Badge, Card, StatCard } from '@/components/ds';
import { orgStatusMap, organizations, webhookEvents } from '@/data/admin';

export default function DashboardPage() {
  const activeCount = organizations.filter((o) => o.status === 'ACTIVE').length;
  const trialingCount = organizations.filter((o) => o.status === 'TRIALING').length;
  const pastDueCount = organizations.filter((o) => o.status === 'PAST_DUE').length;
  const expiringSoon = organizations.filter((o) => o.status === 'TRIALING' && o.trialEndsAt);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard icon="building-2" label="Organizações ativas" value={String(activeCount)} trend={`${organizations.length} no total`} trendDirection="up" />
        <StatCard icon="hourglass" label="Em trial" value={String(trialingCount)} trend="período de avaliação" trendDirection="up" />
        <StatCard icon="alert-triangle" label="Inadimplentes" value={String(pastDueCount)} trend="acompanhar cobrança" trendDirection="down" />
        <StatCard icon="webhook" label="Eventos recebidos" value={String(webhookEvents.length)} trend="últimos 30 dias" trendDirection="up" />
      </div>

      <Card title="Trials expirando em breve">
        {expiringSoon.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhum trial expirando nos próximos dias.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {expiringSoon.map((o) => (
              <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 'var(--fw-semibold)' }}>{o.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{o.city}</div>
                </div>
                <Badge tone={orgStatusMap[o.status].tone}>expira em {o.trialEndsAt}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Eventos recentes de webhook">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {webhookEvents.slice(0, 4).map((w) => (
            <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontWeight: 'var(--fw-semibold)' }}>{w.type}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{w.organizationName ?? '—'} · {w.receivedAt}</div>
              </div>
              <Badge tone={w.processedAt ? 'success' : 'warning'}>{w.processedAt ? 'processado' : 'pendente'}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
