import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  Target,
  GraduationCap,
  HeartPulse,
  Landmark,
  Trophy,
  Home,
  Milestone,
  Wrench,
  Hotel,
  LayoutGrid,
  Building2,
  ArrowRight
} from 'lucide-react';

function StatItem({ value, label }: { value: string; label: string }) {
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
    <div ref={ref} className="text-center bg-bg-neutral/60 border border-navy/5 p-6 md:p-8 flex flex-col justify-center items-center shadow-xs">
       <div className="text-navy text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-2">
         {prefix}{isInView ? count : 0}{suffix}
       </div>
       <div className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

export default function Gare() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  const steps = [
    { id: '01', title: 'Scelta della gara', desc: 'Identificazione delle procedure più coerenti con le potenzialità e la struttura dell’impresa.' },
    { id: '02', title: 'Valutazione investimento', desc: 'Analisi preliminare dei costi e dei benefici stimati per la partecipazione.' },
    { id: '03', title: 'Analisi disciplinare', desc: 'Studio approfondito di ogni criterio di valutazione, dei sub-criteri e dei vincoli tecnici.' },
    { id: '04', title: 'Sopralluogo', desc: 'Verifica diretta dello stato dei luoghi per individuare criticità e opportunità migliorative.' },
    { id: '05', title: 'Studio progetto', desc: 'Analisi critica del progetto a base di gara, della relazione generale e delle possibili varianti.' },
    { id: '06', title: 'Valutazione migliorie', desc: 'Definizione condivisa con l’impresa delle proposte tecniche migliorative da inserire in offerta.' },
    { id: '07', title: 'Redazione offerta', desc: 'Scrittura professionale della relazione tecnica e produzione di elaborati e schemi grafici.' },
    { id: '08', title: 'Editing e consegna', desc: 'Impaginazione ad alto impatto visivo e supporto al caricamento telematico.' }
  ];

  const ambiti = [
    { icon: GraduationCap, title: "Edilizia scolastica", desc: "Scuole primarie, secondarie, poli dell'infanzia e campus universitari." },
    { icon: HeartPulse, title: "Strutture assistenziali", desc: "Ospedali, RSA, presidi sanitari e centri di riabilitazione." },
    { icon: Landmark, title: "Strutture e PA", desc: "Sedi istituzionali, uffici pubblici, caserme e complessi giudiziari." },
    { icon: Trophy, title: "Strutture sportive", desc: "Palazzetti dello sport, stadi, impianti natatori e palestre comunali." },
    { icon: Home, title: "Edilizia residenziale", desc: "Social housing, edilizia residenziale pubblica e complessi abitativi." },
    { icon: Milestone, title: "Infrastrutture", desc: "Strade, parcheggi pluri-piano, spazi pubblici, piazze e reti tecnologiche." },
    { icon: Wrench, title: "Manutenzione", desc: "Riqualificazione energetica, adeguamento sismico e manutenzione straordinaria." },
    { icon: Hotel, title: "Strutture ricettive", desc: "Hotel, ostelli della gioventù, centri culturali e spazi museali." },
    { icon: LayoutGrid, title: "Strutture polivalenti", desc: "Centri polifunzionali, spazi espositivi e padiglioni fieristici." },
    { icon: Building2, title: "Edifici storici", desc: "Restauro conservativo, recupero di beni vincolati ed edifici di pregio storico." }
  ];

  const plates = [
    { img: "/media/portfolio/tavole-02.webp", title: "Tavola 1 — Analisi e Inquadramento" },
    { img: "/media/portfolio/tavole-03.webp", title: "Tavola 2 — Proposte Migliorative" },
    { img: "/media/portfolio/tavole-04.webp", title: "Tavola 3 — Layout Tecnologico e Impianti" },
    { img: "/media/portfolio/tavole-05.webp", title: "Tavola 4 — Cantiere e Sostenibilità" },
    { img: "/media/portfolio/tavole-06.webp", title: "Tavola 5 — Dettagli Costruttivi" },
    { img: "/media/portfolio/tavole_Tavola disegno 1.webp", title: "Tavola 6 — Sintesi Progettuale" }
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? plates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === plates.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO CON SFUMATURA ORIGINALE ── */}
      <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            className="w-full h-full object-cover grayscale opacity-25" 
            alt="Gare OEPV background"
          />
          {/* Sfumatura blu originale */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-16">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <span className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-90">Eccellenza negli Appalti Pubblici</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-4">
                Gare OEPV.
             </h1>
             <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Metodo, precisione, dedizione. Specialisti nella redazione di offerte tecniche migliorative per gare d'appalto pubbliche.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── TAVOLE GRAFICHE E ANTEPRIME METTITI IN ALTO ── */}
      <section className="py-12 md:py-20 bg-bg-neutral/40 border-b border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Elaborati e Layout</span>
              <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                 Galleria Tavole di Gara
              </h2>
              <p className="text-navy/70 text-xs sm:text-sm font-light mt-2">
                 Esempi reali di tavole grafiche, relazioni metodologiche e layout visuali elaborati dallo studio.
              </p>
           </div>

           {/* Carousel Immagini Tavole */}
           <div className="relative max-w-4xl mx-auto bg-white border border-navy/10 rounded-sm shadow-md overflow-hidden">
              <div className="relative aspect-[16/9] bg-neutral-900 group">
                 <img 
                    src={plates[currentIndex].img} 
                    alt={plates[currentIndex].title}
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={() => setIsFullscreenModalOpen(true)}
                 />
                 <button
                    onClick={() => setIsFullscreenModalOpen(true)}
                    className="absolute top-4 right-4 bg-navy/80 hover:bg-navy text-gold p-2.5 rounded-sm backdrop-blur-sm transition-colors"
                    title="Ingrandisci a Schermo Intero"
                 >
                    <Maximize2 size={18} />
                 </button>
              </div>

              {/* Controlli Didascalia */}
              <div className="p-4 bg-white border-t border-navy/10 flex items-center justify-between">
                 <div className="text-navy text-xs sm:text-sm font-bold uppercase tracking-wide">
                    {plates[currentIndex].title}
                 </div>
                 <div className="flex items-center gap-2">
                    <button 
                       onClick={handlePrev}
                       className="p-2 border border-navy/20 text-navy hover:border-gold hover:text-gold transition-colors rounded-sm"
                       aria-label="Precedente"
                    >
                       <ChevronLeft size={18} />
                    </button>
                    <span className="text-xs font-mono font-bold text-gold px-2">
                       {currentIndex + 1} / {plates.length}
                    </span>
                    <button 
                       onClick={handleNext}
                       className="p-2 border border-navy/20 text-navy hover:border-gold hover:text-gold transition-colors rounded-sm"
                       aria-label="Successivo"
                    >
                       <ChevronRight size={18} />
                    </button>
                 </div>
              </div>
           </div>

           {/* Ingrandimento Modal */}
           {isFullscreenModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
                 <button 
                    onClick={() => setIsFullscreenModalOpen(false)}
                    className="absolute top-6 right-6 text-white hover:text-gold p-2 transition-colors"
                 >
                    <X size={28} />
                 </button>
                 <img 
                    src={plates[currentIndex].img} 
                    alt={plates[currentIndex].title}
                    className="max-w-full max-h-[90vh] object-contain rounded-sm"
                 />
              </div>
           )}
        </div>
      </section>

      {/* ── INTRO & KPI ── */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-5 text-navy/80 text-sm font-light leading-relaxed">
               <div className="inline-flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.3em]">
                  <Target size={16} /> Specializzazione & Rigore Tecnico
               </div>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tight leading-tight">
                  Supporto Strategico per l'Offerta Economicamente Più Vantaggiosa
               </h2>
               <p>
                  Dal 2019, MBA Progetti affianca le imprese nella redazione di offerte tecniche migliorative per gare d'appalto pubbliche aggiudicate secondo il criterio dell'offerta economicamente più vantaggiosa (OEPV).
               </p>
               <p>
                  Analizziamo i documenti di gara per individuare con precisione i margini di miglioramento tecnico, sviluppando proposte fondate su metodo, chiarezza e coerenza con i criteri di valutazione.
               </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
               <StatItem value="+200" label="Gare Redatte" />
               <StatItem value="63%" label="Gare sul Podio" />
               <StatItem value="38%" label="Gare Vinte" />
            </div>
         </div>
      </section>

      {/* ── COME LAVORIAMO (8 STEP) ── */}
      <section className="py-12 md:py-20 bg-bg-neutral/50 border-t border-navy/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Il Processo</span>
              <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                 Come Lavoriamo in 8 Fasi
              </h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {steps.map((st) => (
                 <div key={st.id} className="bg-white p-6 border border-navy/10 rounded-sm space-y-2 shadow-xs">
                    <span className="text-gold font-mono font-bold text-sm block">{st.id}</span>
                    <h3 className="text-navy text-sm font-bold uppercase tracking-tight">{st.title}</h3>
                    <p className="text-navy/70 text-xs font-light leading-relaxed">{st.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* ── AMBITI DI INTERVENTO ── */}
      <section className="py-12 md:py-20 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Ambiti D'Intervento</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Tipologie di Opere
               </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
               {ambiti.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                     <div key={idx} className="bg-bg-neutral/60 p-5 border border-navy/5 rounded-sm text-center space-y-2 hover:border-gold transition-colors">
                        <IconComp size={22} className="mx-auto text-gold" />
                        <h3 className="text-navy text-xs font-bold uppercase tracking-tight">{item.title}</h3>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── FINAL CTA (SENZA BLOCCO BLU) ── */}
      <section className="py-12 md:py-20 bg-bg-neutral text-navy text-center border-t border-navy/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter leading-tight mb-4">
             Hai Bisogno di Supporto per una Gara OEPV?
          </h2>
          <p className="text-navy/70 text-sm font-light mb-8">
             Richiedi uno studio preliminare del disciplinare e della fattibilità delle offerte migliorative.
          </p>
          <Link to="/contatti" className="btn-ghost-dark group">
             Richiedi il Servizio <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
          </Link>
        </div>
      </section>

    </div>
  );
}
