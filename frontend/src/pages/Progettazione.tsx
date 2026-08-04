import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Buildings,
  Compass,
  TreeStructure,
  CaretRight
} from '@phosphor-icons/react';

export default function Progettazione() {
  const [currentEdiliziaSlide, setCurrentEdiliziaSlide] = useState(0);
  const ediliziaImages = ['/media/portfolio/p12.jpg', '/media/portfolio/p01.jpg', '/media/portfolio/p15.webp'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEdiliziaSlide((prev) => (prev + 1) % ediliziaImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="relative z-10 text-center px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-8 block">Ingegneria & Architettura</span>
             <h1 className="text-navy text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter">
                Progettazione <br /> Integrale.
             </h1>
           </motion.div>
        </div>
      </section>

      {/* ── WORKFLOW OPERATIVO (AMBITI) ── */}
      <section className="py-12 md:py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-32">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Metodologia Operativa</span>
                  <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                     Dall'Idea <br /> Al Cantiere.
                  </h2>
                  <p className="text-text-main mt-8 max-w-4xl mx-auto font-light text-lg leading-relaxed mb-16">
                     MBA Progetti affianca imprese e committenti in tutte le fasi del processo edilizio, dalla redazione del progetto definitivo alla direzione lavori, con un approccio tecnico fondato sulla qualità costruttiva, la sostenibilità ambientale e il rispetto dei Criteri Ambientali Minimi (CAM).
                  </p>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
               {[
                  { 
                     id: '01', 
                     title: 'Edilizia e Architettura', 
                     desc: 'Progettiamo edifici, spazi e interventi di recupero con un approccio tecnico e funzionale, attento al contesto e alla qualità costruttiva. Architettura, struttura e impianti vengono sviluppati in modo coordinato, garantendo efficienza esecutiva e controllo dei costi.', 
                     img: '/media/portfolio/p12.jpg' 
                  },
                  { 
                     id: '02', 
                     title: 'Infrastrutture e Spazi Pubblici', 
                     desc: 'Progettiamo opere infrastrutturali e spazi pubblici con particolare attenzione alla sostenibilità ambientale e alla durabilità dei materiali, in coerenza con i CAM e le linee guida di efficienza energetica e accessibilità.', 
                     img: '/media/portfolio/p02.webp' 
                  },
                  { 
                     id: '03', 
                     title: 'Post-aggiudicazione', 
                     desc: 'Trasformiamo le offerte migliorative in progetti esecutivi coerenti con le proposte di gara. La conoscenza dei criteri OEPV e dei CAM consente di integrare aspetti ambientali, energetici e gestionali in tutte le fasi progettuali.', 
                     img: '/media/portfolio/p08.png' 
                  },
                  { 
                     id: '04', 
                     title: 'Direzione Lavori', 
                     desc: 'La direzione lavori è svolta con metodo e conoscenza dei processi costruttivi, per garantire il rispetto di tempi, costi e qualità esecutiva. Il dialogo costante tra committente, impresa e uffici tecnici assicura che ogni scelta progettuale venga correttamente attuata in cantiere.', 
                     img: '/media/portfolio/p15.webp' 
                  },
                  { 
                     id: '05', 
                     title: 'Interior Design', 
                     desc: 'Curiamo la progettazione degli interni come naturale estensione del progetto architettonico, unendo funzionalità, comfort e coerenza estetica. Gli spazi vengono studiati nel dettaglio — materiali, arredi, illuminazione e finiture — per creare ambienti armonici, efficienti e durevoli.', 
                     img: '/media/portfolio/p07.webp' 
                  }
               ].map((step, i) => (
                  <motion.div 
                     key={step.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="group flex flex-col"
                  >
                     <div className="aspect-[4/3] bg-navy/5 rounded-2xl overflow-hidden mb-8 relative">
                        {step.id === '01' ? (
                           <div className="w-full h-full relative group-hover:scale-105 transition-all duration-700">
                              {ediliziaImages.map((imgUrl, sIdx) => (
                                 <img 
                                    key={sIdx}
                                    src={imgUrl} 
                                    alt={step.title}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentEdiliziaSlide === sIdx ? 'opacity-100' : 'opacity-0'}`}
                                 />
                              ))}
                              {/* Slide indicators (dots) */}
                              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                                 {ediliziaImages.map((_, dotIdx) => (
                                    <button 
                                       key={dotIdx}
                                       onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentEdiliziaSlide(dotIdx); }}
                                       className={`w-2.5 h-2.5 rounded-full transition-all ${currentEdiliziaSlide === dotIdx ? 'bg-gold w-5' : 'bg-white/60 hover:bg-white'}`}
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
                     <div className="text-center px-4">
                        <span className="text-gold text-xs font-mono mb-2 block opacity-50">{step.id}</span>
                        <h3 className="text-navy text-xl font-bold uppercase tracking-tighter mb-4">{step.title}</h3>
                        <p className="text-text-main text-xs font-light leading-relaxed max-w-xs mx-auto">
                           {step.desc}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ── VISIONE & FOCUS ── */}
      <section className="relative py-16 md:py-40 lg:py-60 overflow-hidden">
         {/* Background Image from Portfolio */}
         <div className="absolute inset-0 z-0">
            <img 
               src="/media/portfolio/p12.jpg" 
               className="w-full h-full object-cover grayscale brightness-[0.2]" 
               alt="Background Visione"
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
               <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Il Nostro Approccio</span>
               <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Visione <br /> Sostenibile.
               </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <FocusCard 
                  icon={Buildings} 
                  title="Architettura" 
                  text="Spazi funzionali con una forte identità estetica e rigore tecnico." 
               />
               <FocusCard 
                  icon={Compass} 
                  title="Urbanistica" 
                  text="Inquadramento territoriale e strategie di rigenerazione urbana sostenibile." 
               />
               <FocusCard 
                  icon={TreeStructure} 
                  title="Strutture" 
                  text="Soluzioni statiche innovative, sicure e integrate nel processo BIM." 
               />
            </div>
         </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-32 bg-white text-center px-6">
         <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8 md:mb-16">
            Inizia il Tuo <br /> Progetto.
         </h2>
         <a href="/contatti" className="btn-ghost-dark px-8 md:px-20 py-4 md:py-8 inline-flex items-center gap-4">
            Parla con un Architetto <CaretRight />
         </a>
      </section>

    </div>
  );
}

function FocusCard({ icon: Icon, title, text }: any) {
  return (
    <div className="flex flex-col items-center text-center group">
       <div className="text-gold mb-8 p-6 border border-gold/20 rounded-full group-hover:bg-gold group-hover:text-navy transition-all duration-500">
          <Icon size={40} weight="thin" />
       </div>
       <h4 className="text-white text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-gold transition-colors">{title}</h4>
       <p className="text-white/40 font-light leading-relaxed max-w-xs">{text}</p>
    </div>
  );
}
