import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/admin/AdminLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Escolinhas } from './pages/Escolinhas';
import { EscolinhaCadastro } from './pages/EscolinhaCadastro';
import { Planos } from './pages/Planos';
import { PlanoForm } from './pages/PlanoForm';
import { Assinaturas } from './pages/Assinaturas';
import { Cobrancas } from './pages/Cobrancas';
import { Financeiro } from './pages/Financeiro';
import { Gateway } from './pages/Gateway';
import { Kyc } from './pages/Kyc';
import { Relatorios } from './pages/Relatorios';
import { Usuarios } from './pages/Usuarios';
import { ConvidarUsuario } from './pages/ConvidarUsuario';
import { Configuracoes } from './pages/Configuracoes';
import { EscolinhaLayout } from './components/escolinha/EscolinhaLayout';
import { EscolinhaLogin } from './pages/escolinha/Login';
import { EscolinhaHome } from './pages/escolinha/Home';
import { EscolinhaTurmas } from './pages/escolinha/Turmas';
import { EscolinhaTurmaCadastro } from './pages/escolinha/TurmaCadastro';
import { EscolinhaTurmaDetalhe } from './pages/escolinha/TurmaDetalhe';
import { EscolinhaAlunos } from './pages/escolinha/Alunos';
import { EscolinhaAlunoCadastro } from './pages/escolinha/AlunoCadastro';
import { EscolinhaResponsaveis } from './pages/escolinha/Responsaveis';
import { EscolinhaCobrancas } from './pages/escolinha/Cobrancas';
import { EscolinhaCobrancaNova } from './pages/escolinha/CobrancaNova';
import { EscolinhaFinanceiro } from './pages/escolinha/Financeiro';
import { EscolinhaProfessores } from './pages/escolinha/Professores';
import { EscolinhaMembroNovo } from './pages/escolinha/MembroNovo';
import { EscolinhaRelatorios } from './pages/escolinha/Relatorios';
import { EscolinhaConfig } from './pages/escolinha/Config';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/escolinhas" element={<Escolinhas />} />
          <Route path="/escolinhas/novo" element={<EscolinhaCadastro />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/planos/novo" element={<PlanoForm />} />
          <Route path="/assinaturas" element={<Assinaturas />} />
          <Route path="/cobrancas" element={<Cobrancas />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/gateway" element={<Gateway />} />
          <Route path="/kyc" element={<Kyc />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/convidar" element={<ConvidarUsuario />} />
          <Route path="/config" element={<Configuracoes />} />
        </Route>
        <Route path="/escolinha/login" element={<EscolinhaLogin />} />
        <Route element={<EscolinhaLayout />}>
          <Route path="/escolinha/home" element={<EscolinhaHome />} />
          <Route path="/escolinha/turmas" element={<EscolinhaTurmas />} />
          <Route path="/escolinha/turmas/novo" element={<EscolinhaTurmaCadastro />} />
          <Route path="/escolinha/turmas/sub-9" element={<EscolinhaTurmaDetalhe />} />
          <Route path="/escolinha/alunos" element={<EscolinhaAlunos />} />
          <Route path="/escolinha/alunos/novo" element={<EscolinhaAlunoCadastro />} />
          <Route path="/escolinha/responsaveis" element={<EscolinhaResponsaveis />} />
          <Route path="/escolinha/cobrancas" element={<EscolinhaCobrancas />} />
          <Route path="/escolinha/cobrancas/nova" element={<EscolinhaCobrancaNova />} />
          <Route path="/escolinha/financeiro" element={<EscolinhaFinanceiro />} />
          <Route path="/escolinha/professores" element={<EscolinhaProfessores />} />
          <Route path="/escolinha/professores/novo" element={<EscolinhaMembroNovo />} />
          <Route path="/escolinha/relatorios" element={<EscolinhaRelatorios />} />
          <Route path="/escolinha/config" element={<EscolinhaConfig />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
