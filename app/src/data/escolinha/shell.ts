import type { Account, NavItem, TopBarNotification } from './types';

export const account: Account = { name: 'Carla Mendes', role: 'Coordenadora' };
export const brandSub = 'FC Estrela · Pro';

export const navItems: NavItem[] = [
  { key: 'home', label: 'Resumo', icon: 'layout-dashboard' },
  { key: 'turmas', label: 'Turmas', icon: 'goal' },
  { key: 'alunos', label: 'Alunos', icon: 'users' },
  { key: 'responsaveis', label: 'Responsáveis', icon: 'contact' },
  { key: 'cobrancas', label: 'Mensalidades', icon: 'wallet' },
  { key: 'financeiro', label: 'Financeiro', icon: 'bar-chart-3' },
  { key: 'relatorios', label: 'Relatórios', icon: 'file-text' },
  { key: 'professores', label: 'Professores', icon: 'graduation-cap' },
];

export const navFootItems: NavItem[] = [{ key: 'config', label: 'Configurações', icon: 'settings' }];

export const topBarNotifications: TopBarNotification[] = [
  { icon: 'alert-circle', color: 'var(--warning)', title: '8 mensalidades em aberto', sub: 'R$ 2.150 · vencidas em abril', time: 'há 15 min', unread: true },
  { icon: 'user-plus', color: 'var(--success)', title: 'Nova matrícula concluída', sub: 'Théo Moraes · Sub-9', time: 'há 1 h', unread: true },
  { icon: 'check-circle', color: 'var(--success)', title: 'Repasse de R$ 17.650 a caminho', sub: 'Cai na conta em 30 abr', time: 'há 3 h', unread: false },
  { icon: 'calendar', color: 'var(--gray-500)', title: 'Treino Sub-7 amanhã 09h', sub: 'Campo 1 · 18 alunos', time: 'há 5 h', unread: false },
];
