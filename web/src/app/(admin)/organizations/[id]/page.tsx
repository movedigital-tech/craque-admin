import { notFound } from 'next/navigation';
import { Badge, Card } from '@/components/ds';
import { orgStatusMap, organizations, subscriptions } from '@/data/admin';

export default async function OrganizationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const org = organizations.find((o) => o.id === id);
  if (!org) notFound();

  const subscription = subscriptions.find((s) => s.organizationId === id);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
      <Card title={org.name} subtitle={org.city}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {([
            ['Responsável', org.ownerName],
            ['E-mail', org.ownerEmail],
            ['Criada em', org.createdAt],
            ['Alunos', String(org.studentCount)],
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
          {org.trialEndsAt && (
            <p style={{ marginTop: 10, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Trial expira em {org.trialEndsAt}</p>
          )}
        </Card>
        <Card title="Gateway">
          {subscription?.gatewayCustomerId ? (
            <>
              <p style={{ margin: '0 0 8px', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                Customer ID: <strong>{subscription.gatewayCustomerId}</strong>
              </p>
              <a
                href="#"
                style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-link)' }}
              >
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
