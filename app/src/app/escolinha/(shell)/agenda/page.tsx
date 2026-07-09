import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Badge, Button, Card } from '@/components/ds';
import { db } from '@/lib/db';
import { requireOrgContext } from '@/lib/tenant';
import { scheduleLabel } from '@/lib/schedule';
import { formatDate } from '@/lib/format';
import { generateTodaySession } from '@/server/actions/presenca';

const th: CSSProperties = {
  padding: '24px',
  textAlign: 'left',
  fontSize: 'var(--fs-xs)',
  fontWeight: 'var(--fw-semibold)',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  borderBottom: '1px solid var(--border-subtle)',
  whiteSpace: 'nowrap',
};

const td: CSSProperties = {
  padding: '14px 24px',
  fontSize: 'var(--fs-body)',
  borderBottom: '1px solid var(--gray-100)',
};

export default async function EscolinhaAgendaPage() {
  const { organization } = await requireOrgContext();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const [sessions, classGroups] = await Promise.all([
    db.classSession.findMany({
      where: { classGroup: { organizationId: organization.id } },
      include: { classGroup: { include: { schoolUnit: true, teacher: { include: { user: true } } } }, _count: { select: { attendances: true } } },
      orderBy: { date: 'desc' },
      take: 20,
    }),
    db.classGroup.findMany({
      where: { organizationId: organization.id },
      include: { schoolUnit: true, teacher: { include: { user: true } }, sessions: { where: { date: { gte: startOfToday, lt: startOfTomorrow } } } },
      orderBy: { name: 'asc' },
    }),
  ]);

  const turmasSemAulaHoje = classGroups.filter((c) => c.sessions.length === 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {turmasSemAulaHoje.length > 0 && (
        <Card title="Turmas sem aula gerada hoje">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {turmasSemAulaHoje.map((c, i) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: i < turmasSemAulaHoje.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div>
                  <div style={{ fontWeight: 'var(--fw-semibold)' }}>{c.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{scheduleLabel(c.weekdays, c.startTime, c.endTime)}</div>
                </div>
                <form action={generateTodaySession.bind(null, c.id)}>
                  <Button type="submit" variant="secondary" size="sm" leadingIcon="plus">Gerar aula de hoje</Button>
                </form>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card padding={0} style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Turma', 'Data', 'Horário', 'Local', 'Professor', ''].map((h) => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td style={{ ...td, color: 'var(--text-secondary)' }} colSpan={6}>Nenhuma aula gerada ainda.</td>
              </tr>
            ) : (
              sessions.map((s) => (
                <tr key={s.id}>
                  <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{s.classGroup.name}</td>
                  <td style={td}>
                    <Badge tone="neutral">{formatDate(s.date)}</Badge>
                  </td>
                  <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.startTime ?? '—'}{s.endTime ? `–${s.endTime}` : ''}</td>
                  <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.classGroup.schoolUnit.name}</td>
                  <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.classGroup.teacher?.user.name ?? '—'}</td>
                  <td style={{ ...td, textAlign: 'right' }}>
                    <Link href={`/escolinha/agenda/${s.id}/chamada`}>
                      <Button variant="ghost" size="sm" leadingIcon="clipboard-check">
                        {s._count.attendances > 0 ? 'Ver chamada' : 'Fazer chamada'}
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ height: 8 }} />
      </Card>
    </div>
  );
}
