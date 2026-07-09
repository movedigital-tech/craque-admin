"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Icon, Input, Select } from '../ds';
import { InfoNote } from './InfoNote';
import { createClassGroup, updateClassGroup } from '@/server/actions/turmas';

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

const dias: [number, string][] = [
  [1, 'Seg'], [2, 'Ter'], [3, 'Qua'], [4, 'Qui'], [5, 'Sex'], [6, 'Sáb'], [0, 'Dom'],
];

export interface ProfessorOption { id: string; name: string; }

export interface TurmaFormData {
  id: string;
  name: string;
  ageRange: string | null;
  weekdays: number[];
  startTime: string | null;
  endTime: string | null;
  capacity: number;
  teacherMembershipId: string | null;
}

export function TurmaForm({ professores, initial }: { professores: ProfessorOption[]; initial?: TurmaFormData }) {
  const router = useRouter();
  const isEdit = !!initial;
  const [weekdays, setWeekdays] = useState<number[]>(initial?.weekdays ?? [3]);

  function toggleDay(v: number) {
    setWeekdays((prev) => prev.includes(v) ? prev.filter((d) => d !== v) : [...prev, v]);
  }

  const action = isEdit
    ? updateClassGroup.bind(null, initial!.id)
    : createClassGroup;

  const backHref = isEdit ? `/escolinha/turmas/${initial!.id}` : '/escolinha/turmas';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => router.push(backHref)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', padding: 0 }}
      >
        <Icon name="arrow-left" size={15} />
        Turmas{isEdit ? <><span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span><strong style={{ color: 'var(--text-primary)' }}>{initial!.name}</strong></> : null}
        <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span>
        <strong style={{ color: 'var(--text-primary)' }}>{isEdit ? 'Editar' : 'Nova turma'}</strong>
      </button>
      <form action={action}>
        {weekdays.map((d) => <input key={d} type="hidden" name="weekdays" value={d} />)}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card title="Dados da turma">
              <div style={g2}>
                <Input label="Nome da turma" name="name" placeholder="Ex.: Sub-9" required defaultValue={initial?.name} />
                <Select
                  label="Categoria / faixa etária"
                  name="ageRange"
                  defaultValue={initial?.ageRange ?? '8 a 9 anos'}
                  options={[
                    { value: '5 a 7 anos', label: '5 a 7 anos' },
                    { value: '8 a 9 anos', label: '8 a 9 anos' },
                    { value: '10 a 11 anos', label: '10 a 11 anos' },
                    { value: '12 a 13 anos', label: '12 a 13 anos' },
                  ]}
                />
              </div>
            </Card>
            <Card title="Agenda">
              <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)' }}>
                Dias da semana <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal', fontSize: 'var(--fs-sm)' }}>(selecione um ou mais)</span>
              </label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {dias.map(([v, l]) => (
                  <button key={v} type="button" onClick={() => toggleDay(v)} style={chipStyle(weekdays.includes(v))}>
                    {l}
                  </button>
                ))}
              </div>
              <div style={g2}>
                <Input label="Início" name="startTime" placeholder="18:00" defaultValue={initial?.startTime ?? '18:00'} />
                <Input label="Término" name="endTime" placeholder="19:30" defaultValue={initial?.endTime ?? '19:30'} />
              </div>
            </Card>
            <Card title="Professor & capacidade">
              <div style={g2}>
                <Select
                  label="Professor responsável"
                  name="teacherMembershipId"
                  defaultValue={initial?.teacherMembershipId ?? ''}
                  options={[{ value: '', label: 'Sem professor definido' }, ...professores.map((p) => ({ value: p.id, label: p.name }))]}
                />
                <Input label="Vagas" name="capacity" type="number" placeholder="24" defaultValue={String(initial?.capacity ?? 24)} />
              </div>
            </Card>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InfoNote>
              {isEdit
                ? 'As alterações serão salvas imediatamente após confirmar.'
                : 'Depois de criada, a turma fica disponível para <strong>vincular alunos</strong> na matrícula.'}
            </InfoNote>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button type="submit" variant="primary" size="md" fullWidth leadingIcon="check">
                {isEdit ? 'Salvar alterações' : 'Salvar turma'}
              </Button>
              <Button type="button" variant="secondary" size="md" fullWidth onClick={() => router.push(backHref)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
