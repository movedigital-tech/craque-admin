import type { ReportPreviewRow, ReportType } from './types';

export const reportTypes: ReportType[] = [
  { icon: 'bar-chart-3', name: 'Financeiro consolidado', sub: 'Receita, taxas e repasses' },
  { icon: 'user-x', name: 'Inadimplência', sub: 'Por escolinha e período' },
  { icon: 'arrow-left-right', name: 'Transações', sub: 'Detalhe de cada pagamento' },
  { icon: 'repeat', name: 'Assinaturas SaaS', sub: 'MRR, churn e upgrades' },
  { icon: 'git-merge', name: 'Splits & repasses', sub: 'Auditoria de divisão' },
  { icon: 'shield-check', name: 'KYC / compliance', sub: 'Status das subcontas' },
];

export const reportPreviewRows: ReportPreviewRow[] = [
  { schoolName: 'FC Estrela', volumeLabel: 'R$ 34.200', platformFeeLabel: 'R$ 684', payoutLabel: 'R$ 33.516', delinquencyLabel: '2,1%' },
  { schoolName: 'Academia Bola', volumeLabel: 'R$ 21.600', platformFeeLabel: 'R$ 324', payoutLabel: 'R$ 21.276', delinquencyLabel: '4,0%' },
  { schoolName: 'Gol de Placa', volumeLabel: 'R$ 11.880', platformFeeLabel: 'R$ 344', payoutLabel: 'R$ 11.536', delinquencyLabel: '9,3%' },
  { schoolName: 'Vila Futebol', volumeLabel: 'R$ 28.800', platformFeeLabel: 'R$ 432', payoutLabel: 'R$ 28.368', delinquencyLabel: '1,2%' },
];
