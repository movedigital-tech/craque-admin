"use client";

import { useState } from 'react';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { Icon } from './Icon';

export type ButtonVariant = 'primary' | 'dark' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: string;
  trailingIcon?: string;
  fullWidth?: boolean;
}

const SIZES: Record<ButtonSize, { height: number; padding: string; fontSize: string; gap: number; icon: number }> = {
  sm: { height: 36, padding: '0 14px', fontSize: 'var(--fs-sm)', gap: 6, icon: 16 },
  md: { height: 44, padding: '0 20px', fontSize: 'var(--fs-body)', gap: 8, icon: 18 },
  lg: { height: 54, padding: '0 28px', fontSize: 'var(--fs-body-lg)', gap: 10, icon: 20 },
};

const VARIANTS: Record<ButtonVariant, { background: string; color: string; border: string }> = {
  primary: { background: 'var(--accent)', color: 'var(--text-on-accent)', border: '1px solid transparent' },
  dark: { background: 'var(--surface-dark)', color: 'var(--text-inverse)', border: '1px solid transparent' },
  secondary: { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' },
  ghost: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  danger: { background: 'var(--danger)', color: 'var(--text-inverse)', border: '1px solid transparent' },
};

const HOVER: Record<ButtonVariant, string> = {
  primary: 'var(--accent-hover)',
  dark: '#2A323F',
  secondary: 'var(--surface-muted)',
  ghost: 'var(--surface-muted)',
  danger: '#C70017',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  fullWidth = false,
  disabled = false,
  type = 'button',
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const s = SIZES[size];
  const v = VARIANTS[variant];

  const buttonStyle: CSSProperties = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: 'var(--font-ui)',
    fontWeight: 'var(--fw-semibold)',
    lineHeight: 1,
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-standard), box-shadow var(--dur-normal) var(--ease-standard)',
    background: hover && !disabled ? HOVER[variant] : v.background,
    color: v.color,
    border: v.border,
    boxShadow: variant === 'primary' && hover && !disabled ? 'var(--shadow-accent)' : 'none',
    whiteSpace: 'nowrap',
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={buttonStyle}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} size={s.icon} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={s.icon} />}
    </button>
  );
}
