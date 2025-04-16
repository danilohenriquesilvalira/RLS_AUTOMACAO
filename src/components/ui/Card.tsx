import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
  animate?: boolean;
  delay?: number;
}

// Definição de tipos para os subcomponentes
interface CardSubComponentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

// Componente principal Card
const Card: React.FC<CardProps> & {
  Header: React.FC<CardSubComponentProps>;
  Body: React.FC<CardSubComponentProps>;
  Footer: React.FC<CardSubComponentProps>;
  Title: React.FC<CardSubComponentProps>;
  Subtitle: React.FC<CardSubComponentProps>;
  Image: React.FC<CardImageProps>;
} = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  as: Component = 'div',
  animate = false,
  delay = 0,
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300';
  const hoverClasses = hoverEffect ? 'hover:shadow-lg hover:-translate-y-1' : '';
  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        delay
      } 
    }
  };

  if (animate) {
    return (
      <motion.div
        className={combinedClasses}
        onClick={onClick}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : undefined}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Component className={combinedClasses} onClick={onClick}>
      {children}
    </Component>
  );
};

// Subcomponentes
Card.Header = ({ children, className = '' }: CardSubComponentProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

Card.Body = ({ children, className = '' }: CardSubComponentProps) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }: CardSubComponentProps) => (
  <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>{children}</div>
);

Card.Title = ({ children, className = '' }: CardSubComponentProps) => (
  <h3 className={`text-xl font-bold text-gray-800 ${className}`}>{children}</h3>
);

Card.Subtitle = ({ children, className = '' }: CardSubComponentProps) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
);

Card.Image = ({ src, alt, className = '' }: CardImageProps) => (
  <div className={`w-full ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

export default Card;