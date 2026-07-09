"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Icon, Input, Select } from '../ds';
import { InfoNote } from './InfoNote';
import { createStudentWithGuardian } from '@/server/actions/alunos';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

const steps: [string, string, boolean][] = [
  ['1', 'Dados do aluno', true],
  ['2', 'Responsável', true],
];

export interface TurmaOption {
  id: string;
  name: string;
}

export function AlunoForm({ turmas, defaultTurmaId }: { turmas: TurmaOption[]; defaultTurmaId?: string }) {
  const router = useRouter();
  const [hasGuardian, setHasGuardian] = useState(false);

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

      <form action={createStudentWithGuardian}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card title="Dados do aluno">
              <div style={g2}>
                <Input label="Nome completo" name="name" placeholder="Ex.: João Pedro Lima" required />
                <Input label="Data de nascimento" name="birthDate" type="date" leadingIcon="calendar" />
                <Select
                  label="Turma"
                  name="classGroupId"
                  defaultValue={defaultTurmaId ?? ''}
                  options={[{ value: '', label: 'Sem turma por enquanto' }, ...turmas.map((t) => ({ value: t.id, label: t.name }))]}
                />
                <Select
                  label="Status inicial"
                  name="initialStatus"
                  defaultValue="PENDING"
                  options={[
                    { value: 'PENDING', label: 'Pré-matrícula' },
                    { value: 'ACTIVE', label: 'Ativo' },
                  ]}
                />
              </div>
            </Card>
            <Card title="Responsável">
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 'var(--fs-body)', fontFamily: 'var(--font-ui)' }}>
                  <input type="checkbox" checked={hasGuardian} onChange={(e) => setHasGuardian(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--navy-900)' }} />
                  Vincular responsável agora
                </label>
              </div>
              {hasGuardian && (
                <>
                  <div style={g2}>
                    <Input label="Nome do responsável" name="guardianName" placeholder="Ex.: Marcos Lima" leadingIcon="user" required />
                    <Input label="WhatsApp" name="guardianPhone" placeholder="(11) 9 9999-9999" leadingIcon="phone" />
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <Input label="E-mail" name="guardianEmail" type="email" placeholder="responsavel@email.com" leadingIcon="mail" required />
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)' }}>
                    O e-mail é obrigatório para o responsável aparecer na listagem e receber convite de acesso.
                  </p>
                </>
              )}
            </Card>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InfoNote>
              Responsável vinculado aqui aparece automaticamente na lista de <strong>Responsáveis</strong>. Pode vincular mais responsáveis depois pelo cadastro do aluno.
            </InfoNote>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button type="submit" variant="primary" size="md" fullWidth leadingIcon="check">
                Salvar pré-cadastro
              </Button>
              <Button type="button" variant="secondary" size="md" fullWidth onClick={() => router.push('/escolinha/alunos')}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
