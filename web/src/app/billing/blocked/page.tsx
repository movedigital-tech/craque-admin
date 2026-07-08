import { Card } from '@/components/ds';

export default function BillingBlockedPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-canvas)' }}>
      <Card style={{ maxWidth: 420, textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-bold)' }}>Acesso bloqueado</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
          Esta organização está com o acesso suspenso. Entre em contato com o suporte para regularizar a assinatura.
        </p>
      </Card>
    </div>
  );
}
