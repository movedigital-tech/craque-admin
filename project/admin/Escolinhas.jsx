// AdminEscolinhas — list with filter tabs, search, sortable table
function AdminEscolinhas({ navigate }) {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const { Card, Badge, Button, Avatar, Tabs } = NS;
  const D = window.ADMIN_DATA;
  const [tab, setTab] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [hoveredRow, setHoveredRow] = React.useState(null);

  React.useEffect(function() {
    window.lucide && window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  });

  var tabConfig = [
    { value: 'all',       label: 'Todas',        count: 38 },
    { value: 'active',    label: 'Ativas',        count: 31 },
    { value: 'late',      label: 'Inadimplentes', count: 4  },
    { value: 'suspended', label: 'Suspensas',     count: 2  },
    { value: 'kyc',       label: 'Pendente KYC',  count: 1  },
  ];

  var filtered = D.escolinhas.filter(function(e) {
    var matchTab = tab === 'all' || e.status === tab;
    var q = search.toLowerCase();
    var matchSearch = !q || e.name.toLowerCase().includes(q) || e.owner.toLowerCase().includes(q) || e.city.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  var thStyle = {
    padding: '0 14px 13px', textAlign: 'left',
    fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)',
    letterSpacing: '0.05em', textTransform: 'uppercase',
    color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)',
    whiteSpace: 'nowrap',
  };
  var tdStyle = { padding: '13px 14px', fontSize: 'var(--fs-body)', borderBottom: '1px solid var(--gray-100)' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Card padding={0} style={{ overflow: 'hidden' }}>

        {/* Tabs + actions */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          padding: '20px 22px 0', gap: 16,
        }}>
          <Tabs tabs={tabConfig} value={tab} onChange={setTab} />

          <div style={{ display: 'flex', gap: 8, paddingBottom: 14, flexShrink: 0 }}>
            {/* Inline search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, height: 36,
              padding: '0 13px', background: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', width: 200,
            }}>
              <i data-lucide="search" width="15" height="15" style={{ color: 'var(--gray-500)', flexShrink: 0 }}></i>
              <input
                placeholder="Buscar…"
                value={search}
                onChange={function(e) { setSearch(e.target.value); }}
                style={{
                  border: 'none', outline: 'none', background: 'transparent', flex: 1,
                  fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-sm)',
                  color: 'var(--text-primary)', minWidth: 0,
                }}
              />
            </div>
            <Button variant="secondary" size="sm" leadingIcon="sliders-horizontal">Filtros</Button>
            <Button variant="primary" size="sm" leadingIcon="plus"
              onClick={function() { navigate('escolinha-cadastro'); }}>
              Nova escolinha
            </Button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Escolinha', 'Responsável', 'Plano', 'Status', 'Alunos', 'MRR', ''].map(function(h) {
                return <th key={h} style={thStyle}>{h}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {filtered.map(function(e) {
              var st = D.statusMap[e.status];
              var hov = hoveredRow === e.id;
              return (
                <tr
                  key={e.id}
                  style={{
                    cursor: 'pointer',
                    background: hov ? 'var(--surface-subtle)' : 'transparent',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={function() { setHoveredRow(e.id); }}
                  onMouseLeave={function() { setHoveredRow(null); }}
                  onClick={function() { navigate('escolinha-cadastro'); }}
                >
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Avatar name={e.name} size={36} />
                      <div>
                        <div style={{ fontWeight: 'var(--fw-semibold)' }}>{e.name}</div>
                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{e.city}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>{e.owner}</td>
                  <td style={tdStyle}><Badge tone="neutral">{e.plan}</Badge></td>
                  <td style={tdStyle}><Badge tone={st.tone} dot>{st.label}</Badge></td>
                  <td style={{ ...tdStyle, fontWeight: 'var(--fw-semibold)', fontVariantNumeric: 'tabular-nums' }}>
                    {e.students > 0 ? e.students : <span style={{ color: 'var(--text-secondary)' }}>—</span>}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{e.mrr}</td>
                  <td style={{ ...tdStyle, width: 40 }}>
                    <button
                      style={{
                        border: 'none', background: 'transparent', cursor: 'pointer',
                        width: 30, height: 30, borderRadius: 'var(--radius-md)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-secondary)',
                      }}
                      onClick={function(ev) { ev.stopPropagation(); }}
                    >
                      <i data-lucide="more-horizontal" width="17" height="17"></i>
                    </button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 48, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
                  Nenhuma escolinha encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 22px 16px', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)',
        }}>
          <span>Mostrando {filtered.length} de 38</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, '…', 7].map(function(p, i) {
              var on = p === 1;
              return (
                <button key={i} style={{
                  width: 32, height: 32, borderRadius: 'var(--radius-md)',
                  border: '1px solid ' + (on ? 'var(--navy-900)' : 'var(--border-subtle)'),
                  background: on ? 'var(--navy-900)' : 'var(--surface-card)',
                  color: on ? 'var(--white)' : 'var(--text-secondary)',
                  fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-medium)',
                  cursor: 'pointer', fontFamily: 'var(--font-ui)',
                }}>{p}</button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
window.AdminEscolinhas = AdminEscolinhas;
