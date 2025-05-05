import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink, Plus, Minus, ChevronUp, MessageCircle, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Toggle função para mobile
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Soluções populares (reduzidas para manter o footer compacto)
  const solutions = [
    { name: 'Automação Industrial', path: '/solucoes/automacao-industrial' },
    { name: 'Consultoria e Projetos', path: '/solucoes/consultoria-projetos' },
    { name: 'Gestão Industrial', path: '/solucoes/gestao-industrial' },
    { name: 'Ver todas', path: '/solucoes', icon: <ExternalLink size={12} className="ml-1" /> }
  ];

  // Empresa (reduzida para manter o footer compacto)
  const company = [
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
    { name: 'Carreiras', path: '/carreiras' }
  ];

  // Redes sociais com SVG Lucide icons - iguais aos do HeroSection
  const socialLinks = [
    { icon: <MessageCircle size={18} />, name: 'WhatsApp', href: 'https://wa.me/351935479757' },
    { icon: <Linkedin size={18} />, name: 'LinkedIn', href: 'https://www.linkedin.com/company/rls-automacao-industrial' },
    { icon: <Mail size={18} />, name: 'Email', href: 'mailto:danilosilvalira@hotmail.com' },
    { icon: <Phone size={18} />, name: 'Telefone', href: 'tel:+351935479757' }
  ];

  // Endereço (ajustamos para manter mais compacto e com layout melhor)
  const address = {
    location: 'Lisboa, Portugal',
    full: 'Estrada Nacional 247, Km 64.5, Parque Charal, Armazém 12 2705-837 Terrugem, Sintra',
    mapLink: 'https://maps.google.com/?q=Estrada+Nacional+247+Km+64.5+Parque+Charal+Armazém+12+2705-837+Terrugem+Sintra+Lisboa+Portugal',
    phone: '+351 935 479 757',
    phoneLink: 'tel:+351935479757',
    email: 'danilosilvalira@hotmail.com',
    emailLink: 'mailto:danilosilvalira@hotmail.com'
  };

  return (
    <footer className="relative bg-white overflow-hidden shadow-md">
      {/* Fundo com padrão de pontos sutil */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #42B653 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      {/* Borda superior decorativa */}
      <div className="w-full h-1 bg-gradient-to-r from-gray-100 via-[#42B653] to-gray-100"></div>
      
      {/* Container principal do footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Logo e Contato - Coluna maior */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link to="/" className="inline-block mb-6" aria-label="RLS Automação Industrial">
              <img 
                src="/images/LOGO_PRETO.png" 
                alt="RLS Automação" 
                className="h-20 w-auto" // Logo aumentado para h-20
              />
            </Link>
            
            <div className="text-gray-600 mb-6 text-sm max-w-xs">
              Soluções inovadoras em automação industrial para aumentar eficiência, 
              reduzir custos e otimizar processos.
            </div>

            {/* Contato compacto */}
            <div className="space-y-2">
              <a href={address.mapLink} target="_blank" rel="noopener noreferrer" 
                 className="flex items-start text-sm group">
                <MapPin size={16} className="text-[#42B653] mt-0.5 mr-2 flex-shrink-0 group-hover:text-green-600 transition-colors" />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {address.location}
                </span>
              </a>
              
              <a href={address.phoneLink} className="flex items-center text-sm group">
                <Phone size={16} className="text-[#42B653] mr-2 flex-shrink-0 group-hover:text-green-600 transition-colors" />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {address.phone}
                </span>
              </a>
              
              <a href={address.emailLink} className="flex items-center text-sm group">
                <Mail size={16} className="text-[#42B653] mr-2 flex-shrink-0 group-hover:text-green-600 transition-colors" />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                  {address.email}
                </span>
              </a>
            </div>
          </div>
          
          {/* Desktop Links - Responsive e minimalista */}
          <div className="hidden md:block md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Soluções */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Soluções</h3>
                <ul className="space-y-2">
                  {solutions.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.path} 
                        className="text-sm text-gray-600 hover:text-[#42B653] transition-colors flex items-center"
                      >
                        {item.name}
                        {item.icon}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Empresa */}
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Empresa</h3>
                <ul className="space-y-2">
                  {company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.path} 
                        className="text-sm text-gray-600 hover:text-[#42B653] transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Contato - Mais proeminente */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">Vamos Conversar</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Transforme sua indústria com soluções de automação de ponta.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <motion.a 
                    href="tel:+351935479757" 
                    className="px-4 py-2 text-sm font-medium text-center rounded-md bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 transition-colors"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ligar Agora
                  </motion.a>
                  
                  <motion.a 
                    href="https://wa.me/351935479757" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium text-center rounded-md bg-gradient-to-r from-[#42B653] to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    WhatsApp
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Accordion Links - Responsivo e economiza espaço */}
          <div className="md:hidden col-span-full space-y-4">
            {/* Soluções Accordion */}
            <div className="border-b border-gray-200 pb-3">
              <button 
                onClick={() => toggleSection('solutions')} 
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-semibold text-gray-800">Soluções</h3>
                {expandedSection === 'solutions' ? (
                  <Minus size={16} className="text-gray-600" />
                ) : (
                  <Plus size={16} className="text-gray-600" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSection === 'solutions' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 mt-3 pl-1">
                      {solutions.map((item) => (
                        <li key={item.name}>
                          <Link 
                            to={item.path} 
                            className="text-sm text-gray-600 hover:text-[#42B653] transition-colors flex items-center"
                          >
                            {item.name}
                            {item.icon}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Empresa Accordion */}
            <div className="border-b border-gray-200 pb-3">
              <button 
                onClick={() => toggleSection('company')} 
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="text-sm font-semibold text-gray-800">Empresa</h3>
                {expandedSection === 'company' ? (
                  <Minus size={16} className="text-gray-600" />
                ) : (
                  <Plus size={16} className="text-gray-600" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSection === 'company' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 mt-3 pl-1">
                      {company.map((item) => (
                        <li key={item.name}>
                          <Link 
                            to={item.path} 
                            className="text-sm text-gray-600 hover:text-[#42B653] transition-colors"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* CTA Mobile */}
            <div className="pt-2 flex flex-col space-y-3">
              <motion.a 
                href="tel:+351935479757" 
                className="px-4 py-2.5 text-sm font-medium text-center rounded-md bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                Ligar Agora
              </motion.a>
              
              <motion.a 
                href="https://wa.me/351935479757" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-sm font-medium text-center rounded-md bg-gradient-to-r from-[#42B653] to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all"
                whileTap={{ scale: 0.98 }}
              >
                WhatsApp
              </motion.a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom - Minimalista */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-6 border-t border-gray-200 text-xs text-gray-500">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} RLS Automação Industrial
          </div>
          
          {/* Social Media Icons usando SVG do Lucide-React */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#42B653] hover:bg-[#42B653] hover:text-white hover:scale-110 transition-all duration-300"
                aria-label={social.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          
          {/* Endereço completo só no desktop */}
          <div className="hidden md:block text-center md:text-right mt-4 md:mt-0 text-gray-500">
            <a 
              href={address.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              {address.full}
            </a>
          </div>
        </div>
        
        {/* Botão "Voltar ao Topo" - Fixo */}
        <motion.a
          href="#top"
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#42B653] flex items-center justify-center text-white shadow-lg z-50 hover:bg-green-600 transition-colors"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ChevronUp size={20} />
        </motion.a>
      </div>
    </footer>
  );
};

export default Footer;