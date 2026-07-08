"use client";

import { useState } from 'react';
import { Button, Card } from '@/components/ds';

export default function BillingBlockedPage() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    const res = await fetch('/api/billing/create-checkout-session', { method: 'POST' });
    const data = await res.json();
    setLoading(false);
    if (data?.url) window.location.href = data.url;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-canvas)' }}>
      <Card style={{ maxWidth: 420, textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-bold)' }}>Acesso bloqueado</h2>
        <p style={{ margin: '0 0 20px', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
          O período de teste terminou ou a assinatura está suspensa. Assine um plano para continuar usando a Craque.
        </p>
        <Button variant="primary" size="md" fullWidth leadingIcon="credit-card" onClick={handleUpgrade} disabled={loading}>
          {loading ? 'Abrindo checkout…' : 'Assinar agora'}
        </Button>
      </Card>
    </div>
  );
}
