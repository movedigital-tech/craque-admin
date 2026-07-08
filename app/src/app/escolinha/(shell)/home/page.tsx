import { Avatar, Badge, Card, StatCard } from '@/components/ds';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { weekdayShortLabel } from '@/lib/schedule';
import { presencaPercent } from '@/lib/attendance';

export default async function EscolinhaHomePage() {
  const { organization } = await requireOrgContext();

  const [studentCount, classGroups, staffCount, attendances, upcomingSessions] = await Promise.all([
    db.student.count({ where: { organizationId: organization.id, status: 'ACTIVE' } }),
    db.classGroup.findMany({
      where: { organizationId: organization.id, status: 'ACTIVE' },
      include: { teacher: { include: { user: true } }, _count: { select: { enrollments: { where: { status: 'ACTIVE' } } } } },
      orderBy: { name: 'asc' },
    }),
    db.membership.count({ where: { organizationId: organization.id, role: { in: ['TEACHER', 'MANAGER', 'OWNER'] }, status: 'ACTIVE' } }),
    db.attendance.findMany({ where: { session: { classGroup: { organizationId: organization.id } } } }),
    db.classSession.findMany({
      where: { classGroup: { organizationId: organization.id }, date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
      include: { classGroup: { include: { teacher: { include: { user: true } }, _count: { select: { enrollments: { where: { status: 'ACTIVE' } } } } } } },
      orderBy: { date: 'asc' },
      take: 4,
    }),
  ]);

  const present = attendances.filter((a) => a.status === 'PRESENT').length;
  const media = presencaPercent(present, attendances.length);

  const homeStats = [
    { icon: 'users', label: 'Alunos ativos', value: String(studentCount), trend: undefined, dir: 'up' as const, dark: false },
    { icon: 'goal', label: 'Turmas ativas', value: String(classGroups.length), trend: `${classGroups.reduce((sum, c) => sum + c.capacity, 0)} vagas no total`, dir: 'up' as const, dark: true },
    { icon: 'percent', label: 'Presença média', value: media.pct, trend: undefined, dir: 'up' as const, dark: false },
    { icon: 'graduation-cap', label: 'Professores', value: String(staffCount), trend: undefined, dir: 'up' as const, dark: false },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {homeStats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} trend={s.trend} trendDirection={s.dir} variant={s.dark ? 'dark' : 'default'} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
        <Card title="Turmas" subtitle="Visão geral das turmas ativas">
          {classGroups.length === 0 ? (
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhuma turma cadastrada ainda.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {classGroups.map((t, i) => (
                <div
                  key={t.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '13px 0',
                    borderBottom: i < classGroups.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Avatar name={t.name} size={36} />
                    <div>
                      <div style={{ fontWeight: 'var(--fw-semibold)' }}>{t.name}</div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{t.teacher?.user.name ?? 'Sem professor'}</div>
                    </div>
                  </div>
                  <Badge tone={t._count.enrollments >= t.capacity ? 'warning' : 'success'}>{t._count.enrollments}/{t.capacity} alunos</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card title="Próximas aulas" padding={24}>
          {upcomingSessions.length === 0 ? (
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Nenhuma aula agendada.</p>
          ) : (
            upcomingSessions.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < upcomingSessions.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ width: 46, height: 46, borderRadius: 10, background: 'var(--accent-tint)', display: 'grid', placeContent: 'center', textAlign: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 'var(--fw-bold)', color: 'var(--success)', lineHeight: 1 }}>{weekdayShortLabel(s.date.getDay())}</span>
                  <span style={{ fontSize: 13, fontWeight: 'var(--fw-bold)', lineHeight: 1.3 }}>{s.startTime ?? '—'}</span>
                </span>
                <div>
                  <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{s.classGroup.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>
                    {s.classGroup.teacher?.user.name ?? 'Sem professor'} · {s.classGroup._count.enrollments} alunos
                  </div>
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}
