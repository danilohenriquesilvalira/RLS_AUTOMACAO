// src/components/ui/ModernSectionDivider.tsx
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ModernSectionDividerProps {
  type?: 'wave' | 'curve' | 'angle' | 'minimal';
  fillColor?: string;
  backgroundColor?: string;
  className?: string;
  nextSectionId?: string;
}

/**
 * Componente de divisória moderna e elegante entre seções,
 * com diferentes estilos e animações sutis.
 */
const ModernSectionDivider = ({
  type = 'wave',
  fillColor = 'white',
  backgroundColor = 'transparent',
  className = '',
  nextSectionId
}: ModernSectionDividerProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.2
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // Função para scroll suave até a próxima seção
  const scrollToNextSection = () => {
    if (nextSectionId) {
      const nextSection = document.getElementById(nextSectionId);
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  // Variantes para animações
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    }
  };
  
  const renderDivider = () => {
    switch (type) {
      case 'wave':
        return (
          <div 
            ref={ref}
            className={`w-full relative ${className}`}
            style={{ backgroundColor }}
            onClick={scrollToNextSection}
            role={nextSectionId ? "button" : undefined}
            aria-label={nextSectionId ? "Ir para a próxima seção" : undefined}
            tabIndex={nextSectionId ? 0 : undefined}
          >
            <svg 
              viewBox="0 0 1440 120" 
              preserveAspectRatio="none" 
              className="w-full h-10 md:h-16 lg:h-24 block"
            >
              <motion.path 
                d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,90.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                fill={fillColor}
                initial="hidden"
                animate={controls}
                variants={pathVariants}
              />
              
              {/* Elementos decorativos sutis - pontos animados */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {[300, 600, 900, 1200].map((x, i) => (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy="64"
                    r="4"
                    fill={fillColor}
                    opacity="0.5"
                    animate={{ 
                      y: [0, -5, 0],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  />
                ))}
              </motion.g>
            </svg>
          </div>
        );
      
      case 'curve':
        return (
          <div 
            ref={ref}
            className={`w-full relative ${className}`}
            style={{ backgroundColor }}
            onClick={scrollToNextSection}
            role={nextSectionId ? "button" : undefined}
            aria-label={nextSectionId ? "Ir para a próxima seção" : undefined}
            tabIndex={nextSectionId ? 0 : undefined}
          >
            <svg 
              viewBox="0 0 1440 120" 
              preserveAspectRatio="none" 
              className="w-full h-10 md:h-16 lg:h-24 block"
            >
              <motion.path 
                d="M0,32L120,37.3C240,43,480,53,720,69.3C960,85,1200,107,1320,117.3L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                fill={fillColor}
                initial="hidden"
                animate={controls}
                variants={pathVariants}
              />
              
              {/* Linha fluída animada */}
              <motion.path
                d="M0,60 C240,80 480,50 720,70 C960,90 1200,60 1440,80"
                fill="none"
                stroke={fillColor}
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
          </div>
        );
      
      case 'angle':
        return (
          <div 
            ref={ref}
            className={`w-full relative h-16 md:h-24 overflow-hidden ${className}`}
            onClick={scrollToNextSection}
            role={nextSectionId ? "button" : undefined}
            aria-label={nextSectionId ? "Ir para a próxima seção" : undefined}
            tabIndex={nextSectionId ? 0 : undefined}
            style={{ backgroundColor }}
          >
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{ 
                backgroundColor: fillColor,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 30%)'
              }}
            />
            
            {/* Linhas diagonais decorativas */}
            <div className="absolute inset-0 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-white/20"
                  style={{
                    width: '100%',
                    top: `${20 + i * 15}%`,
                    left: 0,
                    transform: 'rotate(-5deg) translateY(-50%)',
                    transformOrigin: 'left center'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: i * 0.15,
                    ease: "easeOut" 
                  }}
                />
              ))}
            </div>
          </div>
        );
      
      case 'minimal':
      default:
        return (
          <div 
            ref={ref}
            className={`w-full py-4 ${className}`}
            style={{ backgroundColor }}
            onClick={scrollToNextSection}
            role={nextSectionId ? "button" : undefined}
            aria-label={nextSectionId ? "Ir para a próxima seção" : undefined}
            tabIndex={nextSectionId ? 0 : undefined}
          >
            <div className="max-w-7xl mx-auto px-4 relative">
              <motion.div 
                className="h-px w-full"
                style={{ background: `linear-gradient(to right, transparent, ${fillColor}, transparent)` }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={controls}
                variants={{
                  visible: { 
                    scaleX: 1, 
                    opacity: 1,
                    transition: { duration: 0.8 }
                  }
                }}
              />
              
              {/* Indicadores visuais sutis */}
              <div className="flex justify-center">
                <motion.div 
                  className="relative mt-2"
                  initial={{ opacity: 0 }}
                  animate={controls}
                  variants={{
                    visible: { 
                      opacity: 1,
                      transition: { delay: 0.3, duration: 0.5 }
                    }
                  }}
                >
                  <div className="flex space-x-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: fillColor }}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                          repeatType: "mirror"
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return renderDivider();
};

export default ModernSectionDivider;