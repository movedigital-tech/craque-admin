import type { PlatformUser, Profile, StatusMapEntry } from './types';

export const platformUsers: PlatformUser[] = [
  { name: 'Ricardo Antunes', email: 'ricardo@craque.com', role: 'Super Admin', status: 'active', lastAccess: 'há 2 min' },
  { name: 'Júlia Moraes', email: 'julia@craque.com', role: 'Financeiro', status: 'active', lastAccess: 'há 1 h' },
  { name: 'Leo Pires', email: 'leo@craque.com', role: 'Suporte', status: 'active', lastAccess: 'ontem' },
  { name: 'Marina Castro', email: 'marina@craque.com', role: 'Suporte', status: 'invite', lastAccess: '—' },
  { name: 'Carlos Menezes', email: 'carlos@craque.com', role: 'Comercial', status: 'invite', lastAccess: '—' },
];

export const platformUserStatusMap: Record<PlatformUser['status'], StatusMapEntry> = {
  active: { label: 'Ativo', tone: 'success' },
  invite: { label: 'Convite', tone: 'info' },
};

export const profiles: Profile[] = [
  { name: 'Super Admin', sub: 'Acesso total' },
  { name: 'Financeiro', sub: 'Cobranças, splits, repasses' },
  { name: 'Suporte', sub: 'Escolinhas e KYC (leitura)' },
  { name: 'Comercial', sub: 'Planos e assinaturas' },
];

export interface InviteRole {
  key: string;
  name: string;
  sub: string;
}

export const inviteRoles: InviteRole[] = [
  { key: 'super', name: 'Super Admin', sub: 'Acesso total à plataforma' },
  { key: 'fin', name: 'Financeiro', sub: 'Cobranças, splits e repasses' },
  { key: 'suporte', name: 'Suporte', sub: 'Escolinhas e KYC (leitura)' },
  { key: 'com', name: 'Comercial', sub: 'Planos e assinaturas' },
];
