// src/components/sections/home/HeroSection.tsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

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
  }, []);

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
          style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/hero-bg.avif')` }} 
        />
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80" />
        
        {/* Elementos decorativos (engrenagens, circuitos, etc) podem ser adicionados aqui */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {/* Círculos decorativos */}
          <div className="absolute top-1/4 right-10 w-64 h-64 border-4 border-blue-300/20 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 border-4 border-indigo-300/20 rounded-full" />
          
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
            <span className="block">em</span>
            <span className="text-blue-300">
              Automação Industrial
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Há mais de 30 anos entregando excelência em automação industrial, com soluções customizadas que aumentam produtividade, reduzem custos e garantem qualidade.
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
              icon={<ArrowRight size={18} />}
              className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
            >
              Conheça nossas soluções
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/contato"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Fale com um especialista
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;