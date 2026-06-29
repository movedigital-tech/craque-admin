import type { CSSProperties } from 'react';
import { Badge, Button, Card, Icon, Select } from '../../components/ds';
import { inadimplenciaRows, reportTypes } from '../../data/escolinha';

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

export function EscolinhaRelatorios() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr auto', alignItems: 'end', gap: 14 }}>
          <Select
            label="Tipo"
            defaultValue="fin"
            options={[
              { value: 'fin', label: 'Financeiro' },
              { value: 'inad', label: 'Inadimplência' },
              { value: 'pres', label: 'Presença' },
            ]}
          />
          <Select
            label="Turma"
            defaultValue="all"
            options={[
              { value: 'all', label: 'Todas' },
              { value: 'sub7', label: 'Sub-7' },
              { value: 'sub9', label: 'Sub-9' },
            ]}
          />
          <Select
            label="Período"
            defaultValue="abr"
            options={[
              { value: 'abr', label: 'Abril 2026' },
              { value: 'mar', label: 'Março 2026' },
            ]}
          />
          <Select
            label="Formato"
            defaultValue="csv"
            options={[
              { value: 'csv', label: 'CSV' },
              { value: 'pdf', label: 'PDF' },
              { value: 'xlsx', label: 'Excel' },
            ]}
          />
          <Button variant="primary" size="md" leadingIcon="download">
            Exportar
          </Button>
        </div>
      </Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {reportTypes.map((c) => (
          <Card key={c.name} padding={20} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--surface-muted)', display: 'grid', placeItems: 'center' }}>
                <Icon name={c.icon} size={20} style={{ color: 'var(--navy-900)' }} />
              </span>
              <Icon name="arrow-up-right" size={17} style={{ color: 'var(--gray-500)' }} />
            </div>
            <div style={{ fontWeight: 'var(--fw-bold)', marginTop: 12, fontSize: 'var(--fs-body)' }}>{c.name}</div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{c.sub}</div>
          </Card>
        ))}
      </div>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 14px' }}>
          <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', fontFamily: 'var(--font-ui)' }}>Prévia · Inadimplência</h3>
          <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Abril 2026</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Aluno', 'Turma', 'Responsável', 'Valor', 'Vencido há', 'Status'].map((h) => (
                <th key={h} style={th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inadimplenciaRows.map((r, i) => (
              <tr key={i}>
                <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{r.name}</td>
                <td style={td}>
                  <Badge tone="neutral">{r.turma}</Badge>
                </td>
                <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.resp}</td>
                <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{r.val}</td>
                <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.ha}</td>
                <td style={td}>
                  <Badge tone="danger" dot>
                    Atrasado
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ height: 8 }} />
      </Card>
    </div>
  );
}
