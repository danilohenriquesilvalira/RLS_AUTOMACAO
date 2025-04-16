// src/components/sections/home/StatsSection.tsx
import { motion } from 'framer-motion';

const StatsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                value: '+30', 
                label: 'Anos de experiência', 
                description: 'Atuando no mercado industrial' 
              },
              { 
                value: '+800', 
                label: 'Projetos entregues', 
                description: 'Em diversos setores industriais' 
              },
              { 
                value: '+95%', 
                label: 'Satisfação do cliente', 
                description: 'Avaliação média dos nossos serviços' 
              },
              { 
                value: '24/7', 
                label: 'Suporte técnico', 
                description: 'Assistência contínua aos clientes' 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="font-bold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;