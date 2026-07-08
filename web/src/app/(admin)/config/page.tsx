import { Badge, Card, Input } from '@/components/ds';

export default function AdminConfigPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 640 }}>
      <Card title="Trial" subtitle="Duração padrão do período de avaliação para novas organizações.">
        <Input label="Dias de trial" defaultValue="7" leadingIcon="calendar" />
      </Card>
      <Card
        title="Gateway de pagamento"
        subtitle="Provedor ainda não escolhido — integração roda atrás da interface PaymentProvider."
        action={<Badge tone="neutral">Stub</Badge>}
      >
        <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
          Nenhuma credencial de gateway configurada nesta rodada.
        </p>
      </Card>
      <Card title="Webhook" subtitle="Endpoint que recebe eventos do gateway.">
        <Input label="URL do endpoint" defaultValue="/api/webhooks/stub" leadingIcon="link" disabled />
      </Card>
    </div>
  );
}
