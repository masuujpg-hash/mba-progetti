import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Envelope, MapPin, LinkedinLogo, InstagramLogo, List, X, CaretDown, ArrowRight } from '@phosphor-icons/react';
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
      path: '/servizi/rilievi',
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
      return item.subLinks.some((sub) => location.pathname === sub.path);
    }
    if (item.path === '/portfolio') return location.pathname.startsWith('/portfolio');
    return location.pathname === item.path;
  };

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

          {/* Logo */}
          <Link to="/" className="relative z-50 flex-shrink-0">
            <img
              src="/logo.svg"
              alt="MBA Progetti"
              className={`h-[40px] md:h-[46px] w-auto transition-all duration-300 ${
                isMenuOpen ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center h-full gap-5 xl:gap-8">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              const hasSub = Boolean(link.subLinks && link.subLinks.length > 0);

              if (hasSub) {
                return (
                  <div key={link.name} className="relative group/nav h-full flex items-center">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-t-sm text-[15px] font-medium transition-colors duration-200 cursor-pointer select-none ${
                        active
                          ? 'bg-[#F4EEDB] text-[#1B2A4A]'
                          : 'text-[#1B2A4A] group-hover/nav:bg-[#F4EEDB] hover:text-[#1B2A4A]'
                      }`}
                    >
                      {link.name}
                      <CaretDown
                        size={13}
                        weight="bold"
                        className="transition-transform duration-200 group-hover/nav:rotate-180 text-[#1B2A4A]"
                      />
                    </div>

                    {/* Dropdown Card */}
                    <div className="absolute top-[calc(100%-1px)] left-0 pt-0 opacity-0 translate-y-1 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-200 z-50 before:absolute before:-top-2.5 before:left-0 before:right-0 before:h-2.5 before:content-['']">
                      <div className="bg-white border border-[#1B2A4A]/10 shadow-[0_12px_30px_rgba(27,42,74,0.08)] py-3 px-6 min-w-[170px]">
                        <div className="flex flex-col gap-2">
                          {link.subLinks!.map((sub) => {
                            const subActive = location.pathname === sub.path;
                            return (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                className={`text-[14px] sm:text-[15px] font-medium transition-colors py-1 block whitespace-nowrap ${
                                  subActive
                                    ? 'text-[#B8972A] font-semibold'
                                    : 'text-[#1B2A4A] hover:text-[#B8972A]'
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
                    className={`relative py-1.5 text-[15px] font-medium transition-colors duration-200 ${
                      active
                        ? 'text-[#1B2A4A] font-semibold'
                        : 'text-[#1B2A4A] hover:text-[#B8972A]'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#B8972A]" />
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
                      <button
                        type="button"
                        onClick={() => setOpenSubmenu((v) => (v === link.name ? null : link.name))}
                        className="inline-flex items-center justify-center gap-2 text-2xl font-bold text-white hover:text-[#B8972A] transition-colors"
                      >
                        {link.name}
                        <CaretDown
                          size={18}
                          weight="bold"
                          className={`transition-transform duration-300 ${openSubmenu === link.name ? 'rotate-180' : ''}`}
                        />
                      </button>
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
                                  className="text-sm font-medium text-[#B8972A] hover:text-white transition-colors py-2 px-4 rounded-sm bg-white/5 w-full max-w-xs text-center"
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
                        isLinkActive(link) ? 'text-[#B8972A]' : 'text-white hover:text-[#B8972A]'
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
      <footer className="bg-[#1B2A4A] pt-16 md:pt-28 pb-12 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-px bg-white/5" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

            {/* Logo e Descrizione con LA NOSTRA ARCHITETTURA INIZIA QUI */}
            <div className="lg:col-span-5 space-y-6">
              <Link to="/" className="inline-block mb-1">
                <img src="/logo.svg" alt="MBA Progetti" className="h-[44px] w-auto brightness-0 invert" />
              </Link>
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-[0.25em] mb-1">
                  LA NOSTRA ARCHITETTURA
                </p>
                <h3 className="text-[#B8972A] text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
                  INIZIA QUI
                </h3>
                <p className="text-white/60 text-xs font-light max-w-sm leading-relaxed mb-6">
                  Richiedi una consulenza tecnica per la tua prossima gara d'appalto o progetto esecutivo.
                </p>
                <Link to="/contatti" className="btn-ghost-white px-6 py-2.5 text-[10px] tracking-widest uppercase font-bold inline-flex items-center gap-2">
                  Richiedi una Consulenza <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Menu */}
            <div className="lg:col-span-2">
              <h4 className="text-[#B8972A] text-[12px] font-bold uppercase tracking-[0.4em] mb-6">Menu</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/60 hover:text-[#B8972A] text-[11px] uppercase tracking-widest transition-colors font-bold">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servizi */}
            <div className="lg:col-span-2">
              <h4 className="text-[#B8972A] text-[12px] font-bold uppercase tracking-[0.4em] mb-6">Servizi</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/servizi/gare" className="text-white/60 hover:text-[#B8972A] text-[11px] uppercase tracking-widest transition-colors font-bold">
                    Gare OEPV
                  </Link>
                </li>
                <li>
                  <Link to="/servizi/progettazione" className="text-white/60 hover:text-[#B8972A] text-[11px] uppercase tracking-widest transition-colors font-bold">
                    Progettazione
                  </Link>
                </li>
                <li>
                  <Link to="/servizi/rilievi" className="text-white/60 hover:text-[#B8972A] text-[11px] uppercase tracking-widest transition-colors font-bold">
                    Rilievi Digitali
                  </Link>
                </li>
                <li>
                  <Link to="/servizi/bim" className="text-white/60 hover:text-[#B8972A] text-[11px] uppercase tracking-widest transition-colors font-bold">
                    BIM Strategy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contatti & Social */}
            <div className="lg:col-span-3">
              <h4 className="text-[#B8972A] text-[12px] font-bold uppercase tracking-[0.4em] mb-6">Contatti</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:info@mbaprogetti.it" className="group flex items-center gap-3 text-white hover:text-[#B8972A] transition-colors">
                    <Envelope size={18} weight="light" className="text-[#B8972A] flex-shrink-0" />
                    <span className="text-[12px] uppercase font-bold tracking-widest">info@mbaprogetti.it</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+393286285861" className="group flex items-center gap-3 text-white hover:text-[#B8972A] transition-colors">
                    <Phone size={18} weight="light" className="text-[#B8972A] flex-shrink-0" />
                    <span className="text-[12px] uppercase font-bold tracking-widest">+39 328 628 5861</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <MapPin size={18} weight="light" className="text-[#B8972A] flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] uppercase font-bold tracking-widest leading-relaxed">
                    Via Sardarulo, 7 <br /> 81016 San Potito Sannitico (CE)
                  </span>
                </li>
              </ul>
              <div className="flex gap-5 mt-6 pt-4 border-t border-white/5">
                <a href="#" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/40 hover:text-[#B8972A] transition-colors">
                  <LinkedinLogo size={24} weight="light" />
                </a>
                <a href="#" rel="noopener noreferrer" aria-label="Instagram" className="text-white/40 hover:text-[#B8972A] transition-colors">
                  <InstagramLogo size={24} weight="light" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">
              © {new Date().getFullYear()} MBA Progetti srl. P.IVA 04724770611
            </p>
            <div className="flex gap-8 text-white/20 text-[10px] uppercase font-bold tracking-widest">
              <Link to="/privacy" className="hover:text-[#B8972A] transition-colors">
                Privacy &amp; Cookie Policy
              </Link>
              <Link to="/admin" className="hover:text-[#B8972A] transition-colors">
                Admin CMS
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
    </SmoothScroll>
  );
}
