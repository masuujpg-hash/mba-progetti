import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedinLogo, InstagramLogo, FacebookLogo, WhatsappLogo, List, X, CaretDown, CaretRight } from '@phosphor-icons/react';
import CookieBanner from './CookieBanner';
import SmoothScroll from './SmoothScroll';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubmenu(null);
    window.scrollTo(0, 0);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  interface NavItem {
    name: string;
    path: string;
    subLinks?: { name: string; path: string }[];
  }

  const navLinks: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Studio', path: '/studio' },
    { name: 'Gare OEV', path: '/servizi/gare' },
    { name: 'Portfolio gare', path: '/portfolio' },
    { name: 'Progettazione', path: '/servizi/progettazione' },
    {
      name: 'Rilievi e BIM',
      path: '/servizi/rilievi-e-bim',
      subLinks: [
        { name: 'Rilievi', path: '/servizi/rilievi' },
        { name: 'Servizi BIM', path: '/servizi/bim' },
      ],
    },
    {
      name: 'Risorse',
      path: '/risorse',
      subLinks: [
        { name: 'News', path: '/risorse' },
        { name: 'Simulatore', path: '/simulatore' },
      ],
    },
    { name: 'Contatti', path: '/contatti' },
  ];

  // Pages where hero covers full viewport → transparent navbar at top
  const isScrollWorldPage = ['/home-v2', '/home2'].includes(location.pathname);

  const isLinkActive = (item: NavItem) => {
    if (item.path === '/') return location.pathname === '/';
    if (item.subLinks) {
      return (
        location.pathname === item.path ||
        item.subLinks.some((sub) => location.pathname === sub.path)
      );
    }
    if (item.path === '/portfolio') return location.pathname.startsWith('/portfolio');
    return location.pathname === item.path;
  };

  const isDarkHeader = isMenuOpen || (isScrollWorldPage && !isScrolled);

  const headerBg = isMenuOpen
    ? 'bg-[#1B2A4A]'
    : isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-sm'
    : isScrollWorldPage
    ? 'bg-transparent border-transparent'
    : 'bg-white';

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col font-sans">

      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[#1B2A4A]/10 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[74px] md:h-[80px] flex justify-between items-center">

          {/* Logo Tipografico con font Outfit */}
          <Link 
            to="/" 
            className="relative z-50 flex-shrink-0 flex items-center gap-2.5 sm:gap-3.5 group select-none"
            aria-label="MBA Progetti e Gare d'Appalto"
          >
            <span
              className={`font-outfit text-[22px] sm:text-[24px] font-semibold tracking-[-0.02em] leading-none transition-colors duration-300 ${
                isDarkHeader ? 'text-white' : 'text-[#1b2a4a]'
              }`}
            >
              MBA
            </span>
            <span
              className={`font-outfit text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase leading-none transition-colors duration-300 ${
                isDarkHeader ? 'text-white/65' : 'text-[#7b869d]'
              }`}
            >
              PROGETTAZIONE E GARE D'APPALTO
            </span>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center h-full gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              const hasSub = Boolean(link.subLinks && link.subLinks.length > 0);

              if (hasSub) {
                return (
                  <div key={link.name} className="relative group/nav h-full flex items-center">
                    <Link
                      to={link.path}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] text-[14px] font-medium transition-colors duration-200 select-none ${
                        active
                          ? 'bg-[#F4EEDB] text-[#1b2a4a]'
                          : 'text-[#1b2a4a] group-hover/nav:bg-[#F4EEDB] hover:text-[#F5C400]'
                      }`}
                    >
                      {link.name}
                      <CaretDown
                        size={13}
                        weight="bold"
                        className="transition-transform duration-200 group-hover/nav:rotate-180 text-[#1b2a4a]"
                      />
                    </Link>

                    {/* Dropdown Card */}
                    <div className="absolute top-[calc(100%-1px)] left-0 pt-0 opacity-0 translate-y-1 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-200 z-50 before:absolute before:-top-2.5 before:left-0 before:right-0 before:h-2.5 before:content-['']">
                      <div className="bg-white border border-[#1b2a4a]/10 shadow-[0_12px_30px_rgba(27,42,74,0.08)] py-3 px-6 min-w-[170px] rounded-[2px]">
                        <div className="flex flex-col gap-2">
                          {link.subLinks!.map((sub) => {
                            const subActive = location.pathname === sub.path;
                            return (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`text-[14px] font-medium transition-colors py-1 block whitespace-nowrap ${
                                  subActive
                                    ? 'text-[#F5C400] font-semibold'
                                    : 'text-[#1b2a4a] hover:text-[#F5C400]'
                                }`}
                              >
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={link.name} className="relative h-full flex items-center">
                  <Link
                    to={link.path}
                    className={`relative py-1.5 text-[14px] font-medium transition-colors duration-200 ${
                      active
                        ? 'text-[#1b2a4a] font-semibold'
                        : 'text-[#1b2a4a] hover:text-[#F5C400]'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#F5C400]" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className={`lg:hidden relative z-50 w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
              isMenuOpen ? 'text-white' : 'text-[#1B2A4A]'
            }`}
            aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={26} weight="light" />
                </motion.span>
              ) : (
                <motion.span
                  key="burger"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <List size={26} weight="light" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* ── FULLSCREEN MOBILE MENU ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-0 z-40 bg-[#1B2A4A] flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-full gap-5 px-8 pt-28 pb-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 + i * 0.05 }}
                  className="w-full text-center"
                >
                  {link.subLinks ? (
                    <div className="flex flex-col gap-2">
                      <div className="inline-flex items-center justify-center gap-2">
                        <Link
                          to={link.path}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setOpenSubmenu(null);
                          }}
                          className={`text-2xl font-bold transition-colors ${
                            location.pathname === link.path ? 'text-[#F5C400]' : 'text-white hover:text-[#F5C400]'
                          }`}
                        >
                          {link.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setOpenSubmenu((v) => (v === link.name ? null : link.name))}
                          aria-label={`Apri sottomenu ${link.name}`}
                          className="p-1.5 text-white hover:text-[#F5C400] transition-colors"
                        >
                          <CaretDown
                            size={18}
                            weight="bold"
                            className={`transition-transform duration-300 ${openSubmenu === link.name ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {openSubmenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col items-center gap-2 pt-2 mt-2 border-t border-white/10">
                              {link.subLinks.map((sub) => (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={() => {
                                    setIsMenuOpen(false);
                                    setOpenSubmenu(null);
                                  }}
                                  className="text-sm font-medium text-[#F5C400] hover:text-white transition-colors py-2 px-4 rounded-sm bg-white/5 w-full max-w-xs text-center"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-bold transition-colors ${
                        isLinkActive(link) ? 'text-[#F5C400]' : 'text-white hover:text-[#F5C400]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1b2a4a] text-white pt-16 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-16">

            {/* 1. Colonna Sinistra: Brand & CTA Cantiere */}
            <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between space-y-6 md:space-y-0">
              <div className="space-y-5">
                <Link to="/" className="inline-block select-none">
                  <span className="text-white text-[24px] font-semibold leading-none tracking-[-0.02em] uppercase font-outfit">
                    MBA
                  </span>
                </Link>

                <div>
                  <p className="text-white text-[22px] sm:text-[26px] font-medium uppercase tracking-[0.06em] leading-[1.15]">
                    IL TUO PROSSIMO CANTIERE
                  </p>
                  <h3 className="text-[#F5C400] text-[clamp(30px,3vw,40px)] font-semibold uppercase tracking-[-0.02em] leading-[1.08] mt-1">
                    INIZIA QUI
                  </h3>
                </div>
              </div>

              <div className="pt-2 md:pt-4">
                <Link 
                  to="/contatti" 
                  className="inline-flex items-center justify-between w-full max-w-[280px] px-[26px] py-[15px] border border-white/20 text-white text-[11px] font-medium uppercase tracking-[0.2em] hover:border-[#F5C400] hover:text-[#F5C400] transition-colors rounded-[2px]"
                >
                  <span>RICHIEDI UNA CONSULENZA</span>
                  <CaretRight size={13} weight="bold" />
                </Link>
              </div>
            </div>

            {/* 2. Colonna Centrale: MENU */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-white/55 text-[11px] font-medium uppercase tracking-[0.2em] mb-4">
                MENU
              </h4>
              <ul className="space-y-2 text-[14px] text-white/85 leading-[1.65]">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/studio" className="hover:text-white transition-colors">Studio</Link>
                </li>
                <li>
                  <Link to="/servizi/gare" className="hover:text-white transition-colors">Gare OEV</Link>
                </li>
                <li>
                  <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio gare</Link>
                </li>
                <li>
                  <Link to="/servizi/progettazione" className="hover:text-white transition-colors">Progettazione</Link>
                </li>
                <li>
                  <Link to="/servizi/rilievi" className="hover:text-white transition-colors">Rilievi</Link>
                </li>
                <li>
                  <Link to="/servizi/bim" className="hover:text-white transition-colors">Servizi BIM</Link>
                </li>
                <li>
                  <Link to="/risorse" className="hover:text-white transition-colors">News</Link>
                </li>
                <li>
                  <Link to="/simulatore" className="hover:text-white transition-colors">Simulatore</Link>
                </li>
              </ul>
            </div>

            {/* 3. Colonna Destra: CONTATTI */}
            <div className="md:col-span-4 lg:col-span-4 flex flex-col justify-between space-y-6 md:space-y-0">
              <div>
                <h4 className="text-white/55 text-[11px] font-medium uppercase tracking-[0.2em] mb-4">
                  CONTATTI
                </h4>
                <div className="space-y-1.5 text-[14px] text-white/85 leading-[1.7] mb-6">
                  <p>Via Sardarulo 7, 81016 San Potito Sannitico (CE)</p>
                  <p>
                    <a href="tel:+393286285861" className="hover:text-white transition-colors">328 6285861</a>
                  </p>
                  <p>
                    <a href="mailto:arch.mariobiondi@gmail.com" className="hover:text-white transition-colors">arch.mariobiondi@gmail.com</a>
                  </p>
                  <p>
                    <a href="mailto:mario.biondi@archiworldpec.it" className="hover:text-white transition-colors">PEC mario.biondi@archiworldpec.it</a>
                  </p>
                  <p>P. IVA 04274770611</p>
                </div>
              </div>

              {/* Social Icons spinti in basso e allineati sulla linea base */}
              <div className="flex items-center gap-4 text-white/80 pt-2 md:pt-0">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#F5C400] transition-colors">
                  <LinkedinLogo size={18} weight="fill" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#F5C400] transition-colors">
                  <InstagramLogo size={18} weight="regular" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#F5C400] transition-colors">
                  <FacebookLogo size={18} weight="fill" />
                </a>
                <a href="https://wa.me/393286285861" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-[#F5C400] transition-colors">
                  <WhatsappLogo size={18} weight="regular" />
                </a>
              </div>
            </div>

          </div>

          {/* Barra Privacy & Copyright discreta */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-white/40 text-[11px] font-medium tracking-[0.2em] uppercase font-outfit gap-4">
            <p>MBA · PROGETTAZIONE E GARE D'APPALTO</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white/70 transition-colors">PRIVACY · COOKIE</Link>
            </div>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
    </SmoothScroll>
  );
}
