// src/components/sections/home/PartnersSection.tsx
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PartnersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Responsivo: quantos itens mostrar por view baseado na largura da tela
  const [itemsPerView, setItemsPerView] = useState(5);
  
  // Atualiza itemsPerView baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(5);
      }
    };
    
    handleResize(); // Inicializar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lista de parceiros com seus logos
  const partners = [
    { name: 'Elipse', logo: `${import.meta.env.BASE_URL}images/parceiros/Elipse.jpg` },
    { name: 'GE', logo: `${import.meta.env.BASE_URL}images/parceiros/GE.jpg` },
    { name: 'Schneider Electric', logo: `${import.meta.env.BASE_URL}images/parceiros/Schneider_Logo.svg` },
    { name: 'Rockwell Automation', logo: `${import.meta.env.BASE_URL}images/parceiros/Rockwell_Logo.svg` },
    { name: 'Siemens', logo: `${import.meta.env.BASE_URL}images/parceiros/Siemens_Logo.svg` },
    { name: 'Aveva', logo: `${import.meta.env.BASE_URL}images/parceiros/Aveva_logo.svg` }
  ];
  
  const totalSlides = Math.ceil(partners.length / itemsPerView);

  // Navegar para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Navegar para o slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  
  // Navegar para um dot específico
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  // Calcula o translate X baseado no slide atual
  useEffect(() => {
    if (sliderRef.current) {
      const translateValue = currentSlide * (100 / itemsPerView) * -1;
      sliderRef.current.style.transform = `translateX(${translateValue}%)`;
    }
  }, [currentSlide, itemsPerView]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Cabeçalho alinhado à esquerda com link à direita */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
          <div>
            <div className="text-blue-500 text-sm uppercase tracking-wider font-medium mb-3">
              PARCERIAS DE SUCESSO
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Nossos Parceiros
            </h2>
          </div>
          <Link 
            to="/parceiros"
            className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors mt-4 md:mt-0"
          >
            Ver todos os parceiros <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Controles do carrossel */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-10 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} className="text-primary-600" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-10 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Próximo slide"
          >
            <ChevronRight size={24} className="text-primary-600" />
          </button>
          
          {/* Container de overflow */}
          <div className="overflow-hidden relative">
            {/* Track do carrossel */}
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                width: `${partners.length * (100 / itemsPerView)}%`
              }}
            >
              {partners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center px-6" 
                  style={{ width: `${100 / partners.length}%` }}
                >
                  <div className="w-full h-24 flex items-center justify-center bg-white rounded-lg shadow-sm p-4 mx-auto">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} Logo`} 
                      className="h-full max-w-full object-contain" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots de navegação */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-6 bg-primary-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;