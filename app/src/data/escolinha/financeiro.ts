import type { BadgeTone } from '../../components/ds';
import type { BarChartData, FinanceiroRow, FinanceiroStatus } from './types';

export const financeiroBars: BarChartData = {
  labels: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
  vals: [12.1, 12.8, 13.4, 14.0, 14.6, 15.1, 15.8, 16.3, 16.9, 17.4, 17.9, 18.4],
};

export const financeiroStatusTone: Record<FinanceiroStatus, BadgeTone> = { ok: 'success', bad: 'danger', info: 'info' };

export const financeiroRows: FinanceiroRow[] = [
  { name: 'Lucas Pereira', ref: 'Mensalidade abr', bruto: 'R$ 250,00', taxa: 'R$ 8,73', liq: 'R$ 241,27', st: 'ok', lbl: 'Repassado' },
  { name: 'Ana Beatriz', ref: 'Mensalidade abr', bruto: 'R$ 250,00', taxa: 'R$ 8,73', liq: 'R$ 241,27', st: 'ok', lbl: 'Repassado' },
  { name: 'Davi Souza', ref: 'Mensalidade abr', bruto: 'R$ 220,00', taxa: 'R$ 7,68', liq: 'R$ 212,32', st: 'bad', lbl: 'Em atraso' },
  { name: 'Mariana Alves', ref: 'Matrícula', bruto: 'R$ 100,00', taxa: 'R$ 3,49', liq: 'R$ 96,51', st: 'info', lbl: 'Processando' },
];
