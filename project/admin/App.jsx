// AdminApp — shell: SidebarNav + TopBar + screen router
function AdminApp() {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const { SidebarNav, Card } = NS;
  const D = window.ADMIN_DATA;
  const [view, setView] = React.useState('login');

  React.useEffect(function() {
    window.lucide && window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  });

  var navigate = function(screen) { setView(screen); };

  // Full-page (no sidebar)
  if (view === 'login') {
    return <window.AdminLogin navigate={navigate} />;
  }

  var SCREENS = {
    dashboard: {
      title: 'Dashboard geral',
      subtitle: 'Olá, Rafael 👋 — visão da plataforma em junho de 2026.',
      Screen: window.AdminDashboard,
    },
    escolinhas: {
      title: 'Gestão de escolinhas',
      subtitle: '38 escolinhas cadastradas na plataforma.',
      Screen: window.AdminEscolinhas,
    },
    'escolinha-cadastro': {
      title: 'Cadastro de escolinha',
      subtitle: 'Preencha os dados e defina o plano SaaS.',
      Screen: window.AdminEscolinhaCadastro,
    },
  };

  var meta = SCREENS[view];
  var Screen = meta ? meta.Screen : null;

  // Highlight the correct sidebar item for sub-views
  var activeNav = (view === 'escolinha-cadastro') ? 'escolinhas' : view;

  function EmptyScreen() {
    return (
      <Card style={{ textAlign: 'center', padding: 72 }}>
        <i data-lucide="hammer" width="28" height="28" style={{ color: 'var(--gray-300)' }}></i>
        <p style={{ margin: '14px 0 0', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
          Em construção — esta seção faz parte do roadmap.
        </p>
      </Card>
    );
  }

  return (
    <div style={{
      display: 'flex', height: '100vh',
      background: 'var(--surface-canvas)', overflow: 'hidden',
    }}>
      <SidebarNav
        brand="Craque"
        items={D.nav}
        footerItems={D.navFooter}
        activeKey={activeNav}
        onSelect={navigate}
      />
      <main style={{
        flex: 1, overflowY: 'auto', padding: '34px 36px',
        display: 'flex', flexDirection: 'column',
      }}>
        <window.AdminTopBar
          title={meta ? meta.title : ''}
          subtitle={meta ? meta.subtitle : ''}
          navigate={navigate}
        />
        {Screen ? <Screen navigate={navigate} /> : <EmptyScreen />}
      </main>
    </div>
  );
}
window.AdminApp = AdminApp;
