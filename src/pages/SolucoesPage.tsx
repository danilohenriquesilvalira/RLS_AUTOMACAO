// src/pages/SolucoesPage.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
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
      {/* Hero Banner com SVG de fundo - MELHORADO */}
      <div className="relative bg-[#0b1033]">
        {/* Padrão de pontos como no footer */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        {/* Background SVG com responsividade aprimorada - TAMANHO AUMENTADO */}
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/solutions/Imagem_Topo.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center center", // Melhor posicionamento
            backgroundRepeat: "no-repeat",
            zIndex: 0,
            opacity: 0.9 // Melhor visibilidade
          }}
        ></div>
        
        {/* Gradiente sutil para melhor contraste e leitura */}
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
        
        {/* Conteúdo com camada própria para garantir visibilidade - ALTURA AUMENTADA */}
        <div className="relative z-10 pt-32 pb-20 md:pt-44 md:pb-32 text-white min-h-[450px]"> {/* Altura e padding aumentados */}
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6" // Tamanho de fonte aumentado
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Soluções em{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                  Automação Industrial
                </span>
              </motion.h1>
              
              {/* Subtítulo adicionado para melhor contexto */}
              <motion.p
                className="text-xl text-white/90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Transforme sua indústria com tecnologias avançadas e processos otimizados para a era digital.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Grid - MANTIDO EXATAMENTE IGUAL */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Nosso <span className="text-green-600">Portfólio</span> de Soluções
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
                      className="inline-flex items-center text-green-600 font-medium hover:text-green-800 transition-colors"
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
    </Layout>
  );
};

export default SolucoesPage;
