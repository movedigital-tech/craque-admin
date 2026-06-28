# Campo — Football School Management Design System

> **⚠️ Working brand name & logo are placeholders.** The client (a Brazilian
> SaaS for managing youth football schools — *Sistema de Gestão de Escolinhas
> de Futebol*) has not finalized a name or logo. "Campo" (Portuguese for
> *field/pitch*) is a placeholder so the system has a coherent identity.
> Swap the wordmark, mark, and project name once branding is decided.

This design system gives design agents everything needed to produce
well-branded interfaces and assets for the product: tokens (color, type,
spacing), reusable UI components, full-screen UI kit recreations, and brand
guidance.

## Source material

The visual foundation is adapted from the **Maglo — Financial Management Web
UI Kit (Community)** Figma file the client attached as their chosen starting
point. Maglo is a clean, light, finance-dashboard aesthetic: white canvas,
deep-navy ink, a signature lime accent, and soft rounded cards. Campo keeps
that language and recontextualizes the content for football-school
operations — students/athletes, classes/turmas, monthly tuition
(mensalidades), attendance, coaches, and schedules — instead of bank
transactions.

- **Figma:** "Maglo - Financial Management Web UI Kit (Community).fig"
  (mounted, read-only). Pages: Cover, Design-File, Style-guide, Presentation.
- No production codebase was provided.
- No logo or brand kit was provided (see placeholder note above).

---

## Content fundamentals

How copy is written across the product.

