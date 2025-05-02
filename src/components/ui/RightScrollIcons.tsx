import { useEffect, useRef } from 'react';

// Definição dos itens do lado direito (5 ícones)
const rightIcons = [
  {
    id: 1,
    image: '/images/Trabalhos/IA.png',
    alt: 'IA'
  },
  {
    id: 2,
    image: '/images/Trabalhos/SCADA.png',
    alt: 'SCADA'
  },
  {
    id: 3,
    image: '/images/Trabalhos/Redes_Industriais.png',
    alt: 'Redes Industriais'
  },
  {
    id: 4,
    image: '/images/Trabalhos/cloud_computing.avif',
    alt: 'Cloud Computing'
  },
  {
    id: 5,
    image: '/images/Trabalhos/Edge_computing.png',
    alt: 'Edge Computing'
  }
];

// Duplicamos para criar um loop infinito
const duplicatedRightIcons = [...rightIcons, ...rightIcons, ...rightIcons];

const RightScrollIcons = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    // Adicionar o estilo de keyframes ao documento
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes scrollUpAnimation {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-50%);
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Animação direta e simplificada
    const animateScroll = () => {
      if (!scrollRef.current) return;
      
      // Inicia a posição no topo
      scrollRef.current.style.transform = 'translateY(0)';
      
      // Adicionar animação CSS usando animation property
      scrollRef.current.style.animation = 'scrollUpAnimation 30s linear infinite';
      scrollRef.current.style.willChange = 'transform';
    };
    
    // Inicia a animação
    animateScroll();
    
    // Verifica periodicamente se a animação está rodando
    const checkInterval = setInterval(() => {
      if (!scrollRef.current) return;
      
      const computedStyle = window.getComputedStyle(scrollRef.current);
      const transform = computedStyle.getPropertyValue('transform');
      
      // Se a transformação parou, reinicia a animação
      if (transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)') {
        animateScroll();
      }
    }, 5000);
    
    return () => {
      clearInterval(checkInterval);
      // Remove o estilo ao desmontar o componente
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="absolute right-4 top-[20%] bottom-[20%] z-10 w-16 md:w-20 overflow-hidden pointer-events-none">
      <div className="relative h-full">
        {/* Container de animação */}
        <div 
          ref={scrollRef}
          className="absolute top-0 right-0 w-full"
        >
          {/* Container duplicado para scroll infinito */}
          <div className="flex flex-col items-center justify-center">
            {duplicatedRightIcons.map((icon, index) => (
              <div 
                key={`${icon.id}-${index}`} 
                className="my-12 flex items-center justify-center"
              >
                <img 
                  src={icon.image} 
                  alt={icon.alt}
                  className="w-12 md:w-16 lg:w-20 h-auto object-contain"
                  style={{ filter: 'brightness(1.2)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightScrollIcons;