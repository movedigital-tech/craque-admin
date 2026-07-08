"use client";

import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Icon } from './Icon';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: string;
  trailingIcon?: string;
}

export function Input({
  label,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  type = 'text',
  disabled = false,
  id,
  style,
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-default)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 50,
          padding: '0 16px',
          background: disabled ? 'var(--surface-muted)' : 'var(--surface-card)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus && !error ? '0 0 0 3px var(--accent-tint)' : 'none',
          transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      >
        {leadingIcon && <Icon name={leadingIcon} size={18} color="var(--gray-500)" />}
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--fs-body)',
            color: 'var(--text-primary)',
            minWidth: 0,
          }}
          {...rest}
        />
        {trailingIcon && <Icon name={trailingIcon} size={18} color="var(--gray-500)" />}
      </div>
      {(hint || error) && (
        <span style={{ fontSize: 'var(--fs-xs)', color: error ? 'var(--danger)' : 'var(--text-secondary)' }}>{error || hint}</span>
      )}
    </div>
  );
}
