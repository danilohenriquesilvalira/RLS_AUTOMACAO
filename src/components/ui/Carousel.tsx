import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode;
  className?: string;
  autoScroll?: boolean;
  interval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  className = '',
  autoScroll = false,
  interval = 5000
}) => {
  const childrenArray = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? childrenArray.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === childrenArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (autoScroll) {
      autoScrollTimer.current = setInterval(goToNext, interval);
    }
    
    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [autoScroll, interval]);
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full"
          >
            {childrenArray[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegação */}
      <div className="absolute left-0 bottom-4 w-full flex justify-center gap-2">
        {childrenArray.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
        onClick={goToPrevious}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
        onClick={goToNext}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};