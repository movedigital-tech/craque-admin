// AdminDashboard — 4 KPI stats · MRR chart · escolinhas table · right rail
function AdminDashboard({ navigate }) {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const { StatCard, Card, Badge, Button, Avatar } = NS;
  const D = window.ADMIN_DATA;
  const [chartTab, setChartTab] = React.useState('mrr');
  const [hoveredRow, setHoveredRow] = React.useState(null);

  React.useEffect(function() {
    window.lucide && window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  });

  const thStyle = {
    padding: '0 14px 13px', textAlign: 'left',
    fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)',
    letterSpacing: '0.05em', textTransform: 'uppercase',
    color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)',
    whiteSpace: 'nowrap',
  };
  const tdStyle = { padding: '13px 14px', fontSize: 'var(--fs-body)', borderBottom: '1px solid var(--gray-100)' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 308px', gap: 24 }}>

      {/* ── Main column ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {D.stats.map(function(s) {
            return (
              <StatCard
                key={s.label}
                icon={s.icon}
                label={s.label}
                value={s.value}
                trend={s.trend}
                trendDirection={s.dir}
                variant={s.dark ? 'dark' : 'default'}
              />
            );
          })}
        </div>

        {/* MRR chart card */}
        <Card
          title="Receita recorrente (MRR)"
          subtitle="Últimos 12 meses"
          action={
            <div style={{ display: 'flex', gap: 6 }}>
              {[['mrr', 'MRR'], ['trans', 'Transações']].map(function(pair) {
                var k = pair[0], label = pair[1];
                var on = chartTab === k;
                return (
                  <button key={k} onClick={function() { setChartTab(k); }} style={{
                    height: 30, padding: '0 14px', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)', cursor: 'pointer',
                    fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)',
                    background: on ? 'var(--navy-900)' : 'var(--surface-card)',
                    color: on ? 'var(--white)' : 'var(--text-secondary)',
                    transition: 'background 0.14s, color 0.14s',
                  }}>{label}</button>
                );
              })}
            </div>
          }
        >
          <window.AdminLineChart data={D.chart} height={232} />
        </Card>

        {/* Escolinhas recentes */}
        <Card
          title="Escolinhas recentes"
          action={
            <Button variant="ghost" size="sm" trailingIcon="arrow-right"
              onClick={function() { navigate('escolinhas'); }}>
              Ver todas
            </Button>
          }
          padding={0}
          style={{ overflow: 'hidden' }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Escolinha', 'Plano', 'Status', 'Alunos', 'MRR'].map(function(h) {
                  return <th key={h} style={thStyle}>{h}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {D.escolinhas.slice(0, 5).map(function(e) {
                var st = D.statusMap[e.status];
                var hov = hoveredRow === e.id;
                return (
                  <tr
                    key={e.id}
                    style={{ cursor: 'pointer', background: hov ? 'var(--surface-subtle)' : 'transparent', transition: 'background 0.1s' }}
                    onMouseEnter={function() { setHoveredRow(e.id); }}
                    onMouseLeave={function() { setHoveredRow(null); }}
                    onClick={function() { navigate('escolinha-cadastro'); }}
                  >
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Avatar name={e.name} size={34} />
                        <div>
                          <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{e.name}</div>
                          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{e.city}</div>
                        </div>
                      </div>
                    </td>
                    <td style={tdStyle}><Badge tone="neutral">{e.plan}</Badge></td>
                    <td style={tdStyle}><Badge tone={st.tone} dot>{st.label}</Badge></td>
                    <td style={{ ...tdStyle, fontWeight: 'var(--fw-semibold)' }}>
                      {e.students > 0 ? e.students : <span style={{ color: 'var(--text-secondary)' }}>—</span>}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{e.mrr}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: '10px 14px 14px' }}>
            <Button variant="ghost" size="sm" onClick={function() { navigate('escolinhas'); }}>
              Ver todas as 38 escolinhas →
            </Button>
          </div>
        </Card>
      </div>

      {/* ── Right rail ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* MRR dark hero card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--plum-800) 100%)',
          borderRadius: 'var(--radius-lg)', padding: 22, color: 'var(--white)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -24, right: -24,
            width: 110, height: 110, borderRadius: '50%',
            background: 'rgba(200,238,68,0.09)',
          }} />
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>MRR · Abril 2026</div>
          <div style={{
            fontSize: 30, fontWeight: 'var(--fw-bold)', marginTop: 6,
            letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
          }}>R$ 24.900</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, color: 'var(--accent)', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)' }}>
            <i data-lucide="trending-up" width="14" height="14"></i>
            +11% vs. mês anterior
          </div>
          <div style={{
            display: 'flex', gap: 0, marginTop: 20, paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            {[['Pro', 'R$ 2.682'], ['Básico', 'R$ 1.106'], ['Híbrido', 'R$ 594']].map(function(item, i) {
              return (
                <div key={item[0]} style={{
                  flex: 1,
                  paddingLeft: i > 0 ? 14 : 0,
                  borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  marginLeft: i > 0 ? 14 : 0,
                }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{item[0]}</div>
                  <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-sm)', marginTop: 3 }}>{item[1]}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Precisa de atenção */}
        <Card title="Precisa de atenção" padding={20}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {D.alerts.map(function(a, i) {
              return (
                <div key={i}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 10, padding: '11px 0',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <i data-lucide={a.icon} width="17" height="17" style={{ color: a.color, flexShrink: 0 }}></i>
                      <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-primary)' }}>{a.text}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={function() { navigate(a.go); }}>
                      Ver
                    </Button>
                  </div>
                  {i < D.alerts.length - 1 && (
                    <div style={{ height: 1, background: 'var(--border-subtle)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Distribuição de planos */}
        <Card title="Distribuição de planos" padding={20}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {D.plans.map(function(p) {
              return (
                <div key={p.name}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', marginBottom: 7,
                    fontSize: 'var(--fs-body)',
                  }}>
                    <span style={{ fontWeight: 'var(--fw-medium)' }}>{p.name}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>{p.count} escolinhas</span>
                  </div>
                  <div style={{
                    height: 7, borderRadius: 99,
                    background: 'var(--surface-muted)', overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%', width: p.pct + '%',
                      background: 'var(--accent)', borderRadius: 99,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

      </div>
    </div>
  );
}
window.AdminDashboard = AdminDashboard;
