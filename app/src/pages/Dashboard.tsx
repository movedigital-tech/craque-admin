import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLineChart } from '../components/admin/AdminLineChart';
import { Avatar, Badge, Button, Card, Icon, StatCard } from '../components/ds';
import { dashboardAlerts, dashboardStats, mrrChart, planDistribution, schoolStatusMap, schools } from '../data';

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
  padding: '12px 24px',
  fontSize: 'var(--fs-body)',
  borderBottom: '1px solid var(--gray-100)',
};

const mrrByPlan: [string, string][] = [
  ['Pro', 'R$ 2.682'],
  ['Básico', 'R$ 1.106'],
  ['Híbrido', 'R$ 594'],
];

export function Dashboard() {
  const navigate = useNavigate();
  const [hov, setHov] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {dashboardStats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} trend={s.trend} trendDirection={s.dir} variant={s.dark ? 'dark' : 'default'} />
        ))}
      </div>

      {/* Chart + right rail */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 268px', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Chart */}
          <Card title="Receita recorrente (MRR)" subtitle="Últimos 12 meses">
            <AdminLineChart data={mrrChart} height={220} />
          </Card>

          {/* Table */}
          <Card padding={0} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 18px' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', fontFamily: 'var(--font-ui)' }}>Escolinhas recentes</h3>
              <Button variant="ghost" size="sm" trailingIcon="arrow-right" onClick={() => navigate('/escolinhas')}>
                Ver todas
              </Button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Escolinha', 'Plano', 'Status', 'Alunos', 'MRR'].map((h) => (
                    <th key={h} style={th}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schools.slice(0, 5).map((e) => {
                  const st = schoolStatusMap[e.status];
                  return (
                    <tr
                      key={e.id}
                      style={{ cursor: 'pointer', background: hov === e.id ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s' }}
                      onMouseEnter={() => setHov(e.id)}
                      onMouseLeave={() => setHov(null)}
                      onClick={() => navigate('/escolinhas/novo')}
                    >
                      <td style={td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={e.name} size={32} />
                          <div>
                            <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)' }}>{e.name}</div>
                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{e.city}</div>
                          </div>
                        </div>
                      </td>
                      <td style={td}>
                        <Badge tone="neutral">{e.plan}</Badge>
                      </td>
                      <td style={td}>
                        <Badge tone={st.tone} dot>
                          {st.label}
                        </Badge>
                      </td>
                      <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>
                        {e.studentCount > 0 ? e.studentCount : <span style={{ color: 'var(--text-secondary)' }}>—</span>}
                      </td>
                      <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{e.mrrLabel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ padding: '8px 24px 24px' }}>
              <Button variant="ghost" size="sm" onClick={() => navigate('/escolinhas')}>
                Ver todas as 38 escolinhas →
              </Button>
            </div>
          </Card>
        </div>

        {/* Right rail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* MRR dark card */}
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
            <div style={{ position: 'absolute', top: -20, right: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(200,238,68,.09)' }} />
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: '0.04em' }}>MRR · Junho 2026</div>
            <div style={{ fontSize: 26, fontWeight: 'var(--fw-bold)', marginTop: 5, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
              R$ 24.900
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, color: 'var(--accent)', fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)' }}>
              <Icon name="trending-up" size={13} />
              +11% vs. mês anterior
            </div>
            <div style={{ display: 'flex', marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.1)' }}>
              {mrrByPlan.map(([k, v], i) => (
                <div key={k} style={{ flex: 1, paddingLeft: i > 0 ? 10 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,.1)' : 'none', marginLeft: i > 0 ? 10 : 0 }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)' }}>{k}</div>
                  <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 12, marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <Card title="Precisa de atenção" padding={24}>
            {dashboardAlerts.map((a, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <Icon name={a.icon} size={16} style={{ color: a.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 'var(--fs-xs)', lineHeight: 1.4 }}>{a.text}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate(`/${a.go}`)}>
                    Ver
                  </Button>
                </div>
                {i < dashboardAlerts.length - 1 && <div style={{ height: 1, background: 'var(--border-subtle)' }} />}
              </div>
            ))}
          </Card>

          {/* Plans */}
          <Card title="Distribuição de planos" padding={24}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {planDistribution.map((p) => (
                <div key={p.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 'var(--fs-sm)' }}>
                    <span style={{ fontWeight: 'var(--fw-medium)' }}>{p.name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{p.count}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 99, background: 'var(--surface-muted)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.pct}%`, background: 'var(--accent)', borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
