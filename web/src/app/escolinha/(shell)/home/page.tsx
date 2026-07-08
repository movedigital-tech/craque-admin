import { Avatar, Badge, Card, StatCard } from '@/components/ds';
import { homeStats, proximasAulas, turmas } from '@/data/escolinha';

export default function EscolinhaHomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {homeStats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} trend={s.trend} trendDirection={s.dir} variant={s.dark ? 'dark' : 'default'} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 22 }}>
        <Card title="Turmas" subtitle="Visão geral das turmas ativas">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {turmas.map((t, i) => (
              <div
                key={t.nome}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 0',
                  borderBottom: i < turmas.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={t.nome} size={36} />
                  <div>
                    <div style={{ fontWeight: 'var(--fw-semibold)' }}>{t.nome}</div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{t.agenda} · {t.prof}</div>
                  </div>
                </div>
                <Badge tone={t.alunos >= t.vagas ? 'warning' : 'success'}>{t.alunos}/{t.vagas} alunos</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Próximas aulas" padding={24}>
          {proximasAulas.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < proximasAulas.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
              <span style={{ width: 46, height: 46, borderRadius: 10, background: 'var(--accent-tint)', display: 'grid', placeContent: 'center', textAlign: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 'var(--fw-bold)', color: 'var(--success)', lineHeight: 1 }}>{c.d}</span>
                <span style={{ fontSize: 13, fontWeight: 'var(--fw-bold)', lineHeight: 1.3 }}>{c.h}</span>
              </span>
              <div>
                <div style={{ fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body)' }}>{c.t}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
