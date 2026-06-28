# Handoff — Craque · SaaS de Gestão de Escolinhas de Futebol

> **Marca provisória.** "Craque" e o logo (troféu lima) são placeholders até o
> cliente fechar a identidade. Trocar wordmark, marca e nome do projeto quando
> a marca for definida. O design system de base chama-se **Campo**.

---

## 1. Visão geral

Plataforma SaaS B2B2C para gestão de escolinhas de futebol no Brasil. O
produto conecta **quatro frentes (perfis de usuário)** sobre uma **base de
dados compartilhada**. A plataforma cobra das escolinhas (assinatura SaaS) e
processa os pagamentos das mensalidades dos alunos com **split** (plataforma /
escolinha / professor) via gateway de pagamento com **subcontas e KYC**.

As quatro frentes:

| Frente | Quem usa | Dispositivo | Papel |
|---|---|---|---|
| **Admin** | Time da plataforma (você) | Web desktop | Gerencia escolinhas, planos SaaS, assinaturas, cobranças da plataforma, gateway/split, KYC, financeiro consolidado |
| **Escolinha** | Dono / coordenador da escolinha | Web desktop | Gerencia turmas, alunos, responsáveis, mensalidades, financeiro, professores |
| **Instrutor** | Professor / técnico | Mobile | Vê suas turmas e alunos, faz chamada (presença), comunicados, calendário |
| **Responsável** | Pai / mãe / responsável | Mobile | Vê alunos vinculados, paga mensalidades (Pix/cartão/boleto), comprovantes |

**Começar o desenvolvimento pelo Admin** (ver `ADMIN.md`). Os demais perfis
estão documentados aqui em nível de arquitetura e têm protótipos em
`prototypes/`.

---

## 2. Sobre os arquivos deste pacote

Os arquivos em `prototypes/` são **referências de design feitas em HTML** —
protótipos que mostram aparência e comportamento pretendidos, **não** código de
produção para copiar diretamente. Eles usam React + Babel no navegador apenas
para prototipar rápido.

**A tarefa é recriar esses designs em um app real**, escolhendo a stack
apropriada (recomendação abaixo) e usando os **tokens do design system Campo**
(cores, tipografia, espaçamento) como fonte da verdade visual. Os componentes
visuais (Button, Card, StatCard, Badge, Tabs, SidebarNav, Input, Avatar etc.)
devem ser reconstruídos como componentes nativos da stack escolhida, fiéis ao
design.

**Fidelidade: alta (hi-fi).** Os protótipos têm cores, tipografia, espaçamento
e interações finais. Recriar a UI fielmente.

### Conteúdo
```
design_handoff_craque/
├── README.md            ← este arquivo (arquitetura + Supabase + tokens)
├── ADMIN.md             ← guia detalhado da frente Admin (começar por aqui)
├── prototypes/
│   ├── Craque - Admin.html
│   ├── Craque - Escolinha.html
│   ├── Craque - Instrutor.html
│   ├── Craque - Responsável.html
│   └── _ds/             ← design system Campo (tokens CSS + componentes de referência)
└── screenshots/         ← capturas das telas do Admin
```
Para abrir os protótipos: sirva a pasta `prototypes/` por um servidor estático
(ex.: `npx serve prototypes`) e abra cada HTML. Eles dependem do `_ds/` por
caminho relativo.

---

## 3. Como as frentes conversam (modelo de dados)

Este é o ponto mais importante para não perder conexões entre as frentes. Tudo
gira em torno de poucas **entidades centrais compartilhadas**:

