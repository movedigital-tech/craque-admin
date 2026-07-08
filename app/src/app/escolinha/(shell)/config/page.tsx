"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Badge, Button, Card, Icon, Input, Select, Toggle } from '@/components/ds';
import { InfoNote } from '@/components/escolinha/InfoNote';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

const tabs: [string, string][] = [
  ['dados', 'Dados'],
  ['cobranca', 'Cobrança'],
  ['notif', 'Notificações'],
];

function ToggleRow({ label, sub, defaultOn = true }: { label: string; sub: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid var(--border-subtle)', gap: 16 }}>
      <div>
        <div style={{ fontWeight: 'var(--fw-medium)', fontSize: 'var(--fs-body)' }}>{label}</div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{sub}</div>
      </div>
      <Toggle checked={on} onChange={() => setOn((v) => !v)} />
    </div>
  );
}

function PlanoRail({ saveLabel }: { saveLabel?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: 'linear-gradient(135deg,var(--navy-900) 0%,var(--plum-800) 100%)', borderRadius: 'var(--radius-lg)', padding: 20, color: 'var(--white)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>Plano atual</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)' }}>Pro</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 'var(--fw-bold)', marginTop: 8 }}>
          R$ 149/mês <span style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', fontWeight: 400 }}>+ 2%</span>
        </div>
        <button
          style={{
            width: '100%',
            marginTop: 14,
            background: 'rgba(255,255,255,.08)',
            border: '1px solid rgba(255,255,255,.2)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            padding: '10px',
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--fs-sm)',
            fontWeight: 'var(--fw-semibold)',
            cursor: 'pointer',
          }}
        >
          Gerenciar plano
        </button>
      </div>
      <InfoNote>
        Toda ação crítica gera <strong>audit log</strong>. Dados seguem a <strong>LGPD</strong>.
      </InfoNote>
      <Button variant="primary" size="md" fullWidth leadingIcon="check">
        {saveLabel || 'Salvar alterações'}
      </Button>
    </div>
  );
}

export default function EscolinhaConfigPage() {
  const [tab, setTab] = useState('dados');

  return (
    <div>
      <div style={{ display: 'inline-flex', gap: 4, background: 'var(--surface-muted)', borderRadius: 'var(--radius-md)', padding: 4, marginBottom: 22 }}>
        {tabs.map(([v, l]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            style={{
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
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

      {tab === 'dados' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
          <Card title="Dados da escolinha">
            <div style={g2}>
              <Input label="Nome" defaultValue="FC Estrela" />
              <Input label="CNPJ" defaultValue="00.000.000/0000-00" />
              <Input label="Cidade" defaultValue="São Paulo · SP" leadingIcon="map-pin" />
              <Input label="Unidades" defaultValue="Centro, Norte" />
              <Input label="Telefone" defaultValue="(11) 3xxx-xxxx" leadingIcon="phone" />
              <Input label="E-mail de contato" defaultValue="contato@fcestrela.com" leadingIcon="mail" />
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)' }}>Logo da escolinha</label>
              <div
                style={{
                  height: 80,
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
          <PlanoRail />
        </div>
      )}

      {tab === 'cobranca' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card title="Valores padrão">
              <div style={g2}>
                <Input label="Mensalidade padrão" defaultValue="R$ 250,00" leadingIcon="dollar-sign" />
                <Input label="Taxa de matrícula" defaultValue="R$ 100,00" leadingIcon="dollar-sign" />
              </div>
            </Card>
            <Card title="Regras de cobrança">
              <Select
                label="Dia de vencimento"
                defaultValue="5"
                options={[
                  { value: '5', label: 'Dia 05' },
                  { value: '10', label: 'Dia 10' },
                ]}
              />
              <div style={{ height: 1, background: 'var(--border-subtle)', margin: '14px 0 6px' }} />
              <ToggleRow label="Cobrança recorrente automática" sub="Gera a mensalidade todo mês" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0 0', gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 'var(--fw-medium)', fontSize: 'var(--fs-body)' }}>Métodos no checkout</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>Disponíveis conforme o gateway escolhido</div>
                </div>
                <Badge tone="neutral">A definir</Badge>
              </div>
            </Card>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card title="Gateway" action={<Badge tone="neutral">Não conectado</Badge>} padding={24}>
              <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                Nenhum provedor de pagamento conectado nesta rodada.
              </p>
            </Card>
            <InfoNote>Configurado pela plataforma. A escolinha não acessa as chaves do gateway.</InfoNote>
            <Button variant="primary" size="md" fullWidth leadingIcon="check">
              Salvar alterações
            </Button>
          </div>
        </div>
      )}

      {tab === 'notif' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card title="Lembretes ao responsável">
              <ToggleRow label="Nova matrícula concluída" sub="Quando o cadastro é finalizado" />
              <ToggleRow label="Aula remarcada ou cancelada" sub="Aviso com antecedência" />
            </Card>
            <Card title="Canais">
              <ToggleRow label="WhatsApp" sub="Canal principal de comunicação" />
              <ToggleRow label="E-mail" sub="Avisos e comunicados" />
            </Card>
          </div>
          <PlanoRail saveLabel="Salvar notificações" />
        </div>
      )}
    </div>
  );
}
