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
            <span className="text-white/80 text-[11px] font-medium uppercase tracking-[0.2em] mb-4 block">
              PROGETTI SELEZIONATI
            </span>
            <h1 className="text-white text-[clamp(34px,4.5vw,60px)] font-medium uppercase tracking-[-0.03em] leading-[1.05] mb-4">
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
      <section className="py-12 sm:py-16 px-6 max-w-7xl mx-auto border-t border-[#dfe3ea]">
        <div className="mb-4">
          <span className="bg-[#F5C400] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-2.5 py-1 rounded-[2px] inline-block shadow-xs">
            CONTATTI
          </span>
        </div>
        <div className="bg-[#F9FBFC] border-l-4 border-[#F5C400] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs rounded-[2px]">
          <div>
            <h3 className="text-[#1b2a4a] text-xl sm:text-2xl md:text-[28px] font-bold uppercase tracking-[0.05em] leading-[1.15]">
              VUOI PRESENTARE UN'OFFERTA MIGLIORATIVA VINCENTE?
            </h3>
            <p className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] mt-2 max-w-[62ch]">
              Richiedi uno studio di fattibilità tecnica per la tua prossima gara OEPV.
            </p>
          </div>
          <Link
            to="/contatti"
            className="bg-[#1b2a4a] text-white text-[11px] font-medium uppercase tracking-[0.2em] px-[26px] py-[15px] hover:bg-[#F5C400] transition-colors inline-flex items-center justify-between gap-4 rounded-[2px] shadow-sm shrink-0 min-w-[240px]"
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
      <div className="group relative aspect-[4/3] sm:aspect-[4/5] overflow-hidden bg-neutral-100 cursor-pointer shadow-xs hover:shadow-md transition-all border border-[#1b2a4a]/10 rounded-[2px]">
         {/* FOTO NATURALE A COLORI */}
         <img 
           src={project.image} 
           loading="lazy"
           className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
           alt={project.title} 
         />

         {/* Badge solo se 1° o 2° classificato */}
         {isTopRank && (
            <div className={`absolute top-4 left-4 ${isSecond ? 'bg-[#1b2a4a]' : 'bg-[#F5C400]'} text-white text-[11px] font-medium uppercase tracking-[0.06em] px-3 py-1 z-10 shadow-sm rounded-[2px]`}>
               {project.rank}
            </div>
         )}

         {/* Gradiente scuro naturale solo in basso per leggibilità testo */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-5 sm:p-6 flex flex-col justify-end">
            <h3 className="text-white text-base sm:text-[18px] font-medium uppercase tracking-tight mb-1.5 group-hover:text-[#F5C400] transition-colors line-clamp-2 leading-[1.35]">{project.title}</h3>
            <div className="flex items-center gap-1.5 text-white/90 text-[12px] font-medium uppercase tracking-[0.06em]">
               <MapPin size={13} className="text-[#F5C400] shrink-0" /> {project.location}
            </div>
         </div>
      </div>
    </Link>
  );
}
