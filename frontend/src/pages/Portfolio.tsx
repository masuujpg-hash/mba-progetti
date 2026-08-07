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
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_3.jpg" 
            alt="Portfolio background"
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-white text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.8em] mb-6 md:mb-8 block opacity-90">Progetti Selezionati</span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] uppercase tracking-tighter mb-6 md:mb-8">
               Archivio <br /> Opere.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO & STATS ── */}
      <section className="pt-12 md:pt-24 pb-6 md:pb-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Introductory Text */}
          <div className="lg:col-span-7">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.6em] mb-4 block">MBA Progetti</span>
            <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6">
              Esperienza e <br />Risultati sul Campo.
            </h2>
            <p className="text-navy/70 font-light leading-relaxed text-sm md:text-base">
              Dal 2019, MBA Progetti ha affiancato imprese di costruzione in oltre 200 procedure di gara su tutto il territorio nazionale. I progetti qui raccolti rappresentano alcune delle aggiudicazioni e dei piazzamenti più significativi in diversi settori dell'edilizia e delle opere pubbliche. Ogni scheda tecnica riporta stazione appaltante, importo a base di gara e posizione ottenuta in graduatoria.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-8">
            <div className="border-l border-gold/30 pl-6">
              <div className="text-navy text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-1">+200</div>
              <div className="text-navy/40 text-[10px] font-bold uppercase tracking-[0.2em]">Gare Redatte</div>
            </div>
            <div className="border-l border-gold/30 pl-6">
              <div className="text-navy text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-1">63%</div>
              <div className="text-navy/40 text-[10px] font-bold uppercase tracking-[0.2em]">Gare Sul Podio</div>
            </div>
            <div className="border-l border-gold/30 pl-6">
              <div className="text-navy text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-1">38%</div>
              <div className="text-navy/40 text-[10px] font-bold uppercase tracking-[0.2em]">Gare Aggiudicate</div>
            </div>
            <div className="border-l border-gold/30 pl-6">
              <div className="text-navy text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-1">+40</div>
              <div className="text-navy/40 text-[10px] font-bold uppercase tracking-[0.2em]">Imprese Clienti</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID PROGETTI ── */}
      <section className="pt-6 md:pt-12 pb-12 md:pb-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
               <ProjectGridItem key={p.id} project={p} />
            ))}
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
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         className="group relative aspect-[4/5] overflow-hidden bg-white cursor-pointer shadow-sm hover:shadow-xl transition-all border border-navy/10 rounded-sm"
      >
         <img 
           src={project.image} 
           loading="lazy"
           className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0" 
           alt={project.title} 
         />

         {/* Badge solo se 1° o 2° classificato */}
         {isTopRank && (
            <div className={`absolute top-6 left-6 ${isSecond ? 'bg-slate-600' : 'bg-gold'} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 z-10 shadow-md rounded-sm`}>
               {project.rank}
            </div>
         )}

         <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-transparent opacity-85 group-hover:opacity-100 transition-opacity p-6 md:p-8 flex flex-col justify-end">
            <h4 className="text-white text-lg sm:text-xl font-bold uppercase tracking-tight mb-2 line-clamp-2">{project.title}</h4>
            <div className="flex items-center gap-2 text-white/70 text-[11px] font-bold uppercase tracking-[0.2em]">
               <MapPin size={14} className="text-gold shrink-0" /> {project.location}
            </div>
         </div>
         <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity bg-navy/60 backdrop-blur-sm rounded-sm">
            <ArrowRight size={16} />
         </div>
      </motion.div>
    </Link>
  );
}
