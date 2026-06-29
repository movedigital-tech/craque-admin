import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Avatar, Badge, Button, Card, StatCard } from '../components/ds';
import { kycSteps, subaccountStatusMap, subaccounts } from '../data';

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

export function Kyc() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 268px', gap: 22 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          <StatCard icon="shield-check" label="Aprovadas" value="31" variant="dark" />
          <StatCard icon="clock" label="Em análise" value="3" />
          <StatCard icon="file-warning" label="Pendência docs" value="2" />
          <StatCard icon="shield-x" label="Recusadas" value="1" />
        </div>
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Escolinha', 'Subconta', 'Documentos', 'KYC', 'Ação'].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subaccounts.map((r, i) => {
                const s = subaccountStatusMap[r.status];
                return (
                  <tr
                    key={i}
                    style={{ background: hov === i ? 'var(--surface-subtle)' : 'transparent', cursor: 'pointer', transition: 'background .1s' }}
                    onMouseEnter={() => setHov(i)}
                    onMouseLeave={() => setHov(null)}
                  >
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={r.schoolName} size={32} />
                        <span style={{ fontWeight: 'var(--fw-semibold)' }}>{r.schoolName}</span>
                      </div>
                    </td>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{r.recipientId}</td>
                    <td style={{ ...td, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{r.docsStatus}</td>
                    <td style={td}>
                      <Badge tone={s.tone} dot>
                        {s.label}
                      </Badge>
                    </td>
                    <td style={td}>
                      <Button variant="ghost" size="sm">
                        Revisar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
      <Card title="Etapas do KYC" padding={24}>
        {kycSteps.map((step, i) => (
          <div key={step.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < kycSteps.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                border: `2px solid ${step.status === 'done' ? 'var(--success)' : step.status === 'active' ? 'var(--accent)' : 'var(--border-default)'}`,
                background: step.status === 'done' ? 'var(--success-tint)' : step.status === 'active' ? 'var(--accent-tint)' : 'transparent',
                color: step.status === 'done' ? 'var(--success)' : step.status === 'active' ? 'var(--lime-700)' : 'var(--text-secondary)',
              }}
            >
              {step.status === 'done' ? '✓' : i + 1}
            </span>
            <div>
              <div style={{ fontSize: 'var(--fs-sm)', fontWeight: step.status === 'pending' ? 400 : 'var(--fw-medium)', color: step.status === 'pending' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                {step.label}
              </div>
              {step.status === 'active' && <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--info)', marginTop: 2 }}>Em análise pelo gateway</div>}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 14, padding: '11px 13px', background: 'var(--warning-tint)', borderRadius: 'var(--radius-md)', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
          Escolinha só fica apta a cobrar após subconta aprovada pelo gateway.
        </div>
      </Card>
    </div>
  );
}
