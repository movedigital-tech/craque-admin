import type { FinanceiroTransaction, StatusMapEntry, WebhookHealthItem } from './types';

export const volumeMensalBars: number[] = [58, 74, 66, 88, 80, 96, 94, 100, 96, 100, 92, 100];

export const volumeMensalLabels: string[] = ['Mai', '', 'Jul', '', 'Set', '', 'Nov', '', 'Jan', '', 'Mar', 'Abr'];

export const financeiroTransactions: FinanceiroTransaction[] = [
  { id: '#TX-90412', schoolName: 'FC Estrela', grossLabel: 'R$ 250,00', feeLabel: 'R$ 5,00', netLabel: 'R$ 245,00', status: 'paid' },
  { id: '#TX-90410', schoolName: 'Academia Bola', grossLabel: 'R$ 220,00', feeLabel: 'R$ 3,30', netLabel: 'R$ 216,70', status: 'paid' },
  { id: '#TX-90408', schoolName: 'Gol de Placa', grossLabel: 'R$ 280,00', feeLabel: 'R$ 8,12', netLabel: 'R$ 271,88', status: 'pending' },
  { id: '#TX-90405', schoolName: 'Vila Futebol', grossLabel: 'R$ 250,00', feeLabel: 'R$ 3,75', netLabel: 'R$ 246,25', status: 'late' },
];

export const financeiroTransactionStatusMap: Record<FinanceiroTransaction['status'], StatusMapEntry> = {
  paid: { label: 'Repassado', tone: 'success' },
  pending: { label: 'Em processamento', tone: 'info' },
  late: { label: 'Estornado', tone: 'danger' },
};

export const nextPayout = {
  amountLabel: 'R$ 11.500,00',
  dateLabel: '30 abr · 28 escolinhas',
};

export const webhookHealth: WebhookHealthItem[] = [
  { label: 'Entregues (24h)', value: '1.284', tone: 'success' },
  { label: 'Reprocessados', value: '12', tone: 'warning' },
  { label: 'Com falha', value: '1', tone: 'danger' },
];
