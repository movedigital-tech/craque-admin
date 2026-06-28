# Frente 4 Instrutor Professor

_Started 2026-06-25 14:41 UTC_

---

## User

Agora precisamos incluir uma nova frente, a Frente 4 (Instrutor/Professor). Não precisa seguir o layout, mas é preciso estruturar o que o instrutor precisa.

## Assistant

_[tool: read_file]_

_[tool: view_image]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: view_image]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: update_todos]_

Tenho tudo que preciso. Vou criar as telas do instrutor agora — chamada, turmas, alunos, calendário e comunicados — seguindo exatamente o mesmo padrão mobile das outras frentes.

_[tool: write_file]_

_[tool: write_file]_

_[tool: ready_for_verification]_

_[tool: update_todos]_

**Frente 4 — Instrutor** está pronta. As telas cobertas:

- **Login** — acesso com e-mail/senha, orientação sobre convite da escolinha
- **Home** — saudação, card da escola + cargo, mini-stats (turmas, alunos, treino hoje), lista de turmas e ações rápidas
- **Turmas** — lista com cards coloridos por turma
- **Detalhe da turma** — tabs Alunos · Chamadas · Horário, com histórico de presença e botão de chamada
- **Chamada** — seletor turma/data, contador em tempo real (presentes / faltas / pendentes), botão presente/falta por aluno
- **Chamada confirmada** — resumo com lista de faltantes e opção de notificar responsáveis
- **Alunos** — segmentado por turma, busca, % de presença por aluno
- **Detalhe do aluno** — tabs Dados · Presença · Contato (com WhatsApp do responsável)
- **Calendário** — mini-calendário semanal, treinos do dia com atalho de chamada, próximos eventos
- **Comunicados** — recebidos/enviados, detalhe de comunicado, resposta
- **Perfil** — turmas atribuídas, dados pessoais (com campo CREF), notificações, ajuda

A tab central "Chamada" tem destaque visual (pílula escura) para deixar claro que é a ação principal do instrutor.

## User

Com base na identidade visual (Campo — Football School Management Design System) podemos criar agora o UI do projeto. Vamos fasear essa criação, iniciando com a frente 1 (Admin), depois que encerrarmos essa frente, eu vou analisar e sugerir ajustes se necessário, somente depois então que seguiremos para as próximas frentes.

## Assistant

_[tool: read_skill_prompt]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Entendido — tenho contexto suficiente para fazer boas perguntas antes de começar. Deixa eu ler os últimos arquivos-chave e já te apresento as perguntas.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Tenho todo o contexto que preciso. Vou fazer as perguntas certas antes de começar a construir.

_[tool: questions_v2]_

## User

Questions answered:
- telas_prioritarias: Login, Dashboard geral, Gestão de escolinhas (lista), Cadastro / edição de escolinha
- nome_produto: Utilizar a qual mais tem haver com o projeto, e que mais tenha probabilidade de ser melhor encontrada nos buscadores, e que tenha domínio ainda não registrado. 
- navegacao: Protótipo clicável completo (todas as telas navegáveis)
- logo: Usar logo quando tivermos — deixar placeholder claro
- graficos: Gráficos funcionais com dados mockados (Chart.js ou similar)
- densidade: Confortável — espaçamento generoso como no DS
- variacao: Uma versão fiel ao Campo DS

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Ótimo! Tenho tudo que preciso. Vou usar **"Craque"** — já estabelecido nos wireframes, é um termo do futebol brasileiro muito forte ("craque" = estrela/ás), memorável e com chances altas de domínio disponível.

Vou construir agora: Login · Dashboard · Escolinhas · Cadastro — protótipo clicável completo, fiel ao Campo DS.

_[tool: update_todos]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: ready_for_verification]_

_[tool: update_todos]_

_[tool: save_screenshot]_

_[tool: get_webview_logs]_

A página está em branco — vou inspecionar o problema.

_[tool: grep]_

_[tool: show_html]_

_[tool: read_file]_

O problema é que o Babel standalone não carrega arquivos externos via `src` nesse ambiente. Vou reescrever como um único arquivo com todos os scripts JSX inline — a abordagem mais confiável.

_[tool: write_file]_

_[tool: ready_for_verification]_

_[tool: save_screenshot]_

Funcionando! Login e Dashboard renderizando corretamente. Vejo dois ajustes a fazer: os stat cards ficam apertados na viewport de preview e a topbar title está quebrando linha. Vou corrigir o layout do Dashboard.

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

_[tool: multi_screenshot]_

Tudo funcionando muito bem! Aqui está o resumo do que foi entregue:

**4 telas completas, navegáveis:**

1. **Login** — layout split, painel navy com SVG de campo ao fundo, headline com acento lime, estatísticas da plataforma e form com checkbox animado
2. **Dashboard** — 2×2 stat cards, gráfico MRR com linha suave e área lime, tabela de escolinhas recentes clicável, card dark de destaque + alertas + distribuição de planos no rail direito
3. **Gestão de Escolinhas** — tabs filtrantes (Todas · Ativas · Inadimplentes · Suspensas · KYC), busca inline, tabela completa com avatares/badges/hover, paginação
4. **Cadastro de Escolinha** — 3 cards de formulário (Dados · Responsável · Plano), selects estilizados, área de logo drag-and-drop, rail com resumo do plano e botão "Salvar e convidar"

**Navegação clicável:** sidebar ativa a seção correta, rows da tabela abrem o cadastro, botões "Ver todas" e "Nova escolinha" funcionam, breadcrumb volta para a lista.

