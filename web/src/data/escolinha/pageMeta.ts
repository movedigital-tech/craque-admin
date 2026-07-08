export interface PageMeta {
  title: string;
  subtitle: string;
}

export const escolinhaPageMeta: Record<string, PageMeta> = {
  '/escolinha/home': { title: 'Resumo da escolinha', subtitle: 'Visão geral da escolinha.' },
  '/escolinha/turmas': { title: 'Turmas', subtitle: 'Turmas ativas da escolinha.' },
  '/escolinha/turmas/novo': { title: 'Nova turma', subtitle: 'Defina categoria, agenda, local e professores.' },
  '/escolinha/alunos': { title: 'Alunos', subtitle: 'Alunos matriculados na escolinha.' },
  '/escolinha/alunos/novo': { title: 'Iniciar matrícula', subtitle: 'Cadastre o aluno e convide o responsável.' },
  '/escolinha/responsaveis': { title: 'Responsáveis', subtitle: 'Responsáveis vinculados aos alunos.' },
  '/escolinha/agenda': { title: 'Agenda', subtitle: 'Próximas aulas das turmas da escolinha.' },
  '/escolinha/professores': { title: 'Professores & equipe', subtitle: 'Membros da equipe e turmas atribuídas.' },
  '/escolinha/professores/novo': { title: 'Adicionar membro', subtitle: 'Convide um professor ou membro da equipe.' },
  '/escolinha/config': { title: 'Configurações da escolinha', subtitle: 'Dados, notificações e equipe.' },
};
