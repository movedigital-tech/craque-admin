export interface PageMeta {
  title: string;
  subtitle: string;
}

export const escolinhaPageMeta: Record<string, PageMeta> = {
  '/escolinha/home': { title: 'Resumo da escolinha', subtitle: 'Olá, Carla 👋 — visão geral de julho.' },
  '/escolinha/turmas': { title: 'Turmas', subtitle: '4 turmas ativas · 142 alunos.' },
  '/escolinha/turmas/novo': { title: 'Nova turma', subtitle: 'Defina categoria, agenda, local e professores.' },
  '/escolinha/turmas/sub-9': { title: 'Turma Sub-9', subtitle: 'Quarta · 18h–19h30 · Campo 2 · Unidade Centro.' },
  '/escolinha/alunos': { title: 'Alunos', subtitle: '142 alunos matriculados em 4 turmas.' },
  '/escolinha/alunos/novo': { title: 'Iniciar matrícula', subtitle: 'Cadastre o aluno e convide o responsável.' },
  '/escolinha/responsaveis': { title: 'Responsáveis', subtitle: 'Responsáveis vinculados aos alunos.' },
  '/escolinha/agenda': { title: 'Agenda', subtitle: 'Próximas aulas das turmas da escolinha.' },
  '/escolinha/professores': { title: 'Professores & equipe', subtitle: 'Membros da equipe e turmas atribuídas.' },
  '/escolinha/professores/novo': { title: 'Adicionar membro', subtitle: 'Convide um professor ou membro da equipe.' },
  '/escolinha/config': { title: 'Configurações da escolinha', subtitle: 'Dados, notificações e equipe.' },
};
