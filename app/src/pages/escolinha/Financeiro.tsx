import type { CSSProperties } from 'react';
import { Badge, Button, Card, StatCard } from '../../components/ds';
import { financeiroBars, financeiroRows, financeiroStatusTone } from '../../data/escolinha';
import { EscolinhaBarChart } from '../../components/escolinha/EscolinhaBarChart';
import { InfoNote } from '../../components/escolinha/InfoNote';

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

const repasseRows: [string, string][] = [
  ['Bruto recebido', 'R$ 18.420'],
  ['Taxa gateway', '− R$ 402'],
  ['Plataforma (2%)', '− R$ 368'],
];

export function EscolinhaFinanceiro() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        <StatCard icon="arrow-down-left" label="Recebido (mês)" value="R$ 18.420" />
        <StatCard icon="clock" label="A receber" value="R$ 2.150" />
        <StatCard icon="banknote" label="Repassado para você" value="R$ 17.650" variant="dark" />
        <StatCard icon="scissors" label="Taxas + plataforma" value="R$ 770" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card title="Recebimentos por mês" subtitle="Últimos 12 meses">
            <EscolinhaBarChart data={financeiroBars} height={220} />
          </Card>
          <Card padding={0} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '24px 24px 0' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', fontFamily: 'var(--font-ui)' }}>Recebíveis recentes</h3>
              <Button variant="ghost" size="sm" leadingIcon="download">
                Extrato
              </Button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 14 }}>
              <thead>
                <tr>
                  {['Aluno', 'Referência', 'Bruto', 'Taxa', 'Líquido', 'Status'].map((h) => (
                    <th key={h} style={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financeiroRows.map((r, i) => (
                  <tr key={i}>
                    <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{r.name}</td>
                    <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.ref}</td>
                    <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{r.bruto}</td>
                    <td style={{ ...td, color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{r.taxa}</td>
                    <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{r.liq}</td>
                    <td style={td}>
                      <Badge tone={financeiroStatusTone[r.st]} dot>
                        {r.lbl}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ height: 8 }} />
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Próximo repasse" padding={24}>
            <div style={{ fontSize: 24, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>R$ 17.650,00</div>
            <p style={{ margin: '4px 0 0', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Cai na conta em 30 abr</p>
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '14px 0' }} />
            {repasseRows.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: 'var(--fs-sm)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </Card>
          <InfoNote>
            Se o <strong>split para professor</strong> estiver ativo, o líquido é dividido conforme a regra do plano.
          </InfoNote>
        </div>
      </div>
    </div>
  );
}
