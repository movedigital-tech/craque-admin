// AdminLineChart — MRR trend, single lime series + area fill, Catmull-Rom smooth
function AdminLineChart({ data, height }) {
  height = height || 248;
  var SVG_W = 640;
  var pad = { l: 46, r: 16, t: 20, b: 32 };
  var W = SVG_W - pad.l - pad.r;
  var H = height - pad.t - pad.b;
  var vals = data.mrr;
  var maxV = Math.ceil(Math.max.apply(null, vals) / 5) * 5;
  var n = vals.length;

  var px = function(i) { return pad.l + (W * i) / (n - 1); };
  var py = function(v) { return pad.t + H - (H * v) / maxV; };
  var pts = vals.map(function(v, i) { return [px(i), py(v)]; });

  // Catmull-Rom → cubic bezier
  var linePath = 'M ' + pts[0][0] + ' ' + pts[0][1];
  for (var i = 0; i < pts.length - 1; i++) {
    var p0 = pts[i - 1] || pts[i];
    var p1 = pts[i];
    var p2 = pts[i + 1];
    var p3 = pts[i + 2] || p2;
    var c1x = p1[0] + (p2[0] - p0[0]) / 6;
    var c1y = p1[1] + (p2[1] - p0[1]) / 6;
    var c2x = p2[0] - (p3[0] - p1[0]) / 6;
    var c2y = p2[1] - (p3[1] - p1[1]) / 6;
    linePath += ' C ' + c1x + ' ' + c1y + ' ' + c2x + ' ' + c2y + ' ' + p2[0] + ' ' + p2[1];
  }

  var areaPath = linePath +
    ' L ' + pts[n - 1][0] + ' ' + (pad.t + H) +
    ' L ' + pad.l + ' ' + (pad.t + H) + ' Z';

  var yTicks = [0, maxV * 0.25, maxV * 0.5, maxV * 0.75, maxV].map(Math.round);

  return (
    <svg viewBox={'0 0 ' + SVG_W + ' ' + height} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="adminMrrGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8EE44" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#C8EE44" stopOpacity="0" />
        </linearGradient>
      </defs>

      {yTicks.map(function(t, idx) {
        return (
          <g key={idx}>
            <line x1={pad.l} x2={SVG_W - pad.r} y1={py(t)} y2={py(t)}
              stroke="var(--chart-grid)" strokeWidth="1" strokeDasharray="2 5" />
            <text x={pad.l - 8} y={py(t) + 4} textAnchor="end"
              fontFamily="var(--font-ui)" fontSize="11" fill="var(--chart-axis)">
              {t}k
            </text>
          </g>
        );
      })}

      {data.labels.map(function(lb, i) {
        return (
          <text key={lb} x={px(i)} y={height - 6} textAnchor="middle"
            fontFamily="var(--font-ui)" fontSize="11" fill="var(--chart-axis)">{lb}</text>
        );
      })}

      <path d={areaPath} fill="url(#adminMrrGrad)" />
      <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* Last point dot */}
      <circle
        cx={pts[n - 1][0]} cy={pts[n - 1][1]} r="5"
        fill="var(--accent)" stroke="white" strokeWidth="2.5"
      />
    </svg>
  );
}
window.AdminLineChart = AdminLineChart;
