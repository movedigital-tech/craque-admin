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

export interface DashboardStat {
  icon: string;
  label: string;
  value: string;
  trend?: string;
  dir?: 'up' | 'down';
  dark?: boolean;
}

export interface RecebimentosChart {
  labels: string[];
  recebido: number[];
  previsto: number[];
}

export interface BarChartData {
  labels: string[];
  vals: number[];
}

export interface ProximaAula {
  d: string;
  h: string;
  t: string;
  sub: string;
}

export type MensalidadeStatus = 'paid' | 'late' | 'pending';

export interface StatusMapEntry {
  label: string;
  tone: BadgeTone;
}

export interface Mensalidade {
  name: string;
  turma: string;
  val: string;
  venc: string;
  st: MensalidadeStatus;
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
  st: MensalidadeStatus;
}

export interface Aluno {
  name: string;
  idade: string;
  turma: string;
  resp: string;
  tel: string;
  pre: string;
  ok: boolean;
  st: MensalidadeStatus;
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

export type FinanceiroStatus = 'ok' | 'bad' | 'info';

export interface FinanceiroRow {
  name: string;
  ref: string;
  bruto: string;
  taxa: string;
  liq: string;
  st: FinanceiroStatus;
  lbl: string;
}

export interface Professor {
  name: string;
  email: string;
  fn: string;
  turmas: string;
  sp: string;
  st: 'active';
}

export interface InadimplenciaRow {
  name: string;
  turma: string;
  resp: string;
  val: string;
  ha: string;
}

export interface TopBarNotification {
  icon: string;
  color: string;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
}
