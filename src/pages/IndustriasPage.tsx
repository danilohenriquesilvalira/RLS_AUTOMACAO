// src/pages/IndustriasPage.tsx
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import industriesDetailsData from '@/data/industriesDetailsData';

const IndustriasPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Indústrias Atendidas | RLS Automação';
  }, []);

  return (
    <Layout pageTitle="Indústrias Atendidas">
      {/* Hero Banner com SVG de fundo - MODERNIZADO */}
      <div className="relative bg-[#0b1033]"> {/* Cor alterada para combinar com o padrão */}
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
            backgroundImage: "url('/images/industries/Imagem_topo.svg')",
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
                Soluções para{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                  Diversos Setores Industriais
                </span>
              </motion.h1>
              
              {/* Subtítulo adicionado para melhor contexto */}
              <motion.p
                className="text-xl text-white/90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Fornecemos tecnologia avançada adaptada aos desafios específicos de cada setor industrial.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Grid - MANTIDO EXATAMENTE IGUAL, apenas com ajustes de cor para verde */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Nossos <span className="text-green-600">Setores</span> de Atuação
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conhecemos profundamente os desafios específicos de cada indústria e desenvolvemos soluções sob medida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesDetailsData.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48">
                    <img 
                      src={industry.image} 
                      alt={industry.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${industry.color} text-white mr-3`}>
                          <Icon size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white">{industry.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{industry.shortDescription}</p>
                    <div className="space-y-2 mb-6">
                      {industry.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <div className={`min-w-5 h-5 rounded-full flex items-center justify-center ${industry.color} text-white mr-2 mt-0.5`}>
                            <Check size={12} />
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link 
                      to={`/industrias/${industry.id}`}
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

      {/* Call to action - Cor alterada para vermelho para combinar com o botão padrão */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
        {/* Padrão de pontos */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
        
        {/* Linhas decorativas horizontais */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent absolute top-[30%]"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent absolute top-[70%]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Vamos resolver os desafios da sua indústria</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nossas soluções podem ser adaptadas para atender às necessidades específicas do seu setor.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="white"
              size="lg"
              to="/contato"
              icon={<ArrowRight size={18} />}
              className="group"
            >
              <span className="relative z-10">Agendar uma demonstração</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-100 to-white rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndustriasPage;