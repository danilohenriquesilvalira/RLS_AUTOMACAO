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
      icon: <MapPin size={18} className="text-primary-500" />, 
      text: 'Estrada Nacional 247, Km 64.5, Parque Charal, Armazém 12 2705-837 Terrugem, Sintra, Lisboa, Portugal',
      href: 'https://maps.google.com/?q=Estrada+Nacional+247+Km+64.5+Parque+Charal+Armazém+12+2705-837+Terrugem+Sintra+Lisboa+Portugal'
    },
    { 
      icon: <Phone size={18} className="text-primary-500" />, 
      text: '+351 935 479 757',
      href: 'tel:+351935479757'
    },
    { 
      icon: <Mail size={18} className="text-primary-500" />, 
      text: 'danilosilvalira@hotmail.com',
      href: 'mailto:danilosilvalira@hotmail.com'
    },
    { 
      icon: <Clock size={18} className="text-primary-500" />, 
      text: 'Segunda a Sexta: 9h às 18h',
      href: '#'
    }
  ];

  // Redes Sociais
  const socialMedia = [
    { icon: <Facebook size={20} />, name: 'Facebook', href: 'https://facebook.com' },
    { icon: <Instagram size={20} />, name: 'Instagram', href: 'https://instagram.com' },
    { icon: <Linkedin size={20} />, name: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: <Youtube size={20} />, name: 'YouTube', href: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-[#343b91] text-white">
      {/* Footer Top - CTA melhorado */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Transforme sua indústria agora</h3>
              <p className="text-white/80">
                Entre em contato para uma avaliação personalizada das suas necessidades industriais.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <a 
                href="tel:+351935479757" 
                className="px-6 py-3 bg-white text-[#343b91] rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center"
              >
                <Phone size={18} className="mr-2" />
                Ligar Agora
              </a>
              <a 
                href="https://wa.me/351935479757" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <MessageCircle size={18} className="mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Main */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo e informações */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img 
                src="/images/LOGO_PRETO.png" 
                alt="RLS Automação Industrial" 
                className="h-12 w-auto"
              />
            </Link>
            
            <p className="text-white/80 mb-6">
              Com mais de 30 anos de experiência, oferecemos soluções completas em automação industrial para aumentar a eficiência, reduzir custos e melhorar a qualidade dos seus processos.
            </p>

            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href} 
                  className="flex items-start text-white/80 hover:text-white transition-colors"
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                  <span className="mr-3 mt-1">{item.icon}</span>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Soluções</h3>
            <ul className="space-y-2">
              {footerLinks.soluções.map((link) => (
                <li key={link.title}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-primary-300 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Indústrias</h3>
            <ul className="space-y-2">
              {footerLinks.indústrias.map((link) => (
                <li key={link.title}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-primary-300 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.title}>
                  <Link 
                    to={link.path} 
                    className="text-white/80 hover:text-primary-300 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 py-6">
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
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-primary-600 hover:text-white transition-colors"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1 }}
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