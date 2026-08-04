import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Buildings, 
  Scan, 
  Cube,
  ArrowRight
} from '@phosphor-icons/react';

export default function Servizi() {
  const services = [
    {
      id: "gare",
      title: "Gare d'appalto",
      icon: Target,
      desc: "Redazione di offerte tecniche migliorative per procedure OEPV. Dall'analisi del disciplinare alla consegna dell'offerta.",
      features: ["Offerte Tecniche", "Relazioni Metodologiche", "Punteggi Premiali"]
    },
    {
      id: "progettazione",
      title: "Progettazione",
      icon: Buildings,
      desc: "Progettazione architettonica, esecutiva e post-aggiudicazione. Dalla gara alla realizzazione.",
      features: ["Civile & Industriale", "Infrastrutture", "Restauro"]
    },
    {
      id: "rilievi",
      title: "Rilievi",
      icon: Scan,
      desc: "Rilievo integrato con laser scanner 3D, drone e GPS. Documentazione as-built per progettazione e recupero.",
      features: ["Laser Scanner 3D", "Rilievo con Drone", "GPS Topografico"]
    },
    {
      id: "bim",
      title: "BIM",
      icon: Cube,
      desc: "Modellazione informativa, coordinamento disciplinare e Scan to BIM. Qualità e precisione in ogni fase.",
      features: ["Modellazione 3D", "Scan to BIM", "As-Built BIM"]
    }
  ];

  return (
    <div className="bg-white selection:bg-navy selection:text-white">
      
      {/* ── SERVIZI HERO ── */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Services background"
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-white" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] md:tracking-[0.8em] mb-8 block">Soluzioni Professionali</span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter mb-8">
              I Nostri <br /> <span className="text-stroke-white">Servizi.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES INTRO ── */}
      <section className="pt-16 md:pt-32 px-6 max-w-4xl mx-auto text-center">
         <p className="text-navy text-lg md:text-xl font-light leading-relaxed">
            Le competenze di MBA Progetti si articolano in quattro ambiti che si integrano e si completano. Al centro c'è l'attività per cui lo studio è nato: la redazione di offerte tecniche migliorative per gare d'appalto pubbliche. Intorno a essa si sviluppano la progettazione, i rilievi e il BIM — strumenti che rafforzano la qualità del lavoro e ampliano il supporto che offriamo ai nostri clienti.
         </p>
         <div className="w-12 h-px bg-gold mx-auto mt-8" />
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="py-12 md:pb-32 md:pt-16 px-6 max-w-7xl mx-auto">
         <div className="space-y-16 md:space-y-32">
            {services.map((s, i) => (
               <motion.div 
                 key={s.id}
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
               >
                  <div className={`lg:col-span-5 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                     <div className="flex items-center gap-6 mb-6 md:mb-8">
                        <div className="p-4 border border-gold text-gold">
                           <s.icon size={32} weight="thin" />
                        </div>
                        <span className="text-gold text-sm font-mono font-bold">0{i+1}</span>
                     </div>
                     <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6 md:mb-8">{s.title}</h2>
                     <p className="text-text-main text-lg font-light leading-relaxed mb-12">{s.desc}</p>
                     
                     <ul className="space-y-4 mb-16">
                        {s.features.map((f, j) => (
                           <li key={j} className="flex items-center gap-4 text-navy text-[12px] font-bold uppercase tracking-[0.2em]">
                              <div className="w-6 h-px bg-gold" /> {f}
                           </li>
                        ))}
                     </ul>

                     <Link to={`/servizi/${s.id}`} className="btn-ghost-dark px-12 py-5 group">
                        Dettagli Servizio <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>

                  <div className="lg:col-span-7">
                     <div className="relative aspect-[16/10] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                        <img 
                           src={`https://images.unsplash.com/photo-${i === 0 ? '1460925895917-afdab827c52f' : i === 1 ? '1503387762-592dea58ef23' : i === 2 ? '1581094794329-c8112a89af12' : '1518005020481-a78a8b255050'}?q=80&w=2000&auto=format&fit=crop`} 
                           alt={s.title}
                           className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                        />
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 md:py-32 bg-bg-neutral text-center px-6">
         <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-8 md:mb-16">
            Soluzioni su <br /> Misura.
         </h2>
         <Link to="/contatti" className="btn-ghost-dark px-8 md:px-20 py-4 md:py-8">
            Richiedi una Consulenza
         </Link>
      </section>

    </div>
  );
}
