import type { DashboardStat, ProximaAula } from './types';

export const homeStats: DashboardStat[] = [
  { icon: 'users', label: 'Alunos ativos', value: '142', trend: '+8 no mês', dir: 'up' },
  { icon: 'goal', label: 'Turmas ativas', value: '4', trend: '79 vagas no total', dir: 'up', dark: true },
  { icon: 'percent', label: 'Presença média', value: '88%', trend: '+3pp', dir: 'up' },
  { icon: 'graduation-cap', label: 'Professores', value: '3', trend: '1 coordenadora', dir: 'up' },
];

export const proximasAulas: ProximaAula[] = [
  { d: 'SÁB', h: '09:00', t: 'Sub-7', sub: 'Prof. Lucas · 18 alunos' },
  { d: 'QUA', h: '18:00', t: 'Sub-9', sub: 'Prof. Lucas · 24 alunos' },
  { d: 'TER', h: '17:00', t: 'Sub-11', sub: 'Profª. Bia · 21 alunos' },
  { d: 'QUI', h: '19:00', t: 'Sub-13', sub: 'Prof. André · 16 alunos' },
];
