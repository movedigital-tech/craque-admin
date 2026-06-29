import type { Plan } from './types';

export const plans: Plan[] = [
  {
    id: 'basico',
    name: 'Básico',
    priceLabel: 'R$ 79',
    txnPctLabel: '2,9%',
    features: ['Até 60 alunos', 'Pix + boleto', 'Relatórios básicos', '1 unidade'],
    activeSchools: 14,
  },
  {
    id: 'pro',
    name: 'Pro',
    priceLabel: 'R$ 149',
    txnPctLabel: '2,0%',
    features: ['Alunos ilimitados', 'Pix, cartão e boleto', 'Split p/ professor', 'Relatórios avançados'],
    activeSchools: 18,
    highlighted: true,
  },
  {
    id: 'hibrido',
    name: 'Híbrido',
    priceLabel: 'R$ 99',
    txnPctLabel: '1,5%',
    features: ['Fixo menor + % maior', 'Pix, cartão e boleto', 'Multi-unidade', 'Suporte prioritário'],
    activeSchools: 6,
  },
];
