import { notFound } from 'next/navigation';
import { Badge, Card } from '@/components/ds';
import { db } from '@/lib/db';
import { orgStatusMap } from '@/lib/statusMaps';
import { formatDate } from '@/lib/format';

export default async function OrganizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = await db.organization.findUnique({
    where: { id },
    include: {
      memberships: { where: { role: 'OWNER' }, include: { user: true }, take: 1 },
      platformSubscription: true,
      _count: { select: { students: true } },
    },
  });
  if (!org) notFound();

  const owner = org.memberships[0]?.user;
  const subscription = org.platformSubscription;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
      <Card title={org.name} subtitle={org.city ?? undefined}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {([
            ['Responsável', owner?.name ?? '—'],
            ['E-mail', owner?.email ?? '—'],
            ['Criada em', formatDate(org.createdAt)],
            ['Alunos', String(org._count.students)],
          ] as [string, string][]).map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
              <div style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card title="Status da conta">
          <Badge tone={orgStatusMap[org.status].tone} dot>{orgStatusMap[org.status].label}</Badge>
          {subscription?.trialEndsAt && (
            <p style={{ marginTop: 10, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Trial expira em {formatDate(subscription.trialEndsAt)}</p>
          )}
        </Card>
        <Card title="Gateway">
          {subscription?.gatewayCustomerId ? (
            <>
              <p style={{ margin: '0 0 8px', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                Customer ID: <strong>{subscription.gatewayCustomerId}</strong>
              </p>
              <a href="#" style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-link)' }}>
                Ver no painel do gateway →
              </a>
            </>
          ) : (
            <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Ainda sem cliente no gateway.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
