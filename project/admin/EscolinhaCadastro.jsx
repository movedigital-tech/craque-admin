// AdminEscolinhaCadastro — criar / editar escolinha
function AdminEscolinhaCadastro({ navigate }) {
  const NS = window.CampoFootballSchoolManagementDesignSystem_a7c81e;
  const { Card, Badge, Button, Input } = NS;

  React.useEffect(function() {
    window.lucide && window.lucide.createIcons({ attrs: { 'stroke-width': 1.75 } });
  });

  // Styled native select that matches DS Input visually
  function DSSelect({ label, defaultValue, children }) {
    var [focus, setFocus] = React.useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {label && (
          <label style={{
            fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)',
            color: 'var(--text-primary)', fontFamily: 'var(--font-ui)',
          }}>{label}</label>
        )}
        <div style={{
          position: 'relative',
          boxShadow: focus ? '0 0 0 3px var(--accent-tint)' : 'none',
          borderRadius: 'var(--radius-md)', transition: 'box-shadow 0.14s',
        }}>
          <select
            defaultValue={defaultValue}
            onFocus={function() { setFocus(true); }}
            onBlur={function() { setFocus(false); }}
            style={{
              width: '100%', height: 50, padding: '0 38px 0 16px',
              border: '1px solid ' + (focus ? 'var(--accent)' : 'var(--border-default)'),
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-card)',
              fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-body)',
              color: 'var(--text-primary)', appearance: 'none', cursor: 'pointer',
              outline: 'none', transition: 'border-color 0.14s',
            }}
          >{children}</select>
          <i data-lucide="chevron-down" width="15" height="15" style={{
            position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--gray-500)', pointerEvents: 'none',
          }}></i>
        </div>
      </div>
    );
  }

  var g2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Breadcrumb */}
      <button
        onClick={function() { navigate('escolinhas'); }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          border: 'none', background: 'transparent', cursor: 'pointer',
          fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)',
          fontFamily: 'var(--font-ui)', padding: 0,
        }}
      >
        <i data-lucide="arrow-left" width="15" height="15"></i>
        Escolinhas
        <span style={{ color: 'var(--border-default)', margin: '0 2px' }}>/</span>
        <strong style={{ color: 'var(--text-primary)' }}>Nova escolinha</strong>
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 296px', gap: 20 }}>

        {/* ── Forms ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Dados */}
          <Card title="Dados da escolinha">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={g2}>
                <Input label="Nome da escolinha" placeholder="Ex.: FC Estrela" />
                <Input label="CNPJ / CPF" placeholder="00.000.000/0000-00" />
              </div>
              <div style={g2}>
                <Input label="Cidade" placeholder="São Paulo" leadingIcon="map-pin" />
                <DSSelect label="Estado" defaultValue="SP">
                  {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
                    'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(function(uf) {
                    return <option key={uf} value={uf}>{uf}</option>;
                  })}
                </DSSelect>
              </div>
              {/* Logo upload area */}
              <div>
                <label style={{
                  display: 'block', marginBottom: 8,
                  fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-medium)',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-ui)',
                }}>Logo da escolinha</label>
                <div style={{
                  height: 96, border: '2px dashed var(--border-default)',
                  borderRadius: 'var(--radius-md)', background: 'var(--surface-subtle)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: 6, cursor: 'pointer',
                }}>
                  <i data-lucide="image-plus" width="22" height="22" style={{ color: 'var(--gray-500)' }}></i>
                  <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                    Clique ou arraste para enviar
                  </span>
                  <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>
                    PNG ou JPG · máx. 2 MB
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Responsável */}
          <Card title="Responsável / contato">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={g2}>
                <Input label="Nome do responsável" placeholder="Carlos Nunes" leadingIcon="user" />
                <Input label="E-mail" type="email" placeholder="carlos@fcestrela.com" leadingIcon="mail" />
              </div>
              <div style={g2}>
                <Input label="Telefone / WhatsApp" placeholder="(11) 9xxxx-xxxx" leadingIcon="phone" />
                <DSSelect label="Cargo" defaultValue="owner">
                  <option value="owner">Dono / Gestor</option>
                  <option value="dir">Diretor</option>
                  <option value="coord">Coordenador</option>
                  <option value="fin">Financeiro</option>
                </DSSelect>
              </div>
            </div>
          </Card>

          {/* Plano & cobrança */}
          <Card title="Plano & cobrança">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={g2}>
                <DSSelect label="Plano SaaS" defaultValue="pro">
                  <option value="basico">Básico — R$ 79/mês + 2,9%</option>
                  <option value="pro">Pro — R$ 149/mês + 2,0%</option>
                  <option value="hibrido">Híbrido — R$ 99/mês + 1,5%</option>
                </DSSelect>
                <DSSelect label="Ciclo de cobrança" defaultValue="monthly">
                  <option value="monthly">Mensal</option>
                  <option value="annual">Anual (2 meses grátis)</option>
                </DSSelect>
              </div>
              <div style={g2}>
                <DSSelect label="Status inicial" defaultValue="active">
                  <option value="active">Ativa</option>
                  <option value="trial">Trial (30 dias)</option>
                  <option value="kyc">Aguardar KYC</option>
                </DSSelect>
                <Input label="Início da assinatura" placeholder="01/05/2026" leadingIcon="calendar" />
              </div>
            </div>
          </Card>
        </div>

        {/* ── Right rail ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Info note */}
          <div style={{
            padding: '13px 15px',
            background: 'var(--info-tint)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '3px solid var(--info)',
          }}>
            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
              <i data-lucide="info" width="15" height="15"
                style={{ color: 'var(--info)', flexShrink: 0, marginTop: 1 }}></i>
              <p style={{
                margin: 0, fontSize: 'var(--fs-sm)',
                color: 'var(--text-secondary)', lineHeight: 1.65,
              }}>
                Após salvar, a escolinha recebe um <strong>convite por e-mail</strong> e inicia o fluxo de <strong>KYC / subconta</strong> antes de poder cobrar.
              </p>
            </div>
          </div>

          {/* Resumo */}
          <Card title="Resumo do plano" padding={20}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Plano',             'Pro'],
                ['Mensalidade SaaS',  'R$ 149/mês'],
                ['% por transação',   '2,0%'],
                ['Ciclo',             'Mensal'],
              ].map(function(row, i) {
                return (
                  <div key={row[0]} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '11px 0',
                    borderBottom: i < 3 ? '1px solid var(--border-subtle)' : 'none',
                    fontSize: 'var(--fs-body)',
                  }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{row[0]}</span>
                    <strong>{row[1]}</strong>
                  </div>
                );
              })}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 11, fontSize: 'var(--fs-body)',
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>KYC</span>
                <Badge tone="info">Será solicitado</Badge>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button
              variant="primary" size="md" fullWidth leadingIcon="check"
              onClick={function() { navigate('kyc'); }}
            >
              Salvar e convidar
            </Button>
            <Button
              variant="secondary" size="md" fullWidth
              onClick={function() { navigate('escolinhas'); }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
window.AdminEscolinhaCadastro = AdminEscolinhaCadastro;
