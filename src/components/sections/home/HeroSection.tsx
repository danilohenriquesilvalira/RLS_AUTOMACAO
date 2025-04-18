// src/components/sections/home/HeroSection.tsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import IA from '@/components/ui/ia'; // Importando o componente IA

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const yearCountRef = useRef<HTMLSpanElement>(null);
  const yearHighlightRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animar o contador de anos com GSAP
    if (yearCountRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        yearCountRef.current,
        { 
          textContent: "0",
          opacity: 0.7
        },
        {
          duration: 2,
          textContent: "30",
          opacity: 1,
          ease: "power2.out",
          snap: { textContent: 1 }
        }
      );
      
      tl.fromTo(
        yearHighlightRef.current,
        { width: 0, opacity: 0 },
        { 
          width: "100%", 
          opacity: 1, 
          duration: 0.5,
          ease: "power1.out"
        },
        "-=0.3"
      );
    }
  }, []);

  // Função para rolar para a próxima seção
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#about') || document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      gsap.to(window, {
        duration: 0.6,
        scrollTo: {
          y: nextSection,
          offsetY: 80
        },
        ease: "power2.inOut"
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#001845] to-[#001238]"
      id="hero"
    >
      {/* Background com grid sutil */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
      </div>
      
      {/* Layout principal - organização mais responsiva */}
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Coluna esquerda - conteúdo de texto */}
          <div className="w-full lg:w-5/12 order-2 lg:order-1 text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-[#00E1FF]/20 text-[#00E1FF] text-sm font-medium">
                Industria 4.0
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              <span className="block">Solucoes Industrial</span>
            </h1>
            
            <div className="relative mb-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#00E1FF]">
                &lt;Automação Industrial/&gt;
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Há mais de <span className="relative inline-flex items-baseline">
                <span className="text-2xl font-bold text-[#00E1FF] inline-block" ref={yearCountRef}>30</span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00E1FF]/50" ref={yearHighlightRef}></div>
              </span> anos entregando excelência em automação industrial, com soluções customizadas que aumentam produtividade e garantem qualidade.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button
                variant="primary" 
                size="lg"
                to="/contato"
                className="py-3 px-10 bg-[#00E1FF] text-[#001345] hover:bg-[#00C4FF] transition-colors font-medium"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
          
          {/* Coluna direita - SVG da IA AMPLIADO */}
          <div className="w-full lg:w-7/12 order-1 lg:order-2 flex justify-center items-center">
            <div className="w-full max-w-4xl mx-auto">
              {/* Aumentei a div que contém o IA.tsx */}
              <IA className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Botão de scroll para baixo */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-20">
        <motion.button 
          onClick={scrollToNextSection}
          className="flex items-center justify-center w-10 h-10 rounded-full"
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="text-white" size={20} />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;