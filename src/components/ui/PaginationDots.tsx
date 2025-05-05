// src/components/ui/PaginationDots.tsx
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface PaginationDotsProps {
  total: number;
  active: number;
  onChange?: (index: number) => void;
  className?: string;
  color?: string;
}

/**
 * Componente de paginação com pontos em tom de cinza,
 * similar ao que foi mostrado na segunda imagem.
 */
const PaginationDots = ({
  total = 5,
  active = 0,
  onChange,
  className = '',
  color = '#e0e0e0' // Cinza claro como padrão
}: PaginationDotsProps) => {
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

  // Variantes para animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0.6, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`flex justify-center items-center space-x-2 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          variants={dotVariants}
          className="focus:outline-none"
          onClick={() => onChange && onChange(index)}
          aria-label={`Ir para item ${index + 1} de ${total}`}
        >
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              active === index ? 'w-2.5 h-2.5' : 'opacity-50'
            }`}
            style={{
              backgroundColor: active === index ? color : '#d0d0d0'
            }}
          />
        </motion.button>
      ))}
    </motion.div>
  );
};

export default PaginationDots;