"use client";

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Icon } from './Icon';

export type ToastTone = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TONE_STYLES: Record<ToastTone, { background: string; color: string; icon: string }> = {
  success: { background: 'var(--navy-900)', color: '#fff', icon: 'check-circle-2' },
  error: { background: 'var(--danger)', color: '#fff', icon: 'alert-circle' },
  info: { background: 'var(--surface-card)', color: 'var(--text-primary)', icon: 'info' },
};

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 2000,
        }}
      >
        {toasts.map((t) => {
          const tone = TONE_STYLES[t.tone];
          return (
            <div
              key={t.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: tone.background,
                color: tone.color,
                border: t.tone === 'info' ? '1px solid var(--border-subtle)' : 'none',
                boxShadow: 'var(--shadow-lg)',
                fontFamily: 'var(--font-ui)',
                fontSize: 'var(--fs-sm)',
                fontWeight: 'var(--fw-medium)',
                minWidth: 240,
                maxWidth: 360,
              }}
            >
              <Icon name={tone.icon} size={17} style={{ flexShrink: 0 }} />
              {t.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
