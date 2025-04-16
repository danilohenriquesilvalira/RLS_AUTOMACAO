import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, MessageCircle, Mail, Phone } from 'lucide-react';

interface FloatingSocialProps {
  whatsappNumber?: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
}

const FloatingSocial: React.FC<FloatingSocialProps> = ({
  whatsappNumber = '+351935479757',
  linkedinUrl = 'https://www.linkedin.com/company/rls-automacao-industrial',
  email = 'danilosilvalira@hotmail.com',
  phone = '+351935479757'
}) => {
  // Formatar o número do WhatsApp (remover espaços, parênteses, etc.)
  const formattedWhatsApp = whatsappNumber.replace(/\D/g, '');
  
  // Links para cada rede social
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      url: `https://wa.me/${formattedWhatsApp}`,
      color: 'bg-green-500 hover:bg-green-600',
      label: 'Conversar no WhatsApp'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={24} />,
      url: linkedinUrl,
      color: 'bg-blue-600 hover:bg-blue-700',
      label: 'Conectar no LinkedIn'
    },
    {
      name: 'Email',
      icon: <Mail size={24} />,
      url: `mailto:${email}`,
      color: 'bg-red-500 hover:bg-red-600',
      label: 'Enviar email'
    },
    {
      name: 'Telefone',
      icon: <Phone size={24} />,
      url: `tel:${phone}`,
      color: 'bg-purple-500 hover:bg-purple-600',
      label: 'Ligar'
    }
  ];

  return (
    <div className="fixed right-6 bottom-24 z-50 flex flex-col items-end space-y-3">
      {socialLinks.map((social, index) => (
        <motion.div
          key={social.name}
          className="relative group"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          {/* Label flutuante que aparece ao passar o mouse */}
          <motion.div
            className="absolute right-full mr-2 px-3 py-1 rounded bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            {social.label}
          </motion.div>
          
          {/* Botão de rede social */}
          <motion.a
            href={social.url}
            target={social.name !== 'Telefone' && social.name !== 'Email' ? '_blank' : undefined}
            rel={social.name !== 'Telefone' && social.name !== 'Email' ? 'noopener noreferrer' : undefined}
            className={`w-12 h-12 rounded-full ${social.color} text-white flex items-center justify-center shadow-lg transform transition-transform duration-200`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={social.label}
          >
            {social.icon}
          </motion.a>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSocial;