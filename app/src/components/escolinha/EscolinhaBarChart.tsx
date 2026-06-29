import type { BarChartData } from '../../data/escolinha/types';

export interface EscolinhaBarChartProps {
  data: BarChartData;
  height?: number;
}

export function EscolinhaBarChart({ data, height = 240 }: EscolinhaBarChartProps) {
  const W = 640;
  const p = { l: 42, r: 16, t: 18, b: 30 };
  const iw = W - p.l - p.r;
  const ih = height - p.t - p.b;
  const mx = Math.ceil(Math.max(...data.vals) / 5) * 5;
  const n = data.vals.length;
  const bw = (iw / n) * 0.55;
  const gap = iw / n;

  return (
    <svg viewBox={`0 0 ${W} ${height}`} width="100%" style={{ display: 'block' }}>
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
        const t = Math.round(mx * f);
        const y = p.t + ih - ih * f;
        return (
          <g key={i}>
            <line x1={p.l} x2={W - p.r} y1={y} y2={y} stroke="var(--chart-grid)" strokeWidth="1" strokeDasharray="2 5" />
            <text x={p.l - 8} y={y + 4} textAnchor="end" fontFamily="var(--font-ui)" fontSize="11" fill="var(--chart-axis)">
              {t}k
            </text>
          </g>
        );
      })}
      {data.vals.map((v, i) => {
        const h = (ih * v) / mx;
        const x = p.l + gap * i + (gap - bw) / 2;
        const y = p.t + ih - h;
        const last = i === n - 1;
        return <rect key={i} x={x} y={y} width={bw} height={h} rx="4" fill={last ? 'var(--accent)' : 'var(--surface-muted)'} />;
      })}
      {data.labels.map((lb, i) => (
        <text key={lb} x={p.l + gap * i + gap / 2} y={height - 6} textAnchor="middle" fontFamily="var(--font-ui)" fontSize="11" fill="var(--chart-axis)">
          {lb}
        </text>
      ))}
    </svg>
  );
}
