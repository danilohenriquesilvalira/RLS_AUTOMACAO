import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const CtaSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-700 z-0" />
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/5 rounded-full -mr-20 -mb-20" />
        <div className="absolute left-0 top-0 w-64 h-64 bg-white/5 rounded-full -ml-10 -mt-10" />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-500/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Pronto para transformar sua indústria?
          </h2>
          <p className="text-xl text-primary-100 mb-10">
            Entre em contato para uma avaliação personalizada e descubra como nossas soluções podem otimizar seus processos industriais.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              variant="white"
              size="lg"
              to="/contato"
              icon={<ArrowRight size={18} />}
              className="shadow-xl"
            >
              Fale com um especialista
            </Button>
            <Button
              variant="ghost"
              size="lg"
              to="/solucoes"
              className="border-2 border-white/60 text-white hover:bg-white/10"
            >
              Conhecer soluções
            </Button>
          </div>
          
          <div className="mt-12 pt-12 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Atendimento rápido', value: 'Em até 24h' },
              { label: 'Orçamento personalizado', value: 'Para sua necessidade' },
              { label: 'Implementação', value: 'Equipe especializada' },
              { label: 'Suporte contínuo', value: 'Pós-implementação' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                className="text-center"
              >
                <div className="text-white font-medium mb-1">{item.label}</div>
                <div className="text-primary-200 text-sm">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;