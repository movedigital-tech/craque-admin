import type { BadgeTone } from '../../components/ds';

export interface NavItem {
  key: string;
  label: string;
  icon: string;
}

export interface Account {
  name: string;
  role: string;
}

export interface TopBarNotification {
  icon: string;
  color: string;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
}

export interface DashboardStat {
  icon: string;
  label: string;
  value: string;
  trend?: string;
  dir?: 'up' | 'down';
  dark?: boolean;
}

export interface ProximaAula {
  d: string;
  h: string;
  t: string;
  sub: string;
}

export interface StatusMapEntry {
  label: string;
  tone: BadgeTone;
}

export interface Turma {
  nome: string;
  cat: string;
  agenda: string;
  local: string;
  prof: string;
  alunos: number;
  vagas: number;
}

export interface TurmaAluno {
  name: string;
  idade: string;
  resp: string;
  pre: string;
  ok: boolean;
}

export interface Aluno {
  name: string;
  idade: string;
  turma: string;
  resp: string;
  tel: string;
  pre: string;
  ok: boolean;
}

export type ResponsavelStatus = 'completo' | 'pendente';

export interface Responsavel {
  name: string;
  email: string;
  alunos: string;
  tel: string;
  st: ResponsavelStatus;
  act: string;
}

export interface Professor {
  name: string;
  email: string;
  fn: string;
  turmas: string;
  st: 'active';
}

export interface AgendaSessao {
  turma: string;
  dia: string;
  data: string;
  hora: string;
  local: string;
  prof: string;
  alunos: number;
}
