// src/components/sections/home/CustomAutomationSection.tsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ExternalLink,
  CheckCircle,
  LucideIcon,
  Cpu,
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Globe,
  ThumbsUp,
  Workflow,
  BrainCircuit,
  Cog,
  Menu,
  X
} from 'lucide-react';
import { 
  automationFeatures, 
  techPillars, 
  techStacks 
} from '@/data/dataAutomationSection';
import { CountUp } from '@/components/ui/CountUp';

// Interface para dados do gráfico
interface ChartData {
  label: string;
  value: number;
}

// Componente para gráfico de pizza animado
const AnimatedPieChart: React.FC<{
  data: ChartData[];
  colors: string[];
}> = ({ data, colors }) => {
  // Lógica para renderizar um gráfico de pizza SVG animado
  const total = data.reduce((acc: number, item: ChartData) => acc + item.value, 0);
  let startAngle = 0;
  
  return (
    <div className="relative w-full h-44 sm:h-52 md:h-64">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {data.map((item: ChartData, index: number) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const endAngle = startAngle + angle;
          
          // Cálculo do arco SVG
          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          
          const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
          
          // Armazenar o ângulo inicial para o próximo segmento
          startAngle = endAngle;
          
          return (
            <motion.path
              key={index}
              d={pathData}
              fill={colors[index % colors.length]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          );
        })}
      </svg>
      
      {/* Legenda */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-x-2 gap-y-1 sm:gap-x-4 sm:gap-y-2">
        {data.map((item: ChartData, index: number) => (
          <div key={index} className="flex items-center text-xs sm:text-sm">
            <div 
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1" 
              style={{ backgroundColor: colors[index % colors.length] }} 
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para exibir métricas de forma animada
const MetricCard: React.FC<{
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  color?: string;
}> = ({ icon: Icon, value, label, suffix = '', color = 'green' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border-t-4 border-${color}-500 h-full flex flex-col`}
    >
      <div className="flex items-start">
        <div className={`p-2 sm:p-3 rounded-lg bg-${color}-50 mr-2 sm:mr-3 md:mr-4`}>
          {Icon && <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-${color}-500`} />}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl md:text-3xl font-bold mb-0.5 sm:mb-1 flex items-end">
            <CountUp end={value} duration={2.5} />
            <span className="ml-1 text-gray-500">{suffix}</span>
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Timeline do processo de implementação
const ImplementationTimeline: React.FC = () => {
  const steps = [
    { 
      title: "Análise de Requisitos",
      description: "Entendemos profundamente seu processo e necessidades específicas",
      icon: Users,
      color: "blue"
    },
    { 
      title: "Design da Solução",
      description: "Arquitetura personalizada alinhada às suas metas de negócio",
      icon: Cpu,
      color: "purple"
    },
    { 
      title: "Implementação",
      description: "Desenvolvimento e integração com sistemas existentes",
      icon: Cog,
      color: "indigo"
    },
    { 
      title: "Testes e Validação",
      description: "Verificação rigorosa de todos os aspectos da solução",
      icon: CheckCircle,
      color: "green"
    },
    { 
      title: "Treinamento",
      description: "Capacitação da sua equipe para máximo aproveitamento",
      icon: Award,
      color: "yellow"
    },
    { 
      title: "Suporte Contínuo",
      description: "Acompanhamento e otimização constante do sistema",
      icon: ThumbsUp,
      color: "red"
    }
  ];

  return (
    <div className="relative mx-auto max-w-3xl py-8 sm:py-12">
      {/* Linha central visível apenas em telas médias e maiores */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block"></div>
      
      {steps.map((step, index) => {
        const isEven = index % 2 === 0;
        const StepIcon = step.icon;
        
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center mb-8 sm:mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Em dispositivos móveis: layout vertical */}
            <div className={`w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left ${isEven ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
              <div className="z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-4 border-gray-200 mb-3 sm:mb-4 md:hidden">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-${step.color}-100`}>
                  <StepIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-${step.color}-600`} />
                </div>
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-${step.color}-600`}>
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            
            {/* Indicador de passo visível apenas em telas médias e maiores */}
            <div className="z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-gray-200">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${step.color}-100`}>
                <StepIcon className={`w-4 h-4 text-${step.color}-600`} />
              </div>
            </div>
            
            <div className="hidden md:block md:w-1/2"></div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Componente principal
const CustomAutomationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [activeTechStack, setActiveTechStack] = useState<string>('Controladores e PLCs');
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('tech-pillars'); // Para a navegação entre abas
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Referência para detectar dispositivos móveis
  const isMobile = useRef<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  
  // Efeito para detectar quando a seção está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Reduzido para melhor detecção em telas menores
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Efeito para detectar dispositivos móveis
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
      // Não fechar automaticamente o menu ao redimensionar, pode interromper a experiência do usuário
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dados para métricas
  const metrics = [
    { icon: Globe, value: 30, label: "Anos de experiência", suffix: "+", color: "blue" },
    { icon: TrendingUp, value: 98, label: "Taxa de sucesso em projetos", suffix: "%", color: "green" },
    { icon: BarChart3, value: 40, label: "Aumento médio de eficiência", suffix: "%", color: "purple" },
    { icon: Users, value: 500, label: "Clientes satisfeitos", suffix: "+", color: "red" },
  ];

  // Dados para o gráfico
  const chartData: ChartData[] = [
    { label: "Eficiência", value: 40 },
    { label: "Qualidade", value: 25 },
    { label: "Custos", value: 20 },
    { label: "Tempo", value: 15 }
  ];
  
  const chartColors: string[] = ["#2ecc71", "#3498db", "#9b59b6", "#e74c3c"];

  // Animações para o conteúdo principal
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animações para o pilar selecionado
  const pillarDetailVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };
  
  // Função para lidar com o clique em um pilar tecnológico
  const handlePillarClick = (id: string) => {
    setSelectedPillarId(id === selectedPillarId ? null : id);
  };

  // Encontrar o pilar selecionado
  const selectedPillar = techPillars.find(pillar => pillar.id === selectedPillarId);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white"
      id="diferenciais"
    >
      {/* Header com fundo branco */}
      <div className="relative bg-white w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pt-10 sm:pt-16 md:pt-24 pb-6 sm:pb-8 md:pb-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight"
            >
              Soluções Tecnológicas para a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Indústria 4.0
              </span>
              <div className="w-12 sm:w-16 md:w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-3 sm:mt-4 md:mt-6"></div>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 px-1"
            >
              Transformamos operações industriais através de tecnologias avançadas, com 30 anos de experiência
              e foco na convergência IT/OT para impulsionar eficiência, confiabilidade e inovação.
            </motion.p>
            
            {/* Botão call-to-action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-3 sm:mt-4"
            >
              <a href="#consulta-gratuita">
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-4 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Agende uma Consulta Gratuita
                  <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Métricas em cards com contagem animada */}
      <div className="relative z-10 mb-6 sm:mb-8 md:mb-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
            {metrics.map((metric, idx) => (
              <MetricCard 
                key={idx}
                icon={metric.icon}
                value={metric.value}
                label={metric.label}
                suffix={metric.suffix}
                color={metric.color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Container dos cards principais sem efeito flutuante */}
      <div className="relative z-10 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col lg:flex-row gap-4 sm:gap-5"
          >
            {automationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex-1 bg-white rounded-xl border border-gray-200 shadow-md p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col h-full"
                >
                  <div className="mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 inline-block rounded-xl relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl"></div>
                    <div className="relative">
                      {Icon && (
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-green-600" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-green-600 text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  
                  {/* Lista de benefícios com estilo simplificado */}
                  {feature.benefits && (
                    <div className="mb-3 sm:mb-4 md:mb-6">
                      <h4 className="text-gray-900 font-semibold mb-1 sm:mb-2 md:mb-3 text-xs sm:text-sm md:text-base">Benefícios:</h4>
                      <ul className="space-y-1 sm:space-y-2 md:space-y-3">
                        {feature.benefits.map((benefit, i) => (
                          <li 
                            key={i} 
                            className="flex items-start"
                          >
                            <div className="text-green-500 mr-1 sm:mr-2 flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-gray-700 text-xs sm:text-sm">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Tags de tecnologias - Estilo simples */}
                  <div className="mt-auto">
                    <div className="w-full h-px bg-gray-200 mb-2 sm:mb-3 md:mb-4"></div>
                    <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1 sm:mb-2 md:mb-3">Tecnologias relacionadas:</p>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                      {feature.tags.map((tag, tagIndex) => (
                        <div
                          key={`${feature.id}-tag-${tagIndex}`}
                          className="text-xs sm:text-sm font-medium px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-gray-50 rounded-full text-gray-700 border-l-2 border-green-500"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Navegação central entre seções */}
      <div className="py-6 sm:py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-center mb-6 sm:mb-8 md:mb-12">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-md overflow-hidden">
              {[
                { id: 'tech-pillars', label: 'Pilares Tecnológicos', icon: BrainCircuit },
                { id: 'implementation', label: 'Processo de Implementação', icon: Workflow }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    className={`flex items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-green-50 text-green-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">{tab.label}</span>
                    <span className="xs:hidden">{tab.id === 'tech-pillars' ? 'Pilares' : 'Processo'}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Conteúdo baseado na aba selecionada */}
          <AnimatePresence mode="wait">
            {activeTab === 'tech-pillars' && (
              <motion.div
                key="tech-pillars"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-center"
                >
                  Pilares Tecnológicos
                  <div className="w-12 sm:w-16 md:w-24 h-1 bg-green-500 mx-auto mt-2 sm:mt-3 md:mt-4"></div>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-gray-700 text-xs sm:text-sm md:text-lg mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center max-w-3xl mx-auto px-2"
                >
                  Nossa abordagem integra os elementos fundamentais da Indústria 4.0, 
                  criando um ecossistema conectado e inteligente para sua operação.
                </motion.p>
                
                {/* Grade de pilares tecnológicos com design hexagonal */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-12">
                  {techPillars.map((pillar, idx) => (
                    <motion.div
                      key={pillar.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group flex flex-col items-center text-center cursor-pointer"
                      onClick={() => handlePillarClick(pillar.id)}
                    >
                      <div className="relative mb-2 sm:mb-3 md:mb-5 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                        {/* Hexágono SVG de fundo */}
                        <svg 
                          className="absolute inset-0 w-full h-full" 
                          viewBox="0 0 100 100"
                        >
                          <path 
                            d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" 
                            fill={`${pillar.color}15`}
                            stroke={`${pillar.color}`}
                            strokeWidth="2"
                          />
                        </svg>
                        
                        {/* Ícone */}
                        <div className="relative z-10">
                          {pillar.icon && (
                            <pillar.icon
                              className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                              style={{ color: pillar.color }} 
                            />
                          )}
                        </div>
                      </div>
                      <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 group-hover:text-green-600 transition-colors duration-300 px-1">
                        {pillar.title}
                      </h3>
                    </motion.div>
                  ))}
                </div>
                
                {/* Detalhes do pilar selecionado */}
                <AnimatePresence mode="wait">
                  {selectedPillarId && selectedPillar && (
                    <motion.div
                      key={selectedPillarId}
                      variants={pillarDetailVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-white rounded-xl shadow-md border border-gray-100 p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden"
                    >
                      <div className="flex flex-col lg:flex-row items-start gap-3 sm:gap-4 md:gap-6">
                        <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-start">
                          <div 
                            className="p-3 sm:p-4 md:p-6 rounded-xl mb-2 sm:mb-3 md:mb-4 shadow-sm"
                            style={{ 
                              background: `linear-gradient(135deg, ${selectedPillar.color}15, ${selectedPillar.color}05)`,
                              borderLeft: `4px solid ${selectedPillar.color}`
                            }}
                          >
                            {selectedPillar.icon && React.createElement(selectedPillar.icon, { 
                              className: "w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16", 
                              style: { color: selectedPillar.color } 
                            })}
                          </div>
                          <h3 
                            className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center lg:text-left" 
                            style={{ color: selectedPillar.color }}
                          >
                            {selectedPillar.title}
                          </h3>
                          
                          {/* Gráfico para visualização do impacto - Visível apenas em telas grandes */}
                          <div className="hidden lg:block mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100 w-full">
                            <h4 className="text-sm font-semibold text-gray-500 mb-2">
                              Impacto nos Resultados
                            </h4>
                            <div className="space-y-3">
                              {[
                                { label: "Produtividade", value: 85 },
                                { label: "Qualidade", value: 92 },
                                { label: "Redução de Custo", value: 78 }
                              ].map((item, i) => (
                                <div key={i} className="w-full">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>{item.label}</span>
                                    <span className="font-semibold">{item.value}%</span>
                                  </div>
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: selectedPillar.color }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${item.value}%` }}
                                      transition={{ duration: 1, delay: i * 0.2 }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full lg:w-3/4">
                          <p className="text-gray-700 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed">
                            {selectedPillar.description}
                          </p>
                          
                          {/* Gráfico para visualização do impacto - Visível apenas em telas pequenas */}
                          <div className="lg:hidden mb-4 sm:mb-6 p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100 w-full">
                            <h4 className="text-sm font-semibold text-gray-500 mb-2">
                              Impacto nos Resultados
                            </h4>
                            <div className="space-y-2 sm:space-y-3">
                              {[
                                { label: "Produtividade", value: 85 },
                                { label: "Qualidade", value: 92 },
                                { label: "Redução de Custo", value: 78 }
                              ].map((item, i) => (
                                <div key={i} className="w-full">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>{item.label}</span>
                                    <span className="font-semibold">{item.value}%</span>
                                  </div>
                                  <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: selectedPillar.color }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${item.value}%` }}
                                      transition={{ duration: 1, delay: i * 0.2 }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center">
                            <span className="w-1.5 sm:w-2 h-4 sm:h-5 bg-green-500 rounded-sm mr-2"></span>
                            Principais Tecnologias
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6">
                            {selectedPillar.technologies.map((tech, techIdx) => (
                              <motion.div
                                key={`${selectedPillar.id}-tech-${techIdx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: techIdx * 0.1, duration: 0.3 }}
                                className="flex items-center bg-white rounded-lg p-1.5 sm:p-2 md:p-3 border border-gray-100 shadow-sm"
                              >
                                <div 
                                  className="w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 rounded-full mr-1.5 sm:mr-2 md:mr-3 flex-shrink-0" 
                                  style={{ backgroundColor: selectedPillar.color }}
                                ></div>
                                <span className="text-gray-800 text-xs sm:text-sm">{tech}</span>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Seção adicional com exemplos de aplicações */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center">
                              <span className="w-1.5 sm:w-2 h-4 sm:h-5 bg-green-500 rounded-sm mr-2"></span>
                              Aplicações Comuns
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 md:gap-4">
                              {[
                                "Monitoramento remoto de equipamentos",
                                "Otimização de processos produtivos",
                                "Manutenção preditiva e preventiva",
                                "Controle de qualidade automatizado",
                                "Gestão energética inteligente",
                                "Rastreabilidade completa de produtos"
                              ].map((app, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start"
                                >
                                  <div className="text-green-500 mr-1.5 sm:mr-2 mt-0.5">✓</div>
                                  <span className="text-gray-700 text-xs sm:text-sm">{app}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-3 sm:mt-4 md:mt-6">
                        <motion.button
                          onClick={() => setSelectedPillarId(null)}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center transition-colors"
                        >
                          Fechar detalhes
                          <ChevronRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
            
            {activeTab === 'implementation' && (
              <motion.div
                key="implementation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-center"
                >
                  Processo de Implementação
                  <div className="w-12 sm:w-16 md:w-24 h-1 bg-green-500 mx-auto mt-2 sm:mt-3 md:mt-4"></div>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-gray-700 text-xs sm:text-sm md:text-lg mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center max-w-3xl mx-auto px-2"
                >
                  Nossa metodologia comprovada garante entregas bem-sucedidas, 
                  minimizando riscos e maximizando o retorno sobre investimento.
                </motion.p>
                
                {/* Timeline do processo de implementação */}
                <ImplementationTimeline />
                
                {/* Abordagem adicional - Metodologia ágil */}
                <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center"
                  >
                    Nossa Abordagem Ágil para Projetos de Automação
                  </motion.h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
                    {[
                      {
                        title: "Entregas Incrementais",
                        description: "Dividimos projetos em sprints com resultados tangíveis a cada etapa, permitindo validação contínua e ajustes durante o processo.",
                        icon: TrendingUp,
                        color: "blue"
                      },
                      {
                        title: "Colaboração Constante",
                        description: "Mantemos comunicação frequente e transparente, integrando sua equipe no processo para garantir alinhamento em todas as fases.",
                        icon: Users,
                        color: "green"
                      },
                      {
                        title: "Testes Automatizados",
                        description: "Implementamos testes rigorosos desde o início, garantindo robustez e minimizando riscos em ambientes de produção.",
                        icon: CheckCircle,
                        color: "purple"
                      }
                    ].map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.2, duration: 0.5 }}
                          className="bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-md border border-gray-100"
                        >
                          <div className={`p-2 sm:p-3 md:p-4 rounded-full bg-${item.color}-50 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center mb-2 sm:mb-3 md:mb-4`}>
                            <ItemIcon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-${item.color}-500`} />
                          </div>
                          <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-3">{item.title}</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">{item.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* ROI e Benefícios */}
                  <div className="bg-gray-50 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
                      <div className="w-full lg:w-1/2">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Retorno sobre Investimento</h3>
                        <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 md:mb-6">
                          Nossos projetos são desenhados para trazer resultados tangíveis e mensuráveis. 
                          Em média, nossos clientes alcançam:
                        </p>
                        <div className="space-y-2 sm:space-y-3 md:space-y-4">
                          {[
                            { label: "Aumento de produtividade", value: "35-45%" },
                            { label: "Redução de custos operacionais", value: "20-30%" },
                            { label: "Redução de tempo de inatividade", value: "50-70%" },
                            { label: "Retorno sobre investimento", value: "12-18 meses" }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center">
                              <div className="bg-green-100 p-1 rounded-full mr-1.5 sm:mr-2 md:mr-3">
                                <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-600" />
                              </div>
                              <span className="text-gray-700 text-xs sm:text-sm font-medium">{item.label}:</span>
                              <span className="ml-1 sm:ml-1.5 md:ml-2 text-green-600 text-xs sm:text-sm font-semibold">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4">Benefícios Tangíveis</h3>
                        <AnimatedPieChart 
                          data={chartData}
                          colors={chartColors} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stack Tecnológico */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              Stack Tecnológico
              <div className="w-12 sm:w-16 md:w-24 h-1 bg-green-500 mx-auto mt-2 sm:mt-3 md:mt-4"></div>
            </h2>
            <p className="text-gray-700 text-xs sm:text-sm md:text-lg max-w-3xl mx-auto px-2">
              Nosso conjunto completo de tecnologias nos permite desenvolver soluções 
              integradas que conectam todos os níveis da sua operação industrial.
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Seletor de categorias */}
            <div className="w-full lg:w-1/4 mb-3 sm:mb-4 lg:mb-0">
              {/* Mobile menu button */}
              <div className="lg:hidden flex justify-between items-center bg-white rounded-xl p-3 shadow-md border border-gray-100 mb-2 sm:mb-3">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate pr-2">
                  {activeTechStack}
                </h3>
                <button
                  className="p-1 rounded-md hover:bg-gray-100 flex-shrink-0"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
              
              {/* Mobile dropdown menu */}
              {mobileMenuOpen && (
                <div className="lg:hidden bg-white rounded-xl shadow-md border border-gray-100 mb-3 sm:mb-4 overflow-hidden">
                  <div className="space-y-0.5 py-1">
                    {techStacks.map((stack) => (
                      <button
                        key={stack.category}
                        onClick={() => {
                          setActiveTechStack(stack.category);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm ${
                          activeTechStack === stack.category
                            ? 'bg-green-50 text-green-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {stack.category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Desktop sidebar menu */}
              <div className="hidden lg:block bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 md:p-5 shadow-md border border-gray-100 sticky top-24">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 flex items-center">
                  <div className="w-1 h-4 sm:h-5 bg-green-500 rounded-sm mr-2"></div>
                  Categorias
                </h3>
                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                  {techStacks.map((stack) => (
                    <motion.button
                      key={stack.category}
                      onClick={() => setActiveTechStack(stack.category)}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 rounded-lg transition text-xs sm:text-sm ${
                        activeTechStack === stack.category
                          ? 'bg-green-50 text-green-700 font-medium border-l-4 border-green-500'
                          : 'text-gray-700 hover:bg-gray-100 border-l-4 border-transparent'
                      }`}
                    >
                      {stack.category}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Exibição das tecnologias */}
            <div className="w-full lg:w-3/4">
              <AnimatePresence mode="wait">
                {techStacks
                  .filter((stack) => stack.category === activeTechStack)
                  .map((stack) => (
                    <motion.div
                      key={stack.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-xl border border-gray-100 shadow-md p-3 sm:p-4 md:p-6 lg:p-8"
                    >
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 flex items-center">
                        {stack.category}
                      </h3>
                      <div className="w-12 sm:w-16 md:w-20 h-1 bg-green-500 mb-2 sm:mb-3 md:mb-4"></div>
                      <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 md:mb-8">{stack.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                        {stack.items.map((item, idx) => {
                          const ItemIcon = item.icon || Cpu;
                          return (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1, duration: 0.5 }}
                              className="bg-white rounded-xl p-2.5 sm:p-3 md:p-4 lg:p-5 border border-gray-200 shadow-sm"
                            >
                              <div className="flex items-start mb-2 sm:mb-3 md:mb-4">
                                <div className="mr-2 sm:mr-2.5 md:mr-3 mt-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-green-100 text-green-600 shadow-sm">
                                  <ItemIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                                </div>
                                <div>
                                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-0.5 sm:mb-1">
                                    {item.name}
                                  </h4>
                                  {item.level && (
                                    <div className="flex items-center mt-0.5 sm:mt-1 mb-1.5 sm:mb-2">
                                      <div className="flex-grow">
                                        <motion.div 
                                          className="w-full h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                        >
                                          <motion.div 
                                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full" 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.level / 5) * 100}%` }}
                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                          />
                                        </motion.div>
                                      </div>
                                      <span className="ml-1.5 sm:ml-2 text-xs text-gray-500 font-medium">
                                        {item.level}/5
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-700 text-xs sm:text-sm">{item.description}</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* CTA final simplificado - fundo cinza claro */}
      <div className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-6"
          >
            Pronto para transformar sua operação industrial?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-700 text-xs sm:text-sm md:text-lg max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8"
          >
            Nossa equipe de especialistas está pronta para entender seus desafios e 
            desenvolver soluções personalizadas que impulsionem sua eficiência operacional.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center"
          >
            <a href="/contato" className="w-full sm:w-auto">
              <motion.span
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-4 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-green-600 hover:bg-green-700 transition-all w-full"
              >
                Fale Conosco
                <ExternalLink className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
            </a>
            <a href="/demonstracao" className="w-full sm:w-auto">
              <motion.span
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-4 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4 border border-gray-300 text-sm font-medium rounded-lg shadow-lg text-gray-700 bg-white hover:bg-gray-50 transition-all w-full"
              >
                Agendar Demonstração
                <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </motion.span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomAutomationSection;