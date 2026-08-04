import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  CaretRight,
  CaretLeft,
  ArrowsOut,
  X
} from '@phosphor-icons/react';

function StatItem({ value, label }: any) {
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

      const steps = 60; // 60 frames
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
    <div ref={ref} className="text-center bg-bg-neutral border border-navy/5 p-8 flex flex-col justify-center items-center shadow-sm hover:shadow-md transition-shadow">
       <div className="text-navy text-4xl md:text-5xl font-bold tracking-tighter mb-2">
         {prefix}{isInView ? count : 0}{suffix}
       </div>
       <div className="text-gold text-[10px] font-bold uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

export default function Gare() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  const steps = [
    { id: '01', title: 'Scelta della gara', desc: 'Identificazione delle procedure più coerenti con le potenzialità dell’impresa.' },
    { id: '02', title: 'Valutazione investimento', desc: 'Analisi preliminare dei costi e dei benefici della partecipazione.' },
    { id: '03', title: 'Analisi disciplinare', desc: 'Studio approfondito di ogni criterio di valutazione e dei vincoli tecnici.' },
    { id: '04', title: 'Sopralluogo', desc: 'Verifica diretta dello stato dei luoghi per individuare criticità e opportunità.' },
    { id: '05', title: 'Studio progetto', desc: 'Analisi critica del progetto a base di gara e delle possibili varianti.' },
    { id: '06', title: 'Valutazione migliorie', desc: 'Definizione condivisa con l’impresa delle proposte tecniche migliorative.' },
    { id: '07', title: 'Redazione offerta', desc: 'Scrittura professionale della relazione e produzione degli elaborati grafici.' },
    { id: '08', title: 'Editing e consegna', desc: 'Revisione finale, impaginazione e supporto al caricamento telematico.' }
  ];

  const plates = [
    { img: "/media/portfolio/tavole-02.webp", title: "Tavola 1" },
    { img: "/media/portfolio/tavole-03.webp", title: "Tavola 2" },
    { img: "/media/portfolio/tavole-04.webp", title: "Tavola 3" },
    { img: "/media/portfolio/tavole-05.webp", title: "Tavola 4" },
    { img: "/media/portfolio/tavole-06.webp", title: "Tavola 5" },
    { img: "/media/portfolio/tavole_Tavola disegno 1.webp", title: "Tavola 6" }
  ];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? plates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === plates.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO ── */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-bg-neutral">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_1.jpg" 
            className="w-full h-full object-cover grayscale opacity-18" 
            alt="Gare OEPV background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-8 block">Eccellenza negli Appalti</span>
             <h1 className="text-navy text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter">
                Gare <br /> OEPV.
             </h1>
           </motion.div>
        </div>
      </section>

      {/* ── INTRO & KPI ── */}
      <section className="pt-16 md:pt-32 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7 space-y-6 text-text-main text-base md:text-lg font-light leading-relaxed">
               <p>
                  Dal 2019, MBA Progetti affianca le imprese nella redazione di offerte tecniche migliorative per gare d'appalto pubbliche aggiudicate secondo il criterio dell'offerta economicamente più vantaggiosa (OEPV). Analizziamo i documenti di gara per individuare con precisione i margini di miglioramento tecnico, sviluppando proposte fondate su metodo, chiarezza e coerenza con i criteri di valutazione.
               </p>
               <p>
                  Ogni procedura è affrontata come un progetto: con un'analisi iniziale, una strategia condivisa con l'impresa e una produzione documentale orientata alla massimizzazione del punteggio tecnico. Lo studio supporta le imprese anche nelle procedure per appalti integrati, garantendo continuità tecnica dall'offerta migliorativa alla progettazione esecutiva.
               </p>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
               <StatItem value="+200" label="Gare Redatte" />
               <StatItem value="63%" label="Gare sul Podio" />
               <StatItem value="38%" label="Gare Aggiudicate" />
            </div>
         </div>
      </section>


      {/* ── WORKFLOW OPERATIVO ── */}
      <section className="py-12 md:py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-32">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Il Nostro Metodo</span>
                  <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                     Dall'Analisi <br /> All'Aggiudicazione.
                  </h2>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
               {steps.map((step, i) => (
                  <motion.div 
                     key={step.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="group"
                  >
                     <div className="flex flex-col items-center text-center">
                        <div className="mb-8 relative">
                           <span className="text-gold text-6xl font-bold font-mono opacity-10 group-hover:opacity-100 transition-all duration-500">
                              {step.id}
                           </span>
                        </div>
                        <h3 className="text-navy text-xl font-bold uppercase tracking-tighter mb-4">{step.title}</h3>
                        <p className="text-text-main text-sm font-light leading-relaxed">
                           {step.desc}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ── IL NOSTRO OBIETTIVO ── */}
      <section className="py-16 md:py-32 bg-bg-neutral border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Il Nostro Obiettivo</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.2] max-w-2xl mx-auto">
                  Comunicare la qualità, <br /> non solo produrla.
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 md:mb-32">
               <div className="space-y-4">
                  <div className="w-10 h-px bg-gold mb-6" />
                  <h3 className="text-navy text-xl font-bold uppercase tracking-tight leading-tight">
                     Proposte che entrano nel merito
                  </h3>
                  <p className="text-text-main text-sm font-light leading-relaxed">
                     Niente schemi preconfezionati o soluzioni generiche. Ogni miglioramento tecnico è studiato ad hoc sui criteri del bando per portare valore reale.
                  </p>
               </div>
               <div className="space-y-4">
                  <div className="w-10 h-px bg-gold mb-6" />
                  <h3 className="text-navy text-xl font-bold uppercase tracking-tight leading-tight">
                     Ogni miglioria come valore aggiunto
                  </h3>
                  <p className="text-text-main text-sm font-light leading-relaxed">
                     Non elenchiamo soluzioni in modo sterile, descriviamo in modo analitico e grafico come e perché ogni miglioria porti un reale beneficio, in linea con i criteri della gara.
                  </p>
               </div>
               <div className="space-y-4">
                  <div className="w-10 h-px bg-gold mb-6" />
                  <h3 className="text-navy text-xl font-bold uppercase tracking-tight leading-tight">
                     La sintesi grafica come chiave di lettura
                  </h3>
                  <p className="text-text-main text-sm font-light leading-relaxed">
                     La commissione deve valutare in tempi brevi. Disegni, schemi e rendering mettono subito in evidenza il valore della proposta tecnica, facilitando il lavoro di chi giudica.
                  </p>
               </div>
            </div>

            {/* SLIDER / VIEWER FULLSCREEN TAVOLE GRAFICHE */}
            <div className="max-w-6xl mx-auto mt-16 md:mt-32">
               <div className="text-center mb-8">
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">Elaborati di Gara</span>
                  <h4 className="text-navy text-2xl font-bold uppercase tracking-tighter">
                     Tavole Tecniche & Progettuali
                  </h4>
                  <p className="text-navy/60 text-xs font-light mt-1">
                     Scorri le tavole ad alta risoluzione o clicca per la vista a schermo intero
                  </p>
               </div>

               {/* Main Full-Width Slide Viewer */}
               <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-navy rounded-sm overflow-hidden shadow-2xl border border-navy/10 group">
                  <img 
                     src={plates[currentIndex].img} 
                     alt={plates[currentIndex].title}
                     className="w-full h-full object-contain bg-zinc-950/90 transition-all duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/30 pointer-events-none" />

                  {/* Top Bar: Counter & Fullscreen Toggle */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                     <span className="bg-navy/80 backdrop-blur-md text-gold text-[11px] font-mono font-bold tracking-widest px-3 py-1.5 border border-gold/20 rounded-sm">
                        Tavola {currentIndex + 1} di {plates.length}
                     </span>
                     <button
                        onClick={() => setIsFullscreenModalOpen(true)}
                        className="bg-navy/80 hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 border border-white/20 transition-all flex items-center gap-1.5 rounded-sm cursor-pointer"
                     >
                        <ArrowsOut size={14} /> Schermo Intero
                     </button>
                  </div>

                  {/* Previous / Next Buttons */}
                  <button
                     onClick={handlePrev}
                     className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-navy/80 hover:bg-gold text-white hover:text-navy border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                     aria-label="Tavola Precedente"
                  >
                     <CaretLeft size={24} weight="bold" />
                  </button>

                  <button
                     onClick={handleNext}
                     className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-navy/80 hover:bg-gold text-white hover:text-navy border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                     aria-label="Tavola Successiva"
                  >
                     <CaretRight size={24} weight="bold" />
                  </button>
               </div>

               {/* Horizontal Thumbnail Strip */}
               <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {plates.map((plate, index) => (
                     <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`relative shrink-0 w-24 sm:w-32 aspect-[16/9] border-2 transition-all overflow-hidden rounded-sm cursor-pointer ${
                           currentIndex === index 
                              ? 'border-gold opacity-100 scale-105 shadow-md' 
                              : 'border-transparent opacity-50 hover:opacity-90'
                        }`}
                     >
                        <img 
                           src={plate.img} 
                           alt={plate.title}
                           className="w-full h-full object-cover"
                        />
                     </button>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Lightbox Modal per Vista Full Screen */}
      {isFullscreenModalOpen && (
         <div 
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
         >
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <span className="text-gold font-mono font-bold text-xs uppercase tracking-widest">
                  Tavola {currentIndex + 1} di {plates.length}
               </span>
               <button 
                  onClick={() => setIsFullscreenModalOpen(false)}
                  className="text-white hover:text-gold text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer bg-white/10 px-4 py-2 rounded-sm"
               >
                  Chiudi <X size={16} />
               </button>
            </div>

            {/* Main Image Container */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
               <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-6 text-white hover:text-gold bg-navy/80 border border-white/20 p-3 rounded-full cursor-pointer z-10"
               >
                  <CaretLeft size={28} weight="bold" />
               </button>

               <img 
                  src={plates[currentIndex].img} 
                  alt={plates[currentIndex].title} 
                  className="max-w-full max-h-[82vh] object-contain shadow-2xl"
               />

               <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-6 text-white hover:text-gold bg-navy/80 border border-white/20 p-3 rounded-full cursor-pointer z-10"
               >
                  <CaretRight size={28} weight="bold" />
               </button>
            </div>
         </div>
      )}

      {/* ── CTA ── */}
      <section className="py-16 md:py-32 bg-white text-center px-6">
         <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8 md:mb-16">
            Migliora la Tua <br /> Performance.
         </h2>
         <a href="/contatti" className="btn-ghost-dark px-8 md:px-20 py-4 md:py-8 inline-flex items-center gap-4">
            Richiedi un'Analisi Bando <CaretRight />
         </a>
      </section>

    </div>
  );
}
