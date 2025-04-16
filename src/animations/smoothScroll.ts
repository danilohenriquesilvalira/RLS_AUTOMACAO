/**
 * Uma implementação simples de smooth scrolling sem dependências externas
 */

// Configurações de smooth scrolling
const config = {
  duration: 1000, // duração em ms
  easing: (t: number) => 1 - Math.pow(1 - t, 3), // função de easing: ease-out-cubic
  offset: 0, // offset do scroll (para headers fixos)
};

/**
 * Registra o comportamento de smooth scrolling para links internos
 * @returns Função para limpar os event listeners
 */
export const registerSmoothScrolling = () => {
  // Obtém todos os links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  // Manipulador de eventos para clicks em links internos
  const handleLinkClick = (e: Event) => {
    const link = e.currentTarget as HTMLAnchorElement;
    const targetId = link.getAttribute('href');
    
    // Verifica se é um link interno válido
    if (targetId && targetId !== '#') {
      e.preventDefault();
      
      // Obtém o elemento target
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        smoothScrollTo(targetElement);
      }
    }
  };
  
  // Adiciona event listeners para todos os links internos
  internalLinks.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });
  
  // Função para limpar event listeners
  return () => {
    internalLinks.forEach(link => {
      link.removeEventListener('click', handleLinkClick);
    });
  };
};

/**
 * Realiza um scroll suave para um elemento específico
 * @param element Elemento target para scroll
 */
export const smoothScrollTo = (element: Element) => {
  const startPosition = window.pageYOffset;
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - config.offset;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;
  
  // Função de animação
  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / config.duration, 1);
    const easeProgress = config.easing(progress);
    
    window.scrollTo(0, startPosition + distance * easeProgress);
    
    if (timeElapsed < config.duration) {
      requestAnimationFrame(animation);
    }
  };
  
  // Inicia a animação
  requestAnimationFrame(animation);
};

export default registerSmoothScrolling;