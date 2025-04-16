import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = 'Página Não Encontrada | RLS Automação';
  }, []);

  return (
    <Layout pageTitle="Página Não Encontrada">
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Página Não Encontrada
            </h2>
            
            <p className="text-lg text-gray-600 max-w-lg mx-auto mb-10">
              A página que você está procurando pode ter sido removida, renomeada ou talvez nunca tenha existido.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="primary"
                size="lg"
                to="/"
                icon={<Home size={18} />}
                iconPosition="left"
              >
                Voltar para o início
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                icon={<ArrowLeft size={18} />}
                iconPosition="left"
              >
                Voltar para página anterior
              </Button>
            </div>
          </motion.div>
          
          <div className="mt-16">
            <p className="text-gray-600">
              Não encontrou o que procurava? {' '}
              <Link to="/contato" className="text-primary-600 font-medium hover:text-primary-700">
                Entre em contato conosco
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;