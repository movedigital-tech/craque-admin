"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button, Card, Icon, Input } from '@/components/ds';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, schoolName }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const firstError = data?.error ? Object.values(data.error).flat()[0] : null;
      setError(typeof firstError === 'string' ? firstError : 'Não foi possível criar a conta.');
      setLoading(false);
      return;
    }

    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError('Conta criada, mas não foi possível entrar automaticamente. Faça login.');
      router.push('/escolinha/login');
      return;
    }
    router.push('/onboarding');
  }

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-canvas)', padding: 24 }}>
      <Card style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 24 }}>
          <span style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="trophy" size={18} style={{ color: 'var(--navy-900)' }} />
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.01em' }}>Craque</span>
        </div>
        <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)' }}>Criar sua escolinha</h2>
        <p style={{ margin: '0 0 24px', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
          7 dias grátis, sem cartão de crédito.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Seu nome" placeholder="Ex.: Carla Mendes" leadingIcon="user" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="E-mail" type="email" placeholder="voce@escolinha.com" leadingIcon="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Senha" type="password" placeholder="Mínimo 8 caracteres" leadingIcon="lock" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input label="Nome da escolinha" placeholder="Ex.: FC Estrela" leadingIcon="building-2" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
          {error && <p style={{ margin: 0, color: 'var(--danger)', fontSize: 'var(--fs-sm)' }}>{error}</p>}
          <Button variant="primary" size="lg" fullWidth leadingIcon="rocket" onClick={handleSubmit} disabled={loading} style={{ marginTop: 6 }}>
            {loading ? 'Criando conta…' : 'Criar conta'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
