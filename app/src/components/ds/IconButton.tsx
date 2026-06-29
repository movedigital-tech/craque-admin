import { useState } from 'react';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { Icon } from './Icon';

export type IconButtonVariant = 'soft' | 'outline' | 'ghost' | 'accent';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  round?: boolean;
  ariaLabel?: string;
}

const SIZES: Record<IconButtonSize, number> = { sm: 36, md: 44, lg: 52 };
const ICON: Record<IconButtonSize, number> = { sm: 16, md: 20, lg: 22 };

const VARIANTS: Record<IconButtonVariant, { background: string; color: string; border: string; hover: string }> = {
  soft: { background: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid transparent', hover: '#ECECEF' },
  outline: { background: 'var(--surface-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)', hover: 'var(--surface-muted)' },
  ghost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid transparent', hover: 'var(--surface-muted)' },
  accent: { background: 'var(--accent)', color: 'var(--text-on-accent)', border: '1px solid transparent', hover: 'var(--accent-hover)' },
};

export function IconButton({ icon, variant = 'soft', size = 'md', round = false, disabled = false, ariaLabel, style, ...rest }: IconButtonProps) {
  const [hover, setHover] = useState(false);
  const dim = SIZES[size];
  const v = VARIANTS[variant];

  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim,
    height: dim,
    borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)',
    background: hover && !disabled ? v.hover : v.background,
    color: v.color,
    border: v.border,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard)',
    ...style,
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={buttonStyle}
      {...rest}
    >
      <Icon name={icon} size={ICON[size]} />
    </button>
  );
}
