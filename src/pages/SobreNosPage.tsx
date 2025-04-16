import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Award, Target, Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

const SobreNosPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Sobre Nós | RLS Automação Industrial';
  }, []);

  return (
    <Layout pageTitle="Sobre Nós">
      {/* Hero Banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-r from-primary-800 to-secondary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sobre a RLS Automação Industrial
            </motion.h1>
            <motion.p 
              className="text-xl text-primary-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Somos especialistas em automação industrial, dedicados a transformar processos produtivos com tecnologia de ponta e soluções personalizadas há mais de 30 anos.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Nossa <span className="text-primary-600">História</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Fundada há mais de 30 anos em Portugal, a RLS Automação Industrial nasceu com a missão de fornecer soluções inovadoras de automação industrial para empresas portuguesas e europeias. O que começou como uma pequena equipe de engenheiros apaixonados por tecnologia cresceu para se tornar uma referência no setor.
              </p>
              <p className="text-gray-600 mb-6">
                Sediada em Sintra, Lisboa, nossa empresa tem orgulho de atender clientes em todo Portugal e internacionalmente, oferecendo serviços de excelência em automação e controle de processos industriais.
              </p>
              <p className="text-gray-600">
                Ao longo das décadas, expandimos nossas competências e portfólio de soluções, sempre focados em ajudar nossos clientes a alcançar maior eficiência, qualidade e competitividade através da automação inteligente.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/images/company-team.jpg" 
                  alt="Equipe RLS Automação Industrial" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white font-bold">Equipe RLS Automação Industrial</div>
                  <div className="text-white/80 text-sm">Unidos pela inovação e excelência há mais de 30 anos</div>
                </div>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-10 -right-10 bg-white rounded-xl shadow-lg p-4 w-48">
                <div className="text-2xl font-bold text-primary-600 mb-1">+1000</div>
                <div className="text-gray-700 text-sm">Projetos entregues com sucesso</div>
              </div>
              
              <div className="absolute -top-10 -left-10 bg-white rounded-xl shadow-lg p-4 w-48">
                <div className="text-2xl font-bold text-secondary-600 mb-1">+30 anos</div>
                <div className="text-gray-700 text-sm">De experiência no mercado</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Nossos <span className="text-primary-600">Valores</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Princípios que orientam nossas ações e decisões ao longo de mais de três décadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Inovação",
                description: "Buscamos constantemente novas tecnologias e abordagens para oferecer soluções de ponta aos nossos clientes em Portugal e internacionalmente.",
                icon: <Target className="text-primary-600" size={36} />
              },
              {
                title: "Excelência",
                description: "Comprometidos com a qualidade superior em tudo que fazemos, desde o projeto até o suporte pós-implementação, seguindo os mais altos padrões europeus.",
                icon: <Award className="text-primary-600" size={36} />
              },
              {
                title: "Colaboração",
                description: "Trabalhamos em estreita parceria com nossos clientes para entender suas necessidades e desenvolver soluções personalizadas para o mercado português.",
                icon: <Users className="text-primary-600" size={36} />
              },
              {
                title: "Responsabilidade",
                description: "Assumimos a responsabilidade pelos resultados, garantindo que cada projeto entregue gere valor real para o cliente e seja sustentável a longo prazo.",
                icon: <Briefcase className="text-primary-600" size={36} />
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Por que escolher a <span className="text-primary-600">RLS Automação Industrial</span>
              </h2>
              <p className="text-gray-600 mb-8">
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
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
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
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden shadow-md h-48">
                    <img 
                      src="/images/automation-1.jpg" 
                      alt="Automação Industrial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md h-64">
                    <img 
                      src="/images/automation-2.jpg" 
                      alt="Automação Industrial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="rounded-lg overflow-hidden shadow-md h-64">
                    <img 
                      src="/images/automation-3.jpg" 
                      alt="Automação Industrial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md h-48">
                    <img 
                      src="/images/automation-4.jpg" 
                      alt="Automação Industrial" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Nossos <span className="text-primary-600">Parceiros</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trabalhamos com os melhores fornecedores de tecnologia europeus e globais para garantir soluções de alta qualidade.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {['Siemens', 'Allen-Bradley', 'ABB', 'Schneider', 'Mitsubishi', 'Omron'].map((partner, index) => (
              <motion.div
                key={partner}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center h-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <div className="text-xl font-bold text-gray-800">{partner}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Vamos trabalhar juntos?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Entre em contato para conhecer melhor nosso trabalho e descobrir como podemos ajudar a sua empresa em Portugal ou internacionalmente.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="white"
              size="lg"
              to="/contato"
              icon={<ArrowRight size={18} />}
            >
              Fale conosco
            </Button>
            <Button
              variant="ghost"
              size="lg"
              to="/solucoes"
              className="border-2 border-white text-white"
            >
              Conhecer soluções
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SobreNosPage;