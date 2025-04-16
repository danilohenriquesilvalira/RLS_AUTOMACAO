import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

interface LoadingProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  fullScreen = false, 
  size = 'md',
  text = 'Carregando...' 
}) => {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center' 
    : 'flex flex-col items-center justify-center py-8';
  
  const sizeConfig = {
    sm: {
      logo: 'w-10 h-10',
      icon: 16,
      text: 'text-sm'
    },
    md: {
      logo: 'w-16 h-16',
      icon: 24,
      text: 'text-base'
    },
    lg: {
      logo: 'w-24 h-24',
      icon: 32,
      text: 'text-lg'
    }
  };

  return (
    <div className={containerClasses}>
      <motion.div 
        className={`relative ${sizeConfig[size].logo} bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg flex items-center justify-center mb-4`}
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, ease: "linear", repeat: Infinity },
          scale: { duration: 1, ease: "easeInOut", repeat: Infinity }
        }}
      >
        <Cpu className="text-white" size={sizeConfig[size].icon} />
        
        <motion.div 
          className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      {text && (
        <p className={`${sizeConfig[size].text} text-gray-600 dark:text-gray-300`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;