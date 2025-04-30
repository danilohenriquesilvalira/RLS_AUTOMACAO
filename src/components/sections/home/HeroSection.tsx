import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import '@/styles/svgAnimation.css';
import AnimatedAutomacaoSvg from '@/components/ui/AnimatedAutomacaoSvg';
import AnimatedLinhasSvg from '@/components/ui/AnimatedLinhasSvg';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [screenSize, setScreenSize] = useState('desktop'); // 'mobile', 'small', 'medium', 'desktop'
  
  // Links sociais corretos da empresa
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      url: 'https://wa.me/351935479757',
      label: 'WhatsApp'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      url: 'https://www.linkedin.com/company/rls-automacao-industrial',
      label: 'LinkedIn'
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      url: 'mailto:danilosilvalira@hotmail.com',
      label: 'Email'
    },
    {
      name: 'Telefone',
      icon: <Phone className="w-4 h-4" />,
      url: 'tel:+351935479757',
      label: 'Telefone'
    }
  ];
  
  useEffect(() => {
    // Função para ajustar o layout baseado no tamanho da tela
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Categorias de tamanho para melhor controle responsivo
      if (width < 480) {
        setScreenSize('mobile');
      } else if (width < 640) {
        setScreenSize('small');
      } else if (width < 1024) {
        setScreenSize('medium');
      } else {
        setScreenSize('desktop');
      }
    };
    
    // Executa no carregamento e em cada resize
    handleResize();
    window.addEventListener('resize', handleResize);
    
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

  // Retorna a classe para o container SVG com base no tamanho da tela
  const getSvgContainerClass = () => {
    // Base classes para todas as telas
    let baseClass = "flex items-center justify-center";
    
    // Classes específicas para cada tamanho de tela
    switch (screenSize) {
      case 'mobile':
        return `${baseClass} w-[100%] max-w-xs mb-4`;
      case 'small':
        return `${baseClass} w-[75%] max-w-sm mb-6`;
      case 'medium':
        return `${baseClass} w-[80%] max-w-md mb-8`;
      default: // desktop
        return `${baseClass} w-[50%] max-w-6x2 mb-30`;
    }
  };

  // Retorna a classe para o container dos botões com base no tamanho da tela
  const getButtonsContainerClass = () => {
    // Base classes para todas as telas
    let baseClass = "flex flex-col items-center mt-0";
    
    // Classes específicas para cada tamanho de tela
    switch (screenSize) {
      case 'mobile':
        return `${baseClass} gap-2 max-w-[250px]`;
      case 'small':
        return `${baseClass} gap-3 max-w-[280px]`;
      case 'medium':
        return `${baseClass} gap-3 max-w-xs`;
      default: // desktop
        return `${baseClass} gap-4 max-w-sm`;
    }
  };

  // Retorna a classe para o container dos ícones sociais
  const getSocialIconsClass = () => {
    // Base classes para todas as telas
    let baseClass = "flex flex-wrap items-center justify-center mt-2";
    
    // Classes específicas para cada tamanho de tela
    switch (screenSize) {
      case 'mobile':
        return `${baseClass} gap-2`;
      case 'small':
        return `${baseClass} gap-2`;
      default: // medium e desktop
        return `${baseClass} gap-3`;
    }
  };

  // Retorna a classe para o tamanho de cada ícone
  const getIconSize = () => {
    return screenSize === 'mobile' ? 'w-7 h-7' : 'w-8 h-8';
  };

  // Ajusta o tamanho da fonte e padding do botão principal
  const getButtonClass = () => {
    let baseClass = "w-full bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all font-medium rounded-lg shadow-lg";
    
    switch (screenSize) {
      case 'mobile':
        return `${baseClass} py-2 px-4 text-xs`;
      case 'small':
        return `${baseClass} py-2.5 px-5 text-sm`;
      case 'medium':
        return `${baseClass} py-3 px-6 text-sm`;
      default: // desktop
        return `${baseClass} py-3.5 px-7 text-base`;
    }
  };

  // Ajusta a escala do background com base no tamanho da tela
  const getBackgroundClass = () => {
    let baseClass = "absolute inset-0 z-0 overflow-hidden";
    
    switch (screenSize) {
      case 'mobile':
      case 'small':
        return `${baseClass} scale-[1.2] origin-center`; // Escala maior para telas menores
      default:
        return baseClass; // Escala normal para telas maiores
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#0b1033]"
      id="hero"
    >
      {/* Background SVG com escala ajustável */}
      <div className={getBackgroundClass()}>
        <div className="w-full h-full">
          <img 
            src="/images/background.svg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Container principal com padding ajustável */}
      <div className={`container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 relative z-10`}>
        {/* Layout centralizado */}
        <div className="flex flex-col items-center justify-center">
          
          {/* SVG Container com tamanho responsivo */}
          <div className="w-full flex justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={getSvgContainerClass()}
            >
              <AnimatedLinhasSvg className="w-full h-auto" />
            </motion.div>
          </div>
          
          {/* Botões e ícones sociais */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={getButtonsContainerClass()}
          >
            {/* Botão Fale Conosco */}
            <Button
              variant="primary" 
              size="lg"
              to="/contato"
              className={getButtonClass()}
            >
              Fale Conosco
            </Button>
            
            {/* Ícones sociais */}
            <div className={getSocialIconsClass()}>
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                  className="relative group"
                >
                  {/* Tooltip simplificado */}
                  <span className={`
                    absolute -top-6 left-1/2 transform -translate-x-1/2 
                    bg-black/80 text-white text-xs py-1 px-2 rounded 
                    whitespace-nowrap opacity-0 group-hover:opacity-100 
                    transition-all duration-200 pointer-events-none z-20
                    ${screenSize === 'mobile' ? 'scale-75' : ''}
                  `}>
                    {social.label}
                  </span>
                  <a 
                    href={social.url}
                    target={social.name !== 'Telefone' && social.name !== 'Email' ? '_blank' : undefined}
                    rel={social.name !== 'Telefone' && social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="block"
                  >
                    <div className={`${getIconSize()} flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 transition-all duration-300 text-white hover:scale-110`}>
                      {social.icon}
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Botão de scroll */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.button 
          onClick={scrollToNextSection}
          className={`flex items-center justify-center rounded-full bg-black/20 hover:bg-green-600/20 transition-colors border border-white/20 backdrop-blur-sm ${screenSize === 'mobile' ? 'w-8 h-8' : 'w-10 h-10'}`}
          aria-label="Rolar para a próxima seção"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
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
            <ChevronDown className={`text-white ${screenSize === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;