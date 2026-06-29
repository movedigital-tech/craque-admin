import type { RecebimentosChart } from '../../data/escolinha/types';

export interface EscolinhaLineChartProps {
  data: RecebimentosChart;
  height?: number;
}

function spline(vs: number[], gx: (i: number) => number, gy: (v: number) => number, n: number) {
  const pts = vs.map((v, i): [number, number] => [gx(i), gy(v)]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const a = pts[i - 1] || pts[i];
    const b = pts[i];
    const c = pts[i + 1];
    const e = pts[i + 2] || c;
    d += ` C ${b[0] + (c[0] - a[0]) / 6} ${b[1] + (c[1] - a[1]) / 6} ${c[0] - (e[0] - b[0]) / 6} ${c[1] - (e[1] - b[1]) / 6} ${c[0]} ${c[1]}`;
  }
  return { d, pts };
}

export function EscolinhaLineChart({ data, height = 240 }: EscolinhaLineChartProps) {
  const W = 640;
  const p = { l: 42, r: 16, t: 18, b: 30 };
  const iw = W - p.l - p.r;
  const ih = height - p.t - p.b;
  const all = [...data.recebido, ...data.previsto];
  const mx = Math.ceil(Math.max(...all) / 5) * 5;
  const n = data.recebido.length;
  const gx = (i: number) => p.l + (iw * i) / (n - 1);
  const gy = (v: number) => p.t + ih - (ih * v) / mx;

  const rec = spline(data.recebido, gx, gy, n);
  const prev = spline(data.previsto, gx, gy, n);
  const area = `${rec.d} L ${rec.pts[n - 1][0]} ${p.t + ih} L ${p.l} ${p.t + ih} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${height}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="ecRecGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8EE44" stopOpacity="0.22" />
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
      <path d={area} fill="url(#ecRecGrad)" />
      <path d={prev.d} fill="none" stroke="var(--gray-300)" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
      <path d={rec.d} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={rec.pts[n - 1][0]} cy={rec.pts[n - 1][1]} r="5" fill="var(--accent)" stroke="white" strokeWidth="2.5" />
    </svg>
  );
}
