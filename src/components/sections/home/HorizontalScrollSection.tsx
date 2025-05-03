// src/components/sections/home/HorizontalScrollSection.tsx
import { useEffect, useRef } from 'react';

// Combinando todos os ícones em uma única array
const techIcons = [
  // Ícones da esquerda (anteriormente no LeftScrollIcons)
  {
    id: 'left-1',
    image: '/images/Trabalhos/IHM.avif',
    alt: 'IHM',
    color: '#3ED160' // Verde
  },
  {
    id: 'left-2',
    image: '/images/Trabalhos/Algoritimos.png',
    alt: 'Algoritmos',
    color: '#3ED160' // Verde
  },
  {
    id: 'left-3',
    image: '/images/Trabalhos/Motor_Control.png',
    alt: 'Motion Control',
    color: '#3ED160' // Verde
  },
  {
    id: 'left-4',
    image: '/images/Trabalhos/PLC.png',
    alt: 'PLC',
    color: '#02A4E3' // Azul
  },
  // Ícones da direita (anteriormente no RightScrollIcons)
  {
    id: 'right-1',
    image: '/images/Trabalhos/IA.png',
    alt: 'IA',
    color: '#02A4E3' // Azul
  },
  {
    id: 'right-2',
    image: '/images/Trabalhos/SCADA.png',
    alt: 'SCADA',
    color: '#3ED160' // Verde
  },
  {
    id: 'right-3',
    image: '/images/Trabalhos/Redes_Industriais.png',
    alt: 'Redes Industriais',
    color: '#02A4E3' // Azul
  },
  {
    id: 'right-4',
    image: '/images/Trabalhos/cloud_computing.avif',
    alt: 'Cloud Computing',
    color: '#02A4E3' // Azul
  },
  {
    id: 'right-5',
    image: '/images/Trabalhos/Edge_computing.png',
    alt: 'Edge Computing',
    color: '#3ED160' // Verde
  }
];

// Duplicando os ícones para criar um loop infinito
const duplicatedTechIcons = [...techIcons, ...techIcons, ...techIcons];

const HorizontalScrollSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    // Adicionar o estilo de keyframes ao documento para animação horizontal
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes scrollLeftAnimation {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      @keyframes neonPulse {
        0% {
          filter: drop-shadow(0 0 2px currentColor) drop-shadow(0 0 4px currentColor);
          opacity: 0.8;
        }
        50% {
          filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor) drop-shadow(0 0 8px currentColor);
          opacity: 1;
        }
        100% {
          filter: drop-shadow(0 0 2px currentColor) drop-shadow(0 0 4px currentColor);
          opacity: 0.8;
        }
      }

      .neon-icon {
        position: relative;
        animation: neonPulse 3s infinite ease-in-out;
        transform-style: preserve-3d;
      }

      .neon-icon::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        z-index: -1;
        background: rgba(0,0,0,0.1);
        border-radius: 12px;
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Animação direta e simplificada
    const animateScroll = () => {
      if (!scrollRef.current) return;
      
      // Inicia a posição no início
      scrollRef.current.style.transform = 'translateX(0)';
      
      // Adicionar animação CSS usando animation property
      scrollRef.current.style.animation = 'scrollLeftAnimation 40s linear infinite';
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
    <>
      {/* Divisória simplificada - fundo preto puro */}
      <div className="w-full h-4 bg-black"></div>
      
      <section 
        className="relative w-full py-10 bg-black z-10" 
        id="tech-section"
      >
        <div className="relative w-full overflow-hidden z-10">
          <h2 
            className="text-center text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-8"
          >
            Nossas Tecnologias
          </h2>
          
          {/* Container de animação horizontal */}
          <div className="relative w-full overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex whitespace-nowrap"
            >
              {/* Container duplicado para scroll infinito */}
              {duplicatedTechIcons.map((icon, index) => (
                <div
                  key={`${icon.id}-${index}`}
                  className="inline-block mx-8 my-2"
                >
                  <div 
                    className="flex flex-col items-center justify-center"
                  >
                    {/* Container de tamanho fixo para as imagens */}
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center neon-icon"
                      style={{ 
                        color: icon.color,
                        border: `1px solid ${icon.color}`,
                        borderRadius: '8px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        padding: '12px',
                        boxShadow: `0 0 10px ${icon.color}40, inset 0 0 6px ${icon.color}30`,
                        animationDelay: `${(index % 5) * 0.7}s`
                      }}
                    >
                      <img
                        src={icon.image}
                        alt={icon.alt}
                        className="max-w-full max-h-full object-contain"
                        style={{ 
                          filter: `brightness(1.2) drop-shadow(0 0 3px ${icon.color})`,
                          width: 'auto',
                          height: 'auto'
                        }}
                      />
                    </div>
                    <span 
                      className="text-white text-xs md:text-sm mt-3"
                    >
                      {icon.alt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HorizontalScrollSection;