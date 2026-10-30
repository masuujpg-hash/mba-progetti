import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin
} from '@phosphor-icons/react';
import { projects, type Project } from '../data/projects';

export default function Portfolio() {
  return (
    <div className="bg-white selection:bg-navy selection:text-white overflow-x-hidden">
      
      {/* ── PORTFOLIO HERO CON SFUMATURA ORIGINALE ── */}
      <section className="relative h-[55vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_3.jpg" 
            alt="Portfolio background"
            className="w-full h-full object-cover grayscale opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white text-xs font-bold uppercase tracking-[0.4em] mb-4 block opacity-90">Progetti Selezionati</span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
               Archivio Opere.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO & STATS EQUILIBRATE ── */}
      <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto border-b border-navy/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-2 block">MBA Progetti</span>
            <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter leading-tight mb-4">
              Esperienza & Risultati sul Campo
            </h2>
            <p className="text-navy/70 font-light leading-relaxed text-xs sm:text-sm">
              Dal 2019, MBA Progetti ha affiancato imprese di costruzione in oltre 200 procedure di gara su tutto il territorio nazionale. Ogni scheda tecnica riporta stazione appaltante, importo a base di gara e posizione ottenuta in graduatoria.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="border-l border-gold/40 pl-4">
              <div className="text-navy text-2xl md:text-3xl font-bold tracking-tighter mb-0.5">+200</div>
              <div className="text-gold text-[10px] font-bold uppercase tracking-wider">Gare Redatte</div>
            </div>
            <div className="border-l border-gold/40 pl-4">
              <div className="text-navy text-2xl md:text-3xl font-bold tracking-tighter mb-0.5">63%</div>
              <div className="text-gold text-[10px] font-bold uppercase tracking-wider">Sul Podio</div>
            </div>
            <div className="border-l border-gold/40 pl-4">
              <div className="text-navy text-2xl md:text-3xl font-bold tracking-tighter mb-0.5">38%</div>
              <div className="text-gold text-[10px] font-bold uppercase tracking-wider">Aggiudicate</div>
            </div>
            <div className="border-l border-gold/40 pl-4">
              <div className="text-navy text-2xl md:text-3xl font-bold tracking-tighter mb-0.5">+40</div>
              <div className="text-gold text-[10px] font-bold uppercase tracking-wider">Imprese Clienti</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID PROGETTI EQUILIBRATA ── */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
               <ProjectGridItem key={p.id} project={p} />
            ))}
         </div>
      </section>

      {/* ── FINAL CTA (SENZA BLOCCO BLU) ── */}
      <section className="py-12 md:py-20 bg-bg-neutral text-navy text-center border-t border-navy/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-navy text-2xl sm:text-3xl font-bold uppercase tracking-tighter leading-tight mb-4">
             Vuoi Presentare un'Offerta Migliorativa Vincente?
          </h2>
          <p className="text-navy/70 text-sm font-light mb-8">
             Richiedi uno studio di fattibilità tecnica per la tua prossima gara OEPV.
          </p>
          <Link to="/contatti" className="btn-ghost-dark group">
             Richiedi una Consulenza <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform inline-block" />
          </Link>
        </div>
      </section>

    </div>
  );
}

function ProjectGridItem({ project }: { project: Project }) {
  const isTopRank = project.rank && (
    project.rank.includes('1') || 
    project.rank.includes('2') || 
    project.rank.toLowerCase().includes('primo') || 
    project.rank.toLowerCase().includes('secondo')
  );

  const isSecond = project.rank?.includes('2') || project.rank?.toLowerCase().includes('secondo');

  return (
    <Link to={`/portfolio/${project.id}`}>
      <div className="group relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-neutral-100 cursor-pointer shadow-xs hover:shadow-md transition-all border border-navy/10 rounded-sm">
         {/* FOTO NATURALE SENZA VETRO BLU */}
         <img 
           src={project.image} 
           loading="lazy"
           className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" 
           alt={project.title} 
         />

         {/* Badge solo se 1° o 2° classificato */}
         {isTopRank && (
            <div className={`absolute top-4 left-4 ${isSecond ? 'bg-navy' : 'bg-gold'} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10 shadow-sm rounded-sm`}>
               {project.rank}
            </div>
         )}

         {/* Gradiente scuro naturale solo in basso per leggibilità testo */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
            <h3 className="text-white text-base sm:text-lg font-bold uppercase tracking-tight mb-1 group-hover:text-gold transition-colors line-clamp-2">{project.title}</h3>
            <div className="flex items-center gap-1.5 text-white/80 text-[10px] font-bold uppercase tracking-wider">
               <MapPin size={12} className="text-gold shrink-0" /> {project.location}
            </div>
         </div>
      </div>
    </Link>
  );
}
