import type { Turma, TurmaAluno } from './types';

export const turmas: Turma[] = [
  { nome: 'Sub-7', cat: '5 a 7 anos', agenda: 'Sábado · 09h–10h30', local: 'Campo 1 · Centro', prof: 'Prof. Lucas', alunos: 18, vagas: 20 },
  { nome: 'Sub-9', cat: '8 a 9 anos', agenda: 'Quarta · 18h–19h30', local: 'Campo 2 · Centro', prof: 'Prof. Lucas', alunos: 24, vagas: 24 },
  { nome: 'Sub-11', cat: '10 a 11 anos', agenda: 'Terça · 17h–18h30', local: 'Campo 1 · Norte', prof: 'Profª. Bia', alunos: 21, vagas: 26 },
  { nome: 'Sub-13', cat: '12 a 13 anos', agenda: 'Quinta · 19h–20h30', local: 'Campo 2 · Norte', prof: 'Prof. André', alunos: 16, vagas: 24 },
];

export const turmaDetalheAlunos: TurmaAluno[] = [
  { name: 'Lucas Pereira', idade: '9 anos', resp: 'Marcos Pereira', pre: '92%', ok: true },
  { name: 'Pedro Henrique', idade: '9 anos', resp: 'Sandra Lima', pre: '95%', ok: true },
  { name: 'Bruno Dias', idade: '8 anos', resp: 'Carla Dias', pre: '70%', ok: false },
  { name: 'Théo Moraes', idade: '9 anos', resp: 'Rita Moraes', pre: '88%', ok: true },
  { name: 'Gael Nunes', idade: '8 anos', resp: 'Ivo Nunes', pre: '83%', ok: false },
  { name: 'Vitor Reis', idade: '9 anos', resp: 'Lia Reis', pre: '97%', ok: true },
];
