// AdminTopBar — page title + search + bell + account chip
function AdminTopBar({ title, subtitle, navigate }) {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const { IconButton, Avatar } = NS;
  const D = window.ADMIN_DATA;

  React.useEffect(function() {
    window.lucide && window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  });

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 20, paddingBottom: 28,
    }}>
      <div>
        <h1 style={{
          margin: 0, fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)',
          lineHeight: 1.2, color: 'var(--text-primary)',
        }}>{title}</h1>
        {subtitle && (
          <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, height: 44,
          padding: '0 16px', background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', width: 236,
        }}>
          <i data-lucide="search" width="17" height="17" style={{ color: 'var(--gray-500)', flexShrink: 0 }}></i>
          <input
            placeholder="Buscar escolinha, plano…"
            style={{
              border: 'none', outline: 'none', background: 'transparent', flex: 1,
              fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-sm)',
              color: 'var(--text-primary)', minWidth: 0,
            }}
          />
        </div>

        {/* Bell with badge */}
        <div style={{ position: 'relative' }}>
          <IconButton icon="bell" variant="outline" ariaLabel="Notificações" />
          <span style={{
            position: 'absolute', top: 7, right: 7,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--danger)', border: '2px solid var(--surface-canvas)',
            display: 'block',
          }} />
        </div>

        {/* Account chip */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, height: 44,
          padding: '0 12px 0 6px', background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-pill)',
          cursor: 'pointer',
        }}>
          <Avatar name={D.account.name} size={32} />
          <div>
            <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', lineHeight: 1.2 }}>
              {D.account.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.1 }}>
              {D.account.role}
            </div>
          </div>
          <i data-lucide="chevron-down" width="14" height="14" style={{ color: 'var(--gray-500)', marginLeft: 2 }}></i>
        </div>
      </div>
    </header>
  );
}
window.AdminTopBar = AdminTopBar;
