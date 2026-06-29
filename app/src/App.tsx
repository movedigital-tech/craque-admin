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
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
