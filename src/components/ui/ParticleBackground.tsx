import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  color?: string;
  particleCount?: number;
  speed?: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  color = '#22c55e',
  particleCount = 30,
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas para tamanho total
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Criar partículas
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar e atualizar partículas
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Mover partícula
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Reposicionar se sair da tela
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color, particleCount, speed]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  );
};