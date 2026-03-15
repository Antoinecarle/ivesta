import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isAuthenticated } from './lib/auth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Families from './pages/Families';
import Funds from './pages/Funds';
import Prospects from './pages/Prospects';
import Compliance from './pages/Compliance';
import Reporting from './pages/Reporting';
import FundNews from './pages/FundNews';
import ClientDetail from './pages/ClientDetail';
import Markets from './pages/Markets';
import AIAssistant from './pages/AIAssistant';
import ClientPortal from './pages/ClientPortal';
import FinancialEngine from './pages/FinancialEngine';
import RiskSimulation from './pages/RiskSimulation';
import ComplianceEngine from './pages/ComplianceEngine';
import Devis from './pages/Devis';
import LandingPage from './pages/LandingPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30000 } },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/devis" element={<Devis />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/families" element={<Families />} />
                    <Route path="/funds" element={<Funds />} />
                    <Route path="/reporting" element={<Reporting />} />
                    <Route path="/prospects" element={<Prospects />} />
                    <Route path="/compliance" element={<Compliance />} />
                    <Route path="/fund-news" element={<FundNews />} />
                    <Route path="/client-detail" element={<ClientDetail />} />
                    <Route path="/markets" element={<Markets />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                    <Route path="/client-portal" element={<ClientPortal />} />
                    <Route path="/financial-engine" element={<FinancialEngine />} />
                    <Route path="/risk-simulation" element={<RiskSimulation />} />
                    <Route path="/compliance-engine" element={<ComplianceEngine />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
