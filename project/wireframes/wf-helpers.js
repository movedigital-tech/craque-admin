/* Shared lo-fi wireframe helpers — window.WF */
window.WF = (function () {
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

  return { stat, av, badge, field, sel, table, cellMain, note, lineChart, barChart };
})();
