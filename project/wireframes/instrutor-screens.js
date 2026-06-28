/* Craque — Instrutor/Professor · Wireframes (lo-fi, mobile). Frente 4. */
(function () {
  const { badge, field, note } = window.WF;

  const av = (i, s = 44) =>
    `<span class="mob-av" style="width:${s}px;height:${s}px;font-size:${Math.round(s / 3)}px">${i}</span>`;

  const listRow = (icon, label, sub, go) => `
    <div class="mob-row" style="cursor:pointer" ${go ? `data-go="${go}"` : ''}>
      <span class="mob-rowico"><i data-lucide="${icon}"></i></span>
      <div style="flex:1"><div style="font-weight:700;font-size:15px">${label}</div>${sub ? `<div class="wf-cellsub">${sub}</div>` : ''}</div>
      <i data-lucide="chevron-right" style="width:18px;color:var(--ink3)"></i>
    </div>`;

  const toggleRow = (label, sub, on) => `
    <div style="display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1.5px dashed var(--line)">
      <div style="flex:1"><div style="font-weight:700;font-size:14px">${label}</div><div class="wf-cellsub">${sub}</div></div>
      <div class="wf-toggle ${on ? 'on' : ''}"></div>
    </div>`;

  /* Attendance row — aluno com botões Presente / Falta */
  const chamadaRow = (ini, nome, n, status) => {
    const s = status === 'ok'
      ? { pLabel: 'Presente', pStyle: 'background:var(--accent-tint);border-color:var(--accent-ink);color:var(--accent-ink)', fStyle: 'background:var(--card);border-color:var(--line);color:var(--ink3)' }
      : status === 'bad'
      ? { pLabel: 'Presente', pStyle: 'background:var(--card);border-color:var(--line);color:var(--ink3)', fStyle: 'background:#FDE8E8;border-color:#D44;color:#C33' }
      : { pLabel: 'Presente', pStyle: 'background:var(--card);border-color:var(--line);color:var(--ink2)', fStyle: 'background:var(--card);border-color:var(--line);color:var(--ink2)' };
    return `
    <div style="display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1.5px dashed var(--line)">
      ${av(ini, 40)}
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${nome}</div>
        <div class="wf-cellsub">#${n}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button style="height:34px;padding:0 12px;border-radius:9px;border:2px solid;font-size:12px;font-weight:700;cursor:pointer;${s.pStyle}">✓ Presente</button>
        <button style="height:34px;padding:0 12px;border-radius:9px;border:2px solid;font-size:12px;font-weight:700;cursor:pointer;${s.fStyle}">✗ Falta</button>
      </div>
    </div>`;
  };

  /* Turma card compacto */
  const turmaCard = (cor, nome, sub, horario, alunos, go) => `
    <div class="mob-card" style="margin-bottom:12px;cursor:pointer" data-go="${go}">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="width:44px;height:44px;border-radius:12px;background:${cor};display:grid;place-items:center;flex:none">
          <i data-lucide="goal" style="width:22px;height:22px;color:#fff"></i>
        </span>
        <div style="flex:1">
          <div style="font-weight:700;font-size:16px">${nome}</div>
          <div class="wf-cellsub">${sub}</div>
        </div>
        ${badge(`${alunos} alunos`, 'mut', true)}
        <i data-lucide="chevron-right" style="width:18px;color:var(--ink3)"></i>
      </div>
      <div style="display:flex;gap:16px;margin-top:12px;padding-top:12px;border-top:1.5px dashed var(--line)">
        <div style="display:flex;gap:6px;align-items:center;color:var(--ink2);font-size:13px"><i data-lucide="calendar" style="width:14px"></i>${horario}</div>
      </div>
    </div>`;

  /* Mini stat card */
  const miniStat = (ico, val, label, tint, ink) => `
    <div style="flex:1;background:${tint};border:2px solid var(--line);border-radius:16px;padding:14px 12px;text-align:center">
      <i data-lucide="${ico}" style="width:22px;height:22px;color:${ink};display:block;margin:0 auto 6px"></i>
      <div style="font-size:26px;font-weight:700;color:${ink};line-height:1">${val}</div>
      <div style="font-size:12px;color:var(--ink2);margin-top:4px">${label}</div>
    </div>`;

  /* Quick action button */
  const qa = (ico, label, go) => `
    <div class="mob-card" style="flex:1;text-align:center;cursor:pointer;padding:18px 8px" data-go="${go}">
      <span style="width:46px;height:46px;border-radius:13px;background:var(--fill2);display:inline-grid;place-items:center;margin-bottom:8px">
        <i data-lucide="${ico}" style="width:22px;height:22px;color:var(--ink2)"></i>
      </span>
      <div style="font-size:13px;font-weight:700">${label}</div>
    </div>`;

  const S = {};

  /* ---------- LOGIN ---------- */
  S.login = { chrome: 'full', html: `
    <div style="display:flex;flex-direction:column;height:100%;padding:8px 8px 18px">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px">
        <span class="mob-logo"><i data-lucide="clipboard-list"></i></span>
        <div>
          <div style="font-weight:700;font-size:24px;line-height:1">Craque</div>
          <div class="wf-cellsub">Área do instrutor</div>
        </div>
        <div style="font-size:20px;font-weight:700;line-height:1.25;max-width:280px;margin-top:14px">Chamada, turmas e comunicados em um só lugar.</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${field('E-mail', 'voce@email.com')}
        ${field('Senha', '••••••••')}
        <button class="mob-cta" data-nav="home"><i data-lucide="log-in"></i>Entrar</button>
        ${note('Seu acesso é criado pela <b>escolinha</b>. Verifique o convite no seu e-mail ou WhatsApp.')}
      </div>
    </div>` };

  /* ---------- HOME ---------- */
  S.home = { title: null, chrome: 'app', tab: 'home', html: `
    <!-- Saudação + escola -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0 16px">
      <div>
        <div style="font-size:20px;font-weight:700">Olá, João! 👋</div>
        <div class="wf-cellsub">Quarta-feira, 25 abr</div>
      </div>
      <button class="mob-back" style="border-radius:50%;position:relative">
        <i data-lucide="bell"></i>
        <span style="position:absolute;top:6px;right:7px;width:8px;height:8px;border-radius:50%;background:#E74C3C;border:2px solid var(--card)"></span>
      </button>
    </div>

    <!-- Card escola -->
    <div class="mob-card dark" style="margin-bottom:18px;display:flex;gap:12px;align-items:center">
      <span style="width:52px;height:52px;border-radius:14px;background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.2);display:grid;place-items:center;flex:none">
        <i data-lucide="shield" style="width:26px;height:26px;color:rgba(255,255,255,.85)"></i>
      </span>
      <div>
        <div style="font-size:17px;font-weight:700">FC Estrela</div>
        <div style="font-size:13px;color:rgba(255,255,255,.6)">Treinador Auxiliar</div>
      </div>
    </div>

    <!-- Stats -->
    <div class="mob-h" style="margin-top:0">Suas turmas</div>
    <div style="display:flex;gap:10px;margin-bottom:16px">
      ${miniStat('goal', '3', 'Turmas Ativas', 'var(--fill2)', 'var(--ink)')}
      ${miniStat('users', '38', 'Total de Alunos', '#EAF9EF', 'var(--accent-ink)')}
      ${miniStat('calendar-check', '1', 'Treino hoje', '#FFF8E1', '#B07800')}
    </div>

    <!-- Lista de turmas resumida -->
    <div class="mob-card" style="padding:4px 16px;margin-bottom:18px">
      ${[['Sub-7', 'Seg e Qua · 17h', '12 alunos'], ['Sub-9', 'Ter e Qui · 18h', '14 alunos'], ['Sub-15', 'Sex · 19h', '12 alunos']].map(([n, h, a]) => `
        <div class="mob-row" style="cursor:pointer" data-go="turmas">
          <span class="mob-rowico" style="background:var(--fill2)"><i data-lucide="goal"></i></span>
          <div style="flex:1"><div style="font-weight:700;font-size:15px">${n}</div><div class="wf-cellsub">${h}</div></div>
          ${badge(a, 'mut', true)}
          <i data-lucide="chevron-right" style="width:16px;color:var(--ink3);margin-left:4px"></i>
        </div>`).join('')}
    </div>

    <!-- Ações Rápidas -->
    <div class="mob-h">Ações rápidas</div>
    <div style="display:flex;gap:10px;margin-bottom:4px">
      ${qa('clipboard-check', 'Chamada', 'chamada')}
      ${qa('users', 'Alunos', 'alunos')}
      ${qa('calendar', 'Calendário', 'calendario')}
      ${qa('megaphone', 'Comunicados', 'comunicados')}
    </div>` };

  /* ---------- TURMAS ---------- */
  S.turmas = { title: 'Minhas turmas', chrome: 'app', tab: 'turmas', html: `
    ${turmaCard('var(--ink)', 'Sub-7', '6 a 7 anos', 'Seg e Qua · 17h–18h30', 12, 'turma')}
    ${turmaCard('#2A6FDB', 'Sub-9', '8 a 9 anos', 'Ter e Qui · 18h–19h30', 14, 'turma')}
    ${turmaCard('var(--accent-ink)', 'Sub-15', '14 a 15 anos', 'Sex · 19h–20h30', 12, 'turma')}
    ${note('Turmas atribuídas pela escolinha. Fale com a administração para ajustes.')}` };

  /* ---------- DETALHE DA TURMA ---------- */
  S.turma = { title: 'Sub-9', chrome: 'app', tab: 'turmas', back: 'turmas', html: `
    <div style="display:flex;gap:10px;margin-bottom:16px">
      ${miniStat('users', '14', 'Alunos', 'var(--fill2)', 'var(--ink)')}
      ${miniStat('calendar-check', '87%', 'Presença média', '#EAF9EF', 'var(--accent-ink)')}
      ${miniStat('clock', '18h', 'Próximo', '#FFF8E1', '#B07800')}
    </div>
    <div data-tabgroup>
      <div class="mob-seg">
        <div class="mob-segbtn on" data-tab="alunos">Alunos</div>
        <div class="mob-segbtn" data-tab="chamadas">Chamadas</div>
        <div class="mob-segbtn" data-tab="horario">Horário</div>
      </div>

      <!-- Alunos -->
      <div data-tabpanel="alunos">
        <div class="mob-card" style="padding:4px 16px;margin-bottom:14px">
          ${[['GS', 'Gabriel Silva', '9 anos'], ['LO', 'Larissa Oliveira', '8 anos'], ['ML', 'Miguel Lima', '9 anos'], ['BS', 'Beatriz Santos', '8 anos'], ['RA', 'Rafael Alves', '9 anos']].map(([i, n, id]) => `
            <div class="mob-row" style="cursor:pointer" data-go="aluno">
              ${av(i, 36)}
              <div style="flex:1;margin-left:4px"><div style="font-weight:700;font-size:14px">${n}</div><div class="wf-cellsub">${id}</div></div>
              <i data-lucide="chevron-right" style="width:16px;color:var(--ink3)"></i>
            </div>`).join('')}
        </div>
        <button class="mob-cta" data-go="chamada"><i data-lucide="clipboard-check"></i>Fazer chamada agora</button>
      </div>

      <!-- Histórico de chamadas -->
      <div data-tabpanel="chamadas" style="display:none">
        <div class="mob-card" style="padding:6px 16px">
          ${[['23 abr 2026', '13/14', 'ok'], ['21 abr 2026', '11/14', 'warn'], ['16 abr 2026', '14/14', 'ok'], ['14 abr 2026', '10/14', 'bad']].map(([d, p, s]) => `
            <div class="mob-row" style="cursor:pointer">
              <span class="mob-rowico" style="background:var(--fill2)"><i data-lucide="calendar"></i></span>
              <div style="flex:1"><div style="font-weight:700;font-size:14px">${d}</div><div class="wf-cellsub">Sub-9 · Treino</div></div>
              ${badge(`${p} presentes`, s)}
            </div>`).join('')}
        </div>
      </div>

      <!-- Horário -->
      <div data-tabpanel="horario" style="display:none">
        <div class="mob-card">
          <div class="mob-kv"><span>Dias</span><b>Terça e Quinta</b></div>
          <div class="mob-kv"><span>Horário</span><b>18h00 – 19h30</b></div>
          <div class="mob-kv"><span>Local</span><b>Campo 2 · Unidade Centro</b></div>
          <div class="mob-kv"><span>Faixa etária</span><b>8 a 9 anos</b></div>
          <div class="mob-kv"><span>Vagas</span><b>16 total · 14 ocupadas</b></div>
          <div class="mob-kv"><span>Instrutor principal</span><b>João Ferreira</b></div>
        </div>
        ${note('Para alterar horário ou local, contate a administração da escolinha.')}
      </div>
    </div>` };

  /* ---------- CHAMADA ---------- */
  S.chamada = { title: 'Chamada', chrome: 'focus', back: 'home', html: `
    <!-- Seletor de turma e data -->
    <div class="mob-card" style="margin-bottom:16px">
      <div class="mob-kv" style="border-bottom:1.5px dashed var(--line);padding-bottom:12px;margin-bottom:12px">
        <span style="font-weight:700">Turma</span>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-weight:700">Sub-9</span>
          <i data-lucide="chevron-down" style="width:16px;color:var(--ink3)"></i>
        </div>
      </div>
      <div class="mob-kv">
        <span style="font-weight:700">Data</span>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-weight:700">25 abr 2026 · 18h00</span>
          <i data-lucide="calendar" style="width:16px;color:var(--ink3)"></i>
        </div>
      </div>
    </div>

    <!-- Progresso rápido -->
    <div style="display:flex;gap:10px;margin-bottom:14px">
      <div style="flex:1;text-align:center;padding:10px;background:var(--fill2);border-radius:12px;border:2px solid var(--line)">
        <div style="font-size:20px;font-weight:700;color:var(--accent-ink)">9</div>
        <div style="font-size:11px;color:var(--ink2)">Presentes</div>
      </div>
      <div style="flex:1;text-align:center;padding:10px;background:#FDE8E8;border-radius:12px;border:2px solid var(--line)">
        <div style="font-size:20px;font-weight:700;color:#C33">3</div>
        <div style="font-size:11px;color:var(--ink2)">Faltas</div>
      </div>
      <div style="flex:1;text-align:center;padding:10px;background:var(--fill);border-radius:12px;border:2px solid var(--line)">
        <div style="font-size:20px;font-weight:700;color:var(--ink3)">2</div>
        <div style="font-size:11px;color:var(--ink2)">Pendentes</div>
      </div>
    </div>

    <!-- Lista de alunos -->
    <div class="mob-card" style="padding:0 16px;margin-bottom:16px">
      ${chamadaRow('GS', 'Gabriel Silva', 'A-031', 'ok')}
      ${chamadaRow('LO', 'Larissa Oliveira', 'A-032', 'ok')}
      ${chamadaRow('ML', 'Miguel Lima', 'A-033', 'bad')}
      ${chamadaRow('BS', 'Beatriz Santos', 'A-034', 'ok')}
      ${chamadaRow('RA', 'Rafael Alves', 'A-035', 'bad')}
      ${chamadaRow('CF', 'Caio Ferreira', 'A-036', '')}
      ${chamadaRow('JP', 'Julia Pinto', 'A-037', '')}
    </div>

    <button class="mob-cta" data-go="chamada-ok"><i data-lucide="check-circle"></i>Confirmar chamada</button>
    ${note('A chamada fica registrada no histórico da turma e os responsáveis podem ser notificados sobre faltas.')}` };

  /* ---------- CHAMADA CONFIRMADA ---------- */
  S['chamada-ok'] = { title: 'Chamada confirmada', chrome: 'focus', back: 'home', html: `
    <div style="text-align:center;padding:18px 0 14px">
      <span style="width:74px;height:74px;border-radius:50%;background:var(--accent-tint);border:2px solid #A9D9BC;display:inline-grid;place-items:center">
        <i data-lucide="clipboard-check" style="width:36px;height:36px;color:var(--accent-ink)"></i>
      </span>
      <div style="font-weight:700;font-size:21px;margin-top:14px">Chamada registrada!</div>
      <div class="wf-cellsub">Sub-9 · 25 abr 2026 · 18h02</div>
    </div>
    <div class="mob-card" style="margin-bottom:14px">
      <div class="mob-kv"><span>Turma</span><b>Sub-9</b></div>
      <div class="mob-kv"><span>Total de alunos</span><b>14</b></div>
      <div class="mob-kv"><span>Presentes</span><b style="color:var(--accent-ink)">11</b></div>
      <div class="mob-kv"><span>Faltas</span><b style="color:#C33">3</b></div>
      <div class="mob-kv"><span>Taxa de presença</span><b>78,6%</b></div>
    </div>
    <div class="mob-h">Alunos com falta</div>
    <div class="mob-card" style="padding:4px 16px;margin-bottom:16px">
      ${[['ML', 'Miguel Lima'], ['RA', 'Rafael Alves'], ['CF', 'Caio Ferreira']].map(([i, n]) => `
        <div class="mob-row">
          ${av(i, 36)}
          <div style="flex:1;margin-left:4px;font-weight:700;font-size:14px">${n}</div>
          ${badge('Falta', 'bad')}
        </div>`).join('')}
    </div>
    <button class="mob-cta ghost" style="margin-bottom:10px"><i data-lucide="bell"></i>Notificar responsáveis</button>
    <button class="mob-cta" data-go="home"><i data-lucide="layout-dashboard"></i>Voltar ao início</button>` };

  /* ---------- ALUNOS ---------- */
  S.alunos = { title: 'Alunos', chrome: 'app', tab: 'turmas', html: `
    <div class="mob-seg" style="margin-bottom:14px">
      <div class="mob-segbtn on" data-tab="t1" style="font-size:13px">Sub-7</div>
      <div class="mob-segbtn" data-tab="t2" style="font-size:13px">Sub-9</div>
      <div class="mob-segbtn" data-tab="t3" style="font-size:13px">Sub-15</div>
    </div>
    <div style="margin-bottom:14px">
      <div class="wf-input" style="border-radius:12px">
        <i data-lucide="search" style="width:17px;margin-right:8px;color:var(--ink3)"></i>
        <span style="color:var(--ink3)">Buscar aluno…</span>
      </div>
    </div>
    <div class="mob-card" style="padding:4px 16px">
      ${[['GS', 'Gabriel Silva', '9 anos', '87%', 'ok'], ['LO', 'Larissa Oliveira', '8 anos', '92%', 'ok'], ['ML', 'Miguel Lima', '9 anos', '65%', 'warn'], ['BS', 'Beatriz Santos', '8 anos', '100%', 'ok'], ['RA', 'Rafael Alves', '9 anos', '71%', 'warn'], ['CF', 'Caio Ferreira', '9 anos', '58%', 'bad'], ['JP', 'Julia Pinto', '8 anos', '88%', 'ok']].map(([i, n, id, p, s]) => `
        <div class="mob-row" style="cursor:pointer" data-go="aluno">
          ${av(i, 38)}
          <div style="flex:1;margin-left:2px">
            <div style="font-weight:700;font-size:14px">${n}</div>
            <div class="wf-cellsub">${id} · Sub-9</div>
          </div>
          ${badge(`${p} presença`, s)}
          <i data-lucide="chevron-right" style="width:16px;color:var(--ink3);margin-left:4px"></i>
        </div>`).join('')}
    </div>` };

  /* ---------- DETALHE DO ALUNO ---------- */
  S.aluno = { title: 'Gabriel Silva', chrome: 'focus', back: 'alunos', html: `
    <div style="text-align:center;padding:6px 0 18px">
      ${av('GS', 76)}
      <div style="font-weight:700;font-size:20px;margin-top:10px">Gabriel Silva</div>
      <div class="wf-cellsub">9 anos · Sub-9 · FC Estrela</div>
      <div style="margin-top:8px;display:flex;justify-content:center;gap:8px">
        ${badge('Matrícula ativa', 'ok')}
        ${badge('87% presença', 'warn')}
      </div>
    </div>
    <div data-tabgroup>
      <div class="mob-seg">
        <div class="mob-segbtn on" data-tab="dados">Dados</div>
        <div class="mob-segbtn" data-tab="presenca">Presença</div>
        <div class="mob-segbtn" data-tab="contato">Contato</div>
      </div>

      <div data-tabpanel="dados">
        <div class="mob-card">
          <div class="mob-kv"><span>Nome completo</span><b>Gabriel Silva</b></div>
          <div class="mob-kv"><span>Nascimento</span><b>14/03/2017</b></div>
          <div class="mob-kv"><span>Matrícula</span><b>#A-031</b></div>
          <div class="mob-kv"><span>Turma</span><b>Sub-9</b></div>
          <div class="mob-kv"><span>Posição preferida</span><b>Atacante</b></div>
          <div class="mob-kv"><span>Observações médicas</span><b>Nenhuma</b></div>
        </div>
      </div>

      <div data-tabpanel="presenca" style="display:none">
        <div style="display:flex;gap:10px;margin-bottom:14px">
          ${miniStat('calendar-check', '87%', 'Presença', '#EAF9EF', 'var(--accent-ink)')}
          ${miniStat('calendar-x', '3', 'Faltas', '#FDE8E8', '#C33')}
          ${miniStat('calendar', '23', 'Treinos', 'var(--fill2)', 'var(--ink)')}
        </div>
        <div class="mob-card" style="padding:4px 16px">
          ${[['23 abr', 'Presente', 'ok'], ['21 abr', 'Falta', 'bad'], ['16 abr', 'Presente', 'ok'], ['14 abr', 'Presente', 'ok'], ['09 abr', 'Presente', 'ok'], ['07 abr', 'Falta', 'bad'], ['02 abr', 'Presente', 'ok']].map(([d, s, st]) => `
            <div class="mob-row">
              <span class="mob-rowico" style="background:var(--fill2)"><i data-lucide="calendar"></i></span>
              <div style="flex:1"><div style="font-weight:700;font-size:14px">${d} 2026</div><div class="wf-cellsub">Sub-9 · Treino</div></div>
              ${badge(s, st)}
            </div>`).join('')}
        </div>
      </div>

      <div data-tabpanel="contato" style="display:none">
        <div class="mob-h" style="margin-top:0">Responsável</div>
        <div class="mob-card" style="margin-bottom:14px">
          <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
            ${av('PS', 44)}
            <div><div style="font-weight:700;font-size:15px">Pedro Silva</div><div class="wf-cellsub">Pai</div></div>
          </div>
          <div class="mob-kv"><span>Celular</span><b>(11) 98xxx-xx10</b></div>
          <div class="mob-kv"><span>E-mail</span><b>pedro@email.com</b></div>
          <div class="mob-kv"><span>WhatsApp</span><b>Mesmo número</b></div>
        </div>
        <div style="display:flex;gap:10px">
          <button class="mob-cta ghost" style="flex:1;height:46px;font-size:14px"><i data-lucide="phone"></i>Ligar</button>
          <button class="mob-cta" style="flex:1;height:46px;font-size:14px;background:#25D366;border-color:#1DA851"><i data-lucide="message-circle"></i>WhatsApp</button>
        </div>
      </div>
    </div>` };

  /* ---------- CALENDÁRIO ---------- */
  S.calendario = { title: 'Calendário', chrome: 'app', tab: 'home', html: `
    <!-- Mini calendário (semana atual) -->
    <div class="mob-card" style="margin-bottom:18px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <button class="mob-back" style="width:32px;height:32px;border-radius:9px"><i data-lucide="chevron-left"></i></button>
        <div style="font-weight:700;font-size:15px">Abril 2026</div>
        <button class="mob-back" style="width:32px;height:32px;border-radius:9px"><i data-lucide="chevron-right"></i></button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center">
        ${['D','S','T','Q','Q','S','S'].map(d => `<div style="font-size:11px;font-weight:700;color:var(--ink3);padding-bottom:4px">${d}</div>`).join('')}
        ${[...Array(7)].map((_, i) => {
          const day = 20 + i;
          const isToday = day === 25;
          const hasTreino = [22, 24, 25].includes(day);
          return `<div style="padding:7px 0;border-radius:9px;font-size:13px;font-weight:${isToday ? '700' : '400'};
            background:${isToday ? 'var(--ink)' : 'transparent'};color:${isToday ? '#fff' : 'var(--ink)'};position:relative;cursor:pointer">
            ${day}
            ${hasTreino && !isToday ? `<span style="position:absolute;bottom:3px;left:50%;transform:translateX(-50%);width:5px;height:5px;border-radius:50%;background:var(--accent-ink)"></span>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Eventos do dia -->
    <div class="mob-h">Hoje — 25 abr (Quarta)</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
      ${[['18h00', '19h30', 'Treino Sub-9', 'Campo 2', 'goal', '#2A6FDB'], ['20h00', '21h00', 'Treino Sub-15', 'Campo 1', 'goal', 'var(--accent-ink)']].map(([ini, fim, nome, local, ico, cor]) => `
        <div class="mob-card" style="display:flex;gap:12px;align-items:center;cursor:pointer" data-go="turma">
          <div style="width:4px;align-self:stretch;border-radius:4px;background:${cor};flex:none"></div>
          <span style="width:42px;height:42px;border-radius:11px;background:${cor}22;display:grid;place-items:center;flex:none">
            <i data-lucide="${ico}" style="width:20px;height:20px;color:${cor}"></i>
          </span>
          <div style="flex:1">
            <div style="font-weight:700;font-size:15px">${nome}</div>
            <div class="wf-cellsub">${ini}–${fim} · ${local}</div>
          </div>
          <button class="mob-cta" style="width:auto;height:36px;padding:0 12px;font-size:13px" data-go="chamada">
            <i data-lucide="clipboard-check" style="width:15px"></i>Chamada
          </button>
        </div>`).join('')}
    </div>

    <!-- Próximos dias -->
    <div class="mob-h">Esta semana</div>
    <div class="mob-card" style="padding:4px 16px">
      ${[['Qui, 26 abr', 'Treino Sub-7 · 17h', 'goal'], ['Sex, 27 abr', 'Treino Sub-15 · 19h', 'goal'], ['Sáb, 28 abr', 'Jogo amistoso Sub-9 · 10h', 'trophy']].map(([d, e, ico]) => `
        <div class="mob-row">
          <span class="mob-rowico"><i data-lucide="${ico}"></i></span>
          <div style="flex:1"><div style="font-weight:700;font-size:14px">${d}</div><div class="wf-cellsub">${e}</div></div>
          <i data-lucide="chevron-right" style="width:16px;color:var(--ink3)"></i>
        </div>`).join('')}
    </div>` };

  /* ---------- COMUNICADOS ---------- */
  S.comunicados = { title: 'Comunicados', chrome: 'app', tab: 'home', html: `
    <div data-tabgroup>
      <div class="mob-seg" style="margin-bottom:14px">
        <div class="mob-segbtn on" data-tab="recv">Recebidos</div>
        <div class="mob-segbtn" data-tab="send">Enviados</div>
      </div>

      <div data-tabpanel="recv">
        ${[
          { ico: 'megaphone', title: 'Mudança de horário — Sub-9', sub: 'Administração · 24 abr', new: true, go: 'comunicado' },
          { ico: 'calendar', title: 'Amistoso sábado, 28/04', sub: 'Coordenação · 22 abr', new: true, go: 'comunicado' },
          { ico: 'info', title: 'Novos uniformes disponíveis', sub: 'Administração · 18 abr', new: false, go: 'comunicado' },
          { ico: 'alert-circle', title: 'Feriado — sem treino 21/04', sub: 'Coordenação · 15 abr', new: false, go: 'comunicado' },
          { ico: 'file-text', title: 'Relatório de turmas — março', sub: 'Administração · 01 abr', new: false, go: 'comunicado' },
        ].map(({ ico, title, sub, new: isNew, go }) => `
          <div class="mob-card" style="margin-bottom:10px;cursor:pointer;${isNew ? 'border-color:var(--accent-ink)' : ''}" data-go="${go}">
            <div style="display:flex;gap:12px;align-items:flex-start">
              <span class="mob-rowico" style="background:${isNew ? 'var(--accent-tint)' : 'var(--fill2)'}">
                <i data-lucide="${ico}" style="color:${isNew ? 'var(--accent-ink)' : 'var(--ink2)'}"></i>
              </span>
              <div style="flex:1;min-width:0">
                <div style="font-weight:700;font-size:14px;display:flex;gap:6px;align-items:center">
                  ${title}
                  ${isNew ? `<span style="width:8px;height:8px;border-radius:50%;background:var(--accent-ink);flex:none"></span>` : ''}
                </div>
                <div class="wf-cellsub">${sub}</div>
              </div>
              <i data-lucide="chevron-right" style="width:16px;color:var(--ink3);flex:none"></i>
            </div>
          </div>`).join('')}
      </div>

      <div data-tabpanel="send" style="display:none">
        ${[
          { title: 'Relatório de presença — Sub-9', sub: 'Para: Administração · 23 abr', go: 'comunicado' },
          { title: 'Aluno com lesão — Rafael Alves', sub: 'Para: Administração · 10 abr', go: 'comunicado' },
        ].map(({ title, sub, go }) => `
          <div class="mob-card" style="margin-bottom:10px;cursor:pointer" data-go="${go}">
            <div style="display:flex;gap:12px;align-items:flex-start">
              <span class="mob-rowico"><i data-lucide="send"></i></span>
              <div style="flex:1"><div style="font-weight:700;font-size:14px">${title}</div><div class="wf-cellsub">${sub}</div></div>
              <i data-lucide="chevron-right" style="width:16px;color:var(--ink3);flex:none"></i>
            </div>
          </div>`).join('')}
        <button class="mob-cta ghost" style="margin-top:4px"><i data-lucide="plus"></i>Novo comunicado</button>
      </div>
    </div>` };

  /* ---------- COMUNICADO DETALHE ---------- */
  S.comunicado = { title: 'Comunicado', chrome: 'focus', back: 'comunicados', html: `
    <div class="mob-card" style="margin-bottom:16px">
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px">
        <span class="mob-rowico" style="background:var(--accent-tint)"><i data-lucide="megaphone" style="color:var(--accent-ink)"></i></span>
        <div>
          <div class="wf-cellsub">Administração · 24 abr 2026</div>
          ${badge('Novo', 'ok')}
        </div>
      </div>
      <div style="font-size:17px;font-weight:700;margin-bottom:10px">Mudança de horário — Sub-9</div>
      <div style="font-size:14px;color:var(--ink2);line-height:1.65">
        Olá, João! Informamos que o treino da turma Sub-9 da <b>próxima quinta-feira, 29/04</b>, será realizado no Campo 1 (Unidade Norte), devido a uma obra no Campo 2.
        <br><br>
        O horário permanece o mesmo: <b>18h00 – 19h30</b>.
        <br><br>
        Qualquer dúvida, estamos à disposição.
      </div>
    </div>
    <div class="mob-card" style="margin-bottom:16px">
      <div class="mob-kv"><span>De</span><b>Administração FC Estrela</b></div>
      <div class="mob-kv"><span>Para</span><b>João Ferreira (Instrutor)</b></div>
      <div class="mob-kv"><span>Turma</span><b>Sub-9</b></div>
      <div class="mob-kv"><span>Data</span><b>24 abr 2026 · 09h15</b></div>
    </div>
    <button class="mob-cta ghost"><i data-lucide="reply"></i>Responder</button>` };

  /* ---------- PERFIL ---------- */
  S.perfil = { title: 'Perfil', chrome: 'app', tab: 'perfil', html: `
    <div class="mob-card" style="display:flex;gap:14px;align-items:center;margin:4px 0 18px">
      ${av('JF', 56)}
      <div>
        <div style="font-weight:700;font-size:18px">João Ferreira</div>
        <div class="wf-cellsub">joao@fcestrela.com</div>
        <div style="margin-top:6px">${badge('Treinador Auxiliar', 'mut')}</div>
      </div>
    </div>

    <div class="mob-h" style="margin-top:0">Minhas turmas</div>
    <div class="mob-card" style="padding:4px 16px;margin-bottom:18px">
      ${[['Sub-7', 'Seg e Qua · 17h', '12 alunos'], ['Sub-9', 'Ter e Qui · 18h', '14 alunos'], ['Sub-15', 'Sex · 19h', '12 alunos']].map(([n, h, a]) => `
        <div class="mob-row" style="cursor:pointer" data-go="turma">
          <span class="mob-rowico"><i data-lucide="goal"></i></span>
          <div style="flex:1"><div style="font-weight:700;font-size:14px">${n}</div><div class="wf-cellsub">${h}</div></div>
          ${badge(a, 'mut', true)}
        </div>`).join('')}
    </div>

    <div class="mob-h">Conta</div>
    <div class="mob-card" style="padding:4px 16px;margin-bottom:18px">
      ${listRow('user', 'Meus dados', 'Nome e contato', 'meus-dados-inst')}
      ${listRow('lock', 'Alterar senha', null, 'meus-dados-inst')}
      ${listRow('bell', 'Notificações', 'Chamadas e comunicados', 'notif-inst')}
    </div>

    <div class="mob-h">Suporte</div>
    <div class="mob-card" style="padding:4px 16px;margin-bottom:18px">
      ${listRow('life-buoy', 'Central de ajuda', null, 'ajuda-inst')}
      ${listRow('message-circle', 'Falar com a escolinha', null, 'ajuda-inst')}
    </div>

    <button class="mob-cta ghost" data-go="login" style="color:var(--danger);border-color:var(--line)">
      <i data-lucide="log-out"></i>Sair
    </button>` };

  /* ---------- MEUS DADOS ---------- */
  S['meus-dados-inst'] = { title: 'Meus dados', chrome: 'focus', back: 'perfil', html: `
    <div style="display:flex;flex-direction:column;gap:13px">
      <div style="text-align:center;padding:6px 0 14px">
        <div style="position:relative;display:inline-block">
          ${av('JF', 72)}
          <span style="position:absolute;bottom:0;right:0;width:26px;height:26px;border-radius:50%;background:var(--accent);border:2px solid var(--card);display:grid;place-items:center">
            <i data-lucide="camera" style="width:13px;color:#fff"></i>
          </span>
        </div>
      </div>
      ${field('Nome completo', 'João Ferreira')}
      ${field('E-mail', 'joao@fcestrela.com')}
      ${field('Celular / WhatsApp', '(11) 97xxx-xx22')}
      ${field('CREF', '000000-G/SP')}
      <div style="border-top:2px dashed var(--line);padding-top:14px">
        <div class="mob-h" style="margin-top:0">Alterar senha</div>
        ${field('Senha atual', '••••••••')}
        ${field('Nova senha', '••••••••')}
        ${field('Confirmar nova senha', '••••••••')}
      </div>
      <button class="mob-cta" data-go="perfil"><i data-lucide="check"></i>Salvar alterações</button>
    </div>` };

  /* ---------- NOTIFICAÇÕES ---------- */
  S['notif-inst'] = { title: 'Notificações', chrome: 'focus', back: 'perfil', html: `
    <div class="mob-h" style="margin-top:0">Chamada</div>
    <div class="mob-card" style="margin-bottom:14px">
      ${toggleRow('Lembrete antes do treino', '30 min antes do horário', true)}
      ${toggleRow('Chamada não realizada', 'Alerta se não houver chamada', true)}
    </div>
    <div class="mob-h">Comunicados</div>
    <div class="mob-card" style="margin-bottom:14px">
      ${toggleRow('Novos comunicados', 'Da administração e coordenação', true)}
      ${toggleRow('Respostas aos meus envios', null, true)}
    </div>
    <div class="mob-h">Canais</div>
    <div class="mob-card" style="margin-bottom:16px">
      ${toggleRow('Push (notificação no celular)', null, true)}
      ${toggleRow('E-mail', null, false)}
    </div>
    <button class="mob-cta" data-go="perfil"><i data-lucide="check"></i>Salvar preferências</button>` };

  /* ---------- AJUDA ---------- */
  S['ajuda-inst'] = { title: 'Central de ajuda', chrome: 'focus', back: 'perfil', html: `
    <div style="display:flex;flex-direction:column;gap:12px">
      ${[['clipboard-check', 'Como fazer a chamada?', 'Passo a passo para registrar presença'], ['calendar-x', 'Editar uma chamada já feita', 'Corrija registros de datas anteriores'], ['send', 'Enviar comunicado', 'Mande recados para a administração'], ['users', 'Aluno não aparece na turma', 'Matrícula e sincronização'], ['phone', 'Falar com a coordenação', 'Contatos da escolinha']].map(([ico, t, s]) => `
        <div class="mob-card" style="cursor:pointer;display:flex;gap:12px;align-items:center">
          <span class="mob-rowico"><i data-lucide="${ico}"></i></span>
          <div style="flex:1"><div style="font-weight:700;font-size:15px">${t}</div><div class="wf-cellsub">${s}</div></div>
          <i data-lucide="chevron-right" style="width:16px;color:var(--ink3)"></i>
        </div>`).join('')}
      <div style="border-top:2px dashed var(--line);padding-top:14px;text-align:center">
        <div class="wf-cellsub" style="margin-bottom:10px">Precisa de mais ajuda?</div>
        <button class="mob-cta" style="background:#25D366;border-color:#1DA851"><i data-lucide="message-circle"></i>Falar com a escolinha</button>
      </div>
    </div>` };

  window.INST_SCREENS = S;
})();
