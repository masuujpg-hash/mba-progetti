import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft, MapPin, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { getStoredProjects } from '../lib/contentStore';

export default function ProjectDetail() {
  const { id } = useParams();
  const projectList = getStoredProjects();
  
  const projectIndex = projectList.findIndex(p => p.id === id);
  const project = projectList[projectIndex];

  const prevProject = projectIndex > 0 ? projectList[projectIndex - 1] : projectList[projectList.length - 1];
  const nextProject = projectIndex < projectList.length - 1 ? projectList[projectIndex + 1] : projectList[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getRankBadge = (rank?: string) => {
    if (!rank) return null;
    const r = rank.toLowerCase();
    if (r.includes('1') || r.includes('primo')) return { bg: 'bg-[#F5C400]', label: rank.includes('Posto') || rank.includes('Classificato') ? rank : '1° Classificato' };
    if (r.includes('2') || r.includes('secondo')) return { bg: 'bg-[#1b2a4a]', label: rank.includes('Posto') || rank.includes('Classificato') ? rank : '2° Classificato' };
    return null;
  };

  if (!project) return (
     <div className="h-screen bg-white flex flex-col items-center justify-center gap-8">
        <p className="text-[#1b2a4a] uppercase tracking-widest font-bold">Progetto non trovato</p>
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
          <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-[#1b2a4a]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full relative"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b2a4a]/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Location Badge Overlay */}
              <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 flex items-center gap-3 bg-[#1b2a4a]/80 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-3 text-white text-[11px] font-medium uppercase tracking-[0.2em] rounded-[2px]">
                <MapPin size={14} className="text-[#F5C400]" />
                {project.location}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: ORGANIZED DETAILS & SPECS */}
          <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-20 pt-8 md:pt-16 lg:pt-28 pb-12 md:pb-20 flex flex-col justify-start">
            
            {/* Back Button */}
            <div className="mb-8">
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-2 text-[#7b869d] hover:text-[#F5C400] transition-colors text-[11px] font-medium uppercase tracking-[0.2em]"
              >
                <ArrowLeft size={14} weight="bold" /> Torna al Portfolio
              </Link>
            </div>

            {/* Rank Badge */}
            {badge && (
               <div className="mb-4">
                  <span className={`${badge.bg} text-white text-[11px] font-medium uppercase tracking-[0.06em] px-3.5 py-1 rounded-[2px] shadow-2xs`}>
                     {badge.label}
                  </span>
               </div>
            )}

            {/* Category & Title */}
            <span className="text-[#F5C400] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block">
              {project.category}
            </span>
            <h1 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[36px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-6">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] mb-8 max-w-[62ch]">
              {project.description}
            </p>

            {/* Technical Details List / Specifications Table */}
            <div className="border-t border-[#dfe3ea] mt-4">
              {/* 1. LUOGO */}
              {project.location && (
                <div className="flex items-baseline justify-between py-3.5 border-b border-[#dfe3ea] gap-4">
                  <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
                    LUOGO
                  </span>
                  <span className="text-[#1b2a4a] text-[14px] sm:text-[15px] font-normal text-right font-outfit">
                    {project.location}
                  </span>
                </div>
              )}

              {/* 2. STAZIONE APPALTANTE */}
              {project.client && (
                <div className="flex items-baseline justify-between py-3.5 border-b border-[#dfe3ea] gap-4">
                  <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
                    STAZIONE APPALTANTE
                  </span>
                  <span className="text-[#1b2a4a] text-[14px] sm:text-[15px] font-normal text-right font-outfit">
                    {project.client}
                  </span>
                </div>
              )}

              {/* 3. IMPORTO */}
              {project.amount && (
                <div className="flex items-baseline justify-between py-3.5 border-b border-[#dfe3ea] gap-4">
                  <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
                    IMPORTO
                  </span>
                  <span className="text-[#1b2a4a] text-[14px] sm:text-[15px] font-normal text-right tabular-nums font-outfit">
                    {project.amount}
                  </span>
                </div>
              )}

              {/* 4. SERVIZI SVOLTI */}
              {project.services && (
                <div className="flex items-baseline justify-between py-3.5 border-b border-[#dfe3ea] gap-4">
                  <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
                    SERVIZI SVOLTI
                  </span>
                  <span className="text-[#1b2a4a] text-[14px] sm:text-[15px] font-normal text-right font-outfit">
                    {project.services}
                  </span>
                </div>
              )}

              {/* 5. POSIZIONE */}
              <div className="flex items-baseline justify-between py-3.5 border-b border-[#dfe3ea] gap-4">
                <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
                  POSIZIONE
                </span>
                <span className="text-[#1b2a4a] text-[14px] sm:text-[15px] font-normal text-right font-outfit">
                  {project.rank || '—'}
                </span>
              </div>

              {/* 6. CREDITS */}
              <div className="flex items-baseline justify-between py-3.5 border-b border-[#dfe3ea] gap-4">
                <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] shrink-0 font-outfit">
                  CREDITS
                </span>
                <span className="text-[#1b2a4a] text-[14px] sm:text-[15px] font-normal text-right leading-relaxed max-w-[420px] font-outfit">
                  {project.credits || '—'}
                </span>
              </div>

              {/* Navigation Controls: < >, Torna al Portfolio */}
              <div className="pt-8 mt-4 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/portfolio/${prevProject?.id || ''}`}
                    className="border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[48px] sm:h-[52px] rounded-[2px] flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
                    aria-label="Progetto Precedente"
                  >
                    <CaretLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={`/portfolio/${nextProject?.id || ''}`}
                    className="border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[48px] sm:h-[52px] rounded-[2px] flex items-center justify-center transition-all shadow-2xs group cursor-pointer"
                    aria-label="Progetto Successivo"
                  >
                    <CaretRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <Link
                  to="/portfolio"
                  className="border border-[#1b2a4a]/25 text-[#1b2a4a] hover:border-[#F5C400] hover:text-[#F5C400] bg-white h-[48px] sm:h-[52px] px-6 text-[11px] font-medium tracking-[0.2em] uppercase rounded-[2px] flex items-center justify-center transition-all shadow-2xs cursor-pointer"
                >
                  TORNA AL PORTFOLIO
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
