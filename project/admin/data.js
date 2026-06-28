// Mock data — Craque Admin · Frente 1 (plataforma SaaS)
window.ADMIN_DATA = {
  account: { name: 'Rafael Antunes', role: 'Super Admin', initials: 'RA' },

  nav: [
    { key: 'dashboard',   label: 'Dashboard',      icon: 'layout-dashboard' },
    { key: 'escolinhas',  label: 'Escolinhas',      icon: 'building-2'       },
    { key: 'planos',      label: 'Planos SaaS',     icon: 'layers'           },
    { key: 'assinaturas', label: 'Assinaturas',     icon: 'repeat'           },
    { key: 'cobrancas',   label: 'Cobranças SaaS',  icon: 'receipt'          },
    { key: 'financeiro',  label: 'Financeiro',      icon: 'bar-chart-3'      },
    { key: 'gateway',     label: 'Gateway & Split', icon: 'git-merge'        },
    { key: 'kyc',         label: 'Subcontas / KYC', icon: 'shield-check'     },
    { key: 'relatorios',  label: 'Relatórios',      icon: 'file-bar-chart-2' },
  ],

  navFooter: [
    { key: 'usuarios', label: 'Usuários',      icon: 'users'    },
    { key: 'config',   label: 'Configurações', icon: 'settings' },
  ],

  stats: [
    { icon: 'building-2',       label: 'Escolinhas ativas',  value: '38',         trend: '+4 no mês', dir: 'up'              },
    { icon: 'wallet',           label: 'MRR da plataforma',  value: 'R$ 24.900',  trend: '+11%',      dir: 'up', dark: true  },
    { icon: 'arrow-left-right', label: 'Transações no mês',  value: 'R$ 412 mil', trend: '+8%',       dir: 'up'              },
    { icon: 'alert-triangle',   label: 'Inadimplência',      value: '6,2%',       trend: '-1,1pp',    dir: 'down'            },
  ],

  chart: {
    labels: ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar', 'Abr'],
    mrr:    [18.2,  19.1,  19.8,  20.5,  21.0,  21.8,  22.4,  22.9,  23.1,  23.8,  24.2,  24.9],
  },

  escolinhas: [
    { id: 1, name: 'FC Estrela',        city: 'São Paulo · SP',      owner: 'Carlos Nunes',  plan: 'Pro',     status: 'active',    students: 142, mrr: 'R$ 890' },
    { id: 2, name: 'Academia Bola',     city: 'Campinas · SP',       owner: 'Marina Reis',   plan: 'Híbrido', status: 'active',    students: 98,  mrr: 'R$ 640' },
    { id: 3, name: 'Gol de Placa',      city: 'Santos · SP',         owner: 'Diego Alves',   plan: 'Básico',  status: 'late',      students: 54,  mrr: 'R$ 290' },
    { id: 4, name: 'CT Raízes',         city: 'Sorocaba · SP',       owner: 'Bruna Lima',    plan: 'Pro',     status: 'kyc',       students: 0,   mrr: '—'      },
    { id: 5, name: 'Meninos de Ouro',   city: 'Guarulhos · SP',      owner: 'Paulo Souza',   plan: 'Básico',  status: 'suspended', students: 0,   mrr: '—'      },
    { id: 6, name: 'Vila Futebol',      city: 'Osasco · SP',         owner: 'Tânia M.',      plan: 'Híbrido', status: 'active',    students: 120, mrr: 'R$ 720' },
    { id: 7, name: 'Arena Plus',        city: 'Santo André · SP',    owner: 'Roberto C.',    plan: 'Pro',     status: 'active',    students: 165, mrr: 'R$ 890' },
    { id: 8, name: 'Escola Talento',    city: 'Ribeirão Preto · SP', owner: 'Cláudia R.',    plan: 'Básico',  status: 'active',    students: 48,  mrr: 'R$ 79'  },
  ],

  statusMap: {
    active:    { label: 'Ativa',        tone: 'success'   },
    late:      { label: 'Inadimplente', tone: 'danger'    },
    kyc:       { label: 'Pendente KYC', tone: 'info'      },
    suspended: { label: 'Suspensa',     tone: 'neutral'   },
  },

  alerts: [
    { icon: 'shield-alert', color: 'var(--info)',    text: '3 KYC pendentes',             go: 'kyc'        },
    { icon: 'alert-circle', color: 'var(--warning)', text: '2 escolinhas inadimplentes',  go: 'cobrancas'  },
    { icon: 'webhook',      color: 'var(--danger)',  text: '1 webhook com falha',          go: 'financeiro' },
  ],

  plans: [
    { name: 'Pro',     count: 18, pct: 47 },
    { name: 'Básico',  count: 14, pct: 37 },
    { name: 'Híbrido', count: 6,  pct: 16 },
  ],
};
