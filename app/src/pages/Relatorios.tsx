import type { CSSProperties } from 'react';
import { Button, Card, Icon } from '../components/ds';
import { reportPreviewRows, reportTypes } from '../data';

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

function FS({ label, val, w }: { label: string; val: string; w: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: w }}>
      <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-medium)' }}>{label}</label>
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

export function Relatorios() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Card>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <FS label="Tipo de relatório" val="Financeiro consolidado" w="220px" />
          <FS label="Escolinha" val="Todas" w="150px" />
          <FS label="Período" val="Abril 2026" w="140px" />
          <FS label="Formato" val="CSV" w="110px" />
          <Button variant="primary" leadingIcon="download" style={{ flexShrink: 0 }}>
            Exportar
          </Button>
        </div>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {reportTypes.map((t) => (
          <div
            key={t.name}
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              cursor: 'pointer',
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
            }}
          >
            <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--surface-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={t.icon} size={18} style={{ color: 'var(--text-secondary)' }} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{t.name}</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 3 }}>{t.sub}</div>
            </div>
            <Icon name="arrow-up-right" size={15} style={{ color: 'var(--gray-300)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
      <Card title="Prévia · Financeiro consolidado" subtitle="Abril 2026">
        <div style={{ margin: '0 -24px -24px', overflow: 'hidden', borderRadius: '0 0 15px 15px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Escolinha', 'Volume', 'Taxa plataforma', 'Repassado', 'Inadimplência'].map((h) => (
                  <th key={h} style={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportPreviewRows.map((r) => (
                <tr key={r.schoolName}>
                  <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{r.schoolName}</td>
                  <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{r.volumeLabel}</td>
                  <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{r.platformFeeLabel}</td>
                  <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{r.payoutLabel}</td>
                  <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{r.delinquencyLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
