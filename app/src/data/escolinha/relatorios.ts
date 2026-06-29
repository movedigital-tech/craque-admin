import type { InadimplenciaRow } from './types';

export interface ReportTypeCard {
  icon: string;
  name: string;
  sub: string;
}

export const reportTypes: ReportTypeCard[] = [
  { icon: 'bar-chart-3', name: 'Financeiro', sub: 'Recebido, a receber e taxas' },
  { icon: 'user-x', name: 'Inadimplência', sub: 'Alunos em atraso' },
  { icon: 'calendar-check', name: 'Presença', sub: 'Frequência por turma' },
];

export const inadimplenciaRows: InadimplenciaRow[] = [
  { name: 'Davi Souza', turma: 'Sub-7', resp: 'Renata Souza', val: 'R$ 220,00', ha: '14 dias' },
  { name: 'Bruno Dias', turma: 'Sub-9', resp: 'Carla Dias', val: 'R$ 250,00', ha: '8 dias' },
  { name: 'Igor Melo', turma: 'Sub-13', resp: 'Ana Melo', val: 'R$ 280,00', ha: '3 dias' },
];
