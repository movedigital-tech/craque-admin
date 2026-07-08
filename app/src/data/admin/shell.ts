import type { Account, NavItem, TopBarNotification } from './types';

export const account: Account = { name: 'Ricardo Antunes', role: 'Staff Craque' };

export const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { key: 'organizations', label: 'Organizações', icon: 'building-2' },
  { key: 'subscriptions', label: 'Assinaturas', icon: 'repeat' },
  { key: 'webhook-logs', label: 'Webhook Logs', icon: 'webhook' },
];

export const navFootItems: NavItem[] = [
  { key: 'usuarios', label: 'Usuários', icon: 'users' },
  { key: 'config', label: 'Configurações', icon: 'settings' },
];

export const topBarNotifications: TopBarNotification[] = [
  { icon: 'webhook', color: 'var(--danger)', title: 'Webhook com falha', sub: 'Evento subscription.updated não processado', time: 'há 2h', unread: true },
  { icon: 'building-2', color: 'var(--info)', title: 'Nova organização', sub: 'FC Estrela concluiu o cadastro', time: 'há 1 dia', unread: true },
  { icon: 'alert-triangle', color: 'var(--warning)', title: 'Trial expirando', sub: '3 organizações expiram nos próximos 2 dias', time: 'há 2 dias', unread: false },
];
