# Handoff — Frente **Admin** (Painel da plataforma)

> Começar o desenvolvimento por esta frente. Ler antes o `README.md` (raiz do
> pacote) para arquitetura, modelo Supabase e tokens. Protótipo de referência:
> `prototypes/Craque - Admin.html`. Capturas em `screenshots/`.

## Overview

Painel web (desktop) usado pelo **time da plataforma**. Centraliza a gestão das
escolinhas clientes, os planos SaaS, as assinaturas e cobranças da plataforma, a
conexão com o gateway de pagamento (split), o KYC das subcontas, o financeiro
consolidado e a administração do próprio time.

**Usuário do protótipo:** Ricardo Antunes · Super Admin.

## Layout geral (shell)

- **Sidebar fixa à esquerda, 250px**, fundo branco (`--surface-sidebar`).
  Topo: marca "Craque" (troféu lima). Itens de navegação principais + um bloco
  de rodapé (Usuários, Configurações). Item ativo destacado com lima
  (`--accent`).
- **Conteúdo rolável à direita**, padding `34px 36px`, fundo `--surface-canvas`
  (#FAFAFA).
- **Topbar** (componente `AdminTopBar`): título da página (h2 bold) +
  subtítulo à esquerda; à direita: campo de busca (230px), sino de
  notificações (com dot vermelho + dropdown), chip de conta (avatar + nome +
  papel + dropdown de menu: Meu perfil, Configurações, Suporte, Sair).
- **Rail direito** (~268px) em várias telas para widgets secundários.
- Login é tela cheia separada (sem shell).

## Navegação (rotas) — `SCREENS` no protótipo

Principais (sidebar):
- `dashboard` — Dashboard geral
- `escolinhas` — Gestão de escolinhas → `escolinha-cadastro` (Nova escolinha)
- `planos` — Planos SaaS → `plano-form` (Novo/Editar plano)
- `assinaturas` — Assinaturas SaaS
- `cobrancas` — Cobranças SaaS (faturas da plataforma p/ escolinhas)
- `financeiro` — Financeiro da plataforma
- `gateway` — Gateway & Split
- `kyc` — Subcontas / KYC
- `relatorios` — Relatórios

Rodapé:
- `usuarios` — Usuários & Perfis → `convidar-usuario` (Convidar usuário)
- `config` — Configurações gerais

Mais: `login`. Sub-rotas reativam o item de sidebar pai
(`escolinha-cadastro`→`escolinhas`, `plano-form`→`planos`,
`convidar-usuario`→`usuarios`).

---

## Telas

### Login (`login`)
- Split 46% / 54%. **Esquerda:** painel navy (`--navy-900`) com marca, headline
  "Gestão de escolinhas, do campo ao caixa." (campo lima na 2ª parte),
  subtítulo, e 3 mini-stats no rodapé (38 escolinhas / R$ 24,9k MRR / 4 mil+
  alunos). Marca-d'água sutil de campo de futebol em SVG (opacity .055).
- **Direita:** form sobre canvas. Inputs E-mail (icon mail) e Senha (icon
  lock); checkbox "Manter conectado" (custom, lima quando ativo); link "Esqueci
  a senha" (verde); botão primário "Entrar" full-width (icon log-in) → vai para
  `dashboard`. Caixa info (info-tint) sobre acesso restrito.

### Dashboard (`dashboard`)
- **Linha de 4 StatCards** (grid 4 col, gap 14): Escolinhas ativas **38**
  (+4/mês); MRR da plataforma **R$ 24.900** (+11%, card **dark**); Transações no
  mês **R$ 412 mil** (+8%); Inadimplência **6,2%** (-1,1pp, trend down).
- **Grid 2 col** `1fr / 268px`:
  - **Esquerda:** Card "Receita recorrente (MRR)" com **gráfico de linha**
    (SVG, curva suave, área com degradê lima, ponto final destacado; eixo Y em
    "k", 12 meses). Abaixo, Card "Escolinhas recentes" = tabela (Escolinha c/
    avatar+cidade, Plano badge, Status badge dot, Alunos, MRR); linha clicável
    (hover wash) → `escolinha-cadastro`; rodapé "Ver todas as 38 escolinhas →".
  - **Rail direito:** card **MRR dark** (degradê navy→plum, valor grande,
    +11%, breakdown Pro/Básico/Híbrido) · Card "Precisa de atenção" (alertas:
    KYC pendentes→`kyc`, inadimplentes→`cobrancas`, webhook falha→`financeiro`,
    cada um com botão "Ver") · Card "Distribuição de planos" (barras de
    progresso lima por plano).

### Escolinhas (`escolinhas`)
- Card único. Topo: **Tabs** (Todas 38 / Ativas 31 / Inadimplentes 4 /
  Suspensas 2 / Pendente KYC 1) + busca (190px) + botão "Filtros" (secondary) +
  "Nova escolinha" (primary, icon plus) → `escolinha-cadastro`.
- **Tabela:** Escolinha (avatar+cidade), Responsável, Plano (badge), Status
  (badge dot), Alunos (tabular), MRR (bold tabular), menu `more-horizontal`.
  Linha clicável → `escolinha-cadastro`. Filtra por tab e por busca
  (nome/responsável). Empty state "Nenhuma escolinha encontrada."
- Rodapé: "Mostrando N de 38" + paginação (1 2 3 … 7).
- Status map: active→Ativa(success), late→Inadimplente(danger),
  kyc→Pendente KYC(info), suspended→Suspensa(neutral).

### Cadastro de escolinha (`escolinha-cadastro`)
- Breadcrumb voltar (Escolinhas / **Nova escolinha**). Grid `1fr / 296px`.
- **Esquerda (3 cards):**
  - *Dados da escolinha:* Nome, CNPJ/CPF, Cidade (icon map-pin), Estado
    (select UF), upload de logo (dropzone tracejada, PNG/JPG máx 2MB).
  - *Responsável / contato:* Nome (icon user), E-mail (mail), Telefone/WhatsApp
    (phone), Cargo (select: Dono/Diretor/Coordenador).
  - *Plano & cobrança:* Plano SaaS (select c/ preços), Ciclo (Mensal/Anual),
    Status inicial (Ativa/Trial 30d/Aguardar KYC), Início da assinatura (data).
- **Rail direito:** aviso info (após salvar: convite por e-mail + fluxo KYC
  antes de cobrar) · Card "Resumo do plano" (Plano, Mensalidade, % transação,
  Ciclo, KYC: "Será solicitado") · Botões "Salvar e convidar" (→`kyc`) e
  "Cancelar" (→`escolinhas`).
- Componente auxiliar `DSSelect` (select estilizado com chevron e foco lima).

### Planos SaaS (`planos`)
- Botão "Novo plano" (→`plano-form`). **3 cards de plano** (Básico / **Pro**
  destacado borda lima "Mais usado" / Híbrido): preço grande + "/mês", "+ X%
  por transação", badge "N escolinhas ativas", lista de features com check
  verde, botão "Editar plano" (→`plano-form`).
- Aviso: mudança de plano não recalcula cobranças já geradas; split vigente é o
  do momento da criação da cobrança.

### Novo/Editar plano (`plano-form`)
- Breadcrumb voltar. Grid `1fr / 296px`.
- *Dados do plano:* Nome, Ciclo, Mensalidade SaaS (icon dollar), % por
  transação (icon percent), Descrição curta.
- *Limites & recursos:* Limite de alunos, Unidades incluídas + **toggles**
  (Alunos ilimitados, Split para professor, Multi-unidade, Suporte prioritário,
  Acesso à API).
- Rail: aviso (não recalcula); Card "Pré-visualização"; botões Salvar/Cancelar.

### Assinaturas SaaS (`assinaturas`)
- 3 StatCards: Assinaturas ativas 34; MRR R$ 24.900 (dark); Churn 2,1%
  (-0,4pp).
- Card com Tabs (Todas/Ativas/Em atraso/Canceladas) + "Exportar". Tabela:
  Escolinha (avatar), Plano, Ciclo, Próx. cobrança, Valor, Status (badge dot).
  Status: active→Ativa, late→Em atraso, suspended→Cancelada.

### Cobranças SaaS (`cobrancas`)
- 3 StatCards: Recebido em abril R$ 22.100 (dark); A vencer R$ 2.800; Vencido
  R$ 940 (4 faturas).
- Card com Tabs (Todas/Pagas/A vencer/Vencidas) + "Reenviar lembretes". Tabela:
  Escolinha, Referência, Valor, Vencimento, Método (badge), Status, ação
  (2ª via / Cobrar / Recibo conforme status).
  Status: paid→Pago, late→Vencido, pending→A vencer.

### Financeiro da plataforma (`financeiro`)
- Grid `1fr / 268px`.
- **Esquerda:** 4 StatCards (Volume transacionado R$ 412 mil; Taxa retida
  R$ 8.240 dark; Repasses às escolinhas R$ 392 mil; Saldo a repassar R$ 11.500)
  · Card "Volume mensal" (gráfico de barras 12 meses, última barra lima) · Card
  "Movimentações recentes" (tabela de transações: ID mono, Escolinha, Bruto,
  Taxa, Líquido, Status — Repassado/Em processamento/Estornado) + "Conciliação".
- **Rail:** Card "Próximo repasse" (R$ 11.500, 30 abr · 28 escolinhas, botão
  "Liberar repasses") · Card "Saúde de webhooks" (Entregues 1.284, Reprocessados
  12, Com falha 1; "Ver log de eventos").

### Gateway & Split (`gateway`)
- Grid `1fr / 268px`.
- **Esquerda:** Card "Provedor de pagamento" (badge "Conectado · Sandbox";
  Gateway=Pagar.me, Ambiente=Sandbox; Public/Secret key mascaradas, URL webhook;
  Métodos habilitados Pix/Cartão/Boleto; "Salvar configurações") · Card "Regras
  de split por plano" (tabela: Plano, Plataforma %, Escolinha %, Professor opc.;
  editar; "Nova regra").
