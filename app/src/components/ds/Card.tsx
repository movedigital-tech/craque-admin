import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  padding?: number;
  variant?: 'default' | 'dark';
}

export function Card({ children, title, subtitle, action, padding = 24, variant = 'default', style, ...rest }: CardProps) {
  const dark = variant === 'dark';
  const cardStyle: CSSProperties = {
    background: dark ? 'var(--surface-dark)' : 'var(--surface-card)',
    color: dark ? 'var(--text-inverse)' : 'var(--text-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: dark ? 'none' : 'var(--shadow-card)',
    border: dark ? 'none' : '1px solid var(--gray-200)',
    padding,
    ...style,
  };
  return (
    <section style={cardStyle} {...rest}>
      {(title || action) && (
        <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
          <div>
            {title && (
              <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', fontFamily: 'var(--font-ui)', lineHeight: 'var(--lh-snug)' }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ margin: '4px 0 0', fontSize: 'var(--fs-sm)', color: dark ? 'rgba(255,255,255,0.6)' : 'var(--text-secondary)' }}>
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
