"use client";

import { useEffect } from 'react';
import styles from './page.module.css';

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function LandingPage() {
  useEffect(() => {
    const els = document.querySelectorAll(`.${styles.reveal}`);
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add(styles.in));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.in);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <nav>
        <div className={cx(styles.wrap, styles.navWrap)}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>C</span>Craque
          </div>
          <div className={styles.navLinks}>
            <a href="#formacao">Como funciona</a>
            <a href="#painel">Painel</a>
            <a href="#preco">Plano</a>
          </div>
          <a href="#preco" className={cx(styles.btn, styles.btnPrimary)}>Criar conta grátis</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <svg className={styles.pitchLines} viewBox="0 0 1180 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="40" y="40" width="1100" height="620" fill="none" stroke="var(--pitch-line)" strokeWidth="1.5" />
          <line x1="590" y1="40" x2="590" y2="660" stroke="var(--pitch-line)" strokeWidth="1.5" />
          <circle cx="590" cy="350" r="90" fill="none" stroke="var(--pitch-line)" strokeWidth="1.5" />
          <rect x="40" y="220" width="140" height="260" fill="none" stroke="var(--pitch-line)" strokeWidth="1.5" />
          <rect x="1000" y="220" width="140" height="260" fill="none" stroke="var(--pitch-line)" strokeWidth="1.5" />
        </svg>
        <div className={styles.wrap}>
          <div className={styles.heroCopy}>
            <span className={cx(styles.eyebrow, styles.heroEyebrow)}>Feito pra quem manda no campo</span>
            <h1>Para de jogar<br />no <span>improviso.</span></h1>
            <p className={styles.heroSub}>
              Turma, presença, matrícula e responsável — organizados num painel só. Sua escolinha para de rodar no
              grupo de WhatsApp e começa a jogar em time.
            </p>
            <div className={styles.heroCtas}>
              <a href="#preco" className={cx(styles.btn, styles.btnPrimary)}>Criar conta grátis →</a>
              <a href="#formacao" className={cx(styles.btn, styles.btnGhost)}>Ver como funciona</a>
            </div>
            <div className={styles.heroNote}>7 dias de teste · sem cartão · cancela quando quiser</div>
          </div>
        </div>
        <div className={styles.scoreboard}>
          <div className={cx(styles.wrap, styles.scoreboardInner)}>
            <div className={styles.scoreCell}>
              <span className={styles.num}>+1.200</span>
              <div className={styles.label}>alunos gerenciados na Craque</div>
            </div>
            <div className={styles.scoreCell}>
              <span className={styles.num}>0</span>
              <div className={styles.label}>planilhas perdidas desde então</div>
            </div>
            <div className={styles.scoreCell}>
              <span className={styles.num}>7</span>
              <div className={styles.label}>dias de teste, sem cartão</div>
            </div>
          </div>
        </div>
      </section>

      <section id="problema">
        <div className={styles.wrap}>
          <div className={cx(styles.sectionHead, styles.reveal)}>
            <span className={styles.eyebrow}>Súmula do jogo</span>
            <h2>Sua gestão hoje parece uma partida perdida no primeiro tempo.</h2>
            <p>Cada uma dessas jogadas você já viu — ou viveu — essa semana.</p>
          </div>
          <div className={cx(styles.matchreport, styles.reveal)}>
            <div className={styles.mrRow}>
              <span className={styles.mrTime}>08&apos;</span>
              <span className={styles.mrOld}>
                Responsável pergunta no zap <strong>&quot;cadê meu filho na lista de hoje?&quot;</strong> e ninguém
                sabe responder na hora.
              </span>
              <span className={styles.mrNew}>
                Presença lançada na hora, <strong>responsável vê no próprio painel.</strong>
              </span>
            </div>
            <div className={styles.mrRow}>
              <span className={styles.mrTime}>34&apos;</span>
              <span className={styles.mrOld}>
                Mensalidade atrasada some no meio de <strong>200 conversas de WhatsApp.</strong>
              </span>
              <span className={styles.mrNew}>
                Cadastro do aluno e do responsável <strong>vinculados, num lugar só.</strong>
              </span>
            </div>
            <div className={styles.mrRow}>
              <span className={styles.mrTime}>61&apos;</span>
              <span className={styles.mrOld}>
                Professor novo entra e <strong>ninguém lembra de avisar</strong> qual turma é dele.
              </span>
              <span className={styles.mrNew}>
                Convite automático por e-mail <strong>já libera o acesso certo.</strong>
              </span>
            </div>
            <div className={styles.mrRow}>
              <span className={styles.mrTime}>90&apos;+3</span>
              <span className={styles.mrOld}>
                No fim do mês, <strong>ninguém sabe quantos alunos ativos</strong> a escolinha realmente tem.
              </span>
              <span className={styles.mrNew}>
                Painel mostra turma, vaga e frequência <strong>em tempo real.</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="formacao">
        <div className={styles.wrap}>
          <div className={cx(styles.sectionHead, styles.reveal)}>
            <span className={styles.eyebrow}>A escalação</span>
            <h2>Quatro posições. Um sistema só.</h2>
            <p>Cada parte da Craque cobre uma função real da sua escolinha — como um time bem escalado, sem buraco no meio-campo.</p>
          </div>
          <div className={cx(styles.pitchBoard, styles.reveal)}>
            <div className={cx(styles.positionRow, styles.pr1)}>
              <div className={styles.posCard} style={{ textAlign: 'center' }}>
                <span className={styles.posTag}>Goleiro</span>
                <h3>Resumo da escolinha</h3>
                <p>Visão geral de alunos, turmas e presença média — a última linha antes de qualquer surpresa.</p>
              </div>
            </div>
            <div className={cx(styles.positionRow, styles.pr4)}>
              <div className={styles.posCard}>
                <span className={styles.posTag}>Defesa</span>
                <h3>Presença e frequência</h3>
                <p>Chamada por turma, falta e atestado registrados na hora do treino.</p>
              </div>
              <div className={styles.posCard}>
                <span className={styles.posTag}>Meio-campo</span>
                <h3>Turmas e agenda</h3>
                <p>Horário, professor e vaga de cada turma, sempre atualizados.</p>
              </div>
              <div className={styles.posCard}>
                <span className={styles.posTag}>Meio-campo</span>
                <h3>Comunicação</h3>
                <p>Convite automático por e-mail pra professor e responsável — sem grupo de zap pra administrar.</p>
              </div>
              <div className={styles.posCard}>
                <span className={styles.posTag}>Ataque</span>
                <h3>Matrícula</h3>
                <p>Pré-matrícula, aluno e responsável cadastrados em um fluxo só, do primeiro contato à vaga fechada.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="painel">
        <div className={styles.wrap}>
          <div className={cx(styles.sectionHead, styles.reveal)}>
            <span className={styles.eyebrow}>Dentro de campo</span>
            <h2>O painel que sua escolinha vai abrir todo dia.</h2>
            <p>Sem curso, sem manual. Se você sabe montar uma escalação, sabe usar a Craque.</p>
          </div>
          <div className={cx(styles.panelMock, styles.reveal)}>
            <div className={styles.panelTopbar}>
              <span /><span /><span />
              <span className={styles.path}>craqueapp.com.br/escolinha/home</span>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.panelNav}>
                <div className={cx(styles.item, styles.active)}>Resumo</div>
                <div className={styles.item}>Turmas</div>
                <div className={styles.item}>Alunos</div>
                <div className={styles.item}>Responsáveis</div>
                <div className={styles.item}>Agenda</div>
                <div className={styles.item}>Professores</div>
              </div>
              <div className={styles.panelMain}>
                <div className={styles.panelStats}>
                  <div className={styles.panelStat}>
                    <div className={styles.num}>58</div>
                    <div className={styles.label}>alunos ativos</div>
                  </div>
                  <div className={styles.panelStat}>
                    <div className={styles.num}>4</div>
                    <div className={styles.label}>turmas ativas</div>
                  </div>
                  <div className={styles.panelStat}>
                    <div className={styles.num}>91%</div>
                    <div className={styles.label}>presença média</div>
                  </div>
                </div>
                <div className={styles.panelListRow}>
                  <span><strong>Sub-11</strong> · Terça e quinta, 18h</span>
                  <span className={styles.tagPill}>6/22 vagas</span>
                </div>
                <div className={styles.panelListRow}>
                  <span><strong>Sub-15</strong> · Segunda, quarta e sexta, 19h</span>
                  <span className={styles.tagPill}>6/20 vagas</span>
                </div>
                <div className={styles.panelListRow}>
                  <span><strong>Sub-7</strong> · Terça e quinta, 17h</span>
                  <span className={styles.tagPill}>4/16 vagas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="preco">
        <div className={styles.wrap}>
          <div
            className={cx(styles.sectionHead, styles.reveal)}
            style={{ margin: '0 auto 64px', textAlign: 'center', maxWidth: 560 }}
          >
            <span className={styles.eyebrow} style={{ justifyContent: 'center' }}>O jogo é simples</span>
            <h2>Um plano. Tudo incluso.</h2>
            <p style={{ marginLeft: 'auto', marginRight: 'auto' }}>Sem letra miúda, sem módulo extra pra empurrar depois.</p>
          </div>
          <div className={cx(styles.priceWrap, styles.reveal)}>
            <div className={styles.priceCard}>
              <span className={styles.eyebrow}>Plano Craque</span>
              <div className={styles.priceBig}>R$ 347<span>/mês</span></div>
              <p style={{ color: 'var(--chalk-dim)', fontSize: 14, margin: 0 }}>por escolinha, alunos e turmas ilimitados</p>
              <ul className={styles.priceList}>
                <li>Turmas, agenda e controle de vagas</li>
                <li>Chamada e frequência por turma</li>
                <li>Cadastro de alunos e responsáveis</li>
                <li>Convite automático por e-mail para equipe e responsáveis</li>
                <li>Painel único de resumo da escolinha</li>
              </ul>
              <a href="/signup" className={cx(styles.btn, styles.btnPrimary)}>Começar 7 dias grátis</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta} style={{ borderBottom: 'none' }}>
        <div className={styles.wrap}>
          <span className={styles.cardBadge}>Cartão vermelho pro caderno</span>
          <h2 className={styles.reveal}>
            Sua escolinha já joga no nível certo dentro de campo.{' '}
            <span style={{ color: 'var(--volt)' }}>A gestão também devia.</span>
          </h2>
          <div className={styles.heroCtas}>
            <a href="/signup" className={cx(styles.btn, styles.btnPrimary)}>Criar conta grátis →</a>
          </div>
        </div>
      </section>

      <footer>
        <div className={cx(styles.wrap, styles.footerWrap)}>
          <div className={styles.logo} style={{ fontSize: 16 }}>
            <span className={styles.logoMark} style={{ width: 24, height: 24, fontSize: 13 }}>C</span>Craque
          </div>
          <div className={styles.footLinks}>
            <a href="/login">Entrar</a>
            <a href="#preco">Plano</a>
            <a href="#formacao">Como funciona</a>
          </div>
          <span className={styles.fine}>© 2026 Craque · um produto Move Digital</span>
        </div>
      </footer>
    </div>
  );
}
