import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Icon, Input, Select, Toggle } from '../components/ds';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

const frow: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)', gap: 16 };

type FeatKey = 'ilim' | 'split' | 'multi' | 'prior' | 'api';

const featRows: [string, FeatKey][] = [
  ['Alunos ilimitados', 'ilim'],
  ['Split para professor', 'split'],
  ['Multi-unidade', 'multi'],
  ['Suporte prioritário', 'prior'],
];

const preview: [string, string][] = [
  ['Mensalidade', 'R$ 149/mês'],
  ['% por transação', '2,0%'],
  ['Ciclo', 'Mensal'],
  ['Limite de alunos', 'Ilimitado'],
];

export function PlanoForm() {
  const navigate = useNavigate();
  const [feats, setFeats] = useState<Record<FeatKey, boolean>>({ ilim: true, split: true, multi: false, prior: false, api: false });

  const toggle = (id: FeatKey) => setFeats((t) => ({ ...t, [id]: !t[id] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => navigate('/planos')}
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
        Planos SaaS <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span>{' '}
        <strong style={{ color: 'var(--text-primary)' }}>Novo plano</strong>
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 296px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Dados do plano">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={g2}>
                <Input label="Nome do plano" placeholder="Ex.: Pro" />
                <Select
                  label="Ciclo de cobrança"
                  defaultValue="monthly"
                  options={[
                    { value: 'monthly', label: 'Mensal' },
                    { value: 'annual', label: 'Anual (2 meses grátis)' },
                  ]}
                  placeholder=""
                />
              </div>
              <div style={g2}>
                <Input label="Mensalidade SaaS" placeholder="R$ 149,00" leadingIcon="dollar-sign" />
                <Input label="% por transação" placeholder="2,0%" leadingIcon="percent" />
              </div>
              <Input label="Descrição curta" placeholder="Ex.: Para escolinhas em crescimento" />
            </div>
          </Card>
          <Card title="Limites & recursos">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 4 }}>
              <div style={g2}>
                <Input label="Limite de alunos" placeholder="Ilimitado" />
                <Input label="Unidades incluídas" placeholder="1" />
              </div>
            </div>
            {featRows.map(([label, id]) => (
              <div key={id} style={frow}>
                <span style={{ fontSize: 'var(--fs-body)' }}>{label}</span>
                <Toggle checked={feats[id]} onChange={() => toggle(id)} />
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', gap: 16 }}>
              <span style={{ fontSize: 'var(--fs-body)' }}>Acesso à API</span>
              <Toggle checked={feats.api} onChange={() => toggle('api')} />
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '13px 15px', background: 'var(--info-tint)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--info)' }}>
            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <Icon name="info" size={15} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
              <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                A mudança de plano <strong>não recalcula</strong> cobranças já geradas. O split vigente é o do momento da criação da cobrança.
              </p>
            </div>
          </div>
          <Card title="Pré-visualização" padding={24}>
            {preview.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" size="md" fullWidth leadingIcon="check" onClick={() => navigate('/planos')}>
              Salvar plano
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={() => navigate('/planos')}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
