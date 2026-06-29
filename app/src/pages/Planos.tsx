import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Icon } from '../components/ds';
import { plans } from '../data';

export function Planos() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <Button variant="primary" size="sm" leadingIcon="plus" onClick={() => navigate('/planos/novo')}>
          Novo plano
        </Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {plans.map((p) => (
          <Card key={p.id} style={p.highlighted ? { borderColor: 'var(--accent)', borderWidth: 2 } : {}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)' }}>{p.name}</h3>
              {p.highlighted && <Badge tone="accent">Mais usado</Badge>}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', margin: '14px 0 2px' }}>
              <span style={{ fontSize: 32, fontWeight: 'var(--fw-bold)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                {p.priceLabel}
              </span>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>/mês</span>
            </div>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: 14 }}>+ {p.txnPctLabel} por transação</div>
            <Badge tone="neutral">{p.activeSchools} escolinhas ativas</Badge>
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0' }} />
            {p.features.map((f) => (
              <div key={f} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: 8 }}>
                <Icon name="check" size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
                {f}
              </div>
            ))}
            <Button variant="secondary" size="sm" fullWidth leadingIcon="pencil" style={{ marginTop: 16 }} onClick={() => navigate('/planos/novo')}>
              Editar plano
            </Button>
          </Card>
        ))}
      </div>
      <div style={{ padding: '13px 16px', background: 'var(--info-tint)', borderRadius: 'var(--radius-md)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon name="info" size={14} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 2 }} />
        <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
          Mudança de plano não recalcula cobranças já geradas. O split vigente é o do momento da criação da cobrança.
        </span>
      </div>
    </div>
  );
}
