// src/components/sections/home/FeaturesSection.tsx
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Server, Globe, BarChart3, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import { gsap } from 'gsap';

const FeaturesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  useEffect(() => {
    // Animação de entrada para cards com GSAP
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.feature-card');
      
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  const features = [
    {
      title: "Integração Perfeita",
      description: "Sistemas que se comunicam com sua infraestrutura existente, sem necessidade de substituição completa.",
      icon: <Server className="text-primary-600" size={32} />,
      color: "bg-primary-50 border-primary-200"
    },
    {
      title: "Controle Remoto",
      description: "Acesso a seus sistemas de qualquer lugar, através de plataformas seguras baseadas em nuvem.",
      icon: <Globe className="text-secondary-600" size={32} />,
      color: "bg-secondary-50 border-secondary-200"
    },
    {
      title: "Análise de Dados",
      description: "Transforme dados em insights acionáveis com nossa plataforma de análise avançada.",
      icon: <BarChart3 className="text-accent-600" size={32} />,
      color: "bg-accent-50 border-accent-200"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-1 rounded-full bg-accent-100 text-accent-700 font-medium text-sm mb-6"
          >
            Nossa Tecnologia
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            O que nos <span className="text-primary-600">diferencia</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Combinamos hardware robusto com software inteligente para criar soluções de automação de última geração.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`feature-card rounded-xl p-6 border shadow-sm ${feature.color}`}
            >
              <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center bg-white shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              <div className="mt-6">
                <a href="#" className="text-primary-600 font-medium flex items-center hover:text-primary-800 transition-colors">
                  Saiba mais <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16">
          <Card animate={true} className="p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Eficiência Operacional Comprovada</h3>
                <p className="text-gray-600 mb-4">
                  Nossos clientes relatam melhorias significativas após a implementação de nossas soluções de automação.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-3xl font-bold text-primary-600">+35%</div>
                    <div className="text-gray-500">Produtividade</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary-600">-40%</div>
                    <div className="text-gray-500">Tempo de inatividade</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent-600">+28%</div>
                    <div className="text-gray-500">Qualidade do produto</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary-600">-25%</div>
                    <div className="text-gray-500">Custos operacionais</div>
                  </div>
                </div>
                <a href={`${import.meta.env.BASE_URL}casos-de-sucesso`} className="text-primary-600 font-medium flex items-center hover:text-primary-800 transition-colors">
                  Ver todos os casos de sucesso <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
              <div className="relative h-64 md:h-full">
                <div className="relative h-full w-full rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={`${import.meta.env.BASE_URL}images/dashboard-example.avif`} 
                    alt="Dashboard de monitoramento industrial" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-800">Dashboard de monitoramento</div>
                    <div className="text-xs text-gray-500">Visualização em tempo real de KPIs industriais</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;