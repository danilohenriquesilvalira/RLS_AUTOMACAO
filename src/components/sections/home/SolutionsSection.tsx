// src/components/sections/home/SolutionsSection.tsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechBorder from '@/components/ui/TechBorder';

// Registrando o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Componente do Braço Robótico SVG
const RoboticArmSVG = () => {
  return (
    <svg width="111" height="94" viewBox="0 0 111 94" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 md:w-48 md:h-48">
      <path d="M15.4155 7.88965C19.5762 5.3156 24.1342 4.51735 28.6323 5.55957L29.0679 5.66602C31.7459 6.35803 34.1568 7.65813 36.0493 9.05469C37.8189 10.3606 39.1175 11.738 39.7583 12.7627L37.6206 13.9619C37.1154 13.1921 36.0388 12.0772 34.5728 11C33.0586 9.88748 31.1084 8.79791 28.9009 8.15723L28.4556 8.03516C24.5442 7.0245 20.7069 7.60794 17.0562 9.75781L16.7036 9.9707C14.1574 11.5459 12.3051 13.594 11.1646 16.0967C10.0961 18.4413 9.65758 21.1724 9.84619 24.2686L9.89209 24.8936C10.2811 29.3885 11.8586 33.1733 12.2817 34.1221L10.0767 35.1875C9.63982 34.2226 8.00579 30.3654 7.50439 25.6279L7.45459 25.1045C6.81326 17.6937 9.38247 11.89 14.8755 8.23633L15.4155 7.88965Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M41.7097 10.8825L42.5856 12.3997L35.9147 16.2513L35.0388 14.7341L41.7097 10.8825Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M95.6631 5.66211V27.6318H91.3135V5.66211H95.6631Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M96.3335 21.2744C97.2439 22.0516 97.8221 23.2053 97.8237 24.4961L97.8315 28.3574L89.3472 28.3672L89.3403 24.5059C89.3389 23.2102 89.9192 22.0508 90.8345 21.2715L96.3335 21.2744Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M98.6782 28.8516V29.6396H88.561V28.8516H98.6782Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M85.8281 51.8262L84.4541 52.0273L79.4775 39.1553L83.8809 38.5117L85.8281 51.8262Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M103.897 52.0928L102.606 51.58L104.732 37.9442L108.868 39.5885L103.897 52.0928Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M88.6162 30.2344L99.3047 30.2412C100.469 30.2421 101.422 31.1963 101.421 32.3604L101.409 32.5762C101.299 33.6401 100.393 34.4772 99.3018 34.4766L88.6133 34.4697C87.4491 34.4689 86.4963 33.5148 86.4971 32.3506L86.5078 32.1348C86.6103 31.1419 87.4074 30.3463 88.4004 30.2451L88.6162 30.2344Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M87.1768 30.7725C87.8612 30.182 88.8698 30.2025 89.5283 30.7949L89.6553 30.9219C90.1638 31.4803 90.2617 32.2939 89.9131 32.9521L89.8369 33.0811L84.835 40.876C83.861 42.3965 81.8153 42.769 80.3721 41.7236L80.2344 41.6182C78.7596 40.4221 78.691 38.2122 80.0488 36.9248L80.1846 36.8027L80.1865 36.8018L87.1768 30.7725Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M82.5122 38.0713L82.6685 38.1133C83.3103 38.3428 83.56 39.0896 83.2163 39.6514L83.1392 39.7617C82.9012 40.0612 82.5068 40.2026 82.1362 40.1348L81.979 40.0928C81.3371 39.8633 81.0882 39.1165 81.4321 38.5547L81.5083 38.4453C81.7463 38.1454 82.1412 38.0031 82.5122 38.0713Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M88.3438 31.5527L88.4551 31.583C88.9132 31.7469 89.0909 32.2787 88.8457 32.6797L88.791 32.7588C88.6215 32.9721 88.3399 33.0726 88.0762 33.0244L87.9639 32.9941C87.5059 32.8301 87.3281 32.2981 87.5732 31.8975L87.6279 31.8193L87.6289 31.8184C87.7982 31.6054 88.0796 31.5044 88.3438 31.5527Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M97.9644 30.9922C98.4798 30.2493 99.4618 30.0177 100.248 30.4268L100.402 30.5176L108.125 35.5723L108.127 35.5732C109.726 36.597 110.041 38.785 108.835 40.2158L108.714 40.3525C107.474 41.6651 105.395 41.6497 104.171 40.3535L104.056 40.2236H104.055L98.0688 33.1572C97.5807 32.581 97.5125 31.7648 97.8843 31.1191L97.9644 30.9922Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M99.4429 31.4316C99.9248 31.3649 100.329 31.7545 100.296 32.2236L100.285 32.3184C100.233 32.5857 100.03 32.8054 99.7739 32.8848L99.6606 32.9102C99.179 32.9767 98.7752 32.587 98.8071 32.1182L98.8198 32.0225C98.8715 31.755 99.0741 31.5351 99.3306 31.4561L99.4429 31.4316Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M94.1621 4.47852V9.72754H76.792V4.47852H94.1621Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M67.1411 1.05859H78.4683V13.1455H67.1411C63.8037 13.1453 61.0981 10.439 61.0981 7.10156C61.0983 3.76428 63.8038 1.05878 67.1411 1.05859Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M93.7124 1.05859C97.0498 1.05865 99.7552 3.7642 99.7554 7.10156C99.7554 10.4394 97.0499 13.1455 93.7124 13.1455H85.8042V1.05859H93.7124Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M92.7285 4.21875C94.239 3.58551 95.9763 4.25756 96.6777 5.71777L96.7422 5.86133C97.3755 7.37197 96.7036 9.10924 95.2432 9.81055L95.0996 9.875C93.5889 10.5083 91.8516 9.8365 91.1504 8.37598L91.0859 8.23242C90.4528 6.7219 91.1247 4.98453 92.585 4.2832L92.7285 4.21875ZM95.916 6.20801C95.4823 5.17323 94.3355 4.65002 93.2842 4.96973L93.0752 5.04492C92.0402 5.47872 91.5169 6.62627 91.8369 7.67773L91.9121 7.88574C92.3459 8.92073 93.4934 9.44414 94.5449 9.12402L94.7529 9.04883C95.7877 8.61508 96.311 7.46835 95.9912 6.41699L95.916 6.20801Z" fill="#263238" stroke="black" strokeWidth="0.5"/>
      <path d="M43.6699 33.4556L40.866 35.2671L31.1594 20.2431L33.9633 18.4316L43.6699 33.4556Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M44.7036 27.8184L19.1294 44.2842C16.9874 45.6619 14.1561 45.1048 12.688 43.0586L12.5503 42.8555C11.1723 40.7131 11.7292 37.8821 13.7759 36.4141L13.978 36.2764L39.5522 19.8096L44.7036 27.8184Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M61.6636 1.31055C65.3142 -0.753098 69.9105 0.281041 72.3374 3.64844L72.5649 3.98145C74.8487 7.49814 74.1 12.148 70.8882 14.7773L70.5698 15.0254L42.8882 35.5234L31.7349 18.2598L61.6646 1.31152L61.6636 1.31055Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M62.8506 4.12891C65.1647 2.62622 68.2458 3.21854 69.8467 5.42871L69.9971 5.64746C71.548 8.03636 70.8664 11.2427 68.4775 12.7939C66.1633 14.2965 63.0829 13.7035 61.4824 11.4932L61.332 11.2744C59.8295 8.96028 60.4218 5.87989 62.6318 4.2793L62.8506 4.12891ZM68.5039 6.61719C67.5187 5.10033 65.5166 4.63362 63.9688 5.53027L63.8203 5.62207C62.3033 6.60733 61.8364 8.60909 62.7334 10.1572L62.8242 10.3057C63.8095 11.8227 65.8124 12.2896 67.3604 11.3926L67.5088 11.3008C69.0255 10.3154 69.4917 8.3134 68.5947 6.76562L68.5039 6.61719Z" fill="#263238" stroke="black" strokeWidth="0.5"/>
      <path d="M7.72852 29.6855C15.0948 25.0433 24.7932 27.144 29.5928 34.3486L29.8174 34.6953L51.5586 69.1934C56.2009 76.5601 54.0995 86.2582 46.8945 91.0576L46.5479 91.2822C39.1814 95.9244 29.4833 93.8231 24.6836 86.6182L24.459 86.2715L2.71875 51.7744C-1.92349 44.4081 0.177237 34.7101 7.38184 29.9102L7.72852 29.6855Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
      <path d="M11.3262 35.3906C15.2111 32.9422 20.3447 34.1078 22.793 37.9922V37.9912C25.1645 41.7545 24.1461 46.6898 20.5479 49.2207L20.1924 49.458C16.429 51.8298 11.4932 50.8107 8.96289 47.2129L8.72559 46.8574C6.3541 43.0944 7.37236 38.1583 10.9697 35.6279L11.3262 35.3906ZM20.3027 39.5605C18.7703 37.1293 15.6106 36.3477 13.1328 37.7393L12.8945 37.8799C10.4637 39.412 9.68167 42.5729 11.0732 45.0508L11.2148 45.2881C12.7471 47.7195 15.9074 48.5015 18.3848 47.1104L18.623 46.9688C21.1327 45.3869 21.8845 42.0704 20.3027 39.5605Z" fill="#263238" stroke="black" strokeWidth="0.5"/>
      <path d="M33.5464 71.1484C37.3102 68.7765 42.2456 69.796 44.7759 73.3936L45.0132 73.75C47.3845 77.5133 46.3663 82.4487 42.7681 84.9795L42.4116 85.2168C38.6486 87.5881 33.7133 86.5684 31.1831 82.9707L30.9458 82.6152C28.5743 78.8522 29.5926 73.9161 33.1899 71.3857L33.5464 71.1484ZM42.5239 75.3184C40.9915 72.8869 37.8309 72.1054 35.353 73.4971L35.1157 73.6387C32.6847 75.1708 31.9027 78.3307 33.2944 80.8086L33.436 81.0459C34.9685 83.4775 38.1285 84.2598 40.606 82.8682L40.8433 82.7266C43.2744 81.1942 44.0567 78.0342 42.6655 75.5566L42.5239 75.3184Z" fill="#263238" stroke="black" strokeWidth="0.5"/>
      <path d="M106.955 37.2354L107.111 37.2773C107.753 37.5068 108.003 38.2537 107.659 38.8154L107.582 38.9258C107.344 39.2252 106.95 39.3667 106.579 39.2988L106.422 39.2568C105.78 39.0273 105.531 38.2806 105.875 37.7188L105.951 37.6094C106.189 37.3095 106.584 37.1672 106.955 37.2354Z" fill="#5AE774" stroke="black" strokeWidth="0.5"/>
    </svg>
  );
};

