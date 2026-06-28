/* Generic lo-fi wireframe shell + router. Reads window.WF_CONFIG:
   { brand, brandSub, logoIcon, accountInitials, accountName, searchPlaceholder,
     nav:[{group,items:[{k,label,icon}]}], footer:[{k,label,icon}], screens, defaultScreen } */
(function () {
  const C = window.WF_CONFIG;
  const SCREENS = C.screens;
  const app = document.getElementById('app');
  const state = { screen: C.defaultScreen, loggedIn: false };

  function sidebar() {
    const groups = C.nav.map((g) => `
      <div class="wf-navgroup">
        <div class="wf-navlabel">${g.group}</div>
        ${g.items.map((it) => `
          <button class="wf-navitem ${state.screen === it.k ? 'active' : ''}" data-nav="${it.k}">
            <i data-lucide="${it.icon}"></i>${it.label}
          </button>`).join('')}
      </div>`).join('');
    const footer = (C.footer || []).map((it) => `
      <button class="wf-navitem ${state.screen === it.k ? 'active' : ''}" data-nav="${it.k}"><i data-lucide="${it.icon}"></i>${it.label}</button>`).join('');
    return `
      <aside class="wf-side">
        <div class="wf-brand">
          <span class="wf-logo"><i data-lucide="${C.logoIcon || 'trophy'}"></i></span>
          <div>
            <div class="wf-brand-name">${C.brand}</div>
            <div class="wf-brand-sub">${C.brandSub}</div>
          </div>
        </div>
        ${groups}
        <div class="wf-navfoot">
          ${footer}
          <button class="wf-navitem" data-go="login"><i data-lucide="log-out"></i>Sair</button>
        </div>
      </aside>`;
  }

  function topbar(meta) {
    return `
      <div class="wf-topbar">
        <div>
          <h1 class="wf-title">${meta.title}</h1>
          ${meta.subtitle ? `<p class="wf-subtitle">${meta.subtitle}</p>` : ''}
        </div>
        <div class="wf-topright">
          <div class="wf-search"><i data-lucide="search"></i>${C.searchPlaceholder || 'Buscar…'}</div>
          <button class="wf-iconbtn"><i data-lucide="bell"></i><span class="wf-dot"></span></button>
          <div class="wf-account"><span class="wf-av">${C.accountInitials}</span>${C.accountName ? `<span style="font-size:14px;font-weight:700">${C.accountName}</span>` : ''}<i data-lucide="chevron-down" style="width:16px;height:16px;color:var(--ink3)"></i></div>
        </div>
      </div>`;
  }

  function draw() {
    if (!state.loggedIn) {
      app.innerHTML = SCREENS.login.html;
    } else {
      const meta = SCREENS[state.screen] || SCREENS[C.defaultScreen];
      app.innerHTML = `
        <div class="wf-shell">
          ${sidebar()}
          <main class="wf-main">
            ${topbar(meta)}
            ${meta.html}
          </main>
        </div>`;
    }
    bind();
    if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 1.6 } });
    const m = app.querySelector('.wf-main'); if (m) m.scrollTop = 0;
  }

  function bind() {
    app.querySelectorAll('[data-nav]').forEach((el) => el.addEventListener('click', () => {
      state.screen = el.getAttribute('data-nav'); state.loggedIn = true; draw();
    }));
    app.querySelectorAll('[data-go]').forEach((el) => el.addEventListener('click', () => {
      const g = el.getAttribute('data-go');
      if (g === 'login') { state.loggedIn = false; } else { state.screen = g; state.loggedIn = true; }
      draw();
    }));
    // generic tab switcher: a [data-tabgroup] holds [data-tab] buttons and [data-tabpanel] panels
    app.querySelectorAll('[data-tabgroup]').forEach((group) => {
      const panels = group.querySelectorAll('[data-tabpanel]');
      group.querySelectorAll('[data-tab]').forEach((tab) => tab.addEventListener('click', () => {
        const id = tab.getAttribute('data-tab');
        group.querySelectorAll('[data-tab]').forEach((t) => t.classList.toggle('on', t === tab));
        panels.forEach((p) => { p.style.display = p.getAttribute('data-tabpanel') === id ? '' : 'none'; });
        if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 1.6 } });
      }));
    });
  }

  draw();
})();
