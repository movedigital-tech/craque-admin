import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Badge, Card } from '@/components/ds';
import { db } from '@/lib/db';
import { orgStatusMap } from '@/lib/statusMaps';
import { formatDate } from '@/lib/format';

const th: CSSProperties = {
  padding: '14px 24px',
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

export default async function OrganizationsPage() {
  const organizations = await db.organization.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      memberships: { where: { role: 'OWNER' }, include: { user: true }, take: 1 },
      _count: { select: { students: true } },
    },
  });

  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Organização', 'Responsável', 'Status', 'Alunos', 'Criada em', ''].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {organizations.map((o) => (
            <tr key={o.id}>
              <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>
                {o.name}
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', fontWeight: 400 }}>{o.city ?? '—'}</div>
              </td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{o.memberships[0]?.user.name ?? '—'}</td>
              <td style={td}>
                <Badge tone={orgStatusMap[o.status].tone} dot>{orgStatusMap[o.status].label}</Badge>
              </td>
              <td style={td}>{o._count.students}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{formatDate(o.createdAt)}</td>
              <td style={{ ...td, textAlign: 'right' }}>
                <Link href={`/organizations/${o.id}`} style={{ color: 'var(--text-link)', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)' }}>
                  Ver detalhe
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: 8 }} />
    </Card>
  );
}
