/* Craque — Admin · Wireframes (lo-fi). Screen content builders. */
(function () {
  // ---------- helpers ----------
  const stat = (o) => `
    <div class="wf-stat ${o.dark ? 'dark' : ''}">
      <div class="wf-stat-ico"><i data-lucide="${o.icon}"></i></div>
      <div class="wf-stat-label">${o.label}</div>
      <div class="wf-stat-value">${o.value}</div>
      ${o.trend ? `<div class="wf-stat-trend ${o.dir === 'down' ? 'down' : ''}">${o.trend}</div>` : ''}
    </div>`;

  const av = (i) => `<span class="wf-av">${i}</span>`;
  const badge = (t, tone, bare) => `<span class="wf-badge ${tone || ''} ${bare ? 'bare' : ''}">${t}</span>`;
  const field = (label, ph, opts = {}) =>
    `<label class="wf-field"><span>${label}</span><div class="wf-input ${opts.cls || ''}">${
      opts.select ? `<span class="ph">${ph}</span><i data-lucide="chevron-down"></i>` : `<span class="ph">${ph}</span>`
    }</div></label>`;
  const sel = (label, ph) => field(label, ph, { select: true, cls: 'sel' });

  const table = (heads, rows) => `
    <table class="wf-table">
      <thead><tr>${heads.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr class="${r._click ? 'click' : ''}" ${r._go ? `data-go="${r._go}"` : ''}>${r.cells
        .map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>`;

  const cellMain = (initials, name, sub) =>
    `<div class="wf-cellmain">${av(initials)}<div><div class="wf-cellname">${name}</div>${
      sub ? `<div class="wf-cellsub">${sub}</div>` : ''
    }</div></div>`;

  const note = (html) => `<div class="wf-note"><i data-lucide="pencil"></i>${html}</div>`;

  // sketch line chart svg
  const lineChart = () => `
    <svg class="wf-chart" viewBox="0 0 600 200" preserveAspectRatio="none">
      <line x1="0" y1="50" x2="600" y2="50"/><line x1="0" y1="100" x2="600" y2="100"/><line x1="0" y1="150" x2="600" y2="150"/>
      <path class="area" d="M0,150 L0,140 C80,120 120,150 200,110 C280,72 340,96 420,70 C480,52 540,64 600,40 L600,200 L0,200 Z"/>
      <path class="l1" d="M0,140 C80,120 120,150 200,110 C280,72 340,96 420,70 C480,52 540,64 600,40"/>
      <path class="l2" d="M0,160 C80,150 120,168 200,140 C280,118 340,134 420,112 C480,98 540,108 600,86"/>
    </svg>`;

  const barChart = (hi) => `<div class="wf-bars">${
    [42, 58, 50, 70, 64, 82, 76, 90, 84, 96, 88, 100].map((h, i) =>
      `<div class="wf-bar ${i === hi ? 'hi' : ''}" style="height:${h}%"></div>`).join('')
  }</div>`;

  const S = {};

  // ---------- 1. LOGIN ----------
  S.login = { html: `
    <div class="wf-login">
      <div class="wf-login-brand">
        <div class="blob" style="width:340px;height:340px;top:-120px;right:-90px"></div>
        <div class="blob" style="width:200px;height:200px;bottom:40px;left:-60px"></div>
        <div class="wf-brand" style="color:#fff">
          <span class="wf-logo"><i data-lucide="trophy"></i></span>
          <div><div class="wf-brand-name" style="color:#fff">Craque</div>
          <div class="wf-brand-sub" style="color:rgba(255,255,255,.6)">Plataforma de gestão</div></div>
        </div>
        <div style="position:relative">
          <div style="font-size:34px;font-weight:700;line-height:1.15;max-width:380px">Gestão de escolinhas, do campo ao caixa.</div>
          <p style="color:rgba(255,255,255,.65);font-size:16px;max-width:360px;margin-top:14px">
            Painel do administrador da plataforma — escolinhas, planos, cobranças e repasses em um só lugar.</p>
        </div>
        <div style="position:relative;font-size:13px;color:rgba(255,255,255,.45)">Copa 2026 · feito para o futebol de base</div>
      </div>
      <div class="wf-login-form">
        <div class="wf-login-inner">
          <div>
            <div style="font-size:26px;font-weight:700">Acessar o painel</div>
            <p class="wf-subtitle">Entre com sua conta de administrador.</p>
          </div>
          ${field('E-mail', 'voce@craque.com')}
          ${field('Senha', '••••••••')}
          <div class="wf-spread">
            <div style="display:flex;align-items:center;gap:10px;color:var(--ink2);font-size:14px">
              <span class="wf-check"></span> Manter conectado</div>
            <span style="font-size:14px;color:var(--accent-ink);font-weight:700">Esqueci a senha</span>
          </div>
          <button class="wf-btn primary block" data-go="dashboard"><i data-lucide="log-in"></i>Entrar</button>
          ${note('Acesso restrito ao time da plataforma. Convites são enviados em <b>Usuários &amp; Perfis</b>.')}
        </div>
      </div>
    </div>` };

  // ---------- 2. DASHBOARD ----------
  S.dashboard = {
    title: 'Dashboard geral',
    subtitle: 'Olá, Rafael 👋 — visão da plataforma em abril de 2026.',
    html: `
    <div class="wf-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${stat({ icon: 'building-2', label: 'Escolinhas ativas', value: '38', trend: '+4 no mês', dir: 'up' })}
      ${stat({ icon: 'wallet', label: 'MRR da plataforma', value: 'R$ 24.900', trend: '+11%', dir: 'up', dark: true })}
      ${stat({ icon: 'arrow-left-right', label: 'Transações no mês', value: 'R$ 412 mil', trend: '+8%', dir: 'up' })}
      ${stat({ icon: 'alert-triangle', label: 'Inadimplência', value: '6,2%', trend: '-1,1pp', dir: 'down' })}
    </div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 320px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head">
            <div><h3 class="wf-card-title">Receita recorrente (MRR)</h3><p class="wf-card-sub">Últimos 12 meses</p></div>
            <div class="wf-chips"><span class="wf-chip on">MRR</span><span class="wf-chip">Transações</span></div>
          </div>
          ${lineChart()}
        </div>
        <div class="wf-card">
          <div class="wf-card-head">
            <h3 class="wf-card-title">Escolinhas recentes</h3>
            <button class="wf-btn ghost sm" data-go="escolinhas">Ver todas <i data-lucide="arrow-right"></i></button>
          </div>
          ${table(['Escolinha', 'Plano', 'Status', 'Alunos', 'MRR'], [
            { _click: 1, _go: 'escolinha-cadastro', cells: [cellMain('FC', 'FC Estrela', 'São Paulo · SP'), badge('Pro', 'mut', true), badge('Ativa', 'ok'), '142', '<span class="wf-num">R$ 890</span>'] },
            { _click: 1, _go: 'escolinha-cadastro', cells: [cellMain('AB', 'Academia Bola', 'Campinas · SP'), badge('Híbrido', 'mut', true), badge('Ativa', 'ok'), '98', '<span class="wf-num">R$ 640</span>'] },
            { _click: 1, _go: 'escolinha-cadastro', cells: [cellMain('GF', 'Gol de Placa', 'Santos · SP'), badge('Básico', 'mut', true), badge('Inadimplente', 'warn'), '54', '<span class="wf-num">R$ 290</span>'] },
            { _click: 1, _go: 'escolinha-cadastro', cells: [cellMain('CR', 'CT Raízes', 'Sorocaba · SP'), badge('Pro', 'mut', true), badge('Pendente KYC', 'info'), '—', '<span class="wf-num">—</span>'] },
          ])}
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Precisa de atenção</h3></div>
          <div class="wf-stack" style="gap:12px">
            <div class="wf-spread"><span style="display:flex;gap:9px;align-items:center"><i data-lucide="shield-alert" style="width:18px;color:var(--info)"></i>3 KYC pendentes</span><button class="wf-btn ghost sm" data-go="kyc">Revisar</button></div>
            <div class="wf-divider" style="margin:0"></div>
            <div class="wf-spread"><span style="display:flex;gap:9px;align-items:center"><i data-lucide="alert-circle" style="width:18px;color:var(--warn)"></i>2 escolinhas inadimplentes</span><button class="wf-btn ghost sm" data-go="cobrancas">Ver</button></div>
            <div class="wf-divider" style="margin:0"></div>
            <div class="wf-spread"><span style="display:flex;gap:9px;align-items:center"><i data-lucide="webhook" style="width:18px;color:var(--danger)"></i>1 webhook com falha</span><button class="wf-btn ghost sm" data-go="financeiro">Logs</button></div>
          </div>
        </div>
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Distribuição de planos</h3></div>
          <div class="wf-stack" style="gap:12px">
            ${['Básico · 14', 'Pro · 18', 'Híbrido · 6'].map((t, i) => `
              <div><div class="wf-spread" style="margin-bottom:5px"><span style="font-size:14px">${t.split(' · ')[0]}</span><span class="wf-cellsub">${t.split(' · ')[1]} escolinhas</span></div>
              <div class="wf-line" style="height:9px;width:${[40, 70, 25][i]}%;background:var(--accent-tint)"></div></div>`).join('')}
          </div>
        </div>
      </div>
    </div>` };

  // ---------- 3. ESCOLINHAS (list) ----------
  S.escolinhas = {
    title: 'Gestão de escolinhas',
    subtitle: '38 escolinhas cadastradas na plataforma',
    html: `
    <div class="wf-card" style="padding:0;overflow:hidden">
      <div class="wf-spread" style="padding:18px 22px 0">
        <div class="wf-chips">
          <span class="wf-chip on">Todas · 38</span><span class="wf-chip">Ativas · 31</span>
          <span class="wf-chip">Inadimplentes · 4</span><span class="wf-chip">Suspensas · 2</span><span class="wf-chip">Pendente KYC · 1</span>
        </div>
        <div style="display:flex;gap:10px">
          <button class="wf-btn ghost sm"><i data-lucide="sliders-horizontal"></i>Filtros</button>
          <button class="wf-btn primary sm" data-go="escolinha-cadastro"><i data-lucide="plus"></i>Nova escolinha</button>
        </div>
      </div>
      <div style="padding:14px 22px 0">
        ${table(['Escolinha', 'Responsável', 'Plano', 'Status', 'Alunos', 'MRR', ''], [
          ['FC', 'FC Estrela', 'São Paulo · SP', 'Carlos Nunes', 'Pro', ['Ativa', 'ok'], '142', 'R$ 890'],
          ['AB', 'Academia Bola', 'Campinas · SP', 'Marina Reis', 'Híbrido', ['Ativa', 'ok'], '98', 'R$ 640'],
          ['GF', 'Gol de Placa', 'Santos · SP', 'Diego Alves', 'Básico', ['Inadimplente', 'warn'], '54', 'R$ 290'],
          ['CR', 'CT Raízes', 'Sorocaba · SP', 'Bruna Lima', 'Pro', ['Pendente KYC', 'info'], '—', '—'],
          ['EM', 'Escola Meninos de Ouro', 'Guarulhos · SP', 'Paulo Souza', 'Básico', ['Suspensa', 'bad'], '0', '—'],
          ['VF', 'Vila Futebol', 'Osasco · SP', 'Tânia M.', 'Híbrido', ['Ativa', 'ok'], '120', 'R$ 720'],
        ].map((r) => ({ _click: 1, _go: 'escolinha-cadastro', cells: [
          cellMain(r[0], r[1], r[2]), r[3], badge(r[4], 'mut', true), badge(r[5][0], r[5][1]), r[6],
          `<span class="wf-num">${r[7]}</span>`,
          '<i data-lucide="more-horizontal" style="width:18px;color:var(--ink3)"></i>',
        ] })))}
      </div>
      <div class="wf-spread" style="padding:8px 22px 18px;color:var(--ink3);font-size:13px">
        <span>Mostrando 6 de 38</span>
        <div style="display:flex;gap:8px"><button class="wf-btn ghost sm">Anterior</button><button class="wf-btn ghost sm">Próxima</button></div>
      </div>
    </div>` };

  // ---------- 4. CADASTRO / EDIÇÃO DE ESCOLINHA ----------
  S['escolinha-cadastro'] = {
    title: 'Cadastro de escolinha',
    subtitle: 'Preencha os dados e defina o plano SaaS',
    html: `
    <div class="wf-breadcrumb" data-go="escolinhas" style="cursor:pointer">
      <i data-lucide="arrow-left"></i> Escolinhas / <b style="color:var(--ink2)">Nova escolinha</b></div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Dados da escolinha</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Nome da escolinha', 'Ex.: FC Estrela')}
            ${field('CNPJ / CPF', '00.000.000/0000-00')}
            ${field('Cidade', 'São Paulo')}
            ${sel('Estado', 'SP')}
            <div style="grid-column:1/-1">${field('Logo', '', { cls: 'area' })}</div>
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Responsável / contato</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Nome do responsável', 'Carlos Nunes')}
            ${field('E-mail', 'carlos@fcestrela.com')}
            ${field('Telefone / WhatsApp', '(11) 9xxxx-xxxx')}
            ${sel('Cargo', 'Dono / Gestor')}
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Plano &amp; cobrança</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${sel('Plano SaaS', 'Pro — R$ 149/mês + 2%')}
            ${sel('Ciclo de cobrança', 'Mensal')}
            ${sel('Status inicial', 'Ativa')}
            ${field('Início da assinatura', '01 mai 2026')}
          </div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        ${note('Após salvar, a escolinha recebe um <b>convite por e-mail</b> e segue para o fluxo de <b>KYC / subconta</b> antes de cobrar.')}
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Resumo</h3></div>
          <div class="wf-stack" style="gap:10px;font-size:14px;color:var(--ink2)">
            <div class="wf-spread"><span>Plano</span><b style="color:var(--ink)">Pro</b></div>
            <div class="wf-spread"><span>Mensalidade SaaS</span><b style="color:var(--ink)">R$ 149</b></div>
            <div class="wf-spread"><span>% por transação</span><b style="color:var(--ink)">2%</b></div>
            <div class="wf-spread"><span>KYC</span>${badge('Será solicitado', 'info')}</div>
          </div>
        </div>
        <div class="wf-stack" style="gap:10px">
          <button class="wf-btn primary block" data-go="kyc"><i data-lucide="check"></i>Salvar e convidar</button>
          <button class="wf-btn ghost block" data-go="escolinhas">Cancelar</button>
        </div>
      </div>
    </div>` };

  // ---------- 5. PLANOS SaaS ----------
  const planCard = (name, price, pct, feats, hot) => `
    <div class="wf-card ${hot ? '' : ''}" style="${hot ? 'border-color:var(--accent-ink);border-width:2px' : ''}">
      <div class="wf-spread">
        <h3 class="wf-card-title">${name}</h3>
        ${hot ? badge('Mais usado', 'ok') : ''}
      </div>
      <div style="font-size:30px;font-weight:700;margin:10px 0 2px">${price}<span style="font-size:15px;color:var(--ink2);font-weight:400">/mês</span></div>
      <div class="wf-cellsub">+ ${pct} por transação</div>
      <div class="wf-divider"></div>
      <div class="wf-stack" style="gap:9px;font-size:14px">
        ${feats.map((f) => `<div style="display:flex;gap:9px;align-items:center;color:var(--ink2)"><i data-lucide="check" style="width:16px;color:var(--accent-ink)"></i>${f}</div>`).join('')}
      </div>
      <button class="wf-btn ghost block" style="margin-top:16px"><i data-lucide="pencil"></i>Editar plano</button>
    </div>`;
  S.planos = {
    title: 'Planos SaaS',
    subtitle: 'Defina valores, percentuais por transação e limites',
    html: `
    <div class="wf-spread" style="margin-bottom:18px">
      <div class="wf-chips"><span class="wf-chip on">Ativos · 3</span><span class="wf-chip">Arquivados · 1</span></div>
      <button class="wf-btn primary sm"><i data-lucide="plus"></i>Novo plano</button>
    </div>
    <div class="wf-grid" style="grid-template-columns:repeat(3,1fr)">
      ${planCard('Básico', 'R$ 79', '2,9%', ['Até 60 alunos', 'Pix + boleto', 'Relatórios básicos', '1 unidade'], false)}
      ${planCard('Pro', 'R$ 149', '2,0%', ['Alunos ilimitados', 'Pix, cartão e boleto', 'Split p/ professor', 'Relatórios avançados'], true)}
      ${planCard('Híbrido', 'R$ 99', '1,5%', ['Fixo menor + % maior', 'Pix, cartão e boleto', 'Multi-unidade', 'Suporte prioritário'], false)}
    </div>
    <div class="wf-note" style="margin-top:20px;transform:rotate(.4deg)"><i data-lucide="info"></i>
      Mudança de plano <b>não</b> recalcula cobranças já geradas. O split vigente é o do momento da criação da cobrança.</div>` };

  // ---------- 6. ASSINATURAS ----------
  S.assinaturas = {
    title: 'Assinaturas SaaS',
    subtitle: 'Assinaturas das escolinhas na plataforma',
    html: `
    <div class="wf-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
      ${stat({ icon: 'repeat', label: 'Assinaturas ativas', value: '34' })}
      ${stat({ icon: 'wallet', label: 'MRR', value: 'R$ 24.900', dark: true })}
      ${stat({ icon: 'user-minus', label: 'Churn (mês)', value: '2,1%', trend: '-0,4pp', dir: 'down' })}
    </div>
    <div class="wf-card" style="padding:0;overflow:hidden">
      <div class="wf-spread" style="padding:16px 22px 4px">
        <div class="wf-tabs" style="margin:0;border:none">
          <span class="wf-tab on">Todas</span><span class="wf-tab">Ativas</span><span class="wf-tab">Em atraso</span><span class="wf-tab">Canceladas</span>
        </div>
        <button class="wf-btn ghost sm"><i data-lucide="download"></i>Exportar</button>
      </div>
      <div style="padding:6px 22px 18px">
        ${table(['Escolinha', 'Plano', 'Ciclo', 'Próx. cobrança', 'Valor', 'Status'], [
          ['FC', 'FC Estrela', 'Pro', 'Mensal', '01 mai 2026', 'R$ 149', ['Ativa', 'ok']],
          ['AB', 'Academia Bola', 'Híbrido', 'Mensal', '03 mai 2026', 'R$ 99', ['Ativa', 'ok']],
          ['GF', 'Gol de Placa', 'Básico', 'Mensal', '28 abr 2026', 'R$ 79', ['Em atraso', 'warn']],
          ['VF', 'Vila Futebol', 'Híbrido', 'Anual', '12 jan 2027', 'R$ 990', ['Ativa', 'ok']],
          ['EM', 'Meninos de Ouro', 'Básico', 'Mensal', '—', 'R$ 79', ['Cancelada', 'bad']],
        ].map((r) => ({ cells: [
          cellMain(r[0], r[1], null), badge(r[2], 'mut', true), r[3], r[4],
          `<span class="wf-num">${r[5]}</span>`, badge(r[6][0], r[6][1]),
        ] })))}
      </div>
    </div>` };

  // ---------- 7. COBRANÇAS SaaS ----------
  S.cobrancas = {
    title: 'Cobranças SaaS',
    subtitle: 'Faturas da plataforma para as escolinhas',
    html: `
    <div class="wf-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
      ${stat({ icon: 'check-circle-2', label: 'Recebido em abril', value: 'R$ 22.100', dark: true })}
      ${stat({ icon: 'clock', label: 'A vencer', value: 'R$ 2.800' })}
      ${stat({ icon: 'alert-circle', label: 'Vencido', value: 'R$ 940', trend: '4 faturas', dir: 'down' })}
    </div>
    <div class="wf-card" style="padding:0;overflow:hidden">
      <div class="wf-spread" style="padding:16px 22px 0">
        <div class="wf-chips"><span class="wf-chip on">Todas</span><span class="wf-chip">Pagas</span><span class="wf-chip">A vencer</span><span class="wf-chip">Vencidas</span></div>
        <button class="wf-btn ghost sm"><i data-lucide="send"></i>Reenviar lembretes</button>
      </div>
      <div style="padding:14px 22px 18px">
        ${table(['Escolinha', 'Referência', 'Valor', 'Vencimento', 'Método', 'Status', ''], [
          ['FC', 'FC Estrela', 'Abr/2026 · Pro', 'R$ 149', '01 abr', 'Cartão', ['Pago', 'ok'], 'Recibo'],
          ['AB', 'Academia Bola', 'Abr/2026 · Híbrido', 'R$ 99', '03 abr', 'Pix', ['Pago', 'ok'], 'Recibo'],
          ['GF', 'Gol de Placa', 'Abr/2026 · Básico', 'R$ 79', '28 abr', 'Boleto', ['Vencido', 'bad'], '2ª via'],
          ['CR', 'CT Raízes', 'Abr/2026 · Pro', 'R$ 149', '30 abr', 'Pix', ['A vencer', 'info'], 'Cobrar'],
        ].map((r) => ({ cells: [
          cellMain(r[0], r[1], r[2]), `<span class="wf-num">${r[3]}</span>`, r[4],
          badge(r[5], 'mut', true), badge(r[6][0], r[6][1]),
          `<button class="wf-btn ghost sm">${r[7]}</button>`,
        ] })))}
      </div>
    </div>` };

  // ---------- 8. FINANCEIRO DA PLATAFORMA ----------
  S.financeiro = {
    title: 'Financeiro da plataforma',
    subtitle: 'Receita, taxas retidas e repasses às escolinhas',
    html: `
    <div class="wf-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${stat({ icon: 'arrow-down-left', label: 'Volume transacionado', value: 'R$ 412 mil' })}
      ${stat({ icon: 'scissors', label: 'Taxa retida (plataforma)', value: 'R$ 8.240', dark: true })}
      ${stat({ icon: 'arrow-up-right', label: 'Repasses às escolinhas', value: 'R$ 392 mil' })}
      ${stat({ icon: 'piggy-bank', label: 'Saldo a repassar', value: 'R$ 11.500' })}
    </div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 320px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><div><h3 class="wf-card-title">Entradas vs. repasses</h3><p class="wf-card-sub">Por mês</p></div>
            <div style="display:flex;gap:16px;font-size:13px;color:var(--ink2)">
              <span style="display:flex;gap:6px;align-items:center"><i style="width:10px;height:10px;border-radius:3px;background:var(--accent-tint);border:1.5px solid #A9D9BC"></i>Volume</span>
            </div></div>
          ${barChart(11)}
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Movimentações recentes</h3>
            <button class="wf-btn ghost sm"><i data-lucide="download"></i>Conciliação</button></div>
          ${table(['Transação', 'Escolinha', 'Bruto', 'Taxa', 'Líquido', 'Status'], [
            ['#TX-90412', 'FC Estrela', 'R$ 250,00', 'R$ 5,00', 'R$ 245,00', ['Repassado', 'ok']],
            ['#TX-90410', 'Academia Bola', 'R$ 220,00', 'R$ 3,30', 'R$ 216,70', ['Repassado', 'ok']],
            ['#TX-90408', 'Gol de Placa', 'R$ 280,00', 'R$ 8,12', 'R$ 271,88', ['Em processamento', 'info']],
            ['#TX-90405', 'Vila Futebol', 'R$ 250,00', 'R$ 3,75', 'R$ 246,25', ['Estornado', 'bad']],
          ].map((r) => ({ cells: [
            `<span class="wf-num" style="font-weight:400">${r[0]}</span>`, r[1],
            `<span class="wf-num">${r[2]}</span>`, r[3], `<span class="wf-num">${r[4]}</span>`, badge(r[5][0], r[5][1]),
          ] })))}
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Próximo repasse</h3></div>
          <div style="font-size:24px;font-weight:700">R$ 11.500,00</div>
          <p class="wf-cellsub">Agendado p/ 30 abr · 28 escolinhas</p>
          <button class="wf-btn primary block" style="margin-top:14px"><i data-lucide="banknote"></i>Liberar repasses</button>
        </div>
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Saúde de webhooks</h3></div>
          <div class="wf-stack" style="gap:10px;font-size:14px">
            <div class="wf-spread"><span>Entregues (24h)</span>${badge('1.284', 'ok')}</div>
            <div class="wf-spread"><span>Reprocessados</span>${badge('12', 'warn')}</div>
            <div class="wf-spread"><span>Com falha</span>${badge('1', 'bad')}</div>
          </div>
          <button class="wf-btn ghost block" style="margin-top:12px">Ver log de eventos</button>
        </div>
      </div>
    </div>` };

  // ---------- 9. GATEWAY & SPLIT ----------
  S.gateway = {
    title: 'Gateway & regras de split',
    subtitle: 'Conexão com o provedor de pagamentos e divisão de valores',
    html: `
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 320px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Provedor de pagamento</h3>${badge('Conectado · Sandbox', 'info')}</div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${sel('Gateway', 'Pagar.me')}
            ${sel('Ambiente', 'Sandbox')}
            ${field('Public key', 'pk_test_••••••••')}
            ${field('Secret key', 'sk_test_••••••••')}
            <div style="grid-column:1/-1">${field('URL de webhook', 'https://api.craque.com/webhooks/payment-gateway')}</div>
          </div>
          <div class="wf-divider"></div>
          <div class="wf-spread"><div><div style="font-weight:700">Métodos habilitados</div><p class="wf-cellsub">Disponíveis no checkout do responsável</p></div>
            <div class="wf-chips"><span class="wf-chip on">Pix</span><span class="wf-chip on">Cartão</span><span class="wf-chip">Boleto</span></div></div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Regras de split por plano</h3><button class="wf-btn ghost sm"><i data-lucide="plus"></i>Nova regra</button></div>
          ${table(['Plano', 'Plataforma', 'Escolinha', 'Professor (opc.)', 'Status'], [
            ['Básico', '2,9%', '97,1%', '—', ['Vigente', 'ok']],
            ['Pro', '2,0%', '88,0%', 'até 10%', ['Vigente', 'ok']],
            ['Híbrido', '1,5%', '88,5%', 'até 10%', ['Vigente', 'ok']],
          ].map((r) => ({ cells: [
            badge(r[0], 'mut', true), `<span class="wf-num">${r[1]}</span>`,
            `<span class="wf-num">${r[2]}</span>`, r[3], badge(r[4][0], r[4][1]),
          ] })))}
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        ${note('Split é calculado na <b>criação da cobrança</b> e registrado de forma auditável. Não confiar no front-end.')}
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Exemplo · R$ 100</h3></div>
          <div class="wf-stack" style="gap:10px;font-size:14px">
            <div class="wf-spread"><span>Responsável paga</span><b>R$ 100,00</b></div>
            <div class="wf-spread"><span>Plataforma (2%)</span><b style="color:var(--accent-ink)">R$ 2,00</b></div>
            <div class="wf-spread"><span>Taxa gateway</span><b>R$ 1,99</b></div>
            <div class="wf-divider" style="margin:6px 0"></div>
            <div class="wf-spread"><span>Escolinha recebe</span><b>R$ 96,01</b></div>
          </div>
        </div>
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Recursos do gateway</h3></div>
          <div class="wf-stack" style="gap:8px;font-size:13.5px;color:var(--ink2)">
            ${['Pix / cartão / boleto', 'Recorrência', 'Split multi-recebedor', 'Subcontas / KYC', 'Webhooks', 'Estorno & chargeback'].map((t) => `<div style="display:flex;gap:8px;align-items:center"><i data-lucide="check" style="width:15px;color:var(--accent-ink)"></i>${t}</div>`).join('')}
          </div>
        </div>
      </div>
    </div>` };

  // ---------- 10. SUBCONTAS / KYC ----------
  S.kyc = {
    title: 'Subcontas / KYC',
    subtitle: 'Verificação das escolinhas para receber pagamentos',
    html: `
    <div class="wf-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:18px">
      ${stat({ icon: 'shield-check', label: 'Aprovadas', value: '31', dark: true })}
      ${stat({ icon: 'clock', label: 'Em análise', value: '3' })}
      ${stat({ icon: 'file-warning', label: 'Pendência docs', value: '2' })}
      ${stat({ icon: 'shield-x', label: 'Recusadas', value: '1' })}
    </div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-card" style="padding:0;overflow:hidden">
        <div class="wf-spread" style="padding:16px 22px 0">
          <div class="wf-chips"><span class="wf-chip on">Todas</span><span class="wf-chip">Pendentes</span><span class="wf-chip">Aprovadas</span><span class="wf-chip">Recusadas</span></div>
        </div>
        <div style="padding:14px 22px 18px">
          ${table(['Escolinha', 'Subconta', 'Documentos', 'KYC', ''], [
            ['FC', 'FC Estrela', 'rec_8841', 'completos', ['Aprovado', 'ok'], 'Ver'],
            ['AB', 'Academia Bola', 'rec_8839', 'completos', ['Aprovado', 'ok'], 'Ver'],
            ['CR', 'CT Raízes', '—', 'CNPJ + sócio', ['Em análise', 'info'], 'Revisar'],
            ['GF', 'Gol de Placa', 'rec_8801', 'falta comprovante', ['Pendência', 'warn'], 'Revisar'],
            ['EM', 'Meninos de Ouro', '—', 'reprovado', ['Recusado', 'bad'], 'Revisar'],
          ].map((r) => ({ cells: [
            cellMain(r[0], r[1], null), `<span class="wf-num" style="font-weight:400">${r[2]}</span>`,
            r[3], badge(r[4][0], r[4][1]),
            `<button class="wf-btn ghost sm">${r[5]}</button>`,
          ] })))}
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Etapas do KYC</h3></div>
          <div class="wf-stack" style="gap:13px">
            ${[['Dados cadastrais', 'ok'], ['Documento do responsável', 'ok'], ['CNPJ / contrato social', 'info'], ['Conta bancária', 'mut'], ['Aprovação do gateway', 'mut']].map((s, i) => `
              <div style="display:flex;gap:11px;align-items:center">
                <span style="width:24px;height:24px;border-radius:50%;display:grid;place-items:center;flex:none;border:2px solid ${s[1] === 'ok' ? '#A9D9BC' : 'var(--line)'};background:${s[1] === 'ok' ? 'var(--accent-tint)' : 'var(--card)'};font-size:12px;font-weight:700">${i + 1}</span>
                <span style="font-size:14px;color:${s[1] === 'mut' ? 'var(--ink3)' : 'var(--ink)'}">${s[0]}</span>
              </div>`).join('')}
          </div>
        </div>
        ${note('Escolinha só fica <b>apta a cobrar</b> após subconta aprovada pelo gateway.')}
      </div>
    </div>` };

  // ---------- 11. RELATÓRIOS ----------
  S.relatorios = {
    title: 'Relatórios gerais',
    subtitle: 'Exporte e analise dados consolidados da plataforma',
    html: `
    <div class="wf-card" style="margin-bottom:18px">
      <div class="wf-grid" style="grid-template-columns:1.4fr 1fr 1fr 1fr auto;align-items:end;gap:14px">
        ${sel('Tipo de relatório', 'Financeiro consolidado')}
        ${sel('Escolinha', 'Todas')}
        ${sel('Período', 'Abril 2026')}
        ${sel('Formato', 'CSV')}
        <button class="wf-btn primary"><i data-lucide="download"></i>Exportar</button>
      </div>
    </div>
    <div class="wf-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
      ${[['bar-chart-3', 'Financeiro consolidado', 'Receita, taxas e repasses'], ['user-x', 'Inadimplência', 'Por escolinha e período'], ['arrow-left-right', 'Transações', 'Detalhe de cada pagamento'], ['repeat', 'Assinaturas SaaS', 'MRR, churn e upgrades'], ['split', 'Splits & repasses', 'Auditoria de divisão'], ['shield-check', 'KYC / compliance', 'Status das subcontas']].map((c) => `
        <div class="wf-card tight" style="cursor:pointer">
          <div class="wf-spread"><div class="wf-stat-ico" style="margin:0"><i data-lucide="${c[0]}"></i></div><i data-lucide="arrow-up-right" style="width:17px;color:var(--ink3)"></i></div>
          <div style="font-weight:700;margin-top:12px">${c[1]}</div>
          <div class="wf-cellsub">${c[2]}</div>
        </div>`).join('')}
    </div>
    <div class="wf-card">
      <div class="wf-card-head"><h3 class="wf-card-title">Prévia · Financeiro consolidado</h3><span class="wf-cellsub">Abril 2026</span></div>
      ${table(['Escolinha', 'Volume', 'Taxa plataforma', 'Repassado', 'Inadimplência'], [
        ['FC Estrela', 'R$ 34.200', 'R$ 684', 'R$ 33.516', '2,1%'],
        ['Academia Bola', 'R$ 21.600', 'R$ 324', 'R$ 21.276', '4,0%'],
        ['Gol de Placa', 'R$ 11.880', 'R$ 344', 'R$ 11.536', '9,3%'],
        ['Vila Futebol', 'R$ 28.800', 'R$ 432', 'R$ 28.368', '1,2%'],
      ].map((r) => ({ cells: [r[0], `<span class="wf-num">${r[1]}</span>`, `<span class="wf-num">${r[2]}</span>`, `<span class="wf-num">${r[3]}</span>`, r[4]] })))}
    </div>` };

  // ---------- 12. USUÁRIOS & PERFIS ----------
  S.usuarios = {
    title: 'Usuários & Perfis',
    subtitle: 'Time da plataforma e permissões de acesso',
    html: `
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-card" style="padding:0;overflow:hidden">
        <div class="wf-spread" style="padding:16px 22px 0">
          <div class="wf-tabs" style="margin:0;border:none"><span class="wf-tab on">Ativos · 6</span><span class="wf-tab">Convites · 2</span></div>
          <button class="wf-btn primary sm"><i data-lucide="user-plus"></i>Convidar usuário</button>
        </div>
        <div style="padding:14px 22px 18px">
          ${table(['Usuário', 'Perfil', 'Status', 'Último acesso', ''], [
            ['RA', 'Rafael Antunes', 'rafael@craque.com', 'Super admin', ['Ativo', 'ok'], 'há 2 min'],
            ['JM', 'Júlia Moraes', 'julia@craque.com', 'Financeiro', ['Ativo', 'ok'], 'há 1 h'],
            ['LP', 'Leo Pires', 'leo@craque.com', 'Suporte', ['Ativo', 'ok'], 'ontem'],
            ['MC', 'Marina Castro', 'marina@craque.com', 'Suporte', ['Convite', 'info'], '—'],
          ].map((r) => ({ cells: [
            cellMain(r[0], r[1], r[2]), badge(r[3], 'mut', true), badge(r[4][0], r[4][1]), r[5],
            '<i data-lucide="more-horizontal" style="width:18px;color:var(--ink3)"></i>',
          ] })))}
        </div>
      </div>
      <div class="wf-card tight">
        <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Perfis &amp; permissões</h3></div>
        <div class="wf-stack" style="gap:14px">
          ${[['Super admin', 'Acesso total'], ['Financeiro', 'Cobranças, splits, repasses'], ['Suporte', 'Escolinhas e KYC (leitura)'], ['Comercial', 'Planos e assinaturas']].map((r) => `
            <div>
              <div class="wf-spread"><b style="font-size:14px">${r[0]}</b><i data-lucide="pencil" style="width:15px;color:var(--ink3)"></i></div>
              <div class="wf-cellsub">${r[1]}</div>
            </div>`).join('<div class="wf-divider" style="margin:0"></div>')}
        </div>
      </div>
    </div>` };

  // ---------- 13. CONFIGURAÇÕES ----------
  const toggleRow = (label, sub, on) => `
    <div class="wf-spread" style="padding:13px 0;border-bottom:1.5px dashed var(--line)">
      <div><div style="font-weight:700;font-size:14px">${label}</div><div class="wf-cellsub">${sub}</div></div>
      <div class="wf-toggle ${on ? 'on' : ''}"></div>
    </div>`;
  S.config = {
    title: 'Configurações gerais',
    subtitle: 'Marca, notificações, segurança e faturamento da plataforma',
    html: `
    <div class="wf-tabs">
      <span class="wf-tab on">Geral</span><span class="wf-tab">Marca</span><span class="wf-tab">Notificações</span>
      <span class="wf-tab">Segurança</span><span class="wf-tab">Faturamento</span>
    </div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Identidade da plataforma</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Nome da plataforma', 'Craque')}
            ${field('Domínio', 'app.craque.com')}
            ${sel('Idioma padrão', 'Português (BR)')}
            ${sel('Fuso horário', 'America/Sao_Paulo')}
            <div style="grid-column:1/-1">${field('Logo & cores da marca', '', { cls: 'area' })}</div>
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Notificações &amp; lembretes</h3></div>
          ${toggleRow('Lembrete de mensalidade a vencer', 'E-mail e WhatsApp ao responsável', true)}
          ${toggleRow('Aviso de inadimplência', 'Para escolinha e responsável', true)}
          ${toggleRow('Alertas de webhook com falha', 'Para o time financeiro', true)}
          <div class="wf-spread" style="padding:13px 0 0"><div><div style="font-weight:700;font-size:14px">Suspensão automática por inadimplência</div><div class="wf-cellsub">Após 15 dias de atraso</div></div><div class="wf-toggle"></div></div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Segurança</h3></div>
          ${toggleRow('Exigir 2FA no time', 'Autenticação em dois fatores', true)}
          <div class="wf-spread" style="padding:13px 0 0"><span style="font-size:14px">Sessão expira em</span><b style="font-size:14px">8 h</b></div>
        </div>
        ${note('Toda ação crítica gera <b>audit log</b>. Dados sensíveis seguem a <b>LGPD</b>.')}
        <button class="wf-btn primary block"><i data-lucide="check"></i>Salvar alterações</button>
      </div>
    </div>` };

  window.ADMIN_SCREENS = S;
})();
