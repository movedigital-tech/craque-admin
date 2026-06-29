import type { StatusMapEntry, Subscription } from './types';

export const subscriptions: Subscription[] = [
  { schoolName: 'FC Estrela', plan: 'Pro', cycle: 'Mensal', nextChargeLabel: '01 mai 2026', amountLabel: 'R$ 149', status: 'active' },
  { schoolName: 'Academia Bola', plan: 'Híbrido', cycle: 'Mensal', nextChargeLabel: '03 mai 2026', amountLabel: 'R$ 99', status: 'active' },
  { schoolName: 'Gol de Placa', plan: 'Básico', cycle: 'Mensal', nextChargeLabel: '28 abr 2026', amountLabel: 'R$ 79', status: 'late' },
  { schoolName: 'Vila Futebol', plan: 'Híbrido', cycle: 'Anual', nextChargeLabel: '12 jan 2027', amountLabel: 'R$ 990', status: 'active' },
  { schoolName: 'Meninos de Ouro', plan: 'Básico', cycle: 'Mensal', nextChargeLabel: '—', amountLabel: 'R$ 79', status: 'suspended' },
];

export const subscriptionStatusMap: Record<Subscription['status'], StatusMapEntry> = {
  active: { label: 'Ativa', tone: 'success' },
  late: { label: 'Em atraso', tone: 'danger' },
  suspended: { label: 'Cancelada', tone: 'neutral' },
};
