import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CaretLeft,
  CaretRight,
  Buildings,
  Calendar,
  Medal,
  Users,
  Clock,
  FileMagnifyingGlass,
  CompassTool,
  Article,
  PencilLine,
  Crosshair,
  Cube
} from '@phosphor-icons/react';
import { getHomeProjects, getHomeArticles } from '../lib/contentStore';

export default function Home() {
  const [homeProjects, setHomeProjects] = useState(getHomeProjects);
  const [homeArticles, setHomeArticles] = useState(getHomeArticles);

  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);
  const [portfolioWidth, setPortfolioWidth] = useState(0);

  // NEWS CAROUSEL STATE
  const [newsIndex, setNewsIndex] = useState(0);
  const [isNewsPaused, setIsNewsPaused] = useState(false);
  const newsContainerRef = useRef<HTMLDivElement>(null);
  const [newsWidth, setNewsWidth] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setHomeProjects(getHomeProjects());
      setHomeArticles(getHomeArticles());
    };
    window.addEventListener('mba_projects_updated', handleUpdate);
    window.addEventListener('mba_articles_updated', handleUpdate);
    return () => {
      window.removeEventListener('mba_projects_updated', handleUpdate);
      window.removeEventListener('mba_articles_updated', handleUpdate);
    };
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (portfolioContainerRef.current) {
        setPortfolioWidth(portfolioContainerRef.current.clientWidth);
      }
      if (newsContainerRef.current) {
        setNewsWidth(newsContainerRef.current.clientWidth);
      }
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const ro = new ResizeObserver(updateDimensions);
    if (portfolioContainerRef.current) ro.observe(portfolioContainerRef.current);
    if (newsContainerRef.current) ro.observe(newsContainerRef.current);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      ro.disconnect();
    };
  }, []);

  const maxPortfolioIndex = Math.max(0, homeProjects.length - itemsPerView);
  const maxNewsIndex = Math.max(0, homeArticles.length - itemsPerView);

  useEffect(() => {
    setPortfolioIndex((prev) => Math.min(prev, maxPortfolioIndex));
  }, [maxPortfolioIndex]);

  useEffect(() => {
    setNewsIndex((prev) => Math.min(prev, maxNewsIndex));
  }, [maxNewsIndex]);

  const gap = 24;
  const portfolioCardWidth = portfolioWidth > 0 
    ? (itemsPerView === 1 ? portfolioWidth : (portfolioWidth - (itemsPerView - 1) * gap) / itemsPerView)
    : 0;
  const portfolioStep = portfolioCardWidth + gap;
  const portfolioX = -(portfolioIndex * portfolioStep);

  const newsCardWidth = newsWidth > 0 
    ? (itemsPerView === 1 ? newsWidth : (newsWidth - (itemsPerView - 1) * gap) / itemsPerView)
    : 0;
  const newsStep = newsCardWidth + gap;
  const newsX = -(newsIndex * newsStep);

  // Autoplay automatico a intervallo per il carosello progetti
  useEffect(() => {
    if (isPortfolioPaused || homeProjects.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setPortfolioIndex((prev) => (prev >= maxPortfolioIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPortfolioPaused, homeProjects.length, itemsPerView, maxPortfolioIndex]);

  // Autoplay automatico a intervallo per il carosello news
  useEffect(() => {
    if (isNewsPaused || homeArticles.length <= itemsPerView) return;

    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev >= maxNewsIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [isNewsPaused, homeArticles.length, itemsPerView, maxNewsIndex]);

  const handleNextPortfolio = () => {
    setPortfolioIndex((prev) => (prev >= maxPortfolioIndex ? 0 : prev + 1));
  };

  const handlePrevPortfolio = () => {
    setPortfolioIndex((prev) => (prev <= 0 ? maxPortfolioIndex : prev - 1));
  };

  const handleNextNews = () => {
    setNewsIndex((prev) => (prev >= maxNewsIndex ? 0 : prev + 1));
  };

  const handlePrevNews = () => {
    setNewsIndex((prev) => (prev <= 0 ? maxNewsIndex : prev - 1));
  };

  // Specific article images matching the mockup
  const newsImages = [
    '/media/portfolio/15_ospedale_sarteano.jpg',
    '/media/portfolio/p02.webp',
    '/media/portfolio/p03.webp'
  ];

  // Touch Swipe Refs for Mobile
  const portfolioTouchStartX = useRef<number>(0);
  const portfolioTouchStartY = useRef<number>(0);

  const newsTouchStartX = useRef<number>(0);
  const newsTouchStartY = useRef<number>(0);

  return (
    <div className="bg-white selection:bg-navy selection:text-white overflow-x-hidden">
      
      {/* ── 1. CINEMATIC HERO ── */}
      <section className="relative min-h-[92vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-navy">
        {/* Background image with soft overlay and gradient fade to white */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            alt="MBA Progetti Studio"
            className="w-full h-full object-cover object-center grayscale contrast-125 opacity-35 scale-100"
          />
          {/* Blue gradient overlay fading to white at the bottom as shown in the mockup */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/60 to-white" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-white/80 text-[11px] font-medium uppercase tracking-[0.25em] md:tracking-[0.4em] mb-6 block font-outfit">
              PROGETTAZIONE E GARE D'APPALTO
            </span>
            
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold uppercase tracking-[0.05em] leading-[1.2] mb-6 font-outfit">
              PROGETTIAMO IL FUTURO
            </h1>

            <p className="text-white/85 text-base sm:text-lg font-normal max-w-2xl leading-[1.65] mb-10 font-outfit">
              In ogni gara progettiamo il futuro lavoro, insieme ai nostri clienti. Ogni aggiudicazione è continuità per l'impresa e crescita per il nostro studio, per questo curiamo ogni offerta tecnica con passione e dedizione.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link 
                to="/servizi/gare" 
                className="btn-ghost-white group w-full max-w-[270px] sm:w-[260px] h-[52px] px-[26px] py-[15px] text-[11px] font-medium tracking-[0.2em] uppercase rounded-[2px] inline-flex items-center justify-center gap-3.5 transition-all shadow-2xs font-outfit"
              >
                <span>GARE OEPV</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform inline-block shrink-0" />
              </Link>
              <Link 
                to="/studio" 
                className="btn-ghost-white group w-full max-w-[270px] sm:w-[260px] h-[52px] px-[26px] py-[15px] text-[11px] font-medium tracking-[0.2em] uppercase rounded-[2px] inline-flex items-center justify-center gap-3.5 transition-all shadow-2xs font-outfit"
              >
                <span>SCOPRI LO STUDIO</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform inline-block shrink-0" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SPECIALISTI IN OFFERTE TECNICHE MIGLIORATIVE ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-10">
            <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium tracking-[0.2em] px-3.5 py-1 rounded-[1px] uppercase mb-4 shadow-2xs font-outfit">
              GARE OEPV
            </span>
            <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.04em] uppercase leading-[1.15] mb-5 font-outfit">
              SPECIALISTI IN OFFERTE TECNICHE MIGLIORATIVE
            </h2>
            <p className="text-[#3d4a66] text-base md:text-[17px] font-normal leading-[1.65] font-outfit">
              Mettiamo al servizio dei nostri clienti <strong className="font-bold text-[#1B2A4A]">oltre dieci anni di esperienza</strong> nel settore degli appalti pubblici, traducendo competenza tecnica e visione strategica in offerte migliori, più competitive e <strong className="font-bold text-[#1B2A4A]">orientate al massimo punteggio</strong>.
            </p>
          </div>

          {/* 6 Stats / KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 my-12">
            <StatItem icon={Calendar} value="+10" label="ANNI DI ESPERIENZA" />
            <StatItem icon={PodiumStarIcon} value="63%" label="GARE SUL PODIO" />
            <StatItem icon={Medal} value="38%" label="GARE AGGIUDICATE" />
            <StatItem icon={Clock} value="100%" label="RISPETTO DEI TEMPI" />
            <StatItem icon={Buildings} value="+40" label="IMPRESE CLIENTI" />
            <StatItem icon={Users} value="+10" label="COLLABORATORI" />
          </div>

          {/* Interstitial Paragraph */}
          <p className="text-[#3d4a66] text-base md:text-[17px] font-normal leading-[1.65] mb-12 text-left font-outfit">
            Lo studio adotta un <strong className="font-bold text-[#1B2A4A]">approccio selettivo</strong> nella redazione delle offerte tecniche, <strong className="font-bold text-[#1B2A4A]">orientato alla qualità della proposta e non alla produzione seriale</strong>. Ogni intervento è sviluppato con un <strong className="font-bold text-[#1B2A4A]">approfondimento progettuale mirato</strong>, finalizzato a massimizzare la coerenza e l'efficacia delle soluzioni migliorative.
          </p>

          {/* 3 Feature Cards (ANALIZZIAMO / PROGETTIAMO / VALORIZZIAMO) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white border border-[#e2e8f0] p-8 sm:p-10 rounded-[1px] flex flex-col justify-between">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[1px] mb-7">
                  <FileMagnifyingGlass size={26} weight="regular" />
                </div>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-3 font-outfit">
                  ANALIZZIAMO
                </h3>
                <p className="text-[#3d4a66] text-sm sm:text-[15px] font-normal leading-relaxed font-outfit">
                  Ogni disciplinare e progetto esecutivo vengono esaminati con metodo per individuare <strong className="font-bold text-[#1B2A4A]">criteri premianti, vincoli tecnici e margini di miglioramento</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] p-8 sm:p-10 rounded-[1px] flex flex-col justify-between">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[1px] mb-7">
                  <CompassTool size={26} weight="regular" />
                </div>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-3 font-outfit">
                  PROGETTIAMO
                </h3>
                <p className="text-[#3d4a66] text-sm sm:text-[15px] font-normal leading-relaxed font-outfit">
                  Elaboriamo soluzioni migliorative basate su <strong className="font-bold text-[#1B2A4A]">coerenza tecnica e fattibilità operativa</strong>, integrando architettura, strutture ed impianti.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] p-8 sm:p-10 rounded-[1px] flex flex-col justify-between">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[1px] mb-7">
                  <Article size={26} weight="regular" />
                </div>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-3 font-outfit">
                  VALORIZZIAMO
                </h3>
                <p className="text-[#3d4a66] text-sm sm:text-[15px] font-normal leading-relaxed font-outfit">
                  Trasformiamo i contenuti tecnici in <strong className="font-bold text-[#1B2A4A]">documentazione chiara e immediatamente valutabile</strong> per agevolare la commissione giudicatrice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. I NOSTRI PROGETTI & APPALTI (PORTFOLIO CAROUSEL) ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/40 overflow-hidden" id="portfolio-home">
        <div className="px-6 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-10">
            <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium tracking-[0.2em] px-3.5 py-1 rounded-[1px] uppercase mb-4 shadow-2xs font-outfit">
              PORTFOLIO COMPLETO
            </span>
            <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] font-outfit">
              I NOSTRI PROGETTI & APPALTI
            </h2>
          </div>

          {/* Slider Track with Mobile Touch Swipe and Auto-slide Pause on Hover */}
          <div 
            ref={portfolioContainerRef}
            className="overflow-hidden relative touch-pan-y"
            onMouseEnter={() => setIsPortfolioPaused(true)}
            onMouseLeave={() => setIsPortfolioPaused(false)}
            onTouchStart={(e) => {
              setIsPortfolioPaused(true);
              portfolioTouchStartX.current = e.touches[0].clientX;
              portfolioTouchStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              setIsPortfolioPaused(false);
              const deltaX = portfolioTouchStartX.current - e.changedTouches[0].clientX;
              const deltaY = portfolioTouchStartY.current - e.changedTouches[0].clientY;
              if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                if (deltaX > 0) {
                  handleNextPortfolio();
                } else {
                  handlePrevPortfolio();
                }
              }
            }}
          >
            <motion.div 
              animate={{ x: portfolioX }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="flex gap-6"
            >
              {homeProjects.map((p) => (
                <div 
                  key={p.id} 
                  style={{ width: portfolioCardWidth > 0 ? `${portfolioCardWidth}px` : '100%' }}
                  className="shrink-0"
                >
                  <ProjectCard 
                    id={p.id}
                    title={p.title}
                    cat={p.category}
                    img={p.image}
                    pos={p.location}
                    rank={p.rank}
                    amount={p.amount}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Bar: CTA on Left, Carousel Controls on Right (Allineati sulla stessa riga anche da mobile) */}
          <div className="mt-8 sm:mt-10 flex flex-row items-center justify-between gap-3 sm:gap-4">
            <Link 
              to="/portfolio" 
              className="border border-[#1B2A4A]/25 hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[48px] sm:h-[52px] px-3 sm:px-[26px] py-[14px] text-[11px] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-medium text-[#1B2A4A] transition-all rounded-[2px] shadow-2xs inline-flex items-center justify-center gap-2 sm:gap-3 group flex-1 sm:flex-initial"
            >
              <span className="truncate">TUTTI I PROGETTI</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
              <button 
                onClick={handlePrevPortfolio}
                className="w-10 h-10 sm:w-11 sm:h-11 border border-[#1B2A4A]/20 text-[#1B2A4A] hover:border-[#F5C400] hover:text-[#F5C400] transition-colors bg-white rounded-[1px] shadow-2xs flex items-center justify-center shrink-0"
                aria-label="Progetto Precedente"
              >
                <CaretLeft size={18} />
              </button>
              <button 
                onClick={handleNextPortfolio}
                className="w-10 h-10 sm:w-11 sm:h-11 border border-[#1B2A4A]/20 text-[#1B2A4A] hover:border-[#F5C400] hover:text-[#F5C400] transition-colors bg-white rounded-[1px] shadow-2xs flex items-center justify-center shrink-0"
                aria-label="Progetto Successivo"
              >
                <CaretRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SIMULATORE DEL PUNTEGGIO ECONOMICO ── */}
      <section className="py-16 md:py-24 bg-white border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium tracking-[0.2em] px-3.5 py-1 rounded-[1px] uppercase shadow-2xs font-outfit">
                IL SIMULATORE
              </span>
              <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] font-outfit">
                SIMULATORE DEL PUNTEGGIO ECONOMICO
              </h2>
              <p className="text-[#3d4a66] text-base md:text-[17px] font-normal leading-[1.65] font-outfit">
                Uno strumento esclusivo sviluppato per calcolare in tempo reale il punteggio economico della tua offerta nelle gare OEPV. Inserisci ribasso, importi a base di gara e seleziona la formula di attribuzione (interdittiva, quadratica o bilineare) per simulare scenari competitivi e massimizzare la probabilità di aggiudicazione.
              </p>
              <div className="pt-2">
                <Link 
                  to="/simulatore" 
                  className="btn-ghost-dark group w-full max-w-[270px] sm:w-[260px] h-[52px] px-[26px] py-[15px] text-[11px] font-medium tracking-[0.2em] uppercase rounded-[2px] inline-flex items-center justify-center gap-3.5 transition-all shadow-2xs font-outfit"
                >
                  <span>ACCEDI AL SIMULATORE</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform inline-block shrink-0" />
                </Link>
              </div>
            </div>

            {/* Right Column: Simulator Mockup Image */}
            <div className="lg:col-span-6">
              <div className="relative group overflow-hidden rounded-sm border border-navy/10 shadow-lg bg-neutral-100">
                <img 
                  src="/media/simulator_preview.jpg" 
                  alt="Simulatore Punteggio Economico MBA Progetti" 
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. SOLUZIONI INTEGRATE ── */}
      <section className="py-16 md:py-24 bg-white border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium tracking-[0.2em] px-3.5 py-1 rounded-[1px] uppercase mb-4 shadow-2xs font-outfit">
              ALTRI SERVIZI
            </span>
            <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] mb-4 font-outfit">
              SOLUZIONI INTEGRATE
            </h2>
            <p className="text-[#3d4a66] text-base md:text-[17px] font-normal max-w-2xl leading-[1.65] font-outfit">
              Un approccio multidisciplinare che unisce rilievo digitale, modellazione BIM e progettazione avanzata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceBentoCard 
              icon={PencilLine}
              title="PROGETTAZIONE" 
              link="/servizi/progettazione"
              desc="Edifici pubblici e privati, ristrutturazioni, interior design."
            />
            <ServiceBentoCard 
              icon={Crosshair}
              title="RILIEVI" 
              link="/servizi/rilievi"
              desc="Digitalizzazione del costruito tramite Laser Scanner 3D e droni."
            />
            <ServiceBentoCard 
              icon={Cube}
              title="SERVIZI BIM" 
              link="/servizi/bim"
              desc="Modellazione informativa e gestione dei processi BIM per ogni fase."
            />
          </div>
        </div>
      </section>

      {/* ── 6. AGGIORNAMENTI DALLO STUDIO (NEWS / BLOG) ── */}
      <section className="py-16 md:py-24 bg-white border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-10">
            <span className="inline-block bg-[#F5C400] text-white text-[11px] font-medium tracking-[0.2em] px-3.5 py-1 rounded-[1px] uppercase mb-4 shadow-2xs font-outfit">
              NEWS
            </span>
            <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.04em] leading-[1.15] mb-4 font-outfit">
              AGGIORNAMENTI DALLO STUDIO
            </h2>
            <p className="text-[#3d4a66] text-base md:text-[17px] font-normal max-w-xl leading-[1.65] font-outfit">
              Gare aggiudicate, novità normative sul codice dei contratti, strumenti per le imprese.
            </p>
          </div>

          {/* News Slider Track with Mobile Touch Swipe and Auto-slide Pause */}
          <div 
            ref={newsContainerRef}
            className="overflow-hidden relative touch-pan-y"
            onMouseEnter={() => setIsNewsPaused(true)}
            onMouseLeave={() => setIsNewsPaused(false)}
            onTouchStart={(e) => {
              setIsNewsPaused(true);
              newsTouchStartX.current = e.touches[0].clientX;
              newsTouchStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              setIsNewsPaused(false);
              const deltaX = newsTouchStartX.current - e.changedTouches[0].clientX;
              const deltaY = newsTouchStartY.current - e.changedTouches[0].clientY;
              if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                if (deltaX > 0) {
                  handleNextNews();
                } else {
                  handlePrevNews();
                }
              }
            }}
          >
            <motion.div 
              animate={{ x: newsX }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="flex gap-6"
            >
              {homeArticles.map((art, idx) => (
                <div 
                  key={art.id} 
                  style={{ width: newsCardWidth > 0 ? `${newsCardWidth}px` : '100%' }}
                  className="shrink-0"
                >
                  <ArticleCard 
                    title={art.title}
                    category={art.category}
                    excerpt={art.excerpt}
                    image={newsImages[idx % newsImages.length] || art.coverImage}
                    date={art.publishedAt}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Bar: CTA on Left, Carousel Controls on Right (Allineati sulla stessa riga anche da mobile) */}
          <div className="mt-8 sm:mt-10 flex flex-row items-center justify-between gap-3 sm:gap-4">
            <Link 
              to="/risorse" 
              className="border border-[#1B2A4A]/25 hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[48px] sm:h-[52px] px-3 sm:px-[26px] py-[14px] text-[11px] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-medium text-[#1B2A4A] transition-all rounded-[2px] shadow-2xs inline-flex items-center justify-center gap-2 sm:gap-3 group flex-1 sm:flex-initial"
            >
              <span className="truncate">TUTTE LE NEWS</span>
              <CaretRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
              <button 
                onClick={handlePrevNews}
                className="w-10 h-10 sm:w-11 sm:h-11 border border-[#1B2A4A]/20 text-[#1B2A4A] hover:border-[#F5C400] hover:text-[#F5C400] transition-colors bg-white rounded-[1px] shadow-2xs flex items-center justify-center shrink-0"
                aria-label="Articolo Precedente"
              >
                <CaretLeft size={18} />
              </button>
              <button 
                onClick={handleNextNews}
                className="w-10 h-10 sm:w-11 sm:h-11 border border-[#1B2A4A]/20 text-[#1B2A4A] hover:border-[#F5C400] hover:text-[#F5C400] transition-colors bg-white rounded-[1px] shadow-2xs flex items-center justify-center shrink-0"
                aria-label="Articolo Successivo"
              >
                <CaretRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// ── SUB-COMPONENTS ──

function PodiumStarIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.6" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Stella a 5 punte */}
      <polygon points="12 1.5 13.1 4.5 16.3 4.5 13.7 6.4 14.7 9.4 12 7.5 9.3 9.4 10.3 6.4 7.7 4.5 10.9 4.5 12 1.5" />
      {/* Gradino centrale (1° posto) */}
      <rect x="8.5" y="10.5" width="7" height="12" />
      {/* Gradino sinistro (2° posto) */}
      <rect x="2.5" y="13.5" width="6" height="9" />
      {/* Gradino destro (3° posto) */}
      <rect x="15.5" y="15.5" width="6" height="7" />
    </svg>
  );
}

function StatItem({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.endsWith('%') ? '%' : '';

  useEffect(() => {
    if (isInView) {
      const end = numericValue;
      if (end === 0) return;

      const duration = 1200;
      const steps = 35;
      const stepTime = duration / steps;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current++;
        if (current >= steps) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(increment * current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center p-2 flex flex-col items-center">
      <div className="text-[#1B2A4A] mb-3 flex items-center justify-center h-7">
        <Icon size={26} weight="regular" />
      </div>
      <div className="text-[#1B2A4A] text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight leading-none mb-2 font-outfit tabular-nums">
        {prefix}{isInView ? count : 0}{suffix}
      </div>
      <div className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] leading-tight font-outfit">
        {label}
      </div>
    </div>
  );
}


function ProjectCard({ id, title, cat, img, pos, rank, amount }: any) {
  // Linea 1 dettagliata (es. "3,4 MLN · 2° CLASSIFICATO")
  const metaParts: string[] = [];
  if (amount) metaParts.push(amount);
  if (rank) {
    metaParts.push(rank.toUpperCase());
  } else if (cat) {
    metaParts.push(cat.toUpperCase());
  }
  const metaLine = metaParts.join(' · ');

  return (
    <Link to={`/portfolio/${id}`} className="block group bg-white border border-[#1B2A4A]/10 rounded-[1px] overflow-hidden shadow-2xs hover:shadow-md transition-all h-full">
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img 
          src={img} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-5 space-y-2">
        {metaLine && (
          <span className="text-[#1B2A4A] text-xs font-bold uppercase tracking-[0.12em] block font-outfit">
            {metaLine}
          </span>
        )}
        <h3 className="text-[#1B2A4A] text-base sm:text-[17px] font-bold leading-snug group-hover:text-[#F5C400] transition-colors line-clamp-2 font-outfit">
          {title}
        </h3>
        <p className="text-[#7b869d] text-xs sm:text-[13px] font-normal font-outfit">
          {pos}
        </p>
      </div>
    </Link>
  );
}

function ServiceBentoCard({ icon: Icon, title, link, desc }: { icon: any; title: string; link: string; desc: string }) {
  return (
    <Link to={link} className="p-8 bg-[#F8F9FA] border border-[#1B2A4A]/10 rounded-[1px] flex flex-col justify-between group hover:border-[#F5C400] hover:shadow-sm transition-all h-[320px]">
      <div>
        <div className="w-12 h-12 bg-[#1B2A4A] text-white flex items-center justify-center rounded-[1px] mb-6 shadow-2xs group-hover:bg-[#F5C400] group-hover:text-[#1B2A4A] transition-colors">
          <Icon size={22} weight="regular" />
        </div>
        <h3 className="text-[#1B2A4A] text-[17px] sm:text-lg font-bold uppercase tracking-[0.05em] mb-3 font-outfit group-hover:text-[#F5C400] transition-colors">
          {title}
        </h3>
        <p className="text-[#3d4a66] text-sm sm:text-[15px] font-normal leading-relaxed font-outfit">
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-2 text-[#F5C400] text-[11px] font-medium uppercase tracking-[0.2em] font-outfit group-hover:text-[#1B2A4A] transition-colors pt-6 border-t border-[#1B2A4A]/10">
        <span>SCOPRI IL SETTORE</span>
        <CaretRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

function formatArticleDate(dateStr?: string) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const months = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

function ArticleCard({ 
  title, 
  excerpt, 
  image, 
  date 
}: { 
  title: string; 
  category?: string; 
  excerpt: string; 
  image: string; 
  date?: string; 
}) {
  const displayDate = date ? formatArticleDate(date) : '';

  return (
    <Link to="/risorse" className="block group h-full">
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden rounded-[1px]">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="pt-4 space-y-1 text-left">
        {displayDate && (
          <span className="text-[#7b869d] text-xs font-normal block font-outfit">
            {displayDate}
          </span>
        )}
        <h3 className="text-[#1B2A4A] text-base sm:text-[17px] font-bold leading-snug group-hover:text-[#F5C400] transition-colors line-clamp-2 font-outfit">
          {title}
        </h3>
        <p className="text-[#3d4a66] text-sm sm:text-[15px] font-normal leading-relaxed line-clamp-2 font-outfit">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
