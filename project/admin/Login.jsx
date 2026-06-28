// Login — split layout: dark navy brand panel (left) + form (right)
function AdminLogin({ navigate }) {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const { Button, Input } = NS;
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  React.useEffect(function() {
    window.lucide && window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  });

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'var(--font-ui)', overflow: 'hidden' }}>

      {/* ── Left · dark brand panel ── */}
      <div style={{
        width: '46%', background: 'var(--navy-900)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '44px 52px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Pitch SVG watermark */}
        <svg style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          opacity: 0.055, pointerEvents: 'none',
        }} viewBox="0 0 520 720" preserveAspectRatio="xMidYMid slice">
          <rect x="30" y="60" width="460" height="600" fill="none" stroke="white" strokeWidth="3" />
          <line x1="30" y1="360" x2="490" y2="360" stroke="white" strokeWidth="3" />
          <circle cx="260" cy="360" r="80" fill="none" stroke="white" strokeWidth="3" />
          <circle cx="260" cy="360" r="4" fill="white" />
          <rect x="160" y="60" width="200" height="110" fill="none" stroke="white" strokeWidth="3" />
          <rect x="160" y="550" width="200" height="110" fill="none" stroke="white" strokeWidth="3" />
          <rect x="205" y="60" width="110" height="46" fill="none" stroke="white" strokeWidth="3" />
          <rect x="205" y="614" width="110" height="46" fill="none" stroke="white" strokeWidth="3" />
          <path d="M 30 60 A 18 18 0 0 1 48 78" fill="none" stroke="white" strokeWidth="3" />
          <path d="M 490 60 A 18 18 0 0 0 472 78" fill="none" stroke="white" strokeWidth="3" />
          <path d="M 30 660 A 18 18 0 0 0 48 642" fill="none" stroke="white" strokeWidth="3" />
          <path d="M 490 660 A 18 18 0 0 1 472 642" fill="none" stroke="white" strokeWidth="3" />
        </svg>

        {/* Brand */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 60 }}>
            <span style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'var(--accent)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i data-lucide="trophy" width="18" height="18" style={{ color: 'var(--navy-900)' }}></i>
            </span>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
              color: 'var(--white)', letterSpacing: '-0.01em',
            }}>Craque</span>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
              background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)',
              padding: '3px 9px', borderRadius: 99,
            }}>ADMIN</span>
          </div>

          <h2 style={{
            margin: 0, fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)',
            color: 'var(--white)', lineHeight: 1.15, maxWidth: 380,
          }}>
            Gestão de escolinhas,{' '}
            <span style={{ color: 'var(--accent)' }}>do campo ao caixa.</span>
          </h2>

          <p style={{
            margin: '20px 0 0', fontSize: 'var(--fs-body-lg)', lineHeight: 1.65,
            color: 'rgba(255,255,255,0.5)', maxWidth: 340,
          }}>
            Painel do administrador — escolinhas, planos, cobranças e repasses em um só lugar.
          </p>
        </div>

        {/* Bottom stats */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 36 }}>
          {[['38', 'Escolinhas ativas'], ['R$ 24,9k', 'MRR atual'], ['4 mil+', 'Alunos na plataforma']].map(function(item) {
            return (
              <div key={item[1]}>
                <div style={{ fontSize: 22, fontWeight: 'var(--fw-bold)', color: 'var(--accent)', lineHeight: 1 }}>{item[0]}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 5 }}>{item[1]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right · form ── */}
      <div style={{
        flex: 1, background: 'var(--surface-canvas)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48,
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              margin: 0, fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)',
              color: 'var(--text-primary)', lineHeight: 1.2,
            }}>Acessar o painel</h2>
            <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>
              Entre com sua conta de administrador.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              label="E-mail"
              type="email"
              placeholder="voce@craque.com"
              leadingIcon="mail"
              value={email}
              onChange={function(e) { setEmail(e.target.value); }}
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              leadingIcon="lock"
              value={pw}
              onChange={function(e) { setPw(e.target.value); }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 9,
                cursor: 'pointer', fontSize: 'var(--fs-body)', color: 'var(--text-secondary)',
                userSelect: 'none',
              }}>
                <span
                  onClick={function() { setRemember(!remember); }}
                  style={{
                    width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    border: '2px solid ' + (remember ? 'var(--accent)' : 'var(--border-default)'),
                    background: remember ? 'var(--accent)' : 'var(--surface-card)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 0.14s',
                  }}
                >
                  {remember && <i data-lucide="check" width="11" height="11" style={{ color: 'var(--navy-900)' }}></i>}
                </span>
                Manter conectado
              </label>
              <a href="#" style={{
                fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)',
                color: 'var(--success)', textDecoration: 'none',
              }}>Esqueci a senha</a>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              leadingIcon="log-in"
              onClick={function() { navigate('dashboard'); }}
              style={{ marginTop: 6 }}
            >
              Entrar
            </Button>
          </div>

          {/* Info note */}
          <div style={{
            marginTop: 24, padding: '13px 15px',
            background: 'var(--info-tint)', borderRadius: 'var(--radius-md)',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <i data-lucide="info" width="15" height="15"
              style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }}></i>
            <p style={{
              margin: 0, fontSize: 'var(--fs-sm)',
              color: 'var(--text-secondary)', lineHeight: 1.6,
            }}>
              Acesso restrito ao time da plataforma. Convites são gerenciados em <strong>Usuários & Perfis</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
window.AdminLogin = AdminLogin;
