import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ExternalLink, Calendar, MessageSquare } from 'lucide-react';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  
  // Controla o estado do header baseado no scroll
  useEffect(() => {
    const handleScroll = () => {
      // Detecta se rolou mais de 50px para ativar o fundo
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Calcula o progresso do scroll para o logo dinâmico
      // Limite em 200px para o efeito completo
      const progress = Math.min(window.scrollY / 200, 1);
      setScrollProgress(progress);
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

  // Calcula o tamanho do logo baseado no scroll
  // Valores ajustados para deixar o logo mais compacto
  const logoHeight = 100 - (scrollProgress * 20); // Começa em 100px e diminui até 80px
  const logoWidth = 180 - (scrollProgress * 40);  // Começa em 180px e diminui até 140px

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
          ? 'py-1 bg-white shadow-lg' // Reduzindo o padding vertical quando rolado
          : 'py-2 bg-transparent'     // Reduzindo o padding vertical inicial
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo com tamanho dinâmico baseado no scroll e imagem alternando conforme o scroll */}
          <Link to="/">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}images/${isScrolled ? 'LOGO_PRETO.png' : 'LOGO_BRANCO.png'}`} 
                alt="RLS Automação Industrial" 
                style={{ 
                  height: `${logoHeight}px`, 
                  width: `${logoWidth}px`,
                  transition: 'height 0.3s, width 0.3s',
                  objectFit: 'contain' // Garante que o logo mantenha proporções
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation posicionada mais à direita */}
          <nav className="hidden lg:flex items-center justify-end flex-1 h-full">
            {navItems.map((item) => (
              <motion.div 
                key={item.title} 
                className="relative group px-1 flex items-center h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`px-3 py-1 font-medium flex items-center transition-colors relative ${
                        isScrolled
                          ? location.pathname.includes(item.path) 
                            ? 'text-blue-600 font-semibold' 
                            : 'text-gray-800 hover:text-blue-600'
                          : location.pathname.includes(item.path) 
                            ? 'text-blue-300 font-semibold' 
                            : 'text-white hover:text-blue-300'
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
                          className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                            isScrolled ? 'bg-blue-600' : 'bg-blue-400'
                          }`}
                          layoutId={`desktopIndicator-${item.title}`}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover indicator - mais fino e elegante */}
                      {!location.pathname.includes(item.path) && (
                        <motion.div 
                          className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full origin-left ${
                            isScrolled ? 'bg-blue-600' : 'bg-blue-300'
                          }`}
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
                          className={`absolute left-0 mt-1 w-64 shadow-xl rounded-lg py-2 z-20 ${
                            isScrolled
                              ? 'bg-white border border-gray-200'
                              : 'bg-[#1a2451]/90 backdrop-blur-md border border-[#2a3a7a]'
                          }`}
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
                                className={`group flex items-center justify-between px-4 py-2 transition-colors ${
                                  isScrolled
                                    ? location.pathname === dropdownItem.path
                                      ? 'text-blue-600 bg-blue-50 font-medium'
                                      : 'text-gray-800 hover:bg-gray-100 hover:text-blue-600'
                                    : location.pathname === dropdownItem.path
                                      ? 'text-blue-300 bg-blue-900/40 font-medium'
                                      : 'text-gray-300 hover:bg-blue-900/30 hover:text-blue-300'
                                }`}
                              >
                                <span>{dropdownItem.title}</span>
                                
                                {/* Ícone sutil que aparece apenas no hover */}
                                <motion.span 
                                  initial={{ opacity: 0, x: -5 }}
                                  whileHover={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className={isScrolled ? 'text-blue-600' : 'text-blue-400'}
                                >
                                  <ExternalLink size={12} />
                                </motion.span>
                                
                                {/* Indicador de item ativo no dropdown */}
                                {location.pathname === dropdownItem.path && (
                                  <motion.div 
                                    className={`w-1 h-full absolute left-0 top-0 rounded-r-full ${
                                      isScrolled ? 'bg-blue-600' : 'bg-blue-400'
                                    }`}
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
                    className={`px-3 py-1 font-medium transition-colors relative ${
                      isScrolled
                        ? location.pathname === item.path 
                          ? 'text-blue-600 font-semibold' 
                          : 'text-gray-800 hover:text-blue-600'
                        : location.pathname === item.path 
                          ? 'text-blue-300 font-semibold' 
                          : 'text-white hover:text-blue-300'
                    }`}
                  >
                    {item.title}
                    
                    {/* Indicador de ativo - linha azul embaixo */}
                    {location.pathname === item.path && (
                      <motion.div 
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                          isScrolled ? 'bg-blue-600' : 'bg-blue-400'
                        }`}
                        layoutId={`desktopIndicator-${item.title}`}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover indicator */}
                    {location.pathname !== item.path && (
                      <motion.div 
                        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full origin-left ${
                          isScrolled ? 'bg-blue-600' : 'bg-blue-300'
                        }`}
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

          {/* Mobile Menu Button com cor ajustada para tema branco/transparente */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`lg:hidden p-2 focus:outline-none ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
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

      {/* Mobile Navigation - Adaptado para tema branco/transparente */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className={`lg:hidden shadow-lg overflow-hidden ${
              isScrolled
                ? 'bg-white'
                : 'bg-[#1a2451]/90 backdrop-blur-md'
            }`}
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col">
              {navItems.map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  className={`border-b py-2 ${
                    isScrolled ? 'border-gray-200' : 'border-[#2a3a7a]'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={`flex justify-between items-center w-full py-2 font-medium ${
                          isScrolled
                            ? location.pathname.includes(item.path) 
                              ? 'text-blue-600 font-semibold' 
                              : 'text-gray-800'
                            : location.pathname.includes(item.path) 
                              ? 'text-blue-300 font-semibold' 
                              : 'text-white'
                        }`}
                        onClick={() => handleToggleDropdown(item, !item.isOpen)}
                      >
                        <span className={`pl-2 ${
                          location.pathname.includes(item.path) 
                            ? isScrolled 
                              ? 'border-l-2 border-blue-600' 
                              : 'border-l-2 border-blue-400'
                            : ''
                        }`}>
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
                                    isScrolled
                                      ? location.pathname === dropdownItem.path
                                        ? 'border-blue-600 text-blue-600 font-medium'
                                        : 'border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600'
                                      : location.pathname === dropdownItem.path
                                        ? 'border-blue-400 text-blue-300 font-medium'
                                        : 'border-[#374291] text-gray-400 hover:text-blue-300 hover:border-blue-300'
                                  } transition-colors`}
                                >
                                  <span>{dropdownItem.title}</span>
                                  
                                  {/* Ícone sutil */}
                                  {location.pathname === dropdownItem.path && (
                                    <motion.span 
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className={`pr-2 ${
                                        isScrolled ? 'text-blue-600' : 'text-blue-400'
                                      }`}
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
                      className={`block py-2 font-medium ${
                        isScrolled
                          ? location.pathname === item.path
                            ? 'text-blue-600 font-semibold border-l-2 border-blue-600 pl-2'
                            : 'text-gray-800'
                          : location.pathname === item.path
                            ? 'text-blue-300 font-semibold border-l-2 border-blue-400 pl-2'
                            : 'text-white'
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Elementos de contato no mobile - Ajustados para tema branco/transparente */}
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
                    className="py-3 font-medium rounded-lg shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 relative overflow-hidden"
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
                    className={`py-3 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      isScrolled
                        ? 'border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-600'
                        : 'border border-[#374291] text-gray-300 hover:text-blue-300 hover:border-blue-700'
                    }`}
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