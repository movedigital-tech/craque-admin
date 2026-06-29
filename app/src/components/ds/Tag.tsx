import type { CSSProperties, HTMLAttributes } from 'react';
import { Icon } from './Icon';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
  icon?: string;
  removable?: boolean;
  onRemove?: () => void;
}

export function Tag({ children, selected = false, icon, onClick, removable = false, onRemove, style, ...rest }: TagProps) {
  const interactive = !!onClick;
  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 32,
    padding: '0 12px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-ui)',
    fontSize: 'var(--fs-sm)',
    fontWeight: 'var(--fw-medium)',
    cursor: interactive ? 'pointer' : 'default',
    userSelect: 'none',
    background: selected ? 'var(--accent)' : 'var(--surface-card)',
    color: selected ? 'var(--text-on-accent)' : 'var(--text-secondary)',
    border: selected ? '1px solid transparent' : '1px solid var(--border-subtle)',
    transition: 'background var(--dur-fast) var(--ease-standard)',
    ...style,
  };

  return (
    <span onClick={onClick} style={tagStyle} {...rest}>
      {icon && <Icon name={icon} size={15} />}
      {children}
      {removable && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          style={{ display: 'inline-flex', cursor: 'pointer', opacity: 0.7 }}
        >
          <Icon name="x" size={14} />
        </span>
      )}
    </span>
  );
}
