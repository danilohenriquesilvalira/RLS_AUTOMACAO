// src/components/ui/Efeito.tsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface EfeitoProps {
  className?: string;
  color?: string;
  secondaryColor?: string;
}

const Efeito = ({ 
  className, 
  color = "#3ed160", 
  secondaryColor = "#e32028" 
}: EfeitoProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const circlesRef = useRef<SVGCircleElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const activePulsesRef = useRef<gsap.core.Timeline[]>([]);
  
  // Efeito para capturar a posição do mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Inicialização e animação do SVG
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Selecionar elementos do SVG
    const paths = Array.from(svgRef.current.querySelectorAll('path'));
    const circles = Array.from(svgRef.current.querySelectorAll('circle'));
    pathsRef.current = paths;
    circlesRef.current = circles;

    // Garantir que viewBox abranja todo o SVG
    svgRef.current.setAttribute('viewBox', '0 0 4182 1587');
    svgRef.current.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    
    // Scale do SVG para preencher mais da tela
    gsap.set(svgRef.current, {
      scale: 1.2,
      opacity: 0
    });

    // Animação de entrada do SVG
    gsap.to(svgRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut"
    });

    // Limpar animações existentes
    gsap.killTweensOf([...paths, ...circles]);
    activePulsesRef.current.forEach(tl => tl.kill());
    activePulsesRef.current = [];

    // Preparar e animar caminhos
    paths.forEach((path, index) => {
      // Determinar se esse caminho será animado com cor primária ou secundária
      const isSecondary = index % 7 === 0; // Aproximadamente 15% serão destacados com cor secundária
      const pathColor = isSecondary ? secondaryColor : color;
      
      // Obter comprimento do caminho ou usar valor padrão seguro
      let length = 100;
      try {
        length = path.getTotalLength ? path.getTotalLength() : 100;
      } catch (e) {
        console.log('Erro ao obter comprimento do caminho', e);
      }
      
      // Definir propriedades iniciais
      gsap.set(path, {
        stroke: pathColor,
        strokeWidth: isSecondary ? 1.5 : 1,
        opacity: 0,
        strokeDasharray: length,
        strokeDashoffset: length
      });

      // Animar traçado do caminho com atraso baseado em posição
      gsap.to(path, {
        strokeDashoffset: 0,
        opacity: isSecondary ? 0.75 : 0.6,
        duration: Math.random() * 2 + 1.5,
        delay: index * 0.02,
        ease: "power3.inOut"
      });
    });

    // Animar círculos
    circles.forEach((circle, index) => {
      // Determinar se o círculo é destacado
      const isHighlighted = index % 5 === 0;
      
      // Configurar círculos
      gsap.set(circle, { 
        stroke: isHighlighted ? secondaryColor : color,
        strokeWidth: isHighlighted ? 1.5 : 1,
        fill: "transparent",
        opacity: 0.1,
        attr: { r: isHighlighted ? 4 : 3 }
      });

      // Animação de entrada
      gsap.to(circle, {
        opacity: isHighlighted ? 0.8 : 0.6,
        duration: 2,
        delay: index * 0.05,
        ease: "power2.inOut"
      });

      // Pulsar círculos com tempos diferentes
      gsap.to(circle, {
        opacity: isHighlighted ? 0.9 : 0.7,
        attr: { r: isHighlighted ? 5 : 4 },
        duration: 1.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });

    // Função para enviar pulsos de corrente elétrica através dos caminhos
    const createPulse = () => {
      // Selecionar um caminho aleatório ponderado por comprimento
      // Longos caminhos têm maior probabilidade de serem escolhidos
      const weightedPaths = paths
        .filter(path => path.getTotalLength && path.getTotalLength() > 50)
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 1); // 1-3 caminhos por vez
      
      weightedPaths.forEach(path => {
        if (!path.getTotalLength) return;
        
        const length = path.getTotalLength();
        const pulseLength = length * 0.2; // Tamanho do pulso é 20% do caminho
        const isSpecial = Math.random() > 0.7; // Alguns pulsos especiais
        const pulseColor = isSpecial ? secondaryColor : color;
        const duration = isSpecial ? 1.5 : (Math.random() * 1.5 + 1);
        
        // Criar timeline para este pulso
        const tl = gsap.timeline({
          onComplete: () => {
            // Remover da lista de pulsos ativos quando terminar
            const index = activePulsesRef.current.indexOf(tl);
            if (index !== -1) {
              activePulsesRef.current.splice(index, 1);
            }
          }
        });
        
        // Adicionar à lista de pulsos ativos
        activePulsesRef.current.push(tl);
        
        // Configurar o caminho
        tl.set(path, { 
          strokeDasharray: `0 ${length}`,
          strokeDashoffset: length,
          stroke: pulseColor,
          opacity: isSpecial ? 0.9 : 0.8,
          strokeWidth: isSpecial ? 1.8 : 1.5,
          zIndex: 10
        });
        
        // Animar o pulso ao longo do caminho
        tl.to(path, { 
          strokeDasharray: `${pulseLength} ${length-pulseLength}`,
          strokeDashoffset: 0,
          duration: duration,
          ease: "power3.inOut"
        });
        
        // Restaurar o caminho ao estado normal
        tl.to(path, {
          opacity: 0.6,
          strokeWidth: path === paths[0] ? 1.5 : 1,
          stroke: path === paths[0] ? secondaryColor : color,
          duration: 0.5
        });
        
        // Encontrar círculos nos extremos do caminho
        const pathStart = path.getPointAtLength(0);
        const pathEnd = path.getPointAtLength(length);
        
        const connectedCircles = circles.filter(circle => {
          const circleX = parseFloat(circle.getAttribute('cx') || '0');
          const circleY = parseFloat(circle.getAttribute('cy') || '0');
          
          // Verificar se o círculo está perto de um dos extremos do caminho
          return (
            Math.hypot(pathStart.x - circleX, pathStart.y - circleY) < 20 ||
            Math.hypot(pathEnd.x - circleX, pathEnd.y - circleY) < 20
          );
        });
        
        // Brilhar os círculos conectados quando o pulso passa
        if (connectedCircles.length > 0) {
          // Círculo no início
          const startCircles = connectedCircles.filter(circle => {
            const x = parseFloat(circle.getAttribute('cx') || '0');
            const y = parseFloat(circle.getAttribute('cy') || '0');
            return Math.hypot(pathStart.x - x, pathStart.y - y) < 20;
          });
          
          if (startCircles.length > 0) {
            tl.to(startCircles, {
              opacity: isSpecial ? 1 : 0.9,
              fill: pulseColor,
              fillOpacity: 0.5,
              attr: { r: isSpecial ? 7 : 6 },
              duration: 0.3,
              ease: "power2.out",
              stagger: 0.1
            }, 0);
            
            tl.to(startCircles, {
              opacity: 0.6,
              fill: "transparent",
              attr: { r: 3 },
              duration: 0.5,
              ease: "power2.in",
              stagger: 0.1
            }, 0.4);
          }
          
          // Círculo no fim
          const endCircles = connectedCircles.filter(circle => {
            const x = parseFloat(circle.getAttribute('cx') || '0');
            const y = parseFloat(circle.getAttribute('cy') || '0');
            return Math.hypot(pathEnd.x - x, pathEnd.y - y) < 20;
          });
          
          if (endCircles.length > 0) {
            tl.to(endCircles, {
              opacity: isSpecial ? 1 : 0.9,
              fill: pulseColor,
              fillOpacity: 0.5,
              attr: { r: isSpecial ? 7 : 6 },
              duration: 0.3,
              ease: "power2.out",
              stagger: 0.1
            }, duration * 0.8);
            
            tl.to(endCircles, {
              opacity: 0.6,
              fill: "transparent",
              attr: { r: 3 },
              duration: 0.5,
              ease: "power2.in",
              stagger: 0.1
            }, duration * 0.8 + 0.4);
          }
        }
      });
    };
    
    // Iniciar pulsos aleatórios
    const pulseInterval = setInterval(() => {
      // Limitar o número de pulsos simultâneos
      if (activePulsesRef.current.length < 4) {
        createPulse();
      }
    }, 1200);
    
    // Iniciar com alguns pulsos
    gsap.delayedCall(0.5, createPulse);
    gsap.delayedCall(1.2, createPulse);
    
    return () => {
      clearInterval(pulseInterval);
      activePulsesRef.current.forEach(tl => tl.kill());
    };
  }, [color, secondaryColor]);

  // Efeito para responder à posição do mouse
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    
    // Movimento suave do SVG baseado no mouse
    gsap.to(svgRef.current, {
      x: (mousePosition.x - 0.5) * 20,
      y: (mousePosition.y - 0.5) * 20,
      duration: 1,
      ease: "power2.out"
    });
    
    // Pulsar círculos próximos ao cursor
    if (circlesRef.current.length) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = mousePosition.x * containerRect.width;
      const mouseY = mousePosition.y * containerRect.height;
      
      circlesRef.current.forEach(circle => {
        const circleX = parseFloat(circle.getAttribute('cx') || '0');
        const circleY = parseFloat(circle.getAttribute('cy') || '0');
        
        // Converter coordenadas do SVG para coordenadas do contêiner
        const svgRect = svgRef.current?.getBoundingClientRect();
        if (!svgRect) return;
        
        const scaleX = svgRect.width / 4182;
        const scaleY = svgRect.height / 1587;
        
        const screenX = circleX * scaleX + svgRect.left - containerRect.left;
        const screenY = circleY * scaleY + svgRect.top - containerRect.top;
        
        // Calcular distância do mouse
        const distance = Math.hypot(mouseX - screenX, mouseY - screenY);
        
        // Pulsar círculos próximos ao cursor
        if (distance < 100) {
          const influence = 1 - distance / 100;
          
          gsap.to(circle, {
            opacity: 0.8 + influence * 0.2,
            attr: { r: 3 + influence * 4 },
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    }
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className={`circuit-lines-container relative w-full h-full overflow-hidden ${className || ''}`}
    >
      {/* Camada de gradiente para dar profundidade */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/30 z-10 pointer-events-none"></div>
      
      {/* SVG principal */}
      <svg 
        ref={svgRef}
        width="100%" 
        height="100%" 
        viewBox="0 0 4182 1587" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 transform-gpu"
        style={{ 
          filter: 'drop-shadow(0 0 2px rgba(62, 209, 96, 0.3))',
          width: '120%',
          height: '120%',
          left: '-10%',
          top: '-10%'
        }}
      >
        <mask id="path-1-inside-1_2142_1482" fill="white">
          <path d="M541 735.947H7.04297V740.877H541V735.947Z"/>
        </mask>
        <path d="M541 735.947H7.04297V740.877H541V735.947Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M7.04297 735.947V730.947H2.04297V735.947H7.04297ZM541 735.947H546V730.947H541V735.947ZM541 740.877V745.877H546V740.877H541ZM7.04297 740.877H2.04297V745.877H7.04297V740.877ZM7.04297 735.947V740.947H541V735.947V730.947H7.04297V735.947ZM541 735.947H536V740.877H541H546V735.947H541ZM541 740.877V735.877H7.04297V740.877V745.877H541V740.877ZM7.04297 740.877H12.043V735.947H7.04297H2.04297V740.877H7.04297Z" fill="none" stroke="currentColor" strokeWidth="1" mask="url(#path-1-inside-1_2142_1482)"/>
        <circle cx="7.41211" cy="738.412" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-4-inside-2_2142_1482" fill="white">
          <path d="M574.028 646.886H24.8564V641.957H571.988L755.419 458.574H1210.4V463.504H757.459L574.028 646.886Z"/>
        </mask>
        <path d="M574.028 646.886H24.8564V641.957H571.988L755.419 458.574H1210.4V463.504H757.459L574.028 646.886Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="25.2256" cy="644.416" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1210.03" cy="461.039" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-8-inside-3_2142_1482" fill="white">
          <path d="M1357.25 619.597H746.127V614.668H1355.21L1626.65 343.306H2686.19L2743.82 285.635H3032.77L3131.58 384.49H3548.29L3623.64 459.798L3620.15 463.28L3546.25 389.42H3129.54L3030.73 290.564H2745.86L2688.23 348.23H1628.69L1357.25 619.597Z"/>
        </mask>
        <path d="M1357.25 619.597H746.127V614.668H1355.21L1626.65 343.306H2686.19L2743.82 285.635H3032.77L3131.58 384.49H3548.29L3623.64 459.798L3620.15 463.28L3546.25 389.42H3129.54L3030.73 290.564H2745.86L2688.23 348.23H1628.69L1357.25 619.597Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="746.497" cy="617.135" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3620.15" cy="461.539" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-12-inside-4_2142_1482" fill="white">
          <path d="M472.457 574.958H106.661V570.029H470.417L671.154 369.291H1013.18L1377.53 4.94336H2702.5V9.87296H1379.57L1015.22 374.221H673.194L472.457 574.958Z"/>
        </mask>
        <path d="M472.457 574.958H106.661V570.029H470.417L671.154 369.291H1013.18L1377.53 4.94336H2702.5V9.87296H1379.57L1015.22 374.221H673.194L472.457 574.958Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="107.031" cy="572.488" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="2702.12" cy="7.41211" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-16-inside-5_2142_1482" fill="white">
          <path d="M1283.65 537.057L1280.16 533.569L1555.99 257.745H2088.87L2189.23 157.424H2918.76L2970.17 208.796H3350.01L3442.85 301.662L3439.36 305.144L3347.97 213.725H2968.13L2916.72 162.353H2191.28L2090.91 262.674H1558.03L1283.65 537.057Z"/>
        </mask>
        <path d="M1283.65 537.057L1280.16 533.569L1555.99 257.745H2088.87L2189.23 157.424H2918.76L2970.17 208.796H3350.01L3442.85 301.662L3439.36 305.144L3347.97 213.725H2968.13L2916.72 162.353H2191.28L2090.91 262.674H1558.03L1283.65 537.057Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1281.93" cy="535.313" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3440.84" cy="303.145" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-20-inside-6_2142_1482" fill="white">
          <path d="M1239.06 388.38L1235.57 384.893L1476.64 143.785H1960.01L2028.17 75.6619H3085.25L3140.89 19.9766L3144.38 23.4644L3087.29 80.5915H2030.21L1962.05 148.709H1478.68L1239.06 388.38Z"/>
        </mask>
        <path d="M1239.06 388.38L1235.57 384.893L1476.64 143.785H1960.01L2028.17 75.6619H3085.25L3140.89 19.9766L3144.38 23.4644L3087.29 80.5915H2030.21L1962.05 148.709H1478.68L1239.06 388.38Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1237.58" cy="386.378" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3142.49" cy="21.7203" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-24-inside-7_2142_1482" fill="white">
          <path d="M2512 431.945H1653.27V436.875H2512V431.945Z"/>
        </mask>
        <path d="M2512 431.945H1653.27V436.875H2512V431.945Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1653.65" cy="433.412" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="2517.41" cy="434.412" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-28-inside-8_2142_1482" fill="white">
          <path d="M2216 883.945H1437.04V888.875H2216V883.945Z"/>
        </mask>
        <path d="M2216 883.945H1437.04V888.875H2216V883.945Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1437.41" cy="885.412" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="2222.41" cy="886.412" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-32-inside-9_2142_1482" fill="white">
          <path d="M2299 731H1538.04V735.93H2299V731Z"/>
        </mask>
        <path d="M2299 731H1538.04V735.93H2299V731Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1538.41" cy="733.412" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="2300.41" cy="733.412" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-36-inside-10_2142_1482" fill="white">
          <path d="M3111.43 1277.66H2095.08L1831.1 1013.73H641.283L472.755 815.41H94.2764V810.48H475.034L643.562 1008.8H1833.14L2097.12 1272.73H3111.43V1277.66Z"/>
        </mask>
        <path d="M3111.43 1277.66H2095.08L1831.1 1013.73H641.283L472.755 815.41H94.2764V810.48H475.034L643.562 1008.8H1833.14L2097.12 1272.73H3111.43V1277.66Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="94.6484" cy="812.949" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3111.06" cy="1275.2" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="638.656" cy="892.291" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3220.1" cy="1063.33" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-43-inside-11_2142_1482" fill="white">
          <path d="M3341.96 1184.77H2738.26L2682.49 1128.99H2210.34L2025 943.656L2028.49 940.168L2212.38 1124.06H2684.53L2740.3 1179.84H3341.96V1184.77Z"/>
        </mask>
        <path d="M3341.96 1184.77H2738.26L2682.49 1128.99H2210.34L2025 943.656L2028.49 940.168L2212.38 1124.06H2684.53L2740.3 1179.84H3341.96V1184.77Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="2027.01" cy="942.174" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3341.59" cy="1182.31" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-47-inside-12_2142_1482" fill="white">
          <path d="M2732.87 976.521H2362.29V971.592H2730.83L2879.55 822.914H3561.3V827.844H2881.59L2732.87 976.521Z"/>
        </mask>
        <path d="M2732.87 976.521H2362.29V971.592H2730.83L2879.55 822.914H3561.3V827.844H2881.59L2732.87 976.521Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="2362.66" cy="974.051" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3560.93" cy="825.379" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M2661.99 643.376L2741.83 720.72L2742.48 721.354H2742.47L2662.63 644.01L2661.98 643.376H2661.99ZM1866.8 642.67L1867.45 643.306H1867.44L1815.77 593.171L1815.77 593.166L1866.8 642.67Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1814.25" cy="591.688" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3410.35" cy="721.393" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-54-inside-13_2142_1482" fill="white">
          <path d="M1479.33 668.627H952.47V673.557H1479.33V668.627Z"/>
        </mask>
        <path d="M1479.33 668.627H952.47V673.557H1479.33V668.627Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="952.84" cy="671.096" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1478.97" cy="671.096" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-58-inside-14_2142_1482" fill="white">
          <path d="M3610.02 675.717H3264.5L3205.47 616.719H3022.79V613.363H3206.86L3265.89 672.362H3608.63L3659.37 621.646L3661.74 624.02L3610.02 675.717Z"/>
        </mask>
        <path d="M3610.02 675.717H3264.5L3205.47 616.719H3022.79V613.363H3206.86L3265.89 672.362H3608.63L3659.37 621.646L3661.74 624.02L3610.02 675.717Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3023.04" cy="615.045" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3660.88" cy="623.014" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-62-inside-15_2142_1482" fill="white">
          <path d="M1676.37 1167.32H918.979L814.973 1063.4L818.461 1059.92L921.025 1162.39H1676.37V1167.32Z"/>
        </mask>
        <path d="M1676.37 1167.32H918.979L814.973 1063.4L818.461 1059.92L921.025 1162.39H1676.37V1167.32Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="816.971" cy="1061.92" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="1676" cy="1164.85" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-66-inside-16_2142_1482" fill="white">
          <path d="M2576.73 1586.24H1010.72L297.725 873.328L301.206 869.84L1012.76 1581.31H2574.69L2719.7 1436.34H3590.84L3735.2 1291.9H3907.08V1296.83H3737.24L3592.88 1441.27H2721.74L2576.73 1586.24Z"/>
        </mask>
        <path d="M2576.73 1586.24H1010.72L297.725 873.328L301.206 869.84L1012.76 1581.31H2574.69L2719.7 1436.34H3590.84L3735.2 1291.9H3907.08V1296.83H3737.24L3592.88 1441.27H2721.74L2576.73 1586.24Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="299.722" cy="871.851" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3906.71" cy="1294.37" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-70-inside-17_2142_1482" fill="white">
          <path d="M2591.33 1442.48H1779.04L1717.09 1380.49H892.466V1375.56H1719.13L1781.08 1437.55H2591.33V1442.48Z"/>
        </mask>
        <path d="M2591.33 1442.48H1779.04L1717.09 1380.49H892.466V1375.56H1719.13L1781.08 1437.55H2591.33V1442.48Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="892.834" cy="1378.03" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="2590.96" cy="1440.02" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-74-inside-18_2142_1482" fill="white">
          <path d="M3316.56 1343.63H1924.99L1868.31 1286.99H884.923L734.349 1136.41H627.238V1131.48H736.395L886.969 1282.06H1870.35L1927.04 1338.7H3314.52L3414.46 1238.81H3682.58L3808.76 1112.66H4121.31L4173.1 1060.87L4176.59 1064.35L4123.35 1117.59H3810.81L3684.62 1243.74H3416.5L3316.56 1343.63Z"/>
        </mask>
        <path d="M3316.56 1343.63H1924.99L1868.31 1286.99H884.923L734.349 1136.41H627.238V1131.48H736.395L886.969 1282.06H1870.35L1927.04 1338.7H3314.52L3414.46 1238.81H3682.58L3808.76 1112.66H4121.31L4173.1 1060.87L4176.59 1064.35L4123.35 1117.59H3810.81L3684.62 1243.74H3416.5L3316.56 1343.63Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="627.608" cy="1133.95" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="4174.59" cy="1062.87" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <mask id="path-78-inside-19_2142_1482" fill="white">
          <path d="M3702.33 1132.36H3470.4L3386.81 1048.81L3390.3 1045.33L3472.45 1127.43H3702.33V1132.36Z"/>
        </mask>
        <path d="M3702.33 1132.36H3470.4L3386.81 1048.81L3390.3 1045.33L3472.45 1127.43H3702.33V1132.36Z" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3388.82" cy="1047.33" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
        <circle cx="3701.96" cy="1129.89" r="3" fill="none" stroke="currentColor" strokeWidth="1"/>
      </svg>
      
      {/* Partículas flutuantes com brilho */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(25)].map((_, index) => (
          <div
            key={index}
            className="absolute rounded-full animate-floatSlow"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              backgroundColor: index % 5 === 0 ? secondaryColor : color,
              opacity: Math.random() * 0.5 + 0.2,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              filter: `blur(${Math.random() + 0.5}px)`,
              boxShadow: `0 0 ${Math.random() * 3 + 2}px ${index % 5 === 0 ? secondaryColor : color}`,
              animationDuration: Math.random() * 15 + 20 + 's',
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>
      
      {/* Gradiente radial sutil para dar profundidade */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20 mix-blend-overlay pointer-events-none z-30"
      ></div>
    </div>
  );
};

export default Efeito;