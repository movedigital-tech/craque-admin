import type { GatewayAccount, SplitRule } from './types';

export const gatewayAccount: GatewayAccount = {
  provider: 'Pagar.me',
  environment: 'Sandbox',
  publicKeyMasked: 'pk_test_••••••••',
  secretKeyMasked: 'sk_test_••••••••',
  webhookUrl: 'https://api.craque.com/webhooks/payment-gateway',
  methods: ['Pix', 'Cartão', 'Boleto'],
};

export const splitRules: SplitRule[] = [
  { plan: 'Básico', platformPct: '2,9%', schoolPct: '97,1%', teacherPct: '—', status: 'active' },
  { plan: 'Pro', platformPct: '2,0%', schoolPct: '88,0%', teacherPct: 'até 10%', status: 'active' },
  { plan: 'Híbrido', platformPct: '1,5%', schoolPct: '88,5%', teacherPct: 'até 10%', status: 'active' },
];

export const splitExample: { label: string; value: string; color?: string }[] = [
  { label: 'Responsável paga', value: 'R$ 100,00' },
  { label: 'Plataforma (2%)', value: 'R$ 2,00', color: 'var(--lime-700)' },
  { label: 'Taxa gateway', value: 'R$ 1,99' },
  { label: 'Escolinha recebe', value: 'R$ 96,01' },
];

export const gatewayFeatures: string[] = [
  'Pix / cartão / boleto',
  'Recorrência',
  'Split multi-recebedor',
  'Subcontas / KYC',
  'Webhooks',
  'Estorno & chargeback',
];