```
                          ┌─────────────┐
                          │  platform   │  (config global, gateway keys)
                          └──────┬──────┘
                                 │ 1:N
                          ┌──────▼──────┐        ┌──────────────┐
            ┌─── plano ──▶│   school    │◀─ 1:1 ─│ subscription │ (assinatura SaaS)
            │  (SaaS)     │ (escolinha) │        └──────────────┘
            │             └──────┬──────┘               │ gera
            │            1:N ┌───┼────┬─────────┐  ┌─────▼─────────┐
            │                │   │    │         │  │ saas_invoice  │ (cobrança SaaS p/ escolinha)
       ┌────▼────┐     ┌─────▼─┐ │ ┌──▼──────┐  │  └───────────────┘
       │  plan   │     │ class │ │ │ teacher │  │
       │ (SaaS)  │     │(turma)│ │ │(prof.)  │  │
       └─────────┘     └───┬───┘ │ └────┬────┘  │
                       N:M │     │      │ split │
                    ┌──────▼─────▼┐     │       │
                    │   student   │◀────┘ (leciona)
                    │   (aluno)   │
                    └──────┬──────┘
              N:M ┌────────┼─────────┐ 1:N
          ┌───────▼──────┐ │   ┌─────▼──────────┐
          │  guardian    │ │   │ tuition_invoice│ (mensalidade do aluno)
          │ (responsável)│ │   └─────┬──────────┘
          └──────────────┘ │         │ pago via
                  ┌─────────▼───┐ ┌───▼──────────┐
                  │ attendance  │ │  payment +   │
                  │ (presença)  │ │  split_rule  │
                  └─────────────┘ └──────────────┘
```

### Entidades e quem toca cada uma

- **school (escolinha)** — criada pelo **Admin**; operada pela **Escolinha**.
  Cada escolinha tem 1 plano SaaS, 1 assinatura, 1 subconta no gateway (KYC).
- **plan (plano SaaS)** — criado/editado pelo **Admin** (Básico/Pro/Híbrido):
  mensalidade fixa + % por transação + limites/recursos.
- **subscription (assinatura)** — vínculo escolinha↔plano; gera `saas_invoice`.
- **class (turma)** — criada pela **Escolinha**; lecionada por **Instrutores**;
  matricula **alunos**. Categoria (Sub-7…Sub-15), agenda, local, professores.
- **student (aluno)** — criado pela **Escolinha**; visto pelo **Instrutor** (na
  chamada) e pelo **Responsável** (perfil/pagamento). N:M com turmas; N:M com
  responsáveis.
- **guardian (responsável)** — convidado pela **Escolinha**; usa o app
  **Responsável**; paga as mensalidades dos alunos vinculados.
- **teacher (professor/instrutor)** — convidado pela **Escolinha**; usa o app
  **Instrutor**; pode receber **split** de uma % das mensalidades.
- **attendance (presença)** — registrada pelo **Instrutor** na chamada; agrega
  na "presença média" vista pela **Escolinha**.
- **tuition_invoice (mensalidade)** — cobrança da escolinha ao aluno; gerada
  pela **Escolinha**; paga pelo **Responsável**; cada pagamento dispara o
  **split** (plataforma/escolinha/professor) configurado pelo **Admin**.
- **payment + split** — processados no gateway; o **Admin** vê o consolidado
  (volume, taxa retida, repasses) em Financeiro/Gateway.

### Os mesmos dados em telas diferentes (não duplicar lógica)
- Uma **mensalidade** aparece como linha em *Escolinha › Mensalidades*, como
  card a pagar em *Responsável › Pagamentos*, e como transação no consolidado de
  *Admin › Financeiro*. É **uma** entidade (`tuition_invoice` + `payment`).
- Uma **turma** aparece em *Escolinha › Turmas* (gestão) e em *Instrutor ›
  Minhas turmas* (operação/chamada). Mesma entidade `class`.
- O **split** é definido por plano no *Admin › Gateway & Split* e aplicado em
  cada pagamento que o *Responsável* faz — o que a *Escolinha* e o *Professor*
  recebem deriva daí.

---

## 4. Modelo Supabase sugerido

Stack de dados inicial: **Supabase** (Postgres + Auth + RLS + Storage + Edge
Functions). Esquema inicial proposto — ajustar conforme evoluir.

### Auth & papéis
- Usar **Supabase Auth**. Um usuário (`auth.users`) pode ter papéis em
  contextos diferentes via tabela `membership`.
- Papéis: `platform_admin` (subdividido: super/financeiro/suporte/comercial),
  `school_staff` (dono/coordenador), `teacher`, `guardian`.
