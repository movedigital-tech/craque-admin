import type { CSSProperties } from 'react';
import { Avatar, Badge, Card } from '@/components/ds';

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

const staff: { name: string; email: string; role: 'ADMIN' | 'SUPPORT' }[] = [
  { name: 'Ricardo Antunes', email: 'ricardo@movedigital.com.br', role: 'ADMIN' },
  { name: 'Equipe de Suporte', email: 'suporte@craque.app', role: 'SUPPORT' },
];

export default function UsuariosPage() {
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Membro da equipe', 'E-mail', 'Papel'].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.email}>
              <td style={td}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar name={s.name} size={34} />
                  <span style={{ fontWeight: 'var(--fw-semibold)' }}>{s.name}</span>
                </div>
              </td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.email}</td>
              <td style={td}>
                <Badge tone={s.role === 'ADMIN' ? 'success' : 'neutral'}>{s.role}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: 8 }} />
    </Card>
  );
}
