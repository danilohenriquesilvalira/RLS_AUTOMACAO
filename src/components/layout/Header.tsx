import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
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
  const [isSimulacoesOpen, setIsSimulacoesOpen] = useState(false); // Novo estado para Simulações
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
    setIsSimulacoesOpen(false); // Fechar o menu de simulações também
  }, [location]);

  // Variantes de animação
  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  const dropdownVariants = {
    closed: { opacity: 0, y: -5, display: "none" },
    open: { opacity: 1, y: 0, display: "block" }
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
    { title: 'Contato', path: '/contato' },
    { 
      title: 'Simulações', 
      path: '/simulacoes', 
      hasDropdown: true, 
      isOpen: isSimulacoesOpen, 
      setOpen: setIsSimulacoesOpen, 
      dropdownItems: [ 
        { title: 'Transporte e Logística', path: '/simulacoes/transporte-logistica' }, 
        { title: 'Processos Contínuos', path: '/simulacoes/processos-continuos' }, 
        { title: 'Manufatura Discreta', path: '/simulacoes/manufatura-discreta' }, 
        { title: 'Processos Farmacêuticos', path: '/simulacoes/processos-farmaceuticos' }, 
        { title: 'Ver todas', path: '/simulacoes' } 
      ] 
    }
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
      className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-md ${isScrolled ? 'py-2' : 'py-3'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo ligeiramente maior */}
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}images/Logo_RLS.svg`} 
                alt="RLS Automação Industrial" 
                className="h-14 w-auto" // Aumentado sutilmente de h-12 para h-14
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <div key={item.title} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`px-3 py-2 text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors relative ${
                        location.pathname.includes(item.path) ? 'text-primary-600' : ''
                      }`}
                      onClick={() => handleToggleDropdown(item, !item.isOpen)}
                      onMouseEnter={() => handleToggleDropdown(item, true)}
                      onMouseLeave={() => handleToggleDropdown(item, false)}
                    >
                      {item.title}
                      <ChevronDown 
                        size={16} 
                        className={`ml-1 transition-transform duration-300 ${item.isOpen ? 'rotate-180' : ''}`} 
                      />
                      
                      {/* Indicador de ativo - linha azul embaixo */}
                      {location.pathname.includes(item.path) && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                          layoutId="navIndicator"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover indicator */}
                      {!location.pathname.includes(item.path) && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
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
                          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                          className="absolute left-0 mt-1 w-60 bg-white shadow-lg rounded-lg py-2 z-20 border border-gray-100"
                          onMouseEnter={() => handleToggleDropdown(item, true)}
                          onMouseLeave={() => handleToggleDropdown(item, false)}
                        >
                          {item.dropdownItems.map((dropdownItem, idx) => (
                            <motion.div
                              key={dropdownItem.title}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05, duration: 0.2 }}
                            >
                              <Link
                                to={dropdownItem.path}
                                className={`block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                                  location.pathname === dropdownItem.path ? 'text-primary-600 bg-primary-50' : ''
                                }`}
                              >
                                {dropdownItem.title}
                                
                                {/* Indicador de item ativo no dropdown */}
                                {location.pathname === dropdownItem.path && (
                                  <motion.div 
                                    className="w-1 h-full absolute left-0 top-0 bg-primary-600 rounded-r-full"
                                    layoutId={`dropdownIndicator-${item.title}`}
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
                      location.pathname === item.path ? 'text-primary-600' : ''
                    }`}
                  >
                    {item.title}
                    
                    {/* Indicador de ativo - linha azul embaixo */}
                    {location.pathname === item.path && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                        layoutId="navIndicator"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover indicator */}
                    {location.pathname !== item.path && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.a 
              href="tel:+351935479757" 
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Phone size={18} className="mr-2" />
              </motion.div>
              <span className="font-medium">+351 935 479 757</span>
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="primary" 
                size="md" 
                to="/contato"
                className="shadow-lg shadow-primary-600/20"
              >
                Solicitar Orçamento
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-gray-700 p-2"
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

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col">
              {navItems.map((item, idx) => (
                <motion.div 
                  key={item.title} 
                  className="border-b border-gray-100 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={`flex justify-between items-center w-full py-2 text-gray-700 font-medium relative ${
                          location.pathname.includes(item.path) ? 'text-primary-600' : ''
                        }`}
                        onClick={() => handleToggleDropdown(item, !item.isOpen)}
                      >
                        {item.title}
                        <motion.div
                          animate={{ rotate: item.isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                        
                        {/* Indicador de item ativo */}
                        {location.pathname.includes(item.path) && (
                          <motion.div 
                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r-full"
                            layoutId={`mobileNavIndicator-${idx}`}
                          />
                        )}
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
                              >
                                <Link
                                  to={dropdownItem.path}
                                  className={`block py-2 pl-2 border-l-2 ${
                                    location.pathname === dropdownItem.path 
                                    ? 'border-primary-600 text-primary-600' 
                                    : 'border-gray-200 text-gray-600 hover:text-primary-600 hover:border-primary-600'
                                  } transition-colors`}
                                >
                                  {dropdownItem.title}
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
                      className={`block py-2 text-gray-700 font-medium relative ${
                        location.pathname === item.path ? 'text-primary-600' : ''
                      }`}
                    >
                      {item.title}
                      
                      {/* Indicador de item ativo */}
                      {location.pathname === item.path && (
                        <motion.div 
                          className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r-full"
                          layoutId={`mobileNavIndicator-${idx}`}
                        />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div 
                className="mt-4 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <motion.a 
                  href="tel:+351935479757" 
                  className="flex items-center justify-center text-gray-700 py-2 border border-gray-200 rounded-lg hover:border-primary-600 hover:text-primary-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Phone size={18} className="mr-2" />
                  </motion.div>
                  <span className="font-medium">+351 935 479 757</span>
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    variant="primary" 
                    size="md" 
                    to="/contato" 
                    fullWidth
                  >
                    Solicitar Orçamento
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