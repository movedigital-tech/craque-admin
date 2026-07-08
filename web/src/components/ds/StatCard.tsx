import type { HTMLAttributes } from 'react';
import { Icon } from './Icon';

export type StatCardVariant = 'default' | 'dark';
export type StatCardTrendDirection = 'up' | 'down';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: StatCardTrendDirection;
  variant?: StatCardVariant;
}

export function StatCard({ icon, label, value, trend, trendDirection = 'up', variant = 'default', style, ...rest }: StatCardProps) {
  const dark = variant === 'dark';
  const up = trendDirection === 'up';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '22px 24px',
        borderRadius: 'var(--radius-md)',
        background: dark ? 'var(--surface-stat-dark)' : 'var(--surface-subtle)',
        border: dark ? 'none' : '1px solid var(--gray-200)',
        minWidth: 0,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          flex: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: dark ? 'rgba(255,255,255,0.08)' : 'var(--surface-card)',
        }}
      >
        <Icon name={icon} size={22} color={dark ? 'var(--accent)' : 'var(--text-primary)'} />
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 'var(--fs-body)', color: dark ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)', marginBottom: 6 }}>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span
            style={{
              fontSize: 'var(--fs-h2)',
              fontWeight: 'var(--fw-bold)',
              color: dark ? 'var(--text-inverse)' : 'var(--text-primary)',
              lineHeight: 'var(--lh-tight)',
            }}
          >
            {value}
          </span>
          {trend && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 'var(--fs-xs)',
                fontWeight: 'var(--fw-semibold)',
                color: up ? 'var(--success)' : 'var(--danger)',
              }}
            >
              <Icon name={up ? 'trending-up' : 'trending-down'} size={14} />
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
