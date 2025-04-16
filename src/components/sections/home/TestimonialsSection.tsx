import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';

interface Testimonial {
  company: string;
  logo: string;
  quote: string;
  author: string;
  position: string;
  image?: string;
  rating: number;
  location: string;
}

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Testimonial[] = [
    {
      company: "Metalúrgica Precision",
      logo: "MP",
      quote: "A implementação do sistema SCADA pela RLS Automação aumentou nossa eficiência operacional em 42% e reduziu o tempo de inatividade não planejado em quase 70%. A equipe compreendeu perfeitamente nossas necessidades e entregou uma solução personalizada de alta qualidade.",
      author: "Carlos Mendes",
      position: "Diretor de Operações",
      rating: 5,
      location: "Lisboa, Portugal"
    },
    {
      company: "Alimentos Fresh",
      logo: "AF",
      quote: "O sistema de rastreabilidade implementado pela RLS Automação nos ajudou a obter certificações internacionais e expandir nosso mercado para exportação. A solução é robusta e o suporte técnico é excelente. Recomendamos fortemente os serviços da RLS para empresas que buscam excelência em automação.",
      author: "Ana Carvalho",
      position: "Gerente de Qualidade",
      rating: 5,
      location: "Porto, Portugal"
    },
    {
      company: "Farmacêutica BioVita",
      logo: "BV",
      quote: "Precisávamos de um sistema que atendesse aos rigorosos padrões regulatórios do setor farmacêutico. A RLS Automação entregou uma solução completa que superou nossas expectativas, com validação impecável. Os 30 anos de experiência da empresa realmente se refletem na qualidade do trabalho.",
      author: "Roberto Santos",
      position: "Diretor de Tecnologia",
      rating: 5,
      location: "Braga, Portugal"
    },
    {
      company: "Logística ExpressPort",
      logo: "EP",
      quote: "Transformamos completamente nossa operação logística com as soluções da RLS Automação. O sistema de gestão de armazém automatizado reduziu nossos erros de separação em 95% e aumentou nossa capacidade de processamento. A parceria com a RLS tem sido fundamental para nosso crescimento.",
      author: "Maria Oliveira",
      position: "CEO",
      rating: 5,
      location: "Faro, Portugal"
    }
  ];

  useEffect(() => {
    // Troca automática de depoimentos
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  useEffect(() => {
    // Animação quando troca o depoimento
    if (testimonialRef.current) {
      gsap.fromTo(
        testimonialRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, [activeIndex]);

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
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
            className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-6"
          >
            Casos de Sucesso
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            O que nossos <span className="text-primary-600">clientes dizem</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empresas que transformaram seus processos com nossas soluções de automação.
          </p>
        </motion.div>

        <div ref={testimonialRef} className="max-w-4xl mx-auto relative mb-16">
          <div className="absolute -top-10 -left-10 text-primary-200 opacity-50 hidden md:block">
            <Quote size={80} />
          </div>
          
          <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold flex items-center justify-center text-2xl shadow-md">
                  {testimonials[activeIndex].logo}
                </div>
                <div className="mt-2 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{testimonials[activeIndex].company}</h3>
                <p className="text-gray-500 mb-5">{testimonials[activeIndex].location}</p>
                
                <blockquote className="text-gray-700 text-lg italic mb-8">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                
                <div className="flex items-center border-t pt-4 border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-700 font-bold">
                    {testimonials[activeIndex].author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonials[activeIndex].author}</div>
                    <div className="text-gray-500">{testimonials[activeIndex].position}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                index === activeIndex ? 'bg-primary-600 w-8' : 'bg-gray-300'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver depoimento ${index + 1}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            {
              stat: '98%',
              label: 'Satisfação do cliente',
              description: 'Baseado em pesquisas pós-implementação'
            },
            {
              stat: '800+',
              label: 'Projetos entregues',
              description: 'Em diversos setores industriais'
            },
            {
              stat: '24/7',
              label: 'Suporte técnico',
              description: 'Disponibilidade para atendimento'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">{item.stat}</div>
              <div className="font-bold text-gray-800 mb-1">{item.label}</div>
              <div className="text-gray-500 text-sm">{item.description}</div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button 
            variant="primary" 
            size="md"
            to="/casos-de-sucesso"
            icon={<ArrowRight size={18} />}
            className="shadow-md"
          >
            Ver todos os casos de sucesso
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;