import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin
} from '@phosphor-icons/react';
import { type Project } from '../data/projects';
import { getStoredProjects } from '../lib/contentStore';

export default function Portfolio() {
  const [projectList, setProjectList] = useState<Project[]>(getStoredProjects);

  useEffect(() => {
    const handleUpdate = () => {
      setProjectList(getStoredProjects());
    };
    window.addEventListener('mba_projects_updated', handleUpdate);
    return () => window.removeEventListener('mba_projects_updated', handleUpdate);
  }, []);

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

      {/* ── GRID PROGETTI EQUILIBRATA ── */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList.map((p) => (
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
      <div className="group relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-neutral-100 cursor-pointer shadow-xs hover:shadow-md transition-all border border-navy/10 rounded-[1px]">
         {/* FOTO NATURALE SENZA VETRO BLU */}
         <img 
           src={project.image} 
           loading="lazy"
           className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" 
           alt={project.title} 
         />

         {/* Badge solo se 1° o 2° classificato */}
         {isTopRank && (
            <div className={`absolute top-4 left-4 ${isSecond ? 'bg-navy' : 'bg-[#F5C400]'} text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 z-10 shadow-sm rounded-[1px]`}>
               {project.rank}
            </div>
         )}

         {/* Gradiente scuro naturale solo in basso per leggibilità testo */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
            <h3 className="text-white text-base sm:text-lg font-bold uppercase tracking-tight mb-1 group-hover:text-[#F5C400] transition-colors line-clamp-2">{project.title}</h3>
            <div className="flex items-center gap-1.5 text-white/80 text-[10px] font-bold uppercase tracking-wider">
               <MapPin size={12} className="text-[#F5C400] shrink-0" /> {project.location}
            </div>
         </div>
      </div>
    </Link>
  );
}
