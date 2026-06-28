/* Craque — Aluno/Responsável · Wireframes (lo-fi, mobile). Frente 3. */
(function () {
  const { badge, field, note } = window.WF;
  const av = (i, s = 44) => `<span class="mob-av" style="width:${s}px;height:${s}px;font-size:${Math.round(s / 3)}px">${i}</span>`;
  const st = { paid: ['Pago', 'ok'], late: ['Atrasado', 'bad'], pending: ['A vencer', 'warn'] };

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

  const S = {};

  // ---------- LOGIN ----------
  S.login = { chrome: 'full', html: `
    <div style="display:flex;flex-direction:column;height:100%;padding:8px 8px 18px">
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px">
        <span class="mob-logo"><i data-lucide="trophy"></i></span>
        <div><div style="font-weight:700;font-size:24px;line-height:1">Craque</div>
          <div class="wf-cellsub">Área do responsável</div></div>
        <div style="font-size:20px;font-weight:700;line-height:1.25;max-width:280px;margin-top:14px">Acompanhe e pague as mensalidades em segundos.</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${field('Celular ou e-mail', '(11) 9xxxx-xxxx')}
        ${field('Senha', '••••••••')}
        <button class="mob-cta" data-nav="home"><i data-lucide="log-in"></i>Entrar</button>
        <div style="text-align:center;color:var(--accent-ink);font-weight:700;font-size:14px">Entrar com código por SMS</div>
        ${note('Recebeu um <b>convite da escolinha</b>? Toque no link do WhatsApp para ativar o acesso.')}
      </div>
    </div>` };

  // ---------- MEUS ALUNOS ----------
  const alunoCard = (i, nome, idade, turma, valor, vence, status) => `
    <div class="mob-card" style="margin-bottom:14px;cursor:pointer" data-nav="aluno">
      <div style="display:flex;gap:12px;align-items:center">
        ${av(i, 46)}
        <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:16px">${nome}</div><div class="wf-cellsub">${idade} · ${turma}</div></div>
        ${badge('Ativo', 'ok')}
      </div>
      <div style="border-top:1.5px dashed var(--line);margin-top:13px;padding-top:13px;display:flex;justify-content:space-between;align-items:center">
        <div><div class="wf-cellsub">Próxima cobrança</div><div style="font-weight:700;font-size:15px">${valor} · ${vence}</div></div>
        ${badge(st[status][0], st[status][1])}
      </div>
    </div>`;

  S.home = { title: 'Meus alunos', chrome: 'app', tab: 'home', html: `
    <div class="mob-card dark" style="margin:4px 0 18px">
      <div style="font-size:13px;color:rgba(255,255,255,.6)">Total em aberto</div>
      <div class="mob-amount" style="margin-top:4px">R$ 470,00</div>
      <div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:3px">2 mensalidades · vence 05 mai</div>
      <button class="mob-cta" style="margin-top:15px" data-nav="checkout"><i data-lucide="wallet"></i>Pagar agora</button>
    </div>
    <div class="mob-h">Alunos vinculados</div>
    ${alunoCard('LP', 'Lucas Pereira', '9 anos', 'Sub-9', 'R$ 250,00', 'vence 05 mai', 'late')}
    ${alunoCard('MP', 'Marina Pereira', '7 anos', 'Sub-7', 'R$ 220,00', 'vence 05 mai', 'pending')}` };

  // ---------- DETALHE DO ALUNO ----------
  S.aluno = { title: 'Lucas Pereira', chrome: 'app', tab: 'home', back: 'home', html: `
    <div style="text-align:center;padding:6px 0 16px">
      ${av('LP', 76)}
      <div style="font-weight:700;font-size:20px;margin-top:10px">Lucas Pereira</div>
      <div class="wf-cellsub">9 anos · FC Estrela</div>
      <div style="margin-top:8px;display:flex;justify-content:center">${badge('Matrícula ativa', 'ok')}</div>
    </div>
    <div data-tabgroup>
      <div class="mob-seg">
        <div class="mob-segbtn on" data-tab="dados">Dados</div>
        <div class="mob-segbtn" data-tab="turmas">Turmas</div>
        <div class="mob-segbtn" data-tab="pag">Pagamento</div>
      </div>
      <div data-tabpanel="dados">
        <div class="mob-card">
          <div class="mob-kv"><span>Nome</span><b>Lucas Pereira</b></div>
          <div class="mob-kv"><span>Nascimento</span><b>12/03/2017</b></div>
          <div class="mob-kv"><span>Matrícula</span><b>#A-1042</b></div>
          <div class="mob-kv"><span>Escolinha</span><b>FC Estrela</b></div>
          <div class="mob-kv"><span>Responsável</span><b>Marcos Pereira</b></div>
          <div class="mob-kv"><span>Contato</span><b>(11) 98xxx-xx01</b></div>
        </div>
      </div>
      <div data-tabpanel="turmas" style="display:none">
        <div class="mob-card" style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:700;font-size:16px">Sub-9</div>${badge('8 a 9 anos', 'mut', true)}</div>
          <div class="wf-cellsub" style="margin-top:8px;display:flex;gap:7px;align-items:center"><i data-lucide="calendar" style="width:14px"></i>Quarta · 18h–19h30</div>
          <div class="wf-cellsub" style="margin-top:5px;display:flex;gap:7px;align-items:center"><i data-lucide="map-pin" style="width:14px"></i>Campo 2 · Unidade Centro</div>
          <div class="wf-cellsub" style="margin-top:5px;display:flex;gap:7px;align-items:center"><i data-lucide="graduation-cap" style="width:14px"></i>Prof. Lucas Martins</div>
        </div>
        ${note('Um aluno pode estar em <b>mais de uma turma</b>. Fale com a escolinha para incluir.')}
      </div>
      <div data-tabpanel="pag" style="display:none">
        <div class="mob-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div><div class="wf-cellsub">Mensalidade · abril</div><div class="mob-amount" style="font-size:26px;margin-top:4px">R$ 250,00</div></div>
            ${badge('Atrasado', 'bad')}
          </div>
          <div class="wf-cellsub" style="margin-top:6px">Venceu em 05 abr 2026</div>
          <button class="mob-cta" style="margin-top:14px" data-nav="checkout"><i data-lucide="wallet"></i>Pagar agora</button>
        </div>
        <div style="text-align:center;margin-top:14px"><span style="color:var(--accent-ink);font-weight:700;font-size:14px;cursor:pointer" data-nav="pagamentos">Ver histórico de pagamentos</span></div>
      </div>
    </div>` };

  // ---------- PAGAMENTOS ----------
  const chargeRow = (i, nome, ref, valor, vence) => `
    <div class="mob-card" style="margin-bottom:12px">
      <div style="display:flex;gap:12px;align-items:center">
        ${av(i, 42)}
        <div style="flex:1;min-width:0"><div style="font-weight:700;font-size:15px">${nome}</div><div class="wf-cellsub">${ref} · vence ${vence}</div></div>
        <div style="font-weight:700">${valor}</div>
      </div>
      <button class="mob-cta" style="margin-top:13px;height:46px;font-size:15px" data-nav="checkout">Pagar ${valor}</button>
    </div>`;

  const histRow = (ref, data, valor, metodo) => `
    <div class="mob-row" style="cursor:pointer" data-nav="comprovante">
      <span class="mob-rowico" style="background:var(--accent-tint);border:2px solid #A9D9BC"><i data-lucide="check" style="color:var(--accent-ink)"></i></span>
      <div style="flex:1"><div style="font-weight:700;font-size:15px">${ref}</div><div class="wf-cellsub">${data} · ${metodo}</div></div>
      <div style="text-align:right"><div style="font-weight:700">${valor}</div><div class="wf-cellsub" style="color:var(--accent-ink)">Recibo</div></div>
    </div>`;

  S.pagamentos = { title: 'Pagamentos', chrome: 'app', tab: 'pagamentos', html: `
    <div data-tabgroup>
      <div class="mob-seg">
        <div class="mob-segbtn on" data-tab="open">Em aberto</div>
        <div class="mob-segbtn" data-tab="hist">Histórico</div>
      </div>
      <div data-tabpanel="open">
        <div class="mob-card dark" style="margin-bottom:16px">
          <div style="font-size:13px;color:rgba(255,255,255,.6)">2 mensalidades em aberto</div>
          <div class="mob-amount" style="margin-top:4px">R$ 470,00</div>
          <button class="mob-cta" style="margin-top:14px" data-nav="checkout"><i data-lucide="wallet"></i>Pagar tudo</button>
        </div>
        ${chargeRow('LP', 'Lucas Pereira', 'Mensalidade abr', 'R$ 250,00', '05 mai')}
        ${chargeRow('MP', 'Marina Pereira', 'Mensalidade abr', 'R$ 220,00', '05 mai')}
      </div>
      <div data-tabpanel="hist" style="display:none">
        <div class="mob-card" style="padding:6px 16px">
          ${histRow('Mensalidade · março', '06 mar 2026', 'R$ 250,00', 'Pix')}
          ${histRow('Mensalidade · fevereiro', '05 fev 2026', 'R$ 250,00', 'Cartão')}
          ${histRow('Matrícula', '20 jan 2026', 'R$ 100,00', 'Boleto')}
          ${histRow('Mensalidade · janeiro', '06 jan 2026', 'R$ 250,00', 'Pix')}
        </div>
      </div>
    </div>` };

  // ---------- CHECKOUT (Pix + Cartão + Boleto) ----------
  S.checkout = { title: 'Pagamento', chrome: 'focus', back: 'home', html: `
    <div class="mob-card" style="text-align:center;margin-bottom:16px">
      <div class="wf-cellsub">Mensalidade · abril</div>
      <div class="mob-amount" style="margin-top:6px">R$ 250,00</div>
      <div class="wf-cellsub" style="margin-top:4px">Lucas Pereira · Sub-9 · FC Estrela</div>
    </div>
    <div data-tabgroup>
      <div class="mob-seg" style="gap:3px">
        <div class="mob-segbtn on" data-tab="pix" style="font-size:13px;padding:9px 6px"><i data-lucide="qr-code" style="width:14px;vertical-align:-2px;margin-right:4px"></i>Pix</div>
        <div class="mob-segbtn" data-tab="card" style="font-size:13px;padding:9px 6px"><i data-lucide="credit-card" style="width:14px;vertical-align:-2px;margin-right:4px"></i>Cartão</div>
        <div class="mob-segbtn" data-tab="boleto" style="font-size:13px;padding:9px 6px"><i data-lucide="file-text" style="width:14px;vertical-align:-2px;margin-right:4px"></i>Boleto</div>
      </div>
      <div data-tabpanel="pix">
        <div class="mob-card" style="text-align:center">
          <div class="mob-qr"><i data-lucide="qr-code"></i></div>
          <div class="wf-cellsub" style="margin-top:12px">Aponte a câmera do seu banco ou copie o código</div>
          <button class="mob-cta ghost" style="margin-top:12px;height:46px;font-size:15px"><i data-lucide="copy"></i>Copiar código Pix</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;justify-content:center;margin-top:12px;color:var(--ink2);font-size:13px"><i data-lucide="zap" style="width:15px;color:var(--accent-ink)"></i>Confirmação na hora — baixa automática</div>
      </div>
      <div data-tabpanel="card" style="display:none">
        <div class="mob-card">
          <div style="display:flex;flex-direction:column;gap:13px">
            ${field('Número do cartão', '0000 0000 0000 0000')}
            <div style="display:flex;gap:12px">
              <div style="flex:1">${field('Validade', 'MM/AA')}</div>
              <div style="flex:1">${field('CVV', '123')}</div>
            </div>
            ${field('Nome no cartão', 'Como está no cartão')}
            ${field('Parcelas', '1x de R$ 250,00 sem juros', { select: true, cls: 'sel' })}
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;justify-content:center;margin-top:12px;color:var(--ink2);font-size:13px"><i data-lucide="zap" style="width:15px;color:var(--accent-ink)"></i>Aprovação imediata — baixa automática</div>
      </div>
      <div data-tabpanel="boleto" style="display:none">
        <div class="mob-card" style="text-align:center">
          <div class="mob-qr" style="height:100px"><i data-lucide="file-text"></i></div>
          <div style="font-size:13px;font-weight:700;margin-top:12px">Boleto vence em <span style="color:var(--accent-ink)">3 dias úteis</span></div>
          <div class="wf-cellsub" style="margin-top:4px">Após o pagamento, a confirmação pode levar até 2 dias úteis.</div>
          <button class="mob-cta ghost" style="margin-top:12px;height:46px;font-size:15px"><i data-lucide="copy"></i>Copiar código de barras</button>
          <button class="mob-cta ghost" style="margin-top:10px;height:46px;font-size:15px"><i data-lucide="download"></i>Baixar boleto PDF</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;justify-content:center;margin-top:12px;color:var(--ink3);font-size:12px"><i data-lucide="clock" style="width:14px"></i>Confirmação em até 2 dias úteis após o pagamento</div>
      </div>
    </div>
    <button class="mob-cta" style="margin-top:18px" data-nav="comprovante"><i data-lucide="lock"></i>Confirmar pagamento</button>
    <div style="display:flex;gap:7px;align-items:center;justify-content:center;margin-top:12px;color:var(--ink3);font-size:12px"><i data-lucide="shield-check" style="width:14px"></i>Pagamento seguro · dados protegidos (LGPD)</div>` };

  // ---------- COMPROVANTE ----------
  S.comprovante = { title: 'Comprovante', chrome: 'focus', back: 'pagamentos', html: `
    <div style="text-align:center;padding:18px 0 12px">
      <span style="width:74px;height:74px;border-radius:50%;background:var(--accent-tint);border:2px solid #A9D9BC;display:inline-grid;place-items:center"><i data-lucide="check" style="width:34px;height:34px;color:var(--accent-ink)"></i></span>
      <div style="font-weight:700;font-size:21px;margin-top:14px">Pagamento confirmado</div>
      <div class="wf-cellsub">R$ 250,00 · 24 abr 2026, 14h32</div>
    </div>
    <div class="mob-card">
      <div class="mob-kv"><span>Aluno</span><b>Lucas Pereira</b></div>
      <div class="mob-kv"><span>Referência</span><b>Mensalidade · abril</b></div>
      <div class="mob-kv"><span>Escolinha</span><b>FC Estrela</b></div>
      <div class="mob-kv"><span>Método</span><b>Pix</b></div>
      <div class="mob-kv"><span>ID da transação</span><b>#TX-90412</b></div>
      <div class="mob-kv"><span>Status</span><b style="color:var(--accent-ink)">Pago</b></div>
    </div>
    <button class="mob-cta ghost" style="margin-top:14px"><i data-lucide="download"></i>Baixar comprovante</button>
    <button class="mob-cta" style="margin-top:10px" data-nav="home">Voltar aos alunos</button>` };

  // ---------- PERFIL & SUPORTE ----------
  S.perfil = { title: 'Perfil', chrome: 'app', tab: 'perfil', html: `
    <div class="mob-card" style="display:flex;gap:14px;align-items:center;margin:4px 0 18px">
      ${av('MP', 54)}
      <div><div style="font-weight:700;font-size:18px">Marcos Pereira</div><div class="wf-cellsub">marcos@email.com</div><div class="wf-cellsub">(11) 98xxx-xx01</div></div>
    </div>
    <div class="mob-h">Conta</div>
    <div class="mob-card" style="padding:4px 16px;margin-bottom:18px">
      ${listRow('user', 'Meus dados', 'Nome, contato e senha', 'meus-dados')}
      ${listRow('users', 'Alunos vinculados', '2 alunos', 'alunos-vinculados')}
      ${listRow('credit-card', 'Métodos de pagamento', 'Pix e cartão salvos', 'metodos')}
      ${listRow('bell', 'Notificações', 'Lembretes e recibos', 'notificacoes')}
    </div>
    <div class="mob-h">Suporte</div>
    <div class="mob-card" style="padding:4px 16px;margin-bottom:18px">
      ${listRow('life-buoy', 'Central de ajuda', null, 'ajuda')}
      ${listRow('message-circle', 'Falar no WhatsApp', 'Resposta em até 1 dia útil', 'whatsapp')}
      ${listRow('help-circle', 'Perguntas frequentes', null, 'faq')}
    </div>
    <button class="mob-cta ghost" data-go="login" style="color:var(--danger);border-color:var(--line)"><i data-lucide="log-out"></i>Sair</button>` };

  // ---------- MEUS DADOS ----------
  S['meus-dados'] = { title: 'Meus dados', chrome: 'focus', back: 'perfil', html: `
    <div style="display:flex;flex-direction:column;gap:13px">
      <div style="text-align:center;padding:6px 0 14px">
        <div style="position:relative;display:inline-block">
          ${av('MP', 72)}
          <span style="position:absolute;bottom:0;right:0;width:26px;height:26px;border-radius:50%;background:var(--accent);border:2px solid var(--card);display:grid;place-items:center"><i data-lucide="camera" style="width:13px;color:#fff"></i></span>
        </div>
      </div>
      ${field('Nome completo', 'Marcos Pereira')}
      ${field('E-mail', 'marcos@email.com')}
      ${field('Celular / WhatsApp', '(11) 98xxx-xx01')}
      ${field('CPF', '000.000.000-00')}
      <div style="border-top:2px dashed var(--line);padding-top:14px">
        <div class="mob-h" style="margin-top:0">Alterar senha</div>
        ${field('Senha atual', '••••••••')}
        ${field('Nova senha', '••••••••')}
        ${field('Confirmar nova senha', '••••••••')}
      </div>
      <button class="mob-cta" data-go="perfil"><i data-lucide="check"></i>Salvar alterações</button>
    </div>` };

  // ---------- ALUNOS VINCULADOS ----------
  S['alunos-vinculados'] = { title: 'Alunos vinculados', chrome: 'focus', back: 'perfil', html: `
    <div style="display:flex;flex-direction:column;gap:12px">
      ${[['LP', 'Lucas Pereira', '9 anos', 'Sub-9 · FC Estrela', 'Matrícula ativa', 'ok'], ['MP', 'Marina Pereira', '7 anos', 'Sub-7 · FC Estrela', 'Matrícula ativa', 'ok']].map((a) => `
        <div class="mob-card" data-nav="aluno" style="cursor:pointer">
          <div style="display:flex;gap:12px;align-items:center">
            ${av(a[0], 48)}
            <div style="flex:1"><div style="font-weight:700;font-size:16px">${a[1]}</div><div class="wf-cellsub">${a[2]} · ${a[3]}</div></div>
            ${badge(a[4], a[5])}
          </div>
          <div style="display:flex;gap:8px;margin-top:12px">
            <button class="mob-cta ghost" style="flex:1;height:40px;font-size:13px" data-nav="aluno"><i data-lucide="user"></i>Ver dados</button>
            <button class="mob-cta" style="flex:1;height:40px;font-size:13px" data-nav="checkout"><i data-lucide="wallet"></i>Pagar</button>
          </div>
        </div>`).join('')}
      <div class="mob-card" style="border-style:dashed;text-align:center;padding:22px;cursor:pointer">
        <i data-lucide="user-plus" style="width:28px;height:28px;color:var(--ink3);display:block;margin:0 auto 10px"></i>
        <div style="font-weight:700">Vincular outro aluno</div>
        <div class="wf-cellsub">Use o link de convite da escolinha</div>
      </div>
    </div>` };

  // ---------- MÉTODOS DE PAGAMENTO ----------
  S.metodos = { title: 'Métodos de pagamento', chrome: 'focus', back: 'perfil', html: `
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="mob-h" style="margin-top:0">Cartões salvos</div>
      <div class="mob-card">
        <div style="display:flex;gap:12px;align-items:center">
          <span class="mob-rowico" style="background:var(--fill2)"><i data-lucide="credit-card"></i></span>
          <div style="flex:1"><div style="font-weight:700">Visa terminado em 4242</div><div class="wf-cellsub">Validade 08/2028 · Principal</div></div>
          <i data-lucide="trash-2" style="width:18px;color:var(--danger);cursor:pointer"></i>
        </div>
      </div>
      <div class="mob-card" style="border-style:dashed;display:flex;align-items:center;gap:12px;cursor:pointer">
        <span class="mob-rowico" style="background:var(--fill2)"><i data-lucide="plus"></i></span>
        <div style="font-weight:700">Adicionar cartão</div>
      </div>
      <div class="mob-h">Pix</div>
      <div class="mob-card">
        <div style="display:flex;gap:12px;align-items:center">
          <span class="mob-rowico" style="background:var(--accent-tint)"><i data-lucide="qr-code" style="color:var(--accent-ink)"></i></span>
          <div style="flex:1"><div style="font-weight:700">Pix</div><div class="wf-cellsub">Chave gerada na hora · sem cadastro</div></div>
          ${badge('Disponível', 'ok')}
        </div>
      </div>
      <div class="mob-h">Boleto</div>
      <div class="mob-card">
        <div style="display:flex;gap:12px;align-items:center">
          <span class="mob-rowico"><i data-lucide="file-text"></i></span>
          <div style="flex:1"><div style="font-weight:700">Boleto bancário</div><div class="wf-cellsub">Confirmação em até 2 dias úteis</div></div>
          ${badge('Disponível', 'ok')}
        </div>
      </div>
      ${note('<b>Pix e cartão</b> têm confirmação imediata e baixa automática. O boleto pode levar até 2 dias úteis.')}
    </div>` };

  // ---------- NOTIFICAÇÕES ----------
  S.notificacoes = { title: 'Notificações', chrome: 'focus', back: 'perfil', html: `
    <div style="display:flex;flex-direction:column;gap:0">
      <div class="mob-h" style="margin-top:0">Lembretes de pagamento</div>
      <div class="mob-card" style="margin-bottom:14px">
        ${toggleRow('Mensalidade a vencer', '3 dias antes do vencimento', true)}
        ${toggleRow('Mensalidade vencida', 'No dia seguinte ao vencimento', true)}
        ${toggleRow('Confirmação de pagamento', 'Recibo logo após pagar', true)}
        <div style="display:flex;align-items:center;gap:14px;padding:13px 0">
          <div style="flex:1"><div style="font-weight:700;font-size:14px">Cobrança da escolinha</div><div class="wf-cellsub">Quando uma nova cobrança é criada</div></div>
          <div class="wf-toggle on"></div>
        </div>
      </div>
      <div class="mob-h">Canais</div>
      <div class="mob-card" style="margin-bottom:14px">
        ${toggleRow('WhatsApp', 'Canal principal', true)}
        ${toggleRow('E-mail', 'Recibos e 2ª via', true)}
        <div style="display:flex;align-items:center;gap:14px;padding:13px 0">
          <div style="flex:1"><div style="font-weight:700;font-size:14px">Notificação push</div><div class="wf-cellsub">Alerta direto no celular</div></div>
          <div class="wf-toggle on"></div>
        </div>
      </div>
      <button class="mob-cta" data-go="perfil"><i data-lucide="check"></i>Salvar preferências</button>
    </div>` };

  // ---------- CENTRAL DE AJUDA ----------
  S.ajuda = { title: 'Central de ajuda', chrome: 'focus', back: 'perfil', html: `
    <div style="display:flex;flex-direction:column;gap:14px">
      ${[['wallet', 'Como pagar a mensalidade?', 'Veja as formas de pagamento disponíveis', 'faq'], ['alert-circle', 'Mensalidade em atraso', 'O que acontece e como regularizar', 'faq'], ['user-plus', 'Vincular um novo aluno', 'Usar link de convite da escolinha', 'faq'], ['credit-card', 'Boleto não compensou', 'Prazo e como reemitir', 'faq'], ['receipt', 'Onde encontro o comprovante?', 'Baixar e reenviar recibos', 'faq']].map((c) => `
        <div class="mob-card" style="cursor:pointer;display:flex;gap:12px;align-items:center" data-go="${c[3]}">
          <span class="mob-rowico"><i data-lucide="${c[0]}"></i></span>
          <div style="flex:1"><div style="font-weight:700;font-size:15px">${c[1]}</div><div class="wf-cellsub">${c[2]}</div></div>
          <i data-lucide="chevron-right" style="width:18px;color:var(--ink3)"></i>
        </div>`).join('')}
      <div style="border-top:2px dashed var(--line);padding-top:16px;text-align:center">
        <div class="wf-cellsub" style="margin-bottom:10px">Não encontrou o que precisava?</div>
        <button class="mob-cta" data-go="whatsapp"><i data-lucide="message-circle"></i>Falar com suporte</button>
      </div>
    </div>` };

  // ---------- WHATSAPP SUPORTE ----------
  S.whatsapp = { title: 'Falar no WhatsApp', chrome: 'focus', back: 'perfil', html: `
    <div style="text-align:center;padding:18px 0 16px">
      <span style="width:72px;height:72px;border-radius:50%;background:#D9F5E3;border:2px solid #A9D9BC;display:inline-grid;place-items:center"><i data-lucide="message-circle" style="width:34px;height:34px;color:#1A7A44"></i></span>
      <div style="font-weight:700;font-size:19px;margin-top:14px">Suporte Craque</div>
      <div class="wf-cellsub">Atendimento em até 1 dia útil</div>
      <div style="margin-top:8px;display:flex;justify-content:center">${badge('Disponível · seg–sex 8h–18h', 'ok')}</div>
    </div>
    <div class="mob-card" style="margin-bottom:14px">
      <div class="mob-kv"><span>Horário</span><b>Seg–Sex · 8h às 18h</b></div>
      <div class="mob-kv"><span>Tempo de resposta</span><b>Até 1 dia útil</b></div>
      <div class="mob-kv"><span>Número</span><b>(11) 9xxxx-xxxx</b></div>
    </div>
    <div class="mob-h">Assuntos frequentes</div>
    <div class="mob-card" style="padding:4px 16px;margin-bottom:16px">
      ${['Dúvida sobre pagamento', 'Boleto ou comprovante', 'Atualizar dados do responsável', 'Outro assunto'].map((t) => `
        <div class="mob-row" style="cursor:pointer"><div style="flex:1;font-size:15px">${t}</div><i data-lucide="send" style="width:16px;color:var(--accent-ink)"></i></div>`).join('')}
    </div>
    <button class="mob-cta" style="background:#25D366;border-color:#1DA851"><i data-lucide="message-circle"></i>Abrir no WhatsApp</button>` };

  // ---------- FAQ ----------
  const faqItem = (q, a) => `
    <div class="mob-card" style="margin-bottom:10px">
      <div style="font-weight:700;font-size:15px;display:flex;gap:10px;align-items:flex-start;cursor:pointer">
        <i data-lucide="help-circle" style="width:18px;flex:none;margin-top:1px;color:var(--accent-ink)"></i>
        ${q}
      </div>
      <div style="font-size:14px;color:var(--ink2);margin-top:10px;line-height:1.55">${a}</div>
    </div>`;

  S.faq = { title: 'Perguntas frequentes', chrome: 'focus', back: 'perfil', html: `
    <div style="margin-bottom:14px">
      <div class="wf-input" style="border-radius:12px"><i data-lucide="search" style="width:17px;margin-right:8px;color:var(--ink3)"></i><span style="color:var(--ink3)">Buscar dúvida…</span></div>
    </div>
    ${faqItem('Como pago a mensalidade?', 'Na aba <b>Pagamentos</b>, toque em "Pagar". Você pode pagar via Pix (confirmação imediata), cartão de crédito ou boleto bancário (prazo de até 2 dias úteis).')}
    ${faqItem('O Pix foi pago mas ainda aparece como pendente — o que faço?', 'A confirmação é automática por webhook. Se após 30 minutos ainda aparecer pendente, envie o comprovante do seu banco pelo WhatsApp. Vamos resolver em até 1 hora útil.')}
    ${faqItem('Como reemitir ou copiar o código de um boleto?', 'Em <b>Pagamentos → Histórico</b>, toque na cobrança e selecione "Reemitir boleto". O boleto vence em 3 dias úteis a partir da emissão.')}
    ${faqItem('Onde encontro o comprovante de pagamento?', 'Em <b>Pagamentos → Histórico</b>, toque em qualquer item pago e selecione "Baixar comprovante". Também enviamos o recibo por e-mail e WhatsApp automaticamente.')}
    ${faqItem('Posso ter mais de um aluno vinculado?', 'Sim. Cada aluno tem seu próprio link de convite. Peça à escolinha para enviar o convite do segundo aluno e vincule em <b>Perfil → Alunos vinculados</b>.')}
    ${faqItem('Como altero meu celular ou e-mail de acesso?', 'Acesse <b>Perfil → Meus dados</b> e edite o campo desejado. A alteração de e-mail exige confirmação por código.')}
    ${faqItem('O que acontece se eu não pagar a mensalidade em dia?', 'Após o vencimento incidem multa de 2% e juros de 1% ao mês, conforme política da escolinha. A matrícula pode ser suspensa após 30 dias de atraso.')}
    ${faqItem('Como cancelo a matrícula do aluno?', 'O cancelamento é feito diretamente com a escolinha. Fale pelo WhatsApp de suporte ou presencialmente. Mensalidades já geradas permanecem devidas.')}
    <div style="text-align:center;margin-top:8px">
      <button class="mob-cta ghost" data-go="whatsapp" style="display:inline-flex"><i data-lucide="message-circle"></i>Não encontrei minha dúvida</button>
    </div>` };

  window.RESP_SCREENS = S;
})();
