import type { SaasInvoice, StatusMapEntry } from './types';

export const saasInvoices: SaasInvoice[] = [
  { schoolName: 'FC Estrela', reference: 'Abr/2026 · Pro', amountLabel: 'R$ 149', dueDateLabel: '01 abr', method: 'Cartão', status: 'paid' },
  { schoolName: 'Academia Bola', reference: 'Abr/2026 · Híbrido', amountLabel: 'R$ 99', dueDateLabel: '03 abr', method: 'Pix', status: 'paid' },
  { schoolName: 'Gol de Placa', reference: 'Abr/2026 · Básico', amountLabel: 'R$ 79', dueDateLabel: '28 abr', method: 'Boleto', status: 'late' },
  { schoolName: 'CT Raízes', reference: 'Abr/2026 · Pro', amountLabel: 'R$ 149', dueDateLabel: '30 abr', method: 'Pix', status: 'pending' },
];

export const saasInvoiceStatusMap: Record<SaasInvoice['status'], StatusMapEntry> = {
  paid: { label: 'Pago', tone: 'success' },
  late: { label: 'Vencido', tone: 'danger' },
  pending: { label: 'A vencer', tone: 'info' },
};
