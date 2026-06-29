import type { CSSProperties, HTMLAttributes } from 'react';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'attention' | 'danger' | 'info' | 'accent';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

const TONES: Record<BadgeTone, { bg: string; fg: string; dot: string }> = {
  neutral: { bg: 'var(--surface-muted)', fg: 'var(--text-tertiary)', dot: 'var(--gray-500)' },
  success: { bg: 'var(--success-tint)', fg: 'var(--green-600)', dot: 'var(--success)' },
  warning: { bg: 'var(--warning-tint)', fg: '#C24A00', dot: 'var(--warning)' },
  attention: { bg: 'var(--attention-tint)', fg: '#A56A00', dot: 'var(--attention)' },
  danger: { bg: 'var(--danger-tint)', fg: '#C70017', dot: 'var(--danger)' },
  info: { bg: 'var(--info-tint)', fg: '#0B5CC4', dot: 'var(--info)' },
  accent: { bg: 'var(--accent-tint)', fg: '#6E8B00', dot: 'var(--lime-700)' },
};

export function Badge({ children, tone = 'neutral', dot = false, style, ...rest }: BadgeProps) {
  const t = TONES[tone] || TONES.neutral;
  const badgeStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 24,
    padding: '0 10px',
    borderRadius: 'var(--radius-pill)',
    background: t.bg,
    color: t.fg,
    fontSize: 'var(--fs-xs)',
    fontWeight: 'var(--fw-semibold)',
    fontFamily: 'var(--font-ui)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    ...style,
  };
  return (
    <span style={badgeStyle} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.dot }} />}
      {children}
    </span>
  );
}
