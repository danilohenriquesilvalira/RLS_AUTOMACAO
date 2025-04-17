import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award, 
  Target, 
  Briefcase, 
  Calendar,
  BarChart3,
  FileCheck
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

// Interfaces para as props dos componentes
interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

// Componente para contar números - versão melhorada para garantir a exibição
const CountUp: React.FC<CountUpProps> = ({ end, duration = 2, className = "", prefix = "", suffix = "" }) => {
  const [count, setCount] = useState<number>(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    // Iniciar a contagem imediatamente quando o componente for montado, sem depender da visualização
    let startTime: number | null = null;
    let animationFrame: number | null = null;
    
    // Função para animar a contagem
    const updateCount = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Atualizar o contador baseado no progresso
      setCount(Math.floor(progress * end));
      
      // Continuar a animação até completar
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    // Iniciar a animação
    animationFrame = requestAnimationFrame(updateCount);
    
    // Limpar a animação quando o componente for desmontado
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);
  
  return (
    <span ref={nodeRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

// Componente Estatística Moderna
const StatCard: React.FC<{
  icon: React.ReactNode;
  value: number;
  label: string;
  delay?: number;
  suffix?: string;
  gradient?: string;
}> = ({ icon, value, label, delay = 0, suffix = "", gradient = "from-blue-500 to-blue-600" }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl shadow-xl bg-white border border-gray-100"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.7, 
        delay, 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      }}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
    >
      {/* Decoração superior */}
      <div className={`h-2 w-full bg-gradient-to-r ${gradient} absolute top-0 left-0 right-0`}></div>
      
      {/* Conteúdo */}
      <div className="p-8 pt-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-md`}>
            {icon}
          </div>
          
          <div className="text-right">
            <div className="text-5xl font-bold text-gray-800 flex items-baseline">
              <CountUp 
                end={value} 
                duration={2.5} 
                suffix={suffix}
              />
            </div>
          </div>
        </div>
        
        <div className="uppercase tracking-wider text-sm font-semibold text-gray-500">
          {label}
        </div>
        
        {/* Efeito decorativo */}
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50"></div>
      </div>
    </motion.div>
  );
};

