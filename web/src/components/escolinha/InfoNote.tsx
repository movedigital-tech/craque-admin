import type { ReactNode } from 'react';
import { Icon } from '../ds';

export interface InfoNoteProps {
  children: ReactNode;
}

export function InfoNote({ children }: InfoNoteProps) {
  return (
    <div style={{ padding: '13px 15px', background: 'var(--info-tint)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--info)' }}>
      <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
        <Icon name="info" size={15} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
        <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{children}</p>
      </div>
    </div>
  );
}
