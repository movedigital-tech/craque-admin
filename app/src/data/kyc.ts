import type { KycStep, StatusMapEntry, Subaccount } from './types';

export const subaccounts: Subaccount[] = [
  { schoolName: 'FC Estrela', recipientId: 'rec_8841', docsStatus: 'Completos', status: 'active' },
  { schoolName: 'Academia Bola', recipientId: 'rec_8839', docsStatus: 'Completos', status: 'active' },
  { schoolName: 'CT Raízes', recipientId: '—', docsStatus: 'CNPJ + sócio', status: 'kyc' },
  { schoolName: 'Gol de Placa', recipientId: 'rec_8801', docsStatus: 'Falta comprovante', status: 'late' },
  { schoolName: 'Meninos de Ouro', recipientId: '—', docsStatus: 'Reprovado', status: 'suspended' },
];

export const subaccountStatusMap: Record<Subaccount['status'], StatusMapEntry> = {
  active: { label: 'Aprovado', tone: 'success' },
  kyc: { label: 'Em análise', tone: 'info' },
  late: { label: 'Pendência', tone: 'warning' },
  suspended: { label: 'Recusado', tone: 'danger' },
};

export const kycSteps: KycStep[] = [
  { label: 'Dados cadastrais', status: 'done' },
  { label: 'Documento do responsável', status: 'done' },
  { label: 'CNPJ / contrato social', status: 'active' },
  { label: 'Conta bancária', status: 'pending' },
  { label: 'Aprovação do gateway', status: 'pending' },
];
