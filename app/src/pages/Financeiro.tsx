import type { CSSProperties } from 'react';
import { Badge, Button, Card, StatCard } from '../components/ds';
import { financeiroTransactionStatusMap, financeiroTransactions, nextPayout, volumeMensalBars, volumeMensalLabels, webhookHealth } from '../data';

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

export function Financeiro() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 268px', gap: 22 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          <StatCard icon="arrow-down-left" label="Volume transacionado" value="R$ 412 mil" />
          <StatCard icon="scissors" label="Taxa retida" value="R$ 8.240" variant="dark" />
          <StatCard icon="arrow-up-right" label="Repasses às escolinhas" value="R$ 392 mil" />
          <StatCard icon="piggy-bank" label="Saldo a repassar" value="R$ 11.500" />
        </div>
        <Card title="Volume mensal" subtitle="Transações em R$ mil">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 110, paddingTop: 8 }}>
            {volumeMensalBars.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: i === volumeMensalBars.length - 1 ? 'var(--accent)' : 'var(--surface-muted)',
                  borderRadius: '3px 3px 0 0',
                  height: `${h}%`,
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
            {volumeMensalLabels.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </Card>
        <Card
          title="Movimentações recentes"
          action={
            <Button variant="ghost" size="sm" leadingIcon="download">
              Conciliação
            </Button>
          }
        >
          <div style={{ margin: '0 -24px -24px', overflow: 'hidden', borderRadius: '0 0 15px 15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Transação', 'Escolinha', 'Bruto', 'Taxa', 'Líquido', 'Status'].map((h) => (
                    <th key={h} style={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financeiroTransactions.map((r, i) => {
                  const s = financeiroTransactionStatusMap[r.status];
                  return (
                    <tr key={i}>
                      <td style={{ ...td, fontFamily: 'monospace', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{r.id}</td>
                      <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{r.schoolName}</td>
                      <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{r.grossLabel}</td>
                      <td style={{ ...td, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{r.feeLabel}</td>
                      <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{r.netLabel}</td>
                      <td style={td}>
                        <Badge tone={s.tone} dot>
                          {s.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Card title="Próximo repasse" padding={24}>
          <div style={{ fontSize: 26, fontWeight: 'var(--fw-bold)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', margin: '8px 0 4px' }}>
            {nextPayout.amountLabel}
          </div>
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: 16 }}>{nextPayout.dateLabel}</div>
          <Button variant="primary" size="sm" fullWidth leadingIcon="banknote">
            Liberar repasses
          </Button>
        </Card>
        <Card title="Saúde de webhooks" padding={24}>
          {webhookHealth.map((h) => (
            <div key={h.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{h.label}</span>
              <Badge tone={h.tone}>{h.value}</Badge>
            </div>
          ))}
          <Button variant="ghost" size="sm" fullWidth style={{ marginTop: 12 }}>
            Ver log de eventos
          </Button>
        </Card>
      </div>
    </div>
  );
}
