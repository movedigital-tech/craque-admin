import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Icon, Input } from '../components/ds';
import { inviteRoles } from '../data';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

export function ConvidarUsuario() {
  const navigate = useNavigate();
  const [role, setRole] = useState('suporte');

  const selectedRole = inviteRoles.find((r) => r.key === role);
  const summary: [string, string][] = [
    ['Perfil', selectedRole?.name ?? ''],
    ['Status', 'Convite pendente'],
    ['Validade', '7 dias'],
    ['2FA', 'Será exigido'],
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => navigate('/usuarios')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: 'var(--fs-sm)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-ui)',
          padding: 0,
        }}
      >
        <Icon name="arrow-left" size={15} />
        Usuários & Perfis <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span>{' '}
        <strong style={{ color: 'var(--text-primary)' }}>Convidar usuário</strong>
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 296px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Dados do convidado">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={g2}>
                <Input label="Nome completo" placeholder="Ex.: Marina Castro" leadingIcon="user" />
                <Input label="E-mail" type="email" placeholder="marina@craque.com" leadingIcon="mail" />
              </div>
              <Input label="Mensagem (opcional)" placeholder="Bem-vinda ao time! Acesse com este convite." leadingIcon="message-square" />
            </div>
          </Card>
          <Card title="Perfil de acesso">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {inviteRoles.map((r) => {
                const on = role === r.key;
                return (
                  <div
                    key={r.key}
                    onClick={() => setRole(r.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      padding: '14px 16px',
                      border: `1px solid ${on ? 'var(--accent)' : 'var(--border-default)'}`,
                      borderRadius: 'var(--radius-md)',
                      background: on ? 'var(--accent-tint)' : 'var(--surface-card)',
                      cursor: 'pointer',
                      transition: 'all .14s',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{r.name}</div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{r.sub}</div>
                    </div>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: `2px solid ${on ? 'var(--accent)' : 'var(--border-default)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {on && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '13px 15px', background: 'var(--info-tint)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--info)' }}>
            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <Icon name="info" size={15} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
              <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                O convidado recebe um <strong>link por e-mail</strong> válido por 7 dias para criar a senha e ativar a conta.
              </p>
            </div>
          </div>
          <Card title="Resumo do convite" padding={24}>
            {summary.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                {i === 1 ? <Badge tone="info">{v}</Badge> : <strong>{v}</strong>}
              </div>
            ))}
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" size="md" fullWidth leadingIcon="send" onClick={() => navigate('/usuarios')}>
              Enviar convite
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={() => navigate('/usuarios')}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
