import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Input } from '../../components/ds';

export function EscolinhaLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [rem, setRem] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left — navy panel */}
      <div
        style={{
          width: '46%',
          background: 'var(--navy-900)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '44px 52px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.055, pointerEvents: 'none' }}
          viewBox="0 0 520 720"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect x="30" y="60" width="460" height="600" fill="none" stroke="white" strokeWidth="3" />
          <line x1="30" y1="360" x2="490" y2="360" stroke="white" strokeWidth="3" />
          <circle cx="260" cy="360" r="80" fill="none" stroke="white" strokeWidth="3" />
          <circle cx="260" cy="360" r="4" fill="white" />
          <rect x="160" y="60" width="200" height="110" fill="none" stroke="white" strokeWidth="3" />
          <rect x="160" y="550" width="200" height="110" fill="none" stroke="white" strokeWidth="3" />
          <rect x="205" y="60" width="110" height="46" fill="none" stroke="white" strokeWidth="3" />
          <rect x="205" y="614" width="110" height="46" fill="none" stroke="white" strokeWidth="3" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 60 }}>
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="trophy" size={18} style={{ color: 'var(--navy-900)' }} />
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--white)', letterSpacing: '-0.01em' }}>
              Craque
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                background: 'rgba(255,255,255,.1)',
                color: 'rgba(255,255,255,.5)',
                padding: '3px 9px',
                borderRadius: 99,
              }}
            >
              ESCOLINHA
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: 'var(--fs-h1)', fontWeight: 'var(--fw-bold)', color: 'var(--white)', lineHeight: 1.15, maxWidth: 400 }}>
            Sua escolinha organizada, <span style={{ color: 'var(--accent)' }}>do treino à cobrança.</span>
          </h2>
          <p style={{ margin: '20px 0 0', fontSize: 'var(--fs-body-lg)', lineHeight: 1.65, color: 'rgba(255,255,255,.5)', maxWidth: 360 }}>
            Turmas, alunos, presença e mensalidades em um painel feito para o dia a dia da quadra.
          </p>
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 36 }}>
          {([
            ['142', 'Alunos ativos'],
            ['R$ 18,4k', 'Recebido / mês'],
            ['88%', 'Presença média'],
          ] as const).map(([v, l]) => (
            <div key={l}>
              <div style={{ fontSize: 22, fontWeight: 'var(--fw-bold)', color: 'var(--accent)', lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div style={{ flex: 1, background: 'var(--surface-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)' }}>Bem-vindo de volta 👋</h2>
          <p style={{ margin: '0 0 32px', color: 'var(--text-secondary)', fontSize: 'var(--fs-body)' }}>Acesse a sua escolinha.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              label="E-mail"
              type="email"
              placeholder="voce@escolinha.com"
              leadingIcon="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              leadingIcon="lock"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', fontSize: 'var(--fs-body)', color: 'var(--text-secondary)', userSelect: 'none' }}
              >
                <span
                  onClick={() => setRem(!rem)}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    flexShrink: 0,
                    border: `2px solid ${rem ? 'var(--accent)' : 'var(--border-default)'}`,
                    background: rem ? 'var(--accent)' : 'var(--surface-card)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all .14s',
                  }}
                >
                  {rem && <Icon name="check" size={11} style={{ color: 'var(--navy-900)' }} />}
                </span>
                Lembrar por 30 dias
              </label>
              <a href="#" style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--success)', textDecoration: 'none' }}>
                Esqueci a senha
              </a>
            </div>
            <Button variant="primary" size="lg" fullWidth leadingIcon="log-in" onClick={() => navigate('/escolinha/home')} style={{ marginTop: 6 }}>
              Entrar
            </Button>
          </div>
          <div
            style={{
              marginTop: 24,
              padding: '13px 15px',
              background: 'var(--info-tint)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}
          >
            <Icon name="info" size={15} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
            <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Recebeu um convite da plataforma? Use o link do e-mail para <strong>ativar a escolinha</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
