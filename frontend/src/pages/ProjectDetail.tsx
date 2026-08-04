import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft, MapPin, ArrowRight, Buildings, CurrencyEur, Briefcase, Trophy, Users } from '@phosphor-icons/react';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getRankBadge = (rank?: string) => {
    if (!rank) return null;
    const r = rank.toLowerCase();
    if (r.includes('1') || r.includes('primo')) return { bg: 'bg-[#B8972A]', label: rank.includes('Posto') || rank.includes('Classificato') ? rank : '1° Classificato' };
    if (r.includes('2') || r.includes('secondo')) return { bg: 'bg-slate-400', label: rank.includes('Posto') || rank.includes('Classificato') ? rank : '2° Classificato' };
    return null;
  };

  if (!project) return (
     <div className="h-screen bg-white flex flex-col items-center justify-center gap-8">
        <p className="text-[#1B2A4A] uppercase tracking-widest font-bold">Progetto non trovato</p>
        <Link to="/portfolio" className="btn-ghost-dark px-8 py-4 text-xs">Torna al Portfolio</Link>
     </div>
  );

  const badge = getRankBadge(project.rank);

  return (
    <div className="bg-white min-h-screen selection:bg-navy selection:text-white overflow-x-hidden">
      
      {/* ── SPLIT SCREEN MAIN CONTAINER ── */}
      <section className="relative w-full">
        <div className="flex flex-col lg:flex-row items-start">
          
          {/* LEFT COLUMN: FULL SCREEN PHOTO */}
          <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-navy">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full relative"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Location Badge Overlay */}
              <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 flex items-center gap-3 bg-navy/80 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-3 text-white text-[10px] font-bold uppercase tracking-[0.3em]">
                <MapPin size={14} className="text-gold" />
                {project.location}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: ORGANIZED DETAILS & SPECS */}
          <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-24 pt-8 md:pt-20 lg:pt-36 pb-12 md:pb-24 flex flex-col justify-start">
            
            {/* Back Button */}
            <div className="mb-8">
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-3 text-navy/40 hover:text-gold transition-colors text-[10px] font-bold uppercase tracking-[0.5em]"
              >
                <ArrowLeft size={14} weight="bold" /> Torna al Portfolio
              </Link>
            </div>

            {/* Rank Badge */}
            {badge && (
               <div className="mb-6">
                  <span className={`${badge.bg} text-white text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2`}>
                     {badge.label}
                  </span>
               </div>
            )}

            {/* Category & Title */}
            <span className="text-gold text-xs font-bold uppercase tracking-[0.5em] mb-3 block">
              {project.category}
            </span>
            <h1 className="text-navy text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-[1.1] mb-6 md:mb-8">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-navy/80 text-sm md:text-base font-light leading-relaxed mb-8 md:mb-12">
              {project.description}
            </p>

            {/* Organized Technical Details Grid with Icons */}
            <div className="border-t border-navy/10 pt-8 space-y-8">
              <h3 className="text-gold text-xs font-bold uppercase tracking-[0.4em] mb-6">Specifiche di Progetto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-5 group">
                  <div className="text-gold p-3 bg-navy/5 rounded-sm transition-transform group-hover:rotate-12 duration-500 flex items-center justify-center">
                    <Buildings size={20} weight="light" />
                  </div>
                  <div>
                    <span className="text-navy/40 text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Stazione Appaltante</span>
                    <span className="text-navy text-xs font-bold uppercase tracking-wide block leading-snug">{project.client}</span>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="text-gold p-3 bg-navy/5 rounded-sm transition-transform group-hover:rotate-12 duration-500 flex items-center justify-center">
                    <CurrencyEur size={20} weight="light" />
                  </div>
                  <div>
                    <span className="text-navy/40 text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Importo Opere</span>
                    <span className="text-navy text-xs font-bold uppercase tracking-wide block leading-snug">{project.amount}</span>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="text-gold p-3 bg-navy/5 rounded-sm transition-transform group-hover:rotate-12 duration-500 flex items-center justify-center">
                    <Briefcase size={20} weight="light" />
                  </div>
                  <div>
                    <span className="text-navy/40 text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Servizi Svolti</span>
                    <span className="text-navy text-xs font-bold uppercase tracking-wide block leading-snug">{project.services}</span>
                  </div>
                </div>

                {project.credits && (
                <div className="flex items-start gap-5 group">
                  <div className="text-gold p-3 bg-navy/5 rounded-sm transition-transform group-hover:rotate-12 duration-500 flex items-center justify-center">
                    <Users size={20} weight="light" />
                  </div>
                  <div>
                    <span className="text-navy/40 text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Credits</span>
                    <span className="text-navy text-xs font-bold uppercase tracking-wide block leading-snug">{project.credits}</span>
                  </div>
                </div>
                )}

                <div className="flex items-start gap-5 group">
                  <div className="text-gold p-3 bg-navy/5 rounded-sm transition-transform group-hover:rotate-12 duration-500 flex items-center justify-center">
                    <Trophy size={20} weight="light" />
                  </div>
                  <div>
                    <span className="text-navy/40 text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Posizione Ottenuta</span>
                    <span className="text-navy text-xs font-bold uppercase tracking-wide block leading-snug">{project.rank || 'In Graduatoria'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary technical info block */}
            <div className="mt-12 pt-8 border-t border-navy/10">
              <h4 className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-2">L'Eccellenza Tecnica</h4>
              <p className="text-navy/60 text-xs leading-relaxed">
                Ogni fase del progetto è stata gestita con protocolli di qualità rigorosi, integrando competenze multidisciplinari per superare le sfide strutturali e ambientali tipiche di queste opere.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      {nextProject && (
        <section className="bg-[#1B2A4A] relative overflow-hidden">
          <Link to={`/portfolio/${nextProject.id}`} className="group flex flex-col md:flex-row min-h-[40vh]">
            <div className="w-full md:w-1/2 relative overflow-hidden border-r border-white/5 min-h-[250px] md:min-h-auto">
               <img 
                 src={nextProject.image} 
                 alt="Next Project"
                 className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000"
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/5 text-[5rem] md:text-[8rem] lg:text-[12rem] font-bold uppercase tracking-tighter select-none">Next</span>
               </div>
            </div>
            <div className="w-full md:w-1/2 p-6 sm:p-12 lg:p-20 flex flex-col justify-center items-start bg-[#1B2A4A]">
               <span className="text-[#B8972A] text-[10px] font-bold uppercase tracking-[0.6em] mb-6">Prossimo Progetto</span>
               <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tighter leading-[1.1] mb-6 md:mb-8">
                  {nextProject.title}
               </h3>
               <div className="flex items-center gap-4 text-[#B8972A] text-[11px] font-bold uppercase tracking-[0.4em] group">
                  Esplora Progetto <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
               </div>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
