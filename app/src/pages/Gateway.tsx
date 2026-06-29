import type { CSSProperties } from 'react';
import { Badge, Button, Card, Icon, Input } from '../components/ds';
import { gatewayAccount, gatewayFeatures, splitExample, splitRules } from '../data';

const th: CSSProperties = {
  padding: '24px',
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
};

function FF({ label, val }: { label: string; val: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-primary)' }}>{label}</label>
      <div
        style={{
          height: 44,
          padding: '0 14px',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--surface-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 'var(--fs-body)',
          cursor: 'pointer',
        }}
      >
        <span>{val}</span>
        <Icon name="chevron-down" size={14} style={{ color: 'var(--gray-500)' }} />
      </div>
    </div>
  );
}

export function Gateway() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 268px', gap: 22 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card
          title="Provedor de pagamento"
          action={
            <Badge tone="info" dot>
              Conectado · Sandbox
            </Badge>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <FF label="Gateway" val={gatewayAccount.provider} />
            <FF label="Ambiente" val={gatewayAccount.environment} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Public key" defaultValue={gatewayAccount.publicKeyMasked} trailingIcon="eye-off" />
            <Input label="Secret key" defaultValue={gatewayAccount.secretKeyMasked} trailingIcon="eye-off" />
            <Input label="URL webhook" defaultValue={gatewayAccount.webhookUrl} leadingIcon="link" />
          </div>
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>Métodos habilitados</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>Checkout do responsável</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {gatewayAccount.methods.map((m, i) => (
                <Badge key={m} tone={i < 2 ? 'success' : 'neutral'}>
                  {m}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="primary" size="sm" leadingIcon="check" style={{ marginTop: 14 }}>
            Salvar configurações
          </Button>
        </Card>
        <Card
          title="Regras de split por plano"
          action={
            <Button variant="primary" size="sm" leadingIcon="plus">
              Nova regra
            </Button>
          }
        >
          <div style={{ margin: '0 -24px -24px', overflow: 'hidden', borderRadius: '0 0 15px 15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Plano', 'Plataforma', 'Escolinha', 'Professor (opc.)', ''].map((h, i) => (
                    <th key={i} style={i === 4 ? { ...th, textAlign: 'right' } : th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {splitRules.map((r) => (
                  <tr key={r.plan}>
                    <td style={td}>
                      <Badge tone="neutral">{r.plan}</Badge>
                    </td>
                    <td style={{ ...td, fontWeight: 'var(--fw-bold)' }}>{r.platformPct}</td>
                    <td style={td}>{r.schoolPct}</td>
                    <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.teacherPct}</td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      <Button variant="ghost" size="sm" leadingIcon="pencil">
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card title="Exemplo · R$ 100" padding={24}>
          {splitExample.map((row, i) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < splitExample.length - 1 ? '1px solid var(--border-subtle)' : 'none', fontSize: 'var(--fs-body)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
              <strong style={{ color: row.color ?? 'inherit' }}>{row.value}</strong>
            </div>
          ))}
        </Card>
        <Card title="Recursos do gateway" padding={24}>
          {gatewayFeatures.map((f) => (
            <div key={f} style={{ display: 'flex', gap: 9, alignItems: 'center', padding: '7px 0', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
              <Icon name="check" size={14} style={{ color: 'var(--success)', flexShrink: 0 }} />
              {f}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