- `membership(user_id, role, school_id NULL)` — `school_id` nulo para admins da
  plataforma; preenchido para staff/professor/responsável de uma escolinha.

### Tabelas principais (resumo)
```sql
-- Plataforma / SaaS
plan              (id, name, price_cents, txn_pct, billing_cycle, limits jsonb, features jsonb, active)
school            (id, name, cnpj_cpf, city, uf, logo_url, plan_id→plan,
                   status enum[active,late,kyc,suspended,trial], owner_name, owner_email, owner_phone, created_at)
subscription      (id, school_id→school, plan_id→plan, cycle, status, next_charge_at, started_at)
saas_invoice      (id, subscription_id→subscription, reference, amount_cents, due_date, method, status enum[paid,pending,late])

-- Gateway / pagamentos / split
gateway_account   (id, provider, environment, public_key, secret_key_ref, webhook_url)  -- 1 por plataforma
subaccount        (id, school_id→school, provider_recipient_id, kyc_status enum[pending,review,approved,rejected], docs jsonb)
split_rule        (id, plan_id→plan, platform_pct, school_pct, teacher_pct_max)

-- Escola / operação
class             (id, school_id→school, name, category, weekday, start_time, end_time, location, unit)
class_teacher     (class_id→class, teacher_id→teacher)               -- N:M
student           (id, school_id→school, full_name, birth_date, enrollment_code, status, photo_url)
enrollment        (id, student_id→student, class_id→class, status)   -- aluno↔turma (N:M)
teacher           (id, school_id→school, user_id→auth.users, name, email, phone, split_pct)
guardian          (id, user_id→auth.users, name, email, phone)
student_guardian  (student_id→student, guardian_id→guardian, relation)  -- N:M
attendance        (id, class_id→class, student_id→student, session_date, present bool, recorded_by→teacher)

-- Mensalidades / cobrança do aluno
tuition_invoice   (id, student_id→student, school_id→school, reference, amount_cents, due_date,
                   status enum[paid,pending,late], method)
payment           (id, tuition_invoice_id→tuition_invoice, gross_cents, gateway_fee_cents, net_cents,
                   platform_cents, school_cents, teacher_cents, status, paid_at, provider_txn_id)
notification      (id, recipient_user_id, type, title, body, read, created_at)
audit_log         (id, actor_user_id, action, entity, entity_id, meta jsonb, created_at)  -- LGPD/auditoria
```

### RLS (Row Level Security) — essencial
- **platform_admin** → enxerga tudo (com escopo por sub-papel para escrita).
- **school_staff** → só linhas onde `school_id` = sua escola.
- **teacher** → só turmas/alunos vinculados a ele; só escreve `attendance` das
  suas turmas.
- **guardian** → só `student` vinculados via `student_guardian`; só suas
  `tuition_invoice`/`payment`.
- Toda escrita sensível grava em `audit_log` (conformidade LGPD).

### Pagamentos & split (regra de negócio crítica)
- Integrar gateway com **subcontas + split + webhooks** (o protótipo usa
  Pagar.me como exemplo; validar com o cliente — Pagar.me/Stripe Connect/
  Asaas/Iugu são candidatos).
- **A escolinha só pode cobrar após a subconta ser aprovada no KYC.**
- O split aplicado é o **vigente no momento da criação da cobrança** — mudança
  de plano **não** recalcula cobranças já geradas. (Congelar `split_rule` na
  `tuition_invoice`.)
- Webhooks do gateway atualizam `payment.status` e disparam `notification`.
  Monitorar saúde de webhooks (visível no Admin › Financeiro).

---

## 5. Stack recomendada

Sugestão (validar com o time de dev):
- **Front-end:** React + TypeScript + Vite. **Next.js** se quiser SSR/rotas/API
  integradas — recomendado para o painel web (Admin + Escolinha).
- **Mobile (Instrutor + Responsável):** React Native (Expo) ou PWA responsiva.
  Os protótipos mobile são telas de ~390px; reaproveitam os mesmos tokens.
