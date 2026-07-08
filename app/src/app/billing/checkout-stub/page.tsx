import { Badge, Card } from '@/components/ds';

export default function CheckoutStubPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-canvas)' }}>
      <Card style={{ maxWidth: 440, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <Badge tone="neutral">Stub — gateway ainda não escolhido</Badge>
        </div>
        <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-bold)' }}>Checkout do gateway</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
          Aqui o cliente seria redirecionado para o checkout hospedado do gateway real. Quando o provedor for escolhido,
          este seam (<code>PaymentProvider.createCheckoutSession</code>) passa a apontar para lá sem mudar o resto do app.
        </p>
      </Card>
    </div>
  );
}
