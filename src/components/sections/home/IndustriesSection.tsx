// src/components/sections/home/IndustriesSection.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import industriesDetailsData from '@/data/industriesDetailsData';

const IndustriesSection = () => {
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
      setActiveIndex((prev) => (prev + 1) % industriesDetailsData.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [isMobile, isDragging]);

  // Scroll carousel to active index
  useEffect(() => {
    if (isMobile && carouselRef.current) {
      const scrollAmount = activeIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isMobile]);

  // Handle drag events for mobile carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
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
    if (!isDragging) return;
    setIsDragging(false);
    
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth;
      const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), industriesDetailsData.length - 1));
    }
  };

  const navigateCarousel = (direction: 'prev' | 'next') => {
    setActiveIndex(prev => {
      if (direction === 'prev') {
        return prev === 0 ? industriesDetailsData.length - 1 : prev - 1;
      } else {
        return (prev + 1) % industriesDetailsData.length;
      }
    });
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="industries">
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
              SETORES ATENDIDOS
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-800"
            >
              Nossos Setores de Atuação
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center"
          >
            <Link 
              to="/industrias"
              className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors mt-4 md:mt-0 group"
            >
              <span>Ver todos os setores</span> 
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

        {/* Carousel Navigation */}
        {isMobile && (
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigateCarousel('prev')}
              className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors shadow-md"
              aria-label="Setor anterior"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {industriesDetailsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Ir para setor ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => navigateCarousel('next')}
              className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors shadow-md"
              aria-label="Próximo setor"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Industries Grid / Carousel */}
        <div
          ref={carouselRef}
          className={`
            ${isMobile 
              ? 'flex overflow-x-auto snap-x snap-mandatory hide-scrollbar' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
            }
          `}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {industriesDetailsData.map((industry, index) => {
            // Referência ao ícone removida
            
            return (
              <motion.div
                key={industry.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className={`
                  relative overflow-hidden rounded-xl group cursor-pointer h-64
                  bg-white shadow-lg transform transition-all duration-300
                  ${isMobile ? 'min-w-full mr-4 flex-shrink-0 snap-center' : ''}
                `}
                onMouseEnter={() => setHoveredCard(industry.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Link envolvendo todo o card */}
                <Link
                  to={`/industrias/${industry.id}`}
                  className="absolute inset-0 z-20"
                  aria-label={`Ver detalhes de ${industry.title}`}
                ></Link>
                
                {/* Card Background with animated gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-600/10 z-0 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Card Image with Zoom Effect */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <img 
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </motion.div>
                
                {/* Card Content with better animations */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="h-full flex flex-col">
                    {/* Ícones removidos conforme solicitado */}
                    
                    {/* Title with staggered animation */}
                    <motion.h3 
                      className="text-2xl font-bold text-white mt-auto"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.05 + 0.2,
                        duration: 0.5 
                      }}
                    >
                      {industry.title}
                    </motion.h3>
                    
                    {/* Description with improved animation */}
                    <AnimatePresence>
                      {(hoveredCard === industry.id || isMobile) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="mt-2 overflow-hidden"
                        >
                          <p className="text-white/90 text-sm leading-relaxed">
                            {industry.shortDescription}
                          </p>
                          <motion.div
                            initial={{ x: -5, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <span className="inline-flex items-center text-blue-300 font-medium text-sm mt-2 group-hover:text-blue-100 transition-colors">
                              Saiba mais 
                              <motion.span
                                initial={{ x: 0 }}
                                whileHover={{ x: 3 }}
                                className="inline-block ml-1"
                              >
                                <ArrowRight size={14} />
                              </motion.span>
                            </span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Overlay effect on hover */}
                <motion.div 
                  className="absolute inset-0 border-2 border-transparent rounded-xl z-10 group-hover:border-blue-400/30"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;

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