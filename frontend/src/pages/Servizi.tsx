import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useInView, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Buildings, 
  GraduationCap, 
  Hospital, 
  Park, 
  Warehouse, 
  Bridge, 
  SolarPanel, 
  TreeStructure, 
  Panorama, 
  MagnifyingGlass, 
  PencilLine, 
  Star,
  Check,
  HardHat,
  Monitor,
  BoundingBox
} from '@phosphor-icons/react';

// --- Shared Components & Animations ---

const anim = { 
  initial: { opacity: 0, y: 30 }, 
  whileInView: { opacity: 1, y: 0 }, 
  viewport: { once: true, margin: '-10%' as const },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
};

const maskAnim = {
  initial: { clipPath: 'inset(0% 100% 0% 0%)' },
  whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }
};

function Counter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.includes('%') ? '%' : value.includes('MLN+') ? ' MLN+' : value.endsWith('+') ? '+' : '';

  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, spring, numericValue]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

// --- Data ---

const ambiti = [
  { icon: Buildings, label: 'Servizi alla Collettività' },
  { icon: GraduationCap, label: 'Edilizia Scolastica' },
  { icon: Hospital, label: 'Strutture Sanitarie' },
  { icon: Park, label: 'Infrastrutture e Arredo' },
  { icon: Warehouse, label: 'Settore Industriale' },
  { icon: Bridge, label: 'Opere Pubbliche' },
  { icon: SolarPanel, label: 'Efficientamento Energetico' },
  { icon: TreeStructure, label: 'Riqualificazione Urbana' },
  { icon: Panorama, label: 'Strutture Ricettive' },
];

const stats = [
  { value: '43%', label: 'Gare Vinte' },
  { value: '84%', label: 'Podio (Top 3)' },
  { value: '150MLN+', label: 'Valore Opere' },
  { value: '300+', label: 'Gare Gestite' },
];

