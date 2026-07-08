import type { Account, NavItem, TopBarNotification } from './types';

export const account: Account = { name: 'Carla Mendes', role: 'Coordenadora' };
export const brandSub = 'FC Estrela · Pro';

export const navItems: NavItem[] = [
  { key: 'home', label: 'Resumo', icon: 'layout-dashboard' },
  { key: 'turmas', label: 'Turmas', icon: 'goal' },
  { key: 'alunos', label: 'Alunos', icon: 'users' },
  { key: 'responsaveis', label: 'Responsáveis', icon: 'contact' },
  { key: 'agenda', label: 'Agenda', icon: 'calendar' },
  { key: 'professores', label: 'Professores', icon: 'graduation-cap' },
];

export const navFootItems: NavItem[] = [{ key: 'config', label: 'Configurações', icon: 'settings' }];

export const topBarNotifications: TopBarNotification[] = [
  { icon: 'user-plus', color: 'var(--success)', title: 'Nova matrícula concluída', sub: 'Théo Moraes · Sub-9', time: 'há 1 h', unread: true },
  { icon: 'calendar', color: 'var(--gray-500)', title: 'Treino Sub-7 amanhã 09h', sub: 'Campo 1 · 18 alunos', time: 'há 5 h', unread: true },
  { icon: 'check-circle', color: 'var(--success)', title: 'Chamada da Sub-11 registrada', sub: '21 presentes de 21', time: 'há 1 dia', unread: false },
];
