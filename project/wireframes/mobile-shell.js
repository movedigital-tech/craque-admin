/* Generic mobile (phone) shell + router for the Responsável front. Reads window.WF_CONFIG. */
(function () {
  const C = window.WF_CONFIG;
  const SCREENS = C.screens;
  const app = document.getElementById('app');
  const state = { screen: C.defaultScreen, loggedIn: false };

  const statusbar = () => `
    <div class="mob-status"><span>9:41</span>
      <span class="r"><i data-lucide="signal"></i><i data-lucide="wifi"></i><i data-lucide="battery-full"></i></span>
    </div>`;

  function header(meta) {
    const left = meta.back
      ? `<button class="mob-back" data-go="${meta.back}"><i data-lucide="arrow-left"></i></button>`
      : `<span style="width:38px"></span>`;
    const right = (meta.chrome === 'app' && !meta.back)
      ? `<button class="mob-back" style="border-radius:50%"><i data-lucide="bell"></i></button>`
      : `<span style="width:38px"></span>`;
    return `<div class="mob-header">${left}<div class="t">${meta.title || ''}</div>${right}</div>`;
  }

  function tabbar(active) {
    return `<div class="mob-tabbar">${C.tabs.map((t) => `
      <button class="mob-tab ${t.k === active ? 'on' : ''}" data-nav="${t.k}">
        <i data-lucide="${t.icon}"></i>${t.label}
      </button>`).join('')}</div>`;
  }

  function draw() {
    const meta = !state.loggedIn ? SCREENS.login : (SCREENS[state.screen] || SCREENS[C.defaultScreen]);
    app.innerHTML = `
      <div class="mob-stage">
        <div class="mob-phone">
          <div class="mob-notch"></div>
          ${statusbar()}
          ${meta.chrome === 'full' ? '' : header(meta)}
          <div class="mob-body">${meta.html}</div>
          ${meta.chrome === 'app' ? tabbar(meta.tab) : ''}
        </div>
      </div>`;
    bind();
    if (window.lucide) lucide.createIcons({ attrs: { 'stroke-width': 1.6 } });
    const b = app.querySelector('.mob-body'); if (b) b.scrollTop = 0;
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
