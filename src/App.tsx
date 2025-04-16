// src/App.tsx
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Importação de páginas
import HomePage from '@/pages/HomePage';
import SolucoesPage from '@/pages/SolucoesPage';
import SolucaoDetalhe from '@/pages/SolucaoDetalhe';
import IndustriasPage from '@/pages/IndustriasPage';
import IndustriaDetalhe from '@/pages/IndustriaDetalhe';
import SobreNosPage from '@/pages/SobreNosPage';
import ContatoPage from '@/pages/ContatoPage';
import NotFoundPage from '@/pages/NotFoundPage';


// Importação de componentes
import ScrollToTop from '@/components/ui/ScrollToTop';
import SmoothScroll from '@/components/ui/SmoothScroll';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <SmoothScroll>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/solucoes" element={<SolucoesPage />} />
          <Route path="/solucoes/:id" element={<SolucaoDetalhe />} />
          <Route path="/industrias" element={<IndustriasPage />} />
          <Route path="/industrias/:id" element={<IndustriaDetalhe />} />
          <Route path="/sobre" element={<SobreNosPage />} />
          <Route path="/contato" element={<ContatoPage />} />

          
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  );
}

export default App;