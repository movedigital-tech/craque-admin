import { useState } from 'react';
import { Button, Card, Icon, Tabs, Toggle } from '../components/ds';
import type { TabItem } from '../components/ds';

const tabs: TabItem[] = [
  { value: 'geral', label: 'Geral' },
  { value: 'marca', label: 'Marca' },
  { value: 'notif', label: 'Notificações' },
  { value: 'seg', label: 'Segurança' },
  { value: 'fat', label: 'Faturamento' },
];

type ToggleKey = 'lemb' | 'inadim' | 'wh' | 'susp' | 'fa2';

function FI({ label, val }: { label: string; val: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-primary)' }}>{label}</label>
      <div style={{ height: 44, padding: '0 14px', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', display: 'flex', alignItems: 'center', fontSize: 'var(--fs-body)' }}>
        {val}
      </div>
    </div>
  );
}

export function Configuracoes() {
  const [tab, setTab] = useState('geral');
  const [tgl, setTgl] = useState<Record<ToggleKey, boolean>>({ lemb: true, inadim: true, wh: true, susp: false, fa2: true });

  const toggle = (id: ToggleKey) => setTgl((t) => ({ ...t, [id]: !t[id] }));

  const Row = ({ label, sub, id }: { label: string; sub?: string; id: ToggleKey }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid var(--border-subtle)', gap: 16 }}>
      <div>
        <div style={{ fontWeight: 'var(--fw-medium)', fontSize: 'var(--fs-body)' }}>{label}</div>
        {sub && <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{sub}</div>}
      </div>
      <Toggle checked={tgl[id]} onChange={() => toggle(id)} />
    </div>
  );

  return (
    <div>
      <Tabs style={{ marginBottom: 24 }} tabs={tabs} value={tab} onChange={setTab} />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {(tab === 'geral' || tab === 'marca') && (
            <Card title="Identidade da plataforma">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <FI label="Nome da plataforma" val="Craque" />
                <FI label="Domínio" val="app.craque.com" />
                <FI label="Idioma padrão" val="Português (BR)" />
                <FI label="Fuso horário" val="America/Sao_Paulo" />
              </div>
              <div style={{ marginTop: 14 }}>
                <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>Logo & cores da marca</label>
                <div
                  style={{
                    height: 72,
                    border: '2px dashed var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    fontSize: 'var(--fs-sm)',
                  }}
                >
                  <Icon name="image-plus" size={18} />
                  Clique ou arraste para enviar
                </div>
              </div>
            </Card>
          )}
          {(tab === 'geral' || tab === 'notif') && (
            <Card title="Notificações & lembretes">
              <Row label="Lembrete de mensalidade a vencer" sub="E-mail e WhatsApp ao responsável" id="lemb" />
              <Row label="Aviso de inadimplência" sub="Para escolinha e responsável" id="inadim" />
              <Row label="Alertas de webhook com falha" sub="Para o time financeiro" id="wh" />
              <Row label="Suspensão automática por inadimplência" sub="Após 15 dias de atraso" id="susp" />
            </Card>
          )}
          {(tab === 'geral' || tab === 'seg') && (
            <Card title="Segurança">
              <Row label="Exigir 2FA no time" sub="Autenticação em dois fatores" id="fa2" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Sessão expira em</span>
                <strong>8 horas</strong>
              </div>
            </Card>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '12px 15px', background: 'var(--info-tint)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--info)', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
            <Icon name="info" size={14} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
            <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Toda ação crítica gera <strong>audit log</strong>. Dados sensíveis seguem a <strong>LGPD</strong>.
            </p>
          </div>
          <Button variant="primary" fullWidth leadingIcon="check">
            Salvar alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
