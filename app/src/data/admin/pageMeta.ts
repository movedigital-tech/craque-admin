export interface PageMeta {
  title: string;
  subtitle: string;
}

export const pageMeta: Record<string, PageMeta> = {
  '/dashboard': { title: 'Dashboard geral', subtitle: 'Olá, Ricardo 👋 — visão geral das organizações na plataforma.' },
  '/organizations': { title: 'Organizações', subtitle: 'Escolinhas cadastradas na plataforma e status da conta.' },
  '/subscriptions': { title: 'Assinaturas', subtitle: 'Status da assinatura e eventos recebidos do gateway.' },
  '/webhook-logs': { title: 'Webhook Logs', subtitle: 'Eventos recebidos do gateway de pagamento, em ordem cronológica.' },
  '/usuarios': { title: 'Usuários', subtitle: 'Equipe interna da Craque com acesso ao admin.' },
  '/config': { title: 'Configurações técnicas', subtitle: 'Parâmetros técnicos da plataforma.' },
};
