import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Database,
  TrendingUp,
  FileCheck,
  Layers,
  Cpu,
  Binary,
  ArrowRight
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
       desc: 'Nelle procedure OEPV il modello BIM supporta la redazione delle offerte con elaborati grafici precisi e documentazione conforme ai livelli informativi richiesti dal disciplinare.', 
       img: '/media/portfolio/p10_1.webp',
       icon: FileCheck
    },
    { 
       id: '03', 
       title: 'Scan to BIM & HBIM', 
       desc: 'Partendo dalle nuvole di punti acquisite con laser scanner e drone, generiamo modelli BIM dello stato di fatto — incluso l\'HBIM per gli edifici storici — che costituiscono la base per interventi di recupero.', 
       img: '/media/blk360_rilievi.webp',
       icon: Cpu
    },
    { 
       id: '04', 
       title: 'As-Built BIM & Asset Management', 
       desc: 'Aggiorniamo la documentazione digitale al termine dei lavori per riflettere fedelmente quanto realizzato in cantiere per la gestione e manutenzione futura.', 
       img: '/media/portfolio/p15_1.webp',
       icon: Database
    }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO CON SFUMATURA ORIGINALE ── */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_3.jpg" 
            className="w-full h-full object-cover grayscale opacity-25" 
            alt="BIM Strategy"
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
             <span className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-90">Building Information Modeling</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-4">
                BIM Strategy.
             </h1>
             <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Gestione, coordinamento e condivisione delle informazioni di progetto per un controllo totale del ciclo edilizio.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── CITAZIONE & INTRODUZIONE ── */}
      <section className="py-12 md:py-16 px-6 max-w-4xl mx-auto text-center">
         <div className="bg-bg-neutral border-l-4 border-gold p-6 sm:p-8 rounded-r-sm text-left shadow-xs mb-8">
            <p className="text-navy text-lg sm:text-xl font-light italic leading-relaxed">
               "La qualità di un progetto si misura anche nella precisione delle informazioni che lo descrivono."
            </p>
         </div>
         <p className="text-navy/80 text-sm md:text-base font-light leading-relaxed">
            Il Building Information Modeling è il processo con cui gestiamo, coordiniamo e condividiamo le informazioni di un progetto in modo integrato e trasparente. Appliciamo la metodologia BIM nelle fasi di progettazione, rilievo e redazione delle offerte tecniche.
         </p>
      </section>

      {/* ── SERVIZI BIM ── */}
      <section className="py-12 md:py-20 bg-bg-neutral/40 border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Ingegneria dei Dati</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Digital Twin & Modellazione
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {bimServices.map((step) => {
                  const IconComp = step.icon;
                  return (
                     <div 
                        key={step.id}
                        className="bg-white border border-navy/10 rounded-sm overflow-hidden p-6 flex flex-col justify-between space-y-4 shadow-xs"
                     >
                        <div className="flex items-center justify-between">
                           <span className="text-gold font-mono font-bold text-xs">{step.id}</span>
                           <IconComp size={20} className="text-navy/60" />
                        </div>
                        <div>
                           <h3 className="text-navy text-base font-bold uppercase tracking-tight mb-2">{step.title}</h3>
                           <p className="text-navy/70 text-xs font-light leading-relaxed">{step.desc}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── METODO DIGITALE ── */}
      <section className="py-12 md:py-20 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Vantaggi Competitivi</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Efficienza Informativa & Interoperabilità
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-6 bg-bg-neutral/60 border border-navy/5 rounded-sm space-y-3">
                  <Database size={24} className="text-gold" />
                  <h3 className="text-navy text-base font-bold uppercase tracking-tight">Asset Management</h3>
                  <p className="text-navy/70 text-xs font-light leading-relaxed">
                     I dati del modello al servizio della gestione immobiliare, dei facility management e della manutenzione predittiva dell'immobile.
                  </p>
               </div>

               <div className="p-6 bg-bg-neutral/60 border border-navy/5 rounded-sm space-y-3">
                  <TrendingUp size={24} className="text-gold" />
                  <h3 className="text-navy text-base font-bold uppercase tracking-tight">Ottimizzazione Costi</h3>
                  <p className="text-navy/70 text-xs font-light leading-relaxed">
                     Riduzione drastica delle varianti e dei tempi di cantiere grazie alla simulazione virtuale delle interferenze (Clash Detection).
                  </p>
               </div>

               <div className="p-6 bg-bg-neutral/60 border border-navy/5 rounded-sm space-y-3">
                  <Binary size={24} className="text-gold" />
                  <h3 className="text-navy text-base font-bold uppercase tracking-tight">Standard OpenBIM (IFC)</h3>
                  <p className="text-navy/70 text-xs font-light leading-relaxed">
                     Interoperabilità totale garantita dall'uso di formati aperti (IFC, BCF, COBie) in linea con le normative ISO 19650.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ── FINAL CTA (SENZA BLOCCO BLU) ── */}
      <section className="py-12 md:py-20 bg-bg-neutral text-navy text-center border-t border-navy/10">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter leading-tight mb-4">
               Digitalizza la Tua Commessa
            </h2>
            <p className="text-navy/70 text-sm font-light mb-8">
               Contatta i nostri specialisti BIM per definire la strategia informativa ed il Capitolato Informativo (CI).
            </p>
            <Link to="/contatti" className="btn-ghost-dark group">
               Richiedi una Consulenza <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
            </Link>
         </div>
      </section>

    </div>
  );
}