**Próximos passos ao seu critério:**
- Ajustar conteúdo/copy após revisão
- Adicionar as demais 9 telas (Planos, Assinaturas, Financeiro, Gateway, KYC, Relatórios, Usuários, Configurações) na mesma iteração
- Validar o nome "Craque" e substituir pelo definitivo quando confirmado

## User

Antes de seguir, temos ajustes: 
1. Lá em Escolinhas recentes no dashboard precisamos ajustar as margens, talvez esteja faltando margem ali nesse card, confere ai por favor. (anexo 1)
2. Lá em Escolinhas (Gestão de escolinhas) o nome das colunas (Escolinha, Responsável, Plano, Status, Alunos, MRR), estão muito colados nas abas, precisamos de um respiro maior. (anexo 2)

## Assistant

Dois ajustes cirúrgicos: padding no header do card "Escolinhas recentes" e respiro acima dos headers da tabela em Gestão de Escolinhas.

_[tool: str_replace_edit]_

O erro é que `th` existe em dois componentes. Vou usar contexto mais amplo para ser preciso — e fazer as 3 edições separadamente.

_[tool: str_replace_edit]_

Agora o fix do `th` no Escolinhas, usando contexto único do `td` desse componente:

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

_[tool: multi_screenshot]_

Ambos os ajustes aplicados e verificados nas capturas:

1. **"Escolinhas recentes" (Dashboard)** — o header do card agora tem 20px de padding horizontal e 18px de respiro abaixo antes da tabela, em vez de ficar encostado na borda.

2. **"Gestão de Escolinhas"** — os headers de coluna (ESCOLINHA, RESPONSÁVEL, PLANO…) agora têm 22px de espaço acima, criando o respiro entre as abas de filtro e a tabela.

Pode revisar e me dizer se há mais ajustes antes de seguirmos para as próximas telas.

## User

1. lá em "Escolinhas recentes" (Dashboard) quero tudo com 24px. 
2. No dash, as infos de big numbers, podem vir uma ao lado da outra como no wireframe, e não 2 e 2. 
3. Ajustar o nome de Rafael para Ricardo

## Assistant

Três ajustes pontuais — stats em linha, 24px no card e nome correto.

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

_[tool: multi_screenshot]_

Os 3 ajustes estão aplicados — Ricardo ✓, stats em linha ✓, 24px no card ✓. Os stat cards ficam um pouco apertados na viewport estreita do preview, mas em tela real (1440px+) os 4 ficam alinhados com espaço adequado.

Se quiser testar em tela cheia, abra `Craque - Admin.html` no browser em janela maximizada. Pode me dizer o que mais precisa ajustar ou se seguimos para as próximas telas.

## User

Todos os cards podemos padronizar com 24px de padding, inclusive a tabela na pagina de Gestão de escolinhas em Escolinhas.

## Assistant

_[tool: grep]_

Agora aplico todas as padronizações de 24px em batch:

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Feito — todos os 7 pontos ajustados para 24px:

- Cards "Precisa de atenção", "Distribuição de planos" e "Resumo do plano" → `padding={24}`
- Tabela de Escolinhas: `th` com 24px horizontal, `td` com 24px horizontal
- Header de abas/filtros: `24px 24px`
- Footer de paginação: `24px` lateral e inferior
- Botão "Ver todas as 38 escolinhas" alinhado ao mesmo 24px

Tudo uniforme agora. Me avise quando quiser seguir para as próximas telas ou tiver mais ajustes.

## User

Excelente, melhorou muito. Agora podemos seguir para todas as demais páginas do projeto, da frente do admin. No mais crie também como serão as notificações, e o que tanto tem no menu dropdown onde tem meu nome (super admin.)

## Assistant

_[tool: snip]_

Vou ler as seções que preciso substituir antes de escrever.

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Agora faço as duas substituições: TopBar com dropdowns, e um novo bloco com todos os screens restantes + App atualizado.

_[tool: str_replace_edit]_

Agora substituo o bloco final (App+Mount) pelo bloco com todos os 9 screens + app atualizado:

_[tool: str_replace_edit]_

## Assistant

_[tool: ready_for_verification]_

_[tool: snip]_

_[tool: multi_screenshot]_

Tudo renderizando sem erros. Aqui está o estado completo da **Frente 1 — Admin**:

**Screens entregues (12 no total, todas navegáveis):**
- Login · Dashboard · Gestão de Escolinhas · Cadastro de Escolinha
- **Planos SaaS** — 3 cards com features, Pro destacado com borda lime
- **Assinaturas SaaS** — stats + tabela com filtros por status
- **Cobranças SaaS** — stats + tabela com ação contextual (2ª via / Cobrar / Recibo)
- **Financeiro** — 4 stats + bar chart mensal + movimentações + rail (repasse + webhooks)
- **Gateway & Split** — config do provedor + tabela de regras + cálculo de exemplo
- **Subcontas / KYC** — 4 stats + tabela + checklist de etapas com status visual
- **Relatórios** — filtros de exportação + 6 cards de tipo + prévia de tabela
- **Usuários & Perfis** — tabela com tabs Ativos/Convites + rail de perfis/permissões
- **Configurações** — tabs Geral/Marca/Notificações/Segurança/Faturamento + toggles interativos

**Novos elementos de UI:**
- 🔔 **Notificações** — painel dropdown com badge de contagem, 4 notificações (lidas/não lidas), "marcar como lidas"
- 👤 **Menu do usuário** — dropdown com nome/role, Meu perfil, Configurações (navega), Sair

Quando quiser seguir para a **Frente 2 (Escolinha)** é só avisar.

