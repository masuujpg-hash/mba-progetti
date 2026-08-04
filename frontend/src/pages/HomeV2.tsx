import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft,
  Buildings,
  Target,
  Cube,
  MagnifyingGlass,
  Ruler,
  CheckCircle,
  Calendar,
  FileText,
  Medal,
  Trophy,
  Users
} from '@phosphor-icons/react';
import { projects } from '../data/projects';
import ScrollWorldHero from '../components/ScrollWorldHero';

export default function HomeV2() {
  // Filter won projects (1° Posto) - avoiding duplicate images/projects
  const wonProjects = projects.filter(p => 
    p.rank?.includes('1°') && 
    !['scuola-marzabotto', 'carabinieri-viterbo', 'scuola-infanzia-fano'].includes(p.id)
  );

  // Carosello "I Nostri Risultati" (Slider Laterale)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else {
        setItemsPerView(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay per carosello progetti
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= wonProjects.length - itemsPerView ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [wonProjects.length, itemsPerView]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= wonProjects.length - itemsPerView ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? wonProjects.length - itemsPerView : prev - 1));
  };

  const translateX = itemsPerView === 1 
    ? `calc(-${currentIndex * 100}% - ${currentIndex * 24}px)`
    : `calc(-${currentIndex * 50}% - ${currentIndex * 12}px)`;

  // Varianti Framer Motion per "Il Nostro Metodo"
  const methodContainerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    // NOTE: NO overflow-x-hidden on this root div — it would break position:sticky in ScrollWorldHero
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── SCROLLWORLD HEADER VIDEO HERO ── */}
      <ScrollWorldHero />

      {/* ── NUMBERS (6 counters from briefing 1.2) ── */}
      <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
            <StatItem icon={Calendar} value="10" label="anni di esperienza" />
            <StatItem icon={FileText} value="+200" label="gare redatte" />
            <StatItem icon={Medal} value="63%" label="gare sul podio" />
            <StatItem icon={Trophy} value="38%" label="gare aggiudicate" />
            <StatItem icon={Buildings} value="+40" label="imprese clienti" />
            <StatItem icon={Users} value="+10" label="collaboratori" />
         </div>
      </section>

      {/* ── METHOD SECTION (briefing 1.3 — ANALIZZIAMO / PROGETTIAMO / VALORIZZIAMO) ── */}
      <section className="py-12 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                 <span className="text-gold text-[12px] font-bold uppercase tracking-[0.6em] mb-4 md:mb-6 block">Il Nostro Metodo</span>
                 <h2 className="text-2xl sm:text-3xl md:text-4xl text-navy font-bold uppercase tracking-tighter leading-[1.1] mb-6 md:mb-8">
                    Approccio <br /> Sistematico.
                 </h2>
                 <p className="text-navy/60 text-lg font-light leading-relaxed">
                    Un workflow collaudato che accompagna ogni fase, dall'analisi delle gare alla stesura dell'offerta, dando forza alle soluzioni tecniche e rendendole chiare alla commissione.
                 </p>
              </motion.div>
           </div>
           
           <motion.div 
              variants={methodContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
           >
              <MethodItem 
                icon={<MagnifyingGlass size={48} weight="light" />} 
                title="Analizziamo" 
                text="Ogni disciplinare e progetto posto a base di gara vengono esaminati con metodo per individuare criteri premianti, vincoli tecnici e margini di miglioramento. L'analisi è la base su cui si costruisce un'offerta fondata, coerente e competitiva." 
              />
              <MethodItem 
                icon={<Ruler size={48} weight="light" />} 
                title="Progettiamo" 
                text="Elaboriamo soluzioni migliorative basate su coerenza tecnica e fattibilità operativa. Ogni proposta integra aspetti architettonici, impiantistici, strutturali e di cantiere, per assicurare qualità esecutiva e piena aderenza ai criteri di valutazione." 
              />
              <MethodItem 
                icon={<CheckCircle size={48} weight="light" />} 
                title="Valorizziamo" 
                text="Trasformiamo i contenuti tecnici in documentazione chiara e immediatamente valutabile. Ogni offerta è organizzata per mettere in evidenza il merito progettuale e agevolare il lavoro della commissione giudicatrice." 
              />
            </motion.div>
         </div>
      </section>

      {/* ── ADDED VALUE (briefing 1.4 — PERCHÉ SCEGLIERCI) ── */}
      <section className="py-12 md:py-32 bg-bg-neutral relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1B2A4A]/[0.02] -skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                 <span className="text-gold text-[12px] font-bold uppercase tracking-[0.6em] mb-4 md:mb-6 block">Perché MBA</span>
                 <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6 md:mb-8">
                    Valore <br /> Aggiunto.
                 </h2>
                 <p className="text-[#1B2A4A]/60 text-lg font-light leading-relaxed">
                    Affianchiamo le imprese con un approccio sartoriale, adottando metodo, competenze e contenuti alle specificità di ogni gara.
                  </p>
              </motion.div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
              <ValueItem 
                number="01" 
                title="Approccio dedicato, non seriale." 
                text="Ogni gara viene studiata e sviluppata da zero. Analizziamo il disciplinare, interpretiamo i criteri di valutazione e costruiamo soluzioni migliorative specifiche per quella procedura. Nessuna offerta standard, nessuna scorciatoia."
              />
              <ValueItem 
                number="02" 
                title="Un team completo per ogni procedura." 
                text="Architetti, specialisti BIM, esperti di contabilità dei lavori, restauratori e consulenti strutturali, impiantistici e infrastrutturali. Ogni competenza viene attivata in funzione delle esigenze della gara."
              />
              <ValueItem 
                number="03" 
                title="Dieci anni di esperienza nel settore." 
                text="Dal 2015 operiamo nel mondo degli appalti pubblici. Un percorso costruito gara dopo gara su tipologie diverse di opere in tutta Italia. Un'esperienza che si traduce in capacità di lettura rapida dei disciplinari e soluzioni migliorative sempre più efficaci."
              />
           </div>
        </div>
      </section>

      {/* ── I NOSTRI RISULTATI (SLIDER LATERALE) ── */}
      <section className="py-16 md:py-32 bg-white overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-12 md:mb-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
           <div>
              <span className="text-gold text-xs font-bold uppercase tracking-[0.6em] mb-4 block">I Nostri Risultati</span>
              <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                 Progetti Vincenti.
              </h2>
           </div>
           
           <div className="flex gap-4 items-center shrink-0 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex gap-3">
                 <button 
                   onClick={handlePrev} 
                   className="w-12 h-12 rounded-full border border-[#1B2A4A]/20 hover:border-gold text-[#1B2A4A] hover:text-gold flex items-center justify-center transition-all duration-300 group cursor-pointer"
                   aria-label="Progetto precedente"
                 >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                 </button>
                 <button 
                   onClick={handleNext} 
                   className="w-12 h-12 rounded-full border border-[#1B2A4A]/20 hover:border-gold text-[#1B2A4A] hover:text-gold flex items-center justify-center transition-all duration-300 group cursor-pointer"
                   aria-label="Prossimo progetto"
                 >
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
              <Link to="/portfolio" className="text-gold text-[11px] font-bold uppercase tracking-[0.3em] hover:text-[#1B2A4A] transition-colors ml-4 flex items-center gap-2">
                 Vedi Tutti
              </Link>
           </div>
        </div>

        <div className="relative overflow-hidden w-full max-w-7xl mx-auto px-6">
           <div className="overflow-hidden">
              <motion.div 
                 className="flex gap-6"
                 animate={{ x: translateX }}
                 transition={{ type: "spring", stiffness: 100, damping: 18 }}
              >
                 {wonProjects.map((p, i) => (
                    <div 
                       key={i} 
                       className="w-full md:w-[calc(50%-12px)] shrink-0"
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
        </div>
      </section>

      {/* ── SERVIZI SECONDARI ── */}
      <section className="py-12 md:py-32 bg-bg-neutral">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-6 md:gap-8">
             <div className="max-w-2xl">
                <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em] mb-4 block">Altri Servizi</span>
                <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                   Soluzioni <br /> Integrate.
                </h2>
             </div>
             <p className="text-[#1B2A4A]/60 text-lg font-light max-w-md leading-relaxed mt-4 md:mt-0">
                Un approccio multidisciplinare che unisce rilievo digitale, modellazione BIM e progettazione avanzata per supportare ogni fase della commessa.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <ServiceBento 
                title="Rilievi" 
                icon={Buildings}
                link="/servizi/rilievi"
                className="bg-white text-[#1B2A4A] shadow-sm hover:shadow-xl border border-[#1B2A4A]/5 h-[400px]"
                desc="Digitalizzazione del costruito tramite Laser Scanner 3D e droni."
             />
             <ServiceBento 
                title="BIM" 
                icon={Cube}
                link="/servizi/bim"
                className="bg-white text-[#1B2A4A] shadow-sm hover:shadow-xl border border-[#1B2A4A]/5 h-[400px]"
                desc="Modellazione informativa e gestione dei processi BIM per ogni fase dell'opera."
             />
             <ServiceBento 
                title="Progettazione" 
                icon={Target}
                link="/servizi/progettazione"
                className="bg-white text-[#1B2A4A] shadow-sm hover:shadow-xl border border-[#1B2A4A]/5 h-[400px]"
                desc="Dall'architettura all'infrastruttura, sviluppiamo soluzioni progettuali attente alla qualità."
             />
          </div>
        </div>
      </section>

      {/* ── NEWS E APPROFONDIMENTI ── */}
      <section className="py-12 md:py-32 bg-white border-t border-[#1B2A4A]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 md:mb-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-[0.6em] mb-4 block">News e Approfondimenti</span>
              <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                News e Approfondimenti.
              </h2>
            </div>
            <Link to="/risorse" className="text-gold text-[11px] font-bold uppercase tracking-[0.3em] hover:text-[#1B2A4A] transition-colors shrink-0 flex items-center gap-2">
              Vedi Tutte Le Risorse <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ArticleCard 
              tag="Normativa"
              title="Le novità del D.Lgs. 36/2023 per le gare OEPV"
              text="Una guida pratica alle principali modifiche normative e ai loro effetti sulla redazione delle offerte tecniche."
              img="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
              link="/risorse#articles"
            />
            <ArticleCard 
              tag="Tecnica"
              title="Calcolare il ribasso ottimale in una gara OEPV"
              text="Strategie e formule per massimizzare il punteggio complessivo senza rischiare l'anomalia."
              img="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
              link="/risorse#articles"
            />
            <ArticleCard 
              tag="BIM"
              title="BIM e gare d'appalto: vantaggi concreti"
              text="Como il modello informativo migliora la qualità dell'offerta tecnica e facilita il lavoro della commissione."
              img="https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=2070&auto=format&fit=crop"
              link="/risorse#articles"
            />
          </div>
        </div>
      </section>

      {/* ── CTA SIMULATORE OEPV ── */}
      <section className="py-12 md:py-32 bg-navy text-white text-center px-6">
        <div className="max-w-4xl mx-auto">
           <span className="text-gold text-[12px] font-bold uppercase tracking-[0.4em] mb-4 block">Strumento Gratuito</span>
           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
              Simulatore Punteggio Economico OEPV
           </h2>
           <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Calcola il punteggio economico in funzione del ribasso per le quattro formule più utilizzate nelle gare pubbliche. Uno strumento sviluppato dai nostri esperti.
           </p>
           <Link to="/simulatore" className="btn-ghost-light px-12 py-5 min-w-[220px] inline-block mt-4">
              Prova il Simulatore
           </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-12 md:py-32 bg-bg-neutral text-center relative overflow-hidden">
        <div className="relative z-10 px-6">
           <h2 className="text-[#1B2A4A] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6 md:mb-8">
              Il prossimo cantiere <br /> inizia qui.
           </h2>
           <Link to="/contatti" className="btn-ghost-dark px-6 md:px-20 py-4 md:py-8">
              Richiedi una consulenza
           </Link>
        </div>
      </section>

    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 14
    }
  }
};

