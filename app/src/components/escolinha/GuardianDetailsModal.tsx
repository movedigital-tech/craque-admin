"use client";

import { useState, useTransition } from 'react';
import { Avatar, Badge, Button, Icon, Input, useToast } from '../ds';
import { updateGuardianDetails } from '@/server/actions/responsaveis';
import type { ResponsavelRow } from './ResponsaveisTable';

export function GuardianDetailsModal({ responsavel, onClose }: { responsavel: ResponsavelRow; onClose: () => void }) {
  const [addressLine, setAddressLine] = useState(responsavel.addressLine);
  const [addressCity, setAddressCity] = useState(responsavel.addressCity);
  const [addressState, setAddressState] = useState(responsavel.addressState);
  const [addressZip, setAddressZip] = useState(responsavel.addressZip);
  const [internalNote, setInternalNote] = useState(responsavel.internalNote);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateGuardianDetails({
          membershipId: responsavel.id,
          addressLine,
          addressCity,
          addressState,
          addressZip,
          internalNote,
        });
        showToast('Dados do responsável atualizados.', 'success');
        onClose();
      } catch {
        showToast('Não foi possível salvar. Tente novamente.', 'error');
      }
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(15, 20, 30, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 480, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 28 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <Avatar name={responsavel.name} size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-body-lg)' }}>{responsavel.name}</div>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{responsavel.email}</div>
          </div>
          {responsavel.completo ? <Badge tone="success" dot>Completo</Badge> : <Badge tone="warning" dot>Convite pendente</Badge>}
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            Alunos vinculados
          </div>
          {responsavel.studentsList.length === 0 ? (
            <p style={{ margin: 0, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Nenhum aluno vinculado.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {responsavel.studentsList.map((s) => (
                <Badge key={s} tone="neutral">{s}</Badge>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Icon name="phone" size={14} style={{ color: 'var(--gray-500)' }} />
          <span style={{ fontSize: 'var(--fs-sm)' }}>{responsavel.tel || 'Telefone não informado'}</span>
        </div>

        <div style={{ height: 1, background: 'var(--border-subtle)', margin: '16px 0' }} />

        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
          Endereço
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          <Input label="Endereço" placeholder="Rua, número, bairro" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 110px', gap: 10 }}>
            <Input label="Cidade" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} />
            <Input label="UF" maxLength={2} value={addressState} onChange={(e) => setAddressState(e.target.value.toUpperCase())} />
            <Input label="CEP" value={addressZip} onChange={(e) => setAddressZip(e.target.value)} />
          </div>
        </div>

        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
          Descrição interna
        </div>
        <textarea
          value={internalNote}
          onChange={(e) => setInternalNote(e.target.value)}
          placeholder="Observações visíveis só para a equipe da escolinha…"
          rows={3}
          style={{
            width: '100%',
            resize: 'vertical',
            padding: '12px 14px',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-ui)',
            fontSize: 'var(--fs-body)',
            color: 'var(--text-primary)',
            marginBottom: 24,
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={isPending}>Fechar</Button>
          <Button variant="primary" size="sm" onClick={handleSave} disabled={isPending}>{isPending ? 'Salvando…' : 'Salvar'}</Button>
        </div>
      </div>
    </div>
  );
}
