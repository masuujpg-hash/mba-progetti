import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2,
  Compass,
  Layers,
  HardHat,
  Palette,
  Leaf,
  ShieldCheck,
  ChevronRight,
  Scale
} from 'lucide-react';

export default function Progettazione() {
  const [currentEdiliziaSlide, setCurrentEdiliziaSlide] = useState(0);
  const ediliziaImages = ['/media/portfolio/p12.jpg', '/media/portfolio/p01.jpg', '/media/portfolio/p15.webp'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEdiliziaSlide((prev) => (prev + 1) % ediliziaImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [ediliziaImages.length]);

  const areeProgetto = [
    {
      id: '01',
      title: 'Edilizia e Architettura',
      desc: 'Progettiamo edifici, spazi e interventi di recupero con un approccio tecnico e funzionale, attento al contesto e alla qualità costruttiva. Architettura, struttura e impianti vengono sviluppati in modo coordinato, garantendo efficienza esecutiva e controllo dei costi.',
      icon: Building2,
      isCarousel: true,
      images: ediliziaImages
    },
    {
      id: '02',
      title: 'Infrastrutture e Spazi Pubblici',
      desc: 'Progettiamo opere infrastrutturali e spazi pubblici con particolare attenzione alla sostenibilità ambientale e alla durabilità dei materiali, in coerenza con i CAM (Criteri Ambientali Minimi) e le linee guida di efficienza energetica e accessibilità.',
      icon: Compass,
      img: '/media/portfolio/p02.webp'
    },
    {
      id: '03',
      title: 'Progetti Post-Aggiudicazione',
      desc: 'Trasformiamo le offerte migliorative in progetti esecutivi coerenti con le proposte di gara. La conoscenza dei criteri OEPV e dei CAM consente di integrare aspetti ambientali, energetici e gestionali in tutte le fasi progettuali.',
      icon: Layers,
      img: '/media/portfolio/p08.png'
    },
    {
      id: '04',
      title: 'Direzione Lavori',
      desc: 'La direzione lavori è svolta con metodo e conoscenza dei processi costruttivi, per garantire il rispetto di tempi, costi e qualità esecutiva. Il dialogo costante tra committente, impresa e uffici tecnici assicura che ogni scelta progettuale venga correttamente attuata in cantiere.',
      icon: HardHat,
      img: '/media/portfolio/p15.webp'
    },
    {
      id: '05',
      title: 'Interior Design',
      desc: 'Curiamo la progettazione degli interni come naturale estensione del progetto architettonico, unendo funzionalità, comfort e coerenza estetica. Gli spazi vengono studiati nel dettaglio — materiali, arredi, illuminazione e finiture — per creare ambienti armonici, efficienti e durevoli.',
      icon: Palette,
      img: '/media/portfolio/p07.webp'
    }
  ];

  const fasiWorkflow = [
    {
      step: '01',
      title: 'Inquadramento & Fattibilità',
      desc: 'Rilievo dello stato di fatto, analisi vincolistica e studi di fattibilità tecnico-economica per definire le linee guida di progetto.'
    },
    {
      step: '02',
      title: 'Coordinamento Disciplinare',
      desc: 'Sviluppo simultaneo di architettura, strutture e impianti per eliminare le interferenze prima della fase di cantiere.'
    },
    {
      step: '03',
      title: 'Conformità CAM & Computi',
      desc: 'Redazione della documentazione di sostenibilità (CAM), capitolati prestazionali e computi metrici estimativi di dettaglio.'
    },
    {
      step: '04',
      title: 'Supporto Esecutivo & Cantiere',
      desc: 'Presenza costante in cantiere con la direzione lavori per il rispetto di tempi, costi e corretta attuazione delle scelte progettuali.'
    }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO ── */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-bg-neutral">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_3.jpg" 
            className="w-full h-full object-cover grayscale opacity-18" 
            alt="Progettazione background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-8 block">Ingegneria & Architettura</span>
             <h1 className="text-navy text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] uppercase tracking-tighter mb-6">
                Progettazione <br className="sm:hidden" /> Integrale.
             </h1>
             <p className="text-navy/70 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                Dalla visione al cantiere. Soluzioni tecniche attente al contesto, alla qualità costruttiva e alla sostenibilità ambientale.
             </p>
           </motion.div>
        </div>
      </section>

      {/* ── INTRO & APPROCCIO ── */}
      <section className="pt-16 md:pt-32 px-6 max-w-7xl mx-auto">
         <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] block">
               Qualità Costruttiva & Rigore Tecnico
            </span>
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight">
               Un Approccio Unificato per Ogni Fase dell'Opera
            </h2>
            <p className="text-text-main text-base md:text-lg font-light leading-relaxed">
               MBA Progetti affianca imprese e committenti in tutte le fasi del processo edilizio, dalla redazione del progetto definitivo alla direzione lavori, con un approccio tecnico fondato sulla qualità costruttiva, la sostenibilità ambientale e il rispetto dei Criteri Ambientali Minimi (CAM).
            </p>
            <p className="text-text-main text-sm md:text-base font-light leading-relaxed">
               Architettura, struttura e impianti vengono sviluppati in modo coordinato, garantendo efficienza esecutiva, controllo rigoroso dei costi e riduzione degli imprevisti in cantiere. La nostra esperienza abbraccia l'edilizia civile e pubblica, le infrastrutture, il recupero architettonico e il post-aggiudicazione.
            </p>
            <div className="w-16 h-px bg-gold mx-auto pt-4" />
         </div>
      </section>

      {/* ── LE 5 AREE OPERATIVE DELLO STUDIO ── */}
      <section className="py-16 md:py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Ambiti Operativi</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Soluzioni Su Misura <br /> per Ogni Tipo di Intervento.
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
               {areeProgetto.map((step, i) => {
                  const IconComponent = step.icon;
                  return (
                     <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="group flex flex-col bg-bg-neutral p-6 rounded-sm border border-navy/5 hover:border-gold/50 transition-all shadow-sm hover:shadow-md"
                     >
                        <div className="aspect-[4/3] bg-navy/5 rounded-sm overflow-hidden mb-6 relative">
                           {step.isCarousel ? (
                              <div className="w-full h-full relative group-hover:scale-105 transition-all duration-700">
                                 {step.images?.map((imgUrl, sIdx) => (
                                    <img 
                                       key={sIdx}
                                       src={imgUrl} 
                                       alt={step.title}
                                       className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentEdiliziaSlide === sIdx ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                 ))}
                                 <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-2 z-10">
                                    {step.images?.map((_, dotIdx) => (
                                       <button 
                                          key={dotIdx}
                                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentEdiliziaSlide(dotIdx); }}
                                          className={`h-2.5 rounded-full transition-all cursor-pointer ${currentEdiliziaSlide === dotIdx ? 'bg-gold w-6' : 'bg-white/70 hover:bg-white w-2.5'}`}
                                          aria-label={`Slide ${dotIdx + 1}`}
                                       />
                                    ))}
                                 </div>
                              </div>
                           ) : (
                              <img 
                                 src={step.img} 
                                 alt={step.title}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                              />
                           )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                           <div>
                              <div className="flex items-center justify-between mb-4">
                                 <span className="text-gold text-xs font-mono font-bold">{step.id}</span>
                                 <div className="p-2 bg-white text-navy border border-navy/10 rounded-sm group-hover:bg-gold group-hover:border-gold transition-colors">
                                    <IconComponent size={18} />
                                 </div>
                              </div>
                              <h3 className="text-navy text-xl font-bold uppercase tracking-tight mb-3 group-hover:text-gold transition-colors">{step.title}</h3>
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

      {/* ── FOCUS SOSTENIBILITÀ & CAM ── */}
      <section className="py-16 md:py-32 bg-bg-neutral border-y border-navy/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Sostenibilità & CAM</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Progettare con i Criteri Ambientali Minimi.
               </h2>
               <p className="text-text-main text-sm font-light max-w-2xl mx-auto mt-4 leading-relaxed">
                  MBA Progetti integra i principi della sostenibilità energetica ed ambientale in tutte le componenti del progetto, garantendo la totale aderenza alle norme vigenti per le opere pubbliche.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 border border-navy/5 rounded-sm shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="p-3 bg-navy/5 text-gold w-fit rounded-sm mb-4">
                     <Leaf size={28} />
                  </div>
                  <h3 className="text-navy text-lg font-bold uppercase tracking-tight">Materiali & Ciclo di Vita (LCA)</h3>
                  <p className="text-text-main text-xs font-light leading-relaxed">
                     Selezione di materiali riciclabili, privi di sostanze nocive e provvisti di certificazioni ambientali di prodotto (EPD), calcolando l'impatto sul ciclo di vita dell'edificio.
                  </p>
               </div>

               <div className="bg-white p-8 border border-navy/5 rounded-sm shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="p-3 bg-navy/5 text-gold w-fit rounded-sm mb-4">
                     <ShieldCheck size={28} />
                  </div>
                  <h3 className="text-navy text-lg font-bold uppercase tracking-tight">Efficienza Energetica Passiva</h3>
                  <p className="text-text-main text-xs font-light leading-relaxed">
                     Integrazione di sistemi di isolamento termico ad altissime prestazioni, schermature solari, illuminazione naturale ottimizzata e impianti a fonti rinnovabili ad elevata resa.
                  </p>
               </div>

               <div className="bg-white p-8 border border-navy/5 rounded-sm shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="p-3 bg-navy/5 text-gold w-fit rounded-sm mb-4">
                     <Scale size={28} />
                  </div>
                  <h3 className="text-navy text-lg font-bold uppercase tracking-tight">Conformità Normativa D.Lgs. 36/2023</h3>
                  <p className="text-text-main text-xs font-light leading-relaxed">
                     Relazioni tecniche e capitolati prestazionali strutturati per soddisfare rigorosamente i requisiti ambientali vincolanti per le stazioni appaltanti e le stime di costo.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ── WORKFLOW PROGETTUALE (4 FASI) ── */}
      <section className="py-16 md:py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Metodologia di Lavoro</span>
               <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Le 4 Fasi del Processo Progettuale.
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {fasiWorkflow.map((item, index) => (
                  <div key={index} className="border-t-2 border-navy/10 pt-6 hover:border-gold transition-colors space-y-3">
                     <span className="text-gold font-mono text-3xl font-bold block">{item.step}</span>
                     <h3 className="text-navy text-base font-bold uppercase tracking-tight">{item.title}</h3>
                     <p className="text-text-main text-xs font-light leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* ── SHOWCASE VISIVO PROGETTI ── */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-navy text-white">
         <div className="absolute inset-0 z-0">
            <img 
               src="/media/portfolio/p12.jpg" 
               className="w-full h-full object-cover grayscale brightness-[0.25]" 
               alt="Background Visione"
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
               <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Il Nostro Approccio</span>
               <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Rigore Tecnico & Sviluppo Sostenibile.
               </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Building2 size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Architettura</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Spazi funzionali con una forte identità estetica, attenzione alla luce naturale e rigore costruttivo.
                  </p>
               </div>

               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Compass size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Urbanistica & Spazi</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Inquadramento territoriale, accessibilità e strategie per la rigenerazione degli spazi pubblici.
                  </p>
               </div>

               <div className="p-8 border border-white/10 rounded-sm bg-navy/40 backdrop-blur-sm space-y-4 hover:border-gold/50 transition-colors">
                  <div className="text-gold mb-2 flex justify-center">
                     <Layers size={36} />
                  </div>
                  <h3 className="text-white text-xl font-bold uppercase tracking-tight">Strutture & Impianti</h3>
                  <p className="text-white/60 text-xs font-light leading-relaxed">
                     Soluzioni statiche ed impiantistiche integrate per la massima sicurezza ed efficienza dell'edificio.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="py-16 md:py-32 bg-white text-center px-6">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
               Inizia il Tuo <br /> Progetto.
            </h2>
            <p className="text-text-main text-sm md:text-base font-light mb-12">
               Parla con il nostro team di architetti e ingegneri per definire la strategia progettuale e la direzione dei lavori del tuo intervento.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/contatti" className="btn-ghost-dark px-8 md:px-12 py-4 md:py-6 inline-flex items-center gap-3 w-full sm:w-auto justify-center">
                  Parla con un Architetto <ChevronRight size={18} />
               </Link>
               <Link to="/portfolio" className="border border-navy/20 hover:border-navy text-navy font-bold uppercase tracking-wider text-xs px-8 md:px-12 py-4 md:py-6 rounded-sm transition-all w-full sm:w-auto text-center">
                  Scopri i Nostri Lavori
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}

