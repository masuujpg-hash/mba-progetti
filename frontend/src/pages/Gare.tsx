import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  Target,
  Calculator,
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
    <div ref={ref} className="text-center bg-bg-neutral border border-navy/5 p-6 md:p-8 flex flex-col justify-center items-center shadow-sm hover:shadow-md transition-shadow">
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
    { id: '04', title: 'Sopralluogo', desc: 'Verifica diretta dello stato dei luoghi per individuare criticità, vincoli e opportunità migliorative.' },
    { id: '05', title: 'Studio progetto', desc: 'Analisi critica del progetto a base di gara, della relazione generale e delle possibili varianti.' },
    { id: '06', title: 'Valutazione migliorie', desc: 'Definizione condivisa con l’impresa delle proposte tecniche migliorative da inserire in offerta.' },
    { id: '07', title: 'Redazione offerta', desc: 'Scrittura professionale della relazione tecnica e produzione di elaborati e schemi grafici.' },
    { id: '08', title: 'Editing e consegna', desc: 'Revisione finale, impaginazione ad alto impatto visivo e supporto al caricamento telematico.' }
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
      
      {/* ── HERO ── */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_2.jpg" 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Gare OEPV background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/90 to-navy" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2 }}
           >
             <span className="text-white text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-8 block opacity-90">Eccellenza negli Appalti Pubblici</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-6">
                Gare <br className="sm:hidden" /> OEPV.
             </h1>
             <p className="text-white/80 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Metodo, precisione, dedizione. Specialisti nella redazione di offerte tecniche migliorative per gare d'appalto pubbliche.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── INTRO & KPI ── */}
      <section className="pt-16 md:pt-32 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-7 space-y-6 text-text-main text-base md:text-lg font-light leading-relaxed">
               <div className="inline-flex items-center gap-3 text-gold text-xs font-bold uppercase tracking-[0.3em] mb-2">
                  <Target size={18} /> Specializzazione & Rigore Tecnico
               </div>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tight leading-tight">
                  Supporto Strategico per l'Offerta Economicamente Più Vantaggiosa
               </h2>
               <p>
                  Dal 2019, MBA Progetti affianca le imprese nella redazione di offerte tecniche migliorative per gare d'appalto pubbliche aggiudicate secondo il criterio dell'offerta economicamente più vantaggiosa (OEPV), nell'ambito del D.Lgs. 36/2023. Analizziamo i documenti di gara per individuare con precisione i margini di miglioramento tecnico, sviluppando proposte fondate su metodo, chiarezza e coerenza con i criteri di valutazione.
               </p>
               <p>
                  Ogni procedura è affrontata come un progetto: con un'analisi iniziale, una strategia condivisa con l'impresa e una produzione documentale orientata alla massimizzazione del punteggio tecnico. Lo studio supporta le imprese anche nelle procedure per appalti integrati, garantendo continuità tecnica dall'offerta migliorativa alla progettazione esecutiva.
               </p>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6">
               <StatItem value="+200" label="Gare Redatte" />
               <StatItem value="63%" label="Gare sul Podio" />
               <StatItem value="38%" label="Gare Aggiudicate" />
               <StatItem value="+40" label="Imprese Clienti" />
            </div>
         </div>
      </section>

      {/* ── PERCHÉ SCEGLIERCI ── */}
      <section className="py-16 md:py-32 bg-bg-neutral mt-20 md:mt-32 border-y border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">I Nostri Vantaggi</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Perché Sceglierci.
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 md:p-10 border border-navy/5 rounded-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                  <div>
                     <span className="text-gold font-mono text-xl font-bold mb-6 block">01</span>
                     <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">
                        Approccio dedicato, non seriale
                     </h3>
                     <p className="text-text-main text-sm font-light leading-relaxed">
                        Ogni gara viene studiata e sviluppata da zero. Analizziamo il disciplinare, interpretiamo i criteri di valutazione e costruiamo soluzioni migliorative specifiche per quella procedura. Nessuna offerta standard, nessuna scorciatoia.
                     </p>
                  </div>
               </div>

               <div className="bg-white p-8 md:p-10 border border-navy/5 rounded-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                  <div>
                     <span className="text-gold font-mono text-xl font-bold mb-6 block">02</span>
                     <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">
                        Un team completo per ogni procedura
                     </h3>
                     <p className="text-text-main text-sm font-light leading-relaxed">
                        Architetti, specialisti BIM, esperti di contabilità dei lavori, restauratori e consulenti strutturali, impiantistici e infrastrutturali. Ogni competenza viene attivata in funzione delle specifiche esigenze della gara.
                     </p>
                  </div>
               </div>

               <div className="bg-white p-8 md:p-10 border border-navy/5 rounded-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                  <div>
                     <span className="text-gold font-mono text-xl font-bold mb-6 block">03</span>
                     <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-4 group-hover:text-gold transition-colors">
                        Dieci anni di esperienza nel settore
                     </h3>
                     <p className="text-text-main text-sm font-light leading-relaxed">
                        Dal 2015 operiamo nel settore degli appalti pubblici. Un percorso costruito gara dopo gara, su tipologie diverse — edilizia scolastica, restauro, infrastrutture, strutture sportive — in tutta Italia, con solide competenze su D.Lgs. 36/2023, Linee Guida ANAC e CAM.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ── WORKFLOW OPERATIVO (8 STEP) ── */}
      <section className="py-16 md:py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
               {steps.map((step, i) => (
                  <motion.div 
                     key={step.id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.08 }}
                     className="group border-l border-navy/10 pl-6 py-2 hover:border-gold transition-colors"
                  >
                     <div className="flex flex-col">
                        <div className="mb-4">
                           <span className="text-gold text-4xl font-bold font-mono group-hover:translate-x-1 transition-transform inline-block">
                              {step.id}
                           </span>
                        </div>
                        <h3 className="text-navy text-lg font-bold uppercase tracking-tight mb-3">{step.title}</h3>
                        <p className="text-text-main text-xs font-light leading-relaxed">
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
                        {plates[currentIndex].title}
                     </span>
                     <button
                        onClick={() => setIsFullscreenModalOpen(true)}
                        className="bg-navy/80 hover:bg-gold hover:text-navy text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 border border-white/20 transition-all flex items-center gap-1.5 rounded-sm cursor-pointer"
                     >
                        <Maximize2 size={14} /> Schermo Intero
                     </button>
                  </div>

                  {/* Previous / Next Buttons */}
                  <button
                     onClick={handlePrev}
                     className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy/80 hover:bg-gold text-white hover:text-navy border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                     aria-label="Tavola Precedente"
                  >
                     <ChevronLeft size={20} />
                  </button>

                  <button
                     onClick={handleNext}
                     className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy/80 hover:bg-gold text-white hover:text-navy border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg z-10"
                     aria-label="Tavola Successiva"
                  >
                     <ChevronRight size={20} />
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

      {/* ── AMBITI DI INTERVENTO (10 SETTORI) ── */}
      <section className="py-16 md:py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Ambiti di Intervento</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Esperienza su Ogni Tipologia di Opera.
               </h2>
               <p className="text-text-main text-sm font-light max-w-2xl mx-auto mt-4">
                  MBA Progetti sviluppa offerte tecniche per gare pubbliche in molteplici settori dell'ingegneria e dell'architettura.
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
               {ambiti.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                     <div key={index} className="bg-bg-neutral p-6 rounded-sm border border-navy/5 flex flex-col items-start hover:border-gold/50 transition-all group">
                        <div className="p-3 bg-white border border-gold/20 text-gold mb-4 rounded-sm group-hover:bg-gold group-hover:text-navy transition-colors">
                           <IconComponent size={24} />
                        </div>
                        <h3 className="text-navy text-sm font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                        <p className="text-text-main text-xs font-light leading-relaxed">{item.desc}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── CTA SIMULATORE OEPV ── */}
      <section className="py-16 md:py-24 bg-navy text-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
               <div className="inline-flex items-center gap-2 text-gold text-xs font-mono font-bold uppercase tracking-widest">
                  <Calculator size={16} /> Strumento Pratico Gratuito
               </div>
               <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter">
                  Simulatore Punteggio Economico OEPV
               </h2>
               <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
                  Calcola il punteggio economico in funzione del ribasso per le quattro formule ministeriali più utilizzate nelle gare pubbliche italiane (Lineare, Prezzo minimo, Esponenziale, Bilineare).
               </p>
            </div>
            <div className="shrink-0">
               <Link 
                  to="/simulatore" 
                  className="bg-gold hover:bg-gold-light text-navy font-bold uppercase tracking-wider text-xs px-8 py-5 rounded-sm transition-all inline-flex items-center gap-3 shadow-lg"
               >
                  Apri il Simulatore OEPV <ArrowRight size={16} />
               </Link>
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
                  {plates[currentIndex].title} — Tavola {currentIndex + 1} di {plates.length}
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
                  <ChevronLeft size={28} />
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
                  <ChevronRight size={28} />
               </button>
            </div>
         </div>
      )}

      {/* ── CTA FINALE ── */}
      <section className="py-16 md:py-32 bg-white text-center px-6">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
               Hai bisogno di supporto <br /> per una gara d'appalto?
            </h2>
            <p className="text-text-main text-sm md:text-base font-light mb-12">
               Richiedi un'analisi preliminare del disciplinare di gara o un preventivo personalizzato per la redazione dell'offerta tecnica.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/contatti" className="btn-ghost-dark px-8 md:px-12 py-4 md:py-6 inline-flex items-center gap-3 w-full sm:w-auto justify-center">
                  Richiedi Analisi Bando <ChevronRight size={18} />
               </Link>
               <Link to="/portfolio" className="border border-navy/20 hover:border-navy text-navy font-bold uppercase tracking-wider text-xs px-8 md:px-12 py-4 md:py-6 rounded-sm transition-all w-full sm:w-auto text-center">
                  Guarda il Portfolio Gare
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}

