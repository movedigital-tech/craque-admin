"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Icon } from '@/components/ds';

function Field({ label, type, placeholder, value, onChange }: { label: string; type: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{ fontSize: 13, fontWeight: 'var(--fw-semibold)', color: 'var(--text-primary)' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          height: 48,
          padding: '0 15px',
          border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-default)'}`,
          borderRadius: 12,
          background: 'var(--surface-card)',
          fontFamily: 'var(--font-ui)',
          fontSize: 15,
          color: 'var(--text-primary)',
          outline: 'none',
          boxShadow: focus ? '0 0 0 3px var(--accent-tint)' : 'none',
          transition: 'all .14s',
        }}
      />
    </div>
  );
}

export default function InstrutorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError('');
    setLoading(true);
    const result = await signIn('credentials', { email, password: pw, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('E-mail ou senha inválidos.');
      return;
    }
    router.push('/instrutor/home');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-canvas)',
        padding: 24,
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span
            style={{
              width: 66,
              height: 66,
              borderRadius: 19,
              background: 'var(--navy-900)',
              display: 'inline-grid',
              placeItems: 'center',
              marginBottom: 16,
            }}
          >
            <Icon name="clipboard-list" size={32} style={{ color: 'var(--accent)' }} />
          </span>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26, lineHeight: 1 }}>Craque</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>Área do instrutor</div>
          <div style={{ fontSize: 20, fontWeight: 'var(--fw-bold)', lineHeight: 1.3, marginTop: 20, maxWidth: 300, margin: '20px auto 0' }}>
            Chamada, turmas e alunos em um só lugar.
          </div>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="E-mail" type="email" placeholder="voce@email.com" value={email} onChange={setEmail} />
          <Field label="Senha" type="password" placeholder="••••••••" value={pw} onChange={setPw} />

          {error && <p style={{ margin: 0, color: 'var(--danger)', fontSize: 'var(--fs-sm)' }}>{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              height: 52,
              borderRadius: 14,
              background: 'var(--accent)',
              color: 'var(--navy-900)',
              fontFamily: 'var(--font-ui)',
              fontSize: 16,
              fontWeight: 'var(--fw-bold)',
              border: 'none',
              cursor: loading ? 'default' : 'pointer',
              marginTop: 4,
              opacity: loading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Icon name="log-in" size={18} style={{ color: 'var(--navy-900)' }} />
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </div>

        {/* Note */}
        <div
          style={{
            marginTop: 24,
            padding: '13px 14px',
            background: 'var(--info-tint)',
            borderRadius: 12,
            borderLeft: '3px solid var(--info)',
            display: 'flex',
            gap: 9,
            alignItems: 'flex-start',
          }}
        >
          <Icon name="info" size={15} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Seu acesso é criado pela <strong>escolinha</strong>. Verifique o convite no e-mail ou WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
