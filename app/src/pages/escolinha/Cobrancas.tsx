import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Badge, Button, Card, Icon, StatCard, Toggle } from '../../components/ds';
import { cobrancasAbril, mensalidadeStatusMap } from '../../data/escolinha';

const tabs: [string, string][] = [
  ['all', 'Todas'],
  ['ok', 'Em dia'],
  ['late', 'Atrasadas'],
];

export function EscolinhaCobrancas() {
  const navigate = useNavigate();
  const [auto, setAuto] = useState(true);
  const [tab, setTab] = useState('all');

  const list = cobrancasAbril.filter((p) => tab === 'all' || (tab === 'ok' && p.st === 'paid') || (tab === 'late' && p.st !== 'paid'));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        <StatCard icon="check-circle-2" label="Recebido em abril" value="R$ 18.420" variant="dark" />
        <StatCard icon="clock" label="A vencer" value="R$ 2.150" />
        <StatCard icon="alert-circle" label="Em atraso" value="8 alunos" trend="-2" trendDirection="down" />
      </div>
      <Card padding={20} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--accent-tint)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <Icon name="zap" size={20} style={{ color: 'var(--success)' }} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-body)' }}>Baixa automática via gateway</div>
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>
            Pix e cartão pagos pelo responsável são conciliados sozinhos por webhook (Asaas / Pagar.me). "Registrar" serve só p/ baixa manual (dinheiro).
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Ativa</span>
          <Toggle checked={auto} onChange={() => setAuto((v) => !v)} />
        </div>
      </Card>
      <Card
        title="Cobranças de abril"
        subtitle="8 mensalidades em aberto"
        action={
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="secondary" size="sm" leadingIcon="repeat">
              Recorrência
            </Button>
            <Button variant="primary" size="sm" leadingIcon="plus" onClick={() => navigate('/escolinha/cobrancas/nova')}>
              Nova cobrança
            </Button>
          </div>
        }
      >
        <div style={{ display: 'inline-flex', gap: 4, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', padding: 4, marginBottom: 6 }}>
          {tabs.map(([v, l]) => (
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
        {list.map((p, i) => {
          const s = mensalidadeStatusMap[p.st];
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 0', borderBottom: i < list.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <Avatar name={p.name} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{p.name}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{p.turma}</div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 96 }}>
                <div style={{ fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{p.val}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>Vence {p.venc}</div>
              </div>
              <div style={{ width: 108, display: 'flex', justifyContent: 'flex-end' }}>
                <Badge tone={s.tone} dot>
                  {s.label}
                </Badge>
              </div>
              <div style={{ width: 130, display: 'flex', justifyContent: 'flex-end' }}>
                {p.st === 'paid' ? (
                  <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center', color: 'var(--success)', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)' }}>
                    <Icon name="check" size={16} />
                    Recebido
                  </span>
                ) : (
                  <Button variant="primary" size="sm">
                    Registrar
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
