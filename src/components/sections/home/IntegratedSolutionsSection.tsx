// src/components/sections/home/IntegratedSolutionsSection.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  Settings, 
  Code, 
  Shield, 
  Activity, 
  Wrench, 
  Zap,
  Users,
  Check,
  BarChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Definição de tipos
type ServiceDetail = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type Solution = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  color?: string;
  benefits: string[];
  stats?: {
    value: string;
    label: string;
  }[];
  details: ServiceDetail[];
  caseStudies?: {
    name: string;
    result: string;
  }[];
};

type Market = {
  id: string;
  image: string;
  alt: string;
  description: string;
};

// Dados detalhados das soluções 
const solutions: Solution[] = [
  {
    id: 'automacao-industrial',
    title: 'AUTOMAÇÃO INDUSTRIAL',
    shortDescription: 'Sistemas inteligentes para otimizar processos produtivos',
    fullDescription: 'Nossa solução de automação industrial integra controle avançado, monitoramento em tempo real e sistemas SCADA para maximizar eficiência operacional e reduzir custos. Adaptamos projetos às necessidades específicas do seu negócio.',
    image: '/images/solutions/AutomaçãoIndustrial.png',
    color: 'rgba(0, 0, 0, 0.9)',
    benefits: [
      'Aumento de produtividade em até 35%',
      'Redução de custos operacionais',
      'Monitoramento em tempo real',
      'Melhoria na qualidade do produto final',
      'Maior segurança operacional'
    ],
    stats: [
      { value: '35%', label: 'Aumento médio na produtividade' },
      { value: '40%', label: 'Redução de erros operacionais' },
      { value: '28%', label: 'Economia de energia' }
    ],
    details: [
      {
        title: 'Controle Programável',
        description: 'Implementação e programação de PLCs, DCSs e sistemas de controle distribuído para gerenciamento eficiente.',
        icon: <Settings className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Sistemas SCADA',
        description: 'Desenvolvimento de interfaces gráficas para supervisão, controle e aquisição de dados em tempo real.',
        icon: <Activity className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Integração IoT',
        description: 'Conexão de equipamentos industriais à rede, habilitando comunicação e análise de dados avançada.',
        icon: <Code className="w-8 h-8 text-[#42B653]" />
      }
    ],
    caseStudies: [
      {
        name: 'Fábrica Têxtil',
        result: 'Redução de 30% nos custos operacionais após implementação de sistema de automação integrado'
      },
      {
        name: 'Indústria Alimentar',
        result: 'Aumento de 40% na capacidade produtiva com zero aumento de mão-de-obra'
      }
    ]
  },
  {
    id: 'instalacoes-eletricas',
    title: 'INSTALAÇÕES ELÉTRICAS',
    shortDescription: 'Projetos elétricos seguros e eficientes para ambientes industriais',
    fullDescription: 'Desenvolvemos projetos elétricos de alta e baixa tensão, quadros de comando e sistemas de distribuição elétrica que garantem segurança, conformidade normativa e eficiência energética.',
    image: '/images/solutions/InstalcaoEletrica.jpg',
    color: 'rgba(0, 0, 0, 0.9)',
    benefits: [
      'Conformidade com normas técnicas',
      'Eficiência energética',
      'Segurança operacional',
      'Redução de falhas e paradas',
      'Manutenção preventiva'
    ],
    stats: [
      { value: '45%', label: 'Redução em falhas elétricas' },
      { value: '30%', label: 'Economia em consumo energético' },
      { value: '99.9%', label: 'Disponibilidade dos sistemas' }
    ],
    details: [
      {
        title: 'Projetos de Alta Tensão',
        description: 'Dimensionamento e instalação de sistemas de alta tensão com máxima segurança e eficiência.',
        icon: <Zap className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Quadros de Comando',
        description: 'Projeto e montagem de quadros elétricos para controle e distribuição de energia.',
        icon: <Settings className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Sistemas de Backup',
        description: 'Implementação de UPS e geradores para garantir continuidade operacional.',
        icon: <Activity className="w-8 h-8 text-[#42B653]" />
      }
    ],
    caseStudies: [
      {
        name: 'Centro Logístico',
        result: 'Redução de 38% no consumo energético após modernização da infraestrutura elétrica'
      },
      {
        name: 'Planta Industrial',
        result: 'Zero incidentes de segurança elétrica em 5 anos após implementação do projeto'
      }
    ]
  },
  {
    id: 'software-industrial',
    title: 'SOFTWARE INDUSTRIAL',
    shortDescription: 'Sistemas personalizados para gestão e controle de processos',
    fullDescription: 'Desenvolvemos soluções de software industrial sob medida, incluindo sistemas MES, integrações ERP, plataformas IoT e análise de dados que impulsionam a transformação digital na indústria 4.0.',
    image: '/images/solutions/SoftwareIndustrial.png',
    color: 'rgba(0, 0, 0, 0.9)',
    benefits: [
      'Visibilidade total dos processos',
      'Análise de dados em tempo real',
      'Integração com sistemas existentes',
      'Tomada de decisão baseada em dados',
      'Conformidade com requisitos da Indústria 4.0'
    ],
    stats: [
      { value: '42%', label: 'Redução em tempo de setup' },
      { value: '53%', label: 'Aumento na eficácia geral dos equipamentos' },
      { value: '67%', label: 'Melhoria na rastreabilidade' }
    ],
    details: [
      {
        title: 'Sistemas MES',
        description: 'Gestão de produção em tempo real com rastreabilidade completa e análise de performance.',
        icon: <BarChart className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Integrações ERP',
        description: 'Conexão eficiente entre chão de fábrica e sistemas administrativos para gestão unificada.',
        icon: <Code className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Plataformas IoT',
        description: 'Coleta, armazenamento e análise de dados de sensores e equipamentos conectados.',
        icon: <Activity className="w-8 h-8 text-[#42B653]" />
      }
    ],
    caseStudies: [
      {
        name: 'Indústria Automotiva',
        result: 'Redução de 45% no tempo de parada não-planejada com sistema preditivo'
      },
      {
        name: 'Fabricante de Eletrônicos',
        result: 'Aumento de 32% no OEE após implementação do MES'
      }
    ]
  },
  {
    id: 'sistemas-medicao',
    title: 'SISTEMAS DE MEDIÇÃO',
    shortDescription: 'Monitoramento preciso de variáveis de processo em tempo real',
    fullDescription: 'Instalamos e configuramos sistemas de medição para diversas variáveis industriais (temperatura, pressão, vazão, nível, etc.) garantindo precisão, confiabilidade e conformidade com normas de calibração.',
    image: '/images/solutions/SistemasMedicao.jpg',
    color: 'rgba(0, 0, 0, 0.9)',
    benefits: [
      'Precisão nas medições de processo',
      'Conformidade com normas de calibração',
      'Redução de desperdícios',
      'Rastreabilidade de medições',
      'Integração com sistemas de controle'
    ],
    stats: [
      { value: '±0.1%', label: 'Precisão média das medições' },
      { value: '48%', label: 'Redução em perdas de processo' },
      { value: '99.8%', label: 'Confiabilidade dos sistemas' }
    ],
    details: [
      {
        title: 'Medição de Fluxo',
        description: 'Sistemas precisos para medição de vazão de líquidos, gases e vapor em processos industriais.',
        icon: <Activity className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Sensores Avançados',
        description: 'Implementação de sensores para temperatura, pressão, nível e outras variáveis críticas.',
        icon: <Settings className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Calibração Certificada',
        description: 'Serviços de calibração e verificação periódica conforme normas internacionais.',
        icon: <Check className="w-8 h-8 text-[#42B653]" />
      }
    ],
    caseStudies: [
      {
        name: 'Indústria Petroquímica',
        result: 'Economia de €2.5M/ano após implementação de sistema de medição avançado'
      },
      {
        name: 'Processamento de Alimentos',
        result: 'Redução de 52% em perdas de produto com sistema de medição preciso'
      }
    ]
  },
  {
    id: 'seguranca-cibernetica',
    title: 'INDUSTRIA 4.0 IOT',
    shortDescription: 'Proteção de sistemas operacionais industriais contra ameaças digitais',
    fullDescription: 'Protegemos ambientes industriais contra ameaças cibernéticas com avaliações de vulnerabilidade, design de arquitetura segura e implementação de controles de segurança específicos para tecnologia operacional (OT).',
    image: '/images/solutions/Industria4.0.png',
    color: 'rgba(0, 0, 0, 0.9)',
    benefits: [
      'Proteção contínua de ativos críticos',
      'Conformidade com normas IEC62443',
      'Redução de riscos operacionais',
      'Resposta rápida a incidentes',
      'Segmentação de rede OT/IT'
    ],
    stats: [
      { value: '76%', label: 'Redução de vulnerabilidades' },
      { value: '94%', label: 'Taxa de detecção de ameaças' },
      { value: '<1h', label: 'Tempo médio de resposta' }
    ],
    details: [
      {
        title: 'Avaliação de Vulnerabilidades',
        description: 'Identificação sistemática de pontos fracos em sistemas de controle industrial.',
        icon: <Shield className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Arquitetura Segura',
        description: 'Design de redes industriais com segmentação e controles de acesso apropriados.',
        icon: <Code className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Monitoramento Contínuo',
        description: 'Sistemas de detecção de intrusão específicos para ambientes OT.',
        icon: <Activity className="w-8 h-8 text-[#42B653]" />
      }
    ],
    caseStudies: [
      {
        name: 'Usina de Energia',
        result: 'Neutralização de 100% das tentativas de ataque após implementação do sistema'
      },
      {
        name: 'Infraestrutura Crítica',
        result: 'Certificação IEC62443 obtida com avaliação de conformidade de 98%'
      }
    ]
  },
  {
    id: 'assistencia-tecnica',
    title: 'ASSISTÊNCIA TÉCNICA',
    shortDescription: 'Suporte especializado para manutenção e otimização de sistemas',
    fullDescription: 'Oferecemos serviços de assistência técnica especializada, incluindo manutenção preventiva, diagnóstico remoto, suporte 24/7 e contratos de SLA personalizados para garantir a máxima disponibilidade dos seus sistemas.',
    image: '/images/solutions/AssistenciaTecnica.jpg',
    color: 'rgba(0, 0, 0, 0.9)',
    benefits: [
      'Resposta rápida a falhas',
      'Redução de paradas não programadas',
      'Extensão da vida útil dos equipamentos',
      'Atualização tecnológica contínua',
      'Suporte especializado 24/7'
    ],
    stats: [
      { value: '97%', label: 'Taxa de resolução no primeiro atendimento' },
      { value: '<4h', label: 'Tempo médio de resposta' },
      { value: '74%', label: 'Redução em tempo de inatividade' }
    ],
    details: [
      {
        title: 'Manutenção Preventiva',
        description: 'Visitas periódicas programadas para inspeção, ajustes e identificação precoce de problemas.',
        icon: <Wrench className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Suporte Remoto 24/7',
        description: 'Equipe especializada disponível a qualquer momento para diagnóstico e resolução de problemas.',
        icon: <Users className="w-8 h-8 text-[#42B653]" />
      },
      {
        title: 'Contratos SLA',
        description: 'Acordos de nível de serviço personalizados para garantir disponibilidade e tempo de resposta.',
        icon: <Check className="w-8 h-8 text-[#42B653]" />
      }
    ],
    caseStudies: [
      {
        name: 'Linha de Produção Contínua',
        result: 'Redução de 82% em paradas não programadas após contrato de manutenção preventiva'
      },
      {
        name: 'Planta de Processamento',
        result: 'Aumento de 45% na disponibilidade de equipamentos com suporte técnico especializado'
      }
    ]
  }
];

