"use client";

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Icon, Input, Select, Toggle } from '@/components/ds';
import { InfoNote } from '@/components/escolinha/InfoNote';

const g2: CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

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

export default function EscolinhaMembroNovoPage() {
  const router = useRouter();
  const [cfg, setCfg] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <button
        onClick={() => router.push('/escolinha/professores')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 7, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', fontFamily: 'var(--font-ui)', padding: 0 }}
      >
        <Icon name="arrow-left" size={15} />
        Professores <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span> <strong style={{ color: 'var(--text-primary)' }}>Adicionar membro</strong>
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card title="Dados do membro">
            <div style={g2}>
              <Input label="Nome completo" placeholder="Nome do professor" leadingIcon="user" />
              <Select
                label="Função"
                defaultValue="prof"
                options={[
                  { value: 'prof', label: 'Professor' },
                  { value: 'coord', label: 'Coordenador' },
                  { value: 'aux', label: 'Auxiliar' },
                ]}
              />
              <Input label="E-mail" type="email" placeholder="professor@escolinha.com" leadingIcon="mail" />
              <Input label="WhatsApp" placeholder="(11) 9xxxx-xxxx" leadingIcon="phone" />
            </div>
          </Card>
          <Card title="Turmas & acesso">
            <label style={{ display: 'block', marginBottom: 8, fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)' }}>Turmas atribuídas</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
              {['Sub-7', 'Sub-9'].map((t) => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--accent-tint)', color: 'var(--success)', borderRadius: 'var(--radius-pill)', padding: '7px 13px', fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)' }}>
                  {t} <Icon name="x" size={13} />
                </span>
              ))}
              <button style={{ border: '1px dashed var(--border-default)', background: 'transparent', color: 'var(--text-secondary)', borderRadius: 'var(--radius-pill)', padding: '7px 13px', fontSize: 'var(--fs-sm)', cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
                + Adicionar
              </button>
            </div>
            <ToggleRow label="Gerenciar alunos e presença" sub="Cadastrar alunos e marcar presença" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0 0', gap: 16 }}>
              <div>
                <div style={{ fontWeight: 'var(--fw-medium)', fontSize: 'var(--fs-body)' }}>Acesso às configurações</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>Apenas coordenação</div>
              </div>
              <Toggle checked={cfg} onChange={() => setCfg((v) => !v)} />
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <InfoNote>
            O membro recebe um <strong>convite por e-mail</strong> para criar a senha e acessar a escolinha.
          </InfoNote>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" size="md" fullWidth leadingIcon="send" onClick={() => router.push('/escolinha/professores')}>
              Enviar convite
            </Button>
            <Button variant="secondary" size="md" fullWidth onClick={() => router.push('/escolinha/professores')}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
