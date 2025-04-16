import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, Check, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import emailjs from '@emailjs/browser';

// Credenciais do EmailJS com valores reais
const EMAILJS_SERVICE_ID = 'rls_automacao';       // Service ID que você criou
const EMAILJS_TEMPLATE_ID = 'template_v6k50os';   // Substitua pelo seu Template ID real (crie um template no painel)
const EMAILJS_PUBLIC_KEY = 'tmTDjVCQm9LARipqm';   // Sua chave pública conforme mostrado na imagem

const ContatoPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Contato | RLS Automação Industrial';
    
    // Inicializar EmailJS com a chave pública real
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Limpar erro de envio também
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      errors.name = 'Nome é obrigatório';
    }
    
    if (!formState.email.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formState.email)) {
      errors.email = 'E-mail inválido';
    }
    
    if (!formState.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    }
    
    if (!formState.subject) {
      errors.subject = 'Assunto é obrigatório';
    }
    
    if (!formState.message.trim()) {
      errors.message = 'Mensagem é obrigatória';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    // Preparar o template de parâmetros para o EmailJS
    const templateParams = {
      to_name: 'RLS Automação Industrial',
      to_email: 'danilosilvalira@hotmail.com',
      from_name: formState.name,
      from_email: formState.email,
      phone: formState.phone,
      company: formState.company || 'Não informado',
      subject: formState.subject,
      message: formState.message
    };
    
    // Enviar email usando EmailJS com as credenciais reais
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        console.log('Email enviado com sucesso!');
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form
        setFormState({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
        });
        
        // Scroll to top of form
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      })
      .catch((error) => {
        console.error('Erro ao enviar email:', error);
        setIsSubmitting(false);
        setSubmitError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato diretamente por telefone.');
      });
  };

  return (
    <Layout pageTitle="Contato">
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
              Entre em Contato
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Com mais de 30 anos de experiência, estamos prontos para ajudar sua empresa a transformar seus processos industriais com soluções de automação de ponta.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Informações de Contato</h2>
                <div className="space-y-6 mb-8">
                  {[
                    { 
                      icon: <MapPin className="text-blue-600" size={24} />, 
                      title: 'Morada',
                      content: 'Estrada Nacional 247, Km 64.5, Parque Charal, Armazém 12 2705-837 Terrugem, Sintra, Lisboa, Portugal',
                      link: 'https://maps.google.com/?q=Estrada+Nacional+247+Km+64.5+Parque+Charal+Armazém+12+2705-837+Terrugem+Sintra+Lisboa+Portugal'
                    },
                    { 
                      icon: <Phone className="text-blue-600" size={24} />, 
                      title: 'Telefone',
                      content: '+351 935 479 757',
                      link: 'tel:+351935479757'
                    },
                    { 
                      icon: <Mail className="text-blue-600" size={24} />, 
                      title: 'E-mail',
                      content: 'danilosilvalira@hotmail.com',
                      link: 'mailto:danilosilvalira@hotmail.com'
                    },
                    { 
                      icon: <Clock className="text-blue-600" size={24} />, 
                      title: 'Horário de Atendimento',
                      content: 'Segunda a Sexta: 9h às 18h',
                      link: '#'
                    }
                  ].map((item, index) => (
                    <a 
                      key={index}
                      href={item.link}
                      className="flex items-start group"
                      target={item.link.startsWith('http') ? "_blank" : undefined}
                      rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      <div className="mr-4 mt-1">{item.icon}</div>
                      <div>
                        <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</div>
                        <div className="text-gray-600">{item.content}</div>
                      </div>
                    </a>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">Nos Siga</h3>
                <div className="flex space-x-3">
                  {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                      aria-label={`Siga-nos no ${social}`}
                    >
                      {social.charAt(0).toUpperCase()}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Contact Form */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envie uma Mensagem</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-4">
                      <Check className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-green-800">Mensagem enviada com sucesso!</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    Obrigado por entrar em contato. Nossa equipe responderá sua mensagem em breve no email fornecido.
                  </p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  >
                    Enviar nova mensagem
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center">
                        <AlertCircle className="text-red-500 mr-2" size={20} />
                        <p className="text-red-700">{submitError}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Seu nome"
                      />
                      {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-mail *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="seu.email@exemplo.com"
                      />
                      {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="+351 000 000 000"
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-gray-700 font-medium mb-2">Empresa</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nome da sua empresa"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Assunto *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="orçamento">Solicitar orçamento</option>
                      <option value="informações">Informações sobre soluções</option>
                      <option value="suporte">Suporte técnico</option>
                      <option value="parceria">Proposta de parceria</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                    {formErrors.subject && <p className="text-red-500 text-sm mt-1">{formErrors.subject}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensagem *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Descreva sua necessidade..."
                    ></textarea>
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>
                  
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                      disabled={isSubmitting}
                      icon={isSubmitting ? undefined : <ArrowRight size={18} />}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="h-96 w-full">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.7757423642896!2d-9.379653684621097!3d38.7988945795881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ed67e8c322f03%3A0x4e56eb1d0e8d4a28!2sEstrada%20Nacional%20247%2C%202705-837%20Terrugem%2C%20Portugal!5e0!3m2!1spt-BR!2sbr!4v1616600000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Localização RLS Automação Industrial"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Perguntas <span className="text-blue-600">Frequentes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Respostas para as dúvidas mais comuns sobre nossos serviços.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Quanto tempo leva para implementar uma solução de automação?",
                answer: "O tempo de implementação varia de acordo com a complexidade do projeto e as necessidades específicas do cliente. Projetos simples podem levar de 2 a 4 semanas, enquanto projetos mais complexos podem levar de 3 a 6 meses. Durante a fase de análise, fornecemos um cronograma detalhado."
              },
              {
                question: "Vocês oferecem suporte técnico após a implementação?",
                answer: "Sim, oferecemos diferentes pacotes de suporte técnico conforme a necessidade do cliente. Nosso suporte inclui manutenção preventiva, atendimento remoto e presencial, além de treinamento contínuo para sua equipe."
              },
              {
                question: "É possível integrar sistemas de automação a meus sistemas legados?",
                answer: "Sim, desenvolvemos soluções de integração personalizadas que permitem conectar novos sistemas de automação com equipamentos e softwares legados. Temos experiência em diversos protocolos de comunicação e tecnologias de integração."
              },
              {
                question: "Quais setores industriais vocês atendem?",
                answer: "Atendemos diversos setores industriais em Portugal e internacionalmente, incluindo manufatura, petroquímica, alimentos e bebidas, farmacêutica, logística, metalúrgica, entre outros. Cada setor tem desafios específicos, e nossas soluções são adaptadas para atender essas necessidades."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContatoPage;