import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Icon, Input, Select } from '../../components/ds';
import { InfoNote } from '../../components/escolinha/InfoNote';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

const chipStyle = (active: boolean): CSSProperties => ({
  border: `1px solid ${active ? 'var(--navy-900)' : 'var(--border-default)'}`,
  background: active ? 'var(--navy-900)' : 'var(--surface-card)',
  color: active ? 'var(--white)' : 'var(--text-secondary)',
  borderRadius: 'var(--radius-pill)',
  padding: '7px 14px',
  fontSize: 'var(--fs-sm)',
  fontWeight: 'var(--fw-medium)',
  cursor: 'pointer',
  fontFamily: 'var(--font-ui)',
});

const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export function EscolinhaTurmaCadastro() {
  const navigate = useNavigate();
  const [diasAtivos, setDiasAtivos] = useState<Record<string, boolean>>({ Qua: true });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => navigate('/escolinha/turmas')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', padding: 0 }}
      >
        <Icon name="arrow-left" size={15} />
        Turmas <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span> <strong style={{ color: 'var(--text-primary)' }}>Nova turma</strong>
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Dados da turma">
            <div style={g2}>
              <Input label="Nome da turma" placeholder="Ex.: Sub-9" />
              <Select
                label="Categoria / faixa etária"
                defaultValue="89"
                options={[
                  { value: '57', label: '5 a 7 anos' },
                  { value: '89', label: '8 a 9 anos' },
                  { value: '1011', label: '10 a 11 anos' },
                  { value: '1213', label: '12 a 13 anos' },
                ]}
              />
              <Select
                label="Unidade"
                defaultValue="centro"
                options={[
                  { value: 'centro', label: 'Centro' },
                  { value: 'norte', label: 'Norte' },
                ]}
              />
              <Input label="Local / campo" placeholder="Campo 2" />
            </div>
          </Card>
          <Card title="Agenda">
            <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)' }}>Dias da semana</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {dias.map((d) => (
                <button key={d} onClick={() => setDiasAtivos((s) => ({ ...s, [d]: !s[d] }))} style={chipStyle(!!diasAtivos[d])}>
                  {d}
                </button>
              ))}
            </div>
            <div style={g2}>
              <Input label="Início" placeholder="18:00" />
              <Input label="Término" placeholder="19:30" />
            </div>
          </Card>
          <Card title="Professores & capacidade">
            <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)' }}>Professores responsáveis</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--accent-tint)', color: 'var(--success)', borderRadius: 'var(--radius-pill)', padding: '7px 13px', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)' }}>
                Prof. Lucas <Icon name="x" size={13} />
              </span>
              <button style={{ border: '1px dashed var(--border-default)', background: 'transparent', color: 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', padding: '7px 13px', fontSize: 'var(--fs-sm)', cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
                + Adicionar
              </button>
            </div>
            <div style={g2}>
              <Input label="Vagas" placeholder="24" />
              <Select
                label="Status"
                defaultValue="ativa"
                options={[
                  { value: 'ativa', label: 'Ativa' },
                  { value: 'pausada', label: 'Pausada' },
                ]}
              />
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <InfoNote>
            Depois de criada, a turma fica disponível para <strong>vincular alunos</strong> na matrícula.
          </InfoNote>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" size="md" fullWidth leadingIcon="check" onClick={() => navigate('/escolinha/turmas')}>
              Salvar turma
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={() => navigate('/escolinha/turmas')}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
