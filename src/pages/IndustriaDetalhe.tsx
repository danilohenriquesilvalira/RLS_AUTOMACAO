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
      {/* Hero Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link to="/industrias" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
              <ArrowLeft size={18} className="mr-2" /> Voltar para indústrias
            </Link>
          </div>
          <div className="max-w-3xl">
            <motion.div 
              className="flex items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`w-14 h-14 rounded-full ${industry.color} text-white flex items-center justify-center mr-4`}>
                <Icon size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {industry.title}
              </h1>
            </motion.div>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {industry.description}
            </motion.p>
          </div>
        </div>
      </section>

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
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Soluções para {industry.title}</h2>
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
                          <div className={`min-w-6 h-6 rounded-full flex items-center justify-center ${industry.color} text-white mr-3 mt-0.5`}>
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
                    icon={<ArrowRight size={18} />}
                    className={industry.color}
                  >
                    Fale com um especialista
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={industry.image} 
                      alt={industry.title} 
                      className="w-full h-full object-cover"
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

            {/* CTA Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Precisa de soluções para sua indústria?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Entre em contato para discutir como nossas soluções de automação podem atender às necessidades específicas de sua operação.
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  to="/contato"
                  icon={<ArrowRight size={18} />}
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