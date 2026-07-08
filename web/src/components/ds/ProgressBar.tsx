import type { CSSProperties, HTMLAttributes } from 'react';

export type ProgressTone = 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  tone?: ProgressTone;
  height?: number;
  showLabel?: boolean;
  label?: string;
}

const FILL: Record<ProgressTone, string> = {
  accent: 'var(--accent)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
  info: 'var(--info)',
};

export function ProgressBar({ value = 0, max = 100, tone = 'accent', height = 8, showLabel = false, label, style, ...rest }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = FILL[tone] || FILL.accent;
  const wrapperStyle: CSSProperties = { width: '100%', ...style };

  return (
    <div style={wrapperStyle} {...rest}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', fontWeight: 'var(--fw-medium)', marginBottom: 6 }}>
          <span>{label}</span>
          <span style={{ color: 'var(--text-primary)' }}>{Math.round(pct)}%</span>
        </div>
      )}
      <div style={{ width: '100%', height, borderRadius: 'var(--radius-pill)', background: 'var(--surface-muted)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 'var(--radius-pill)', background: fill, transition: 'width var(--dur-slow) var(--ease-out)' }} />
      </div>
    </div>
  );
}
