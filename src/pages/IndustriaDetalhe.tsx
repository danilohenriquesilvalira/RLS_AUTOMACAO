// src/pages/IndustriaDetalhe.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import industriesDetailsData from '@/data/industriesDetailsData';

const IndustriaDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the current industry
  const industry = industriesDetailsData.find(ind => ind.id === id);
  
  useEffect(() => {
    // Redirect to industries page if industry not found
    if (!industry) {
      navigate('/industrias');
      return;
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = `${industry.title} | RLS Automação`;
  }, [industry, navigate]);
  
  // If industry not found
  if (!industry) {
    return null;
  }

  const Icon = industry.icon;

  return (
    <Layout pageTitle={industry.title}>
      {/* Hero Banner - MODERNIZADO */}
      <div className="relative bg-[#0b1033]"> {/* Cor alterada para combinar com o padrão */}
        {/* Padrão de pontos */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        {/* Background SVG com responsividade aprimorada */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/industries/Imagem_topo.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
            opacity: 0.9
          }}
        ></div>
        
        {/* Gradiente melhorado */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "linear-gradient(to right, rgba(11,16,51,0.8) 0%, rgba(11,16,51,0.5) 100%)",
            zIndex: 1
          }}
        ></div>
        
        {/* Linhas decorativas horizontais sutis */}
        <div className="absolute inset-0 z-1 opacity-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent absolute top-[30%]"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent absolute top-[60%]"></div>
        </div>
        
        {/* Conteúdo com camada própria para garantir visibilidade */}
        <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 text-white min-h-[400px]">
          <div className="container mx-auto px-4">
            <div className="mb-4">
              <Link to="/industrias" className="inline-flex items-center text-white/80 hover:text-white transition-colors group">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Voltar para indústrias
              </Link>
            </div>
            <div className="max-w-3xl">
              <motion.div 
                className="flex items-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-14 h-14 rounded-full ${industry.color} text-white flex items-center justify-center mr-4 shadow-lg`}>
                  <Icon size={28} />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {industry.title}
                </h1>
              </motion.div>
              <motion.p 
                className="text-xl text-white/90 mb-8" // Cor atualizada para maior consistência
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {industry.description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Case Study & Image */}
            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Soluções para <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-700">{industry.title}</span>
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {industry.description}
                  </p>
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Nossas soluções incluem:</h3>
                    <div className="space-y-3">
                      {industry.features.map((feature, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                          className="flex items-start"
                        >
                          <div className={`min-w-6 h-6 rounded-full flex items-center justify-center ${industry.color} text-white mr-3 mt-0.5 shadow-sm`}>
                            <Check size={14} />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    to="/contato"
                    icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white group"
                  >
                    Fale com um especialista
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative h-80 rounded-xl overflow-hidden shadow-lg group">
                    <img 
                      src={industry.image} 
                      alt={industry.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {industry.caseStudy && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                        <div className="text-white font-bold mb-2">Case em destaque</div>
                        <div className="text-white/90 mb-2">{industry.caseStudy.title}</div>
                        <p className="text-white/80 text-sm">{industry.caseStudy.description}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* CTA Section - MODERNIZADO */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
              {/* Padrão de pontos no fundo da CTA */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              ></div>
              
              {/* Linha decorativa */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
              
              <div className="text-center relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Precisa de soluções para sua indústria?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Entre em contato para discutir como nossas soluções de automação podem atender às necessidades específicas de sua operação.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  to="/contato"
                  icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white group"
                >
                  Solicite uma consultoria
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndustriaDetalhe;