/* Craque — Escolinha · Wireframes (lo-fi). Frente 2 — gestão da escolinha. */
(function () {
  const { stat, av, badge, field, sel, table, cellMain, note, lineChart, barChart } = window.WF;
  const toggleRow = (label, sub, on) => `
    <div class="wf-spread" style="padding:13px 0;border-bottom:1.5px dashed var(--line)">
      <div><div style="font-weight:700;font-size:14px">${label}</div><div class="wf-cellsub">${sub}</div></div>
      <div class="wf-toggle ${on ? 'on' : ''}"></div>
    </div>`;
  const S = {};

  // ---------- LOGIN ----------
  S.login = { html: `
    <div class="wf-login">
      <div class="wf-login-brand">
        <div class="blob" style="width:340px;height:340px;top:-120px;right:-90px"></div>
        <div class="blob" style="width:200px;height:200px;bottom:40px;left:-60px"></div>
        <div class="wf-brand" style="color:#fff">
          <span class="wf-logo"><i data-lucide="trophy"></i></span>
          <div><div class="wf-brand-name" style="color:#fff">Craque</div>
          <div class="wf-brand-sub" style="color:rgba(255,255,255,.6)">Área da escolinha</div></div>
        </div>
        <div style="position:relative">
          <div style="font-size:34px;font-weight:700;line-height:1.15;max-width:400px">Sua escolinha organizada, do treino à cobrança.</div>
          <p style="color:rgba(255,255,255,.65);font-size:16px;max-width:360px;margin-top:14px">
            Turmas, alunos, presença e mensalidades em um painel feito para o dia a dia da quadra.</p>
        </div>
        <div style="position:relative;font-size:13px;color:rgba(255,255,255,.45)">Copa 2026 · feito para o futebol de base</div>
      </div>
      <div class="wf-login-form">
        <div class="wf-login-inner">
          <div>
            <div style="font-size:26px;font-weight:700">Bem-vindo de volta 👋</div>
            <p class="wf-subtitle">Acesse a sua escolinha.</p>
          </div>
          ${field('E-mail', 'voce@escolinha.com')}
          ${field('Senha', '••••••••')}
          <div class="wf-spread">
            <div style="display:flex;align-items:center;gap:10px;color:var(--ink2);font-size:14px">
              <span class="wf-check"></span> Lembrar por 30 dias</div>
            <span style="font-size:14px;color:var(--accent-ink);font-weight:700">Esqueci a senha</span>
          </div>
          <button class="wf-btn primary block" data-go="home"><i data-lucide="log-in"></i>Entrar</button>
          ${note('Recebeu um convite da plataforma? Use o link do e-mail para <b>ativar a escolinha</b>.')}
        </div>
      </div>
    </div>` };

  // ---------- HOME / RESUMO ----------
  S.home = {
    title: 'Resumo da escolinha',
    subtitle: 'Olá, Carla 👋 — visão geral de abril.',
    html: `
    <div class="wf-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${stat({ icon: 'users', label: 'Alunos ativos', value: '142', trend: '+8', dir: 'up' })}
      ${stat({ icon: 'wallet', label: 'Recebido em abril', value: 'R$ 18.420', trend: '+12%', dir: 'up', dark: true })}
      ${stat({ icon: 'alert-circle', label: 'Mensalidades em aberto', value: 'R$ 2.150', trend: '8 alunos', dir: 'down' })}
      ${stat({ icon: 'percent', label: 'Presença média', value: '88%', trend: '+3pp', dir: 'up' })}
    </div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 320px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head">
            <div><h3 class="wf-card-title">Recebimentos</h3><p class="wf-card-sub">Previsto vs. recebido</p></div>
            <div style="display:flex;gap:16px;font-size:13px;color:var(--ink2)">
              <span style="display:flex;gap:6px;align-items:center"><i style="width:9px;height:9px;border-radius:50%;background:var(--accent-ink)"></i>Recebido</span>
              <span style="display:flex;gap:6px;align-items:center"><i style="width:9px;height:9px;border-radius:50%;background:var(--line-strong)"></i>Previsto</span>
            </div>
          </div>
          ${lineChart()}
        </div>
        <div class="wf-card">
          <div class="wf-card-head">
            <h3 class="wf-card-title">Mensalidades recentes</h3>
            <button class="wf-btn ghost sm" data-go="cobrancas">Ver todas <i data-lucide="arrow-right"></i></button>
          </div>
          <div class="wf-tabs" style="margin-bottom:6px"><span class="wf-tab on">Todas</span><span class="wf-tab">Em dia</span><span class="wf-tab">Atrasadas</span></div>
          ${table(['Aluno', 'Turma', 'Valor', 'Vencimento', 'Status'], [
            ['LP', 'Lucas Pereira', 'Sub-9 · Quarta 18h', 'R$ 250,00', '05 abr', ['Em dia', 'ok']],
            ['AC', 'Ana Beatriz Costa', 'Sub-11 · Terça 17h', 'R$ 250,00', '05 abr', ['Em dia', 'ok']],
            ['DS', 'Davi Souza', 'Sub-7 · Sábado 9h', 'R$ 220,00', '10 abr', ['Atrasado', 'bad']],
            ['MA', 'Mariana Alves', 'Sub-13 · Quinta 19h', 'R$ 280,00', '12 abr', ['Pendente', 'warn']],
          ].map((r) => ({ cells: [
            cellMain(r[0], r[1], null), `<span class="wf-cellsub">${r[2]}</span>`,
            `<span class="wf-num">${r[3]}</span>`, r[4], badge(r[5][0], r[5][1]),
          ] })))}
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-darkcard">
          <div class="blob" style="width:180px;height:180px;top:-70px;right:-50px"></div>
          <div class="wf-spread"><div><div style="font-size:12px;color:rgba(255,255,255,.6)">Saldo a receber · abril</div>
            <div style="font-size:28px;font-weight:700;margin-top:6px">R$ 6.890,00</div></div>
            <span style="font-weight:700;color:var(--accent)">Craque</span></div>
          <div style="display:flex;gap:12px;margin-top:22px">
            <div style="flex:1"><div style="font-size:12px;color:rgba(255,255,255,.6)">Recebido</div><div style="font-weight:700;margin-top:3px;color:var(--accent)">R$ 18.420</div></div>
            <div style="flex:1"><div style="font-size:12px;color:rgba(255,255,255,.6)">Em aberto</div><div style="font-weight:700;margin-top:3px">R$ 2.150</div></div>
          </div>
        </div>
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Próximas aulas</h3><a style="font-size:13px;color:var(--accent-ink);font-weight:700">Agenda</a></div>
          <div class="wf-stack" style="gap:0">
            ${[['SÁB', '09:00', 'Sub-7', 'Prof. Lucas · 18 alunos'], ['QUA', '18:00', 'Sub-9', 'Prof. Lucas · 24 alunos'], ['TER', '17:00', 'Sub-11', 'Profª. Bia · 21 alunos'], ['QUI', '19:00', 'Sub-13', 'Prof. André · 16 alunos']].map((c) => `
              <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1.5px dashed var(--line)">
                <span style="width:46px;height:46px;border-radius:10px;background:var(--accent-tint);border:2px solid #A9D9BC;display:grid;place-content:center;text-align:center;flex:none">
                  <span style="font-size:10px;font-weight:700;color:var(--accent-ink);line-height:1">${c[0]}</span>
                  <span style="font-size:13px;font-weight:700;line-height:1.3">${c[1]}</span></span>
                <div><div style="font-weight:700;font-size:14px">${c[2]}</div><div class="wf-cellsub">${c[3]}</div></div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>` };

  // ---------- TURMAS ----------
  const turmaCard = (nome, cat, agenda, local, prof, alunos, vagas) => `
    <div class="wf-card" style="cursor:pointer;padding:18px" data-go="turma-detalhe">
      <div class="wf-spread"><h3 class="wf-card-title" style="font-size:17px">${nome}</h3>${badge(cat, 'mut', true)}</div>
      <div class="wf-stack" style="gap:8px;margin-top:12px;font-size:13.5px;color:var(--ink2)">
        <div style="display:flex;gap:8px;align-items:center"><i data-lucide="calendar" style="width:15px;color:var(--ink3)"></i>${agenda}</div>
        <div style="display:flex;gap:8px;align-items:center"><i data-lucide="map-pin" style="width:15px;color:var(--ink3)"></i>${local}</div>
        <div style="display:flex;gap:8px;align-items:center"><i data-lucide="graduation-cap" style="width:15px;color:var(--ink3)"></i>${prof}</div>
      </div>
      <div class="wf-divider" style="margin:14px 0"></div>
      <div class="wf-spread">
        <span style="font-size:13px;color:var(--ink2)"><b style="color:var(--ink)">${alunos}</b> / ${vagas} vagas</span>
        ${alunos >= vagas ? badge('Lotada', 'warn') : badge('Aberta', 'ok')}
      </div>
    </div>`;
  S.turmas = {
    title: 'Turmas',
    subtitle: '4 turmas ativas · 142 alunos',
    html: `
    <div class="wf-spread" style="margin-bottom:18px">
      <div class="wf-chips"><span class="wf-chip on">Todas · 4</span><span class="wf-chip">Sub-7</span><span class="wf-chip">Sub-9</span><span class="wf-chip">Sub-11</span><span class="wf-chip">Sub-13</span></div>
      <button class="wf-btn primary sm" data-go="turma-cadastro"><i data-lucide="plus"></i>Nova turma</button>
    </div>
    <div class="wf-grid" style="grid-template-columns:repeat(3,1fr)">
      ${turmaCard('Sub-7', '5 a 7 anos', 'Sábado · 09h–10h30', 'Campo 1 · Unidade Centro', 'Prof. Lucas', 18, 20)}
      ${turmaCard('Sub-9', '8 a 9 anos', 'Quarta · 18h–19h30', 'Campo 2 · Unidade Centro', 'Prof. Lucas', 24, 24)}
      ${turmaCard('Sub-11', '10 a 11 anos', 'Terça · 17h–18h30', 'Campo 1 · Unidade Norte', 'Profª. Bia', 21, 26)}
      ${turmaCard('Sub-13', '12 a 13 anos', 'Quinta · 19h–20h30', 'Campo 2 · Unidade Norte', 'Prof. André', 16, 24)}
    </div>` };

  // ---------- NOVA TURMA ----------
  S['turma-cadastro'] = {
    title: 'Nova turma',
    subtitle: 'Defina categoria, agenda, local e professores',
    html: `
    <div class="wf-breadcrumb" data-go="turmas" style="cursor:pointer"><i data-lucide="arrow-left"></i> Turmas / <b style="color:var(--ink2)">Nova turma</b></div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Dados da turma</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Nome da turma', 'Ex.: Sub-9')}
            ${sel('Categoria / faixa etária', '8 a 9 anos')}
            ${sel('Unidade', 'Centro')}
            ${field('Local / campo', 'Campo 2')}
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Agenda</h3></div>
          <div class="wf-field" style="margin-bottom:14px"><span>Dias da semana</span>
            <div class="wf-chips">${['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d, i) => `<span class="wf-chip ${i === 2 ? 'on' : ''}">${d}</span>`).join('')}</div>
          </div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Início', '18:00')}
            ${field('Término', '19:30')}
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Professores &amp; capacidade</h3></div>
          <div class="wf-field" style="margin-bottom:14px"><span>Professores responsáveis</span>
            <div class="wf-chips"><span class="wf-chip on">Prof. Lucas ✕</span><span class="wf-chip">+ Adicionar</span></div>
          </div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Vagas', '24')}
            ${sel('Status', 'Ativa')}
          </div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        ${note('Depois de criada, a turma fica disponível para <b>vincular alunos</b> na matrícula.')}
        <div class="wf-stack" style="gap:10px">
          <button class="wf-btn primary block" data-go="turmas"><i data-lucide="check"></i>Salvar turma</button>
          <button class="wf-btn ghost block" data-go="turmas">Cancelar</button>
        </div>
      </div>
    </div>` };

  // ---------- ALUNOS ----------
  S.alunos = {
    title: 'Alunos',
    subtitle: '142 alunos matriculados em 4 turmas',
    html: `
    <div class="wf-card" style="padding:0;overflow:hidden">
      <div class="wf-spread" style="padding:18px 22px 0">
        <div class="wf-chips"><span class="wf-chip on">Todos · 142</span><span class="wf-chip">Sub-7</span><span class="wf-chip">Sub-9</span><span class="wf-chip">Sub-11</span><span class="wf-chip">Sub-13</span></div>
        <div style="display:flex;gap:10px">
          <button class="wf-btn ghost sm"><i data-lucide="sliders-horizontal"></i>Filtros</button>
          <button class="wf-btn primary sm" data-go="aluno-cadastro"><i data-lucide="user-plus"></i>Nova matrícula</button>
        </div>
      </div>
      <div style="padding:14px 22px 18px">
        ${table(['Aluno', 'Turma', 'Responsável', 'Presença', 'Mensalidade', ''], [
          ['LP', 'Lucas Pereira', '9 anos', 'Sub-9', 'Marcos Pereira', '(11) 98xxx-xx01', '92%', 'ok', ['Em dia', 'ok']],
          ['AC', 'Ana Beatriz Costa', '11 anos', 'Sub-11', 'Júlia Costa', '(11) 98xxx-xx02', '88%', 'ok', ['Em dia', 'ok']],
          ['DS', 'Davi Souza', '7 anos', 'Sub-7', 'Renata Souza', '(11) 98xxx-xx03', '74%', 'warn', ['Atrasado', 'bad']],
          ['MA', 'Mariana Alves', '13 anos', 'Sub-13', 'Paulo Alves', '(11) 98xxx-xx04', '81%', 'warn', ['Pendente', 'warn']],
          ['PH', 'Pedro Henrique', '9 anos', 'Sub-9', 'Sandra Lima', '(11) 98xxx-xx05', '95%', 'ok', ['Em dia', 'ok']],
        ].map((r) => ({ cells: [
          cellMain(r[0], r[1], r[2]), badge(r[3], 'mut', true),
          `<div><div style="font-size:14px">${r[4]}</div><div class="wf-cellsub">${r[5]}</div></div>`,
          `<div style="width:130px"><div class="wf-spread" style="margin-bottom:4px"><span class="wf-cellsub">Presença</span><span style="font-size:12px;font-weight:700">${r[6]}</span></div><div class="wf-line" style="height:8px;width:${r[6]};background:${r[7] === 'ok' ? 'var(--accent-tint)' : '#FBEFC4'}"></div></div>`,
          badge(r[8][0], r[8][1]),
          '<i data-lucide="more-horizontal" style="width:18px;color:var(--ink3)"></i>',
        ] })))}
      </div>
    </div>` };

  // ---------- NOVA MATRÍCULA ----------
  S['aluno-cadastro'] = {
    title: 'Iniciar matrícula',
    subtitle: 'Cadastre o aluno e convide o responsável para completar',
    html: `
    <div class="wf-breadcrumb" data-go="alunos" style="cursor:pointer"><i data-lucide="arrow-left"></i> Alunos / <b style="color:var(--ink2)">Nova matrícula</b></div>
    <div style="display:flex;gap:14px;align-items:center;margin-bottom:18px">
      <div class="wf-step on"><span class="n">1</span><span class="lbl">Dados do aluno</span></div><span class="bar" style="width:36px;border-top:2px dashed var(--line)"></span>
      <div class="wf-step on"><span class="n">2</span><span class="lbl">Responsável</span></div><span class="bar" style="width:36px;border-top:2px dashed var(--line)"></span>
      <div class="wf-step"><span class="n">3</span><span class="lbl">Convite</span></div>
    </div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Dados do aluno</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Nome completo', 'Nome do aluno')}
            ${field('Data de nascimento', 'dd/mm/aaaa')}
            ${sel('Turma(s)', 'Sub-9 · Quarta 18h')}
            ${sel('Status inicial', 'Pré-cadastro')}
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Contato do responsável</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Nome do responsável', 'Nome do responsável')}
            ${field('WhatsApp', '(11) 9xxxx-xxxx')}
            <div style="grid-column:1/-1">${field('E-mail', 'responsavel@email.com')}</div>
          </div>
        </div>
        <div class="wf-card" style="border-style:dashed">
          <div class="wf-spread">
            <div><div style="font-weight:700;font-size:15px">Link de convite gerado</div>
              <div class="wf-cellsub" style="margin-top:4px">craque.com/convite/aL9x-72kP · expira em 7 dias</div></div>
            <div style="display:flex;gap:8px">
              <button class="wf-btn ghost sm"><i data-lucide="copy"></i>Copiar</button>
              <button class="wf-btn primary sm"><i data-lucide="message-circle"></i>Enviar WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        ${note('O responsável abre o link e <b>completa o cadastro</b>. Você valida e ativa a matrícula.')}
        <div class="wf-stack" style="gap:10px">
          <button class="wf-btn primary block" data-go="alunos"><i data-lucide="check"></i>Salvar pré-cadastro</button>
          <button class="wf-btn ghost block" data-go="alunos">Cancelar</button>
        </div>
      </div>
    </div>` };

  // ---------- RESPONSÁVEIS ----------
  S.responsaveis = {
    title: 'Responsáveis',
    subtitle: 'Responsáveis vinculados aos alunos',
    html: `
    <div class="wf-card" style="padding:0;overflow:hidden">
      <div class="wf-spread" style="padding:18px 22px 0">
        <div class="wf-chips"><span class="wf-chip on">Todos · 124</span><span class="wf-chip">Cadastro completo</span><span class="wf-chip">Convite pendente</span></div>
        <button class="wf-btn primary sm" data-go="aluno-cadastro"><i data-lucide="user-plus"></i>Convidar responsável</button>
      </div>
      <div style="padding:14px 22px 18px">
        ${table(['Responsável', 'Alunos vinculados', 'Contato', 'Cadastro', ''], [
          ['MP', 'Marcos Pereira', 'marcos@email.com', 'Lucas Pereira (Sub-9)', '(11) 98xxx-xx01', ['Completo', 'ok'], 'Ver'],
          ['JC', 'Júlia Costa', 'julia@email.com', 'Ana Beatriz (Sub-11)', '(11) 98xxx-xx02', ['Completo', 'ok'], 'Ver'],
          ['RS', 'Renata Souza', 'renata@email.com', 'Davi Souza (Sub-7)', '(11) 98xxx-xx03', ['Completo', 'ok'], 'Ver'],
          ['SL', 'Sandra Lima', 'sandra@email.com', 'Pedro H. (Sub-9) · +1', '(11) 98xxx-xx05', ['Convite pendente', 'warn'], 'Reenviar'],
        ].map((r) => ({ cells: [
          cellMain(r[0], r[1], r[2]), r[3], r[4], badge(r[5][0], r[5][1]),
          `<button class="wf-btn ghost sm">${r[6]}</button>`,
        ] })))}
      </div>
    </div>` };

  // ---------- MENSALIDADES ----------
  S.cobrancas = {
    title: 'Mensalidades',
    subtitle: 'Acompanhe e registre os recebimentos do mês',
    html: `
    <div class="wf-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
      ${stat({ icon: 'check-circle-2', label: 'Recebido em abril', value: 'R$ 18.420', dark: true })}
      ${stat({ icon: 'clock', label: 'A vencer', value: 'R$ 2.150' })}
      ${stat({ icon: 'alert-circle', label: 'Em atraso', value: '8 alunos', trend: '-2', dir: 'down' })}
    </div>
    <div class="wf-card tight" style="margin-bottom:18px;display:flex;align-items:center;gap:16px">
      <span style="width:42px;height:42px;border-radius:10px;background:var(--accent-tint);border:2px solid #A9D9BC;display:grid;place-items:center;flex:none"><i data-lucide="zap" style="width:20px;color:var(--accent-ink)"></i></span>
      <div style="flex:1">
        <div style="font-weight:700">Baixa automática via gateway</div>
        <div class="wf-cellsub">Pix e cartão pagos pelo responsável são conciliados sozinhos por webhook (Asaas / Pagar.me). “Registrar” serve só p/ baixa manual (dinheiro).</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px"><span style="font-size:13px;color:var(--ink2)">Ativa</span><div class="wf-toggle on"></div></div>
    </div>
    <div class="wf-card">
      <div class="wf-card-head">
        <div><h3 class="wf-card-title">Cobranças de abril</h3><p class="wf-card-sub">8 mensalidades em aberto</p></div>
        <div style="display:flex;gap:10px">
          <button class="wf-btn ghost sm"><i data-lucide="repeat"></i>Recorrência</button>
          <button class="wf-btn primary sm" data-go="cobranca-nova"><i data-lucide="plus"></i>Nova cobrança</button>
        </div>
      </div>
      <div class="wf-tabs"><span class="wf-tab on">Todas</span><span class="wf-tab">Em dia</span><span class="wf-tab">Atrasadas</span></div>
      <div class="wf-stack" style="gap:0">
        ${[['LP', 'Lucas Pereira', 'Sub-9 · Quarta 18h', 'R$ 250,00', '05 abr', 'paid'], ['AC', 'Ana Beatriz Costa', 'Sub-11 · Terça 17h', 'R$ 250,00', '05 abr', 'paid'], ['DS', 'Davi Souza', 'Sub-7 · Sábado 9h', 'R$ 220,00', '10 abr', 'late'], ['MA', 'Mariana Alves', 'Sub-13 · Quinta 19h', 'R$ 280,00', '12 abr', 'pending'], ['PH', 'Pedro Henrique', 'Sub-9 · Quarta 18h', 'R$ 250,00', '15 abr', 'pending']].map((p) => {
          const st = { paid: ['Em dia', 'ok'], late: ['Atrasado', 'bad'], pending: ['Pendente', 'warn'] }[p[5]];
          return `<div style="display:flex;align-items:center;gap:16px;padding:15px 0;border-bottom:1.5px dashed var(--line)">
            ${av(p[0])}
            <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:15px">${p[1]}</div><div class="wf-cellsub">${p[2]}</div></div>
            <div style="text-align:right;min-width:90px"><div class="wf-num">${p[3]}</div><div class="wf-cellsub">Vence ${p[4]}</div></div>
            <div style="width:110px;display:flex;justify-content:flex-end">${badge(st[0], st[1])}</div>
            <div style="width:120px;display:flex;justify-content:flex-end">${p[5] === 'paid' ? '<span style="display:inline-flex;gap:6px;align-items:center;color:var(--accent-ink);font-weight:700;font-size:14px"><i data-lucide="check" style="width:16px"></i>Recebido</span>' : '<button class="wf-btn primary sm">Registrar</button>'}</div>
          </div>`;
        }).join('')}
      </div>
    </div>` };

  // ---------- FINANCEIRO ----------
  S.financeiro = {
    title: 'Financeiro da escolinha',
    subtitle: 'Recebimentos, repasses e taxas',
    html: `
    <div class="wf-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:20px">
      ${stat({ icon: 'arrow-down-left', label: 'Recebido (mês)', value: 'R$ 18.420' })}
      ${stat({ icon: 'clock', label: 'A receber', value: 'R$ 2.150' })}
      ${stat({ icon: 'banknote', label: 'Repassado para você', value: 'R$ 17.650', dark: true })}
      ${stat({ icon: 'scissors', label: 'Taxas + plataforma', value: 'R$ 770' })}
    </div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 320px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><div><h3 class="wf-card-title">Recebimentos por mês</h3><p class="wf-card-sub">Últimos 12 meses</p></div></div>
          ${barChart(11)}
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Recebíveis recentes</h3><button class="wf-btn ghost sm"><i data-lucide="download"></i>Extrato</button></div>
          ${table(['Aluno', 'Referência', 'Bruto', 'Taxa', 'Líquido', 'Status'], [
            ['Lucas Pereira', 'Mensalidade abr', 'R$ 250,00', 'R$ 8,73', 'R$ 241,27', ['Repassado', 'ok']],
            ['Ana Beatriz', 'Mensalidade abr', 'R$ 250,00', 'R$ 8,73', 'R$ 241,27', ['Repassado', 'ok']],
            ['Davi Souza', 'Mensalidade abr', 'R$ 220,00', 'R$ 7,68', 'R$ 212,32', ['Em atraso', 'bad']],
            ['Mariana Alves', 'Matrícula', 'R$ 100,00', 'R$ 3,49', 'R$ 96,51', ['Processando', 'info']],
          ].map((r) => ({ cells: [r[0], r[1], `<span class="wf-num">${r[2]}</span>`, r[3], `<span class="wf-num">${r[4]}</span>`, badge(r[5][0], r[5][1])] })))}
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Próximo repasse</h3></div>
          <div style="font-size:24px;font-weight:700">R$ 17.650,00</div>
          <p class="wf-cellsub">Cai na conta em 30 abr</p>
          <div class="wf-divider"></div>
          <div class="wf-stack" style="gap:9px;font-size:14px">
            <div class="wf-spread"><span style="color:var(--ink2)">Bruto recebido</span><b>R$ 18.420</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Taxa gateway</span><b>− R$ 402</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Plataforma (2%)</span><b>− R$ 368</b></div>
          </div>
        </div>
        ${note('Se o <b>split para professor</b> estiver ativo, o líquido é dividido conforme a regra do plano.')}
      </div>
    </div>` };

  // ---------- PROFESSORES / EQUIPE ----------
  S.professores = {
    title: 'Professores & equipe',
    subtitle: 'Membros, turmas e divisão de valores',
    html: `
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-card" style="padding:0;overflow:hidden">
        <div class="wf-spread" style="padding:18px 22px 0">
          <div class="wf-tabs" style="margin:0;border:none"><span class="wf-tab on">Ativos · 5</span><span class="wf-tab">Convites · 1</span></div>
          <button class="wf-btn primary sm" data-go="membro-novo"><i data-lucide="user-plus"></i>Adicionar membro</button>
        </div>
        <div style="padding:14px 22px 18px">
          ${table(['Membro', 'Função', 'Turmas', 'Split', 'Status', ''], [
            ['LM', 'Lucas Martins', 'lucas@escolinha.com', 'Professor', 'Sub-7, Sub-9', '8%', ['Ativo', 'ok']],
            ['BR', 'Bia Rocha', 'bia@escolinha.com', 'Professora', 'Sub-11', '8%', ['Ativo', 'ok']],
            ['AS', 'André Silva', 'andre@escolinha.com', 'Professor', 'Sub-13', '—', ['Ativo', 'ok']],
            ['CM', 'Carla Mendes', 'carla@escolinha.com', 'Coordenadora', 'Todas', '—', ['Ativo', 'ok']],
          ].map((r) => ({ cells: [
            cellMain(r[0], r[1], r[2]), badge(r[3], 'mut', true), r[4],
            `<span class="wf-num">${r[5]}</span>`, badge(r[6][0], r[6][1]),
            '<i data-lucide="more-horizontal" style="width:18px;color:var(--ink3)"></i>',
          ] })))}
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Split para professores</h3></div>
          <div class="wf-spread" style="padding:6px 0"><div><div style="font-weight:700;font-size:14px">Habilitar split</div><div class="wf-cellsub">Disponível no plano Pro</div></div><div class="wf-toggle on"></div></div>
          <div class="wf-divider"></div>
          <p style="font-size:13px;color:var(--ink2)">A cada mensalidade recebida, o percentual definido é repassado automaticamente ao professor da turma.</p>
        </div>
        ${note('O split é registrado de forma <b>auditável</b> em cada transação.')}
      </div>
    </div>` };

  // ---------- RELATÓRIOS ----------
  S.relatorios = {
    title: 'Relatórios da escolinha',
    subtitle: 'Financeiro, inadimplência e presença',
    html: `
    <div class="wf-card" style="margin-bottom:18px">
      <div class="wf-grid" style="grid-template-columns:1.4fr 1fr 1fr 1fr auto;align-items:end;gap:14px">
        ${sel('Tipo', 'Financeiro')}
        ${sel('Turma', 'Todas')}
        ${sel('Período', 'Abril 2026')}
        ${sel('Formato', 'CSV')}
        <button class="wf-btn primary"><i data-lucide="download"></i>Exportar</button>
      </div>
    </div>
    <div class="wf-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:18px">
      ${[['bar-chart-3', 'Financeiro', 'Recebido, a receber e taxas'], ['user-x', 'Inadimplência', 'Alunos em atraso'], ['calendar-check', 'Presença', 'Frequência por turma']].map((c) => `
        <div class="wf-card tight" style="cursor:pointer">
          <div class="wf-spread"><div class="wf-stat-ico" style="margin:0"><i data-lucide="${c[0]}"></i></div><i data-lucide="arrow-up-right" style="width:17px;color:var(--ink3)"></i></div>
          <div style="font-weight:700;margin-top:12px">${c[1]}</div><div class="wf-cellsub">${c[2]}</div>
        </div>`).join('')}
    </div>
    <div class="wf-card">
      <div class="wf-card-head"><h3 class="wf-card-title">Prévia · Inadimplência</h3><span class="wf-cellsub">Abril 2026</span></div>
      ${table(['Aluno', 'Turma', 'Responsável', 'Valor', 'Vencido há', 'Status'], [
        ['Davi Souza', 'Sub-7', 'Renata Souza', 'R$ 220,00', '14 dias', ['Atrasado', 'bad']],
        ['Bruno Dias', 'Sub-9', 'Carla Dias', 'R$ 250,00', '8 dias', ['Atrasado', 'bad']],
        ['Igor Melo', 'Sub-13', 'Ana Melo', 'R$ 280,00', '3 dias', ['Atrasado', 'bad']],
      ].map((r) => ({ cells: [r[0], badge(r[1], 'mut', true), r[2], `<span class="wf-num">${r[3]}</span>`, r[4], badge(r[5][0], r[5][1])] })))}
    </div>` };

  // ---------- DETALHE DA TURMA ----------
  S['turma-detalhe'] = {
    title: 'Turma Sub-9',
    subtitle: 'Quarta · 18h–19h30 · Campo 2 · Unidade Centro',
    html: `
    <div class="wf-breadcrumb" data-go="turmas" style="cursor:pointer"><i data-lucide="arrow-left"></i> Turmas / <b style="color:var(--ink2)">Sub-9</b></div>
    <div class="wf-spread" style="margin-bottom:18px">
      <div class="wf-chips"><span class="wf-badge ok">Aberta</span><span class="wf-badge mut bare">8 a 9 anos</span></div>
      <div style="display:flex;gap:10px">
        <button class="wf-btn ghost sm" data-go="turma-cadastro"><i data-lucide="pencil"></i>Editar turma</button>
        <button class="wf-btn primary sm" data-go="aluno-cadastro"><i data-lucide="user-plus"></i>Adicionar aluno</button>
      </div>
    </div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-card" style="padding:0;overflow:hidden">
        <div class="wf-spread" style="padding:18px 22px 0">
          <h3 class="wf-card-title">Alunos inscritos · 24</h3>
          <div class="wf-chips"><span class="wf-chip on">Todos</span><span class="wf-chip">Em dia</span><span class="wf-chip">Atrasados</span></div>
        </div>
        <div style="padding:14px 22px 18px">
          ${table(['Aluno', 'Responsável', 'Presença', 'Mensalidade', ''], [
            ['LP', 'Lucas Pereira', '9 anos', 'Marcos Pereira', '92%', 'ok', ['Em dia', 'ok']],
            ['PH', 'Pedro Henrique', '9 anos', 'Sandra Lima', '95%', 'ok', ['Em dia', 'ok']],
            ['BD', 'Bruno Dias', '8 anos', 'Carla Dias', '70%', 'warn', ['Atrasado', 'bad']],
            ['TM', 'Théo Moraes', '9 anos', 'Rita Moraes', '88%', 'ok', ['Em dia', 'ok']],
            ['GN', 'Gael Nunes', '8 anos', 'Ivo Nunes', '83%', 'warn', ['Pendente', 'warn']],
            ['VR', 'Vitor Reis', '9 anos', 'Lia Reis', '97%', 'ok', ['Em dia', 'ok']],
          ].map((r) => ({ cells: [
            cellMain(r[0], r[1], r[2]), r[3],
            `<div style="width:120px"><div class="wf-spread" style="margin-bottom:4px"><span class="wf-cellsub">Presença</span><span style="font-size:12px;font-weight:700">${r[4]}</span></div><div class="wf-line" style="height:8px;width:${r[4]};background:${r[5] === 'ok' ? 'var(--accent-tint)' : '#FBEFC4'}"></div></div>`,
            badge(r[6][0], r[6][1]),
            '<i data-lucide="x" style="width:17px;color:var(--ink3);cursor:pointer"></i>',
          ] })))}
        </div>
        <div class="wf-spread" style="padding:0 22px 16px;color:var(--ink3);font-size:13px">
          <span>Mostrando 6 de 24</span>
          <div style="display:flex;gap:8px"><button class="wf-btn ghost sm">Anterior</button><button class="wf-btn ghost sm">Próxima</button></div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Informações</h3></div>
          <div class="wf-stack" style="gap:12px;font-size:14px">
            <div class="wf-spread"><span style="color:var(--ink2)">Categoria</span><b>8 a 9 anos</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Agenda</span><b>Qua · 18h</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Local</span><b>Campo 2 · Centro</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Professor</span><span style="display:flex;gap:8px;align-items:center">${av('LM')}<b>Lucas M.</b></span></div>
          </div>
          <div class="wf-divider"></div>
          <div class="wf-spread" style="margin-bottom:6px"><span style="font-size:13px;color:var(--ink2)">Capacidade</span><span style="font-size:13px;font-weight:700">24 / 24</span></div>
          <div class="wf-line" style="height:9px;width:100%;background:#FBEFC4"></div>
          <div style="margin-top:8px">${badge('Turma lotada', 'warn')}</div>
        </div>
        <div class="wf-card tight">
          <div class="wf-spread" style="margin-bottom:6px"><span style="font-size:13px;color:var(--ink2)">Presença média</span><span style="font-size:13px;font-weight:700">88%</span></div>
          <div class="wf-line" style="height:9px;width:88%;background:var(--accent-tint)"></div>
        </div>
        ${note('Alunos podem estar em <b>mais de uma turma</b>. Remover daqui não exclui o cadastro do aluno.')}
      </div>
    </div>` };

  // ---------- NOVA COBRANÇA ----------
  S['cobranca-nova'] = {
    title: 'Nova cobrança',
    subtitle: 'Gere uma fatura única ou recorrente para o aluno',
    html: `
    <div class="wf-breadcrumb" data-go="cobrancas" style="cursor:pointer"><i data-lucide="arrow-left"></i> Mensalidades / <b style="color:var(--ink2)">Nova cobrança</b></div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Para quem</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${sel('Aluno', 'Buscar aluno…')}
            ${sel('Turma', 'Sub-9 · Quarta 18h')}
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Cobrança</h3></div>
          <div class="wf-field" style="margin-bottom:14px"><span>Tipo</span>
            <div class="wf-chips"><span class="wf-chip on">Mensalidade</span><span class="wf-chip">Matrícula</span><span class="wf-chip">Avulsa</span></div>
          </div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Valor', 'R$ 250,00')}
            ${field('Vencimento', '05/05/2026')}
          </div>
          <div class="wf-divider"></div>
          <div class="wf-field"><span>Recorrência</span>
            <div class="wf-chips"><span class="wf-chip">Única</span><span class="wf-chip on">Mensal (recorrente)</span></div>
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Pagamento &amp; envio</h3></div>
          <div class="wf-field" style="margin-bottom:14px"><span>Métodos disponíveis ao responsável</span>
            <div class="wf-chips"><span class="wf-chip on">Pix</span><span class="wf-chip on">Cartão</span><span class="wf-chip">Boleto</span></div>
          </div>
          ${toggleRow('Enviar link por WhatsApp', 'Assim que a cobrança for criada', true)}
          ${toggleRow('Enviar por e-mail', 'Com a 2ª via e instruções', true)}
          <div class="wf-spread" style="padding:13px 0 0"><div><div style="font-weight:700;font-size:14px">Lembrete automático</div><div class="wf-cellsub">3 dias antes do vencimento</div></div><div class="wf-toggle on"></div></div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Resumo</h3></div>
          <div class="wf-stack" style="gap:10px;font-size:14px">
            <div class="wf-spread"><span style="color:var(--ink2)">Valor</span><b>R$ 250,00</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Vencimento</span><b>05/05/2026</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Recorrência</span><b>Mensal</b></div>
            <div class="wf-divider" style="margin:6px 0"></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Plataforma (2%)</span><b>R$ 5,00</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Split prof. (8%)</span><b>R$ 19,60</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Líquido escolinha</span><b style="color:var(--accent-ink)">R$ 216,67</b></div>
          </div>
        </div>
        ${note('A baixa é <b>automática</b> quando o responsável paga (webhook do gateway). O split é registrado na criação.')}
        <div class="wf-stack" style="gap:10px">
          <button class="wf-btn primary block" data-go="cobrancas"><i data-lucide="check"></i>Criar cobrança</button>
          <button class="wf-btn ghost block" data-go="cobrancas">Cancelar</button>
        </div>
      </div>
    </div>` };

  // ---------- ADICIONAR MEMBRO ----------
  S['membro-novo'] = {
    title: 'Adicionar membro',
    subtitle: 'Convide um professor ou membro da equipe',
    html: `
    <div class="wf-breadcrumb" data-go="professores" style="cursor:pointer"><i data-lucide="arrow-left"></i> Professores / <b style="color:var(--ink2)">Adicionar membro</b></div>
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Dados do membro</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Nome completo', 'Nome do professor')}
            ${sel('Função', 'Professor')}
            ${field('E-mail', 'professor@escolinha.com')}
            ${field('WhatsApp', '(11) 9xxxx-xxxx')}
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Turmas &amp; acesso</h3></div>
          <div class="wf-field" style="margin-bottom:14px"><span>Turmas atribuídas</span>
            <div class="wf-chips"><span class="wf-chip on">Sub-7 ✕</span><span class="wf-chip on">Sub-9 ✕</span><span class="wf-chip">+ Adicionar</span></div>
          </div>
          ${toggleRow('Ver financeiro das suas turmas', 'Recebíveis e inadimplência', true)}
          ${toggleRow('Gerenciar alunos e presença', 'Cadastrar e marcar presença', true)}
          <div class="wf-spread" style="padding:13px 0 0"><div><div style="font-weight:700;font-size:14px">Acesso às configurações</div><div class="wf-cellsub">Apenas coordenação</div></div><div class="wf-toggle"></div></div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Split (opcional)</h3></div>
          ${toggleRow('Habilitar split para este membro', 'Repasse automático por mensalidade', true)}
          <div class="wf-grid" style="grid-template-columns:1fr 1fr;margin-top:14px">
            ${field('Percentual', '8%')}
            ${sel('Aplicar a', 'Turmas atribuídas')}
          </div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        ${note('O membro recebe um <b>convite por e-mail</b> para criar a senha e acessar a escolinha.')}
        <div class="wf-stack" style="gap:10px">
          <button class="wf-btn primary block" data-go="professores"><i data-lucide="send"></i>Enviar convite</button>
          <button class="wf-btn ghost block" data-go="professores">Cancelar</button>
        </div>
      </div>
    </div>` };

  // ---------- CONFIGURAÇÕES ----------
  const planoRail = (saveLabel) => `
    <div class="wf-stack" style="gap:18px">
      <div class="wf-darkcard">
        <div class="wf-spread"><div style="font-size:12px;color:rgba(255,255,255,.6)">Plano atual</div><span style="font-weight:700;color:var(--accent)">Pro</span></div>
        <div style="font-size:22px;font-weight:700;margin-top:8px">R$ 149/mês <span style="font-size:14px;color:rgba(255,255,255,.6);font-weight:400">+ 2%</span></div>
        <button class="wf-btn ghost block" style="margin-top:14px;background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.2);color:#fff">Gerenciar plano</button>
      </div>
      ${note('Toda ação crítica gera <b>audit log</b>. Dados seguem a <b>LGPD</b>.')}
      <button class="wf-btn primary block"><i data-lucide="check"></i>${saveLabel || 'Salvar alterações'}</button>
    </div>`;

  const cfgDados = `
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-card">
        <div class="wf-card-head"><h3 class="wf-card-title">Dados da escolinha</h3></div>
        <div class="wf-grid" style="grid-template-columns:1fr 1fr">
          ${field('Nome', 'FC Estrela')}
          ${field('CNPJ', '00.000.000/0000-00')}
          ${field('Cidade', 'São Paulo · SP')}
          ${field('Unidades', 'Centro, Norte')}
          ${field('Telefone', '(11) 3xxx-xxxx')}
          ${field('E-mail de contato', 'contato@fcestrela.com')}
          <div style="grid-column:1/-1">${field('Logo da escolinha', '', { cls: 'area' })}</div>
        </div>
      </div>
      ${planoRail()}
    </div>`;

  const cfgCobranca = `
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Valores padrão</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr">
            ${field('Mensalidade padrão', 'R$ 250,00')}
            ${field('Taxa de matrícula', 'R$ 100,00')}
            ${field('Multa por atraso', '2%')}
            ${field('Juros ao mês', '1%')}
          </div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Regras de cobrança</h3></div>
          <div class="wf-grid" style="grid-template-columns:1fr 1fr;margin-bottom:6px">
            ${sel('Dia de vencimento', 'Dia 05')}
            ${sel('Gerar fatura', '5 dias antes')}
          </div>
          <div class="wf-divider"></div>
          ${toggleRow('Cobrança recorrente automática', 'Gera a mensalidade todo mês', true)}
          ${toggleRow('Baixa automática (webhook do gateway)', 'Concilia Pix e cartão sem ação manual', true)}
          <div class="wf-spread" style="padding:13px 0 0"><div><div style="font-weight:700;font-size:14px">Métodos no checkout</div><div class="wf-cellsub">Disponíveis conforme o plano</div></div>
            <div class="wf-chips"><span class="wf-chip on">Pix</span><span class="wf-chip on">Cartão</span><span class="wf-chip">Boleto</span></div></div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card tight">
          <div class="wf-card-head"><h3 class="wf-card-title" style="font-size:16px">Gateway</h3>${badge('Conectado', 'ok')}</div>
          <div class="wf-stack" style="gap:10px;font-size:14px">
            <div class="wf-spread"><span style="color:var(--ink2)">Provedor</span><b>Asaas</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Subconta</span><b>rec_8841</b></div>
            <div class="wf-spread"><span style="color:var(--ink2)">Prazo de repasse</span><b>D+1</b></div>
          </div>
        </div>
        ${note('Configurado pela plataforma. A escolinha não acessa as chaves do gateway.')}
        <button class="wf-btn primary block"><i data-lucide="check"></i>Salvar alterações</button>
      </div>
    </div>`;

  const cfgNotif = `
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Lembretes ao responsável</h3></div>
          ${toggleRow('Mensalidade a vencer', '3 dias antes do vencimento', true)}
          ${toggleRow('Mensalidade vencida', 'No dia seguinte ao vencimento', true)}
          ${toggleRow('Confirmação de pagamento', 'Recibo automático ao pagar', true)}
          <div class="wf-spread" style="padding:13px 0 0"><div><div style="font-weight:700;font-size:14px">Aviso de nova matrícula</div><div class="wf-cellsub">Quando o cadastro é concluído</div></div><div class="wf-toggle"></div></div>
        </div>
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Canais</h3></div>
          ${toggleRow('WhatsApp', 'Canal principal de cobrança', true)}
          ${toggleRow('E-mail', 'Recibos e 2ª via', true)}
          <div class="wf-spread" style="padding:13px 0 0"><div><div style="font-weight:700;font-size:14px">Push (app)</div><div class="wf-cellsub">Disponível na área do responsável</div></div><div class="wf-toggle on"></div></div>
        </div>
      </div>
      ${planoRail('Salvar notificações')}
    </div>`;

  const cfgSplit = `
    <div class="wf-grid" style="grid-template-columns:minmax(0,1fr) 300px">
      <div class="wf-stack" style="gap:18px">
        <div class="wf-card">
          <div class="wf-card-head"><h3 class="wf-card-title">Split para professores</h3>${badge('Plano Pro', 'mut', true)}</div>
          ${toggleRow('Habilitar split', 'Repasse automático por mensalidade', true)}
          <div class="wf-grid" style="grid-template-columns:1fr 1fr;margin-top:14px">
            ${field('Percentual padrão', '8%')}
            ${sel('Base de cálculo', 'Líquido da escolinha')}
          </div>
          <div class="wf-divider"></div>
          <p style="font-size:13px;color:var(--ink2)">A cada mensalidade recebida, o percentual definido é repassado automaticamente ao professor da turma e registrado de forma auditável.</p>
        </div>
        <div class="wf-card" style="padding:0;overflow:hidden">
          <div style="padding:18px 22px 0"><h3 class="wf-card-title">Split por membro</h3></div>
          <div style="padding:14px 22px 18px">
            ${table(['Membro', 'Função', 'Split', ''], [
              ['LM', 'Lucas Martins', 'Professor', '8%', 'Editar'],
              ['BR', 'Bia Rocha', 'Professora', '8%', 'Editar'],
              ['AS', 'André Silva', 'Professor', '—', 'Definir'],
            ].map((r) => ({ cells: [
              cellMain(r[0], r[1], null), badge(r[2], 'mut', true), `<span class="wf-num">${r[3]}</span>`,
              `<button class="wf-btn ghost sm">${r[4]}</button>`,
            ] })))}
          </div>
        </div>
      </div>
      <div class="wf-stack" style="gap:18px">
        ${note('Split é calculado na <b>criação da cobrança</b> e registrado por transação. Mudanças não afetam cobranças já geradas.')}
        <button class="wf-btn primary block"><i data-lucide="check"></i>Salvar split</button>
      </div>
    </div>`;

  S.config = {
    title: 'Configurações da escolinha',
    subtitle: 'Dados, cobrança, notificações e equipe',
    html: `
    <div data-tabgroup>
      <div class="wf-tabs">
        <span class="wf-tab on" data-tab="dados">Dados</span>
        <span class="wf-tab" data-tab="cobranca">Cobrança</span>
        <span class="wf-tab" data-tab="notif">Notificações</span>
        <span class="wf-tab" data-tab="split">Equipe &amp; Split</span>
      </div>
      <div data-tabpanel="dados">${cfgDados}</div>
      <div data-tabpanel="cobranca" style="display:none">${cfgCobranca}</div>
      <div data-tabpanel="notif" style="display:none">${cfgNotif}</div>
      <div data-tabpanel="split" style="display:none">${cfgSplit}</div>
    </div>` };

  window.ESCOLINHA_SCREENS = S;
})();
