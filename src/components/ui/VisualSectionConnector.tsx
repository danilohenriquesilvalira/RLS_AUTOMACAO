// src/components/ui/VisualSectionConnector.tsx
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface VisualSectionConnectorProps {
  className?: string;
  backgroundColor?: string;
  nextSectionId?: string;
}

/**
 * Um componente de divisória minimalista entre seções,
 * usando apenas tons sutis de cinza.
 */
const VisualSectionConnector = ({
  className = '',
  backgroundColor = 'white',
  nextSectionId
}: VisualSectionConnectorProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 0.4,
      transition: { 
        duration: 0.8
      }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className={`py-8 ${className}`}
      style={{ backgroundColor }}
      initial="hidden"
      animate={controls}
      onClick={scrollToNextSection}
      role={nextSectionId ? "button" : undefined}
      aria-label={nextSectionId ? "Ir para a próxima seção" : undefined}
      tabIndex={nextSectionId ? 0 : undefined}
    >
      <div className="max-w-screen-lg mx-auto px-4">
        {/* Única linha horizontal em tom de cinza sutil */}
        <div className="flex items-center justify-center">
          <motion.div
            className="h-px w-full max-w-sm"
            style={{ background: 'linear-gradient(to right, transparent, rgba(200, 200, 200, 0.5), transparent)' }}
            variants={lineVariants}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default VisualSectionConnector;