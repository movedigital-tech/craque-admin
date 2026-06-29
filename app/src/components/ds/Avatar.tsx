import type { CSSProperties, HTMLAttributes } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: number;
  status?: 'online' | 'busy' | 'away';
  ring?: boolean;
}

const STATUS_COLOR: Record<string, string> = {
  online: 'var(--success)',
  busy: 'var(--danger)',
  away: 'var(--attention)',
};

export function Avatar({ src, name = '', size = 40, status, ring = false, style, ...rest }: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const wrapperStyle: CSSProperties = { position: 'relative', display: 'inline-flex', flex: 'none', ...style };

  return (
    <span style={wrapperStyle} {...rest}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--surface-muted)',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-ui)',
          fontWeight: 'var(--fw-semibold)',
          fontSize: Math.round(size * 0.38),
          border: ring ? '2px solid var(--surface-card)' : 'none',
          boxShadow: ring ? '0 0 0 1px var(--border-subtle)' : 'none',
        }}
      >
        {src ? (
          <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          initials || '?'
        )}
      </span>
      {status && (
        <span
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: Math.max(8, size * 0.28),
            height: Math.max(8, size * 0.28),
            borderRadius: '50%',
            background: STATUS_COLOR[status] || 'var(--gray-500)',
            border: '2px solid var(--surface-card)',
          }}
        />
      )}
    </span>
  );
}
