// Modificação para o SolutionsSection.tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import solutionsDetailsData from '@/data/solutionsDetailsData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrando o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Componente principal da seção de soluções
const SolutionsSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenSize, setScreenSize] = useState<'mobile' | 'small' | 'medium' | 'desktop'>('desktop');
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
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
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate carousel on mobile
  useEffect(() => {
    if ((screenSize === 'mobile' || screenSize === 'small') && !isDragging) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % solutionsDetailsData.length);
      }, 5000); // Change slide every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [screenSize, isDragging]);

  // Scroll carousel to active index
  useEffect(() => {
    if ((screenSize === 'mobile' || screenSize === 'small') && carouselRef.current) {
      const cardElement = carouselRef.current.querySelector('.solution-card');
      const cardWidth = cardElement ? cardElement.clientWidth : 0;
      const gap = 16;
      const scrollAmount = activeIndex * (cardWidth + gap);
      
      gsap.to(carouselRef.current, {
        scrollLeft: scrollAmount,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, [activeIndex, screenSize]);

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
      const cardElement = carouselRef.current.querySelector('.solution-card');
      const cardWidth = cardElement ? cardElement.clientWidth : 0;
      const gap = 16;
      const newIndex = Math.round(carouselRef.current.scrollLeft / (cardWidth + gap));
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

  // Classes dinâmicas
  const getCarouselClass = (): string => {
    if (screenSize === 'mobile' || screenSize === 'small') {
      return "flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6";
    } else if (screenSize === 'medium') {
      return "grid grid-cols-2 gap-6";
    } else {
      return "grid grid-cols-4 gap-6";
    }
  };

  const getCardClass = (): string => {
    const baseClass = "solution-card relative overflow-hidden rounded-xl group cursor-pointer shadow-lg transition-all duration-300";
    
    if (screenSize === 'mobile' || screenSize === 'small') {
      return `${baseClass} min-w-[85%] mr-4 flex-shrink-0 snap-center h-64`;
    } else if (screenSize === 'medium') {
      return `${baseClass} h-72`;
    } else {
      return `${baseClass} h-64`;
    }
  };

  // Componente SVG de linha industrial
  const IndustrialLineSVG: React.FC<{ className?: string; color?: string; delay?: number }> = ({ 
    className, 
    color = "#0047AB", 
    delay = 0 
  }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    
    useEffect(() => {
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path');
        const dots = svgRef.current.querySelectorAll('circle');
        
        // Configurar o traço inicial para cada path
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length
          });
        });
        
        // Esconder os pontos inicialmente
        gsap.set(dots, { scale: 0, opacity: 0 });
        
        // Criar uma timeline para sequenciar as animações
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reset'
          }
        });
        
        // Animar o desenho das linhas
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          stagger: 0.15,
          delay
        });
        
        // Animar a aparição dos pontos
        tl.to(dots, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }, "-=0.5");
        
        // Adicionar um sutil efeito de brilho nas linhas
        gsap.to(paths, {
          strokeOpacity: 0.8,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
          delay: delay + 1.5
        });
      }
    }, [delay, color]);

    return (
      <svg 
        ref={svgRef} 
        className={className} 
        viewBox="0 0 300 50" 
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <circle cx="20" cy="25" r="5" fill={color} />
        <path 
          d="M20,25 L100,25" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <path 
          d="M100,25 L160,10" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <path 
          d="M160,10 L280,10" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
        <circle cx="100" cy="25" r="5" fill={color} />
        <circle cx="160" cy="10" r="5" fill={color} />
        <circle cx="280" cy="10" r="5" fill={color} />
      </svg>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 overflow-hidden bg-svg-background" // Adicionada classe para o SVG
      id="solutions"
      style={{
        backgroundImage: `url('/images/paginas/Desktop.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
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
              className="text-3xl md:text-4xl font-bold text-gray-800 relative"
            >
              Nossas Soluções
              <div className="w-20 h-1 mt-2 bg-blue-500"></div>
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
        {(screenSize === 'mobile' || screenSize === 'small') && (
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

        {/* Cards grid */}
        <div
          ref={carouselRef}
          className={getCarouselClass()}
          onMouseDown={(screenSize === 'mobile' || screenSize === 'small') ? handleMouseDown : undefined}
          onMouseMove={(screenSize === 'mobile' || screenSize === 'small') ? handleMouseMove : undefined}
          onMouseUp={(screenSize === 'mobile' || screenSize === 'small') ? handleDragEnd : undefined}
          onMouseLeave={(screenSize === 'mobile' || screenSize === 'small') ? handleDragEnd : undefined}
          onTouchStart={(screenSize === 'mobile' || screenSize === 'small') ? handleTouchStart : undefined}
          onTouchMove={(screenSize === 'mobile' || screenSize === 'small') ? handleTouchMove : undefined}
          onTouchEnd={(screenSize === 'mobile' || screenSize === 'small') ? handleDragEnd : undefined}
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {solutionsDetailsData.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover="hover"
              variants={{
                hover: {
                  y: -8,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut"
                  }
                }
              }}
              className={getCardClass()}
              onMouseEnter={() => setHoveredCard(solution.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Link envolvendo todo o card */}
              <Link
                to={`/solucoes/${solution.id}`}
                className="absolute inset-0 z-20"
                aria-label={`Ver detalhes de ${solution.title}`}
              ></Link>
              
              {/* SVG industrial line no topo do card - bem visível quando hover */}
              <div className="absolute top-0 left-0 w-full h-10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IndustrialLineSVG 
                  className="w-full h-full" 
                  delay={index * 0.05}
                />
              </div>
              
              {/* Card Image com efeito de zoom no hover */}
              <motion.div 
                className="absolute inset-0"
                variants={{
                  hover: {
                    scale: 1.05,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                <img 
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </motion.div>
              
              {/* Card Content com animações */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="h-full flex flex-col">
                  {/* Título com animação */}
                  <motion.h3 
                    className="text-2xl font-bold text-white mt-auto"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
                  >
                    {solution.title}
                  </motion.h3>
                  
                  {/* Descrição com animação melhorada */}
                  <div
                    className={`mt-2 overflow-hidden transition-all duration-300 ${
                      hoveredCard === solution.id || screenSize === 'mobile' || screenSize === 'small'
                        ? 'max-h-32 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-white/90 text-sm leading-relaxed">
                      {solution.shortDescription}
                    </p>
                    <div className="flex items-center text-blue-300 font-medium text-sm mt-2 group-hover:text-blue-100 transition-colors">
                      <span>Saiba mais</span>
                      <motion.div
                        variants={{
                          hover: {
                            x: 5,
                            transition: {
                              duration: 0.2,
                              ease: "easeOut",
                              delay: 0.1
                            }
                          }
                        }}
                        className="ml-1"
                      >
                        <ArrowRight size={14} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;