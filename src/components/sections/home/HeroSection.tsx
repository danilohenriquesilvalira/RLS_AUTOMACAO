// src/components/sections/home/HeroSection.tsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const yearCountRef = useRef<HTMLSpanElement>(null);
  const yearHighlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Efeito de parallax no scroll
    if (contentRef.current && bgRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      tl.to(contentRef.current, {
        y: 50,
        ease: "none"
      });

      tl.to(bgRef.current, {
        y: -50,
        ease: "none"
      }, 0);

      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
      };
    }
    
    // Animar o contador de anos - com mais destaque
    if (yearCountRef.current) {
      gsap.fromTo(
        yearCountRef.current,
        { 
          textContent: "0",
          color: "rgba(147, 197, 253, 0.7)" // Azul mais claro e transparente
        },
        {
          duration: 2,
          textContent: "30",
          color: "#38bdf8", // Azul mais vibrante no final
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: () => {
            // Efeito de escala suave durante a contagem
            const progress = gsap.getProperty(yearCountRef.current, "textContent") as string;
            const value = parseInt(progress);
            const scale = 1 + (value / 30) * 0.2; // Escala vai de 1 a 1.2
            
            if (yearCountRef.current) {
              yearCountRef.current.style.transform = `scale(${scale})`;
            }
          },
          onComplete: () => {
            // Animar destaque após contagem completa
            if (yearHighlightRef.current) {
              gsap.fromTo(
                yearHighlightRef.current,
                { width: 0, opacity: 0 },
                { 
                  width: "100%", 
                  opacity: 1, 
                  duration: 0.5,
                  ease: "power1.out"
                }
              );
            }
          }
        }
      );
    }
  }, []);

  // Função para rolar para a próxima seção
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#about') || document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      gsap.to(window, {
        duration: 0.3,
        scrollTo: {
          y: nextSection,
          offsetY: 80
        },
        ease: "power1.out"
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
      id="hero"
    >
      {/* Background de imagem em tela cheia com overlay */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {/* Imagem de fundo */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/Automacao.png')` }} 
        />
        
        {/* Overlay gradiente - melhorado sutilmente */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-indigo-900/85 to-blue-900/80" />
        
        {/* Elementos decorativos */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {/* Linhas decorativas similares a circuitos */}
          <div className="absolute top-1/3 right-1/4 w-40 h-1 bg-blue-300/20 transform rotate-45" />
          <div className="absolute bottom-1/4 left-1/3 w-60 h-1 bg-indigo-300/20 transform -rotate-45" />
        </div>
      </div>

      <div ref={contentRef} className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6"
          >
            Automação Industrial Inteligente em Portugal
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block">Soluções avançadas</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-blue-50/80 font-light mt-1 mb-1">
              em
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
              &lt;Automação Industrial/&gt;
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Há mais de <span className="relative">
              <span className="text-3xl font-bold text-sky-400 inline-block origin-center" ref={yearCountRef}>30</span>
              <div className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-sky-400 to-transparent" ref={yearHighlightRef}></div>
            </span> anos entregando excelência em automação industrial, com soluções customizadas que aumentam produtividade, reduzem custos e garantem qualidade.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              variant="primary" 
              size="lg"
              to="/solucoes"
              className="bg-blue-600 hover:bg-blue-500 focus:ring-blue-500 shadow-md transition-all duration-300 flex items-center"
            >
              <ArrowRight size={18} className="mr-2" />
              Conheça nossas soluções
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/contato"
              className="border-2 border-white text-white hover:bg-white/10 shadow-md transition-all duration-300 flex items-center"
            >
              <MessageCircle size={18} className="mr-2" />
              Fale com um especialista
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Seta de scroll para baixo - Com animação suave e contínua */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut"
        }}
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
      >
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 13L12 19L18 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
      
      {/* Sutis reflexos de luz no fundo */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-indigo-400/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;