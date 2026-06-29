import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Card, StatCard } from '../../components/ds';
import { homeStats, mensalidadeStatusMap, mensalidadesRecentes, proximasAulas, recebimentosChart } from '../../data/escolinha';
import { EscolinhaLineChart } from '../../components/escolinha/EscolinhaLineChart';

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

const filterTabs: [string, string][] = [
  ['all', 'Todas'],
  ['ok', 'Em dia'],
  ['late', 'Atrasadas'],
];

export function EscolinhaHome() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('all');
  const [hov, setHov] = useState<number | null>(null);

  const rows = mensalidadesRecentes.filter(
    (r) => tab === 'all' || (tab === 'ok' && r.st === 'paid') || (tab === 'late' && r.st !== 'paid'),
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {homeStats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} trend={s.trend} trendDirection={s.dir} variant={s.dark ? 'dark' : 'default'} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card
            title="Recebimentos"
            subtitle="Previsto vs. recebido"
            action={
              <div style={{ display: 'flex', gap: 16, fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <i style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                  Recebido
                </span>
                <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <i style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--gray-300)', display: 'inline-block' }} />
                  Previsto
                </span>
              </div>
            }
          >
            <EscolinhaLineChart data={recebimentosChart} height={220} />
          </Card>
          <Card padding={0} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '24px 24px 0' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', fontFamily: 'var(--font-ui)' }}>Mensalidades recentes</h3>
              <Button variant="ghost" size="sm" trailingIcon="arrow-right" onClick={() => navigate('/escolinha/cobrancas')}>
                Ver todas
              </Button>
            </div>
            <div style={{ padding: '14px 24px 0' }}>
              <div style={{ display: 'inline-flex', gap: 4, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', padding: 4 }}>
                {filterTabs.map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => setTab(v)}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 'var(--fs-sm)',
                      fontWeight: 'var(--fw-semibold)',
                      background: tab === v ? 'var(--surface-card)' : 'transparent',
                      color: tab === v ? 'var(--text-primary)' : 'var(--text-secondary)',
                      boxShadow: tab === v ? 'var(--shadow-sm)' : 'none',
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
              <thead>
                <tr>
                  {['Aluno', 'Turma', 'Valor', 'Vencimento', 'Status'].map((h) => (
                    <th key={h} style={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const s = mensalidadeStatusMap[r.st];
                  return (
                    <tr key={i} style={{ background: hov === i ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s' }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
                      <td style={td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={r.name} size={32} />
                          <span style={{ fontWeight: 'var(--fw-semibold)' }}>{r.name}</span>
                        </div>
                      </td>
                      <td style={{ ...td, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>{r.turma}</td>
                      <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{r.val}</td>
                      <td style={{ ...td, color: 'var(--text-secondary)' }}>{r.venc}</td>
                      <td style={td}>
                        <Badge tone={s.tone} dot>
                          {s.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ height: 8 }} />
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              background: 'linear-gradient(135deg,var(--navy-900) 0%,var(--plum-800) 100%)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              color: 'var(--white)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(200,238,68,.09)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: '0.04em' }}>Saldo a receber · abril</div>
                <div style={{ fontSize: 28, fontWeight: 'var(--fw-bold)', marginTop: 6, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>R$ 6.890,00</div>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)' }}>Craque</span>
            </div>
            <div style={{ display: 'flex', marginTop: 22, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.1)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>Recebido</div>
                <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 13, marginTop: 3, color: 'var(--accent)' }}>R$ 18.420</div>
              </div>
              <div style={{ flex: 1, paddingLeft: 12, borderLeft: '1px solid rgba(255,255,255,.1)' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>Em aberto</div>
                <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 13, marginTop: 3 }}>R$ 2.150</div>
              </div>
            </div>
          </div>
          <Card title="Próximas aulas" action={<Button variant="ghost" size="sm">Agenda</Button>} padding={24}>
            {proximasAulas.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < proximasAulas.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ width: 46, height: 46, borderRadius: 10, background: 'var(--accent-tint)', display: 'grid', placeContent: 'center', textAlign: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 'var(--fw-bold)', color: 'var(--success)', lineHeight: 1 }}>{c.d}</span>
                  <span style={{ fontSize: 13, fontWeight: 'var(--fw-bold)', lineHeight: 1.3 }}>{c.h}</span>
                </span>
                <div>
                  <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{c.t}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
