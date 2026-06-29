import { useState } from 'react';
import type { LabelHTMLAttributes, ReactNode } from 'react';

export interface ToggleProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
}

export function Toggle({ checked, defaultChecked, onChange, label, disabled = false, style, ...rest }: ToggleProps) {
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
          width: 42,
          height: 24,
          borderRadius: 'var(--radius-pill)',
          flex: 'none',
          background: on ? 'var(--accent)' : 'var(--gray-300)',
          position: 'relative',
          transition: 'background var(--dur-normal) var(--ease-standard)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: on ? 21 : 3,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'var(--white)',
            boxShadow: 'var(--shadow-xs)',
            transition: 'left var(--dur-normal) var(--ease-out)',
          }}
        />
      </span>
      {label}
    </label>
  );
}
