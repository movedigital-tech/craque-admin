"use client";

import { useState, useTransition } from 'react';
import { Button, Icon } from '../ds';
import { enrollStudent } from '@/server/actions/matriculas';

export interface AlunoOption { id: string; name: string; }

export function MatricularAlunoForm({ classGroupId, alunosDisponiveis }: { classGroupId: string; alunosDisponiveis: AlunoOption[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');
  const [pending, startTransition] = useTransition();

  const filtered = alunosDisponiveis.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  function submit() {
    if (!selected) return;
    startTransition(async () => {
      await enrollStudent(selected, classGroupId);
      setOpen(false);
      setSelected('');
      setQuery('');
    });
  }

  if (alunosDisponiveis.length === 0 && !open) {
    return (
      <div style={{ display: 'flex', gap: 10 }}>
        <Button variant="primary" size="sm" leadingIcon="user-plus" disabled>Todos os alunos matriculados</Button>
      </div>
    );
  }

  if (!open) {
    return (
      <Button variant="primary" size="sm" leadingIcon="user-plus" onClick={() => setOpen(true)}>
        Adicionar aluno
      </Button>
    );
  }

  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 280 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'var(--fw-medium)', fontSize: 'var(--fs-body)', fontFamily: 'var(--font-ui)' }}>Matricular aluno</span>
        <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', padding: 2 }}>
          <Icon name="x" size={16} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Buscar aluno..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', padding: '8px 10px', fontSize: 'var(--fs-body)', fontFamily: 'var(--font-ui)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
        autoFocus
      />
      <div style={{ maxHeight: 200, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filtered.length === 0 && (
          <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', padding: '6px 4px' }}>Nenhum aluno encontrado</span>
        )}
        {filtered.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setSelected(a.id)}
            style={{
              textAlign: 'left', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-body)',
              background: selected === a.id ? 'var(--navy-900)' : 'transparent',
              color: selected === a.id ? 'var(--white)' : 'var(--text-primary)',
            }}
          >
            {a.name}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary" size="sm" fullWidth onClick={submit} disabled={!selected || pending}>
          {pending ? 'Matriculando...' : 'Matricular'}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancelar</Button>
      </div>
    </div>
  );
}
