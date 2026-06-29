import type { Account, DashboardAlert, DashboardStat, MrrChart, NavItem, PlanDistribution, School, StatusMapEntry, TopBarNotification } from './types';

export const account: Account = { name: 'Ricardo Antunes', role: 'Super Admin' };

export const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { key: 'escolinhas', label: 'Escolinhas', icon: 'building-2' },
  { key: 'planos', label: 'Planos SaaS', icon: 'layers' },
  { key: 'assinaturas', label: 'Assinaturas', icon: 'repeat' },
  { key: 'cobrancas', label: 'Cobranças SaaS', icon: 'receipt' },
  { key: 'financeiro', label: 'Financeiro', icon: 'bar-chart-3' },
  { key: 'gateway', label: 'Gateway & Split', icon: 'git-merge' },
  { key: 'kyc', label: 'Subcontas / KYC', icon: 'shield-check' },
  { key: 'relatorios', label: 'Relatórios', icon: 'file-bar-chart-2' },
];

export const navFootItems: NavItem[] = [
  { key: 'usuarios', label: 'Usuários', icon: 'users' },
  { key: 'config', label: 'Configurações', icon: 'settings' },
];

export const dashboardStats: DashboardStat[] = [
  { icon: 'building-2', label: 'Escolinhas ativas', value: '38', trend: '+4 no mês', dir: 'up' },
  { icon: 'wallet', label: 'MRR da plataforma', value: 'R$ 24.900', trend: '+11%', dir: 'up', dark: true },
  { icon: 'arrow-left-right', label: 'Transações no mês', value: 'R$ 412 mil', trend: '+8%', dir: 'up' },
  { icon: 'alert-triangle', label: 'Inadimplência', value: '6,2%', trend: '-1,1pp', dir: 'down' },
];

export const mrrChart: MrrChart = {
  labels: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
  mrr: [18.2, 19.1, 19.8, 20.5, 21.0, 21.8, 22.4, 22.9, 23.1, 23.8, 24.2, 24.9],
};

export const schools: School[] = [
  { id: 1, name: 'FC Estrela', city: 'São Paulo · SP', owner: 'Carlos Nunes', plan: 'Pro', status: 'active', studentCount: 142, mrrLabel: 'R$ 890' },
  { id: 2, name: 'Academia Bola', city: 'Campinas · SP', owner: 'Marina Reis', plan: 'Híbrido', status: 'active', studentCount: 98, mrrLabel: 'R$ 640' },
  { id: 3, name: 'Gol de Placa', city: 'Santos · SP', owner: 'Diego Alves', plan: 'Básico', status: 'late', studentCount: 54, mrrLabel: 'R$ 290' },
  { id: 4, name: 'CT Raízes', city: 'Sorocaba · SP', owner: 'Bruna Lima', plan: 'Pro', status: 'kyc', studentCount: 0, mrrLabel: '—' },
  { id: 5, name: 'Meninos de Ouro', city: 'Guarulhos · SP', owner: 'Paulo Souza', plan: 'Básico', status: 'suspended', studentCount: 0, mrrLabel: '—' },
  { id: 6, name: 'Vila Futebol', city: 'Osasco · SP', owner: 'Tânia M.', plan: 'Híbrido', status: 'active', studentCount: 120, mrrLabel: 'R$ 720' },
  { id: 7, name: 'Arena Plus', city: 'Santo André · SP', owner: 'Roberto C.', plan: 'Pro', status: 'active', studentCount: 165, mrrLabel: 'R$ 890' },
  { id: 8, name: 'Escola Talento', city: 'Ribeirão Preto · SP', owner: 'Cláudia R.', plan: 'Básico', status: 'active', studentCount: 48, mrrLabel: 'R$ 79' },
];

export const schoolStatusMap: Record<School['status'], StatusMapEntry> = {
  active: { label: 'Ativa', tone: 'success' },
  late: { label: 'Inadimplente', tone: 'danger' },
  kyc: { label: 'Pendente KYC', tone: 'info' },
  suspended: { label: 'Suspensa', tone: 'neutral' },
};

export const dashboardAlerts: DashboardAlert[] = [
  { icon: 'shield-alert', color: 'var(--info)', text: '3 KYC pendentes', go: 'kyc' },
  { icon: 'alert-circle', color: 'var(--warning)', text: '2 escolinhas inadimplentes', go: 'cobrancas' },
  { icon: 'webhook', color: 'var(--danger)', text: '1 webhook com falha', go: 'financeiro' },
];

export const planDistribution: PlanDistribution[] = [
  { name: 'Pro', count: 18, pct: 47 },
  { name: 'Básico', count: 14, pct: 37 },
  { name: 'Híbrido', count: 6, pct: 16 },
];

export const topBarNotifications: TopBarNotification[] = [
  { icon: 'shield-alert', color: 'var(--info)', title: '3 subcontas aguardam KYC', sub: 'CT Raízes, Meninos de Ouro…', time: 'há 10 min', unread: true },
  { icon: 'webhook', color: 'var(--danger)', title: 'Webhook com falha repetida', sub: 'pagar.me · payment.paid', time: 'há 32 min', unread: true },
  { icon: 'building-2', color: 'var(--success)', title: 'Nova escolinha cadastrada', sub: 'Escola Talento · Ribeirão Preto', time: 'há 2 h', unread: false },
  { icon: 'wallet', color: 'var(--gray-500)', title: 'Repasse de R$ 11.500 liberado', sub: '28 escolinhas · abril 2026', time: 'há 4 h', unread: false },
];
