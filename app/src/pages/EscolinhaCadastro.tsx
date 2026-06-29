import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Icon, Input, Select } from '../components/ds';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

const planSummary: [string, string][] = [
  ['Plano', 'Pro'],
  ['Mensalidade SaaS', 'R$ 149/mês'],
  ['% por transação', '2,0%'],
  ['Ciclo', 'Mensal'],
];

export function EscolinhaCadastro() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => navigate('/escolinhas')}
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
        Escolinhas <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span>{' '}
        <strong style={{ color: 'var(--text-primary)' }}>Nova escolinha</strong>
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 296px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Dados da escolinha">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={g2}>
                <Input label="Nome da escolinha" placeholder="Ex.: FC Estrela" />
                <Input label="CNPJ / CPF" placeholder="00.000.000/0000-00" />
              </div>
              <div style={g2}>
                <Input label="Cidade" placeholder="São Paulo" leadingIcon="map-pin" />
                <Select label="Estado" defaultValue="SP" options={ufs} placeholder="" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                  Logo da escolinha
                </label>
                <div
                  style={{
                    height: 88,
                    border: '2px dashed var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    cursor: 'pointer',
                  }}
                >
                  <Icon name="image-plus" size={22} style={{ color: 'var(--gray-500)' }} />
                  <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Clique ou arraste · PNG/JPG · máx. 2 MB</span>
                </div>
              </div>
            </div>
          </Card>
          <Card title="Responsável / contato">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={g2}>
                <Input label="Nome do responsável" placeholder="Carlos Nunes" leadingIcon="user" />
                <Input label="E-mail" type="email" placeholder="carlos@fcestrela.com" leadingIcon="mail" />
              </div>
              <div style={g2}>
                <Input label="Telefone / WhatsApp" placeholder="(11) 9xxxx-xxxx" leadingIcon="phone" />
                <Select
                  label="Cargo"
                  defaultValue="owner"
                  options={[
                    { value: 'owner', label: 'Dono / Gestor' },
                    { value: 'dir', label: 'Diretor' },
                    { value: 'coord', label: 'Coordenador' },
                  ]}
                  placeholder=""
                />
              </div>
            </div>
          </Card>
          <Card title="Plano & cobrança">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={g2}>
                <Select
                  label="Plano SaaS"
                  defaultValue="pro"
                  options={[
                    { value: 'basico', label: 'Básico — R$ 79/mês + 2,9%' },
                    { value: 'pro', label: 'Pro — R$ 149/mês + 2,0%' },
                    { value: 'hibrido', label: 'Híbrido — R$ 99/mês + 1,5%' },
                  ]}
                  placeholder=""
                />
                <Select
                  label="Ciclo"
                  defaultValue="monthly"
                  options={[
                    { value: 'monthly', label: 'Mensal' },
                    { value: 'annual', label: 'Anual (2 meses grátis)' },
                  ]}
                  placeholder=""
                />
              </div>
              <div style={g2}>
                <Select
                  label="Status inicial"
                  defaultValue="active"
                  options={[
                    { value: 'active', label: 'Ativa' },
                    { value: 'trial', label: 'Trial (30 dias)' },
                    { value: 'kyc', label: 'Aguardar KYC' },
                  ]}
                  placeholder=""
                />
                <Input label="Início da assinatura" placeholder="01/05/2026" leadingIcon="calendar" />
              </div>
            </div>
          </Card>
        </div>
        {/* Rail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: '13px 15px', background: 'var(--info-tint)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--info)' }}>
            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <Icon name="info" size={15} style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }} />
              <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Após salvar, a escolinha recebe um <strong>convite por e-mail</strong> e inicia o fluxo de <strong>KYC / subconta</strong> antes de cobrar.
              </p>
            </div>
          </div>
          <Card title="Resumo do plano" padding={24}>
            {planSummary.map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 11, fontSize: 'var(--fs-body)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>KYC</span>
              <Badge tone="info">Será solicitado</Badge>
            </div>
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" size="md" fullWidth leadingIcon="check" onClick={() => navigate('/kyc')}>
              Salvar e convidar
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={() => navigate('/escolinhas')}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
