import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Database,
  TrendingUp,
  FileCheck,
  ChevronRight,
  Layers,
  Cpu,
  Binary
} from 'lucide-react';

export default function BIM() {
  const bimServices = [
    { 
       id: '01', 
       title: 'Modellazione e coordinamento', 
       desc: 'Sviluppiamo modelli informativi architettonici, strutturali e impiantistici coordinati tra loro. La centralizzazione delle informazioni riduce interferenze, varianti e imprevisti in fase esecutiva.', 
       img: '/media/portfolio/p08.png',
       icon: Layers
    },
    { 
       id: '02', 
       title: 'BIM per le gare d’appalto', 
       desc: 'Nelle procedure OEPV il modello BIM supporta la redazione delle offerte con elaborati grafici precisi e documentazione conforme ai livelli informativi richiesti dal disciplinare. La qualità del modello si traduce direttamente in qualità dell\'offerta.', 
       img: '/media/portfolio/p10_1.webp',
       icon: FileCheck
    },
    { 
       id: '03', 
       title: 'Scan to BIM & HBIM', 
       desc: 'Partendo dalle nuvole di punti acquisite con laser scanner e drone, generiamo modelli BIM dello stato di fatto — incluso l\'HBIM per gli edifici storici — che costituiscono la base per interventi di recupero, restauro e adeguamento.', 
       img: '/media/blk360_rilievi.webp',
       icon: Cpu
    },
    { 
       id: '04', 
       title: 'As-Built BIM & Asset Management', 
       desc: 'Offriamo il servizio di redazione del modello BIM as-built, aggiornando la documentazione digitale al termine dei lavori per riflettere fedelmente quanto realizzato in cantiere. Il modello restituisce geometrie, impianti e materiali per la gestione e manutenzione futuri.', 
       img: '/media/portfolio/p15_1.webp',
       icon: Database
    }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO ── */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_3.jpg" 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="BIM Strategy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-6 block">Building Information Modeling</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-6">
                BIM <br className="sm:hidden" /> Strategy.
             </h1>
             <p className="text-white/70 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Gestione, coordinamento e condivisione delle informazioni di progetto per un controllo totale del ciclo edilizio.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── CITAZIONE & INTRODUZIONE ── */}
      <section className="pt-16 md:pt-32 px-6 max-w-7xl mx-auto">
         <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="bg-bg-neutral border-l-4 border-gold p-8 rounded-r-sm text-left shadow-sm">
               <p className="text-navy text-xl md:text-2xl font-light italic leading-relaxed">
                  "La qualità di un progetto si misura anche nella precisione delle informazioni che lo descrivono."
               </p>
            </div>
            
            <p className="text-text-main text-base md:text-lg font-light leading-relaxed text-center">
               Il Building Information Modeling è il processo con cui gestiamo, coordiniamo e condividiamo le informazioni di un progetto in modo integrato e trasparente. MBA Progetti applica la metodologia BIM nelle fasi di progettazione, rilievo e redazione delle offerte tecniche, garantendo coerenza e controllo lungo tutto il processo.
            </p>
            <div className="w-16 h-px bg-gold mx-auto pt-4" />
         </div>
      </section>

      {/* ── WORKFLOW OPERATIVO (SERVIZI BIM) ── */}
      <section className="py-16 md:py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Ingegneria dei Dati</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Digital Twin & Gestione Informativa.
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {bimServices.map((step, i) => {
                  const IconComp = step.icon;
                  return (
                     <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="group flex flex-col bg-bg-neutral border border-navy/5 rounded-sm overflow-hidden hover:border-gold transition-all duration-500 shadow-sm hover:shadow-md"
                     >
                        <div className="aspect-video bg-navy/5 overflow-hidden relative">
                           <img 
                              src={step.img} 
                              alt={step.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                           />
                           <div className="absolute top-3 right-3 p-2 bg-navy/80 backdrop-blur-md text-gold rounded-sm">
                              <IconComp size={18} />
                           </div>
                        </div>
                        <div className="p-6 text-left flex-1 flex flex-col justify-between border-t border-navy/5">
                           <div>
                              <span className="text-gold text-xs font-mono font-bold mb-2 block">{step.id}</span>
                              <h3 className="text-navy text-lg font-bold uppercase tracking-tight mb-3 group-hover:text-gold transition-colors">{step.title}</h3>
                              <p className="text-text-main text-xs font-light leading-relaxed">
                                 {step.desc}
                              </p>
                           </div>
                        </div>
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── VANTAGGI & EFFICIENZA ── */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-navy text-white">
         <div className="absolute inset-0 z-0">
            <img 
               src="/media/portfolio/p01.jpg" 
               className="w-full h-full object-cover grayscale brightness-[0.25]" 
               alt="Background BIM"
            />
            <div className="absolute inset-0 bg-navy/70" />
         </div>

         <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-16"
            >
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Metodo Digitale</span>
               <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Efficienza Informativa & Interoperabilità.
               </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Database size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Asset Management</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     I dati del modello al servizio della gestione immobiliare, dei facility management e della manutenzione predittiva dell'immobile.
                  </p>
               </div>

               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <TrendingUp size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Ottimizzazione Costi</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Riduzione drastica delle varianti e dei tempi di cantiere grazie alla simulazione virtuale delle interferenze (Clash Detection).
                  </p>
               </div>

               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Binary size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Standard OpenBIM (IFC)</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Interoperabilità totale garantita dall'uso di formati aperti (IFC, BCF, COBie) in linea con le normative ISO 19650.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="py-16 md:py-32 bg-white text-center px-6">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
               Digitalizza la Tua <br /> Commessa.
            </h2>
            <p className="text-text-main text-sm md:text-base font-light mb-12">
               Contatta i nostri specialisti BIM per definire la strategia informativa e il Capitolato Informativo (CI) del tuo progetto.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/contatti" className="btn-ghost-dark px-8 md:px-12 py-4 md:py-6 inline-flex items-center gap-3 w-full sm:w-auto justify-center">
                  Parla con un BIM Manager <ChevronRight size={18} />
               </Link>
               <Link to="/portfolio" className="border border-navy/20 hover:border-navy text-navy font-bold uppercase tracking-wider text-xs px-8 md:px-12 py-4 md:py-6 rounded-sm transition-all w-full sm:w-auto text-center">
                  Scopri i Progetti BIM
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}

