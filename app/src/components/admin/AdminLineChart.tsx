import type { MrrChart } from '../../data/types';

export interface AdminLineChartProps {
  data: MrrChart;
  height?: number;
}

export function AdminLineChart({ data, height = 248 }: AdminLineChartProps) {
  const W = 640;
  const p = { l: 46, r: 16, t: 20, b: 32 };
  const iw = W - p.l - p.r;
  const ih = height - p.t - p.b;
  const vs = data.mrr;
  const mx = Math.ceil(Math.max(...vs) / 5) * 5;
  const n = vs.length;
  const gx = (i: number) => p.l + (iw * i) / (n - 1);
  const gy = (v: number) => p.t + ih - (ih * v) / mx;
  const pts = vs.map((v, i): [number, number] => [gx(i), gy(v)]);

  let ln = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i - 1] || pts[i];
    const b = pts[i];
    const c = pts[i + 1];
    const d = pts[i + 2] || c;
    ln += ` C ${b[0] + (c[0] - a[0]) / 6} ${b[1] + (c[1] - a[1]) / 6} ${c[0] - (d[0] - b[0]) / 6} ${c[1] - (d[1] - b[1]) / 6} ${c[0]} ${c[1]}`;
  }
  const ar = `${ln} L ${pts[n - 1][0]} ${p.t + ih} L ${p.l} ${p.t + ih} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${height}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8EE44" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#C8EE44" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
        const t = Math.round(mx * f);
        return (
          <g key={i}>
            <line x1={p.l} x2={W - p.r} y1={gy(t)} y2={gy(t)} stroke="var(--chart-grid)" strokeWidth="1" strokeDasharray="2 5" />
            <text x={p.l - 8} y={gy(t) + 4} textAnchor="end" fontFamily="var(--font-ui)" fontSize="11" fill="var(--chart-axis)">
              {t}k
            </text>
          </g>
        );
      })}
      {data.labels.map((lb, i) => (
        <text key={lb} x={gx(i)} y={height - 6} textAnchor="middle" fontFamily="var(--font-ui)" fontSize="11" fill="var(--chart-axis)">
          {lb}
        </text>
      ))}
      <path d={ar} fill="url(#mrrGrad)" />
      <path d={ln} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={pts[n - 1][0]} cy={pts[n - 1][1]} r="5" fill="var(--accent)" stroke="white" strokeWidth="2.5" />
    </svg>
  );
}