export default function Servizi() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="bg-white selection:bg-navy selection:text-white">
      {/* ── HERO ── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-navy">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity, y: heroParallax }} 
          className="absolute inset-0 z-0 h-[120%] -top-[10%]"
        >
          <img 
            src="/media/hero/slide2.webp" 
            alt="Servizi MBA Progetti" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503387762-592dee58c460?q=80&w=2070&auto=format&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-navy/50" />
        </motion.div>
        
        <div className="relative z-10 max-w-[1400px] w-full px-6 text-center">
          <motion.div style={{ y: heroTextY }}>
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.5em" }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-gold-light text-[10px] md:text-xs font-bold uppercase mb-12 block tracking-[0.5em]"
            >
              Expertise & Visione Strategica
            </motion.span>
            
            <div className="relative inline-block mb-12">
              <motion.h1 
                initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="text-7xl md:text-[10rem] lg:text-[12rem] font-bold text-white tracking-tighter leading-[0.8] uppercase"
              >
                SERVIZI
              </motion.h1>
            </div>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-white/70 font-bold text-[10px] tracking-[0.4em] uppercase max-w-4xl mx-auto">
              <a href="#gare" className="hover:text-gold transition-all duration-500 border-b border-transparent hover:border-gold pb-2">Gare d'appalto</a>
              <a href="#progettazione" className="hover:text-gold transition-all duration-500 border-b border-transparent hover:border-gold pb-2">Progettazione</a>
              <a href="#rilievi" className="hover:text-gold transition-all duration-500 border-b border-transparent hover:border-gold pb-2">Rilievi</a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 2, duration: 1 }} 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-64, 64] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* ── GARE D'APPALTO ── */}
      <section id="gare" className="py-32 md:py-56 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            <motion.div {...anim}>
              <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-10 block">
                Offerta Economicamente Più Vantaggiosa
              </span>
              <h2 className="text-6xl md:text-8xl font-bold text-navy mb-16 leading-[0.9] tracking-tighter uppercase">
                Metodo e <br /> <span className="italic font-medium text-gold">successo</span>.
              </h2>
              <p className="text-gray text-2xl font-light leading-relaxed mb-16 max-w-xl">
                Supportiamo le imprese nella partecipazione a gare d'appalto con il criterio dell'OEPV, coniugando rigore tecnico e visione strategica per massimizzare il punteggio tecnico.
              </p>
              <div className="space-y-8">
                {[
                  "Analisi approfondita del disciplinare",
                  "Varianti migliorative sostenibili",
                  "Relazioni tecniche di alto profilo",
                  "Supporto completo all'aggiudicazione"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold transition-all duration-500">
                       <Check size={16} weight="bold" className="text-gold group-hover:text-white" />
                    </div>
                    <span className="text-navy font-bold uppercase tracking-[0.2em] text-[11px]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-px bg-navy/10 overflow-hidden">
              {[
                { icon: MagnifyingGlass, title: "ANALIZZIAMO.", text: "Esaminiamo ogni disciplinare per individuare criteri premianti e vincoli, costruendo un'offerta solida e coerente." },
                { icon: PencilLine, title: "PROGETTIAMO.", text: "Elaboriamo soluzioni basate su fattibilità e coerenza tecnica, integrando architettura, impianti e strutture." },
                { icon: Star, title: "VALORIZZIAMO.", text: "Trasformiamo il contenuto tecnico in documentazione chiara che mette in risalto il merito del progetto." }
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  {...anim} 
                  transition={{ delay: 0.2 * i, duration: 1.2 }}
                  className="p-16 md:p-20 bg-white group hover:bg-navy transition-all duration-700"
                >
                  <step.icon size={48} weight="thin" className="text-gold mb-10 group-hover:scale-110 transition-all duration-700" />
                  <h3 className="text-3xl font-bold text-navy group-hover:text-white mb-6 tracking-tight uppercase transition-colors duration-700">{step.title}</h3>
                  <p className="text-gray/80 group-hover:text-white/60 text-xl font-light leading-relaxed transition-colors duration-700">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS & AMBITI ── */}
      <section className="bg-navy py-32 md:py-56 px-6 relative z-10">
        <div className="max-w-[1500px] mx-auto">
          <motion.div {...anim} className="flex flex-col items-center mb-24 text-center">
             <span className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase mb-8">L'eccellenza in numeri</span>
             <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase leading-tight max-w-4xl">
               Risultati che testimoniano il <br /> <span className="italic text-gold font-medium">nostro valore strategico</span>.
             </h3>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20 mb-48">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                {...anim} 
                transition={{ delay: i * 0.1, duration: 1 }}
                className="text-center group"
              >
                <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tighter">
                  <Counter value={stat.value} />
                </div>
                <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] leading-relaxed max-w-[120px] mx-auto">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div id="ambiti" {...anim} className="mb-24 flex items-center gap-10">
            <span className="text-gold text-[10px] font-bold tracking-[0.6em] uppercase">Ambiti di Intervento</span>
            <div className="flex-grow h-[1px] bg-white/10" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {ambiti.map((a, i) => (
              <motion.div 
                key={i}
                {...anim}
                transition={{ delay: i * 0.05, duration: 1 }}
                className="group relative p-16 md:p-20 bg-navy hover:bg-white transition-all duration-700"
              >
                <div className="flex items-center gap-8 relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center border border-white/10 group-hover:border-navy group-hover:bg-navy transition-all duration-500">
                    <a.icon size={28} weight="thin" className="text-gold group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  <span className="text-xl font-bold text-white group-hover:text-navy tracking-tight uppercase transition-colors duration-700">{a.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGETTAZIONE ── */}
      <section id="progettazione" className="py-32 md:py-56 px-6 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              {...maskAnim} 
              className="relative aspect-[4/5] md:aspect-[16/10] overflow-hidden"
            >
              <img 
                src="/media/hero/slide3.webp" 
                alt="Progettazione Integrata" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2072&auto=format&fit=crop'; }}
              />
              <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-all duration-1000" />
            </motion.div>

            <motion.div {...anim}>
              <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-10 block">
                Metodologia BIM & Integrata
              </span>
              <h2 className="text-6xl md:text-8xl font-bold text-navy mb-16 leading-[0.9] tracking-tighter uppercase">
                Progettazione <br /> <span className="italic font-medium text-gold">integrata</span>.
              </h2>
              <div className="space-y-12 text-gray leading-relaxed text-2xl font-light">
                <p>
                  Sviluppiamo il progetto in tutte le sue fasi, garantendo un costante coordinamento tra architettura, strutture e impianti attraverso la <strong className="text-navy font-medium underline decoration-gold/30 underline-offset-8">metodologia BIM</strong>.
                </p>
                <p>
                  Il nostro approccio ottimizza il processo costruttivo, controlla i costi e riduce le tempistiche, assicurando massima qualità e sostenibilità dell'opera.
                </p>
              </div>

              <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-12">
                {[
                  { icon: BoundingBox, title: "Architettura", text: "Concezione dello spazio e interior design." },
                  { icon: HardHat, title: "Ingegneria", text: "Calcolo sismico e sistemi avanzati." },
                  { icon: Monitor, title: "BIM Management", text: "Modellazione parametrica e clash detection." },
                  { icon: TreeStructure, title: "Sostenibilità", text: "Efficienza energetica e criteri CAM." }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-4 mb-4">
                       <item.icon size={24} weight="thin" className="text-gold group-hover:scale-125 transition-transform" />
                       <h4 className="text-[11px] font-bold text-navy uppercase tracking-[0.3em]">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray/70 leading-relaxed font-light pl-10 border-l border-gold/20 group-hover:border-gold transition-colors duration-500">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RILIEVI TECNOLOGICI ── */}
      <section id="rilievi" className="py-32 md:py-56 px-6 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...anim} className="mb-32">
            <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-10 block">
              Digital Twin & Reality Capture
            </span>
            <h3 className="text-6xl md:text-8xl font-bold text-navy tracking-tighter uppercase leading-[0.9]">
              Rilievi <br /> <span className="italic font-medium text-gold">tecnologici</span>.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy/10">
            {[
              {
                title: "Laser Scanner 3D",
                desc: "Acquisizione millimetrica per nuvole di punti dense e modelli as-built con Leica BLK360.",
                img: "/media/blk360_rilievi.webp",
                placeholder: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "Droni Fotogrammetrici",
                desc: "Rilievi topografici e ispezioni in quota con droni DJI per mappature aeree ad alta risoluzione.",
                img: "/media/drone_rilievi.png",
                placeholder: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "Georadar & BIM",
                desc: "Indagini non distruttive del sottosuolo e integrazione in modelli BIM parametrizzati.",
                img: "/media/laser_rilievi.png",
                placeholder: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2000&auto=format&fit=crop"
              }
            ].map((r, i) => (
              <motion.div 
                key={i} 
                {...anim} 
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-16 md:p-20 hover:bg-navy transition-all duration-700"
              >
                <motion.div {...maskAnim} transition={{ delay: i * 0.2, duration: 1.5 }} className="aspect-[4/3] overflow-hidden bg-gray-50 mb-12">
                  <img 
                    src={r.img} 
                    alt={r.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    onError={(e) => { (e.target as HTMLImageElement).src = r.placeholder; }}
                  />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-bold text-navy group-hover:text-gold mb-6 tracking-tight uppercase transition-colors duration-700">{r.title}</h3>
                  <p className="text-gray/80 group-hover:text-white/60 text-xl font-light leading-relaxed mb-10 transition-colors duration-700">{r.desc}</p>
                  <div className="w-12 h-px bg-gold group-hover:w-full transition-all duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 md:py-64 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-gold)_0%,transparent_70%)]" />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
          <motion.div {...anim}>
            <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-12 block">Collaboriamo insieme</span>
            <h2 className="text-6xl md:text-[9rem] font-bold text-white mb-20 tracking-tighter leading-[0.8] uppercase">
              Hai un progetto <br /> <span className="italic text-gold font-medium">da avviare</span>?
            </h2>
            <Link 
              to="/contatti" 
              className="group relative inline-flex items-center gap-10 bg-gold text-white px-20 py-10 text-[12px] font-bold uppercase tracking-[0.5em] overflow-hidden transition-all duration-700"
            >
              <span className="relative z-10 flex items-center gap-6">
                Richiedi una consulenza <ArrowRight size={20} />
              </span>
              <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
              <span className="absolute inset-0 z-20 flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-700 gap-6 font-bold">
                Richiedi una consulenza <ArrowRight size={20} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
