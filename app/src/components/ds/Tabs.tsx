"use client";

import { useState } from 'react';
import type { HTMLAttributes } from 'react';

export interface TabItem {
  value: string;
  label: string;
  count?: number;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs?: (string | TabItem)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function Tabs({ tabs = [], value, defaultValue, onChange, style, ...rest }: TabsProps) {
  const items: TabItem[] = tabs.map((t) => (typeof t === 'string' ? { value: t, label: t } : t));
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value);
  const active = isControlled ? value : internal;

  const select = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div style={{ display: 'flex', gap: 28, borderBottom: '1px solid var(--border-subtle)', ...style }} {...rest}>
      {items.map((t) => {
        const on = t.value === active;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => select(t.value)}
            style={{
              position: 'relative',
              border: 'none',
              background: 'transparent',
              padding: '0 0 14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontSize: 'var(--fs-body)',
              fontWeight: on ? 'var(--fw-semibold)' : 'var(--fw-medium)',
              color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
              transition: 'color var(--dur-fast)',
            }}
          >
            {t.label}
            {t.count != null && (
              <span
                style={{
                  marginLeft: 8,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-semibold)',
                  background: on ? 'var(--accent-tint)' : 'var(--surface-muted)',
                  color: on ? '#6E8B00' : 'var(--text-secondary)',
                }}
              >
                {t.count}
              </span>
            )}
            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -1,
                height: 2,
                borderRadius: 2,
                background: on ? 'var(--accent)' : 'transparent',
                transition: 'background var(--dur-fast)',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
