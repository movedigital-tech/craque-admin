import { useState } from 'react';
import type { HTMLAttributes } from 'react';
import { Icon } from './Icon';

export interface SidebarNavItem {
  key: string;
  label: string;
  icon: string;
}

export interface SidebarNavProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  brand?: string;
  logoSrc?: string;
  items?: SidebarNavItem[];
  footerItems?: SidebarNavItem[];
  activeKey?: string;
  onSelect?: (key: string) => void;
}

function NavButton({ item, active, onSelect }: { item: SidebarNavItem; active: boolean; onSelect?: (key: string) => void }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item.key)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        height: 52,
        padding: '0 18px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        textAlign: 'left',
        fontFamily: 'var(--font-ui)',
        fontSize: 'var(--fs-body)',
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        background: active ? 'var(--accent)' : hover ? 'var(--surface-muted)' : 'transparent',
        color: active ? 'var(--text-on-accent)' : 'var(--text-secondary)',
        transition: 'background var(--dur-fast), color var(--dur-fast)',
      }}
    >
      <Icon name={item.icon} size={20} />
      {item.label}
    </button>
  );
}

export function SidebarNav({ brand = 'Campo', logoSrc, items = [], footerItems = [], activeKey, onSelect, style, ...rest }: SidebarNavProps) {
  return (
    <nav
      style={{
        width: 'var(--sidebar-width)',
        height: '100%',
        boxSizing: 'border-box',
        background: 'var(--surface-sidebar)',
        borderRight: '1px solid var(--border-subtle)',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 6px' }}>
        {logoSrc ? (
          <img src={logoSrc} alt={brand} style={{ width: 32, height: 32, borderRadius: 9 }} />
        ) : (
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: 'var(--navy-900)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            {brand[0]}
          </span>
        )}
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--text-primary)' }}>{brand}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {items.map((it) => (
          <NavButton key={it.key} item={it} active={it.key === activeKey} onSelect={onSelect} />
        ))}
      </div>
      {footerItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {footerItems.map((it) => (
            <NavButton key={it.key} item={it} active={it.key === activeKey} onSelect={onSelect} />
          ))}
        </div>
      )}
    </nav>
  );
}