- **Back-end/dados:** Supabase (Postgres + Auth + RLS + Storage + Edge
  Functions para webhooks do gateway).
- **Estilo:** importar os tokens CSS de `prototypes/_ds/tokens/` (ou convertê-los
  para o sistema de tema da stack — Tailwind theme, CSS vars, etc.). **Não
  inventar cores/medidas** fora dos tokens.
- **Ícones:** Lucide (já usado nos protótipos).
- **Fontes:** Kumbh Sans (UI) + Jakarta Sans (display/wordmark).

---

## 6. Design tokens (fonte da verdade)

Os valores completos estão em `prototypes/_ds/tokens/*.css`. Resumo:

### Cores — semânticas (usar estas, não hex cru)
- `--accent` `#C8EE44` (lima — ação primária, nav ativo, 1 KPI). Hover
  `#B6DC2E`, pressed `#A3C922`, tint `#F3FAD4`.
- `--text-primary` `#1B212D` (navy) · `--text-secondary` `#929EAE` ·
  `--text-link` `#29A073`.
- `--surface-canvas` `#FAFAFA` · `--surface-card` `#FFFFFF` ·
  `--surface-subtle` `#F8F8F8` · `--surface-muted` `#F5F5F5`.
- `--border-subtle` `#F1F1F3` · `--border-default` `#C8CDD8`.
- Status: `--success` `#29A073` (pago/positivo) · `--warning` `#FF5F00` ·
  `--danger` `#EB001B` (vencido) · `--info` `#0E73F6`. Cada um tem `*-tint`.
- Superfícies escuras: `--navy-900` `#1B212D`, `--plum-800` `#282541` (card
  "hero" de MRR usa degradê navy→plum — única exceção a "sem gradiente").

### Tipografia
- Famílias: **Kumbh Sans** (UI), **Jakarta Sans** (display/wordmark).
- Pesos: Regular (corpo), Medium (labels), SemiBold (ênfase), Bold (números/
  títulos).
- Escala (vars `--fs-*`): h1, h2, h4, body-lg, body, sm, xs. Números grandes
  Bold e com `font-variant-numeric: tabular-nums`.
- Cabeçalhos de tabela: UPPERCASE, `letter-spacing` ~0.05em, cinza muted, ~12px.

### Espaçamento, raio, sombra
- Raios: inputs/chips 8px, botões/stat cards 10px, cards 16px (`--radius-lg`),
  feature cards 20px, avatares/tags/toggles pill (99px).
- Sombras: baixas, cinza-frio, difusas (blur grande, offset pequeno). Elevação
  > borda. CTA primário pode ganhar leve glow lima no hover.
- Gutters entre cards: 22–24px. Layout web: sidebar fixa **250px** + conteúdo
  rolável; título topo-esquerda, busca/notificações/conta topo-direita; rail
  direito (~268–296px) para widgets secundários.

### Movimento
- Contido: 120–200ms ease-out, fade + pequeno translateY na entrada. Sem
  springs, sem loops decorativos. Charts animam 1x. Respeitar
  `prefers-reduced-motion`.

---

## 7. Componentes do design system (reconstruir nativos)

Disponíveis nos protótipos via `window.CampoFootballSchoolManagementDesignSystem_a7c81e`
(código de referência em `prototypes/_ds/_ds_bundle.js`):

`Button` (variants: primary/secondary/ghost/outline; sizes sm/md/lg; leading/
trailingIcon; fullWidth) · `IconButton` · `Input` (label, leading/trailingIcon,
foco lima) · `Select` · `Badge` (tones: success/danger/info/warning/neutral/
accent; `dot`) · `Tag` · `Avatar` (iniciais) · `Card` (title, subtitle, action,
padding) · `StatCard` (icon, label, value, trend, trendDirection, variant
default/dark) · `Toggle` · `Checkbox` · `Tabs` · `SidebarNav` (brand, items,
footerItems, activeKey, onSelect) · `ProgressBar`.

Recriar cada um como componente da stack escolhida, fiel a estilo/estados
(hover/active/focus/disabled). Não embutir o bundle React de protótipo em
produção.