- **Rail:** Card "Exemplo · R$ 100" (Responsável paga / Plataforma 2% / Taxa
  gateway / Escolinha recebe) · Card "Recursos do gateway" (lista com check).

### Subcontas / KYC (`kyc`)
- Grid `1fr / 268px`.
- **Esquerda:** 4 StatCards (Aprovadas 31 dark / Em análise 3 / Pendência docs 2
  / Recusadas 1) · Tabela (Escolinha, Subconta `rec_*` mono, Documentos, KYC
  badge dot, "Revisar"). Status: active→Aprovado, kyc→Em análise, late→
  Pendência, suspended→Recusado.
- **Rail:** Card "Etapas do KYC" (stepper vertical: Dados cadastrais✓, Documento
  do responsável✓, CNPJ/contrato (ativo), Conta bancária, Aprovação do gateway)
  + aviso "Escolinha só fica apta a cobrar após subconta aprovada".

### Relatórios (`relatorios`)
- Card de filtros (Tipo / Escolinha / Período / Formato + "Exportar").
- Grid de 6 cards de tipo de relatório (Financeiro consolidado, Inadimplência,
  Transações, Assinaturas SaaS, Splits & repasses, KYC/compliance) — clicáveis.
- Card "Prévia · Financeiro consolidado" com tabela (Escolinha, Volume, Taxa
  plataforma, Repassado, Inadimplência).

