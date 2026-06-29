import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Icon, Input, Select, Toggle } from '../../components/ds';
import { InfoNote } from '../../components/escolinha/InfoNote';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

const pill = (active: boolean): CSSProperties => ({
  border: `1px solid ${active ? 'var(--navy-900)' : 'var(--border-default)'}`,
  background: active ? 'var(--navy-900)' : 'var(--surface-card)',
  color: active ? 'var(--white)' : 'var(--text-secondary)',
  borderRadius: 'var(--radius-pill)',
  padding: '8px 16px',
  fontSize: 'var(--fs-sm)',
  fontWeight: 'var(--fw-medium)',
  cursor: 'pointer',
  fontFamily: 'var(--font-ui)',
});

const resumoRows: [string, string][] = [
  ['Valor', 'R$ 250,00'],
  ['Vencimento', '05/05/2026'],
  ['Recorrência', 'Mensal'],
];

const splitRows: [string, string][] = [
  ['Plataforma (2%)', 'R$ 5,00'],
  ['Split prof. (8%)', 'R$ 19,60'],
];

function ToggleRow({ label, sub }: { label: string; sub: string }) {
  const [on, setOn] = useState(true);
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

export function EscolinhaCobrancaNova() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('Mensalidade');
  const [rec, setRec] = useState('mensal');
  const [met, setMet] = useState<Record<string, boolean>>({ Pix: true, Cartão: true, Boleto: false });
  const [lembrete, setLembrete] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => navigate('/escolinha/cobrancas')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', padding: 0 }}
      >
        <Icon name="arrow-left" size={15} />
        Mensalidades <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span> <strong style={{ color: 'var(--text-primary)' }}>Nova cobrança</strong>
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Para quem">
            <div style={g2}>
              <Select
                label="Aluno"
                defaultValue=""
                options={[
                  { value: '', label: 'Buscar aluno…' },
                  { value: 'lp', label: 'Lucas Pereira' },
                  { value: 'ac', label: 'Ana Beatriz Costa' },
                ]}
              />
              <Select
                label="Turma"
                defaultValue="sub9"
                options={[
                  { value: 'sub9', label: 'Sub-9 · Quarta 18h' },
                  { value: 'sub7', label: 'Sub-7 · Sábado 9h' },
                ]}
              />
            </div>
          </Card>
          <Card title="Cobrança">
            <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)' }}>Tipo</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {['Mensalidade', 'Matrícula', 'Avulsa'].map((t) => (
                <button key={t} onClick={() => setTipo(t)} style={pill(tipo === t)}>
                  {t}
                </button>
              ))}
            </div>
            <div style={g2}>
              <Input label="Valor" placeholder="R$ 250,00" leadingIcon="dollar-sign" />
              <Input label="Vencimento" placeholder="05/05/2026" leadingIcon="calendar" />
            </div>
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0' }} />
            <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)' }}>Recorrência</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setRec('unica')} style={pill(rec === 'unica')}>
                Única
              </button>
              <button onClick={() => setRec('mensal')} style={pill(rec === 'mensal')}>
                Mensal (recorrente)
              </button>
            </div>
          </Card>
          <Card title="Pagamento & envio">
            <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)' }}>Métodos disponíveis ao responsável</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              {['Pix', 'Cartão', 'Boleto'].map((m) => (
                <button key={m} onClick={() => setMet((s) => ({ ...s, [m]: !s[m] }))} style={pill(!!met[m])}>
                  {m}
                </button>
              ))}
            </div>
            <ToggleRow label="Enviar link por WhatsApp" sub="Assim que a cobrança for criada" />
            <ToggleRow label="Enviar por e-mail" sub="Com a 2ª via e instruções" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0 0', gap: 16 }}>
              <div>
                <div style={{ fontWeight: 'var(--fw-medium)', fontSize: 'var(--fs-body)' }}>Lembrete automático</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>3 dias antes do vencimento</div>
              </div>
              <Toggle checked={lembrete} onChange={() => setLembrete((v) => !v)} />
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card title="Resumo" padding={24}>
            {resumoRows.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '8px 0' }} />
            {splitRows.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 'var(--fs-body)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 'var(--fs-body)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Líquido escolinha</span>
              <strong style={{ color: 'var(--success)' }}>R$ 216,67</strong>
            </div>
          </Card>
          <InfoNote>
            A baixa é <strong>automática</strong> quando o responsável paga (webhook do gateway). O split é registrado na criação.
          </InfoNote>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" size="md" fullWidth leadingIcon="check" onClick={() => navigate('/escolinha/cobrancas')}>
              Criar cobrança
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={() => navigate('/escolinha/cobrancas')}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
