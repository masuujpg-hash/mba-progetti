import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2,
  Compass,
  Layers,
  HardHat,
  Palette,
  ArrowRight
} from 'lucide-react';

export default function Progettazione() {
  const areeProgetto = [
    {
      id: '01',
      title: 'Edilizia e Architettura',
      desc: 'Progettiamo edifici, spazi e interventi di recupero con un approccio tecnico e funzionale. Architettura, struttura ed impianti vengono sviluppati in modo coordinato per il pieno controllo dei costi.',
      icon: Building2
    },
    {
      id: '02',
      title: 'Infrastrutture e Spazi Pubblici',
      desc: 'Progettiamo opere infrastrutturali e spazi pubblici con attenzione alla sostenibilità ambientale ed alla durabilità dei materiali, in coerenza con i Criteri Ambientali Minimi (CAM).',
      icon: Compass
    },
    {
      id: '03',
      title: 'Progetti Post-Aggiudicazione',
      desc: 'Trasformiamo le offerte migliorative in progetti esecutivi coerenti con le proposte di gara, integrando aspetti ambientali, energetici e gestionali.',
      icon: Layers
    },
    {
      id: '04',
      title: 'Direzione Lavori',
      desc: 'Svolta con metodo e conoscenza dei processi costruttivi per garantire il rispetto di tempi, costi e qualità esecutiva in cantiere.',
      icon: HardHat
    },
    {
      id: '05',
      title: 'Interior Design',
      desc: 'Curiamo la progettazione degli interni come naturale estensione del progetto architettonico, unendo funzionalità, comfort e coerenza estetica.',
      icon: Palette
    }
  ];

  const fasiWorkflow = [
    {
      step: '01',
      title: 'Inquadramento & Fattibilità',
      desc: 'Rilievo dello stato di fatto, analisi vincolistica e studi di fattibilità tecnico-economica.'
    },
    {
      step: '02',
      title: 'Coordinamento Disciplinare',
      desc: 'Sviluppo simultaneo di architettura, strutture ed impianti per eliminare le interferenze in cantiere.'
    },
    {
      step: '03',
      title: 'Conformità CAM & Computi',
      desc: 'Redazione della documentazione di sostenibilità (CAM), capitolati prestazionali e computi metrici estimativi.'
    },
    {
      step: '04',
      title: 'Supporto Esecutivo & Cantiere',
      desc: 'Presenza costante in cantiere con la direzione lavori per il rispetto di tempi, costi e qualità.'
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
            alt="Progettazione background"
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
             <span className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-90">Ingegneria & Architettura</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-4">
                Progettazione Integrale.
             </h1>
             <p className="text-white/80 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
                Dal concept iniziale all'esecuzione in cantiere. Sviluppiamo progetti completi, sostenibili e conformi ai requisiti CAM ed OEPV.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── INTRODUZIONE ── */}
      <section className="py-12 md:py-16 px-6 max-w-4xl mx-auto text-center">
         <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] block mb-3">
            Qualità Costruttiva & Rigore Tecnico
         </span>
         <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-4">
            Un Approccio Unificato per Ogni Fase dell'Opera
         </h2>
         <p className="text-navy/80 text-sm md:text-base font-light leading-relaxed">
            MBA Progetti affianca imprese e committenti in tutte le fasi del processo edilizio, dalla redazione del progetto definitivo alla direzione lavori, con un approccio tecnico fondato sulla qualità costruttiva, la sostenibilità ambientale e il rispetto dei Criteri Ambientali Minimi (CAM).
         </p>
      </section>

      {/* ── 5 AREE OPERATIVE ── */}
      <section className="py-12 md:py-20 bg-bg-neutral/40 border-t border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Ambiti Operativi</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Le 5 Aree di Progettazione
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {areeProgetto.map((step) => {
                  const IconComponent = step.icon;
                  return (
                     <div 
                        key={step.id}
                        className="bg-white p-6 border border-navy/10 rounded-sm shadow-xs flex flex-col justify-between space-y-4 hover:border-gold transition-colors"
                     >
                        <div>
                           <div className="flex items-center justify-between mb-4">
                              <span className="text-gold font-mono font-bold text-xs">{step.id}</span>
                              <div className="p-2.5 bg-navy/5 text-gold rounded-sm">
                                 <IconComponent size={20} />
                              </div>
                           </div>
                           <h3 className="text-navy text-base font-bold uppercase tracking-tight mb-2">{step.title}</h3>
                           <p className="text-navy/70 text-xs font-light leading-relaxed">{step.desc}</p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* ── WORKFLOW IN 4 FASI ── */}
      <section className="py-12 md:py-20 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">Processo Progettuale</span>
               <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter">
                  Come Sviluppiamo i Progetti
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {fasiWorkflow.map((item, index) => (
                  <div key={index} className="bg-bg-neutral/60 p-6 border-t-2 border-navy/20 space-y-2">
                     <span className="text-gold font-mono text-2xl font-bold block">{item.step}</span>
                     <h3 className="text-navy text-sm font-bold uppercase tracking-tight">{item.title}</h3>
                     <p className="text-navy/70 text-xs font-light leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── FINAL CTA (SENZA BLOCCO BLU) ── */}
      <section className="py-12 md:py-20 bg-bg-neutral text-navy text-center border-t border-navy/10">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter leading-tight mb-4">
               Hai Bisogno di Supporto per un Progetto Esecutivo?
            </h2>
            <p className="text-navy/70 text-sm font-light mb-8">
               Richiedi una consulenza per la progettazione integrata o post-aggiudicazione della tua opera.
            </p>
            <Link to="/contatti" className="btn-ghost-dark group">
               Richiedi una Consulenza <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
            </Link>
         </div>
      </section>

    </div>
  );
}
