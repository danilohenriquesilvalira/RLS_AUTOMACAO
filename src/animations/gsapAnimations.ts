import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Registra os plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Animação de entrada para textos sem SplitText (usando uma abordagem alternativa)
export const animateTextReveal = (elementSelector: string, delay: number = 0) => {
  const element = document.querySelector(elementSelector);
  if (!element) return;

  gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    delay,
  });

  return () => {};
};

// Alternativa para animar texto por caracteres usando HTML
export const setupTextAnimation = (elementSelector: string) => {
  const elements = document.querySelectorAll(elementSelector);

  elements.forEach((element) => {
    if (!element || !element.textContent) return;

    // Obter o texto original
    const text = element.textContent;
    // Limpar o conteúdo
    element.textContent = '';

    // Criar um span para cada caractere
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      element.appendChild(span);
    });

    // Animar os spans separadamente
    const chars = element.querySelectorAll('span');
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      stagger: 0.02,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%"
      }
    });
  });
};

// Animação de entrada para elementos baseada em scroll
export const animateOnScroll = (elementSelector: string, options = {}) => {
  const elements = gsap.utils.toArray(elementSelector);

  elements.forEach((element: any) => {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
        ...options,
      },
    });
  });
};

// Animação de parallax para background
export const createParallax = (elementSelector: string, strength: number = 0.3) => {
  const elements = gsap.utils.toArray(elementSelector);

  elements.forEach((element: any) => {
    gsap.to(element, {
      yPercent: strength * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
};

// Animação de contador
export const animateCounter = (elementSelector: string, endValue: number, duration: number = 2, delay: number = 0) => {
  const element = document.querySelector(elementSelector);
  if (!element) return;

  gsap.fromTo(
    element,
    { innerText: 0 },
    {
      innerText: endValue,
      duration,
      delay,
      snap: { innerText: 1 },
      onUpdate: function () {
        element.textContent = Math.ceil(gsap.getProperty(this.targets()[0], "innerText") as number).toString();
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
      },
    }
  );
};

// Animação de staggered cards
export const animateStaggeredCards = (containerSelector: string, cardSelector: string) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const cards = container.querySelectorAll(cardSelector);
  gsap.from(cards, {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: container,
      start: "top 75%",
    },
  });
};
