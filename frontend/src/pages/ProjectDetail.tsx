import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowLeft, MapPin, ArrowRight, Buildings, CurrencyEur, Briefcase, Trophy, Users } from '@phosphor-icons/react';
import { getStoredProjects } from '../lib/contentStore';

export default function ProjectDetail() {
  const { id } = useParams();
  const projectList = getStoredProjects();
  
  const projectIndex = projectList.findIndex(p => p.id === id);
  const project = projectList[projectIndex];

  // 3 Progetti correlati anziché 1 solo
  const relatedProjects = [
    projectList[(projectIndex + 1) % projectList.length],
    projectList[(projectIndex + 2) % projectList.length],
    projectList[(projectIndex + 3) % projectList.length]
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getRankBadge = (rank?: string) => {
    if (!rank) return null;
    const r = rank.toLowerCase();
    if (r.includes('1') || r.includes('primo')) return { bg: 'bg-[#F5C400]', label: rank.includes('Posto') || rank.includes('Classificato') ? rank : '1° Classificato' };
    if (r.includes('2') || r.includes('secondo')) return { bg: 'bg-slate-500', label: rank.includes('Posto') || rank.includes('Classificato') ? rank : '2° Classificato' };
    return null;
  };

  if (!project) return (
     <div className="h-screen bg-white flex flex-col items-center justify-center gap-8">
        <p className="text-navy uppercase tracking-widest font-bold">Progetto non trovato</p>
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
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Location Badge Overlay */}
              <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 flex items-center gap-3 bg-navy/80 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-3 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm">
                <MapPin size={14} className="text-gold" />
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
                className="inline-flex items-center gap-2 text-navy/40 hover:text-gold transition-colors text-[10px] font-bold uppercase tracking-[0.4em]"
              >
                <ArrowLeft size={14} weight="bold" /> Torna al Portfolio
              </Link>
            </div>

            {/* Rank Badge */}
            {badge && (
               <div className="mb-4">
                  <span className={`${badge.bg} text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded-[1px] font-outfit shadow-2xs`}>
                     {badge.label}
                  </span>
               </div>
            )}

            {/* Category & Title */}
            <span className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-2 block font-outfit">
              {project.category}
            </span>
            <h1 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-[1.15] mb-6 font-outfit">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-[#475569] text-base md:text-[17px] font-normal leading-[1.65] mb-8 font-outfit">
              {project.description}
            </p>

            {/* Technical Details Grid */}
            <div className="border-t border-navy/10 pt-6 space-y-6">
              <h3 className="text-gold text-xs font-bold uppercase tracking-[0.25em] font-outfit">Specifiche di Progetto</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="text-gold p-2.5 bg-navy/5 rounded-[1px] flex items-center justify-center">
                    <Buildings size={18} weight="light" />
                  </div>
                  <div>
                    <span className="text-[#64748B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] block mb-0.5 font-outfit">Stazione Appaltante</span>
                    <span className="text-navy text-sm sm:text-[15px] font-bold uppercase tracking-wide block leading-snug font-outfit">{project.client}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="text-gold p-2.5 bg-navy/5 rounded-[1px] flex items-center justify-center">
                    <CurrencyEur size={18} weight="light" />
                  </div>
                  <div>
                    <span className="text-[#64748B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] block mb-0.5 font-outfit">Importo Opere</span>
                    <span className="text-navy text-sm sm:text-[15px] font-bold uppercase tracking-wide block leading-snug font-outfit">{project.amount}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="text-gold p-2.5 bg-navy/5 rounded-[1px] flex items-center justify-center">
                    <Briefcase size={18} weight="light" />
                  </div>
                  <div>
                    <span className="text-[#64748B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] block mb-0.5 font-outfit">Servizi Svolti</span>
                    <span className="text-navy text-sm sm:text-[15px] font-bold uppercase tracking-wide block leading-snug font-outfit">{project.services}</span>
                  </div>
                </div>

                {project.credits && (
                <div className="flex items-start gap-4 group">
                  <div className="text-gold p-2.5 bg-navy/5 rounded-[1px] flex items-center justify-center">
                    <Users size={18} weight="light" />
                  </div>
                  <div>
                    <span className="text-[#64748B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] block mb-0.5 font-outfit">Credits</span>
                    <span className="text-navy text-sm sm:text-[15px] font-bold uppercase tracking-wide block leading-snug font-outfit">{project.credits}</span>
                  </div>
                </div>
                )}

                {/* Posizione ottenuta solo se 1° o 2° */}
                {project.rank && (
                  project.rank.includes('1') || 
                  project.rank.includes('2') || 
                  project.rank.toLowerCase().includes('primo') || 
                  project.rank.toLowerCase().includes('secondo')
                ) && (
                  <div className="flex items-start gap-4 group">
                    <div className="text-gold p-2.5 bg-navy/5 rounded-[1px] flex items-center justify-center">
                      <Trophy size={18} weight="light" />
                    </div>
                    <div>
                      <span className="text-[#64748B] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] block mb-0.5 font-outfit">Posizione Ottenuta</span>
                      <span className="text-navy text-sm sm:text-[15px] font-bold uppercase tracking-wide block leading-snug font-outfit">{project.rank}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3 PROGETTI CORRELATI IN POSIZIONE PROSSIMO PROGETTO ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/60 border-t border-navy/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="bg-[#F5C400] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] px-3.5 py-1 rounded-[1px] inline-block mb-3 shadow-xs font-outfit">
                ESPLORA IL PORTFOLIO
              </span>
              <h2 className="text-navy text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-outfit">
                ALTRI PROGETTI DEL PORTFOLIO
              </h2>
            </div>
            <Link 
              to="/portfolio" 
              className="border border-navy/30 hover:border-gold text-navy hover:text-gold px-6 py-3 rounded-[1px] text-xs font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2 shadow-2xs group font-outfit"
            >
              <span>Vedi Tutti i Progetti</span>
              <span className="text-sm font-semibold transition-transform group-hover:translate-x-1">&gt;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rp) => (
              <Link 
                key={rp.id} 
                to={`/portfolio/${rp.id}`} 
                className="group bg-white border border-navy/10 rounded-[1px] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <img 
                      src={rp.image} 
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {rp.rank && (
                      <div className="absolute top-3 left-3 bg-gold text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[1px] font-outfit">
                        {rp.rank}
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <span className="text-gold text-xs font-bold uppercase tracking-wider block mb-1 font-outfit">{rp.category} • {rp.amount}</span>
                    <h3 className="text-navy text-base font-bold uppercase tracking-tight mb-2 group-hover:text-gold transition-colors line-clamp-2 font-outfit">{rp.title}</h3>
                    <p className="text-[#64748B] text-xs font-normal font-outfit">{rp.location}</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-navy/5 pt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy/60 group-hover:text-gold transition-colors">Visualizza Scheda</span>
                  <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
