// src/components/sections/home/HeroSection.tsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const yearCountRef = useRef<HTMLSpanElement>(null);
  const yearHighlightRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({
    backgroundImage: "url('/background.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  });
  
  // Links sociais corretos da empresa
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      url: 'https://wa.me/351935479757',
      hoverColor: 'group-hover:bg-green-500/50',
      label: 'Conversar no WhatsApp'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://www.linkedin.com/company/rls-automacao-industrial',
      hoverColor: 'group-hover:bg-blue-600/50',
      label: 'Conectar no LinkedIn'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: 'mailto:danilosilvalira@hotmail.com',
      hoverColor: 'group-hover:bg-red-500/50',
      label: 'Enviar email'
    },
    {
      name: 'Telefone',
      icon: <Phone className="w-5 h-5" />,
      url: 'tel:+351935479757',
      hoverColor: 'group-hover:bg-purple-500/50',
      label: 'Ligar'
    }
  ];
  
  useEffect(() => {
    // Função para ajustar o background baseado no tamanho da tela
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width <= 768;
      const tablet = width > 768 && width <= 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      if (mobile) {
        // Configurações para dispositivos móveis - USANDO SVG MOBILE
        setBackgroundStyle({
          backgroundImage: "url('/background_mobile.svg')", // Arquivo específico para mobile
          backgroundSize: "cover",
          backgroundPosition: "center top"
        });
      } else if (tablet) {
        // Configurações para tablets
        setBackgroundStyle({
          backgroundImage: "url('/background.svg')",
          backgroundSize: "150% auto", // Reduzido de 180% para 150%
          backgroundPosition: "center center"
        });
      } else {
        // Configurações para desktop
        setBackgroundStyle({
          backgroundImage: "url('/background.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        });
      }
    };
    
    // Executa no carregamento e em cada resize
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Contador de anos - animação simples
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
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={backgroundStyle}
      id="hero"
    >
      {/* Overlay sutil para textura */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-[0.08] mix-blend-overlay"></div>
      
      {/* Container principal */}
      <div className={`container mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16 relative z-10 ${isMobile ? 'max-w-[100%]' : ''}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 xl:gap-16">
          {/* Coluna de texto */}
          <div className="w-full lg:w-5/12 order-2 lg:order-1 text-center lg:text-left mt-4 lg:mt-0">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight"
            >
              <span className="block">Soluções Industrial</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-3 md:mb-6"
            >
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#3ed160]"
                  style={{textShadow: "0 2px 4px rgba(0,0,0,0.3)"}}
              >
                &lt;Automação Industrial/&gt;
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm xs:text-base md:text-lg text-white/90 mb-4 md:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Há mais de <span className="relative inline-flex items-baseline">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 inline-block" ref={yearCountRef}
                      style={{textShadow: "0 1px 2px rgba(0,0,0,0.5)"}}
                >30</span>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500/70" ref={yearHighlightRef}></div>
              </span> anos entregando excelência em automação industrial, com soluções customizadas que aumentam produtividade e garantem qualidade.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-4 items-center lg:items-start"
            >
              <Button
                variant="primary" 
                size="lg"
                to="/contato"
                className="py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all font-medium text-sm sm:text-base rounded-lg shadow-lg w-full max-w-xs"
              >
                Fale Conosco
              </Button>
              
              {/* Ícones sociais - ajustados para melhor alinhamento com o botão */}
              <div className="flex items-center justify-center gap-3 w-full max-w-xs">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                    className="relative group flex-1"
                  >
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                      {social.label}
                    </span>
                    <a 
                      href={social.url}
                      target={social.name !== 'Telefone' && social.name !== 'Email' ? '_blank' : undefined}
                      rel={social.name !== 'Telefone' && social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                      className="block w-full"
                    >
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/10 transition-all duration-300 ${social.hoverColor} text-white hover:scale-110 mx-auto`}>
                        {social.icon}
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Botão de scroll redesenhado e mais elegante */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.button 
          onClick={scrollToNextSection}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/10 hover:bg-green-600/20 transition-colors border border-green-500/50 backdrop-blur-sm"
          aria-label="Rolar para a próxima seção"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: ['0 0 0 rgba(62, 209, 96, 0)', '0 0 10px rgba(62, 209, 96, 0.5)', '0 0 0 rgba(62, 209, 96, 0)'],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="text-green-400 w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;