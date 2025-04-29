import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Links do Rodapé
  const footerLinks = {
    soluções: [
      { title: 'Sistemas SCADA', path: '/solucoes/scada' },
      { title: 'IoT Industrial', path: '/solucoes/iot-industrial' },
      { title: 'Integração MES/ERP', path: '/solucoes/integracao-mes-erp' },
      { title: 'Visão Computacional', path: '/solucoes/visao-computacional' },
      { title: 'Manutenção Preditiva', path: '/solucoes/manutencao-preditiva' },
      { title: 'Ver todas soluções', path: '/solucoes' }
    ],
    indústrias: [
      { title: 'Manufatura', path: '/industrias/manufatura' },
      { title: 'Petroquímica', path: '/industrias/petroquimica' },
      { title: 'Alimentos e Bebidas', path: '/industrias/alimentos' },
      { title: 'Farmacêutica', path: '/industrias/farmaceutica' },
      { title: 'Logística', path: '/industrias/logistica' },
      { title: 'Ver todos setores', path: '/industrias' }
    ],
    empresa: [
      { title: 'Sobre Nós', path: '/sobre' },
      { title: 'Nossa Equipe', path: '/sobre/equipe' },
      { title: 'Carreiras', path: '/carreiras' },
      { title: 'Notícias', path: '/noticias' },
      { title: 'Contato', path: '/contato' }
    ]
  };

  // Dados de Contato
  const contactInfo = [
    { 
      icon: <MapPin size={18} className="text-green-400" />, 
      text: 'Estrada Nacional 247, Km 64.5, Parque Charal, Armazém 12 2705-837 Terrugem, Sintra, Lisboa, Portugal',
      href: 'https://maps.google.com/?q=Estrada+Nacional+247+Km+64.5+Parque+Charal+Armazém+12+2705-837+Terrugem+Sintra+Lisboa+Portugal'
    },
    { 
      icon: <Phone size={18} className="text-green-400" />, 
      text: '+351 935 479 757',
      href: 'tel:+351935479757'
    },
    { 
      icon: <Mail size={18} className="text-green-400" />, 
      text: 'danilosilvalira@hotmail.com',
      href: 'mailto:danilosilvalira@hotmail.com'
    },
    { 
      icon: <Clock size={18} className="text-green-400" />, 
      text: 'Segunda a Sexta: 9h às 18h',
      href: '#'
    }
  ];

  // Redes Sociais
  const socialMedia = [
    { icon: <MessageCircle size={20} />, name: 'WhatsApp', href: 'https://wa.me/351935479757' },
    { icon: <Linkedin size={20} />, name: 'LinkedIn', href: 'https://www.linkedin.com/company/rls-automacao-industrial' },
    { icon: <Mail size={20} />, name: 'Email', href: 'mailto:danilosilvalira@hotmail.com' },
    { icon: <Phone size={20} />, name: 'Telefone', href: 'tel:+351935479757' }
  ];

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background com gradiente melhorado */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#004d25] via-[#0f6632] to-[#004d25] -z-10"></div>
      
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-[0.08] mix-blend-overlay -z-10"></div>
      
      {/* SVG personalizado do footer */}
      <div className="absolute inset-0 bg-[url('/footer_background.svg')] bg-no-repeat bg-cover bg-center opacity-20 -z-10"></div>
      
      {/* Efeito de iluminação superior */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#3ed160]/10 to-transparent -z-5"></div>

      {/* Footer Top - CTA melhorado */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Transforme sua indústria agora</h3>
              <p className="text-white/80 text-base sm:text-lg">
                Entre em contato para uma avaliação personalizada das suas necessidades industriais.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href="tel:+351935479757" 
                className="px-6 py-3 bg-white text-[#004d25] rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={18} className="mr-2" />
                Ligar Agora
              </motion.a>
              <motion.a 
                href="https://wa.me/351935479757" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 transition-colors flex items-center justify-center shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={18} className="mr-2" />
                WhatsApp
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Main - melhorado */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo e informações */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <motion.img 
                src="/images/LOGO_BRANCO.png" 
                alt="RLS Automação Industrial" 
                className="h-12 w-auto"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            </Link>
            
            <p className="text-white/80 mb-6 text-base leading-relaxed">
              Com mais de 30 anos de experiência, oferecemos soluções completas em automação industrial para aumentar a eficiência, reduzir custos e melhorar a qualidade dos seus processos.
            </p>

            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.a 
                  key={index} 
                  href={item.href} 
                  className="flex items-start text-white/80 hover:text-white transition-colors group"
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="mr-3 mt-1 group-hover:text-green-400 transition-colors">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links - melhorado com efeitos de hover */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500/30 pb-2">Soluções</h3>
            <ul className="space-y-2">
              {footerLinks.soluções.map((link) => (
                <motion.li key={link.title} whileHover={{ x: 3 }}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-green-300 transition-colors inline-block"
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500/30 pb-2">Indústrias</h3>
            <ul className="space-y-2">
              {footerLinks.indústrias.map((link) => (
                <motion.li key={link.title} whileHover={{ x: 3 }}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-green-300 transition-colors inline-block"
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-green-500/30 pb-2">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <motion.li key={link.title} whileHover={{ x: 3 }}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-green-300 transition-colors inline-block"
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom - melhorado */}
      <div className="border-t border-white/10 py-6 mt-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              &copy; {currentYear} RLS Automação Industrial. Todos os direitos reservados.
            </div>

            <div className="flex space-x-4">
              {socialMedia.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-green-600 hover:text-white transition-colors border border-white/5"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 8px rgba(62, 209, 96, 0.5)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;