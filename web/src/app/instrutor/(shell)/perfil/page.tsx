import Link from 'next/link';
import { db } from '@/lib/db';
import { requireInstrutorContext } from '@/lib/tenant';
import { Avatar, Badge, Icon } from '@/components/ds';
import { InstrutorSignOut } from '@/components/instrutor/InstrutorSignOut';

export default async function InstrutorPerfilPage() {
  const { user, membership, organization } = await requireInstrutorContext();

  const turmas = await db.classGroup.findMany({
    where: { teacherMembershipId: membership.id, organizationId: organization.id, status: 'ACTIVE' },
    include: { _count: { select: { enrollments: { where: { status: 'ACTIVE' } } } } },
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      {/* Profile card */}
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 18, display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, boxShadow: 'var(--shadow-card)' }}>
        <Avatar name={user.name} size={56} />
        <div>
          <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 18 }}>{user.name}</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{user.email}</div>
          <div style={{ marginTop: 6 }}>
            <Badge tone="neutral">{membership.role === 'TEACHER' ? 'Instrutor(a)' : membership.role === 'OWNER' ? 'Coordenador(a)' : 'Gestor(a)'}</Badge>
          </div>
        </div>
      </div>

      {/* My turmas */}
      <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 15, margin: '0 2px 10px' }}>Minhas turmas</div>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: '4px 16px', marginBottom: 20, boxShadow: 'var(--shadow-card)' }}>
        {turmas.length === 0 ? (
          <p style={{ padding: '16px 0', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Nenhuma turma atribuída.</p>
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
                <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 14 }}>{t.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{t.ageRange}</div>
              </div>
              <Badge tone="neutral">{t._count.enrollments} alunos</Badge>
            </Link>
          ))
        )}
      </div>

      {/* Org */}
      <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 15, margin: '0 2px 10px' }}>Escolinha</div>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: '4px 16px', marginBottom: 20, boxShadow: 'var(--shadow-card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', fontSize: 14 }}>
          <span style={{ color: 'var(--text-secondary)' }}>Nome</span>
          <strong style={{ textAlign: 'right', color: 'var(--text-primary)' }}>{organization.name}</strong>
        </div>
      </div>

      {/* Sign out */}
      <InstrutorSignOut />
    </div>
  );
}
