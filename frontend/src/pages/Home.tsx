import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CaretLeft,
  CaretRight,
  Buildings,
  Target,
  Cube,
  Calendar,
  FileText,
  Medal,
  Trophy,
  Users
} from '@phosphor-icons/react';
import { projects } from '../data/projects';

export default function Home() {
  // Hero Slider State & Content
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      pre: "PROGETTAZIONE E GARE D'APPALTO",
      title: "SPECIALISTI IN OFFERTE TECNICHE",
      highlight: "MIGLIORATIVE",
      desc: "Mettiamo al servizio dei nostri clienti oltre dieci anni di esperienza nel settore degli appalti pubblici, traducendo competenza tecnica e visione strategica in offerte migliori, più competitive e orientate al massimo punteggio.",
      link: "/servizi/gare",
      btnText: "Gare OEPV",
      image: "/media/header_2.jpg"
    },
    {
      pre: "PROGETTAZIONE E GARE D'APPALTO",
      title: "PROGETTIAMO",
      highlight: "IL FUTURO",
      desc: "In ogni gara progettiamo il futuro lavoro, insieme ai nostri clienti. Ogni aggiudicazione è continuità per l'impresa e crescita per il nostro studio, per questo curiamo ogni offerta tecnica con passione e dedizione.",
      link: "/servizi/gare",
      btnText: "Gare OEPV",
      image: "/media/portfolio/p01.jpg"
    },
    {
      pre: "PROGETTAZIONE E GARE D'APPALTO",
      title: "UN APPROCCIO MULTIDISCIPLINARE,",
      highlight: "UN UNICO OBIETTIVO",
      desc: "Architetti, ingegneri, specialisti BIM e restauratori integrano le proprie competenze in funzione delle specificità di ogni gara, sviluppando offerte tecniche complete, coerenti e orientate all'aggiudicazione.",
      link: "/servizi/gare",
      btnText: "Gare OEPV",
      image: "/media/portfolio/p03.webp"
    }
  ];

  // Autoplay Slider per Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // PORTFOLIO CAROUSEL STATE - SOLO PROGETTI AL 1° O 2° POSTO
  const homeProjects = projects.filter((p) => {
    if (!p.rank) return false;
    const r = p.rank.toLowerCase();
    return r.includes('1') || r.includes('2') || r.includes('primo') || r.includes('secondo');
  });

  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

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

  const maxIndex = Math.max(0, homeProjects.length - itemsPerView);

  const handleNextPortfolio = () => {
    setPortfolioIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrevPortfolio = () => {
    setPortfolioIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="bg-white selection:bg-navy selection:text-white overflow-x-hidden">
      
      {/* ── CINEMATIC HERO SLIDER CON SFUMATURA ORIGINALE ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-navy">
        {/* Background images slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
          </AnimatePresence>
          {/* Sfumatura blu originale */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>

        {/* Text content slider - TESTO BIANCO */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="text-white text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-6 block opacity-90">
                {slides[currentSlide].pre}
              </span>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] uppercase tracking-tighter mb-6">
                {slides[currentSlide].title}{' '}
                <span className="text-white font-serif italic lowercase tracking-normal">{slides[currentSlide].highlight}</span>
              </h1>
              <p className="text-white/80 text-sm md:text-base font-light max-w-2xl leading-relaxed mb-12">
                {slides[currentSlide].desc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Link to={slides[currentSlide].link} className="btn-ghost-white group">
                  {slides[currentSlide].btnText} <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
                <Link to="/studio" className="btn-ghost-white group">
                  Scopri lo Studio <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 right-6 md:right-12 z-20 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentSlide === index ? 'w-10 bg-gold' : 'w-3 bg-navy/30 hover:bg-navy/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto border-b border-navy/5">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
            <StatItem icon={Calendar} value="10" label="anni di esperienza" />
            <StatItem icon={FileText} value="+200" label="gare redatte" />
            <StatItem icon={Medal} value="63%" label="gare sul podio" />
            <StatItem icon={Trophy} value="38%" label="gare aggiudicate" />
            <StatItem icon={Buildings} value="+40" label="imprese clienti" />
            <StatItem icon={Users} value="+10" label="collaboratori" />
         </div>
      </section>

      {/* ── IL NOSTRO METODO ── */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Il Nostro Metodo</span>
              <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                 Metodo & Competenza.
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueItem 
                number="01" 
                title="Approccio selettivo orientato alla qualità." 
                text="Ogni disciplinare e progetto esecutivo vengono esaminati con metodo per individuare criteri premianti, vincoli e margini di miglioramento tecnico."
              />
              <ValueItem 
                number="02" 
                title="Un team completo per ogni procedura." 
                text="Architetti, specialisti BIM, esperti di contabilità dei lavori, restauratori e consulenti strutturali e impiantistici attivati in sinergia."
              />
              <ValueItem 
                number="03" 
                title="Dieci anni di esperienza nel settore." 
                text="Dal 2015 operiamo nel mondo degli appalti pubblici in tutta Italia. Un'esperienza che si traduce in soluzioni migliorative vincenti."
              />
           </div>
        </div>
      </section>

      {/* ── PORTFOLIO CAROUSEL ── */}
      <section className="py-16 md:py-32 bg-bg-neutral overflow-hidden" id="portfolio-home">
        <div className="px-6 max-w-7xl mx-auto">
           <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                 <span className="text-gold text-xs font-bold uppercase tracking-[0.6em] mb-4 block">Portfolio Completo</span>
                 <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                    I Nostri Progetti & Appalti.
                 </h2>
                 <p className="text-text-main text-sm font-light max-w-xl mt-3">
                    Esplora le offerte migliorative vincenti ed i progetti firmati dallo studio.
                 </p>
              </div>
              
              {/* CONTROLLI FRECCE CAROSELLO */}
              <div className="flex items-center gap-4 shrink-0">
                 <button 
                    onClick={handlePrevPortfolio}
                    className="p-3.5 border border-navy/20 text-navy hover:border-gold hover:text-gold transition-colors bg-white rounded-sm shadow-sm"
                    aria-label="Progetto Precedente"
                 >
                    <CaretLeft size={20} />
                 </button>
                 <button 
                    onClick={handleNextPortfolio}
                    className="p-3.5 border border-navy/20 text-navy hover:border-gold hover:text-gold transition-colors bg-white rounded-sm shadow-sm"
                    aria-label="Progetto Successivo"
                 >
                    <CaretRight size={20} />
                 </button>
              </div>
           </div>

           {/* SLIDER CAROUSEL TRACK */}
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

           <div className="mt-16 text-center">
              <Link to="/portfolio" className="btn-ghost-dark group">
                 Vedi Tutti i Progetti nel Portfolio <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
              </Link>
           </div>
        </div>
      </section>

      {/* ── SERVIZI SECONDARI ── */}
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
             <div className="max-w-2xl">
                <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Altri Servizi</span>
                <h2 className="text-navy text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                   Soluzioni Integrate.
                </h2>
             </div>
             <p className="text-text-main text-sm font-light max-w-md leading-relaxed">
                Un approccio multidisciplinare che unisce rilievo digitale, modellazione BIM e progettazione avanzata.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <ServiceBento 
                title="Rilievi" 
                icon={Buildings}
                link="/servizi/rilievi"
                className="bg-bg-neutral text-navy border border-navy/5 h-[380px]"
                desc="Digitalizzazione del costruito tramite Laser Scanner 3D e droni."
             />
             <ServiceBento 
                title="BIM" 
                icon={Cube}
                link="/servizi/bim"
                className="bg-bg-neutral text-navy border border-navy/5 h-[380px]"
                desc="Modellazione informativa e gestione dei processi BIM per ogni fase."
             />
             <ServiceBento 
                title="Progettazione" 
                icon={Target}
                link="/servizi/progettazione"
                className="bg-bg-neutral text-navy border border-navy/5 h-[380px]"
                desc="Dall'architettura all'infrastruttura, sviluppiamo soluzioni attente alla qualità."
             />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-32 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
           <h2 className="text-white text-2xl sm:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
              Il Prossimo Cantiere <br /> Inizia Qui.
           </h2>
           <p className="text-white/80 text-sm md:text-base font-light mb-10">
              Richiedi una consulenza tecnica per la tua prossima gara d'appalto o progetto esecutivo.
           </p>
           <Link to="/contatti" className="btn-ghost-white group">
              Richiedi una Consulenza <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
           </Link>
        </div>
      </section>

    </div>
  );
}

function StatItem({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
   return (
      <div className="text-center p-4">
         <Icon size={20} className="mx-auto mb-2 text-gold opacity-80" />
         <div className="text-navy text-3xl font-bold font-mono tracking-tight mb-1">{value}</div>
         <div className="text-gold text-[10px] font-bold uppercase tracking-wider">{label}</div>
      </div>
   );
}

function ValueItem({ number, title, text }: { number: string; title: string; text: string }) {
   return (
      <div className="bg-bg-neutral p-8 border border-navy/5 rounded-sm space-y-3">
         <span className="text-gold font-mono font-bold text-xl block">{number}</span>
         <h3 className="text-navy text-base font-bold uppercase tracking-tight">{title}</h3>
         <p className="text-text-main text-xs font-light leading-relaxed">{text}</p>
      </div>
   );
}

function ProjectCard({ id, title, cat, img, pos, rank, amount }: any) {
   return (
      <Link to={`/portfolio/${id}`} className="block group bg-white border border-navy/10 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all h-full">
         <div className="relative aspect-[4/3] bg-navy overflow-hidden">
            <img 
               src={img} 
               alt={title}
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
            />
            {rank && (
               <div className="absolute top-3 left-3 bg-gold text-navy text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
                  {rank}
               </div>
            )}
         </div>
         <div className="p-6">
            <span className="text-gold text-[10px] font-bold uppercase tracking-wider block mb-1">{cat} • {amount}</span>
            <h3 className="text-navy text-base font-bold uppercase tracking-tight mb-2 group-hover:text-gold transition-colors line-clamp-2">{title}</h3>
            <p className="text-navy/50 text-xs font-medium block">{pos}</p>
         </div>
      </Link>
   );
}

function ServiceBento({ title, icon: Icon, link, className, desc }: any) {
   return (
      <Link to={link} className={`p-8 rounded-sm flex flex-col justify-between group transition-all hover:border-gold ${className}`}>
         <div>
            <div className="p-3 bg-navy text-gold w-fit rounded-sm mb-6 group-hover:bg-gold group-hover:text-navy transition-colors">
               <Icon size={24} />
            </div>
            <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-gold transition-colors">{title}</h3>
            <p className="text-text-main text-xs font-light leading-relaxed">{desc}</p>
         </div>
         <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider group-hover:text-navy transition-colors pt-6 border-t border-navy/5">
            Scopri Servizio <ArrowRight size={14} />
         </div>
      </Link>
   );
}
