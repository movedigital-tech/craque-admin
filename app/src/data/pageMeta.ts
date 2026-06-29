export interface PageMeta {
  title: string;
  subtitle: string;
}

export const pageMeta: Record<string, PageMeta> = {
  '/dashboard': { title: 'Dashboard geral', subtitle: 'Olá, Ricardo 👋 — visão da plataforma em junho de 2026.' },
  '/escolinhas': { title: 'Gestão de escolinhas', subtitle: '38 escolinhas cadastradas na plataforma.' },
  '/escolinhas/novo': { title: 'Cadastro de escolinha', subtitle: 'Preencha os dados e defina o plano SaaS.' },
  '/planos': { title: 'Planos SaaS', subtitle: 'Defina valores, percentuais por transação e limites.' },
  '/planos/novo': { title: 'Novo plano', subtitle: 'Defina valores, percentuais e recursos do plano SaaS.' },
  '/assinaturas': { title: 'Assinaturas SaaS', subtitle: 'Assinaturas das escolinhas na plataforma.' },
  '/cobrancas': { title: 'Cobranças SaaS', subtitle: 'Faturas da plataforma para as escolinhas.' },
  '/financeiro': { title: 'Financeiro da plataforma', subtitle: 'Receita, taxas retidas e repasses às escolinhas.' },
  '/gateway': { title: 'Gateway & Split', subtitle: 'Conexão com o provedor de pagamentos e divisão de valores.' },
  '/kyc': { title: 'Subcontas / KYC', subtitle: 'Verificação das escolinhas para receber pagamentos.' },
  '/relatorios': { title: 'Relatórios', subtitle: 'Exporte e analise dados consolidados da plataforma.' },
  '/usuarios': { title: 'Usuários & Perfis', subtitle: 'Time da plataforma e permissões de acesso.' },
  '/usuarios/convidar': { title: 'Convidar usuário', subtitle: 'Envie um convite de acesso e defina o perfil do usuário.' },
  '/config': { title: 'Configurações gerais', subtitle: 'Marca, notificações, segurança e faturamento.' },
};