function ServiceBento({ title, icon: Icon, className, desc, link }: any) {
  return (
    <Link to={link} className={`p-6 sm:p-12 flex flex-col justify-between group transition-all duration-700 hover:scale-[0.98] ${className}`}>
       <div className="flex justify-between items-start">
          <div className="p-4 border border-current opacity-20 group-hover:opacity-100 transition-opacity">
             <Icon size={32} weight="light" />
          </div>
          <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-700" />
       </div>
       <div>
          <h3 className="text-4xl font-bold uppercase tracking-wide mb-4">{title}</h3>
          <p className="text-sm font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity max-w-xs">{desc}</p>
       </div>
    </Link>
  );
}

function StatItem({ icon: Icon, value, label }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.endsWith('%') ? '%' : '';

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      if (start === end) return;

      const steps = 60;
      const increment = end / steps;
      let stepCount = 0;

      const timer = setInterval(() => {
        stepCount++;
        if (stepCount >= steps) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(increment * stepCount));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <div ref={ref} className="text-center">
       <div className="text-gold mb-6 flex justify-center">
          <Icon size={36} weight="light" />
       </div>
       <div className="text-navy text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-3">
         {prefix}{isInView ? count : 0}{suffix}
       </div>
       <div className="text-gold text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-[120px] mx-auto">{label}</div>
    </div>
  );
}