- **Language.** Product UI is authored in **pt-BR** (the client's market).
  Examples: *Alunos*, *Turmas*, *Mensalidades*, *Presença*, *Professores*,
  *Pagar agora*, *Em dia*, *Atrasado*. This guide is written in English for
  the agent; generated artifacts should default to pt-BR unless asked
  otherwise.
- **Tone.** Practical, warm, encouraging — a tool for school owners and
  coaches, not a bank. Plain words over jargon. Confident but never corporate.
- **Address.** Speak *to* the user with **você** (informal-respectful). Avoid
  first person; the product narrates, it doesn't talk about itself.
- **Casing.** Page titles and section headers in **Title Case / Sentence
  case** (e.g. "Visão geral", "Mensalidades"). Table column headers are
  **UPPERCASE** with wide letter-spacing and muted gray (e.g. "ALUNO",
  "VALOR", "VENCIMENTO"). Buttons use sentence case.
- **Numbers & money.** Currency is **R$** with comma decimals
  (`R$ 250,00`). Dates short and human (`14 abr 2025`). Counts are concrete
  ("28 alunos", "3 turmas").
- **Emoji.** Not used in product UI. Status is communicated with colored
  badges/dots, never emoji.
- **Microcopy vibe.** Short, scannable, action-first. Empty states are
  helpful and human ("Nenhuma mensalidade vencida 🎉" → instead use a calm
  "Tudo em dia por aqui."). Labels are nouns; buttons are verbs.

---

## Visual foundations

The motifs and rules that make something look like Campo.

- **Overall feel.** Light, airy, calm. A near-white canvas (`--surface-canvas`
  `#FAFAFA`) with white cards floating on it. Generous whitespace; content
  breathes. Density is "comfortable", not cramped — this is an operations tool
  used daily.
- **Color usage.** Navy ink (`#1B212D`) for text and the occasional dark
  "hero" stat card. **Lime `#C8EE44` is the single brand accent** — used
  sparingly for the primary action, active nav item, and one highlighted KPI
  card; never as a flood. **Field green `#29A073`** is the positive/money tone
  (paid, income, up-trends). Grays carry structure (borders, secondary text).
  Status colors (orange/amber/red/blue) appear only in badges and alerts.
- **Type.** Kumbh Sans everywhere in the UI — Regular for body, Medium for
  labels, SemiBold for emphasis, Bold for numerals and titles. Plus Jakarta
  Sans (display) only for the wordmark and large auth/hero headings. Big
  numbers are Bold and tight. Table/label text is small (12–14px) and often
  uppercase-muted.
- **Backgrounds.** Mostly flat fills — **no gradients** on UI surfaces. The
  exception is the credit-card / highlight motif (a dark navy→plum card). Auth
  screens use a **full-bleed duotone photograph** (grayscale subject + a single
  lime/yellow object) on a soft off-white/blush field — editorial, not stocky.
- **Cards.** White, radius **16px** (`--radius-lg`), very soft shadow
  (`--shadow-card`), usually **no border** (shadow does the separation). Stat
  cards are smaller radius (10px). One stat card per dashboard is inverted
  (dark navy fill, white text) to anchor the eye.
- **Borders.** Hairline `#F1F1F3` for dividers and table rows. Inputs use a
  1px `#C8CDD8`-ish border that turns lime on focus. Borders are quiet;
  elevation is preferred over outlines.
- **Corner radii.** Friendly and consistent: inputs/chips 8px, buttons/stat
  cards 10px, primary cards 16px, feature cards 20px, avatars/tags/toggles
  fully pill.
- **Shadows.** Low-contrast, cool-gray, diffuse (large blur, small offset).
  Never harsh. Primary CTA may gain a subtle lime glow on hover.
- **Hover states.** Buttons darken one step (lime→`#B6DC2E`); ghost/list rows
  pick up a `--surface-muted` wash; nav items lighten. Links shift to green.
- **Press states.** Darken a second step (`#A3C922`) and/or a 1px nudge — no
  big scale bounces. Subtle and quick.
- **Motion.** Restrained. 120–200ms ease-out fades and small translateY on
  enter. No bouncy springs, no infinite decorative loops. Charts animate in
  once. `prefers-reduced-motion` respected.
- **Transparency / blur.** Rare. Reserved for overlay scrims (navy at low
  alpha) behind dialogs. No glassmorphism on content.
- **Imagery vibe.** Editorial duotone — grayscale photography paired with a
  single saturated lime/yellow prop; warm blush backdrop. Athletic, human,
  optimistic.
- **Layout rules.** Fixed left sidebar (250px) + scrolling content. Page title
  top-left, search + notifications + account top-right. Right rail for
  secondary widgets (highlights, schedules). 24–30px gutters between cards.

---

## Iconography

- **System.** The source kit uses **Iconsax (vuesax)** — clean, ~1.5px stroke,
  rounded joints, with a few duotone/filled accents. In the kit these are
  flattened into fragmentary path SVGs (not reusable named icons).
- **Substitute (FLAGGED).** Campo standardizes on **Lucide** (loaded from CDN)
  as the working icon set — it is free, CDN-available, and the closest match to
  Iconsax's clean rounded-stroke style. If a licensed Iconsax set is desired,
  swap the icon layer; usage and sizing stay the same.
  - Usage: `<i data-lucide="users"></i>` then `lucide.createIcons()`.
  - Default size 20px in nav/buttons, 18px inline, stroke ~1.75.
  - Icon color follows text color; muted gray (`--gray-500`) when inactive,
    navy or lime when active.
- **No emoji** as icons in product UI. No unicode-glyph icons.
- **Brand mark.** `assets/logo-mark-*.svg` is the source kit's "m" mark, kept
  as a **placeholder** until the client's real logo exists.

---

## Index / manifest

Root files:

- `styles.css` — global entry point (consumers link this). `@import`s only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`,
  `base.css`.
- `assets/` — placeholder logo marks (+ any imagery copied in).
- `components/` — reusable UI primitives (see below).
- `ui_kits/` — full-screen product recreations.
- `cards/` — `@dsCard` foundation specimens shown in the Design System tab.
- `SKILL.md` — Agent-Skill manifest for use in Claude Code.

Components: Button, IconButton, Input, Select, Badge, Tag, Avatar, Card,
StatCard, Toggle, Checkbox, Tabs, SidebarNav, ProgressBar (see
`components/<group>/`).

UI kits: `ui_kits/campo-app/` — the football-school management dashboard.

---

*Adapted from the Maglo Community UI kit. Brand identity TBD — see top note.*
