import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import FloatingSocial from '@/components/ui/FloatingSocial';

interface LayoutProps {
  children: ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
  pageTitle?: string;
}

const Layout = ({ 
  children, 
  withHeader = true, 
  withFooter = true,
  pageTitle
}: LayoutProps) => {
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Atualiza o título da página se fornecido
  if (pageTitle) {
    document.title = `${pageTitle} | RLS Automação Industrial`;
  }

  return (
    <>
      {withHeader && <Header />}
      
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="flex flex-col min-h-screen"
      >
        {children}
      </motion.main>
      
      {withFooter && <Footer />}
      
      {/* Botões flutuantes de redes sociais */}
      <FloatingSocial 
        whatsappNumber="+351935479757"
        linkedinUrl="https://www.linkedin.com/company/rls-automacao-industrial"
        email="danilosilvalira@hotmail.com"
        phone="+351935479757"
      />
    </>
  );
};

export default Layout;