import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
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
      <section className="relative min-h-[50vh] md:h-[55vh] w-full flex items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="/media/header_3.jpg" 
            alt="Portfolio background"
            className="w-full h-full object-cover grayscale opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/60 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] mb-4 block font-outfit">
              PROGETTI SELEZIONATI
            </span>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.25em] md:tracking-[0.35em] leading-[1.2] mb-4 font-outfit">
               ARCHIVIO OPERE
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── GRID PROGETTI EQUILIBRATA ── */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projectList.map((p) => (
               <ProjectGridItem key={p.id} project={p} />
            ))}
         </div>
      </section>

      {/* ── BANNER CONTATTI ── */}
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-navy/10">
        <div className="mb-4">
          <span className="bg-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block shadow-xs font-outfit">
            CONTATTI
          </span>
        </div>
        <div className="bg-[#F9FBFC] border-l-4 border-gold p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-navy text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight font-heading">
              VUOI PRESENTARE UN'OFFERTA MIGLIORATIVA VINCENTE?
            </h3>
            <p className="text-navy/75 text-sm sm:text-base font-outfit mt-2">
              Richiedi uno studio di fattibilità tecnica per la tua prossima gara OEPV.
            </p>
          </div>
          <Link
            to="/contatti"
            className="bg-navy text-white text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-gold transition-colors inline-flex items-center justify-center gap-4 rounded-[1px] shadow-sm shrink-0 font-outfit"
          >
            <span>RICHIEDI UNA CONSULENZA</span>
            <span>&gt;</span>
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
         {/* FOTO NATURALE A COLORI */}
         <img 
           src={project.image} 
           loading="lazy"
           className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
           alt={project.title} 
         />

         {/* Badge solo se 1° o 2° classificato */}
         {isTopRank && (
            <div className={`absolute top-4 left-4 ${isSecond ? 'bg-navy' : 'bg-[#F5C400]'} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 z-10 shadow-sm rounded-[1px] font-outfit`}>
               {project.rank}
            </div>
         )}

         {/* Gradiente scuro naturale solo in basso per leggibilità testo */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 sm:p-6 flex flex-col justify-end">
            <h3 className="text-white text-base sm:text-lg font-bold uppercase tracking-tight mb-1.5 group-hover:text-[#F5C400] transition-colors line-clamp-2 font-outfit">{project.title}</h3>
            <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold uppercase tracking-wider font-outfit">
               <MapPin size={13} className="text-[#F5C400] shrink-0" /> {project.location}
            </div>
         </div>
      </div>
    </Link>
  );
}
