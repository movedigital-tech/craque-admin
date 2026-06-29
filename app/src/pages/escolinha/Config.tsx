import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Badge, Button, Card, Icon, Input, Select, Toggle } from '../../components/ds';
import { InfoNote } from '../../components/escolinha/InfoNote';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

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

const tabs: [string, string][] = [
  ['dados', 'Dados'],
  ['cobranca', 'Cobrança'],
  ['notif', 'Notificações'],
  ['split', 'Equipe & Split'],
];

const splitMembros: [string, string, string, string][] = [
  ['Lucas Martins', 'Professor', '8%', 'Editar'],
  ['Bia Rocha', 'Professora', '8%', 'Editar'],
  ['André Silva', 'Professor', '—', 'Definir'],
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

export function EscolinhaConfig() {
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
                <Input label="Multa por atraso" defaultValue="2%" leadingIcon="percent" />
                <Input label="Juros ao mês" defaultValue="1%" leadingIcon="percent" />
              </div>
            </Card>
            <Card title="Regras de cobrança">
              <div style={{ ...g2, marginBottom: 6 }}>
                <Select
                  label="Dia de vencimento"
                  defaultValue="5"
                  options={[
                    { value: '5', label: 'Dia 05' },
                    { value: '10', label: 'Dia 10' },
                  ]}
                />
                <Select
                  label="Gerar fatura"
                  defaultValue="5"
                  options={[
                    { value: '5', label: '5 dias antes' },
                    { value: '10', label: '10 dias antes' },
                  ]}
                />
              </div>
              <div style={{ height: 1, background: 'var(--border-subtle)', margin: '10px 0' }} />
              <ToggleRow label="Cobrança recorrente automática" sub="Gera a mensalidade todo mês" />
              <ToggleRow label="Baixa automática (webhook do gateway)" sub="Concilia Pix e cartão sem ação manual" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0 0', gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 'var(--fw-medium)', fontSize: 'var(--fs-body)' }}>Métodos no checkout</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>Disponíveis conforme o plano</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Badge tone="success">Pix</Badge>
                  <Badge tone="success">Cartão</Badge>
                  <Badge tone="neutral">Boleto</Badge>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card
              title="Gateway"
              action={
                <Badge tone="success" dot>
                  Conectado
                </Badge>
              }
              padding={24}
            >
              {([['Provedor', 'Asaas'], ['Subconta', 'rec_8841'], ['Prazo de repasse', 'D+1']] as [string, string][]).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 'var(--fs-body)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
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
              <ToggleRow label="Mensalidade a vencer" sub="3 dias antes do vencimento" />
              <ToggleRow label="Mensalidade vencida" sub="No dia seguinte ao vencimento" />
              <ToggleRow label="Confirmação de pagamento" sub="Recibo automático ao pagar" />
              <ToggleRow label="Aviso de nova matrícula" sub="Quando o cadastro é concluído" defaultOn={false} />
            </Card>
            <Card title="Canais">
              <ToggleRow label="WhatsApp" sub="Canal principal de cobrança" />
              <ToggleRow label="E-mail" sub="Recibos e 2ª via" />
              <ToggleRow label="Push (app)" sub="Disponível na área do responsável" />
            </Card>
          </div>
          <PlanoRail saveLabel="Salvar notificações" />
        </div>
      )}

      {tab === 'split' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card title="Split para professores" action={<Badge tone="neutral">Plano Pro</Badge>}>
              <ToggleRow label="Habilitar split" sub="Repasse automático por mensalidade" />
              <div style={{ ...g2, marginTop: 14 }}>
                <Input label="Percentual padrão" defaultValue="8%" leadingIcon="percent" />
                <Select
                  label="Base de cálculo"
                  defaultValue="liq"
                  options={[
                    { value: 'liq', label: 'Líquido da escolinha' },
                    { value: 'bruto', label: 'Valor bruto' },
                  ]}
                />
              </div>
              <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0 12px' }} />
              <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                A cada mensalidade recebida, o percentual definido é repassado automaticamente ao professor da turma e registrado de forma auditável.
              </p>
            </Card>
            <Card padding={0} style={{ overflow: 'hidden' }}>
              <div style={{ padding: '24px 24px 14px' }}>
                <h3 style={{ margin: 0, fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', fontFamily: 'var(--font-ui)' }}>Split por membro</h3>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Membro', 'Função', 'Split', ''].map((h) => (
                      <th key={h} style={th}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {splitMembros.map((r, i) => (
                    <tr key={i}>
                      <td style={{ ...td, fontWeight: 'var(--fw-semibold)' }}>{r[0]}</td>
                      <td style={td}>
                        <Badge tone="neutral">{r[1]}</Badge>
                      </td>
                      <td style={{ ...td, fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{r[2]}</td>
                      <td style={{ ...td, textAlign: 'right' }}>
                        <Button variant="ghost" size="sm">
                          {r[3]}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ height: 8 }} />
            </Card>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InfoNote>Split é calculado na <strong>criação da cobrança</strong> e registrado por transação. Mudanças não afetam cobranças já geradas.</InfoNote>
            <Button variant="primary" size="md" fullWidth leadingIcon="check">
              Salvar split
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
