import Link from 'next/link';
import { db } from '@/lib/db';
import { requireInstrutorContext } from '@/lib/tenant';
import { Badge, Icon } from '@/components/ds';

function MiniStat({ icon, val, label, tint, ink }: { icon: string; val: string; label: string; tint: string; ink: string }) {
  return (
    <div style={{ flex: 1, background: tint, border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
      <Icon name={icon as any} size={22} style={{ color: ink, display: 'block', margin: '0 auto 6px' }} />
      <div style={{ fontSize: 24, fontWeight: 'var(--fw-bold)', color: ink, lineHeight: 1 }}>{val}</div>
      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function todayLabel() {
  return new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });
}

export default async function InstrutorHomePage() {
  const { user, membership, organization } = await requireInstrutorContext();

  const firstName = user.name.split(' ')[0];

  const turmas = await db.classGroup.findMany({
    where: { teacherMembershipId: membership.id, organizationId: organization.id, status: 'ACTIVE' },
    include: { _count: { select: { enrollments: { where: { status: 'ACTIVE' } } } } },
    orderBy: { name: 'asc' },
  });

  const totalAlunos = turmas.reduce((acc, t) => acc + t._count.enrollments, 0);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const todaySessionCount = await db.classSession.count({
    where: {
      date: { gte: startOfToday, lt: startOfTomorrow },
      classGroup: { teacherMembershipId: membership.id, organizationId: organization.id },
    },
  });

  const QUICK_ACTIONS = [
    { icon: 'clipboard-check', label: 'Chamada', href: '/instrutor/chamada' },
    { icon: 'users', label: 'Turmas', href: '/instrutor/turmas' },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0 20px' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 'var(--fw-bold)' }}>Olá, {firstName}! 👋</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{todayLabel()}</div>
        </div>
      </div>

      {/* Org card */}
      <div
        style={{
          background: 'var(--navy-900)',
          color: '#fff',
          borderRadius: 18,
          padding: 18,
          marginBottom: 18,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: 'rgba(255,255,255,.12)',
            border: '1px solid rgba(255,255,255,.2)',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
          }}
        >
          <Icon name="shield" size={26} style={{ color: 'rgba(255,255,255,.85)' }} />
        </span>
        <div>
          <div style={{ fontSize: 17, fontWeight: 'var(--fw-bold)' }}>{organization.name}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.6)' }}>Instrutor(a)</div>
        </div>
      </div>

      {/* Mini stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <MiniStat icon="goal" val={String(turmas.length)} label="Turmas ativas" tint="var(--surface-muted)" ink="var(--text-primary)" />
        <MiniStat icon="users" val={String(totalAlunos)} label="Total de alunos" tint="var(--accent-tint)" ink="var(--success)" />
        <MiniStat icon="calendar-check" val={String(todaySessionCount)} label="Treino hoje" tint="var(--warning-tint)" ink="var(--warning)" />
      </div>

      {/* Turmas list */}
      <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 15, margin: '0 2px 10px' }}>Suas turmas</div>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: '4px 16px', marginBottom: 18, boxShadow: 'var(--shadow-card)' }}>
        {turmas.length === 0 ? (
          <p style={{ padding: '16px 0', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
            Nenhuma turma atribuída ainda.
          </p>
        ) : (
          turmas.map((t, i) => (
            <Link
              key={t.id}
              href={`/instrutor/turmas/${t.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '13px 0',
                borderBottom: i < turmas.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <span style={{ width: 40, height: 40, borderRadius: 11, background: 'var(--surface-muted)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name="goal" size={19} style={{ color: 'var(--text-secondary)' }} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 15 }}>{t.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{t.ageRange}</div>
              </div>
              <Badge tone="neutral">{t._count.enrollments} alunos</Badge>
              <Icon name="chevron-right" size={16} style={{ color: 'var(--gray-500)' }} />
            </Link>
          ))
        )}
      </div>

      {/* Quick actions */}
      <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 15, margin: '0 2px 10px' }}>Ações rápidas</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {QUICK_ACTIONS.map(({ icon, label, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 18,
              padding: '18px 8px',
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <span style={{ width: 46, height: 46, borderRadius: 13, background: 'var(--surface-muted)', display: 'inline-grid', placeItems: 'center', marginBottom: 8 }}>
              <Icon name={icon as any} size={22} style={{ color: 'var(--text-secondary)' }} />
            </span>
            <div style={{ fontSize: 13, fontWeight: 'var(--fw-bold)' }}>{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
