import { useState } from 'react';
import type { LabelHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';

export interface CheckboxProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
}

export function Checkbox({ checked, defaultChecked, onChange, label, disabled = false, style, ...rest }: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(!!defaultChecked);
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal((v) => !v);
    onChange?.(!on);
  };

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-body)',
        color: 'var(--text-primary)',
        userSelect: 'none',
        ...style,
      }}
      {...rest}
    >
      <span
        onClick={toggle}
        style={{
          width: 20,
          height: 20,
          borderRadius: 6,
          flex: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: on ? 'var(--accent)' : 'var(--surface-card)',
          border: `1.5px solid ${on ? 'var(--accent)' : 'var(--border-default)'}`,
          transition: 'background var(--dur-fast), border-color var(--dur-fast)',
        }}
      >
        {on && <Icon name="check" size={14} color="var(--text-on-accent)" />}
      </span>
      {label}
    </label>
  );
}
