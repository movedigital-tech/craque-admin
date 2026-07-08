import Link from 'next/link';
import { db } from '@/lib/db';
import { requireInstrutorContext } from '@/lib/tenant';
import { Badge, Icon } from '@/components/ds';

export default async function InstrutorTurmasPage() {
  const { membership, organization } = await requireInstrutorContext();

  const turmas = await db.classGroup.findMany({
    where: { teacherMembershipId: membership.id, organizationId: organization.id, status: 'ACTIVE' },
    include: { _count: { select: { enrollments: { where: { status: 'ACTIVE' } } } } },
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 20, marginBottom: 20 }}>Minhas turmas</div>

      {turmas.length === 0 ? (
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 24, textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
            Nenhuma turma atribuída. Contate a administração.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {turmas.map((t) => (
            <Link
              key={t.id}
              href={`/instrutor/turmas/${t.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 18, boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: 'var(--navy-900)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="goal" size={22} style={{ color: '#fff' }} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 16 }}>{t.name}</div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{t.ageRange}</div>
                  </div>
                  <Badge tone="neutral">{t._count.enrollments} alunos</Badge>
                  <Icon name="chevron-right" size={18} style={{ color: 'var(--gray-500)' }} />
                </div>
                {(t.weekday || t.startTime) && (
                  <div
                    style={{
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      gap: 6,
                      alignItems: 'center',
                      color: 'var(--text-secondary)',
                      fontSize: 13,
                    }}
                  >
                    <Icon name="calendar" size={14} />
                    {[t.weekday, t.startTime && t.endTime ? `${t.startTime}–${t.endTime}` : t.startTime].filter(Boolean).join(' · ')}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
