export interface PresencaProps {
  pct: string;
  ok: boolean;
}

export function Presenca({ pct, ok }: PresencaProps) {
  return (
    <div style={{ width: 130 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>Presença</span>
        <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)' }}>{pct}</span>
      </div>
      <div style={{ height: 7, borderRadius: 99, background: 'var(--surface-muted)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: pct, background: ok ? 'var(--accent)' : 'var(--warning)', borderRadius: 99 }} />
      </div>
    </div>
  );
}