// Dados detalhados dos ícones de mercados
const markets: Market[] = [
  {
    id: 'manufatura',
    image: '/images/Trabalhos/Manufatura.svg',
    alt: 'Manufatura',
    description: 'Soluções para linhas de produção, montagem e controle de qualidade na indústria de manufatura.'
  },
  {
    id: 'petroquimica',
    image: '/images/Trabalhos/Petroquimica.svg',
    alt: 'Petroquímica',
    description: 'Sistemas robustos para ambientes críticos no setor petroquímico e de refino.'
  },
  {
    id: 'setor-alimentar',
    image: '/images/Trabalhos/Setor_Alimentar.svg',
    alt: 'Setor Alimentar',
    description: 'Tecnologias que garantem segurança e rastreabilidade na indústria alimentícia.'
  },
  {
    id: 'farmaceutica',
    image: '/images/Trabalhos/Farmaceutica.svg',
    alt: 'Farmacêutica',
    description: 'Automação e controle para processos farmacêuticos com conformidade regulatória.'
  },
  {
    id: 'smart-cities',
    image: '/images/Trabalhos/Smart_Cities.svg',
    alt: 'Smart Cities',
    description: 'Integração de sistemas urbanos para cidades mais inteligentes e eficientes.'
  },
  {
    id: 'agua',
    image: '/images/Trabalhos/Agua.svg',
    alt: 'Água',
    description: 'Soluções para tratamento, distribuição e monitoramento de recursos hídricos.'
  },
  {
    id: 'energia',
    image: '/images/Trabalhos/Energia.svg',
    alt: 'Energia',
    description: 'Sistemas para geração, distribuição e gestão eficiente de energia.'
  },
  {
    id: 'eclusa',
    image: '/images/Trabalhos/Eclusa.svg',
    alt: 'Eclusa',
    description: 'Automação de sistemas de navegação fluvial e infraestrutura portuária.'
  }
];

