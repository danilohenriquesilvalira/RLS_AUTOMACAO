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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  // Controla o estado do header baseado no scroll e atualiza a largura da janela
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Fecha o menu mobile automaticamente em telas maiores
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    const handleScroll = () => {
      // Detecta se rolou mais de 50px para ativar o fundo
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Calcula o progresso do scroll para o logo dinâmico - reduzido para transição mais suave
      const progress = Math.min(window.scrollY / 120, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Inicialização
    handleScroll();
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  // Fecha o menu quando a rota muda
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSolutionsOpen(false);
    setIsIndustriesOpen(false);
  }, [location]);

  // Detecta cliques fora do menu para fechá-lo em dispositivos móveis
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen && 
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        headerRef.current && 
        !headerRef.current.contains(event.target as Node) &&
        menuButtonRef.current && 
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Impede rolagem quando o menu está aberto em dispositivos móveis
  useEffect(() => {
    if (isMenuOpen && windowWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, windowWidth]);

  // Calcula o tamanho do logo baseado no scroll - VALORES AUMENTADOS
  const logoHeight = 120 - (scrollProgress * 30); // Começa em 120px e diminui até 90px
  const logoWidth = 220 - (scrollProgress * 40);  // Começa em 220px e diminui até 180px

  // Variantes de animação refinadas
  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { 
        duration: 0.25, 
        ease: [0.4, 0.0, 0.2, 1] 
      }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.35, 
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
        duration: 0.25, 
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
          ? 'py-2 md:py-3 bg-white shadow-lg' 
          : 'py-3 md:py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center h-16 md:h-20">
          {/* Logo com tamanho dinâmico baseado no scroll */}
          <Link to="/" className="flex-shrink-0 z-10 mr-3 md:mr-6">
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
                className="max-w-[150px] sm:max-w-[180px] md:max-w-[220px]" // Limites de tamanho ajustados
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation com melhor espaçamento */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <div className="flex items-center space-x-1 xl:space-x-3">
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
                        className={`px-2 md:px-3 py-1 font-medium flex items-center transition-colors relative ${
                          isScrolled
                            ? location.pathname.includes(item.path) 
                              ? 'text-green-600 font-semibold' 
                              : 'text-gray-800 hover:text-green-600'
                            : location.pathname.includes(item.path) 
                              ? 'text-green-300 font-semibold' 
                              : 'text-white hover:text-green-300'
                        }`}
                        onClick={() => handleToggleDropdown(item, !item.isOpen)}
                        onMouseEnter={() => handleToggleDropdown(item, true)}
                        onMouseLeave={() => handleToggleDropdown(item, false)}
                        aria-expanded={item.isOpen}
                        aria-haspopup="true"
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
                              isScrolled ? 'bg-green-600' : 'bg-green-400'
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
                              isScrolled ? 'bg-green-600' : 'bg-green-300'
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
                            className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-md py-1 z-50 border border-gray-100"
                            style={{ marginTop: "0px" }}
                            onMouseEnter={() => handleToggleDropdown(item, true)}
                            onMouseLeave={() => handleToggleDropdown(item, false)}
                          >
                            <div className="py-1">
                              {item.dropdownItems.map((dropdownItem, idx) => (
                                <motion.div
                                  key={dropdownItem.title}
                                  initial={{ opacity: 0, x: -5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.03, duration: 0.15 }}
                                  className="mx-1"
                                >
                                  <Link
                                    to={dropdownItem.path}
                                    className={`group flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors ${
                                      location.pathname === dropdownItem.path
                                        ? 'text-green-600 bg-green-50 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                                    }`}
                                  >
                                    <span>{dropdownItem.title}</span>
                                    
                                    {/* Ícone sutil que aparece apenas no hover */}
                                    <motion.span 
                                      initial={{ opacity: 0, x: -5 }}
                                      whileHover={{ opacity: 1, x: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="text-green-600"
                                    >
                                      <ExternalLink size={12} />
                                    </motion.span>
                                    
                                    {/* Indicador de item ativo no dropdown */}
                                    {location.pathname === dropdownItem.path && (
                                      <motion.div 
                                        className="w-0.5 h-full absolute left-0 top-0 rounded-r-full bg-green-600"
                                        layoutId={`dropdownIndicator-${item.title}-${dropdownItem.title}`}
                                      />
                                    )}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-2 md:px-3 py-1 font-medium transition-colors relative ${
                        isScrolled
                          ? location.pathname === item.path 
                            ? 'text-green-600 font-semibold' 
                            : 'text-gray-800 hover:text-green-600'
                          : location.pathname === item.path 
                            ? 'text-green-300 font-semibold' 
                            : 'text-white hover:text-green-300'
                      }`}
                    >
                      {item.title}
                      
                      {/* Indicador de ativo - linha verde embaixo */}
                      {location.pathname === item.path && (
                        <motion.div 
                          className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                            isScrolled ? 'bg-green-600' : 'bg-green-400'
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
                            isScrolled ? 'bg-green-600' : 'bg-green-300'
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
            </div>
          </nav>

          {/* Botão Fale Conosco para desktop - VERMELHO */}
          <div className="hidden lg:block ml-auto">
            <Button
              variant="primary" 
              size="sm"
              to="/contato"
              className={`py-2 px-6 ${
                isScrolled
                  ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
              } text-white transition-all text-sm rounded-lg shadow-md font-medium`}
            >
              Fale Conosco
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            ref={menuButtonRef}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ml-auto ${
              isScrolled 
                ? 'text-gray-800 focus:ring-green-500 focus:ring-offset-white' 
                : 'text-white focus:ring-green-400 focus:ring-offset-transparent'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay de fundo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu mobile */}
            <motion.div
              id="mobile-menu"
              ref={mobileMenuRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="lg:hidden fixed top-[80px] left-0 right-0 overflow-auto max-h-[80vh] z-50 bg-white shadow-xl rounded-b-xl"
              style={{ pointerEvents: 'auto' }}
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col">
                {navItems.map((item, idx) => (
                  <motion.div 
                    key={item.title} 
                    className="border-b border-gray-200 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.hasDropdown ? (
                      <>
                        <button
                          className={`flex justify-between items-center w-full py-3 font-medium ${
                            location.pathname.includes(item.path) 
                              ? 'text-green-600 font-semibold' 
                              : 'text-gray-800'
                          }`}
                          onClick={() => handleToggleDropdown(item, !item.isOpen)}
                          aria-expanded={item.isOpen}
                          aria-controls={`dropdown-${item.title}`}
                        >
                          <span className={`pl-2 ${
                            location.pathname.includes(item.path) 
                              ? 'border-l-2 border-green-600'
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
                              id={`dropdown-${item.title}`}
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
                                    className={`flex justify-between items-center py-3 pl-2 border-l-2 ${
                                      location.pathname === dropdownItem.path
                                        ? 'border-green-600 text-green-600 font-medium'
                                        : 'border-gray-200 text-gray-600 hover:text-green-600 hover:border-green-600'
                                    } transition-colors`}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    <span>{dropdownItem.title}</span>
                                    
                                    {/* Ícone sutil */}
                                    {location.pathname === dropdownItem.path && (
                                      <motion.span 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="pr-2 text-green-600"
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
                        className={`block py-3 font-medium ${
                          location.pathname === item.path
                            ? 'text-green-600 font-semibold border-l-2 border-green-600 pl-2'
                            : 'text-gray-800 hover:text-green-600'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Botão de contato no mobile - VERMELHO */}
                <motion.div 
                  className="mt-6 space-y-4 pb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
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
                      className="py-3 font-medium rounded-lg shadow-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 flex items-center justify-center gap-2 relative overflow-hidden text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Fale Conosco</span>
                    </Button>
                  </motion.div>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;