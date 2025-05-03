import React, { useEffect, useRef } from 'react';

interface TechBorderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  animationSpeed?: number;
  children?: React.ReactNode;
}

const TechBorder: React.FC<TechBorderProps> = ({
  className = '',
  width = '100%',
  height = '100%',
  color = '#2B9243',
  animationSpeed = 1,
  children
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      // Adiciona apenas a animação de traçado - sem pontos
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes dashOffset {
          0% {
            stroke-dashoffset: 1500;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .tech-path {
          stroke-dasharray: 1500;
          animation: dashOffset ${10 / animationSpeed}s linear infinite;
        }
      `;
      document.head.appendChild(styleSheet);

      // Obtém todos os caminhos SVG e adiciona classes para animação
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach((path, index) => {
        // Adiciona uma classe com atraso de animação diferente para cada caminho
        path.classList.add('tech-path');
        path.style.animationDelay = `${index * 0.3}s`;
      });

      return () => {
        document.head.removeChild(styleSheet);
      };
    }
  }, [color, animationSpeed]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* O SVG como borda */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 426 324"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        <path d="M140 1H35.5L10.5 26V206.5L1 217.5V294.5L29.5 323H77L86.5 313.5H269.5L278.5 322.5H385L412.5 296.5V119.5L424.5 102.5V24.5L405 1H357L348.5 9.5H148.5L140 1Z" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M367 13H395L414 32V80.3355" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M25 78.5V31L47.5 13H130" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M14 239V288L35 309H72" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M400 238V286L378.5 309H282" stroke={color} strokeWidth="2" fill="none"/>
      </svg>
      
      {/* Conteúdo - Garantindo que o fundo seja totalmente preto, sem transparência */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default TechBorder;