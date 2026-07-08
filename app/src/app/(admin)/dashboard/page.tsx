import { Badge, Card, StatCard } from '@/components/ds';
import { db } from '@/lib/db';
import { orgStatusMap } from '@/lib/statusMaps';
import { formatDate, formatDateTime } from '@/lib/format';

export default async function DashboardPage() {
  const [totalCount, activeCount, trialingCount, pastDueCount, webhookCount, expiringSoon, recentWebhooks] = await Promise.all([
    db.organization.count(),
    db.organization.count({ where: { status: 'ACTIVE' } }),
    db.organization.count({ where: { status: 'TRIALING' } }),
    db.organization.count({ where: { status: 'PAST_DUE' } }),
    db.webhookEvent.count(),
    db.organization.findMany({
      where: { status: 'TRIALING', platformSubscription: { trialEndsAt: { not: null } } },
      include: { platformSubscription: true },
      orderBy: { platformSubscription: { trialEndsAt: 'asc' } },
      take: 5,
    }),
    db.webhookEvent.findMany({ orderBy: { receivedAt: 'desc' }, take: 4, include: { organization: true } }),
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard icon="building-2" label="Organizações ativas" value={String(activeCount)} trend={`${totalCount} no total`} trendDirection="up" />
        <StatCard icon="hourglass" label="Em trial" value={String(trialingCount)} trend="período de avaliação" trendDirection="up" />
        <StatCard icon="alert-triangle" label="Inadimplentes" value={String(pastDueCount)} trend="acompanhar cobrança" trendDirection="down" />
        <StatCard icon="webhook" label="Eventos recebidos" value={String(webhookCount)} trend="desde o início" trendDirection="up" />
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
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{o.city ?? '—'}</div>
                </div>
                <Badge tone={orgStatusMap[o.status].tone}>expira em {formatDate(o.platformSubscription?.trialEndsAt)}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Eventos recentes de webhook">
        {recentWebhooks.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhum evento recebido ainda.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentWebhooks.map((w) => (
              <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 'var(--fw-semibold)' }}>{w.type}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{w.organization?.name ?? '—'} · {formatDateTime(w.receivedAt)}</div>
                </div>
                <Badge tone={w.processedAt ? 'success' : 'warning'}>{w.processedAt ? 'processado' : 'pendente'}</Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
