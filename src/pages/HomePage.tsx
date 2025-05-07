// src/pages/HomePage.tsx
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/home/HeroSection';
import IntegratedSolutionsSection from '@/components/sections/home/IntegratedSolutionsSection';
import CustomAutomationSection from '@/components/sections/home/CustomAutomationSection';
import ModernSectionDivider from '@/components/ui/ModernSectionDivider';

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
      {/* Hero Section */}
      <div id="hero">
        <HeroSection />
      </div>
      
      {/* Transição sutil do Hero para a seção integrada */}
      <ModernSectionDivider 
        type="minimal"
        fillColor="#e0e0e0"
        nextSectionId="solutions"
      />
      
      {/* Seção integrada que combina Mercados e Áreas de Negócio */}
      <IntegratedSolutionsSection />
      
      {/* Transição para a seção de Automação à Medida */}
      <ModernSectionDivider 
        type="minimal"
        fillColor="#e0e0e0"
        nextSectionId="custom-automation"
      />
      
      {/* Nova seção de Automação à Medida e Serviços/Tecnologias */}
      <CustomAutomationSection />
      
      {/* Transição para Indústrias */}
      <ModernSectionDivider 
        type="minimal"
        fillColor="#e0e0e0"
        nextSectionId="industries"
      />
      
      {/* Outras seções aqui... */}
      
    </Layout>
  );
};

export default HomePage;