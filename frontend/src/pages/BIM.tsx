import { motion } from 'framer-motion';
import { 
  Database,
  ChartLineUp,
  Files,
  CaretRight
} from '@phosphor-icons/react';

export default function BIM() {
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
        <div className="relative z-10 text-center px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.8em] mb-6 md:mb-8 block">Building Information Modeling</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter">
                BIM <br /> <span className="text-stroke-white">Strategy.</span>
             </h1>
           </motion.div>
        </div>
      </section>

      {/* ── WORKFLOW OPERATIVO (IL METODO) ── */}
      <section className="py-12 md:py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-32">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block">Ingegneria dei Dati</span>
                  <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                     Digital <br /> Twin.
                  </h2>
                  <p className="text-navy text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed border-l-4 border-gold pl-6 py-2 mt-8 mb-4">
                     "La qualità di un progetto si misura anche nella precisione delle informazioni che lo descrivono."
                  </p>
                  <p className="text-text-main max-w-4xl mx-auto font-light text-base md:text-lg leading-relaxed mb-16">
                     Il Building Information Modeling è il processo con cui gestiamo, coordiniamo e condividiamo le informazioni di un progetto in modo integrato e trasparente. MBA Progetti applica la metodologia BIM nelle fasi di progettazione, rilievo e redazione delle offerte tecniche, garantendo coerenza e controllo lungo tutto il processo.
                  </p>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { 
                     id: '01', 
                     title: 'Modellazione e coordinamento', 
                     desc: 'Sviluppiamo modelli informativi architettonici, strutturali e impiantistici coordinati tra loro. La centralizzazione delle informazioni riduce interferenze, varianti e imprevisti in fase esecutiva.', 
                     img: '/media/portfolio/p08.png' 
                  },
                  { 
                     id: '02', 
                     title: 'BIM per le gare d’appalto', 
                     desc: 'Nelle procedure OEPV il modello BIM supporta la redazione delle offerte con elaborati grafici precisi e documentazione conforme ai livelli informativi richiesti dal disciplinare. La qualità del modello si traduce direttamente in qualità dell\'offerta.', 
                     img: '/media/portfolio/p10_1.webp' 
                  },
                  { 
                     id: '03', 
                     title: 'Scan to BIM', 
                     desc: 'Partendo dalle nuvole di punti acquisite con laser scanner e drone, generiamo modelli BIM dello stato di fatto — incluso l\'HBIM per gli edifici storici — che costituiscono la base per interventi di recupero, restauro e adeguamento.', 
                     img: '/media/blk360_rilievi.webp' 
                  },
                  { 
                     id: '04', 
                     title: 'As-Built BIM', 
                     desc: 'Offriamo il servizio di redazione del modello BIM as-built, aggiornando la documentazione digitale al termine dei lavori per riflettere fedelmente quanto realizzato in cantiere. Il modello restituisce geometrie, materiali, impianti e componenti nelle condizioni effettive di esecuzione, costituendo la base per la gestione, la manutenzione e gli interventi futuri sull\'edificio.', 
                     img: '/media/portfolio/p15_1.webp' 
                  }
               ].map((step, i) => (
                  <motion.div 
                     key={step.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="group flex flex-col bg-navy/[0.02] border border-navy/5 rounded-2xl overflow-hidden hover:border-gold transition-all duration-500"
                  >
                     <div className="aspect-video bg-navy/5 overflow-hidden">
                        <img 
                           src={step.img} 
                           alt={step.title}
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        />
                     </div>
                     <div className="p-6 sm:p-8 text-center border-t border-navy/5">
                        <span className="text-gold text-xs font-mono mb-2 md:mb-4 block opacity-50">{step.id}</span>
                        <h3 className="text-navy text-xl font-bold uppercase tracking-tighter mb-3 md:mb-4">{step.title}</h3>
                        <p className="text-text-main text-[11px] font-light leading-relaxed">
                           {step.desc}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ── VISIONE & FOCUS ── */}
      <section className="relative py-12 md:py-32 overflow-hidden">
         {/* Background Image from Portfolio */}
         <div className="absolute inset-0 z-0">
            <img 
               src="/media/portfolio/p01.jpg" 
               className="w-full h-full object-cover grayscale brightness-[0.2]" 
               alt="Background BIM"
            />
            <div className="absolute inset-0 bg-navy/60" />
         </div>

         <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-12 md:mb-24"
            >
               <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block">Metodo Digitale</span>
               <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Efficienza <br /> Informativa.
               </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
               <FocusCard 
                  icon={Database} 
                  title="Asset Management" 
                  text="I dati del modello al servizio della gestione immobiliare e della manutenzione predittiva." 
               />
               <FocusCard 
                  icon={ChartLineUp} 
                  title="Ottimizzazione" 
                  text="Riduzione dei costi e dei tempi di cantiere attraverso la simulazione e il coordinamento 3D." 
               />
               <FocusCard 
                  icon={Files} 
                  title="Standard IFC" 
                  text="Interoperabilità totale garantita dall'uso di formati aperti e standard internazionali." 
               />
            </div>
         </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 md:py-32 bg-white text-center px-6">
         <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8 md:mb-16">
            Digitalizza la Tua <br /> Commessa.
         </h2>
         <a href="/contatti" className="btn-ghost-dark px-8 py-4 sm:px-20 sm:py-8 inline-flex items-center gap-4 text-sm sm:text-base">
            Parla con un BIM Manager <CaretRight />
         </a>
      </section>

    </div>
  );
}

function FocusCard({ icon: Icon, title, text }: any) {
  return (
    <div className="flex flex-col items-center text-center group">
       <div className="text-gold mb-4 md:mb-8 p-6 border border-gold/20 rounded-full group-hover:bg-gold group-hover:text-navy transition-all duration-500">
          <Icon size={40} weight="thin" />
       </div>
       <h4 className="text-white text-2xl font-bold uppercase tracking-tighter mb-2 md:mb-4 group-hover:text-gold transition-colors">{title}</h4>
       <p className="text-white/40 font-light leading-relaxed max-w-xs">{text}</p>
    </div>
  );
}
