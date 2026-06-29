import { useState } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { Icon } from './Icon';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  hint?: string;
  options?: (string | SelectOption)[];
  onChange?: SelectHTMLAttributes<HTMLSelectElement>['onChange'];
  placeholder?: string;
}

export function Select({
  label,
  hint,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Selecione…',
  disabled = false,
  id,
  style,
  ...rest
}: SelectProps) {
  const [focus, setFocus] = useState(false);
  const selectId = id || (label ? `sel-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const opts: SelectOption[] = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: 50,
          padding: '0 16px',
          background: disabled ? 'var(--surface-muted)' : 'var(--surface-card)',
          border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus ? '0 0 0 3px var(--accent-tint)' : 'none',
          transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      >
        <select
          id={selectId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            appearance: 'none',
            WebkitAppearance: 'none',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--fs-body)',
            color: value || defaultValue ? 'var(--text-primary)' : 'var(--text-secondary)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            paddingRight: 24,
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={18} color="var(--gray-500)" style={{ position: 'absolute', right: 16, pointerEvents: 'none' }} />
      </div>
      {hint && <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{hint}</span>}
    </div>
  );
}
