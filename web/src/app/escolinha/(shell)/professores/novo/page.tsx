"use client";

import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Icon, Input, Select } from '@/components/ds';
import { InfoNote } from '@/components/escolinha/InfoNote';
import { inviteMember } from '@/server/actions/professores';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

export default function EscolinhaMembroNovoPage() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => router.push('/escolinha/professores')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', padding: 0 }}
      >
        <Icon name="arrow-left" size={15} />
        Professores <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span> <strong style={{ color: 'var(--text-primary)' }}>Adicionar membro</strong>
      </button>
      <form action={inviteMember}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Card title="Dados do membro">
              <div style={g2}>
                <Input label="Nome completo" name="name" placeholder="Nome do professor" leadingIcon="user" required />
                <Select
                  label="Função"
                  name="role"
                  defaultValue="TEACHER"
                  options={[
                    { value: 'TEACHER', label: 'Professor' },
                    { value: 'MANAGER', label: 'Coordenador' },
                  ]}
                />
                <Input label="E-mail" name="email" type="email" placeholder="professor@escolinha.com" leadingIcon="mail" required />
                <Input label="WhatsApp" name="phone" placeholder="(11) 9xxxx-xxxx" leadingIcon="phone" />
              </div>
            </Card>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InfoNote>
              O membro recebe um <strong>convite por e-mail</strong> para criar a senha e acessar a escolinha. Turmas podem ser atribuídas a ele na tela da própria turma.
            </InfoNote>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Button type="submit" variant="primary" size="md" fullWidth leadingIcon="send">
                Enviar convite
              </Button>
              <Button type="button" variant="secondary" size="md" fullWidth onClick={() => router.push('/escolinha/professores')}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