function MethodItem({ icon, title, text }: any) {
  return (
    <motion.div 
      variants={itemVariants}
      className="flex flex-col items-center text-center group"
    >
       <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
          {icon}
       </div>
       <h3 className="text-navy text-xl font-bold uppercase tracking-wide mb-3">{title}</h3>
       <p className="text-navy/60 text-sm font-light leading-relaxed max-w-xs">{text}</p>
    </motion.div>
  );
}

function ValueItem({ number, title, text, dark }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group"
    >
       <span className="text-5xl font-bold tracking-wide mb-8 text-gold block">
          {number}
       </span>
       <h3 className={`${dark ? 'text-white' : 'text-navy'} text-xl font-bold uppercase tracking-wide mb-4`}>{title}</h3>
       <p className={`${dark ? 'text-white/60' : 'text-navy/60'} text-sm font-light leading-relaxed max-w-xs`}>{text}</p>
    </motion.div>
  );
}

function ProjectCard({ id, title, img, pos, rank, amount }: any) {
  return (
    <Link to={`/portfolio/${id}`} className="group relative overflow-hidden aspect-[4/3] cursor-pointer w-full block">
       <img 
         src={img} 
         className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
         alt={title} 
       />
       {rank && (
         <div className="absolute top-6 right-6 bg-gold text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 z-10 shadow-lg">
           {rank}
         </div>
       )}
       <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent group-hover:from-navy/80 transition-all duration-500 p-6 sm:p-10 flex flex-col justify-end">
          {amount && (
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 block">
              {amount}
            </span>
          )}
          <h4 className="text-white text-base sm:text-lg md:text-xl font-bold uppercase tracking-wide mb-1 leading-tight line-clamp-2">
            {title}
          </h4>
          <span className="text-white/70 text-[10px] sm:text-xs uppercase tracking-widest font-light">
            {pos}
          </span>
       </div>
    </Link>
  );
}

function ArticleCard({ tag, title, text, img, link }: any) {
  return (
    <Link to={link || "/risorse#articles"} className="bg-white group cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden block">
       <div className="aspect-video overflow-hidden bg-navy">
          <img src={img} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 group-hover:opacity-100" alt={title} />
       </div>
       <div className="p-6 sm:p-10">
          <span className="text-gold text-[11px] font-bold uppercase tracking-[0.4em] mb-4 block">{tag}</span>
          <h4 className="text-navy text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-gold transition-colors">{title}</h4>
          <p className="text-navy/60 text-sm font-light leading-relaxed mb-8">{text}</p>
          <div className="flex items-center gap-2 text-navy font-bold text-[11px] uppercase tracking-widest group-hover:translate-x-2 transition-transform">
             Leggi Articolo <ArrowRight size={14} className="text-gold" />
          </div>
       </div>
    </Link>
  );
}