### Usuários & Perfis (`usuarios`)
- Grid `1fr / 268px`.
- **Esquerda:** Card com Tabs (Ativos · 6 / Convites · 2) + "Convidar usuário"
  (→`convidar-usuario`). Tabela: Usuário (avatar+email), Perfil (badge), Status
  (Ativo/Convite), Último acesso, menu. Perfis: Super Admin, Financeiro,
  Suporte, Comercial.
- **Rail:** Card "Perfis & permissões" (lista de perfis + "Novo perfil").

### Convidar usuário (`convidar-usuario`)
- Breadcrumb voltar. *Dados do convidado* (Nome, E-mail, Mensagem opcional) ·
  *Perfil de acesso* (4 opções de rádio-card: Super Admin/Financeiro/Suporte/
  Comercial). Rail: aviso (link por e-mail válido 7 dias) + "Resumo do convite"
  (Perfil, Status, Validade, 2FA) + Enviar convite / Cancelar.

### Configurações gerais (`config`)
- Tabs: Geral / Marca / Notificações / Segurança / Faturamento.
- *Identidade da plataforma* (Nome, Domínio, Idioma, Fuso; upload logo & cores)
  · *Notificações & lembretes* (toggles: lembrete mensalidade, aviso
  inadimplência, alertas webhook, suspensão automática 15d) · *Segurança*
  (toggle exigir 2FA, sessão expira 8h). Rail: aviso LGPD/audit log + "Salvar".

---

## Interações & comportamento

- **Navegação SPA:** estado `view` controla a tela; `navigate(key)` troca.
  Login isolado; demais telas dentro do shell (sidebar + topbar).
- **Dropdowns** (notificações, conta) fecham ao clicar fora (listener
  mousedown). Sino com dot vermelho quando há não-lidas.
- **Tabs** filtram listas no cliente (no app real: filtro server-side/RLS).
- **Busca** filtra por nome/responsável.
- **Linhas de tabela** clicáveis com hover wash (`--surface-subtle`); ações
  dentro da linha usam `stopPropagation`.
- **Toggles/checkbox** custom, lima quando ativos, transição ~.2s.
- **Foco de input/select:** borda lima + halo `--accent-tint`.
- **Gráficos** animam uma vez; respeitar `prefers-reduced-motion`.

## Estados a implementar (além do protótipo)
- Loading (skeletons em tabelas/cards), empty states, erros de fetch.
- Validação de formulários (CNPJ/CPF, e-mail, valores monetários BR).
- Permissões por sub-papel (super/financeiro/suporte/comercial) ocultando/
  desabilitando ações.
- Estados de pagamento/webhook em tempo real (Supabase Realtime) no Financeiro.

## Dados de exemplo
Os arrays mock estão em `window.AD` no topo do protótipo (escolinhas, stats,
chart MRR, alerts, planos) e nos componentes de cada tela — úteis para semear o
banco em desenvolvimento.
