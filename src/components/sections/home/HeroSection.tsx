// src/components/sections/home/HeroSection.tsx
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';
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
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Detecta dimensões da tela para ajustes responsivos
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    // Inicializa com o tamanho atual da janela
    updateWindowDimensions();
    
    // Adiciona listener para redimensionamento
    window.addEventListener('resize', updateWindowDimensions);
    
    // Limpa listener ao desmontar
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);
  
  // Efeito parallax suave com Framer Motion
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Calcula a posição ideal da imagem com base no tamanho da tela
  const getBgPosition = () => {
    // Para telas pequenas, centraliza mais no conteúdo importante da imagem
    if (windowWidth < 640) {
      return 'center 30%';  // Foco mais alto em telas pequenas
    } else if (windowWidth < 1024) {
      return 'center 40%';  // Ajuste para tablets
    } else {
      return 'center center'; // Centralizado em telas grandes
    }
  };

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
          snap: { textContent: 1 },
          onUpdate: () => {
            // Efeito de escala suave durante a contagem
            const progress = gsap.getProperty(yearCountRef.current, "textContent") as string;
            const value = parseInt(progress);
            const scale = 1 + (value / 30) * 0.2; // Escala vai de 1 a 1.2
            
            if (yearCountRef.current) {
              yearCountRef.current.style.transform = `scale(${scale})`;
            }
          }
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
        "-=0.3" // Começar um pouco antes do fim da animação anterior
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
      className="relative h-screen flex items-center overflow-hidden bg-[#121212]"
      id="hero"
    >
      {/* Background sutilmente texturizado */}
      <div className="absolute inset-0 bg-[#121212] opacity-90">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
      </div>
      
      {/* Novo tratamento para o background da imagem - mais flexível e responsivo */}
      <motion.div 
        ref={bgRef} 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        {/* Imagem de fundo com tratamento responsivo melhorado */}
        <div 
          className="absolute inset-0 bg-no-repeat opacity-30 transition-opacity duration-500"
          style={{ 
            backgroundImage: `url('${import.meta.env.BASE_URL}images/Automacao.png')`,
            backgroundSize: windowWidth < 768 ? 'contain' : 'cover',
            backgroundPosition: getBgPosition(),
            // Tratamento especial de escala para dispositivos maiores
            transform: windowWidth >= 1280 ? 'scale(1.05)' : 'none',
          }}
        />
        
        {/* Overlay gradiente customizado para melhorar a visibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/80 via-[#121212]/60 to-[#121212]/90"></div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={contentRef}
          style={{ y: contentY, opacity }}
          className="max-w-3xl mx-auto lg:mx-0"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm shadow-lg">
              Automação Industrial Inteligente em Portugal
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block">Soluções avançadas</span>
            <span className="block text-3xl md:text-4xl text-white/70 font-light mt-1 mb-3">
              em
            </span>
            <div className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                &lt;Automação Industrial/&gt;
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full"></div>
            </div>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 mb-10 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Há mais de <span className="relative inline-flex items-baseline">
              <span className="text-3xl font-bold text-blue-300 inline-block" ref={yearCountRef}>30</span>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-transparent rounded-full" ref={yearHighlightRef}></div>
            </span> anos entregando excelência em automação industrial, com soluções customizadas que aumentam produtividade e garantem qualidade.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              variant="primary" 
              size="lg"
              to="/solucoes"
              className="shadow-lg transition-all duration-300 group"
            >
              Conheça nossas soluções
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/contato"
              className="border-2 border-white text-white hover:bg-white/10 shadow-lg transition-all duration-300 group"
            >
              Fale com um especialista
              <MessageCircle size={18} className="ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Modern scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.button 
          onClick={scrollToNextSection}
          className="flex flex-col items-center cursor-pointer group"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-white/70 text-sm font-medium mb-2 group-hover:text-white transition-colors">
            Saiba mais
          </span>
          <motion.div 
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg"
            animate={{ y: [0, 5, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="text-white" size={20} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;