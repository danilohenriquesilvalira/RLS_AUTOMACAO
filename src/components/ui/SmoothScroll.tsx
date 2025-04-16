import React, { useEffect, useRef } from 'react';
import { registerSmoothScrolling } from '@/animations/smoothScroll';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Registra o comportamento de smooth scrolling e guarda a função de limpeza
    const cleanup = registerSmoothScrolling();
    
    // Adiciona classe CSS para comportamento de scroll suave nativo (fallback)
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Limpa event listeners e restaura comportamento padrão
      cleanup();
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div ref={containerRef} className="smooth-scroll">
      {children}
    </div>
  );
};

export default SmoothScroll;