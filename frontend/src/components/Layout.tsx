import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Envelope, MapPin, LinkedinLogo, InstagramLogo, List, X, CaretDown } from '@phosphor-icons/react';
import CookieBanner from './CookieBanner';
import SmoothScroll from './SmoothScroll';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serviziOpen, setServiziOpen] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setServiziOpen(false);
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Studio', path: '/studio' },
    {
      name: 'Servizi',
      path: '/servizi',
      subLinks: [
        { name: 'Gare OEPV', path: '/servizi/gare' },
        { name: 'Progettazione', path: '/servizi/progettazione' },
        { name: 'Rilievi Digitali', path: '/servizi/rilievi' },
        { name: 'BIM Strategy', path: '/servizi/bim' },
      ],
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Simulatore', path: '/simulatore' },
    { name: 'Risorse', path: '/risorse' },
  ];

  // Pages where hero covers full viewport → transparent navbar at top
  const isScrollWorldPage = ['/home-v2', '/home2'].includes(location.pathname);

  const headerBg = isMenuOpen
    ? 'bg-[#1B2A4A]'
    : isScrolled
    ? 'bg-white/95 border-b border-[#1B2A4A]/5 shadow-sm shadow-[#1B2A4A]/5 backdrop-blur-md'
    : isScrollWorldPage
    ? 'bg-transparent'
    : 'bg-white';

  // Nav link color: white on scroll-world pages when at top, else dark
  const navLinkBase = (active: boolean) => {
    if (isScrollWorldPage && !isScrolled && !isMenuOpen) {
      return `text-[11px] font-bold uppercase tracking-[0.35em] transition-colors duration-300 hover:text-[#B8972A] ${active ? 'text-[#B8972A]' : 'text-white/90'}`;
    }
    return `text-[11px] font-bold uppercase tracking-[0.35em] transition-colors duration-300 hover:text-[#B8972A] ${active ? 'text-[#B8972A]' : 'text-[#1B2A4A]/80'}`;
  };

  const isActive = (path: string) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path);

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col font-sans">

      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5 md:py-7'
        } ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="relative z-50 flex-shrink-0">
            <img
              src="/logo.svg"
              alt="MBA Progetti"
              className={`h-[42px] md:h-[50px] w-auto transition-all duration-300 ${
                isMenuOpen ? 'brightness-0 invert' : ''
              }`}
            />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group/nav">
                <Link
                  to={link.path}
                  className={`inline-flex items-center gap-1.5 ${navLinkBase(isActive(link.path))}`}
                >
                  {link.name}
                  {link.subLinks && (
                    <CaretDown
                      size={10}
                      weight="bold"
                      className="transition-transform duration-300 group-hover/nav:rotate-180 text-current"
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {link.subLinks && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-white border border-[#1B2A4A]/10 p-5 min-w-[210px] shadow-2xl">
                      <div className="flex flex-col gap-4">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1B2A4A]/60 hover:text-[#B8972A] transition-colors group/sub"
                          >
                            <span className="w-0 group-hover/sub:w-4 h-px bg-[#B8972A] transition-all duration-300 block" />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/contatti"
              className="btn-ghost-dark px-7 py-2.5 text-[10px]"
            >
              Contatti
            </Link>
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
            <div className="flex flex-col items-center justify-center min-h-full gap-6 px-8 pt-28 pb-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.07 }}
                  className="w-full text-center"
                >
                  {link.subLinks ? (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => setServiziOpen((v) => !v)}
                        className="inline-flex items-center justify-center gap-3 text-3xl font-bold text-white uppercase tracking-tighter hover:text-[#B8972A] transition-colors"
                      >
                        {link.name}
                        <CaretDown
                          size={20}
                          weight="bold"
                          className={`transition-transform duration-300 ${serviziOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {serviziOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col items-center gap-3 pt-3 border-t border-white/10">
                              {link.subLinks.map((sub) => (
                                <Link
                                  key={sub.path}
                                  to={sub.path}
                                  className="text-xs font-bold uppercase tracking-[0.4em] text-[#B8972A]/60 hover:text-[#B8972A] transition-colors py-1"
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
                      className="text-3xl font-bold text-white uppercase tracking-tighter hover:text-[#B8972A] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 + navLinks.length * 0.07 }}
                className="mt-8 w-full"
              >
                <Link
                  to="/contatti"
                  className="block w-full text-center border border-white text-white py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#1B2A4A] transition-all duration-300"
                >
                  Contatti
                </Link>
              </motion.div>
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

            {/* Logo e Descrizione */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-10">
                <img src="/logo.svg" alt="MBA Progetti" className="h-[72px] w-auto brightness-0 invert" />
              </Link>
            </div>

            {/* Menu */}
            <div className="lg:col-span-3">
              <h4 className="text-[#B8972A] text-[13px] font-bold uppercase tracking-[0.5em] mb-8">Menu</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/60 hover:text-[#B8972A] text-[13px] uppercase tracking-widest transition-colors font-bold">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatti */}
            <div className="lg:col-span-3">
              <h4 className="text-[#B8972A] text-[13px] font-bold uppercase tracking-[0.5em] mb-8">Contatti</h4>
              <ul className="space-y-6">
                <li>
                  <a href="mailto:info@mbaprogetti.it" className="group flex items-center gap-4 text-white hover:text-[#B8972A] transition-colors">
                    <Envelope size={20} weight="light" className="text-[#B8972A] flex-shrink-0" />
                    <span className="text-[13px] uppercase font-bold tracking-widest">info@mbaprogetti.it</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+393286285861" className="group flex items-center gap-4 text-white hover:text-[#B8972A] transition-colors">
                    <Phone size={20} weight="light" className="text-[#B8972A] flex-shrink-0" />
                    <span className="text-[13px] uppercase font-bold tracking-widest">+39 328 628 5861</span>
                  </a>
                </li>
                <li className="flex items-start gap-4 text-white/60">
                  <MapPin size={20} weight="light" className="text-[#B8972A] flex-shrink-0 mt-0.5" />
                  <span className="text-[11px] uppercase font-bold tracking-widest leading-relaxed">
                    Via Sardarulo, 7 <br /> 81016 San Potito Sannitico (CE)
                  </span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="lg:col-span-2">
              <h4 className="text-[#B8972A] text-[13px] font-bold uppercase tracking-[0.5em] mb-8">Social</h4>
              <div className="flex gap-6 mt-4">
                <a href="#" className="text-white/40 hover:text-[#B8972A] transition-colors">
                  <LinkedinLogo size={28} weight="light" />
                </a>
                <a href="#" className="text-white/40 hover:text-[#B8972A] transition-colors">
                  <InstagramLogo size={28} weight="light" />
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