const SobreNosPage: React.FC = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Sobre Nós | RLS Automação Industrial';
  }, []);

  return (
    <Layout pageTitle="Sobre Nós">
      {/* Hero Banner simplificado sem bolhas e sem onda */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-[#343b91] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.span 
              className="inline-block py-1 px-3 rounded-full text-xs md:text-sm font-medium bg-white/20 text-white mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Desde 1979
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Sobre a RLS Automação Industrial
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Somos especialistas em automação industrial e sistemas elétricos, dedicados a transformar processos produtivos com tecnologia de ponta e soluções personalizadas há mais de três décadas.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="primary"
                size="lg"
                to="/contato"
                icon={<ArrowRight size={18} />}
              >
                Conheça nossos projetos
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Introduction com Stats */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 font-medium text-sm mb-6">
                Nossa História
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Mais de três décadas de <span className="text-primary-600">inovação e excelência</span>
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fundada em 1979, a RLS Automação Industrial nasceu com a missão de fornecer soluções avançadas de automação industrial e sistemas elétricos para empresas portuguesas e europeias. O que começou como uma pequena equipe de especialistas em tecnologia cresceu para se tornar uma referência no setor.
              </p>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Com sede em Sintra, Lisboa, nossa empresa tem orgulho de atender clientes em todo Portugal e internacionalmente, combinando expertise técnica com atendimento personalizado para entregas soluções que realmente fazem a diferença.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                Ao longo das décadas, expandimos nossas competências e portfólio de soluções, sempre focados em ajudar nossos clientes a alcançar maior eficiência, qualidade e competitividade através da automação inteligente e sistemas elétricos de alta performance.
              </p>
            </motion.div>
            
            <div>
              {/* Stats Grid - Versão Ultra Moderna e Impactante */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatCard 
                  icon={<Calendar size={28} />} 
                  value={36} 
                  label="Anos de experiência" 
                  gradient="from-blue-500 to-blue-700"
                />
                
                <StatCard 
                  icon={<Users size={28} />} 
                  value={100} 
                  label="Colaboradores" 
                  delay={0.1}
                  gradient="from-indigo-500 to-indigo-700"
                />
                
                <StatCard 
                  icon={<BarChart3 size={28} />} 
                  value={134} 
                  label="Projetos ativos" 
                  delay={0.2}
                  gradient="from-cyan-500 to-cyan-700"
                />
                
                <StatCard 
                  icon={<FileCheck size={28} />} 
                  value={15} 
                  label="Certificados" 
                  delay={0.3}
                  gradient="from-emerald-500 to-emerald-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - VERSÃO COMPACTA COMPLETA SEM SCROLL - SEM BOLHAS */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 font-medium text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              1979 - 2025
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-4 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Nossa <span className="text-primary-600">Trajetória</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Desde 1979, pioneira no desenvolvimento de soluções de automação industrial e sistemas elétricos para diversos setores
            </motion.p>
          </div>

          {/* Timeline Horizontal Responsiva Completa */}
          <div className="max-w-6xl mx-auto relative">
            {/* Versão mobile - scrollável horizontalmente */}
            <div className="md:hidden overflow-x-auto pb-8">
              <div className="flex space-x-8 min-w-max relative px-4">
                {/* Linha horizontal mobile */}
                <div className="absolute left-4 right-4 top-4 h-0.5 bg-blue-100"></div>
                
                {/* Linha animada mobile */}
                <motion.div 
                  className="absolute left-4 right-4 top-4 h-0.5 bg-primary-500 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2 }}
                ></motion.div>
                
                {[
                  {
                    year: "1979",
                    text: "Fundação com foco em sistemas de automação para indústria têxtil.",
                    delay: 0
                  },
                  {
                    year: "1985",
                    text: "Expansão para projetos de quadros elétricos industriais.",
                    delay: 0.1
                  },
                  {
                    year: "1993",
                    text: "Implementação de sistemas SCADA para monitoramento industrial.",
                    delay: 0.2
                  },
                  {
                    year: "2006",
                    text: "Especialização em automação de edifícios e sistemas de segurança.",
                    delay: 0.3
                  },
                  {
                    year: "2015",
                    text: "Desenvolvimento de soluções IoT para indústria 4.0.",
                    delay: 0.4
                  },
                  {
                    year: "2025",
                    text: "Referência em projetos de automação e eficiência energética.",
                    delay: 0.5
                  }
                ].map((item, index) => (
                  <div key={index} className="w-48 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: item.delay }}
                      className="flex flex-col items-center"
                    >
                      {/* Marcador */}
                      <motion.div 
                        className="w-4 h-4 bg-primary-600 mb-3 -mt-4 relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: item.delay }}
                      ></motion.div>
                      
                      {/* Ano */}
                      <div className="font-bold text-lg text-primary-600 mb-2">{item.year}</div>
                      
                      {/* Texto */}
                      <p className="text-gray-700 text-xs">
                        {item.text}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Versão desktop - grid */}
            <div className="hidden md:block relative">
              {/* Linha horizontal desktop */}
              <div className="absolute left-0 right-0 top-0 h-0.5 bg-blue-100"></div>
              
              {/* Linha animada desktop */}
              <motion.div 
                className="absolute left-0 right-0 top-0 h-1 bg-primary-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2 }}
              ></motion.div>
              
              {/* Timeline Itens em Grid responsivo */}
              <div className="grid grid-cols-6 gap-2 md:gap-6">
                {[
                  {
                    year: "1979",
                    text: "Fundação com foco em sistemas de automação para indústria têxtil.",
                    delay: 0
                  },
                  {
                    year: "1985",
                    text: "Expansão para projetos de quadros elétricos industriais.",
                    delay: 0.1
                  },
                  {
                    year: "1993",
                    text: "Implementação de sistemas SCADA para monitoramento industrial.",
                    delay: 0.2
                  },
                  {
                    year: "2006",
                    text: "Especialização em automação de edifícios e sistemas de segurança.",
                    delay: 0.3
                  },
                  {
                    year: "2015",
                    text: "Desenvolvimento de soluções IoT para indústria 4.0.",
                    delay: 0.4
                  },
                  {
                    year: "2025",
                    text: "Referência em projetos de automação e eficiência energética.",
                    delay: 0.5
                  }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: item.delay }}
                      className="flex flex-col items-center"
                    >
                      {/* Marcador */}
                      <motion.div 
                        className="w-4 h-4 bg-primary-600 mb-3 relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: item.delay }}
                      ></motion.div>
                      
                      {/* Ano */}
                      <div className="font-bold text-lg md:text-xl text-primary-600 mb-2">{item.year}</div>
                      
                      {/* Texto */}
                      <p className="text-gray-700 text-xs md:text-sm">
                        {item.text}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Global Presence Map - Nova seção para o mapa mundial */}
          <motion.div 
            className="mt-28 mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-10">
              <motion.h3 
                className="text-3xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Presença <span className="text-primary-600">Internacional</span>
              </motion.h3>
              
              <motion.p 
                className="text-lg text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Nossos projetos de automação e sistemas elétricos estão presentes em diversos países ao redor do mundo
              </motion.p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Imagem do mapa */}
              <motion.div 
                className="relative overflow-hidden rounded-lg shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="/images/Mapa.png" 
                  alt="Mapa de presença global da RLS Automação" 
                  className="w-full h-auto"
                />
              </motion.div>
              
              {/* Legenda */}
              <motion.div 
                className="flex items-center justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
                  <span className="text-gray-600 text-sm">Projetos realizados</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values - Versão moderna com cards interativos */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 font-medium text-sm mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              O que nos define
            </motion.span>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Nossos <span className="text-primary-600">Valores</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Princípios que orientam nossas ações e decisões ao longo de mais de três décadas.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Inovação",
                description: "Buscamos constantemente novas tecnologias e abordagens para oferecer soluções de ponta aos nossos clientes em Portugal e internacionalmente.",
                icon: <Target className="text-primary-600" size={36} />,
                delay: 0
              },
              {
                title: "Excelência",
                description: "Comprometidos com a qualidade superior em tudo que fazemos, desde o projeto até o suporte pós-implementação, seguindo os mais altos padrões europeus.",
                icon: <Award className="text-primary-600" size={36} />,
                delay: 0.1
              },
              {
                title: "Colaboração",
                description: "Trabalhamos em estreita parceria com nossos clientes para entender suas necessidades e desenvolver soluções personalizadas para o mercado português.",
                icon: <Users className="text-primary-600" size={36} />,
                delay: 0.2
              },
              {
                title: "Responsabilidade",
                description: "Assumimos a responsabilidade pelos resultados, garantindo que cada projeto entregue gere valor real para o cliente e seja sustentável a longo prazo.",
                icon: <Briefcase className="text-primary-600" size={36} />,
                delay: 0.3
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-full group relative border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: value.delay, duration: 0.6, type: "spring" }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Top border */}
                <div className="h-2 w-full bg-primary-600"></div>
                
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials - Design moderno com elementos visuais */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.span 
                className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 font-medium text-sm mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Por que nos escolher
              </motion.span>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Por que escolher a <span className="text-primary-600">RLS Automação Industrial</span>
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Com base em Portugal e mais de 30 anos de experiência, combinamos conhecimento técnico, experiência prática e compromisso com resultados para entregar soluções que realmente fazem a diferença para nossos clientes em toda a Europa.
              </p>
              
              <div className="space-y-6">
                {[
                  "Equipe portuguesa altamente especializada em automação industrial",
                  "Soluções personalizadas para cada cliente e setor, adaptadas à realidade portuguesa",
                  "Suporte técnico contínuo e responsivo em todo o território nacional",
                  "Tecnologias de ponta com parceiros globais e certificações europeias",
                  "Mais de 30 anos de experiência no mercado português e internacional"
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="bg-primary-50 rounded-full p-1 mr-4 flex-shrink-0">
                      <CheckCircle className="text-primary-600" size={20} />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-10">
                <Button
                  variant="primary"
                  size="lg"
                  to="/contato"
                  icon={<ArrowRight size={18} />}
                >
                  Entre em contato
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="space-y-6"
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="rounded-xl overflow-hidden shadow-xl h-48 transform group hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/automation-1.jpg" 
                      alt="Automação Industrial" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-xl h-64 transform group hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/automation-2.jpg" 
                      alt="Automação Industrial" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="space-y-6 mt-12"
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="rounded-xl overflow-hidden shadow-xl h-64 transform group hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/automation-3.jpg" 
                      alt="Automação Industrial" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-xl h-48 transform group hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/automation-4.jpg" 
                      alt="Automação Industrial" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SobreNosPage;