// Duplicando os ícones para scrolling infinito
const duplicatedMarkets = [...markets, ...markets, ...markets];

const IntegratedSolutionsSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const iconsScrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Ajusta o número de soluções visíveis com base no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1280) {
        setVisibleCount(2);
      } else if (width < 1920) {
        setVisibleCount(3);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configurar a animação de scroll horizontal para os ícones
  useEffect(() => {
    if (!iconsScrollRef.current) return;
    
    // Cálculo mais preciso para a animação
    const cardWidth = 150; // Largura total do card com margens
    const totalWidth = markets.length * cardWidth;
    
    // Adicionar o estilo de keyframes para animação horizontal
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes scrollLeftAnimation {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${totalWidth}px);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .solution-card {
        animation: fadeInUp 0.5s ease forwards;
      }
      
      .hover-scale {
        transition: transform 0.3s ease;
      }
      
      .hover-scale:hover {
        transform: scale(1.03);
      }
    `;
    document.head.appendChild(styleSheet);
    
    // Animação de scroll mais suave
    const animateScroll = () => {
      if (!iconsScrollRef.current) return;
      
      iconsScrollRef.current.style.transform = 'translateX(0)';
      iconsScrollRef.current.style.animation = 'scrollLeftAnimation 50s linear infinite';
      iconsScrollRef.current.style.willChange = 'transform';
    };
    
    // Inicia a animação
    animateScroll();
    
    // Verifica periodicamente se a animação está rodando
    const checkInterval = setInterval(() => {
      if (!iconsScrollRef.current) return;
      
      const computedStyle = window.getComputedStyle(iconsScrollRef.current);
      const transform = computedStyle.getPropertyValue('transform');
      
      // Se a transformação parou, reinicia a animação
      if (transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)') {
        animateScroll();
      }
    }, 5000);
    
    return () => {
      clearInterval(checkInterval);
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Funções para navegação dos cards de soluções
  const goNext = () => {
    setStartIndex(prev => {
      const nextIndex = prev + 1;
      return nextIndex >= solutions.length ? 0 : nextIndex;
    });
  };

  const goPrev = () => {
    setStartIndex(prev => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? Math.max(0, solutions.length - visibleCount) : prevIndex;
    });
  };

  // Navegação com teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Funções para navegação com toque
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goNext();
    } else if (isRightSwipe) {
      goPrev();
    }
  };

  // Auto-play do carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 8000); // Muda a cada 8 segundos
    
    return () => clearInterval(timer);
  }, []);

  // Cria array circular para exibição do slider
  const getVisibleSolutions = () => {
    let visibleSolutions = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % solutions.length;
      visibleSolutions.push({...solutions[index], index});
    }
    return visibleSolutions;
  };

  // Função para clicar no card inteiro - agora navega diretamente para a página da solução
  const handleCardClick = (id: string) => {
    navigate(`/solucoes/${id}`);
  };

  return (
    <section 
      className="relative w-full overflow-hidden"
      id="solutions"
      style={{
        background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(/images/solutions/FundoSolutions.svg)`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Conteúdo principal */}
      <div className="relative z-10 py-16">
        {/* Título e subtítulo */}
        <div className="w-full px-4 sm:px-6 mb-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 inline-block"
            >
              Nossas Soluções
              <div className="w-full h-1 bg-[#42B653] opacity-30 mt-2"></div>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto"
            >
              Explore nossas soluções integradas desenvolvidas para otimizar seus processos e 
              impulsionar a eficiência operacional. Clique em cada solução para obter mais detalhes 
              sobre como podemos ajudar sua empresa.
            </motion.p>
          </div>
        </div>
        
        {/* NOVA ORDEM: Primeiro os cards de soluções */}
        <div className="max-w-7xl mx-auto">
          {/* Cards de soluções */}
          <div ref={sliderRef} className="relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-0 mb-16">
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className="relative"
            >
              {/* Botões de navegação */}
              <button 
                onClick={goPrev}
                className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-lg text-gray-800 hover:text-[#42B653] rounded-full p-2 sm:p-3 focus:outline-none transition-colors duration-300 hover:shadow-xl"
                aria-label="Ver solução anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              <button 
                onClick={goNext}
                className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-lg text-gray-800 hover:text-[#42B653] rounded-full p-2 sm:p-3 focus:outline-none transition-colors duration-300 hover:shadow-xl"
                aria-label="Ver próxima solução"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              {/* Grid de cards - Layout fluido */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              >
                {getVisibleSolutions().map((solution, i) => (
                  <motion.div 
                    key={`${solution.id}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="h-[450px] sm:h-[500px] md:h-[550px] lg:h-[580px] rounded-lg overflow-hidden shadow-lg cursor-pointer relative group solution-card hover-scale"
                    onClick={() => handleCardClick(solution.id)}
                  >
                    {/* Moldura verde no hover */}
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#42B653] transition-all duration-300 rounded-lg z-10"></div>
                    
                    {/* Fundo escuro */}
                    <div className="absolute inset-0 bg-black group-hover:bg-[#42B653] group-hover:opacity-90 transition-all duration-300"></div>
                    
                    {/* Imagem com overlay */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-20 transition-all duration-500"
                      style={{ 
                        backgroundImage: `url(${solution.image})`
                      }}
                    ></div>
                    
                    {/* Elementos de design - Três linhas horizontais (estilo código) */}
                    <div className="absolute top-6 right-6 space-y-1 opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                      <div className="w-6 h-1 bg-[#42B653] group-hover:bg-white"></div>
                      <div className="w-4 h-1 bg-[#42B653] group-hover:bg-white"></div>
                      <div className="w-8 h-1 bg-[#42B653] group-hover:bg-white"></div>
                    </div>
                    
                    {/* Conteúdo do card */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-20">
                      {/* Linha verde decorativa */}
                      <div className="w-12 sm:w-16 h-1 bg-[#42B653] group-hover:bg-white mb-4 sm:mb-6 transition-colors duration-300"></div>
                      
                      {/* Título */}
                      <h3 className="text-white text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 transform group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
                        {solution.title}
                      </h3>
                      
                      {/* Descrição curta - Apenas visível no hover */}
                      <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 mb-0 group-hover:mb-4">
                        <p className="text-white text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          {solution.shortDescription}
                        </p>
                      </div>
                      
                      {/* Botão "Saber mais" com efeito de slide no hover */}
                      <div className="flex items-center text-white text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300">
                        <span className="mr-2 font-medium">SABER MAIS</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Indicadores - Melhorados */}
              <div className="flex justify-center mt-8 sm:mt-10 gap-2">
                {solutions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStartIndex(idx)}
                    className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                      idx >= startIndex && idx < startIndex + visibleCount || 
                      (startIndex + visibleCount > solutions.length && idx < (startIndex + visibleCount) % solutions.length)
                        ? 'bg-[#42B653] w-8 sm:w-10' 
                        : 'bg-gray-300 hover:bg-gray-400 w-2.5 sm:w-3'
                    }`}
                    aria-label={`Ir para slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* SEGUNDA PARTE: Setores Atendidos (movida para baixo) */}
          <div className="px-4 sm:px-6 lg:px-8 mb-12">
            {/* Título de mercados */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Setores Atendidos
              </h3>
              <p className="text-gray-600 text-base">
                Soluções especializadas para os seguintes mercados:
              </p>
            </motion.div>
            
            {/* Ícones de mercados com pausar no hover */}
            <div className="w-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
              <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
              
              <div 
                ref={iconsScrollRef}
                className="flex whitespace-nowrap py-4"
                style={{ animationPlayState: isHovering !== null ? 'paused' : 'running' }}
              >
                {duplicatedMarkets.map((market, index) => (
                  <div
                    key={`${market.id}-${index}`}
                    className="inline-block"
                    onMouseEnter={() => setIsHovering(index)}
                    onMouseLeave={() => setIsHovering(null)}
                  >
                    <div className="w-28 sm:w-32 md:w-36 h-32 sm:h-36 mx-2 sm:mx-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#42B653] hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer hover-scale">
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={market.image}
                          alt={market.alt}
                          className="w-14 h-14 md:w-16 md:h-16 object-contain"
                        />
                      </div>
                      
                      <span className="text-gray-800 text-xs sm:text-sm font-medium mt-2 md:mt-3 text-center group-hover:text-[#42B653] transition-colors duration-300">
                        {market.alt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegratedSolutionsSection;