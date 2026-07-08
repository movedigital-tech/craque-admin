"use client";

import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Icon, Input, Select } from '@/components/ds';
import { InfoNote } from '@/components/escolinha/InfoNote';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

const steps: [string, string, boolean][] = [
  ['1', 'Dados do aluno', true],
  ['2', 'Responsável', true],
  ['3', 'Convite', false],
];

export default function EscolinhaAlunoCadastroPage() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => router.push('/escolinha/alunos')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', padding: 0 }}
      >
        <Icon name="arrow-left" size={15} />
        Alunos <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span> <strong style={{ color: 'var(--text-primary)' }}>Nova matrícula</strong>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '8px 0' }}>
        {steps.map(([n, label, active], i) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: active ? 'var(--navy-900)' : 'var(--surface-muted)',
                  color: active ? 'var(--white)' : 'var(--text-secondary)',
                  fontSize: 'var(--fs-sm)',
                  fontWeight: 'var(--fw-semibold)',
                }}
              >
                {n}
              </div>
              <span style={{ fontSize: 'var(--fs-xs)', color: active ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 'var(--fw-medium)' }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 70, height: 0, borderTop: '1px dashed var(--border-default)', margin: '0 10px', transform: 'translateY(-10px)' }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Dados do aluno">
            <div style={g2}>
              <Input label="Nome completo" placeholder="Ex.: João Pedro Lima" />
              <Input label="Data de nascimento" placeholder="dd/mm/aaaa" leadingIcon="calendar" />
              <Select
                label="Turma(s)"
                defaultValue="sub9"
                options={[
                  { value: 'sub7', label: 'Sub-7' },
                  { value: 'sub9', label: 'Sub-9' },
                  { value: 'sub11', label: 'Sub-11' },
                ]}
              />
              <Select
                label="Status inicial"
                defaultValue="pre"
                options={[
                  { value: 'pre', label: 'Pré-matrícula' },
                  { value: 'ativo', label: 'Ativo' },
                ]}
              />
            </div>
          </Card>
          <Card title="Contato do responsável">
            <div style={g2}>
              <Input label="Nome do responsável" placeholder="Ex.: Marcos Lima" leadingIcon="user" />
              <Input label="WhatsApp" placeholder="(11) 9 9999-9999" leadingIcon="phone" />
            </div>
            <div style={{ marginTop: 14 }}>
              <Input label="E-mail" placeholder="responsavel@email.com" leadingIcon="mail" />
            </div>
          </Card>
          <Card style={{ border: '1px dashed var(--border-default)', background: 'var(--surface-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Icon name="link" size={16} style={{ color: 'var(--text-secondary)' }} />
              <strong style={{ fontSize: 'var(--fs-body)' }}>Link de convite gerado</strong>
            </div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 'var(--fs-sm)',
                background: 'var(--surface-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 12px',
                color: 'var(--text-secondary)',
                marginBottom: 12,
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              https://craque.app/convite/jp-lima-7f2a
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="sm" leadingIcon="copy">
                Copiar
              </Button>
              <Button variant="secondary" size="sm" leadingIcon="message-circle">
                Enviar por WhatsApp
              </Button>
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <InfoNote>
            O responsável recebe o link e completa o <strong>cadastro e pagamento</strong> direto pelo celular.
          </InfoNote>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" size="md" fullWidth leadingIcon="check" onClick={() => router.push('/escolinha/alunos')}>
              Salvar pré-cadastro
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={() => router.push('/escolinha/alunos')}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
