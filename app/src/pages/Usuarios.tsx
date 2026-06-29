import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Card, Icon, Tabs } from '../components/ds';
import type { TabItem } from '../components/ds';
import { platformUserStatusMap, platformUsers, profiles } from '../data';

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

const tabs: TabItem[] = [
  { value: 'active', label: 'Ativos · 6' },
  { value: 'invite', label: 'Convites · 2' },
];

export function Usuarios() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('active');
  const [hov, setHov] = useState<number | null>(null);

  const rows = platformUsers.filter((u) => (tab === 'active' ? u.status === 'active' : u.status === 'invite'));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 268px', gap: 22 }}>
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '24px 24px 0', gap: 16 }}>
          <Tabs tabs={tabs} value={tab} onChange={setTab} />
          <div style={{ paddingBottom: 14 }}>
            <Button variant="primary" size="sm" leadingIcon="user-plus" onClick={() => navigate('/usuarios/convidar')}>
              Convidar usuário
            </Button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Usuário', 'Perfil', 'Status', 'Último acesso', ''].map((h) => (
                <th key={h} style={th}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((u, i) => {
              const s = platformUserStatusMap[u.status];
              return (
                <tr key={i} style={{ background: hov === i ? 'var(--surface-subtle)' : 'transparent', transition: 'background .1s' }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Avatar name={u.name} size={34} />
                      <div>
                        <div style={{ fontWeight: 'var(--fw-semibold)' }}>{u.name}</div>
                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={td}>
                    <Badge tone="neutral">{u.role}</Badge>
                  </td>
                  <td style={td}>
                    <Badge tone={s.tone} dot>
                      {s.label}
                    </Badge>
                  </td>
                  <td style={{ ...td, color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>{u.lastAccess}</td>
                  <td style={td}>
                    <button
                      style={{
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        width: 28,
                        height: 28,
                        borderRadius: 'var(--radius-md)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <Icon name="more-horizontal" size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <Card title="Perfis & permissões" padding={24}>
        {profiles.map((p, i) => (
          <div key={p.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0' }}>
              <div>
                <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{p.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{p.sub}</div>
              </div>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <Icon name="pencil" size={13} />
              </button>
            </div>
            {i < profiles.length - 1 && <div style={{ height: 1, background: 'var(--border-subtle)' }} />}
          </div>
        ))}
        <Button variant="secondary" size="sm" fullWidth leadingIcon="plus" style={{ marginTop: 14 }}>
          Novo perfil
        </Button>
      </Card>
    </div>
  );
}
