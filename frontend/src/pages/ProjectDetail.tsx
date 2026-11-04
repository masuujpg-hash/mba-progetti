import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, MapPin, ArrowRight, Buildings, CurrencyEur, Briefcase, Trophy, Users, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { getStoredProjects } from '../lib/contentStore';

export default function ProjectDetail() {
  const { id } = useParams();
  const projectList = getStoredProjects();
  
  const projectIndex = projectList.findIndex(p => p.id === id);
  const project = projectList[projectIndex];

  // Carousel State
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false);
  const portfolioContainerRef = useRef<HTMLDivElement>(null);
  const [portfolioWidth, setPortfolioWidth] = useState(0);
  const portfolioTouchStartX = useRef<number>(0);
  const portfolioTouchStartY = useRef<number>(0);

  const otherProjects = projectList.filter(p => p.id !== id);
  const maxPortfolioIndex = Math.max(0, otherProjects.length - itemsPerView);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPortfolioIndex(0);
  }, [id]);

  useEffect(() => {
    const updateDimensions = () => {
      if (portfolioContainerRef.current) {
        setPortfolioWidth(portfolioContainerRef.current.clientWidth);
      }
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    const ro = new ResizeObserver(updateDimensions);
    if (portfolioContainerRef.current) ro.observe(portfolioContainerRef.current);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    setPortfolioIndex((prev) => Math.min(prev, maxPortfolioIndex));
  }, [maxPortfolioIndex]);

  const gap = 24;
  const portfolioCardWidth = portfolioWidth > 0 
    ? (itemsPerView === 1 ? portfolioWidth : (portfolioWidth - (itemsPerView - 1) * gap) / itemsPerView)
    : 0;
  const portfolioStep = portfolioCardWidth + gap;
  const portfolioX = -(portfolioIndex * portfolioStep);

  // Autoplay
  useEffect(() => {
    if (isPortfolioPaused || otherProjects.length <= itemsPerView) return;
    const interval = setInterval(() => {
      setPortfolioIndex((prev) => (prev >= maxPortfolioIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPortfolioPaused, otherProjects.length, itemsPerView, maxPortfolioIndex]);

  const handleNextPortfolio = () => {
    setPortfolioIndex((prev) => (prev >= maxPortfolioIndex ? 0 : prev + 1));
  };

  const handlePrevPortfolio = () => {
    setPortfolioIndex((prev) => (prev <= 0 ? maxPortfolioIndex : prev - 1));
  };

  const getRankBadge = (rank?: string) => {
    if (!rank) return null;
    const r = rank.toLowerCase();
    if (r.includes('1') || r.includes('primo')) return { bg: 'bg-[#b8972a]', label: rank.includes('Posto') || rank.includes('Classificato') ? rank : '1° Classificato' };
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
                <MapPin size={14} className="text-[#b8972a]" />
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
                className="inline-flex items-center gap-2 text-[#7b869d] hover:text-[#b8972a] transition-colors text-[11px] font-medium uppercase tracking-[0.2em]"
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
            <span className="text-[#b8972a] text-[11px] font-medium uppercase tracking-[0.2em] mb-2 block">
              {project.category}
            </span>
            <h1 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-[36px] font-bold uppercase tracking-[0.05em] leading-[1.12] mb-6">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-[#3d4a66] text-[16px] font-normal leading-[1.7] mb-8 max-w-[62ch]">
              {project.description}
            </p>

            {/* Technical Details Grid */}
            <div className="border-t border-[#dfe3ea] pt-6 space-y-6">
              <h3 className="text-[#b8972a] text-[11px] font-medium uppercase tracking-[0.2em]">Specifiche di Progetto</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4 group">
                  <div className="text-[#b8972a] p-2.5 bg-[#1b2a4a]/5 rounded-[2px] flex items-center justify-center">
                    <Buildings size={18} weight="light" />
                  </div>
                  <div>
                    <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] block mb-0.5">Stazione Appaltante</span>
                    <span className="text-[#1b2a4a] text-[15px] font-medium uppercase tracking-wide block leading-snug">{project.client}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="text-[#b8972a] p-2.5 bg-[#1b2a4a]/5 rounded-[2px] flex items-center justify-center">
                    <CurrencyEur size={18} weight="light" />
                  </div>
                  <div>
                    <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] block mb-0.5">Importo Opere</span>
                    <span className="text-[#1b2a4a] text-[15px] font-medium uppercase tracking-wide block leading-snug tabular-nums">{project.amount}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="text-[#b8972a] p-2.5 bg-[#1b2a4a]/5 rounded-[2px] flex items-center justify-center">
                    <Briefcase size={18} weight="light" />
                  </div>
                  <div>
                    <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] block mb-0.5">Servizi Svolti</span>
                    <span className="text-[#1b2a4a] text-[15px] font-medium uppercase tracking-wide block leading-snug">{project.services}</span>
                  </div>
                </div>

                {project.credits && (
                <div className="flex items-start gap-4 group">
                  <div className="text-[#b8972a] p-2.5 bg-[#1b2a4a]/5 rounded-[2px] flex items-center justify-center">
                    <Users size={18} weight="light" />
                  </div>
                  <div>
                    <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] block mb-0.5">Credits</span>
                    <span className="text-[#1b2a4a] text-[15px] font-medium uppercase tracking-wide block leading-snug">{project.credits}</span>
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
                    <div className="text-[#b8972a] p-2.5 bg-[#1b2a4a]/5 rounded-[2px] flex items-center justify-center">
                      <Trophy size={18} weight="light" />
                    </div>
                    <div>
                      <span className="text-[#7b869d] text-[11px] font-medium uppercase tracking-[0.2em] block mb-0.5">Posizione Ottenuta</span>
                      <span className="text-[#1b2a4a] text-[15px] font-medium uppercase tracking-wide block leading-snug">{project.rank}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── I NOSTRI PROGETTI & APPALTI (PORTFOLIO CAROUSEL) ── */}
      <section className="py-16 md:py-24 bg-bg-neutral/40 border-t border-[#dfe3ea] overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-10 text-left">
            <span className="bg-[#b8972a] text-white text-[13px] font-medium uppercase tracking-[0.2em] px-3.5 py-1 rounded-[2px] inline-block mb-4 shadow-sm font-outfit">
              PORTFOLIO COMPLETO
            </span>
            <h2 className="text-[#1b2a4a] text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-tight leading-tight font-outfit">
              I NOSTRI PROGETTI & APPALTI
            </h2>
          </div>

          {/* Slider Track with Mobile Touch Swipe and Auto-slide Pause on Hover */}
          <div 
            ref={portfolioContainerRef}
            className="overflow-hidden relative touch-pan-y"
            onMouseEnter={() => setIsPortfolioPaused(true)}
            onMouseLeave={() => setIsPortfolioPaused(false)}
            onTouchStart={(e) => {
              setIsPortfolioPaused(true);
              portfolioTouchStartX.current = e.touches[0].clientX;
              portfolioTouchStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              setIsPortfolioPaused(false);
              const deltaX = portfolioTouchStartX.current - e.changedTouches[0].clientX;
              const deltaY = portfolioTouchStartY.current - e.changedTouches[0].clientY;
              if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                if (deltaX > 0) {
                  handleNextPortfolio();
                } else {
                  handlePrevPortfolio();
                }
              }
            }}
          >
            <motion.div 
              animate={{ x: portfolioX }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="flex gap-6"
            >
              {otherProjects.map((p) => (
                <div 
                  key={p.id} 
                  style={{ width: portfolioCardWidth > 0 ? `${portfolioCardWidth}px` : '100%' }}
                  className="shrink-0"
                >
                  <ProjectCard 
                    id={p.id}
                    title={p.title}
                    cat={p.category}
                    img={p.image}
                    pos={p.location}
                    rank={p.rank}
                    amount={p.amount}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Bar: CTA on Left, Carousel Controls on Right */}
          <div className="mt-8 sm:mt-10 flex flex-row items-center justify-between gap-2 sm:gap-4">
            <Link 
              to="/portfolio" 
              className="border border-[#1b2a4a]/25 hover:border-[#b8972a] hover:text-[#b8972a] bg-white px-2.5 sm:px-6 py-3 sm:py-3.5 text-[9px] min-[380px]:text-[10px] sm:text-xs tracking-wider sm:tracking-widest uppercase font-medium text-[#1b2a4a] transition-all rounded-[2px] shadow-xs inline-flex items-center justify-center gap-1.5 sm:gap-3 group flex-1 min-w-0"
            >
              <span className="truncate">Vedi Tutti i Progetti nel Portfolio</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

            <div className="flex items-center justify-end gap-1.5 sm:gap-3 shrink-0">
              <button 
                onClick={handlePrevPortfolio}
                className="w-9 h-9 min-[380px]:w-10 min-[380px]:h-10 sm:w-11 sm:h-11 border border-[#1b2a4a]/20 text-[#1b2a4a] hover:border-[#b8972a] hover:text-[#b8972a] transition-colors bg-white rounded-[2px] shadow-xs flex items-center justify-center shrink-0 cursor-pointer"
                aria-label="Progetto Precedente"
              >
                <CaretLeft size={18} />
              </button>
              <button 
                onClick={handleNextPortfolio}
                className="w-9 h-9 min-[380px]:w-10 min-[380px]:h-10 sm:w-11 sm:h-11 border border-[#1b2a4a]/20 text-[#1b2a4a] hover:border-[#b8972a] hover:text-[#b8972a] transition-colors bg-white rounded-[2px] shadow-xs flex items-center justify-center shrink-0 cursor-pointer"
                aria-label="Progetto Successivo"
              >
                <CaretRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ProjectCard({ id, title, cat, img, pos, rank, amount }: any) {
  const metaParts: string[] = [];
  if (amount) metaParts.push(amount);
  if (rank) {
    metaParts.push(rank.toUpperCase());
  } else if (cat) {
    metaParts.push(cat.toUpperCase());
  }
  const metaLine = metaParts.join(' · ');

  return (
    <Link to={`/portfolio/${id}`} className="block group bg-white border border-[#1b2a4a]/10 rounded-[2px] overflow-hidden shadow-xs hover:shadow-md transition-all h-full">
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img 
          src={img} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {rank && (
          <div className="absolute top-3 left-3 bg-[#b8972a] text-white text-[10px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 rounded-[2px] font-outfit shadow-xs">
            {rank}
          </div>
        )}
      </div>
      <div className="p-5 space-y-2 text-left">
        {metaLine && (
          <span className="text-[#1b2a4a] text-xs font-bold uppercase tracking-[0.12em] block font-outfit">
            {metaLine}
          </span>
        )}
        <h3 className="text-[#1b2a4a] text-base font-bold leading-snug group-hover:text-[#b8972a] transition-colors line-clamp-2 font-outfit">
          {title}
        </h3>
        <p className="text-[#64748b] text-xs font-normal font-outfit">
          {pos}
        </p>
      </div>
    </Link>
  );
}
