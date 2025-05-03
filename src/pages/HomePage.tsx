// src/pages/HomePage.tsx
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/home/HeroSection';
import SolutionsSection from '@/components/sections/home/SolutionsSection';
import IndustriesSection from '@/components/sections/home/IndustriesSection';
// Importar o novo componente de scroll horizontal
import HorizontalScrollSection from '@/components/sections/home/HorizontalScrollSection';

// Gerenciador de animações
import { animateOnScroll } from '@/animations/gsapAnimations';

const HomePage = () => {
  useEffect(() => {
    // Configurar animações de scroll
    animateOnScroll('.animate-on-scroll', {
      start: 'top 80%',
      toggleActions: 'play none none none'
    });
    
    // Atualizar o título da página
    document.title = 'RLS Automação | Soluções em Automação Industrial';
  }, []);

  return (
    <Layout>
      <HeroSection />
      {/* Novo componente de scroll horizontal com os ícones de tecnologia */}
      <HorizontalScrollSection />
      <SolutionsSection />
      <IndustriesSection />
    </Layout>
  );
};

export default HomePage;