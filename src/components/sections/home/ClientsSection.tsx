// src/components/sections/home/ClientsSection.tsx
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientsSection = () => {
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

  // Lista de clientes com seus logos
  // Substitua com seus clientes reais e logos quando disponíveis
  const clients = [
    { name: 'Cliente 1', logo: 'https://placehold.co/200x100/444/white?text=Cliente+1' },
    { name: 'Cliente 2', logo: 'https://placehold.co/200x100/444/white?text=Cliente+2' },
    { name: 'Cliente 3', logo: 'https://placehold.co/200x100/444/white?text=Cliente+3' },
    { name: 'Cliente 4', logo: 'https://placehold.co/200x100/444/white?text=Cliente+4' },
    { name: 'Cliente 5', logo: 'https://placehold.co/200x100/444/white?text=Cliente+5' },
    { name: 'Cliente 6', logo: 'https://placehold.co/200x100/444/white?text=Cliente+6' },
    { name: 'Cliente 7', logo: 'https://placehold.co/200x100/444/white?text=Cliente+7' },
    { name: 'Cliente 8', logo: 'https://placehold.co/200x100/444/white?text=Cliente+8' }
  ];
  
  const totalSlides = Math.ceil(clients.length / itemsPerView);

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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Cabeçalho alinhado à esquerda com link à direita */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
          <div>
            <div className="text-blue-500 text-sm uppercase tracking-wider font-medium mb-3">
              QUEM CONFIA NA RLS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Nossos Clientes
            </h2>
          </div>
          <Link 
            to="/clientes"
            className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors mt-4 md:mt-0"
          >
            Ver todos os clientes <ArrowRight size={18} className="ml-2" />
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
                width: `${clients.length * (100 / itemsPerView)}%`
              }}
            >
              {clients.map((client, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center px-6" 
                  style={{ width: `${100 / clients.length}%` }}
                >
                  <div className="w-full h-24 flex items-center justify-center bg-white rounded-lg shadow-sm p-4 mx-auto">
                    <img 
                      src={client.logo} 
                      alt={`${client.name} Logo`} 
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

export default ClientsSection;