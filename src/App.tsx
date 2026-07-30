import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Páginas Públicas
import { Home } from './pages/public/Home';
import { Clube } from './pages/public/Clube';
import { Contato } from './pages/public/Contato';

// Painel Admin
import AdminDashboard from './pages/admin/AdminDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050814] text-gray-100 flex flex-col font-sans antialiased selection:bg-garimpo-gold selection:text-black">
        <Routes>
          {/* Rotas Administrativas sem Header/Footer Público */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Rotas Públicas */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <main id="main-content" className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/o-clube" element={<Clube />} />
                    <Route path="/contato" element={<Contato />} />
                    {/* Fallback de rotas antigas/quebradas -> Home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
