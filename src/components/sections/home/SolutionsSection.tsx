// src/components/sections/home/SolutionsSection.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import solutionsDetailsData from '@/data/solutionsDetailsData';

const SolutionsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate carousel on mobile
  useEffect(() => {
    if (!isMobile || isDragging) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutionsDetailsData.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [isMobile, isDragging]);

  // Scroll carousel to active index
  useEffect(() => {
    if (isMobile && carouselRef.current) {
      const scrollAmount = activeIndex * (carouselRef.current.offsetWidth / 1.2);
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isMobile]);

  // Handle drag events for mobile carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (carouselRef.current) {
      // Find which card is most visible in viewport
      const cardWidth = carouselRef.current.offsetWidth / 1.2;
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), solutionsDetailsData.length - 1));
    }
  };

  const navigateCarousel = (direction: 'prev' | 'next') => {
    setActiveIndex(prev => {
      if (direction === 'prev') {
        return prev === 0 ? solutionsDetailsData.length - 1 : prev - 1;
      } else {
        return (prev + 1) % solutionsDetailsData.length;
      }
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className="py-20 bg-white overflow-hidden" id="solutions">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row justify-between items-center"
        >
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-blue-500 text-sm uppercase tracking-wider font-medium mb-3"
            >
              O QUE FAZEMOS
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-800"
            >
              Nossas Soluções
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to="/solucoes"
              className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors mt-4 md:mt-0 group"
            >
              <span>Conhecer todas as soluções</span> 
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                className="ml-2"
              >
                <ArrowRight size={18} />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Carousel Navigation */}
        {isMobile && (
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigateCarousel('prev')}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              aria-label="Solução anterior"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {solutionsDetailsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index ? 'bg-blue-600 w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Ir para solução ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => navigateCarousel('next')}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              aria-label="Próxima solução"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Mobile Carousel / Desktop Grid */}
        <div
          ref={carouselRef}
          className={`${
            isMobile 
              ? 'flex overflow-x-auto snap-x snap-mandatory hide-scrollbar' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
          }`}
          onMouseDown={isMobile ? handleMouseDown : undefined}
          onMouseMove={isMobile ? handleMouseMove : undefined}
          onMouseUp={isMobile ? handleDragEnd : undefined}
          onMouseLeave={isMobile ? handleDragEnd : undefined}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchMove={isMobile ? handleTouchMove : undefined}
          onTouchEnd={isMobile ? handleDragEnd : undefined}
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {solutionsDetailsData.map((solution, index) => {
            return (
              <motion.div
                key={solution.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className={`
                  relative overflow-hidden rounded-xl group h-64 cursor-pointer shadow-lg
                  transition-all duration-300
                  ${isMobile ? 'min-w-[85%] mr-4 flex-shrink-0 snap-center' : ''}
                `}
                onMouseEnter={() => setHoveredCard(solution.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Link envolvendo todo o card */}
                <Link
                  to={`/solucoes/${solution.id}`}
                  className="absolute inset-0 z-20"
                  aria-label={`Ver detalhes de ${solution.title}`}
                ></Link>
                
                {/* Card Background Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-700/10 z-0 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Card Image */}
                <motion.div 
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img 
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </motion.div>
                
                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="h-full flex flex-col">
                    {/* Ícones removidos conforme solicitado */}
                    
                    {/* Title with animation */}
                    <motion.h3 
                      className="text-2xl font-bold text-white mt-auto"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
                    >
                      {solution.title}
                    </motion.h3>
                    
                    {/* Description with improved animation */}
                    <AnimatePresence>
                      {(hoveredCard === solution.id || isMobile) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="mt-2 overflow-hidden"
                        >
                          <p className="text-white/90 text-sm leading-relaxed">
                            {solution.shortDescription}
                          </p>
                          <motion.div
                            initial={{ x: -5, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="inline-flex items-center text-blue-300 font-medium text-sm mt-2 hover:text-blue-100 transition-colors">
                              Saiba mais 
                              <motion.div
                                initial={{ x: 0 }}
                                whileHover={{ x: 3 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ArrowRight size={14} className="ml-1" />
                              </motion.div>
                            </span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;

// Adicione este CSS ao seu arquivo global de estilos
/*
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/