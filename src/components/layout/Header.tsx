import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, MessageCircle, ExternalLink, Calendar, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';

// Define um tipo específico para os itens de navegação
type NavItem = {
  title: string;
  path: string;
  hasDropdown?: boolean;
  isOpen?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownItems?: Array<{
    title: string;
    path: string;
  }>;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  
  // Controla o estado do header baseado no scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu quando a rota muda
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSolutionsOpen(false);
    setIsIndustriesOpen(false);
  }, [location]);

  // Variantes de animação
  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0.0, 0.2, 1] 
      }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.4, 
        ease: [0.4, 0.0, 0.2, 1] 
      }
    }
  };

  const dropdownVariants = {
    closed: { 
      opacity: 0, 
      y: -5, 
      scale: 0.98,
      display: "none",
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      }
    },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      display: "block",
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    }
  };

  const navItems: NavItem[] = [
    { title: 'Início', path: '/' },
    { 
      title: 'Soluções', 
      path: '/solucoes',
      hasDropdown: true,
      isOpen: isSolutionsOpen,
      setOpen: setIsSolutionsOpen,
      dropdownItems: [
        { title: 'Consultoria e Projetos', path: '/solucoes/consultoria-projetos' },
        { title: 'Automação Industrial', path: '/solucoes/automacao-industrial' },
        { title: 'Gestão Industrial', path: '/solucoes/gestao-industrial' },
        { title: 'Gestão de Manutenção', path: '/solucoes/gestao-manutencao' },
        { title: 'Cyber Security OT', path: '/solucoes/cyber-security-ot' },
        { title: 'Treinamentos', path: '/solucoes/treinamentos' },
        { title: 'Assistência Técnica', path: '/solucoes/assistencia-tecnica' },
        { title: 'Ver todas', path: '/solucoes' }
      ]
    },
    { 
      title: 'Indústrias', 
      path: '/industrias',
      hasDropdown: true,
      isOpen: isIndustriesOpen,
      setOpen: setIsIndustriesOpen,
      dropdownItems: [
        { title: 'Manufatura', path: '/industrias/manufatura' },
        { title: 'Petroquímica', path: '/industrias/petroquimica' },
        { title: 'Alimentos e Bebidas', path: '/industrias/alimentos' },
        { title: 'Farmacêutica', path: '/industrias/farmaceutica' },
        { title: 'Logística', path: '/industrias/logistica' },
        { title: 'Ver todas', path: '/industrias' }
      ]
    },
    { title: 'Sobre Nós', path: '/sobre' },
    { title: 'Contato', path: '/contato' }
  ];

  // Função auxiliar segura para lidar com toggles
  const handleToggleDropdown = (item: NavItem, value: boolean) => {
    if (item.setOpen) {
      item.setOpen(value);
    }
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'py-3 bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo com efeito de hover melhorado */}
          <Link to="/">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}images/Logo_RLS.svg`} 
                alt="RLS Automação Industrial" 
                className="h-14 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation com melhor espaçamento e interações */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div 
                key={item.title} 
                className="relative group px-1"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`px-3 py-2 text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors relative ${
                        location.pathname.includes(item.path) ? 'text-primary-600 font-semibold' : ''
                      }`}
                      onClick={() => handleToggleDropdown(item, !item.isOpen)}
                      onMouseEnter={() => handleToggleDropdown(item, true)}
                      onMouseLeave={() => handleToggleDropdown(item, false)}
                    >
                      {item.title}
                      <motion.div
                        animate={{ rotate: item.isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-1"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                      
                      {/* Indicador de ativo - linha sob o link */}
                      {location.pathname.includes(item.path) && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                          layoutId={`desktopIndicator-${item.title}`}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover indicator - mais fino e elegante */}
                      {!location.pathname.includes(item.path) && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 rounded-full origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {item.isOpen && item.dropdownItems && (
                        <motion.div
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={dropdownVariants}
                          className="absolute left-0 mt-1 w-64 bg-white/95 backdrop-blur-sm shadow-xl rounded-lg py-2 z-20 border border-gray-100"
                          onMouseEnter={() => handleToggleDropdown(item, true)}
                          onMouseLeave={() => handleToggleDropdown(item, false)}
                        >
                          {item.dropdownItems.map((dropdownItem, idx) => (
                            <motion.div
                              key={dropdownItem.title}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03, duration: 0.2 }}
                              whileHover={{ x: 2 }}
                            >
                              <Link
                                to={dropdownItem.path}
                                className={`group flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                                  location.pathname === dropdownItem.path ? 'text-primary-600 bg-primary-50/70 font-medium' : ''
                                }`}
                              >
                                <span>{dropdownItem.title}</span>
                                
                                {/* Ícone sutil que aparece apenas no hover */}
                                <motion.span 
                                  initial={{ opacity: 0, x: -5 }}
                                  whileHover={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-primary-500"
                                >
                                  <ExternalLink size={12} />
                                </motion.span>
                                
                                {/* Indicador de item ativo no dropdown */}
                                {location.pathname === dropdownItem.path && (
                                  <motion.div 
                                    className="w-1 h-full absolute left-0 top-0 bg-primary-600 rounded-r-full"
                                    layoutId={`dropdownIndicator-${item.title}-${dropdownItem.title}`}
                                  />
                                )}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors relative ${
                      location.pathname === item.path ? 'text-primary-600 font-semibold' : ''
                    }`}
                  >
                    {item.title}
                    
                    {/* Indicador de ativo - linha azul embaixo */}
                    {location.pathname === item.path && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                        layoutId={`desktopIndicator-${item.title}`}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover indicator */}
                    {location.pathname !== item.path && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA - Simplificado (removido o "Fale Conosco") */}
          <div className="hidden lg:flex items-center">
            {/* Botão "Solicitar Orçamento" */}
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.97 }}
              className="overflow-hidden rounded-lg"
            >
              <Button 
                variant="primary" 
                size="lg" 
                to="/contato"
                className="font-medium px-5 py-2.5 rounded-lg relative overflow-hidden flex items-center gap-2 shadow-lg shadow-primary-600/20"
              >
                <MessageCircle size={18} className="mr-1" />
                Solicitar Orçamento
                
                {/* Efeito de onda ao hover */}
                <motion.div
                  className="absolute -inset-1 bg-white/20 rounded-full"
                  initial={{ scale: 0, x: "100%", y: "100%" }}
                  whileHover={{ scale: 2, x: 0, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-gray-700 p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation - Improved */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="lg:hidden bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col">
              {navItems.map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  className="border-b border-gray-100 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={`flex justify-between items-center w-full py-2 text-gray-700 font-medium ${
                          location.pathname.includes(item.path) ? 'text-primary-600 font-semibold' : ''
                        }`}
                        onClick={() => handleToggleDropdown(item, !item.isOpen)}
                      >
                        {/* Item ativo usa uma borda esquerda ao invés de um elemento absolute */}
                        <span className={`pl-2 ${location.pathname.includes(item.path) ? 'border-l-2 border-primary-600' : ''}`}>
                          {item.title}
                        </span>
                        <motion.div
                          animate={{ rotate: item.isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {item.isOpen && item.dropdownItems && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 mt-2 space-y-1 overflow-hidden"
                          >
                            {item.dropdownItems.map((dropdownItem, dropIdx) => (
                              <motion.div
                                key={dropdownItem.title}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: dropIdx * 0.05, duration: 0.2 }}
                                whileHover={{ x: 2 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Link
                                  to={dropdownItem.path}
                                  className={`flex justify-between items-center py-2 pl-2 border-l-2 ${
                                    location.pathname === dropdownItem.path 
                                    ? 'border-primary-600 text-primary-600 font-medium' 
                                    : 'border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-600'
                                  } transition-colors`}
                                >
                                  <span>{dropdownItem.title}</span>
                                  
                                  {/* Ícone sutil */}
                                  {location.pathname === dropdownItem.path && (
                                    <motion.span 
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="text-primary-500 pr-2"
                                    >
                                      <ExternalLink size={12} />
                                    </motion.span>
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block py-2 text-gray-700 font-medium ${
                        location.pathname === item.path ? 'text-primary-600 font-semibold border-l-2 border-primary-600 pl-2' : ''
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Elementos de contato no mobile - Simplificado */}
              <motion.div 
                className="mt-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                {/* Botão de orçamento no mobile */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="overflow-hidden rounded-lg"
                >
                  <Button 
                    variant="primary" 
                    size="lg" 
                    to="/contato" 
                    fullWidth
                    className="py-3 font-medium rounded-lg shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Agendar Orçamento</span>
                  </Button>
                </motion.div>
                
                {/* Botão secundário de mensagem */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline" 
                    size="md" 
                    to="/contato" 
                    fullWidth
                    className="py-3 font-medium rounded-lg border border-gray-200 hover:border-primary-300 flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Enviar Mensagem</span>
                  </Button>
                </motion.div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;