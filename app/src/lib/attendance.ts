export function presencaPercent(present: number, total: number): { pct: string; ok: boolean } {
  if (total === 0) return { pct: '—', ok: true };
  const value = Math.round((present / total) * 100);
  return { pct: `${value}%`, ok: value >= 75 };
}
