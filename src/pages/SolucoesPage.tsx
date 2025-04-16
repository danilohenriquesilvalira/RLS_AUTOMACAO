// src/pages/SolucoesPage.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import solutionsDetailsData from '@/data/solutionsDetailsData';

const SolucoesPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Nossas Soluções | RLS Automação';
  }, []);

  return (
    <Layout pageTitle="Nossas Soluções">
      {/* Hero Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Soluções em Automação Industrial
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Tecnologias avançadas para otimizar seus processos produtivos, aumentar a eficiência operacional e impulsionar sua competitividade no mercado.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                variant="white"
                size="lg"
                to="/contato"
                icon={<ArrowRight size={18} />}
              >
                Solicitar consultoria gratuita
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Nosso <span className="text-primary-600">Portfólio</span> de Soluções
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos um conjunto completo de tecnologias e serviços para diversos setores industriais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionsDetailsData.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48">
                    <img 
                      src={solution.image} 
                      alt={solution.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${solution.color} text-white mr-3`}>
                          <Icon size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{solution.shortDescription}</p>
                    <div className="space-y-2 mb-6">
                      {solution.services.slice(0, 3).map((service, i) => (
                        <div key={i} className="flex items-start">
                          <div className={`min-w-5 h-5 rounded-full flex items-center justify-center ${solution.color} text-white mr-2 mt-0.5`}>
                            <Check size={12} />
                          </div>
                          <span className="text-gray-700 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                    <Link 
                      to={`/solucoes/${solution.id}`}
                      className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 transition-colors"
                    >
                      Ver detalhes <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para impulsionar sua produção?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para uma consulta personalizada e descubra como nossas soluções podem transformar seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="white"
              size="lg"
              to="/contato"
              icon={<ArrowRight size={18} />}
            >
              Solicitar orçamento
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolucoesPage;