import { motion } from 'framer-motion';
import { 
  Scan,
  Drone,
  Cube,
  CaretRight
} from '@phosphor-icons/react';

export default function Rilievi() {
  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── HERO ── */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/team_rilievi.jpg" 
            className="w-full h-full object-cover grayscale opacity-20" 
            alt="Rilievi Digitali"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-white" />
        </div>
        <div className="relative z-10 text-center px-6">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5 }}
           >
             <span className="text-gold text-xs font-bold uppercase tracking-[0.8em] mb-6 md:mb-8 block">Tecnologie Avanzate</span>
             <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter">
                Rilievi <br /> <span className="text-stroke-white">Digitali.</span>
             </h1>
           </motion.div>
        </div>
      </section>

      {/* ── WORKFLOW OPERATIVO (LE TECNOLOGIE) ── */}
      <section className="py-12 md:py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 md:mb-32">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                  <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block">Strumentazione d'Avanguardia</span>
                  <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                     Dal Dato <br /> Al Modello.
                  </h2>
                  <p className="text-navy text-xl md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed border-l-4 border-gold pl-6 py-2 mt-8 mb-4">
                     "Documentare con precisione è il primo passo per intervenire con qualità."
                  </p>
                  <p className="text-text-main max-w-4xl mx-auto font-light text-base md:text-lg leading-relaxed mb-16">
                     Rileviamo edifici, infrastrutture e spazi con tecnologie di precisione, restituendo una documentazione completa e affidabile dello stato di fatto. I dati acquisiti costituiscono la base per progettazione, recupero, modellazione BIM e monitoraggio strutturale.
                  </p>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { 
                     id: '01', 
                     title: 'Drone DJI Mavic 3 Enterprise', 
                     desc: 'Rilievi aerofotogrammetrici ad alta risoluzione. Immagini georeferenziate di edifici, facciate e territori complessi con precisione centimetrica.', 
                     img: '/media/drone_rilievi.png' 
                  },
                  { 
                     id: '02', 
                     title: 'Leica BLK360', 
                     desc: 'Nuvole di punti millimetriche dello stato di fatto. Ideale per edifici storici, strutture complesse e spazi articolati.', 
                     img: '/media/laser_rilievi.png' 
                  },
                  { 
                     id: '03', 
                     title: 'GPS ProTRACK', 
                     desc: 'Rilievi topografici georeferenziati con precisione centimetrica. Tracciamenti planimetrici e altimetrici affidabili.', 
                     img: '/media/vt08f_rilievi.webp' 
                  },
                  { 
                     id: '04', 
                     title: 'Georadar (GPR)', 
                     desc: 'Indagini nel sottosuolo per mappare cavidotti, strutture interrate e elementi nascosti non rilevabili otticamente.', 
                     img: '/media/blk360_rilievi.webp' 
                  }
               ].map((device, i) => (
                  <motion.div 
                     key={device.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="group flex flex-col bg-navy/[0.02] border border-navy/5 rounded-2xl overflow-hidden hover:border-gold transition-all duration-500"
                  >
                     <div className="aspect-square bg-white p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                        <img 
                           src={device.img} 
                           alt={device.title}
                           className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                        />
                     </div>
                     <div className="p-6 sm:p-8 text-center border-t border-navy/5">
                        <span className="text-gold text-xs font-mono mb-2 md:mb-4 block opacity-50">{device.id}</span>
                        <h3 className="text-navy text-xl font-bold uppercase tracking-tighter mb-3 md:mb-4">{device.title}</h3>
                        <p className="text-text-main text-xs font-light leading-relaxed">
                           {device.desc}
                        </p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ── COSA RILEVIAMO ── */}
      <section className="py-16 md:py-24 bg-bg-neutral border-y border-navy/5">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Ambiti di Rilievo</span>
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-12">
               Cosa Rileviamo.
            </h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
               {[
                  "Edifici storici e civili", "Infrastrutture", "Spazi pubblici", 
                  "Strutture industriali", "Aree non accessibili", "Rilievi strutturali"
               ].map((tag, idx) => (
                  <span key={idx} className="bg-white text-navy border border-navy/5 px-6 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm">
                     {tag}
                  </span>
               ))}
            </div>
         </div>
      </section>

      {/* ── VISIONE & FOCUS ── */}
      <section className="relative py-12 md:py-32 overflow-hidden">
         {/* Background Image from Portfolio */}
         <div className="absolute inset-0 z-0">
            <img 
               src="/media/portfolio/p03.webp" 
               className="w-full h-full object-cover grayscale brightness-[0.2]" 
               alt="Background Precisione"
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
               <span className="text-gold text-[10px] font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block">Il Nostro Standard</span>
               <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1]">
                  Precisione <br /> Millimetrica.
               </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
               <FocusCard 
                  icon={Scan} 
                  title="Laser Scanner" 
                  text="Digitalizzazione rapida di volumi complessi con nuvole di punti millimetriche." 
               />
               <FocusCard 
                  icon={Drone} 
                  title="Aerofotogrammetria" 
                  text="Rilievi ad alta quota per grandi superfici e modelli digitali del terreno (DTM)." 
               />
               <FocusCard 
                  icon={Cube} 
                  title="Scan-to-BIM" 
                  text="Integrazione diretta nel workflow informativo per modelli as-built affidabili." 
               />
            </div>
         </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 md:py-32 bg-white text-center px-6">
         <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8 md:mb-16">
            Digitalizza il Tuo <br /> Sito.
         </h2>
         <a href="/contatti" className="btn-ghost-dark px-8 py-4 sm:px-20 sm:py-8 inline-flex items-center gap-4 text-sm sm:text-base">
            Richiedi un Rilievo <CaretRight />
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
