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
  Article
} from '@phosphor-icons/react';
import { projects } from '../data/projects';
import { articles } from '../data/articles';

export default function Home() {
  // PORTFOLIO CAROUSEL STATE - SOLO PROGETTI AL 1° O 2° POSTO
  const homeProjects = projects.filter((p) => {
    if (!p.rank) return false;
    const r = p.rank.toLowerCase();
    return r.includes('1') || r.includes('2') || r.includes('primo') || r.includes('secondo');
  });

  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // NEWS CAROUSEL STATE
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxPortfolioIndex = Math.max(0, homeProjects.length - itemsPerView);
  const maxNewsIndex = Math.max(0, articles.length - itemsPerView);

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
            <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6 block">
              PROGETTAZIONE E GARE D'APPALTO
            </span>
            
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] leading-[1.2] mb-6">
              PROGETTIAMO IL FUTURO
            </h1>

            <p className="text-white/85 text-sm sm:text-base md:text-lg font-light max-w-2xl leading-relaxed mb-10">
              In ogni gara progettiamo il futuro lavoro, insieme ai nostri clienti. Ogni aggiudicazione è continuità per l'impresa e crescita per il nostro studio, per questo curiamo ogni offerta tecnica con passione e dedizione.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link to="/servizi/gare" className="btn-ghost-white group px-8 py-3 text-xs tracking-widest uppercase font-bold">
                Gare OEPV <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
              </Link>
              <Link to="/studio" className="btn-ghost-white group px-8 py-3 text-xs tracking-widest uppercase font-bold">
                Scopri lo Studio <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SPECIALISTI IN OFFERTE TECNICHE MIGLIORATIVE ── */}
      <section className="py-16 md:py-24 bg-white font-blinkers">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-left mb-10">
            <span className="inline-block bg-[#b8972a] text-white text-[11px] font-bold tracking-[0.08em] px-3 py-1 rounded-[2px] uppercase mb-5">
              GARE OEV
            </span>
            <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-[34px] font-extrabold tracking-[0.02em] uppercase leading-tight mb-5">
              SPECIALISTI IN OFFERTE TECNICHE MIGLIORATIVE
            </h2>
            <p className="text-[#475569] text-base md:text-[17px] font-normal leading-[1.65] max-w-5xl">
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
          <p className="text-[#475569] text-base md:text-[17px] font-normal leading-[1.65] max-w-5xl mb-12 text-left">
            Lo studio adotta un <strong className="font-bold text-[#1B2A4A]">approccio selettivo</strong> nella redazione delle offerte tecniche, <strong className="font-bold text-[#1B2A4A]">orientato alla qualità della proposta e non alla produzione seriale</strong>. Ogni intervento è sviluppato con un <strong className="font-bold text-[#1B2A4A]">approfondimento progettuale mirato</strong>, finalizzato a massimizzare la coerenza e l'efficacia delle soluzioni migliorative.
          </p>

          {/* 3 Feature Cards (ANALIZZIAMO / PROGETTIAMO / VALORIZZIAMO) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white border border-[#e2e8f0] p-8 sm:p-10 rounded-[2px] flex flex-col justify-between">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[2px] mb-7">
                  <FileMagnifyingGlass size={26} weight="regular" />
                </div>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-4">
                  ANALIZZIAMO
                </h3>
                <p className="text-[#475569] text-[15px] leading-relaxed">
                  Ogni disciplinare e progetto esecutivo vengono esaminati con metodo per individuare <strong className="font-bold text-[#1B2A4A]">criteri premianti, vincoli tecnici e margini di miglioramento</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] p-8 sm:p-10 rounded-[2px] flex flex-col justify-between">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[2px] mb-7">
                  <CompassTool size={26} weight="regular" />
                </div>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-4">
                  PROGETTIAMO
                </h3>
                <p className="text-[#475569] text-[15px] leading-relaxed">
                  Elaboriamo soluzioni migliorative basate su <strong className="font-bold text-[#1B2A4A]">coerenza tecnica e fattibilità operativa</strong>, integrando architettura, strutture ed impianti.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#e2e8f0] p-8 sm:p-10 rounded-[2px] flex flex-col justify-between">
              <div>
                <div className="w-[50px] h-[50px] bg-[#1B2A4A] text-white flex items-center justify-center rounded-[2px] mb-7">
                  <Article size={26} weight="regular" />
                </div>
                <h3 className="text-[#1B2A4A] text-[17px] font-bold tracking-[0.05em] uppercase mb-4">
                  VALORIZZIAMO
                </h3>
                <p className="text-[#475569] text-[15px] leading-relaxed">
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
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block mb-4 shadow-sm">
                PORTFOLIO COMPLETO
              </span>
              <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight">
                I NOSTRI PROGETTI & APPALTI
              </h2>
              <p className="text-text-main text-sm font-light max-w-xl mt-3">
                Esplora le offerte migliorative vincenti ed i progetti firmati dallo studio.
              </p>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={handlePrevPortfolio}
                className="p-3 border border-navy/20 text-navy hover:border-gold hover:text-gold transition-colors bg-white rounded-sm shadow-sm"
                aria-label="Progetto Precedente"
              >
                <CaretLeft size={20} />
              </button>
              <button 
                onClick={handleNextPortfolio}
                className="p-3 border border-navy/20 text-navy hover:border-gold hover:text-gold transition-colors bg-white rounded-sm shadow-sm"
                aria-label="Progetto Successivo"
              >
                <CaretRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider Track */}
          <div className="overflow-hidden relative">
            <motion.div 
              animate={{ 
                x: `-${portfolioIndex * (100 / itemsPerView)}%` 
              }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              className="flex gap-6"
            >
              {homeProjects.map((p) => (
                <div 
                  key={p.id} 
                  style={{ width: `calc(${100 / itemsPerView}% - ${(24 * (itemsPerView - 1)) / itemsPerView}px)` }}
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

          <div className="mt-12 text-center">
            <Link to="/portfolio" className="btn-ghost-dark group px-8 py-3 text-xs tracking-widest uppercase font-bold">
              Vedi Tutti i Progetti nel Portfolio <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. SIMULATORE DEL PUNTEGGIO ECONOMICO ── */}
      <section className="py-16 md:py-24 bg-white border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block shadow-sm">
                IL SIMULATORE
              </span>
              <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight">
                SIMULATORE DEL PUNTEGGIO ECONOMICO
              </h2>
              <p className="text-navy/70 text-sm sm:text-base font-light leading-relaxed">
                Uno strumento esclusivo sviluppato per calcolare in tempo reale il punteggio economico della tua offerta nelle gare OEPV. Inserisci ribasso, importi a base di gara e seleziona la formula di attribuzione (interdittiva, quadratica o bilineare) per simulare scenari competitivi e massimizzare la probabilità di aggiudicazione.
              </p>
              <div className="pt-2">
                <Link to="/simulatore" className="btn-ghost-dark group px-8 py-3 text-xs tracking-widest uppercase font-bold inline-flex items-center">
                  Accedi al Simulatore <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
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
            <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block mb-4 shadow-sm">
              ALTRI SERVIZI
            </span>
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight mb-3">
              SOLUZIONI INTEGRATE
            </h2>
            <p className="text-navy/70 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
              Un approccio multidisciplinare che unisce rilievo digitale, modellazione BIM e progettazione avanzata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceBentoCard 
              letter="P"
              title="PROGETTAZIONE" 
              link="/servizi/progettazione"
              desc="Dall'architettura all'infrastruttura, sviluppiamo soluzioni attente alla qualità, all'efficienza energetica e alla fattibilità esecutiva dell'opera."
            />
            <ServiceBentoCard 
              letter="B"
              title="BIM" 
              link="/servizi/bim"
              desc="Modellazione informativa 3D/4D/5D e gestione dei processi BIM per ogni fase del ciclo di vita dell'edificio."
            />
            <ServiceBentoCard 
              letter="R"
              title="RILIEVI" 
              link="/servizi/rilievi"
              desc="Digitalizzazione del costruito tramite Laser Scanner 3D e droni ad altissima precisione per ogni tipologia di manufatto."
            />
          </div>
        </div>
      </section>

      {/* ── 6. AGGIORNAMENTI DALLO STUDIO (NEWS / BLOG) ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/30 border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-sm inline-block mb-4 shadow-sm">
                NEWS
              </span>
              <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight mb-3">
                AGGIORNAMENTI DALLO STUDIO
              </h2>
              <p className="text-navy/70 text-sm sm:text-base font-light max-w-xl leading-relaxed">
                Novità, approfondimenti tecnici e casi studio dal mondo delle gare pubbliche e dell'architettura.
              </p>
            </div>

            {/* News Carousel Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={handlePrevNews}
                className="p-3 border border-navy/20 text-navy hover:border-gold hover:text-gold transition-colors bg-white rounded-sm shadow-sm"
                aria-label="Articolo Precedente"
              >
                <CaretLeft size={20} />
              </button>
              <button 
                onClick={handleNextNews}
                className="p-3 border border-navy/20 text-navy hover:border-gold hover:text-gold transition-colors bg-white rounded-sm shadow-sm"
                aria-label="Articolo Successivo"
              >
                <CaretRight size={20} />
              </button>
            </div>
          </div>

          {/* News Slider Track */}
          <div className="overflow-hidden relative">
            <motion.div 
              animate={{ 
                x: `-${newsIndex * (100 / itemsPerView)}%` 
              }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              className="flex gap-6"
            >
              {articles.map((art, idx) => (
                <div 
                  key={art.id} 
                  style={{ width: `calc(${100 / itemsPerView}% - ${(24 * (itemsPerView - 1)) / itemsPerView}px)` }}
                  className="shrink-0"
                >
                  <ArticleCard 
                    title={art.title}
                    category={art.category}
                    excerpt={art.excerpt}
                    image={newsImages[idx % newsImages.length] || art.coverImage}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/risorse" className="btn-ghost-dark group px-8 py-3 text-xs tracking-widest uppercase font-bold">
              Vedi Tutti gli Aggiornamenti <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
            </Link>
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
    <div ref={ref} className="text-center p-2 flex flex-col items-center font-blinkers">
      <div className="text-[#1B2A4A] mb-3 flex items-center justify-center h-7">
        <Icon size={26} weight="regular" />
      </div>
      <div className="text-[#1B2A4A] text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight leading-none mb-2 font-blinkers">
        {prefix}{isInView ? count : 0}{suffix}
      </div>
      <div className="text-[#64748b] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] leading-tight font-blinkers">
        {label}
      </div>
    </div>
  );
}


function ProjectCard({ id, title, cat, img, pos, rank, amount }: any) {
  return (
    <Link to={`/portfolio/${id}`} className="block group bg-white border border-navy/10 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img 
          src={img} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />
        {rank && (
          <div className="absolute top-3 left-3 bg-gold text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
            {rank}
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="text-gold text-[10px] font-bold uppercase tracking-wider block mb-1">{cat} • {amount}</span>
        <h3 className="text-navy text-sm font-bold uppercase tracking-tight mb-2 group-hover:text-gold transition-colors line-clamp-2">{title}</h3>
        <p className="text-navy/50 text-xs font-medium block">{pos}</p>
      </div>
    </Link>
  );
}

function ServiceBentoCard({ letter, title, link, desc }: { letter: string; title: string; link: string; desc: string }) {
  return (
    <Link to={link} className="p-8 bg-bg-neutral/40 border border-navy/10 rounded-sm flex flex-col justify-between group hover:border-gold hover:shadow-sm transition-all h-[320px]">
      <div>
        <div className="w-10 h-10 bg-navy text-white font-mono font-bold text-base flex items-center justify-center rounded-sm mb-6 group-hover:bg-gold group-hover:text-navy transition-colors">
          {letter}
        </div>
        <h3 className="text-navy text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-navy/70 text-xs font-light leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="flex items-center gap-2 text-gold text-[11px] font-bold uppercase tracking-wider group-hover:text-navy transition-colors pt-6 border-t border-navy/10">
        Scopri Servizio <ArrowRight size={14} />
      </div>
    </Link>
  );
}

function ArticleCard({ title, category, excerpt, image }: { title: string; category: string; excerpt: string; image: string }) {
  return (
    <Link to="/risorse" className="block group bg-white border border-navy/10 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
      <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-3 left-3 bg-navy text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
          {category}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-navy text-sm font-bold uppercase tracking-tight mb-2 group-hover:text-gold transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-navy/60 text-xs font-light leading-relaxed line-clamp-3">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
