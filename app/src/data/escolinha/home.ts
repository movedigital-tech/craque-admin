import type { DashboardStat, Mensalidade, ProximaAula, RecebimentosChart, StatusMapEntry } from './types';

export const homeStats: DashboardStat[] = [
  { icon: 'users', label: 'Alunos ativos', value: '142', trend: '+8 no mês', dir: 'up' },
  { icon: 'wallet', label: 'Recebido em abril', value: 'R$ 18.420', trend: '+12%', dir: 'up', dark: true },
  { icon: 'alert-circle', label: 'Mensalidades em aberto', value: 'R$ 2.150', trend: '8 alunos', dir: 'down' },
  { icon: 'percent', label: 'Presença média', value: '88%', trend: '+3pp', dir: 'up' },
];

export const recebimentosChart: RecebimentosChart = {
  labels: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
  recebido: [12.1, 12.8, 13.4, 14.0, 14.6, 15.1, 15.8, 16.3, 16.9, 17.4, 17.9, 18.4],
  previsto: [12.6, 13.2, 13.9, 14.6, 15.0, 15.7, 16.2, 16.9, 17.4, 18.0, 18.6, 20.6],
};

export const proximasAulas: ProximaAula[] = [
  { d: 'SÁB', h: '09:00', t: 'Sub-7', sub: 'Prof. Lucas · 18 alunos' },
  { d: 'QUA', h: '18:00', t: 'Sub-9', sub: 'Prof. Lucas · 24 alunos' },
  { d: 'TER', h: '17:00', t: 'Sub-11', sub: 'Profª. Bia · 21 alunos' },
  { d: 'QUI', h: '19:00', t: 'Sub-13', sub: 'Prof. André · 16 alunos' },
];

export const mensalidadeStatusMap: Record<Mensalidade['st'], StatusMapEntry> = {
  paid: { label: 'Em dia', tone: 'success' },
  late: { label: 'Atrasado', tone: 'danger' },
  pending: { label: 'Pendente', tone: 'warning' },
};

export const mensalidadesRecentes: Mensalidade[] = [
  { name: 'Lucas Pereira', turma: 'Sub-9 · Quarta 18h', val: 'R$ 250,00', venc: '05 abr', st: 'paid' },
  { name: 'Ana Beatriz Costa', turma: 'Sub-11 · Terça 17h', val: 'R$ 250,00', venc: '05 abr', st: 'paid' },
  { name: 'Davi Souza', turma: 'Sub-7 · Sábado 9h', val: 'R$ 220,00', venc: '10 abr', st: 'late' },
  { name: 'Mariana Alves', turma: 'Sub-13 · Quinta 19h', val: 'R$ 280,00', venc: '12 abr', st: 'pending' },
];
