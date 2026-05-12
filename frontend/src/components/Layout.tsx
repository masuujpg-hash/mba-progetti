import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { List, X } from '@phosphor-icons/react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/studio', label: 'Studio' },
  { 
    label: 'Settori',
    dropdown: [
      { to: '/settori#gare', label: 'Gare d\'Appalto' },
      { to: '/settori#progettazione', label: 'Progettazione' },
      { to: '/settori#rilievi', label: 'Rilievi' },
      { to: '/settori#bim', label: 'BIM' }
    ]
  },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/risorse', label: 'Risorse' },
  { to: '/contatti', label: 'Contatti' },
];

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviziOpen, setServiziOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServiziOpen(false);
    
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServiziOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path?: string) => {
    if (!path) return false;
    return path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  };

  const isDropdownActive = () => location.pathname.startsWith('/settori');

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-700 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(27,42,74,0.06)]'
            : 'bg-gradient-to-b from-navy/90 via-navy/50 to-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-16 md:h-20 relative">
          <Link to="/" className="block h-8 md:h-10 transition-all duration-300 z-50">
            <img
              src={scrolled ? '/logo.svg' : '/logo-white.svg'}
              alt="MBA Progetti"
              className="h-full w-auto"
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setServiziOpen(!serviziOpen)}
                      className={`flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                        isDropdownActive()
                          ? scrolled ? 'text-navy' : 'text-white'
                        : scrolled ? 'text-dgray hover:text-navy' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <div className={`w-1 h-1 rounded-full bg-gold ${serviziOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
                    </button>
                    
                    {serviziOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-64 bg-navy shadow-2xl border border-white/10 flex flex-col z-50">
                        {link.dropdown.map((subLink, idx) => (
                          <Link
                            key={subLink.to}
                            to={subLink.to}
                            className={`px-6 py-5 text-[10px] font-bold tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-all ${
                              idx !== link.dropdown.length - 1 ? 'border-b border-white/5' : ''
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive(link.to)
                        ? scrolled ? 'text-navy' : 'text-white'
                        : scrolled ? 'text-dgray hover:text-navy' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            <div className={`h-8 w-[1px] ${scrolled ? 'bg-navy/10' : 'bg-white/10'} mx-2 hidden md:block`} />

            <button
              className={`p-2 rounded-full transition-colors flex items-center gap-2 ${scrolled ? 'text-navy hover:bg-navy/5' : 'text-white hover:bg-white/10'}`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[9px] font-bold tracking-[0.1em] uppercase opacity-60">Studio</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 transition-colors z-50 relative ${scrolled || mobileOpen ? 'text-navy' : 'text-white'}`}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>

        <div 
          className={`md:hidden fixed inset-0 bg-white transition-transform duration-500 ease-in-out z-40 pt-20 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col px-8 h-full overflow-y-auto pb-10">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.label} className="flex flex-col py-4 border-b border-lgray">
                  <div className="text-xs font-bold tracking-[0.2em] uppercase text-navy mb-4">
                    {link.label}
                  </div>
                  <div className="flex flex-col pl-4 border-l border-gold/30 space-y-5">
                    {link.dropdown.map((subLink) => (
                      <Link
                        key={subLink.to}
                        to={subLink.to}
                        className="text-xs font-bold tracking-widest text-navy/60 hover:text-navy"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`py-6 text-xs font-bold tracking-[0.2em] uppercase border-b border-lgray ${
                    isActive(link.to) ? 'text-navy' : 'text-dgray'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>

      <footer className="w-full bg-navy text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 px-6 md:px-10 py-20">
          <div className="space-y-8">
            <img src="/logo-white.svg" alt="MBA Progetti" className="h-8 w-auto opacity-80" />
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Specialisti in progettazione tecnica e offerte migliorative per appalti pubblici. Precisione e metodo al servizio delle imprese.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-8">Navigazione</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to || '#'} className="text-xs font-bold tracking-widest text-white/40 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-8">Contatti</h4>
            <ul className="space-y-4 text-xs font-bold tracking-widest text-white/40">
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-white/20 uppercase tracking-tighter">Sede operativa</span>
                Via Sardarulo, 7 — 81016 <br /> San Potito Sannitico (CE)
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-white/20 uppercase tracking-tighter">Email</span>
                info@mbaprogetti.it
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[9px] text-white/20 uppercase tracking-tighter">Telefono</span>
                +39 328 628 5861
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 py-8">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-white/20 tracking-widest uppercase">&copy; {new Date().getFullYear()} MBA Progetti. Tutti i diritti riservati.</p>
            <div className="flex gap-8 text-[10px] text-white/20 tracking-widest uppercase">
              <span>P.IVA 04724770611</span>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
