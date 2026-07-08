import Link from 'next/link';
import { db } from '@/lib/db';
import { requireInstrutorContext } from '@/lib/tenant';
import { Badge, Icon } from '@/components/ds';
import { generateInstrutorSession } from '@/server/actions/instrutor';

export default async function InstrutorChamadaPage() {
  const { membership, organization } = await requireInstrutorContext();

  const turmas = await db.classGroup.findMany({
    where: { teacherMembershipId: membership.id, organizationId: organization.id, status: 'ACTIVE' },
    orderBy: { name: 'asc' },
  });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const todaySessions = await db.classSession.findMany({
    where: {
      date: { gte: startOfToday, lt: startOfTomorrow },
      classGroup: { teacherMembershipId: membership.id, organizationId: organization.id },
    },
    include: { classGroup: true, _count: { select: { attendances: true } } },
  });

  const sessionByGroup = new Map(todaySessions.map((s) => [s.classGroupId, s]));

  return (
    <div>
      <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 20, marginBottom: 6 }}>Chamada</div>
      <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: 20 }}>
        {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
      </div>

      {turmas.length === 0 ? (
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 24, textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
            Nenhuma turma atribuída.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {turmas.map((t) => {
            const session = sessionByGroup.get(t.id);
            return (
              <div
                key={t.id}
                style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 18, padding: 18, boxShadow: 'var(--shadow-card)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--navy-900)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Icon name="goal" size={22} style={{ color: '#fff' }} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 16 }}>{t.name}</div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{t.startTime ?? '—'}</div>
                  </div>
                  {session ? (
                    <Badge tone={session._count.attendances > 0 ? 'success' : 'warning'} dot>
                      {session._count.attendances > 0 ? 'Feita' : 'Pendente'}
                    </Badge>
                  ) : (
                    <Badge tone="neutral">Sem sessão</Badge>
                  )}
                </div>

                {session ? (
                  <Link
                    href={`/instrutor/chamada/${session.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      width: '100%',
                      height: 44,
                      borderRadius: 12,
                      border: '1px solid var(--border-default)',
                      background: 'var(--surface-card)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 14,
                      fontWeight: 'var(--fw-bold)',
                    }}
                  >
                    <Icon name="clipboard-check" size={16} />
                    {session._count.attendances > 0 ? 'Ver / editar chamada' : 'Fazer chamada'}
                  </Link>
                ) : (
                  <form action={generateInstrutorSession.bind(null, t.id)}>
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        height: 44,
                        borderRadius: 12,
                        background: 'var(--accent)',
                        color: 'var(--navy-900)',
                        fontFamily: 'var(--font-ui)',
                        fontSize: 14,
                        fontWeight: 'var(--fw-bold)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <Icon name="plus" size={16} style={{ color: 'var(--navy-900)' }} />
                      Iniciar chamada de hoje
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
