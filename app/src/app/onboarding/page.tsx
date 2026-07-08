import Link from 'next/link';
import { Button, Card, Icon } from '@/components/ds';
import { requireOrgContext } from '@/lib/tenant';

export default async function OnboardingPage() {
  const { organization } = await requireOrgContext();

  const steps: { icon: string; title: string; sub: string; href: string }[] = [
    { icon: 'goal', title: 'Criar sua primeira turma', sub: 'Categoria, agenda e local', href: '/escolinha/turmas/novo' },
    { icon: 'user-plus', title: 'Cadastrar o primeiro aluno', sub: 'Convide o responsável junto', href: '/escolinha/alunos/novo' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-canvas)', padding: 24 }}>
      <Card style={{ width: '100%', maxWidth: 560 }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)' }}>
          Bem-vindo(a), {organization.name} 👋
        </h2>
        <p style={{ margin: '0 0 24px', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
          Sua conta e o período de teste já estão ativos. Falta pouco para começar a operar no dia a dia.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {steps.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 0',
                borderBottom: i < steps.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--accent-tint)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name={s.icon} size={19} style={{ color: 'var(--success)' }} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{s.title}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{s.sub}</div>
              </div>
              <Icon name="arrow-right" size={16} style={{ color: 'var(--gray-500)' }} />
            </Link>
          ))}
        </div>
        <Link href="/escolinha/home" style={{ display: 'block', marginTop: 20 }}>
          <Button variant="primary" size="md" fullWidth leadingIcon="arrow-right">
            Ir para o painel
          </Button>
        </Link>
      </Card>
    </div>
  );
}
