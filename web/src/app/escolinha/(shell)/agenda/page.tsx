import type { CSSProperties } from 'react';
import { Badge, Button, Card } from '@/components/ds';
import { agendaSemana } from '@/data/escolinha';

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

export default function EscolinhaAgendaPage() {
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Turma', 'Dia', 'Horário', 'Local', 'Professor', 'Alunos', ''].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {agendaSemana.map((s, i) => (
            <tr key={i}>
              <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{s.turma}</td>
              <td style={td}>
                <Badge tone="neutral">{s.dia} · {s.data}</Badge>
              </td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.hora}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.local}</td>
              <td style={{ ...td, color: 'var(--text-secondary)' }}>{s.prof}</td>
              <td style={td}>{s.alunos}</td>
              <td style={{ ...td, textAlign: 'right' }}>
                <Button variant="ghost" size="sm" leadingIcon="clipboard-check">
                  Fazer chamada
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ height: 8 }} />
    </Card>
  );
}