// Icons for each solution
const solutionIcons = {
  "automacao-industrial": (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 14C50 18.4183 46.4183 22 42 22C37.5817 22 34 18.4183 34 14C34 9.58172 37.5817 6 42 6C46.4183 6 50 9.58172 50 14Z" stroke="#3ED160" strokeWidth="2"/>
      <path d="M28 37.5C28 40.5376 25.5376 43 22.5 43C19.4624 43 17 40.5376 17 37.5C17 34.4624 19.4624 32 22.5 32C25.5376 32 28 34.4624 28 37.5Z" stroke="#3ED160" strokeWidth="2"/>
      <path d="M42 22V50" stroke="#3ED160" strokeWidth="2"/>
      <path d="M22 43V50" stroke="#3ED160" strokeWidth="2"/>
      <path d="M42 50H22" stroke="#3ED160" strokeWidth="2"/>
      <path d="M42 32H32" stroke="#3ED160" strokeWidth="2"/>
      <path d="M32 18L32 32" stroke="#3ED160" strokeWidth="2"/>
      <path d="M15 18L32 18" stroke="#3ED160" strokeWidth="2"/>
      <path d="M15 18L15 32" stroke="#3ED160" strokeWidth="2"/>
      <path d="M15 32L17 32" stroke="#3ED160" strokeWidth="2"/>
    </svg>
  ),
  "consultoria-projetos": (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 45H45V19H19V45H25Z" stroke="#3ED160" strokeWidth="2"/>
      <path d="M25 32L32 25L39 32" stroke="#3ED160" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M32 25L32 39" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "gestao-industrial": (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="20" stroke="#3ED160" strokeWidth="2"/>
      <circle cx="32" cy="32" r="14" stroke="#3ED160" strokeWidth="2"/>
      <path d="M32 18V22" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 42V46" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
      <path d="M46 32H42" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 32H18" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 32L40 24" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 32L24 36" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "seguranca-cibernetica": (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 48C41.9411 48 50 39.9411 50 30C50 20.0589 41.9411 12 32 12C22.0589 12 14 20.0589 14 30C14 39.9411 22.0589 48 32 48Z" stroke="#3ED160" strokeWidth="2"/>
      <path d="M32 20V30L38 36" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 20L26 18L20 20L18 26L20 32L26 34L32 30L38 26L40 20L38 14L32 12L26 14L24 20" stroke="#3ED160" strokeWidth="2"/>
    </svg>
  ),
  "treinamentos": (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 22C24 19.7909 25.7909 18 28 18H36C38.2091 18 40 19.7909 40 22V28H24V22Z" stroke="#3ED160" strokeWidth="2"/>
      <circle cx="24" cy="34" r="6" stroke="#3ED160" strokeWidth="2"/>
      <circle cx="40" cy="34" r="6" stroke="#3ED160" strokeWidth="2"/>
      <path d="M24 40V46H40V40" stroke="#3ED160" strokeWidth="2"/>
    </svg>
  ),
  "assistencia-tecnica": (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 46L18 18L46 18L46 46L18 46Z" stroke="#3ED160" strokeWidth="2"/>
      <path d="M24 24L40 24" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 32L40 32" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 40L32 40" stroke="#3ED160" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
};

// Versão modificada dos dados de soluções
const solutions = [
  { 
    id: 'automacao-industrial', 
    title: 'Automação Industrial', 
    shortDescription: 'Sistemas integrados para linhas de proteção', 
    color: '#3ED160', // Verde para o primeiro
    glowColor: '#5AFF7F'
  },
  { 
    id: 'consultoria-projetos', 
    title: 'Consultoria e Projetos', 
    shortDescription: 'Desenvolvimento de soluções personalizadas',
    color: '#FFFFFF', // Branco para o segundo
    glowColor: '#FFFFFF'
  },
  { 
    id: 'gestao-industrial', 
    title: 'Gestão Industrial', 
    shortDescription: 'Otimização de processos industriais',
    color: '#3ED160', // Verde para o terceiro
    glowColor: '#5AFF7F'
  },
  { 
    id: 'seguranca-cibernetica', 
    title: 'Segurança Cibernética OT', 
    shortDescription: 'Proteção avançada de sistemas de automação',
    color: '#FFFFFF', // Branco para o quarto
    glowColor: '#FFFFFF'
  },
  { 
    id: 'treinamentos', 
    title: 'Treinamentos', 
    shortDescription: 'Capacitação operacional em equipamentos',
    color: '#3ED160', // Verde para o quinto
    glowColor: '#5AFF7F'
  },
  { 
    id: 'assistencia-tecnica', 
    title: 'Assistência Técnica', 
    shortDescription: 'Suporte especializado para sua operação',
    color: '#FFFFFF', // Branco para o sexto
    glowColor: '#FFFFFF'
  }
];

// Componente principal da seção de soluções
const SolutionsSection = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'small' | 'medium' | 'desktop'>('desktop');
  const sectionRef = useRef<HTMLElement>(null);
  
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

  // Classes dinâmicas
  const getGridClass = (): string => {
    if (screenSize === 'mobile' || screenSize === 'small') {
      return "grid grid-cols-1 gap-6";
    } else if (screenSize === 'medium') {
      return "grid grid-cols-2 gap-6";
    } else {
      return "grid grid-cols-3 gap-6";
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-black relative overflow-hidden"
      id="solutions"
    >
      {/* Fundo escuro */}
      <div className="absolute inset-0 z-0 bg-black"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
          {/* SVG do braço robótico */}
          <div className="md:w-1/4 flex justify-center md:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <RoboticArmSVG />
            </motion.div>
          </div>
          
          {/* Título e subtítulo - NOSSAS branco e SOLUÇÕES verde */}
          <div className="md:w-3/4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-black text-5xl md:text-6xl lg:text-[65px] mb-6 font-['Chivo',_sans-serif]"
              style={{ lineHeight: 1.1 }}
            >
              <span className="text-white">NOSSAS </span>
              <span className="text-[#3ED160]">SOLUÇÕES</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/80 text-lg md:text-xl max-w-2xl mb-8"
            >
              Conheça nossas soluções de automação industrial e segurança cibernética para otimizar sua linha de produção.
            </motion.p>
          </div>
        </div>
        
        {/* Cards de soluções com TechBorder no lugar dos retângulos simples */}
        <div className={getGridClass()}>
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              className="relative"
            >
              {/* TechBorder substituindo o retângulo estático */}
              <TechBorder
                width="100%"
                height="300px"
                className="lg:w-[440px] lg:h-[300px]"
                color={solution.color}
                animationSpeed={1 + (index % 3) * 0.2} // Velocidades ligeiramente diferentes para cada solução
              >
                <Link to={`/solucoes/${solution.id}`} className="block w-full h-full p-8 bg-black/80">
                  <div className="flex flex-col items-center text-center h-full justify-center">
                    {/* Ícone */}
                    <div className="mb-6 opacity-90 transition-opacity duration-300 hover:opacity-100"
                         style={{ color: solution.color }}>
                      {solutionIcons[solution.id as keyof typeof solutionIcons]}
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-white text-xl font-semibold mb-3">
                      {solution.title}
                    </h3>
                    
                    {/* Descrição curta */}
                    <p className="text-white/70 text-sm transition-colors duration-300 hover:text-white/90">
                      {solution.shortDescription}
                    </p>
                    
                    {/* Botão para ver mais */}
                    <div className="mt-6 flex items-center text-white/70 text-sm hover:text-white transition-colors">
                      <span>Ver detalhes</span>
                      <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </Link>
              </TechBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;